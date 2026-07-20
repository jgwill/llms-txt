import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/content'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — LLMS-txt`,
  },
  description: SITE.description,
  authors: [{ name: 'Guillaume Descoteaux-Isabelle' }],
  openGraph: {
    type: 'website',
    siteName: SITE.title,
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="masthead">
            <div className="wrap masthead-inner">
              <Link href="/" className="wordmark">
                llms<span>.jgwill.com</span>
              </Link>
              <nav aria-label="Primary">
                <Link href="/docs">Documentation</Link>
                <Link href="/guidance">Guidance index</Link>
                <a href="/llms.txt">llms.txt</a>
                <a
                  href="https://github.com/jgwill/llms-txt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Repository
                </a>
              </nav>
            </div>
          </header>

          {children}

          <footer className="colophon">
            <div className="wrap colophon-inner">
              <p>
                This work is governed by the Indigenous Knowledge Stewardship License, which
                recognises that knowledge belongs to the relationships, land, and communities that
                created it. It also builds upon Robert Fritz&rsquo;s structural dynamics.
              </p>
              <div className="colophon-links">
                <a href="/LICENSE">LICENSE</a>
                <a href="/TERMS.md">TERMS.md</a>
                <a href="/KINSHIP.md">KINSHIP.md</a>
                <a href="/README.md">README.md</a>
                <a href="/llms.txt">llms.txt</a>
                <a href="/llms-full.txt">llms-full.txt</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
