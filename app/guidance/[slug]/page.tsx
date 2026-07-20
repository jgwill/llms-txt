import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  SITE,
  formatBytes,
  getGuidanceDoc,
  getGuidanceDocs,
  readGuidanceSource,
} from '@/lib/content'
import { renderMarkdown } from '@/lib/markdown'

// Known documents are prerendered and cached at the edge. `dynamicParams` stays
// at its default of `true` so a file added to the repository between builds is
// still served — the route reads the filesystem, not a frozen list.
export function generateStaticParams() {
  return getGuidanceDocs().map((doc) => ({ slug: doc.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = getGuidanceDoc(slug)
  if (!doc) return {}
  const description =
    doc.summary || `${doc.title} — guidance document published as ${doc.file} at ${SITE.name}.`
  return {
    title: doc.title,
    description,
    alternates: { canonical: `/guidance/${doc.slug}` },
    // The share card itself comes from `opengraph-image.tsx` in this segment;
    // Next attaches it to whatever `openGraph` block is declared here.
    openGraph: {
      type: 'article',
      title: doc.title,
      description,
      url: `/guidance/${doc.slug}`,
    },
  }
}

export default async function GuidancePage({ params }: Props) {
  const { slug } = await params
  const doc = getGuidanceDoc(slug)
  if (!doc) notFound()

  // The `.txt` files in this repository are markdown-formatted, so both
  // extensions render through the same pipeline.
  const html = renderMarkdown(readGuidanceSource(doc), { base: 'root' })

  return (
    <main>
      <div className="wrap wrap-narrow">
        <Link className="backlink" href="/guidance">
          ← Guidance index
        </Link>

        <p className="eyebrow">
          {doc.kind === 'index' ? 'Index document' : 'Guidance document'}{' '}
          <span className="mark">/</span> {doc.ext}
        </p>

        <div className="rawband">
          <span className="rawband-label">Canonical</span>
          <a href={doc.rawPath}>
            {SITE.url}
            {doc.rawPath}
          </a>
          <span className="rawband-size">{formatBytes(doc.bytes)}</span>
        </div>

        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        {doc.related.length > 0 ? (
          <section className="related" aria-labelledby="related-heading">
            <h2 id="related-heading">Related documents</h2>
            <ul>
              {doc.related.map((ref) =>
                ref.href ? (
                  // Related targets may be site routes or raw files copied into
                  // the export, so these stay plain anchors.
                  <li key={ref.label}>
                    <a href={ref.href}>{ref.label}</a>
                  </li>
                ) : (
                  <li className="inert" key={ref.label}>
                    {ref.label}
                  </li>
                ),
              )}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  )
}
