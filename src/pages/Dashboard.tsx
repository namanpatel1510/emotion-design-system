import { useState } from 'react'
import DashboardCard from '../components/molecules/dashboard-card/DashboardCard'
import SearchBar from '../components/atoms/search-bar/SearchBar'
import Modal from '../components/organisms/modal/Modal'

type CardKey = 'earnings' | 'users' | 'conversion' | 'revenue'

interface CardDetail {
  title: string
  stats: { label: string; value: string; modifier?: 'up' | 'down' }[]
  note: string
}

const CARD_DETAILS: Record<CardKey, CardDetail> = {
  earnings: {
    title: 'Total Earnings — Breakdown',
    stats: [
      { label: 'Monthly Average', value: '$80.3M' },
      { label: 'YoY Growth',      value: '+18.4%', modifier: 'up' },
      { label: 'Best Month',      value: 'Apr 2026' },
      { label: 'Currency',        value: 'USD' },
      { label: 'Transactions',    value: '1.2M' },
      { label: 'Refunds',         value: '-$210K', modifier: 'down' },
    ],
    note: 'All-time cumulative earnings across all product lines and regions since launch.',
  },
  users: {
    title: 'Active Users — Details',
    stats: [
      { label: 'Daily Average', value: '1,783' },
      { label: 'Peak Day',      value: 'Wed' },
      { label: 'New This Week', value: '+342', modifier: 'up' },
      { label: 'Churned',       value: '-58',  modifier: 'down' },
      { label: 'Mobile',        value: '67%' },
      { label: 'Retention',     value: '91.2%', modifier: 'up' },
    ],
    note: 'Counts users who performed at least one action in the current 7-day window.',
  },
  conversion: {
    title: 'Conversion Rate — Details',
    stats: [
      { label: 'Last Month',   value: '5.9%' },
      { label: 'Change',       value: '+0.5pp', modifier: 'up' },
      { label: 'Industry Avg', value: '3.2%' },
      { label: 'Best Channel', value: 'Email' },
      { label: 'Trials',       value: '4,210' },
      { label: 'Drop-off',     value: '38%', modifier: 'down' },
    ],
    note: 'Conversion is measured from first visit to paid subscription within a 30-day window.',
  },
  revenue: {
    title: 'Revenue (Preview) — Live',
    stats: [
      { label: 'MTD',           value: '$56.9M' },
      { label: 'vs Last Month', value: '+12.1%', modifier: 'up' },
      { label: 'Forecast',      value: '$61.2M' },
      { label: 'Top Product',   value: 'Pro Plan' },
      { label: 'Refund Rate',   value: '0.4%' },
      { label: 'Net Revenue',   value: '$55.7M', modifier: 'up' },
    ],
    note: 'Live data refreshes every 15 minutes. Figures are pre-tax and exclude chargebacks.',
  },
}

function CardModalBody({ detail }: { detail: CardDetail }) {
  return (
    <>
      <div className="card-modal__grid">
        {detail.stats.map((s) => (
          <div className="card-modal__stat" key={s.label}>
            <span className="card-modal__stat-label">{s.label}</span>
            <span className={`card-modal__stat-value${s.modifier ? ` card-modal__stat-value--${s.modifier}` : ''}`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
      <p className="card-modal__note">{detail.note}</p>
    </>
  )
}

export default function Dashboard() {
  const [activeCard, setActiveCard] = useState<CardKey | null>(null)

  return (
    <>
      <h1>Dashboard</h1>

      <div id="search-bar">
        <SearchBar placeholder="Search reports, users, metrics..." />
      </div>

      <div className="dashboard-main" style={{ marginTop: 'var(--space-4)' }}>
        <section className="cards-column">
          <DashboardCard title="Total Earnings"    metric="$963,187,118" badge="All time"  onClick={() => setActiveCard('earnings')} />
          <DashboardCard title="Active Users"      metric="12,482"       badge="This week" onClick={() => setActiveCard('users')}    variant="compact">Monthly growth: 4.2%</DashboardCard>
          <DashboardCard title="Conversion"        metric="6.4%"         badge="Current"   onClick={() => setActiveCard('conversion')} variant="info">Conversion rate vs. last month</DashboardCard>
          <DashboardCard title="Revenue (Preview)" metric="$56,915,421"  badge="Live"      onClick={() => setActiveCard('revenue')}  variant="glass">Tap to explore</DashboardCard>
        </section>

        <aside className="preferences">
          <h2 className="preferences__title">Quick Stats</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              { label: 'Uptime',         value: '99.98%' },
              { label: 'Avg. Response',  value: '142ms'  },
              { label: 'Open Tickets',   value: '7'      },
              { label: 'Deployments',    value: '24'     },
              { label: 'Error Rate',     value: '0.02%'  },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-slate-100)' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-slate-500)' }}>{label}</span>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-slate-900)' }}>{value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {activeCard && (
        <Modal open title={CARD_DETAILS[activeCard].title} onClose={() => setActiveCard(null)}>
          <CardModalBody detail={CARD_DETAILS[activeCard]} />
        </Modal>
      )}
    </>
  )
}
