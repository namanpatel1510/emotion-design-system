import './docs.css'

/* ── Color token data ── */
const COLOR_SCALES = [
  {
    name: 'Primary — Indigo',
    swatches: [
      { token: '--color-primary-50',  hex: '#eef2ff' },
      { token: '--color-primary-100', hex: '#e0e7ff' },
      { token: '--color-primary-200', hex: '#c7d2fe' },
      { token: '--color-primary-300', hex: '#a5b4fc' },
      { token: '--color-primary-400', hex: '#818cf8' },
      { token: '--color-primary-500', hex: '#6366f1' },
      { token: '--color-primary-600', hex: '#4f46e5' },
      { token: '--color-primary-700', hex: '#4338ca' },
      { token: '--color-primary-800', hex: '#3730a3' },
      { token: '--color-primary-900', hex: '#312e81' },
    ],
  },
  {
    name: 'Accent — Emerald',
    swatches: [
      { token: '--color-accent-50',  hex: '#f0fdf4' },
      { token: '--color-accent-100', hex: '#dcfce7' },
      { token: '--color-accent-200', hex: '#bbf7d0' },
      { token: '--color-accent-300', hex: '#86efac' },
      { token: '--color-accent-400', hex: '#34d399' },
      { token: '--color-accent-500', hex: '#10b981' },
      { token: '--color-accent-600', hex: '#059669' },
      { token: '--color-accent-700', hex: '#047857' },
      { token: '--color-accent-800', hex: '#065f46' },
      { token: '--color-accent-900', hex: '#064e3b' },
    ],
  },
  {
    name: 'Neutral — Slate',
    swatches: [
      { token: '--color-slate-50',  hex: '#f8fafc' },
      { token: '--color-slate-100', hex: '#f1f5f9' },
      { token: '--color-slate-200', hex: '#e2e8f0' },
      { token: '--color-slate-300', hex: '#cbd5e1' },
      { token: '--color-slate-500', hex: '#64748b' },
      { token: '--color-slate-600', hex: '#475569' },
      { token: '--color-slate-700', hex: '#334155' },
      { token: '--color-slate-900', hex: '#0f172a' },
    ],
  },
]

const SEMANTIC_COLORS = [
  { label: 'Primary',  token: '--color-primary', hex: '#4f46e5', text: '#fff' },
  { label: 'Accent',   token: '--color-accent',  hex: '#10b981', text: '#fff' },
  { label: 'Danger',   token: '--color-danger',  hex: '#ef4444', text: '#fff' },
  { label: 'Warning',  token: '--color-warning', hex: '#f59e0b', text: '#fff' },
  { label: 'Surface',  token: '--color-surface', hex: '#ffffff', text: '#0f172a' },
  { label: 'Background',token: '--color-background', hex: '#f8fafc', text: '#0f172a' },
]

const TYPE_SCALE = [
  { token: '--font-size-xs',   size: '0.75rem',  label: 'XS — 12px',  sample: 'Badge text, sub-labels' },
  { token: '--font-size-sm',   size: '0.875rem', label: 'SM — 14px',  sample: 'Table headers, body text' },
  { token: '--font-size-base', size: '1rem',     label: 'Base — 16px',sample: 'Card titles, input text' },
  { token: '--font-size-lg',   size: '1.125rem', label: 'LG — 18px',  sample: 'Section labels' },
  { token: '--font-size-xl',   size: '1.25rem',  label: 'XL — 20px',  sample: 'Section headers' },
  { token: '--font-size-3xl',  size: '1.875rem', label: '3XL — 30px', sample: 'Large metrics, hero numbers' },
]

const SPACE_SCALE = [
  { token: '--space-1', px: '4px',  rem: '0.25rem' },
  { token: '--space-2', px: '8px',  rem: '0.5rem'  },
  { token: '--space-3', px: '12px', rem: '0.75rem' },
  { token: '--space-4', px: '16px', rem: '1rem'    },
  { token: '--space-6', px: '24px', rem: '1.5rem'  },
  { token: '--space-8', px: '32px', rem: '2rem'    },
]

const RADII = [
  { token: '--radius-sm',   value: '4px',    label: 'SM' },
  { token: '--radius-md',   value: '6px',    label: 'MD' },
  { token: '--radius-lg',   value: '8px',    label: 'LG' },
  { token: '--radius-xl',   value: '16px',   label: 'XL' },
  { token: '--radius-full', value: '9999px', label: 'Full' },
]

