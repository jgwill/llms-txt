import fs from 'node:fs'
import path from 'node:path'

/**
 * Server-side content layer.
 *
 * Everything here reads the repository from disk. Server components read it
 * while rendering; the route handlers under `app/api/` read it while answering
 * a request. Both go through this module so there is a single loader and a
 * single cache — the `Map`s and `let` caches below live in module scope, so a
 * warm serverless instance reads each file once and then answers from memory.
 *
 * The raw files at the repository root remain the canonical artifacts. They are
 * served byte-for-byte by `app/api/raw/[...path]/route.ts`, which the canonical
 * URLs (`/llms.txt`, `/docs/index.md`, …) rewrite onto. This module only builds
 * a readable presentation layer on top of them.
 */

export const REPO_ROOT = process.cwd()
const DOCS_DIR = path.join(REPO_ROOT, 'docs')

/** Individual repository-root files published verbatim at their own address. */
export const RAW_ROOT_FILES = new Set([
  'README.md',
  'KINSHIP.md',
  'MIA.md',
  'TERMS.md',
  'TUG.md',
  'LICENSE',
  'context7.json',
  'CNAME',
])
/** Directory trees published verbatim, preserving their internal structure. */
export const RAW_DIRS = ['docs/', 'counter_articles/']
/** Extensions permitted for files inside `RAW_DIRS`. */
export const RAW_DIR_EXTENSIONS = new Set(['.md', '.txt', '.html', '.json'])

/**
 * Author TODOs live in the source files as HTML comments. They must never reach
 * a rendered page, a search snippet, or a summary, so both the markdown renderer
 * and the search indexer strip them first — including the unterminated comment
 * at the end of `docs/index.md`.
 */
export function stripHtmlComments(source: string): string {
  return source.replace(/<!--[\s\S]*?-->/g, '').replace(/<!--[\s\S]*$/, '')
}

/**
 * Decide whether a repository-relative path may be served raw.
 *
 * The path arrives from the URL, so this is the security boundary as much as it
 * is a routing table: anything not named here is refused, and the caller
 * separately proves the resolved path never escapes `REPO_ROOT`.
 */
export function isPublishableRawPath(relative: string): boolean {
  if (relative === '' || relative.startsWith('/') || relative.includes('..')) return false
  if (relative.includes('\0')) return false

  if (!relative.includes('/')) {
    if (RAW_ROOT_FILES.has(relative)) return true
    return /^llms[-.]?[^/]*\.(txt|md)$/.test(relative)
  }

  const dir = RAW_DIRS.find((d) => relative.startsWith(d))
  if (!dir) return false
  if (relative.split('/').some((segment) => segment === '' || segment.startsWith('.'))) return false
  return RAW_DIR_EXTENSIONS.has(path.extname(relative).toLowerCase())
}

const GITHUB_BLOB = 'https://github.com/jgwill/llms-txt/blob/main/'
const GITHUB_TREE = 'https://github.com/jgwill/llms-txt/tree/main/'

/* ------------------------------------------------------------------ *
 * Root guidance files
 * ------------------------------------------------------------------ */

export type GuidanceKind = 'index' | 'guidance'

export interface GuidanceDoc {
  /** URL slug — the filename with its extension removed. */
  slug: string
  /** Filename as it exists at the repository root, e.g. `llms-pde.txt`. */
  file: string
  /** `txt` or `md`. */
  ext: string
  /** Absolute raw URL path, e.g. `/llms-pde.txt`. */
  rawPath: string
  title: string
  summary: string
  /** Sibling documents named in `llms.txt`, resolved to site links where possible. */
  related: RelatedRef[]
  /** Size of the raw file in bytes. */
  bytes: number
  kind: GuidanceKind
  /** True when `llms.txt` carries an entry for this file. */
  indexed: boolean
}

export interface RelatedRef {
  label: string
  href: string | null
}

interface ParsedEntry {
  title: string
  summary: string
  target: string
  related: string[]
}

/** Root-level files matching the `llms-*` publication pattern, plus the indexes. */
function listRootGuidanceFiles(): string[] {
  return fs
    .readdirSync(REPO_ROOT, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /^llms[-.].*\.(txt|md)$/.test(name) || name === 'llms.txt')
    .sort((a, b) => a.localeCompare(b))
}

