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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  // sample data for Recent Transactions
  const transactions = [
    { id: 'T-1001', date: '2026-04-20', user: 'Bree.', amount: 124719.99, status: 'Completed' },
    { id: 'T-1002', date: '2026-04-22', user: 'Chris.', amount: 25454.5, status: 'Pending' },
    { id: 'T-1003', date: '2026-04-21', user: 'Ben K.', amount: 40099.0, status: 'Completed' },
    { id: 'T-1004', date: '2026-04-23', user: 'Sharo.', amount: 1500.0, status: 'Refunded' },
    { id: 'T-1005', date: '2026-04-24', user: 'Kimarah.', amount: 30100.0, status: 'Completed' },
    { id: 'T-1006', date: '2026-04-25', user: 'Casey.', amount: 75000.0, status: 'Completed' },
  ]

  return (
    <>
      <Navbar />
      <main>
        <h1>Emotion Design System — Demo</h1>

        <div style={{marginBottom: 'var(--space-4)'}}>
          <SearchBar placeholder="Search reports, users, metrics..." />
        </div>

        <div className="dashboard-main">
          <section className="cards-column">
            <DashboardCard title="Total Earnings" metric="$963,187,118" badge="All time" />
            <DashboardCard title="Active Users" metric="12,482" badge="This week" variant="compact">Monthly growth: 4.2%</DashboardCard>
            <DashboardCard title="Conversion" metric="6.4%" badge="Current" variant="info">Conversion rate vs. last month</DashboardCard>
            <DashboardCard title="Revenue (Preview)" metric="$56,915,421" badge="Live" variant="glass">Tap actions to download or explore</DashboardCard>
          </section>

          <aside className="preferences">
            <h2 className="preferences__title">Preferences</h2>
            <div className="preferences__list">
              <Checkbox label="Email notifications" defaultChecked size="md" />
              <Checkbox label="Weekly summary" size="md" />
              <Checkbox label="Beta features" size="sm" />
            </div>

            <div className="preferences__controls" style={{marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)'}}>
              <Slider label="Volume" defaultValue={50} min={0} max={100} size="md" />
              <Slider label="Brightness" defaultValue={75} min={0} max={100} size="sm" />
            </div>
          </aside>
        </div>

        <section className="download-button-row">
          <DownloadButton filename="example.pdf" />
          <DownloadButton variant="secondary" size="lg" shape="pill" filename="report.xlsx" />
          <DownloadButton variant="ghost" size="sm" shape="square" filename="notes.txt" />

          <button className="download-button download-button--primary" onClick={() => setIsModalOpen(true)} style={{marginLeft: 'var(--space-3)'}}>
            Open Modal
          </button>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Welcome to Emotion">
            <p>This modal demonstrates the design system tokens and component styling.</p>
            <p>Use it to build confirmations, forms, or complex dialogs.</p>
          </Modal>
        </section>

        <section style={{marginTop: 'var(--space-6)'}}>
          <h2 style={{marginBottom: 'var(--space-3)'}}>Earnings (Last 6 months)</h2>
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

        <section style={{marginTop: 'var(--space-6)'}}>
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

        <section style={{marginTop: 'var(--space-6)'}}>
          <h2 style={{marginBottom: 'var(--space-3)'}}>Recent Transactions</h2>
          <SortableTable
            columns={[
              { key: 'id', label: 'Transaction ID', sortable: true },
              { key: 'date', label: 'Date', sortable: true },
              { key: 'user', label: 'User', sortable: true },
              { key: 'amount', label: 'Amount', sortable: true, render: (r: any) => `$${r.amount.toFixed(2)}` },
              { key: 'status', label: 'Status', sortable: true }
            ]}
            data={transactions}
          />
        </section>
      </main>
    </>
  )
}

export default App
