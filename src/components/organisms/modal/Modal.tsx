import React, { useEffect } from 'react'
import './modal.css'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="eds-modal__overlay" onClick={onOverlayClick}>
      <div className="eds-modal" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
        <header className="eds-modal__header">
          <h3 className="eds-modal__title">{title}</h3>
          <button className="eds-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="eds-modal__body">{children}</div>

        <footer className="eds-modal__footer">
          <button className="eds-modal__btn eds-modal__btn--secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="eds-modal__btn eds-modal__btn--primary"
            onClick={() => {
              // default confirm simply closes for demo purposes
              onClose()
            }}
          >
            Confirm
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal
