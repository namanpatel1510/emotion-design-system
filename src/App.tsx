import { useState } from 'react'
import './App.css'
import DownloadButton from './components/atoms/download-button/DownloadButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Emotion Design System — Demo</h1>
      <section>
        <DownloadButton filename="example.pdf" />
      </section>
    </main>
  )
}

export default App
