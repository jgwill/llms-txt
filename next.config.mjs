import fs from 'node:fs'

/**
 * llms.jgwill.com runs as a Next.js application on Vercel's runtime.
 *
 * Three things have to stay true at once:
 *
 *  1. The canonical raw addresses — /llms.txt, /llms-rise-framework.txt,
 *     /docs/index.md, /LICENSE — must return the repository file byte-for-byte
 *     as plain text. AI agents and indexers fetch these directly.
 *  2. The original document names must also resolve *without* their extension —
 *     /llms-rise-framework returns the rendered reading page. Extension present
 *     → raw artifact; extension absent → rendered page.
 *  3. Everything else is a rendered, server-backed React application.
 *
 * `rewrites()` maps (1) onto a Route Handler that reads the file from disk at
 * request time, and (2) onto the prerendered `/guidance/<slug>` page. They sit
 * in `afterFiles`, which Next evaluates after real page and public files are
 * checked, so no page route is ever shadowed by a rewrite.
 */

/** Repository-relative globs the raw reader and the server components need on disk. */
const CORPUS_GLOBS = [
  './llms*.txt',
  './llms*.md',
  './docs/**/*',
  './counter_articles/**/*',
  './README.md',
  './KINSHIP.md',
  './MIA.md',
  './TERMS.md',
  './TUG.md',
  './LICENSE',
  './context7.json',
  './CNAME',
]

/**
 * Repository content that must not travel inside a deployed function bundle.
 *
 * Because the raw reader computes its path from the request, Turbopack cannot
 * tell which files a runtime read will want and falls back to tracing the whole
 * project root (it says so during the build: "the whole project was traced
 * unintentionally"). That bailout is why the corpus reaches production today;
 * `outputFileTracingIncludes` above is the explicit guarantee that it still
 * would if the bailout ever narrowed.
 *
 * MEASURED LIMITATION — Next.js 16.2.9 / Turbopack: `outputFileTracingExcludes`
 * only removes entries at the *repository root*. Every nested form was tested
 * against the emitted `.nft.json` and none of them removed anything:
 * globstar forms, bare directory names, a leading-globstar form, a single-level
 * wildcard form, and even a fully explicit `./.github/skills/README.md` were
 * each tried and each removed nothing. Only root-level patterns take effect, so
 * only root-level patterns are listed here.
 *
 * The consequence, stated plainly: a handful of nested non-corpus files
 * (`.pde/`, `foundations/`, `imported/`, `skills/README.md`, `upgrade/`) do ship
 * in the bundle. None is a secret, and none is reachable over HTTP — the
 * allowlist in `lib/content.ts` refuses every one of them. The security
 * boundary is that allowlist, not this list.
 *
 * What this list does secure is the root-level secret material, `_env.sh` above
 * all: verified absent from every emitted `.nft.json`.
 *
 * `docs/CLAUDE.md` is published and stays — only the root `CLAUDE.md` is cut.
 */
const NON_CORPUS_GLOBS = [
  './_env.sh',
  './*.sh',
  './*.py',
  './CLAUDE.md',
  './requirements.txt',
  './.qmdignore',
  './*.tsbuildinfo',
]

/** Individual repository-root files published verbatim, as a rewrite alternation. */
const ROOT_FILES = ['README\\.md', 'KINSHIP\\.md', 'MIA\\.md', 'TERMS\\.md', 'TUG\\.md', 'LICENSE', 'context7\\.json', 'CNAME']

/**
 * The original published basenames — a guidance filename with its `.txt`/`.md`
 * extension removed. `/llms-rise-framework` (basename) must resolve to the
 * rendered reading page while `/llms-rise-framework.txt` still returns raw bytes.
 *
 * This mirrors `listRootGuidanceFiles()` in `lib/content.ts`: the same corpus
 * seen through Node's `fs` at config-load time, because `next.config.mjs` cannot
 * import the TypeScript loader. The list is read once, at build start, so the
 * emitted rewrite table is deterministic for a given repository state.
 *
 * Each basename becomes an *explicit literal* rewrite entry — never a broad
 * regex. Three basenames carry dots (`llms-pythonista-full.gemini`,
 * `llms-ui-pythonista-guide.gemini`, `llms-pollution-critique-arxiv-2311.01937v1`);
 * a pattern such as `/:name(llms[^/]+)` would swallow the raw `.txt`/`.md` forms
 * and could shadow the raw handler. A literal source cannot: `.` is a literal in
 * path-to-regexp, and a source with no extension can never match an extension
 * form. Order within `afterFiles` is therefore not load-bearing between the two
 * groups — the raw rewrites require the extension, these forbid it — but the raw
 * entries are still listed first for legibility.
 */
function listGuidanceBasenames() {
  return fs
    .readdirSync('.', { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /^llms[-.].*\.(txt|md)$/.test(name) || name === 'llms.txt')
    .map((name) => name.replace(/\.(txt|md)$/, ''))
    .sort((a, b) => a.localeCompare(b))
}

/** One internal rewrite per basename: `/<basename>` → `/guidance/<basename>`. */
function basenameRewrites() {
  return listGuidanceBasenames().map((basename) => ({
    source: `/${basename}`,
    destination: `/guidance/${basename}`,
  }))
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },

  /**
   * Vercel ships only the files a build traced into each function. Tracing
   * follows static `import`s and literal `fs` paths; it cannot see a read whose
   * path is assembled from the request URL, which is exactly what the raw
   * handler does. Without this, every raw URL would 404 in production while
   * working perfectly in local `next start`.
   *
   * Keys are route globs and values are globs resolved from the project root.
   * `/*` covers every route, which is what we want — the pages, the search
   * endpoint, the manifest, and the OG image routes all read this same corpus.
   */
  outputFileTracingIncludes: {
    '/*': CORPUS_GLOBS,
  },
  outputFileTracingExcludes: {
    '/*': NON_CORPUS_GLOBS,
  },

  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        // (1) RAW — extension present → byte-identical plain text.
        // Root guidance documents and the two indexes.
        { source: '/:file(llms[^/]*\\.txt)', destination: '/api/raw/:file' },
        { source: '/:file(llms[^/]*\\.md)', destination: '/api/raw/:file' },

        // Markdown under docs/ keeps its raw address. Reading views live at
        // /docs/<slug> with no extension, so they never match this pattern.
        { source: '/docs/:path((?:[^/]+/)*[^/]+\\.(?:md|html))', destination: '/api/raw/docs/:path' },

        // counter_articles/ is published only as raw markdown.
        { source: '/counter_articles/:path((?:[^/]+/)*[^/]+\\.[^/.]+)', destination: '/api/raw/counter_articles/:path' },

        // Standalone root files.
        { source: `/:file(${ROOT_FILES.join('|')})`, destination: '/api/raw/:file' },

        // (2) RENDERED — extension absent → the prerendered reading page.
        // One explicit literal per basename; cannot shadow the raw rewrites
        // above because those require the extension these forbid.
        ...basenameRewrites(),
      ],
      fallback: [],
    }
  },
}

export default nextConfig
