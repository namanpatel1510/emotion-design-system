import React, { useEffect } from 'react'
import './modal.css'

type ModalProps = {
  open: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  /** default — standard confirm; destructive — danger/delete action */
  variant?: 'default' | 'destructive'
  /** True while the confirm action is processing */
  loading?: boolean
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  variant = 'default',
  loading = false,
}) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, loading])

  if (!open) return null

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) onClose()
  }

  return (
    <div
      className={`eds-modal__overlay${variant === 'destructive' ? ' eds-modal__overlay--danger' : ''}`}
      onClick={onOverlayClick}
    >
      <div
        className={`eds-modal${variant === 'destructive' ? ' eds-modal--destructive' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Dialog'}
        aria-busy={loading ? 'true' : undefined}
      >
        <header className="eds-modal__header">
          <h3 className="eds-modal__title">
            {variant === 'destructive' && (
              <svg
                className="eds-modal__danger-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            )}
            {title}
          </h3>
          <button
            className="eds-modal__close"
            onClick={onClose}
            aria-label="Close"
            disabled={loading}
          >
            ×
          </button>
        </header>

        <div className="eds-modal__body">{children}</div>

        <footer className="eds-modal__footer">
          <button
            className="eds-modal__btn eds-modal__btn--secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={[
              'eds-modal__btn',
              variant === 'destructive' ? 'eds-modal__btn--danger' : 'eds-modal__btn--primary',
              loading ? 'eds-modal__btn--loading' : '',
            ].filter(Boolean).join(' ')}
            onClick={() => { if (!loading) onClose() }}
            disabled={loading}
            aria-busy={loading ? 'true' : undefined}
          >
            {loading && <span className="eds-modal__spinner" aria-hidden="true" />}
            {loading ? 'Processing…' : variant === 'destructive' ? 'Delete' : 'Confirm'}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal
