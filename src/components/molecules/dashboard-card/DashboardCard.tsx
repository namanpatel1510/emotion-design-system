import React from 'react'
import './dashboard-card.css'

interface Props {
  title: string
  metric: string | number
  badge?: string
  variant?: 'default' | 'compact' | 'info' | 'glass'
  /** Visual state: default | loading | error */
  state?: 'default' | 'loading' | 'error'
  children?: React.ReactNode
}

const DashboardCard: React.FC<Props> = ({
  title,
  metric,
  badge,
  variant = 'default',
  state = 'default',
  children,
}) => {
  const titleId = `dashboard-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  const classes = [
    'dashboard-card',
    `dashboard-card--${variant}`,
    state !== 'default' ? `dashboard-card--${state}` : '',
  ].filter(Boolean).join(' ')

  return (
    <article
      className={classes}
      aria-labelledby={titleId}
      aria-busy={state === 'loading' ? 'true' : undefined}
    >
      <header className="dashboard-card__header">
        <h3 id={titleId} className="dashboard-card__title">{title}</h3>

        {state === 'loading' ? (
          <span className="dashboard-card__skeleton dashboard-card__skeleton--badge" aria-hidden="true" />
        ) : badge && (
          <span className={`dashboard-card__badge${state === 'error' ? ' dashboard-card__badge--error' : ''}`}>
            {badge}
          </span>
        )}
      </header>

      <div className="dashboard-card__body">
        {/* ── State: loading ── */}
        {state === 'loading' && (
          <div aria-hidden="true">
            <div className="dashboard-card__skeleton dashboard-card__skeleton--metric" />
            <div className="dashboard-card__skeleton dashboard-card__skeleton--line" />
          </div>
        )}

        {/* ── State: error ── */}
        {state === 'error' && (
          <div className="dashboard-card__error">
            <svg
              className="dashboard-card__error-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <span className="dashboard-card__error-msg">Failed to load data</span>
          </div>
        )}

        {/* ── State: default ── */}
        {state === 'default' && (
          <>
            <div className="dashboard-card__metric">{metric}</div>
            {children && <div className="dashboard-card__content">{children}</div>}
          </>
        )}
      </div>

      <footer className="dashboard-card__footer" />
    </article>
  )
}

export default DashboardCard
