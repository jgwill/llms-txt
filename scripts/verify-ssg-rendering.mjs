/**
 * Build-time guard: prove the reading layer is server-rendered, not client-only.
 *
 * Two independent regressions would silently break the machine contract this
 * site exists for — an agent fetching a rendered page expects the full body in
 * the initial HTML:
 *
 *   1. A page drops out of static generation (becomes a dynamic `ƒ` route, or is
 *      no longer prerendered at all).
 *   2. A page stays static but renders an empty `<article class="prose">` shell,
 *      deferring the body to client-side hydration.
 *
 * This script reads the build output that `next build` just produced and asserts
 * neither has happened. It is wired as `postbuild`, so a refactor that regresses
 * either way fails the build instead of shipping. It reads only local artifacts,
 * so it is deterministic for a given repository state.
 *
 * Run manually: `node scripts/verify-ssg-rendering.mjs`
 */
import fs from 'node:fs'
import path from 'node:path'

const REPO_ROOT = process.cwd()
const NEXT_DIR = path.join(REPO_ROOT, '.next')
const APP_DIR = path.join(NEXT_DIR, 'server', 'app')

const failures = []
const fail = (msg) => failures.push(msg)

/** Guidance basenames — mirrors `listRootGuidanceFiles()` in lib/content.ts. */
function guidanceBasenames() {
  return fs
    .readdirSync(REPO_ROOT, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => /^llms[-.].*\.(txt|md)$/.test(name) || name === 'llms.txt')
    .map((name) => name.replace(/\.(txt|md)$/, ''))
    .sort((a, b) => a.localeCompare(b))
}

/** Doc routes below docs/, excluding index (which renders at /docs). */
function docRoutes() {
  const docsDir = path.join(REPO_ROOT, 'docs')
  const out = []
  const walk = (dir, prefix = []) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(dir, e.name), [...prefix, e.name])
      else if (e.name.endsWith('.md')) out.push([...prefix, e.name.replace(/\.md$/, '')])
    }
  }
  walk(docsDir)
  return out
    .filter((segs) => !(segs.length === 1 && segs[0] === 'index'))
    .map((segs) => '/docs/' + segs.join('/'))
}

/** Inner text of the first `<article class="prose">…</article>`, tags stripped. */
function articleInnerText(html) {
  const m = /<article class="prose"[^>]*>([\s\S]*?)<\/article>/.exec(html)
  if (!m) return null
  return m[1]
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function htmlPathForRoute(route) {
  // `/docs` → docs.html ; `/docs/a/b` → docs/a/b.html ; `/guidance/x` → guidance/x.html
  const rel = route === '/' ? 'index' : route.replace(/^\//, '')
  return path.join(APP_DIR, `${rel}.html`)
}

// ── Load the prerender manifest: the authoritative "this route is static" list ──
let prerendered = new Set()
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(NEXT_DIR, 'prerender-manifest.json'), 'utf8'))
  prerendered = new Set(Object.keys(manifest.routes ?? {}))
} catch (err) {
  fail(`Cannot read .next/prerender-manifest.json — did \`next build\` run? (${err.message})`)
}

const guidanceRoutes = guidanceBasenames().map((b) => `/guidance/${b}`)
const allRoutes = [...guidanceRoutes, ...docRoutes(), '/docs']

let checkedStatic = 0
let checkedBody = 0

for (const route of allRoutes) {
  // (1) Must be statically prerendered — not a dynamic route.
  if (!prerendered.has(route)) {
    fail(`NOT statically prerendered (dynamic opt-out?): ${route}`)
  } else {
    checkedStatic++
  }

  // (2) The body must be baked into the static HTML.
  const htmlPath = htmlPathForRoute(route)
  if (!fs.existsSync(htmlPath)) {
    fail(`Prerendered HTML missing on disk: ${route} → ${path.relative(REPO_ROOT, htmlPath)}`)
    continue
  }
  const html = fs.readFileSync(htmlPath, 'utf8')
  const inner = articleInnerText(html)
  if (inner === null) {
    fail(`No <article class="prose"> element in static HTML: ${route}`)
  } else if (inner.length < 40) {
    fail(`Empty/near-empty rendered body (client-only regression?): ${route} — ${inner.length} chars`)
  } else {
    checkedBody++
  }
}

// (3) Spot-check known content is present, byte-baked, for a representative doc.
const riseHtml = htmlPathForRoute('/guidance/llms-rise-framework')
if (fs.existsSync(riseHtml)) {
  const html = fs.readFileSync(riseHtml, 'utf8')
  for (const needle of ['RISE', 'Reverse Engineering']) {
    if (!html.includes(needle)) fail(`Expected phrase "${needle}" absent from static /llms-rise-framework HTML`)
  }
}

if (failures.length > 0) {
  console.error(`\n✗ SSG rendering guard FAILED (${failures.length} problem(s)):`)
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}

console.log(
  `✓ SSG rendering guard passed — ${checkedStatic} routes statically prerendered, ` +
    `${checkedBody} with full body baked into static HTML (${guidanceRoutes.length} guidance + ${docRoutes().length + 1} docs).`,
)
