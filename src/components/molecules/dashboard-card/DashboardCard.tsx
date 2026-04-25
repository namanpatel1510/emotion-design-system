import React from 'react'
import './dashboard-card.css'

interface Props {
  title: string
  metric: string | number
  badge?: string
  variant?: 'default' | 'compact' | 'info' | 'glass'
  children?: React.ReactNode
}

const DashboardCard: React.FC<Props> = ({ title, metric, badge, variant = 'default', children }) => {
  const titleId = `dashboard-card-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <article className={`dashboard-card dashboard-card--${variant}`} aria-labelledby={titleId}>
      <header className="dashboard-card__header">
        <h3 id={titleId} className="dashboard-card__title">{title}</h3>
        {badge && <span className="dashboard-card__badge">{badge}</span>}
      </header>

      <div className="dashboard-card__body">
        <div className="dashboard-card__metric">{metric}</div>
        {children && <div className="dashboard-card__content">{children}</div>}
      </div>

      <footer className="dashboard-card__footer" />
    </article>
  )
}

export default DashboardCard
