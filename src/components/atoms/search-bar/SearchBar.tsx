import React, { useState } from 'react'
import './search-bar.css'

interface Props {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  /** Visual state: default | disabled | error */
  state?: 'default' | 'disabled' | 'error'
}

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Search...',
  state = 'default',
}) => {
  const [internal, setInternal] = useState('')
  const current = typeof value === 'string' ? value : internal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (onChange) onChange(v)
    else setInternal(v)
  }

  const handleClear = () => {
    if (onChange) onChange('')
    else setInternal('')
  }

  const stateClass = state !== 'default' ? `is-${state}` : ''

  return (
    <div
      className={['search-bar', stateClass].filter(Boolean).join(' ')}
      role="search"
    >
      <svg className="search-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M21 21l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      <input
        className="search-bar__input"
        type="search"
        placeholder={placeholder}
        value={current}
        onChange={handleChange}
        aria-label={placeholder}
        disabled={state === 'disabled'}
        aria-invalid={state === 'error' ? 'true' : undefined}
      />

      {state === 'default' && current.length > 0 && (
        <button className="search-bar__clear" onClick={handleClear} aria-label="Clear search">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      {state === 'error' && (
        <span className="search-bar__error-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        </span>
      )}
    </div>
  )
}

export default SearchBar
