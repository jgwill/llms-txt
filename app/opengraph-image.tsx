import { ImageResponse } from 'next/og'
import { SITE, getGuidanceDocs } from '@/lib/content'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og-card'

export const alt = SITE.title
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function Image() {
  const count = getGuidanceDocs().length

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Knowledge portfolio"
        title="Guidance written for machines that read, and people who relate."
        summary="Guillaume Descoteaux-Isabelle — Indigenous epistemologies, AI systems, and narrative storytelling."
        footer={`${count} documents · llms.txt`}
      />
    ),
    { ...size },
  )
}
