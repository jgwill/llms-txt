import { SITE, getCorpus } from '@/lib/content'

/**
 * The machine-readable front door.
 *
 * `llms.txt` is the index a human wrote for machines to read as prose. This is
 * the same collection as data: every document with its title, summary,
 * relations, canonical raw address, and reading view. An agent can fetch this
 * once and know the whole corpus without scraping any page.
 */

export async function GET(request: Request) {
  const url = new URL(request.url)
  const origin = url.searchParams.get('origin')
  const base = SITE.url

  const documents = getCorpus()
    .filter((entry) => !origin || entry.origin === origin)
    .map((entry) => ({
      id: entry.id,
      origin: entry.origin,
      title: entry.title,
      summary: entry.summary,
      file: entry.file,
      bytes: entry.bytes,
      related: entry.related,
      // Extension present → raw artifact; extension absent → rendered page.
      rawUrl: `${base}${entry.rawPath}`,
      renderedUrl: `${base}${entry.renderedPath}`,
      // The original basename alias at the root (guidance only; null for docs).
      basename: entry.basename,
      // Kept for backward compatibility — the browsable /guidance/<slug> entry.
      humanUrl: `${base}${entry.href}`,
    }))

  return Response.json(
    {
      site: { name: SITE.name, title: SITE.title, url: base, description: SITE.description },
      generatedAt: new Date().toISOString(),
      counts: {
        total: documents.length,
        guidance: documents.filter((d) => d.origin === 'guidance').length,
        docs: documents.filter((d) => d.origin === 'docs').length,
      },
      endpoints: {
        index: `${base}/llms.txt`,
        expandedIndex: `${base}/llms-full.txt`,
        search: `${base}/api/search?q=`,
        manifest: `${base}/api/manifest`,
      },
      documents,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  )
}