const SHADOWS = [
  { label: 'SM',  token: '--shadow-sm', css: '0 6px 16px rgba(16,24,40,0.06)' },
  { label: 'MD',  token: '--shadow-md', css: '0 12px 32px rgba(16,24,40,0.08)' },
  { label: 'LG',  token: '--shadow-lg', css: '0 20px 48px rgba(16,24,40,0.14)' },
]

function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="doc-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function Token({ name }: { name: string }) {
  return <code className="doc-token">{name}</code>
}

export default function Docs() {
  return (
    <div className="docs-page">
      <div className="docs-hero">
        <span className="docs-hero__eyebrow">Design System</span>
        <h1 className="docs-hero__title">Documentation</h1>
        <p className="docs-hero__sub">Tokens, typography, spacing, and component guidelines for the Emotion Design System.</p>
      </div>

      {/* ── Colors ── */}
      <DocSection id="colors" title="Color Tokens">
        <p className="doc-desc">The palette is built on three scales — Primary (Indigo), Accent (Emerald), and Neutral (Slate) — plus semantic aliases for components.</p>

        <h3 className="doc-sub">Semantic Aliases</h3>
        <div className="doc-semantic-row">
          {SEMANTIC_COLORS.map(c => (
            <div key={c.token} className="doc-semantic" style={{ background: c.hex, color: c.text }}>
              <span className="doc-semantic__label">{c.label}</span>
              <span className="doc-semantic__token">{c.token}</span>
              <span className="doc-semantic__hex">{c.hex}</span>
            </div>
          ))}
        </div>

        {COLOR_SCALES.map(scale => (
          <div key={scale.name} className="doc-scale">
            <h3 className="doc-sub">{scale.name}</h3>
            <div className="doc-swatches">
              {scale.swatches.map(s => {
                const isLight = parseInt(s.hex.slice(1), 16) > 0xaaaaaa
                return (
                  <div key={s.token} className="doc-swatch" style={{ background: s.hex }}>
                    <span className="doc-swatch__hex" style={{ color: isLight ? '#334155' : '#e2e8f0' }}>{s.hex}</span>
                    <span className="doc-swatch__token" style={{ color: isLight ? '#64748b' : '#94a3b8' }}>{s.token.replace('--color-', '')}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </DocSection>

      {/* ── Typography ── */}
      <DocSection id="typography" title="Typography Scale">
        <p className="doc-desc">All sizes use <Token name="--font-family-sans" /> (Inter) with a consistent weight system: 400 normal, 500 medium, 700 bold.</p>
        <div className="doc-type-table">
          {TYPE_SCALE.map(t => (
            <div key={t.token} className="doc-type-row">
              <div className="doc-type-meta">
                <Token name={t.token} />
                <span className="doc-type-label">{t.label}</span>
              </div>
              <div className="doc-type-sample" style={{ fontSize: t.size }}>{t.sample}</div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── Spacing ── */}
      <DocSection id="spacing" title="Spacing Scale">
        <p className="doc-desc">All spacing tokens are multiples of 4px. Use these for padding, margin, and gap.</p>
        <div className="doc-space-list">
          {SPACE_SCALE.map(s => (
            <div key={s.token} className="doc-space-row">
              <Token name={s.token} />
              <div className="doc-space-bar" style={{ width: s.px, minWidth: s.px }} />
              <span className="doc-space-val">{s.px} <span className="doc-space-rem">/ {s.rem}</span></span>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── Radius ── */}
      <DocSection id="radius" title="Border Radius">
        <div className="doc-radius-row">
          {RADII.map(r => (
            <div key={r.token} className="doc-radius-item">
              <div className="doc-radius-box" style={{ borderRadius: r.value }} />
              <Token name={r.token} />
              <span className="doc-radius-val">{r.value}</span>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ── Shadows ── */}
      <DocSection id="shadows" title="Shadows">
        <div className="doc-shadow-row">
          {SHADOWS.map(s => (
            <div key={s.token} className="doc-shadow-card" style={{ boxShadow: s.css }}>
              <span className="doc-shadow-label">{s.label}</span>
              <Token name={s.token} />
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  )
}