/**
 * `llms.txt` is itself a structured index. Each entry is:
 *
 *   ## Title
 *   > summary
 *   - **Link**: [text](./path)
 *   - **Related**: a.md, b.txt
 */
function parseLlmsIndex(): ParsedEntry[] {
  const source = fs.readFileSync(path.join(REPO_ROOT, 'llms.txt'), 'utf8')
  const entries: ParsedEntry[] = []
  let current: ParsedEntry | null = null

  for (const line of source.split('\n')) {
    const heading = /^##\s+(.*\S)\s*$/.exec(line)
    if (heading) {
      if (current) entries.push(current)
      current = { title: heading[1], summary: '', target: '', related: [] }
      continue
    }
    if (!current) continue

    const quote = /^>\s?(.*)$/.exec(line)
    if (quote) {
      current.summary = current.summary ? `${current.summary} ${quote[1]}` : quote[1]
      continue
    }

    const link = /^-\s+\*\*Link\*\*:\s*\[[^\]]*\]\(([^)]+)\)/.exec(line)
    if (link) {
      current.target = link[1].trim()
      continue
    }

    const related = /^-\s+\*\*Related\*\*:\s*(.*)$/.exec(line)
    if (related) {
      current.related = related[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }
  if (current) entries.push(current)
  return entries
}

/**
 * Summaries are markdown in the source index but render as plain text in listings
 * and meta descriptions, so inline emphasis and code fences are unwrapped.
 */
function plainText(markdown: string): string {
  return markdown
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Turn `llms-medicine-wheel-mcp-tools.md` into `Medicine Wheel Mcp Tools`. */
function titleFromFilename(file: string): string {
  const base = file.replace(/\.(txt|md)$/, '').replace(/^llms[-.]/, '')
  if (!base) return 'LLMS Index'
  return base
    .replace(/--[0-9a-f-]{8,}$/i, '')
    .replace(/\.gemini$/, '')
    .split('-')
    .filter(Boolean)
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(' ')
}

function relatedRef(token: string, byFile: Map<string, string>): RelatedRef {
  const clean = token.replace(/^\.\//, '')
  const slug = byFile.get(clean)
  if (slug) return { label: clean, href: `/guidance/${slug}` }
  if (clean.startsWith('counter_articles/')) return { label: clean, href: `/${clean}` }
  if (clean.startsWith('docs/')) return { label: clean, href: docsHrefFor(clean.slice(5)) }
  // Names such as `llms-indigenous-paradigm-v2.0` refer to concepts with no file
  // in this repository. Show them, but do not fabricate a link.
  return { label: clean, href: null }
}

let guidanceCache: GuidanceDoc[] | null = null

export function getGuidanceDocs(): GuidanceDoc[] {
  if (guidanceCache) return guidanceCache

  const files = listRootGuidanceFiles()
  const bySlug = new Map<string, string>() // file -> slug
  for (const file of files) bySlug.set(file, file.replace(/\.(txt|md)$/, ''))

  const entries = parseLlmsIndex()
  const entryByFile = new Map<string, ParsedEntry>()
  for (const entry of entries) {
    const target = entry.target.replace(/^\.\//, '')
    if (bySlug.has(target)) entryByFile.set(target, entry)
  }

  guidanceCache = files.map((file) => {
    const entry = entryByFile.get(file)
    const isIndex = file === 'llms.txt' || file === 'llms-full.txt'
    return {
      slug: bySlug.get(file)!,
      file,
      ext: path.extname(file).slice(1),
      rawPath: `/${file}`,
      title: entry ? plainText(entry.title) : titleFromFilename(file),
      summary: entry ? plainText(entry.summary) : '',
      related: (entry?.related ?? []).map((token) => relatedRef(token, bySlug)),
      bytes: fs.statSync(path.join(REPO_ROOT, file)).size,
      kind: isIndex ? ('index' as const) : ('guidance' as const),
      indexed: Boolean(entry),
    }
  })

  return guidanceCache
}

export function getGuidanceDoc(slug: string): GuidanceDoc | undefined {
  return getGuidanceDocs().find((d) => d.slug === slug)
}

export function readGuidanceSource(doc: GuidanceDoc): string {
  return readSourceFile(doc.file)
}

/* ------------------------------------------------------------------ *
 * Documentation hub
 * ------------------------------------------------------------------ */

export interface DocPage {
  /** Slug segments below `docs/`, e.g. `['platforms', 'claude-code-chrome-extension']`. */
  segments: string[]
  /** Site route, e.g. `/docs/platforms/claude-code-chrome-extension`. */
  href: string
  /** Path relative to the repository root. */
  file: string
  /** Raw markdown URL, e.g. `/docs/rise-framework.md`. */
  rawPath: string
  title: string
  summary: string
  section: string | null
  bytes: number
}

function walkDocs(dir: string, prefix: string[] = []): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.isDirectory()) {
      out.push(...walkDocs(path.join(dir, entry.name), [...prefix, entry.name]))
    } else if (entry.name.endsWith('.md')) {
      out.push([...prefix, entry.name].join('/'))
    }
  }
  return out
}

