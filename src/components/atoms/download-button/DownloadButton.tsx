import React from 'react'
import './download-button.css'

interface Props {
  filename?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'rounded' | 'pill' | 'square'
  state?: 'default' | 'loading' | 'disabled' | 'error'
  disabled?: boolean
  loading?: boolean
  error?: boolean
}

const EXT_CLASS: Record<string, string> = {
  pdf:  'ext--pdf',
  xlsx: 'ext--xlsx',
  xls:  'ext--xlsx',
  csv:  'ext--csv',
  doc:  'ext--doc',
  docx: 'ext--doc',
  txt:  'ext--txt',
  zip:  'ext--zip',
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
  const resolvedState: Props['state'] =
    state !== 'default' ? state : loading ? 'loading' : disabled ? 'disabled' : error ? 'error' : 'default'

  const ext = filename.includes('.') ? filename.split('.').pop()!.toLowerCase() : 'file'
  const extLabel = ext.toUpperCase()
  const extClass = EXT_CLASS[ext] || 'ext--default'

  const handleClick = () => {
    if (resolvedState === 'disabled' || resolvedState === 'loading') return
    if (onClick) onClick()
  }

  const className = [
    'dl-btn',
    `dl-btn--${variant}`,
    `dl-btn--${size}`,
    `dl-btn--${shape}`,
    resolvedState !== 'default' ? `dl-btn--${resolvedState}` : '',
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
        <span className="dl-btn__skeleton" aria-hidden="true" />
      ) : (
        <>
          <span className="dl-btn__icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 20h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="dl-btn__info">
            <span className="dl-btn__label">Download</span>
            <span className="dl-btn__filename">{filename}</span>
          </span>
          <span className={`dl-btn__ext ${extClass}`} aria-hidden="true">{extLabel}</span>
        </>
      )}
    </button>
  )
}

export default DownloadButton
