import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE, getDocPages, getGuidanceDocs } from '@/lib/content'

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
}

const SYSTEMS = [
  {
    title: 'Relational Science',
    href: '/docs/relational-science',
    orientation: 'Decolonising Western knowledge biases',
    question: 'How does knowledge live in relationship?',
  },
  {
    title: 'Ceremonial Technology Development',
    href: '/docs/ceremonial-technology',
    orientation: 'Creating tools that honour relational accountability',
    question: 'How can technology serve ceremony and creation?',
  },
]

const READING_PATH = [
  {
    href: '/docs/creative-orientation',
    label: 'Creative Orientation',
    note: 'reframes everything from problem-solving to creation.',
  },
  {
    href: '/docs/structural-tension',
    label: 'Structural Tension',
    note: 'tension is disequilibrium, not a gap to bridge.',
  },
  {
    href: '/docs/indigenous-research-paradigm',
    label: 'Indigenous Research Paradigm',
    note: 'knowledge is relational, not extractable.',
  },
  {
    href: '/docs/rise-framework',
    label: 'RISE Framework',
    note: 'reverse-engineer, intent-extract, specify, export.',
  },
  {
    href: '/guidance/llms-delayed-resolution-principle',
    label: 'Delayed Resolution',
    note: 'hold tension rather than collapsing it prematurely.',
  },
]

export default function HomePage() {
  const guidance = getGuidanceDocs()
  const docs = getDocPages()
  const documentCount = guidance.filter((d) => d.kind === 'guidance').length

  return (
    <main>
      <div className="wrap">
        <section className="hero">
          <div className="settle">
            <p className="eyebrow">
              Knowledge portfolio <span className="mark">/</span> {SITE.name}
            </p>
            <h1 className="hero-thesis">
              Guidance written for machines that <em>read</em>, and people who{' '}
              <em>relate</em>.
            </h1>
            <p className="hero-byline">Guillaume Descoteaux-Isabelle</p>
            <p className="hero-lede">
              An interdisciplinary portfolio at the nexus of Indigenous epistemologies, AI systems,
              and narrative storytelling — {documentCount} guidance documents grounded in relational
              accountability, structural dynamics, and ceremonial technology.
            </p>

            <div className="canon">
              <p className="canon-label">Canonical addresses — fetch these directly</p>
              <ul>
                <li>
                  <a href="/llms.txt">{SITE.url}/llms.txt</a>
                  <span className="canon-note">minimal index</span>
                </li>
                <li>
                  <a href="/llms-full.txt">{SITE.url}/llms-full.txt</a>
                  <span className="canon-note">expanded index</span>
                </li>
                <li>
                  <a href="/llms-rise-framework.txt">{SITE.url}/llms-&lt;topic&gt;.txt</a>
                  <span className="canon-note">any document, raw</span>
                </li>
              </ul>
              <p className="canon-foot">
                Every page on this site is a reading view of a plain-text file. The file is the
                artifact; the page is the courtesy.
              </p>
            </div>

            <div className="cta-row">
              <Link className="cta cta-primary" href="/docs">
                Documentation hub
              </Link>
              <Link className="cta" href="/guidance">
                All {guidance.length} raw documents
              </Link>
            </div>
          </div>
        </section>

        <hr className="section-rule" />

        <section aria-labelledby="systems-heading">
          <div className="section-head">
            <h2 id="systems-heading">Two core systems</h2>
            <p className="filter-count">developed and documented here</p>
          </div>
          <div className="systems">
            {SYSTEMS.map((system) => (
              <article className="system" key={system.href}>
                <p className="system-orientation">{system.orientation}</p>
                <h3>
                  <Link href={system.href}>{system.title}</Link>
                </h3>
                <p className="system-question">{system.question}</p>
              </article>
            ))}
          </div>
          <p className="shared-commitment">
            Both systems share a foundational commitment:{' '}
            <strong>
              knowledge work is not problem-solving — it is creation within a web of relations.
            </strong>
          </p>
        </section>

        <hr className="section-rule" />

        <section aria-labelledby="path-heading">
          <div className="section-head">
            <h2 id="path-heading">If you are an AI companion, read in this order</h2>
          </div>
          <ol className="path">
            {READING_PATH.map((step) => (
              <li key={step.href}>
                <p>
                  <Link href={step.href}>{step.label}</Link> — {step.note}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <hr className="section-rule" />

        <section aria-labelledby="entry-heading">
          <div className="section-head">
            <h2 id="entry-heading">Where to go next</h2>
          </div>
          <div className="register">
            <Link className="register-row" href="/docs">
              <span className="register-meta">
                <span className="register-file">docs/index.md</span>
                <span className="register-stats">{docs.length} pages · curated</span>
              </span>
              <span>
                <span className="register-title">Documentation hub</span>
                <span className="register-summary">
                  Interlinked prose covering Relational Science, Ceremonial Technology Development,
                  and the frameworks and practices that carry them.
                </span>
              </span>
            </Link>
            <Link className="register-row" href="/guidance">
              <span className="register-meta">
                <span className="register-file">llms-*.txt · llms-*.md</span>
                <span className="register-stats">{guidance.length} files · searchable</span>
              </span>
              <span>
                <span className="register-title">Guidance index</span>
                <span className="register-summary">
                  Every raw guidance document at the repository root, with its summary, its
                  relations, and a one-click path to the plain-text original.
                </span>
              </span>
            </Link>
            <a className="register-row" href="/counter_articles/README.md">
              <span className="register-meta">
                <span className="register-file">counter_articles/</span>
                <span className="register-stats">raw markdown</span>
              </span>
              <span>
                <span className="register-title">Counter-articles</span>
                <span className="register-summary">
                  Academic writing for the case where epistemology diverges from the mainstream,
                  plus the registry of paradigmatically incompatible sources.
                </span>
              </span>
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