/** First `# Heading` in the file, falling back to a humanised filename. */
function extractTitle(source: string, fallback: string): string {
  const m = /^#\s+(.+)$/m.exec(source)
  return m ? m[1].trim() : fallback
}

/** First `> blockquote` paragraph, used as the page description. */
function extractSummary(source: string): string {
  const lines = source.split('\n')
  const parts: string[] = []
  let started = false
  for (const line of lines) {
    const q = /^>\s?(.*)$/.exec(line)
    if (q) {
      started = true
      if (q[1].trim()) parts.push(q[1].trim())
    } else if (started) {
      break
    }
  }
  return parts.join(' ')
}

let docsCache: DocPage[] | null = null

export function getDocPages(): DocPage[] {
  if (docsCache) return docsCache

  docsCache = walkDocs(DOCS_DIR).map((rel) => {
    const abs = path.join(DOCS_DIR, rel)
    const source = fs.readFileSync(abs, 'utf8')
    const segments = rel.replace(/\.md$/, '').split('/')
    return {
      segments,
      href: `/docs/${segments.join('/')}`,
      file: `docs/${rel}`,
      rawPath: `/docs/${rel}`,
      title: plainText(extractTitle(source, titleFromFilename(segments[segments.length - 1]))),
      summary: plainText(extractSummary(source)),
      section: segments.length > 1 ? segments[0] : null,
      bytes: fs.statSync(abs).size,
    }
  })

  return docsCache
}

/** Every doc page except `docs/index.md`, which is rendered at `/docs`. */
export function getDocPagesForRouting(): DocPage[] {
  return getDocPages().filter((p) => !(p.segments.length === 1 && p.segments[0] === 'index'))
}

export function getDocPage(segments: string[]): DocPage | undefined {
  const key = segments.join('/')
  return getDocPages().find((p) => p.segments.join('/') === key)
}

export function readDocSource(page: DocPage): string {
  return readSourceFile(page.file)
}

export function getDocsIndex(): { page: DocPage; source: string } {
  const page = getDocPage(['index'])
  if (!page) throw new Error('docs/index.md is missing — the documentation hub cannot be built.')
  return { page, source: readDocSource(page) }
}

/* ------------------------------------------------------------------ *
 * Link resolution
 * ------------------------------------------------------------------ */

function docsHrefFor(relFromDocs: string): string {
  const clean = relFromDocs.replace(/\.md$/, '')
  return clean === 'index' ? '/docs' : `/docs/${clean}`
}

export type LinkContext =
  /** Rendering a file that lives at the repository root. */
  | { base: 'root' }
  /** Rendering a file under `docs/`; `dir` is its directory relative to `docs/`. */
  | { base: 'docs'; dir: string }

export interface ResolvedLink {
  href: string
  external: boolean
}

/**
 * Rewrite an intra-repository markdown link so it resolves on the site.
 *
 * Absolute URLs and in-page anchors pass through untouched. Relative paths are
 * normalised against the file's own location and then mapped onto site routes:
 * root `llms-*` files become `/guidance/<slug>`, `docs/**.md` becomes
 * `/docs/<slug>`, and files that are published verbatim keep their raw
 * path. Anything else points back at the repository on GitHub so no link dies.
 */
