import type { Metadata } from 'next'
import Link from 'next/link'
import { formatBytes, getDocPagesForRouting, getDocsIndex } from '@/lib/content'
import { renderMarkdown } from '@/lib/markdown'

const { page: indexPage, source } = getDocsIndex()

export const metadata: Metadata = {
  title: 'Documentation hub',
  description:
    indexPage.summary ||
    'Interlinked documentation covering Relational Science, Ceremonial Technology Development, and the full portfolio of frameworks and practices.',
  alternates: { canonical: '/docs' },
}

export default function DocsIndexPage() {
  const html = renderMarkdown(source, { base: 'docs', dir: '.' })
  const pages = getDocPagesForRouting()

  return (
    <main>
      <div className="wrap">
        <p className="eyebrow">
          Documentation hub <span className="mark">/</span> {pages.length + 1} pages
        </p>

        <div className="rawband">
          <span className="rawband-label">Raw</span>
          <a href={indexPage.rawPath}>{indexPage.rawPath}</a>
          <span className="rawband-size">{formatBytes(indexPage.bytes)}</span>
        </div>

        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

        <hr className="section-rule" />

        <section aria-labelledby="all-pages">
          <div className="section-head">
            <h2 id="all-pages">Every page in this hub</h2>
            <p className="filter-count">{pages.length} files under docs/</p>
          </div>
          <div className="register">
            {pages.map((page) => (
              <Link className="register-row" href={page.href} key={page.href}>
                <span className="register-meta">
                  <span className="register-file">{page.file}</span>
                  <span className="register-stats">
                    <span className="ext">md</span> {formatBytes(page.bytes)}
                  </span>
                </span>
                <span>
                  <span className="register-title">{page.title}</span>
                  {page.summary ? (
                    <span className="register-summary">{page.summary}</span>
                  ) : null}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
