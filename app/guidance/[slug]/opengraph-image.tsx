import { ImageResponse } from 'next/og'
import { formatBytes, getGuidanceDoc, getGuidanceDocs } from '@/lib/content'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og-card'

export const alt = 'Guidance document'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
  return getGuidanceDocs().map((doc) => ({ slug: doc.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getGuidanceDoc(slug)

  return new ImageResponse(
    (
      <OgCard
        eyebrow={doc?.kind === 'index' ? 'Index document' : 'Guidance document'}
        title={doc?.title ?? 'Guidance'}
        summary={doc?.summary}
        footer={doc ? `${doc.file} · ${formatBytes(doc.bytes)}` : undefined}
      />
    ),
    { ...size },
  )
}
