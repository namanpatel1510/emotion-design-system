import React from 'react'
import './download-button.css'

interface Props {
  filename?: string
  onClick?: () => void
}

const DownloadButton: React.FC<Props> = ({ filename = 'file.pdf', onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick()
    // Placeholder: actual download behavior should be provided by parent via `onClick`
  }

  return (
    <button
      type="button"
      className="download-button download-button--primary"
      aria-label={`Download ${filename}`}
      onClick={handleClick}
    >
      <span className="download-button__icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 14l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      <span className="download-button__label">Download</span>
    </button>
  )
}

export default DownloadButton