export function resolveLink(href: string, ctx: LinkContext): ResolvedLink {
  const trimmed = href.trim()

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed) || trimmed.startsWith('//')) {
    return { href: trimmed, external: !trimmed.startsWith('mailto:') }
  }
  if (trimmed.startsWith('#') || trimmed === '') {
    return { href: trimmed, external: false }
  }

  const hashAt = trimmed.indexOf('#')
  const hash = hashAt === -1 ? '' : trimmed.slice(hashAt)
  const rawTarget = hashAt === -1 ? trimmed : trimmed.slice(0, hashAt)

  const from = ctx.base === 'docs' ? path.posix.join('docs', ctx.dir) : '.'
  // `path.posix.normalize` collapses `./` and `../` relative to the file's directory.
  let target = path.posix.normalize(path.posix.join(from, rawTarget.replace(/^\//, '')))
  target = target.replace(/^\.\//, '')

  // A `../` that escapes the repository root is still a repository-root path.
  if (target.startsWith('../')) target = target.replace(/^(\.\.\/)+/, '')

  const trailingSlash = target.endsWith('/')
  const clean = trailingSlash ? target.slice(0, -1) : target

  // Root guidance documents.
  if (/^llms[-.][^/]*\.(txt|md)$/.test(clean) || clean === 'llms.txt') {
    return { href: `/guidance/${clean.replace(/\.(txt|md)$/, '')}${hash}`, external: false }
  }

  // Documentation hub pages.
  if (clean.startsWith('docs/') && clean.endsWith('.md')) {
    return { href: `${docsHrefFor(clean.slice(5))}${hash}`, external: false }
  }
  if (clean === 'docs') {
    return { href: `/docs${hash}`, external: false }
  }

  // Files published verbatim keep their raw path.
  if (RAW_ROOT_FILES.has(clean) || (!trailingSlash && RAW_DIRS.some((d) => clean.startsWith(d)))) {
    return { href: `/${clean}${hash}`, external: false }
  }

  // Everything else — directories, `skills/`, scripts not published here. This
  // site serves documents, not directory listings, so these point at the
  // repository rather than resolving to a 404.
  const base = trailingSlash || !path.posix.extname(clean) ? GITHUB_TREE : GITHUB_BLOB
  return { href: `${base}${clean}${hash}`, external: true }
}

/* ------------------------------------------------------------------ *
 * Raw file access
 * ------------------------------------------------------------------ */

export interface RawFile {
  /** Repository-relative path, e.g. `docs/index.md`. */
  relative: string
  contents: Buffer
  /** `Content-Type` the file should be served with. */
  contentType: string
}

/** Successful reads only — see the bounding argument in `readRawFile`. */
const rawCache = new Map<string, RawFile>()

/**
 * Read a repository file as text through the same cache the raw handler uses.
 *
 * Server components and route handlers therefore share one set of buffers: a
 * page render and a `/api/search` call in the same warm instance touch the disk
 * once between them, not twice.
 */
function readSourceFile(relative: string): string {
  const raw = readRawFile(relative)
  if (!raw) throw new Error(`${relative} is not a publishable repository file.`)
  return raw.contents.toString('utf8')
}

/**
 * Read a published raw file, or return `null` when the path is not publishable
 * or does not exist.
 *
 * Two independent checks stand between the URL and the filesystem: the
 * allowlist in `isPublishableRawPath`, and a containment check on the resolved
 * absolute path. Either one alone would be enough; both are here because the
 * input is attacker-controlled.
 */
export function readRawFile(relative: string): RawFile | null {
  // The cache key is a request-controlled string, so what may enter this Map
  // has to be bounded by something other than the request. The allowlist alone
  // is not that bound: `llms-<anything>.txt` satisfies it, so an attacker could
  // mint unlimited distinct keys that resolve to nothing. Only *misses* are the
  // danger, so only hits are stored — the Map can therefore never hold more
  // entries than there are published files. A miss costs one `statSync`, which
  // is bounded work, and repeating it is the correct price for staying bounded.
  if (!isPublishableRawPath(relative)) return null

  const cached = rawCache.get(relative)
  if (cached !== undefined) return cached

  const result = loadRawFile(relative)
  if (result) rawCache.set(relative, result)
  return result
}

function loadRawFile(relative: string): RawFile | null {
  const absolute = path.resolve(REPO_ROOT, relative)
  // `path.resolve` collapses any `..` that survived decoding. If the result is
  // not inside the repository, the request was an escape attempt.
  if (absolute !== REPO_ROOT && !absolute.startsWith(REPO_ROOT + path.sep)) return null

  let stat: fs.Stats
  try {
    stat = fs.statSync(absolute)
  } catch {
    return null
  }
  if (!stat.isFile()) return null

  const ext = path.extname(absolute).toLowerCase()
  return {
    relative,
    contents: fs.readFileSync(absolute),
    // Everything published here is source text. `.json` keeps its own type so
    // `context7.json` stays machine-parseable; everything else — including
    // `.md` and `.html` — is served as plain text, because the point of these
    // URLs is that a fetcher receives the file, not a rendering of it.
    contentType:
      ext === '.json' ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
  }
}

/* ------------------------------------------------------------------ *
 * Corpus: guidance documents and doc pages as one addressable set
 * ------------------------------------------------------------------ */

export interface CorpusEntry {
  id: string
  origin: 'guidance' | 'docs'
  title: string
  summary: string
  /** Repository-relative path. */
  file: string
  /** Reading view on this site — the browsable index entry. */
  href: string
  /**
   * Canonical rendered address. For guidance this is the original basename at
   * the root (`/llms-rise-framework`); for docs it is the `/docs/<slug>` page.
   * This is the address declared as `<link rel="canonical">` on the page.
   */
  renderedPath: string
  /**
   * The extension-less basename alias at the root, present only for guidance
   * documents (`llms-rise-framework`). `null` for docs, which have no root alias.
   */
  basename: string | null
  /** Canonical plain-text address. */
  rawPath: string
  bytes: number
  related: string[]
}

interface IndexedEntry extends CorpusEntry {
  /** Body text with author comments stripped, used verbatim for snippets. */
  text: string
  /** The same text lower-cased. Indices into it are valid in `text`. */
  body: string
  /** Lower-cased title + summary + filename, weighted above the body. */
  head: string
}

let corpusCache: IndexedEntry[] | null = null

function buildCorpus(): IndexedEntry[] {
  if (corpusCache) return corpusCache

  const guidance: IndexedEntry[] = getGuidanceDocs().map((doc) => {
    const body = stripHtmlComments(readGuidanceSource(doc))
    return {
      id: doc.slug,
      origin: 'guidance',
      title: doc.title,
      summary: doc.summary,
      file: doc.file,
      href: `/guidance/${doc.slug}`,
      renderedPath: `/${doc.slug}`,
      basename: doc.slug,
      rawPath: doc.rawPath,
      bytes: doc.bytes,
      related: doc.related.map((r) => r.label),
      text: body,
      body: body.toLowerCase(),
      head: [doc.file, doc.title, doc.summary].join(' ').toLowerCase(),
    }
  })

  const docs: IndexedEntry[] = getDocPages().map((page) => {
    const body = stripHtmlComments(readDocSource(page))
    const href = page.segments.join('/') === 'index' ? '/docs' : page.href
    return {
      id: page.segments.join('/'),
      origin: 'docs',
      title: page.title,
      summary: page.summary,
      file: page.file,
      href,
      renderedPath: href,
      basename: null,
      rawPath: page.rawPath,
      bytes: page.bytes,
      related: [],
      text: body,
      body: body.toLowerCase(),
      head: [page.file, page.title, page.summary].join(' ').toLowerCase(),
    }
  })

  corpusCache = [...guidance, ...docs]
  return corpusCache
}

/** Every document, machine-readable, without the search-only fields. */
export function getCorpus(): CorpusEntry[] {
  return buildCorpus().map(({ text: _text, body: _body, head: _head, ...entry }) => entry)
}

export interface SearchHit extends CorpusEntry {
  score: number
  /** A short run of body text around the first match, with the term marked. */
  snippet: string
}

const SNIPPET_RADIUS = 110

/**
 * Body text around `at`, trimmed to word boundaries and ellipsised.
 *
 * A snippet is read as prose, not as source, so the markdown scaffolding —
 * heading hashes, blockquote carets, list bullets, emphasis, link syntax — is
 * unwrapped. Offsets are computed before the unwrapping, so the slice is taken
 * first and cleaned second.
 */
function snippetAround(source: string, at: number): string {
  const start = Math.max(0, at - SNIPPET_RADIUS)
  const end = Math.min(source.length, at + SNIPPET_RADIUS)

  let slice = source
    .slice(start, end)
    .replace(/```+[a-z]*/gi, ' ')
    .replace(/^[ \t]*#{1,6}[ \t]*/gm, '')
    .replace(/^[ \t]*>[ \t]*/gm, '')
    .replace(/^[ \t]*[-*+][ \t]+/gm, '· ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*{1,3}|`+/g, '')
    // Underscores only where they wrap a word, so `snake_case` survives.
    .replace(/(^|\s)_+|_+(?=\s|$)/g, '$1')
    .replace(/\s*\|\s*/g, '  ')
    .replace(/\s+/g, ' ')
    .trim()

  if (start > 0) slice = `…${slice.replace(/^\S+\s/, '')}`
  if (end < source.length) slice = `${slice.replace(/\s\S+$/, '')}…`
  return slice
}

/**
 * Rank the corpus against a query.
 *
 * Every term must appear somewhere in the document — an AND search, because
 * these are reference documents and a term the reader typed is a term they
 * meant. Placement decides the order: a term in the title or filename says more
 * about what a document is than the same term buried in its body, so the head
 * fields carry the weight and body frequency only breaks ties.
 */
export function searchCorpus(query: string, limit = 40): { total: number; hits: SearchHit[] } {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean).slice(0, 8)
  if (terms.length === 0) return { total: 0, hits: [] }

  const scored: SearchHit[] = []

  for (const entry of buildCorpus()) {
    let score = 0
    let snippetAt = -1
    let missing = false

    for (const term of terms) {
      const inTitle = entry.title.toLowerCase().includes(term)
      const inFile = entry.file.toLowerCase().includes(term)
      const inHead = entry.head.includes(term)
      const bodyAt = entry.body.indexOf(term)

      if (!inHead && bodyAt === -1) {
        missing = true
        break
      }

      if (inTitle) score += 24
      if (inFile) score += 16
      if (inHead) score += 8

      if (bodyAt !== -1) {
        // Frequency matters, but a long document should not win on length
        // alone, so the contribution is capped.
        let count = 0
        let from = bodyAt
        while (from !== -1 && count < 25) {
          count += 1
          from = entry.body.indexOf(term, from + term.length)
        }
        score += Math.min(count, 25)
        if (snippetAt === -1) snippetAt = bodyAt
      }
    }

    if (missing) continue

    // An exact filename or whole-phrase title match is almost always the
    // document the reader is after.
    const phrase = terms.join(' ')
    if (entry.title.toLowerCase().includes(phrase)) score += 40
    if (entry.id.toLowerCase() === phrase.replace(/\s+/g, '-')) score += 60

    const snippet =
      snippetAt === -1
        ? entry.summary || snippetAround(entry.text.replace(/^#.*$/m, '').trim(), 0)
        : snippetAround(entry.text, snippetAt)

    scored.push({
      score,
      snippet,
      id: entry.id,
      origin: entry.origin,
      title: entry.title,
      summary: entry.summary,
      file: entry.file,
      href: entry.href,
      renderedPath: entry.renderedPath,
      basename: entry.basename,
      rawPath: entry.rawPath,
      bytes: entry.bytes,
      related: entry.related,
    })
  }

  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
  return { total: scored.length, hits: scored.slice(0, limit) }
}

/* ------------------------------------------------------------------ *
 * Formatting helpers
 * ------------------------------------------------------------------ */

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1000) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

export const SITE = {
  name: 'llms.jgwill.com',
  title: 'Guillaume Descoteaux-Isabelle — LLMS-txt',
  tagline:
    'An interdisciplinary portfolio at the nexus of Indigenous epistemologies, AI systems, and narrative storytelling.',
  description:
    'Guidance for AI companions grounded in relational accountability, structural dynamics, and ceremonial technology. Every document is published as plain text at its canonical address.',
  url: 'https://llms.jgwill.com',
} as const
