import LineChart from '../components/organisms/charts/LineChart'
import BarChart from '../components/organisms/charts/BarChart'
import SortableTable from '../components/molecules/sortable-table/SortableTable'

const transactions = [
  { id: 'T-1001', date: '2026-04-20', user: 'Bree.',    amount: 124719.99, status: 'Completed' },
  { id: 'T-1002', date: '2026-04-22', user: 'Chris.',   amount: 25454.5,   status: 'Pending'   },
  { id: 'T-1003', date: '2026-04-21', user: 'Ben K.',   amount: 40099.0,   status: 'Completed' },
  { id: 'T-1004', date: '2026-04-23', user: 'Sharo.',   amount: 1500.0,    status: 'Refunded'  },
  { id: 'T-1005', date: '2026-04-24', user: 'Kimarah.', amount: 30100.0,   status: 'Completed' },
  { id: 'T-1006', date: '2026-04-25', user: 'Casey.',   amount: 75000.0,   status: 'Completed' },
]

export default function Reports() {
  return (
    <>
      <h1>Reports</h1>

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
    </>
  )
}
