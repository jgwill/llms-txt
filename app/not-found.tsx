import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Not found',
  description: 'No document exists at this address.',
}

export default function NotFound() {
  return (
    <main>
      <div className="wrap wrap-narrow">
        <p className="eyebrow">404</p>
        <h1 className="page-title">No document at this address</h1>
        <p className="page-lede">
          Raw files keep their original names — a guidance document lives at{' '}
          <code>/llms-&lt;topic&gt;.txt</code> and its reading view at{' '}
          <code>/guidance/llms-&lt;topic&gt;</code>.
        </p>
        <div className="cta-row">
          <Link className="cta cta-primary" href="/guidance">
            Guidance index
          </Link>
          <Link className="cta" href="/docs">
            Documentation hub
          </Link>
        </div>
      </div>
    </main>
  )
}
