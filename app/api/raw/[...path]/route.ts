import { readRawFile } from '@/lib/content'

/**
 * Serve the repository's canonical raw files.
 *
 * llms.jgwill.com is read by AI agents and indexing tools that fetch addresses
 * such as https://llms.jgwill.com/llms.txt and expect plain text identical to
 * the file in the repository. Those addresses are rewritten onto this handler by
 * `rewrites()` in `next.config.mjs`, so the canonical URLs never change shape
 * even though the bytes now come from a function instead of a copied file.
 *
 * Nothing here transforms content. Bytes in, bytes out.
 *
 * On Vercel these files reach the function only because `next.config.mjs`
 * declares them in `outputFileTracingIncludes` — file tracing cannot see a read
 * whose path is computed from the request.
 */

/** Files change only when the repository is deployed, so the edge may hold them
 *  indefinitely while the browser always revalidates. */
const CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400'

function textResponse(body: string, status: number) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params

  // Segments arrive percent-decoded. A `..`, an absolute path, or a NUL is
  // refused here and again inside `readRawFile`, which additionally proves the
  // resolved path stays inside the repository.
  const relative = (segments ?? []).join('/')
  const file = readRawFile(relative)

  if (!file) return textResponse('Not found\n', 404)

  return new Response(file.contents as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': file.contentType,
      'Content-Length': String(file.contents.byteLength),
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': CACHE_CONTROL,
    },
  })
}

export async function HEAD(
  request: Request,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const response = await GET(request, ctx)
  return new Response(null, { status: response.status, headers: response.headers })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Cache-Control': CACHE_CONTROL,
    },
  })
}
