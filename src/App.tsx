import { useState } from 'react'
import './App.css'
import DownloadButton from './components/atoms/download-button/DownloadButton'
import DashboardCard from './components/molecules/dashboard-card/DashboardCard'
import Checkbox from './components/atoms/checkbox/Checkbox'
import Slider from './components/atoms/slider/Slider'
import Navbar from './components/atoms/navbar/Navbar'
import SearchBar from './components/atoms/search-bar/SearchBar'
import Modal from './components/organisms/modal/Modal'
import SortableTable from './components/molecules/sortable-table/SortableTable'
import LineChart from './components/organisms/charts/LineChart'
import BarChart from './components/organisms/charts/BarChart'

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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeCard, setActiveCard] = useState<CardKey | null>(null)

  const transactions = [
    { id: 'T-1001', date: '2026-04-20', user: 'Bree.',    amount: 124719.99, status: 'Completed' },
    { id: 'T-1002', date: '2026-04-22', user: 'Chris.',   amount: 25454.5,   status: 'Pending'   },
    { id: 'T-1003', date: '2026-04-21', user: 'Ben K.',   amount: 40099.0,   status: 'Completed' },
    { id: 'T-1004', date: '2026-04-23', user: 'Sharo.',   amount: 1500.0,    status: 'Refunded'  },
    { id: 'T-1005', date: '2026-04-24', user: 'Kimarah.', amount: 30100.0,   status: 'Completed' },
    { id: 'T-1006', date: '2026-04-25', user: 'Casey.',   amount: 75000.0,   status: 'Completed' },
  ]

  const openCard = (key: CardKey) => setActiveCard(key)
  const closeCard = () => setActiveCard(null)

  return (
    <>
      <Navbar />
      <main>
        <h1>Emotion Design System — Demo</h1>

        <div id="search-bar">
          <SearchBar placeholder="Search reports, users, metrics..." />
        </div>

        <div id="dashboard-cards" className="dashboard-main">
          <section className="cards-column">
            <DashboardCard
              title="Total Earnings" metric="$963,187,118" badge="All time"
              onClick={() => openCard('earnings')}
            />
            <DashboardCard
              title="Active Users" metric="12,482" badge="This week" variant="compact"
              onClick={() => openCard('users')}
            >
              Monthly growth: 4.2%
            </DashboardCard>
            <DashboardCard
              title="Conversion" metric="6.4%" badge="Current" variant="info"
              onClick={() => openCard('conversion')}
            >
              Conversion rate vs. last month
            </DashboardCard>
            <DashboardCard
              title="Revenue (Preview)" metric="$56,915,421" badge="Live" variant="glass"
              onClick={() => openCard('revenue')}
            >
              Tap actions to download or explore
            </DashboardCard>
          </section>

          <aside id="preferences" className="preferences">
            <h2 className="preferences__title">Preferences</h2>
            <div className="preferences__list">
              <Checkbox label="Email notifications" defaultChecked size="md" />
              <Checkbox label="Weekly summary" size="md" />
              <Checkbox label="Beta features" size="sm" />
            </div>
            <div className="preferences__controls" style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <Slider label="Volume"     defaultValue={50} min={0} max={100} size="md" />
              <Slider label="Brightness" defaultValue={75} min={0} max={100} size="sm" />
            </div>
          </aside>
        </div>

        {/* Card detail modals */}
        {activeCard && (
          <Modal open title={CARD_DETAILS[activeCard].title} onClose={closeCard}>
            <CardModalBody detail={CARD_DETAILS[activeCard]} />
          </Modal>
        )}

        <section id="download-button" className="download-button-row">
          <DownloadButton filename="example.pdf" />
          <DownloadButton variant="secondary" size="lg" shape="pill" filename="report.xlsx" />
          <DownloadButton variant="ghost" size="sm" shape="rounded" filename="notes.txt" />
          <button
            className="download-button download-button--primary"
            onClick={() => setIsModalOpen(true)}
            style={{ marginLeft: 'var(--space-2)' }}
          >
            Open Modal
          </button>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Welcome to Emotion">
            <p>This modal demonstrates the design system tokens and component styling.</p>
            <p>Use it to build confirmations, forms, or complex dialogs.</p>
          </Modal>
        </section>

        <section id="line-chart">
          <h2>Earnings (Last 6 months)</h2>
          <LineChart
            data={[
              { label: 'Nov', value: 48000 },
              { label: 'Dec', value: 52000 },
              { label: 'Jan', value: 61000 },
              { label: 'Feb', value: 58000 },
              { label: 'Mar', value: 72000 },
              { label: 'Apr', value: 87000 },
            ]}
          />
        </section>

        <section id="bar-chart">
          <BarChart
            title="Monthly Growth"
            subtitle="User growth rate by month · 2026"
            badge="Jan – May 2026"
            data={[
              { label: 'Jan', value: 2.4 },
              { label: 'Feb', value: 1.8 },
              { label: 'Mar', value: 3.1 },
              { label: 'Apr', value: 4.2 },
              { label: 'May', value: 3.6 },
            ]}
          />
        </section>

        <section id="sortable-table">
          <h2>Recent Transactions</h2>
          <SortableTable
            columns={[
              { key: 'id',     label: 'Transaction ID', sortable: true },
              { key: 'date',   label: 'Date',           sortable: true },
              { key: 'user',   label: 'User',           sortable: true },
              { key: 'amount', label: 'Amount',         sortable: true, render: (r: any) => `$${r.amount.toFixed(2)}` },
              { key: 'status', label: 'Status',         sortable: true },
            ]}
            data={transactions}
          />
        </section>
      </main>
    </>
  )
}

export default App
