import { useState } from 'react'
import './App.css'
import DownloadButton from './components/atoms/download-button/DownloadButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Emotion Design System — Demo</h1>
      <section className="download-button-row">
        <DownloadButton filename="example.pdf" />
        <DownloadButton variant="secondary" size="lg" shape="pill" filename="report.xlsx" />
        <DownloadButton variant="ghost" size="sm" shape="square" filename="notes.txt" />
      </section>
    </main>
  )
}

export default App
