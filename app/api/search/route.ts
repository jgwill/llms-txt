import { searchCorpus } from '@/lib/content'

/**
 * Search the whole corpus — every root guidance document and every page under
 * `docs/` — across titles, summaries, and body text.
 *
 * This is the reason the site has a server. A build-time array can hold titles
 * and summaries; it cannot hold ~700 KB of body text and still be a page a
 * browser wants to load. Here the bodies stay on the server, cached in module
 * scope, and only the ranked hits cross the wire.
 */

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = (url.searchParams.get('q') ?? '').trim().slice(0, 200)
  const limitParam = Number.parseInt(url.searchParams.get('limit') ?? '', 10)
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 40

  if (!query) {
    return Response.json(
      { query: '', total: 0, returned: 0, results: [] },
      { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' } },
    )
  }

  const { total, hits } = searchCorpus(query, limit)

  return Response.json(
    {
      query,
      total,
      returned: hits.length,
      results: hits.map((hit) => ({
        id: hit.id,
        origin: hit.origin,
        title: hit.title,
        summary: hit.summary,
        snippet: hit.snippet,
        file: hit.file,
        href: hit.href,
        rawPath: hit.rawPath,
        bytes: hit.bytes,
        score: hit.score,
      })),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        // Results only change when the corpus is redeployed, so the edge can
        // hold a query's answer while the browser keeps asking.
        'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      },
    },
  )
}
