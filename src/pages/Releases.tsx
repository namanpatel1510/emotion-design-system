import './releases.css'

interface Change {
  type: 'added' | 'changed' | 'fixed' | 'removed'
  text: string
}

interface Release {
  version: string
  date: string
  tag: 'stable' | 'rc' | 'beta' | 'alpha'
  summary: string
  changes: Change[]
}

const RELEASES: Release[] = [
  {
    version: '1.3.0',
    date: 'May 15, 2026',
    tag: 'stable',
    summary: 'React Router integration, multi-page architecture, and documentation page.',
    changes: [
      { type: 'added',   text: 'React Router with HashRouter for GitHub Pages compatibility' },
      { type: 'added',   text: 'Four routed pages: Dashboard, Reports, Components, Settings' },
      { type: 'added',   text: 'Documentation page with color tokens, typography, spacing, and shadows' },
      { type: 'added',   text: 'Releases page with full changelog timeline' },
      { type: 'changed', text: 'Navbar updated to use NavLink with active-state highlighting' },
      { type: 'changed', text: 'Components dropdown now navigates to /components and smooth-scrolls' },
    ],
  },
  {
    version: '1.2.0',
    date: 'May 14, 2026',
    tag: 'stable',
    summary: 'Clickable dashboard cards with detail modals, spacing corrections, and CSS cleanup.',
    changes: [
      { type: 'added',   text: 'Dashboard cards open detail modals on click with 6-stat grids' },
      { type: 'added',   text: 'Keyboard accessibility (Enter/Space) for card interactions' },
      { type: 'fixed',   text: 'Removed double-padding from .dashboard-main — cards now align with other sections' },
      { type: 'fixed',   text: 'cards-column now uses display:flex + gap so cards have consistent spacing' },
      { type: 'changed', text: 'All inline spacing styles moved to CSS section-ID rules' },
      { type: 'removed', text: 'Dead Vite boilerplate from index.css (h1/h2 global rules, .hero, #center)' },
    ],
  },
  {
    version: '1.1.0',
    date: 'May 13, 2026',
    tag: 'stable',
    summary: 'Dark mode toggle and complete download button redesign.',
    changes: [
      { type: 'added',   text: 'Sun/moon dark mode toggle in navbar, persisted to localStorage' },
      { type: 'added',   text: '[data-theme="dark"] token overrides for all color and shadow variables' },
      { type: 'added',   text: 'Dark mode styles for navbar glass, dropdown, glass card variant, preferences' },
      { type: 'changed', text: 'DownloadButton rebuilt — shows filename, color-coded extension badge (PDF/XLSX/CSV/TXT…)' },
      { type: 'changed', text: 'Primary variant now uses an indigo gradient with glow shadow' },
      { type: 'changed', text: 'Download icon animates downward on hover; shine-sweep across all variants' },
    ],
  },
  {
    version: '1.0.0',
    date: 'May 12, 2026',
    tag: 'stable',
    summary: 'Initial production release of the Emotion Design System.',
    changes: [
      { type: 'added', text: 'Full token system: color, spacing, radius, shadow, typography' },
      { type: 'added', text: 'Navbar with Components dropdown and smooth-scroll navigation' },
      { type: 'added', text: 'DashboardCard component (default, compact, info, glass variants)' },
      { type: 'added', text: 'SearchBar, Checkbox, Slider, Modal components' },
      { type: 'added', text: 'DownloadButton with primary, secondary, ghost variants and loading/error states' },
      { type: 'added', text: 'LineChart and BarChart with animated SVG rendering' },
      { type: 'added', text: 'SortableTable with multi-column sorting and skeleton states' },
    ],
  },
  {
    version: '0.9.0',
    date: 'May 5, 2026',
    tag: 'rc',
    summary: 'Release candidate — charts, table, and animation polish.',
    changes: [
      { type: 'added',   text: 'BarChart with animated bar-grow and summary footer' },
      { type: 'added',   text: 'LineChart polyline draw-in animation' },
      { type: 'added',   text: 'SortableTable with striped rows and loading skeletons' },
      { type: 'changed', text: 'fadeInUp animation applied to all major components on mount' },
      { type: 'fixed',   text: 'Modal Escape key listener now cleans up correctly on close' },
    ],
  },
  {
    version: '0.8.0',
    date: 'Apr 22, 2026',
    tag: 'beta',
    summary: 'Beta release with core component library and design tokens.',
    changes: [
      { type: 'added',   text: 'Design token CSS file with primary, accent, neutral scales' },
      { type: 'added',   text: 'Modal component with destructive variant and loading spinner' },
      { type: 'added',   text: 'Checkbox and Slider atoms' },
      { type: 'changed', text: 'Switched font to Inter via Google Fonts' },
      { type: 'fixed',   text: 'Border-radius tokens unified across components' },
    ],
  },
  {
    version: '0.7.0',
    date: 'Apr 10, 2026',
    tag: 'alpha',
    summary: 'Alpha scaffold — Vite + React + TypeScript foundation.',
    changes: [
      { type: 'added', text: 'Project scaffolded with Vite, React 19, TypeScript' },
      { type: 'added', text: 'GitHub Pages deploy pipeline via gh-pages' },
      { type: 'added', text: 'Initial Navbar and DashboardCard prototype' },
    ],
  },
]

const TAG_LABELS: Record<Release['tag'], string> = {
  stable: 'Stable',
  rc: 'Release Candidate',
  beta: 'Beta',
  alpha: 'Alpha',
}

const TYPE_LABELS: Record<Change['type'], string> = {
  added:   'Added',
  changed: 'Changed',
  fixed:   'Fixed',
  removed: 'Removed',
}

export default function Releases() {
  return (
    <div className="releases-page">
      <div className="releases-hero">
        <span className="releases-hero__eyebrow">Changelog</span>
        <h1 className="releases-hero__title">Release Notes</h1>
        <p className="releases-hero__sub">A full history of every version of the Emotion Design System — what changed, when, and why.</p>
      </div>

      <div className="releases-timeline">
        {RELEASES.map((rel, i) => (
          <article key={rel.version} className="release-card">
            <div className="release-card__aside">
              <div className={`release-card__dot release-card__dot--${rel.tag}`} />
              {i < RELEASES.length - 1 && <div className="release-card__line" />}
            </div>

            <div className="release-card__body">
              <header className="release-card__header">
                <div className="release-card__title-row">
                  <h2 className="release-card__version">v{rel.version}</h2>
                  <span className={`release-card__tag release-card__tag--${rel.tag}`}>
                    {TAG_LABELS[rel.tag]}
                  </span>
                </div>
                <time className="release-card__date">{rel.date}</time>
                <p className="release-card__summary">{rel.summary}</p>
              </header>

              <ul className="release-card__changes">
                {rel.changes.map((c, j) => (
                  <li key={j} className={`release-change release-change--${c.type}`}>
                    <span className="release-change__type">{TYPE_LABELS[c.type]}</span>
                    <span className="release-change__text">{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
