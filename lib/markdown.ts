import { Marked, Renderer } from 'marked'
import type { Tokens } from 'marked'
import { resolveLink, stripHtmlComments, type LinkContext } from './content'

// `marked` passes HTML through verbatim, so author TODO comments have to be
// removed before parsing. The stripper lives in `content.ts` because the search
// indexer needs it too, and neither surface may ever leak those notes.
export { stripHtmlComments }

/** Stable, readable heading anchors so in-page links such as `#structural-thinking` resolve. */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Render repository markdown as site HTML.
 *
 * `.txt` guidance files are markdown-formatted, so both extensions take the same
 * path. Links are rewritten through `resolveLink` so intra-repository references
 * land on real site routes; external links open in a new tab.
 */
export function renderMarkdown(source: string, ctx: LinkContext): string {
  const marked = new Marked({ gfm: true, breaks: false })
  const seen = new Map<string, number>()

  marked.use({
    renderer: {
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, token: Tokens.Link) {
        const text = this.parser.parseInline(token.tokens)
        const { href, external } = resolveLink(token.href, ctx)
        const title = token.title ? ` title="${escapeAttribute(token.title)}"` : ''
        const rel = external ? ' target="_blank" rel="noopener noreferrer"' : ''
        return `<a href="${escapeAttribute(href)}"${title}${rel}>${text}</a>`
      },
      heading(
        this: { parser: { parseInline: (t: Tokens.Generic[]) => string } },
        token: Tokens.Heading,
      ) {
        const text = this.parser.parseInline(token.tokens)
        const base = slugifyHeading(text) || 'section'
        const count = seen.get(base) ?? 0
        seen.set(base, count + 1)
        const id = count === 0 ? base : `${base}-${count}`
        return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`
      },
      table(this: { parser: unknown }, token: Tokens.Table) {
        // Wrap tables so wide comparison grids scroll instead of stretching the page.
        const html = (Renderer.prototype.table as (t: Tokens.Table) => string).call(this, token)
        return `<div class="table-scroll">${html}</div>`
      },
    },
  })

  return marked.parse(stripHtmlComments(source), { async: false })
}
