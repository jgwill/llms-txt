import type { Metadata } from 'next'
import Link from 'next/link'
import { formatBytes, getGuidanceDocs } from '@/lib/content'
import GuidanceBrowser, { type BrowserEntry } from './GuidanceBrowser'

export const metadata: Metadata = {
  title: 'Guidance index',
  description:
    'Every raw guidance document published at llms.jgwill.com — titles, summaries, relations, and one-click access to the plain-text original.',
  alternates: { canonical: '/guidance' },
}

export default function GuidanceIndexPage() {
  const docs = getGuidanceDocs()
  const entries: BrowserEntry[] = docs.map((doc) => ({
    slug: doc.slug,
    file: doc.file,
    ext: doc.ext,
    title: doc.title,
    summary: doc.summary,
    size: formatBytes(doc.bytes),
    kind: doc.kind,
  }))

  // The two index files describe the collection rather than belonging to it, so
  // their absence from `llms.txt` is expected and not worth reporting.
  const unindexed = docs.filter((d) => !d.indexed && d.kind === 'guidance').length

  return (
    <main>
      <div className="wrap">
        <p className="eyebrow">
          Guidance <span className="mark">/</span> repository root
        </p>
        <h1 className="page-title">The raw documents</h1>
        <p className="page-lede">
          {docs.length} plain-text files sit at the root of this repository. Titles and summaries
          below are read from <a href="/llms.txt">llms.txt</a>, the index that AI tools fetch. The
          search field reads the full text of every one of them, and of every page under{' '}
          <Link href="/docs">docs/</Link>.
          {unindexed > 0
            ? ` ${unindexed} file${unindexed === 1 ? ' is' : 's are'} not yet listed there and appear here with a derived title.`
            : ''}
        </p>

        <hr className="section-rule" />

        <GuidanceBrowser entries={entries} />
      </div>
    </main>
  )
}
