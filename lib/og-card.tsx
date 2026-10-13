import { SITE } from './content'

/**
 * The shared share-card layout.
 *
 * Every document on this site gets a real card rendered on demand, in the
 * site's own light palette — birch paper, spruce rule, ember mark. `next/og`
 * lays out with Flexbox only, so this is deliberately flat: no grid, no
 * pseudo-elements, every style inline.
 */

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const PAPER = '#eef0ea'
const INK = '#151c18'
const MUTED = '#5e6a63'
const SPRUCE = '#1e4e3d'
const EMBER = '#96551f'
const RULE = '#d2d8cc'

// `next/og` resolves fonts from what is bundled, not from the host, so this
// stack falls through to its built-in face. Naming the site's serif anyway
// costs nothing and takes effect the day a font file is embedded here.
const SERIF = 'Palatino, "Book Antiqua", Georgia, serif'

/** Long titles need to stay on the card; the tail is worth less than the fit. */
function clamp(value: string, max: number): string {
  const text = value.replace(/\s+/g, ' ').trim()
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).replace(/\s\S*$/, '')}…`
}

export function OgCard({
  eyebrow,
  title,
  summary,
  footer,
}: {
  eyebrow: string
  title: string
  summary?: string
  footer?: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: PAPER,
        color: INK,
        padding: '72px 80px',
        fontFamily: SERIF,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: EMBER,
          }}
        >
          {clamp(eyebrow, 64)}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 34,
            fontSize: title.length > 46 ? 66 : 82,
            lineHeight: 1.08,
            color: INK,
          }}
        >
          {clamp(title, 96)}
        </div>
        {summary ? (
          <div
            style={{
              display: 'flex',
              marginTop: 30,
              fontSize: 32,
              lineHeight: 1.4,
              color: MUTED,
            }}
          >
            {clamp(summary, 190)}
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', height: 2, background: RULE, marginBottom: 26 }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 28,
          }}
        >
          <div style={{ display: 'flex', color: SPRUCE }}>{SITE.name}</div>
          {footer ? (
            <div style={{ display: 'flex', color: MUTED, fontFamily: 'monospace', fontSize: 24 }}>
              {clamp(footer, 60)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
