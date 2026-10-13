import { ImageResponse } from 'next/og'
import { formatBytes, getDocPage } from '@/lib/content'
import { OG_SIZE, OgCard } from '@/lib/og-card'

/**
 * Share cards for documentation pages.
 *
 * The `opengraph-image` file convention cannot sit inside a catch-all segment,
 * and `docs/` is a tree — so this is the same card, rendered on demand from a
 * route handler and referenced explicitly from the page's `generateMetadata`.
 */

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params
  const page = getDocPage(slug ?? [])

  return new ImageResponse(
    (
      <OgCard
        eyebrow={page?.section ? `Documentation / ${page.section}` : 'Documentation'}
        title={page?.title ?? 'Documentation'}
        summary={page?.summary}
        footer={page ? `${page.file} · ${formatBytes(page.bytes)}` : undefined}
      />
    ),
    {
      ...OG_SIZE,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400',
      },
    },
  )
}
