import { useState } from 'react'
import './App.css'
import DownloadButton from './components/atoms/download-button/DownloadButton'
import DashboardCard from './components/molecules/dashboard-card/DashboardCard'
import Checkbox from './components/atoms/checkbox/Checkbox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Emotion Design System — Demo</h1>

      <div className="dashboard-main">
        <section className="cards-column">
          <DashboardCard title="Total Earnings" metric="$187,118" badge="All time" />
          <DashboardCard title="Active Users" metric="12,482" badge="This week" variant="compact">Monthly growth: 4.2%</DashboardCard>
          <DashboardCard title="Conversion" metric="6.4%" badge="Current" variant="info">Conversion rate vs. last month</DashboardCard>
          <DashboardCard title="Revenue (Preview)" metric="$9,421" badge="Live" variant="glass">Tap actions to download or explore</DashboardCard>
        </section>

        <aside className="preferences">
          <h2 className="preferences__title">Preferences</h2>
          <div className="preferences__list">
            <Checkbox label="Email notifications" defaultChecked size="md" />
            <Checkbox label="Weekly summary" size="md" />
            <Checkbox label="Beta features" size="sm" />
          </div>
        </aside>
      </div>

      <section className="download-button-row">
        <DownloadButton filename="example.pdf" />
        <DownloadButton variant="secondary" size="lg" shape="pill" filename="report.xlsx" />
        <DownloadButton variant="ghost" size="sm" shape="square" filename="notes.txt" />
      </section>
    </main>
  )
}

export default App
