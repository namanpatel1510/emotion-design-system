import React, { useState } from 'react'
import './search-bar.css'

interface Props {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

// Atomic level: atom — a single input control used across the app (search inputs, filters).
// Placement reasoning: it's a low-level UI control, stateless if controlled by parent,
// and should live under `src/components/atoms/` so other molecules can reuse it.

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder = 'Search...' }) => {
  const [internal, setInternal] = useState('')
  const current = typeof value === 'string' ? value : internal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    if (onChange) onChange(v)
    else setInternal(v)
  }

  return (
    <div className="search-bar" role="search">
      <svg className="search-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>

      <input
        className="search-bar__input"
        type="search"
        placeholder={placeholder}
        value={current}
        onChange={handleChange}
        aria-label={placeholder}
      />
    </div>
  )
}

export default SearchBar
