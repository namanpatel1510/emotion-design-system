import { useState } from 'react'
import DownloadButton from '../components/atoms/download-button/DownloadButton'
import Checkbox from '../components/atoms/checkbox/Checkbox'
import Slider from '../components/atoms/slider/Slider'
import SearchBar from '../components/atoms/search-bar/SearchBar'
import Modal from '../components/organisms/modal/Modal'
import '../App.css'

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginTop: 'var(--space-8)' }}>
      <h2>{title}</h2>
      <div style={{ marginTop: 'var(--space-4)' }}>{children}</div>
    </section>
  )
}

export default function Components() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <h1>Components</h1>

      <Section id="search-bar" title="Search Bar">
        <SearchBar placeholder="Search anything..." />
      </Section>

      <Section id="download-button" title="Download Button">
        <div className="download-button-row">
          <DownloadButton filename="example.pdf" />
          <DownloadButton variant="secondary" size="lg" shape="pill" filename="report.xlsx" />
          <DownloadButton variant="ghost" size="sm" shape="rounded" filename="notes.txt" />
          <DownloadButton state="loading" filename="loading.pdf" />
          <DownloadButton state="disabled" filename="locked.pdf" />
          <DownloadButton state="error" filename="broken.pdf" />
        </div>
      </Section>

      <Section id="checkbox" title="Checkbox">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Checkbox label="Default unchecked" size="md" />
          <Checkbox label="Default checked" defaultChecked size="md" />
          <Checkbox label="Small size" size="sm" />
          <Checkbox label="Disabled" size="md" disabled />
        </div>
      </Section>

      <Section id="slider" title="Slider">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: '360px' }}>
          <Slider label="Volume"     defaultValue={50} min={0} max={100} size="md" />
          <Slider label="Brightness" defaultValue={75} min={0} max={100} size="sm" />
          <Slider label="Balance"    defaultValue={30} min={0} max={100} size="md" />
        </div>
      </Section>

      <Section id="modal" title="Modal">
        <button className="download-button download-button--primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Example Modal">
          <p>This modal is part of the Emotion Design System. Use it for confirmations, forms, or dialogs.</p>
          <p style={{ marginTop: 'var(--space-3)' }}>Press Escape or click outside to dismiss.</p>
        </Modal>
      </Section>
    </>
  )
}
