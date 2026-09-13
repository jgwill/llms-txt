'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'

export interface BrowserEntry {
  slug: string
  file: string
  ext: string
  title: string
  summary: string
  size: string
  kind: 'index' | 'guidance'
}

interface SearchResult {
  id: string
  origin: 'guidance' | 'docs'
  title: string
  summary: string
  snippet: string
  file: string
  href: string
  bytes: number
}

interface SearchPayload {
  query: string
  total: number
  returned: number
  results: SearchResult[]
}

const DEBOUNCE_MS = 180

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1000) return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

/**
 * The guidance browser.
 *
 * With no query it lists the root documents the server rendered. As soon as the
 * reader types, it asks `/api/search`, which reads the full text of every
 * guidance file *and* every page under `docs/` — text that never has to travel
 * to the browser. That is the difference between filtering a list and searching
 * a corpus.
 */
export default function GuidanceBrowser({ entries }: { entries: BrowserEntry[] }) {
  const [query, setQuery] = useState('')
  const [payload, setPayload] = useState<SearchPayload | null>(null)
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)
  const inputId = useId()

  // Each keystroke supersedes the one before it: the timer is cleared and the
  // in-flight request aborted, so results can never arrive out of order.
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const trimmed = query.trim()

    abortRef.current?.abort()

    if (!trimmed) {
      setPayload(null)
      setPending(false)
      setFailed(false)
      return
    }

    setPending(true)
    setFailed(false)

    const controller = new AbortController()
    abortRef.current = controller

    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`search failed: ${response.status}`)
          return response.json() as Promise<SearchPayload>
        })
        .then((data) => {
          setPayload(data)
          setPending(false)
        })
        .catch((error: unknown) => {
          if (error instanceof DOMException && error.name === 'AbortError') return
          setFailed(true)
          setPending(false)
        })
    }, DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const searching = query.trim().length > 0
  const results = payload?.results ?? []

  return (
    <>
      <div className="filter">
        <label htmlFor={inputId}>Search every document — titles, summaries, and full text</label>
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="structural tension, ceremony, pde…"
          autoComplete="off"
          spellCheck={false}
          aria-describedby={`${inputId}-count`}
        />
        <p className="filter-count" id={`${inputId}-count`} aria-live="polite">
          {!searching ? (
            <>
              <b>{entries.length}</b> documents at the repository root
            </>
          ) : failed ? (
            <>Search is unavailable right now.</>
          ) : payload ? (
            <>
              <b>{payload.total}</b> {payload.total === 1 ? 'document' : 'documents'} match
              {payload.returned < payload.total ? <> · showing the top {payload.returned}</> : null}
            </>
          ) : (
            <>Searching…</>
          )}
        </p>
      </div>

      {!searching ? (
        <div className="register">
          {entries.map((entry) => (
            <Link className="register-row" href={`/guidance/${entry.slug}`} key={entry.slug}>
              <span className="register-meta">
                <span className="register-file">{entry.file}</span>
                <span className="register-stats">
                  <span className={entry.kind === 'index' ? 'ext ext-index' : 'ext'}>
                    {entry.kind === 'index' ? 'index' : entry.ext}
                  </span>{' '}
                  {entry.size}
                </span>
              </span>
              <span>
                <span className="register-title">{entry.title}</span>
                {entry.summary ? <span className="register-summary">{entry.summary}</span> : null}
              </span>
            </Link>
          ))}
        </div>
      ) : failed ? (
        <p className="empty">
          The search service did not respond. The documents are still reachable from the list above
          and at their raw addresses.
        </p>
      ) : results.length === 0 ? (
        pending || !payload ? (
          <p className="empty">Searching the full text of every document…</p>
        ) : (
          <p className="empty">
            Nothing matches “{query.trim()}”. Every term has to appear in a document — try fewer
            words.
          </p>
        )
      ) : (
        <div className="register" aria-busy={pending}>
          {results.map((result) => (
            <Link className="register-row" href={result.href} key={`${result.origin}:${result.id}`}>
              <span className="register-meta">
                <span className="register-file">{result.file}</span>
                <span className="register-stats">
                  <span className={result.origin === 'docs' ? 'ext ext-index' : 'ext'}>
                    {result.origin === 'docs' ? 'docs' : 'guidance'}
                  </span>{' '}
                  {formatBytes(result.bytes)}
                </span>
              </span>
              <span>
                <span className="register-title">{result.title}</span>
                <span className="register-summary">{result.snippet || result.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
