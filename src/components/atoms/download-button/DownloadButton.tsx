import React from 'react'
import './download-button.css'

interface Props {
  filename?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill' | 'square'
  /** Visual state: default | loading | disabled | error */
  state?: 'default' | 'loading' | 'disabled' | 'error'
  /** Backwards-compatible boolean props (optional) */
  disabled?: boolean
  loading?: boolean
  error?: boolean
}

const DownloadButton: React.FC<Props> = ({
  filename = 'file.pdf',
  onClick,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  state = 'default',
  disabled = false,
  loading = false,
  error = false,
}) => {
  // prefer explicit `state` prop, fall back to boolean props for compatibility
  const resolvedState: Props['state'] =
    state !== 'default' ? state : loading ? 'loading' : disabled ? 'disabled' : error ? 'error' : 'default'

  const handleClick = () => {
    if (resolvedState === 'disabled' || resolvedState === 'loading') return
    if (onClick) onClick()
  }

  const className = [
    'download-button',
    `download-button--${variant}`,
    `download-button--size-${size}`,
    `download-button--shape-${shape}`,
    `state-${resolvedState}`,
    resolvedState !== 'default' ? 'no-hover' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={className}
      aria-label={`Download ${filename}`}
      onClick={handleClick}
      disabled={resolvedState === 'disabled'}
      aria-busy={resolvedState === 'loading' ? 'true' : undefined}
    >
      {resolvedState === 'loading' ? (
        <span className="download-button__skeleton" aria-hidden="true" />
      ) : (
        <>
          <span className="download-button__icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 14l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="download-button__label">Download</span>
        </>
      )}
    </button>
  )
}

export default DownloadButton
