import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import path from 'node:path'
import { formatBytes, getDocPage, getDocPagesForRouting, readDocSource } from '@/lib/content'
import { renderMarkdown } from '@/lib/markdown'

// Known pages are prerendered and cached at the edge. `dynamicParams` stays at
// its default of `true` so a document added to the repository between builds is
// still served — the route reads the filesystem, not a frozen list.
export function generateStaticParams() {
  return getDocPagesForRouting().map((page) => ({ slug: page.segments }))
}

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getDocPage(slug)
  if (!page) return {}
  const description =
    page.summary || `${page.title} — documentation from the LLMS-txt portfolio.`
  return {
    title: page.title,
    description,
    alternates: { canonical: page.href },
    openGraph: {
      type: 'article',
      title: page.title,
      description,
      url: page.href,
      images: [
        {
          url: `/api/og/docs/${page.segments.join('/')}`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
  }
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const page = getDocPage(slug)
  if (!page) notFound()

  // Links inside the file are relative to the file's own directory under docs/.
  const dir = path.posix.dirname(page.segments.join('/'))
  const html = renderMarkdown(readDocSource(page), { base: 'docs', dir })

  return (
    <main>
      <div className="wrap wrap-narrow">
        <Link className="backlink" href="/docs">
          ← Documentation hub
        </Link>

        <p className="eyebrow">
          {page.section ? (
            <>
              {page.section} <span className="mark">/</span>{' '}
            </>
          ) : null}
          Documentation
        </p>

        <div className="rawband">
          <span className="rawband-label">Raw</span>
          <a href={page.rawPath}>{page.rawPath}</a>
          <span className="rawband-size">{formatBytes(page.bytes)}</span>
        </div>

        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  )
}
