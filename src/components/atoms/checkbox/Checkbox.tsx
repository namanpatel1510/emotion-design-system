import React from 'react'
import './checkbox.css'

interface Props {
  id?: string
  label?: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  loading?: boolean
  error?: boolean
  /** Visual state: default | loading | disabled | error */
  state?: 'default' | 'loading' | 'disabled' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Checkbox: React.FC<Props> = ({
  id,
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  loading = false,
  error = false,
  state = 'default',
  size = 'md',
}) => {
  const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e.target.checked)
  }

  // resolve unified state prop (falls back to boolean props)
  const resolvedState: Props['state'] = state !== 'default' ? state : loading ? 'loading' : disabled ? 'disabled' : error ? 'error' : 'default'

  const stateClasses = [
    `state-${resolvedState}`,
    resolvedState !== 'default' ? 'no-hover' : '',
  ].filter(Boolean)

  return (
    <label className={[`checkbox`, `checkbox--size-${size}`, ...stateClasses].join(' ')} htmlFor={inputId}>
      <input
        id={inputId}
        className="checkbox__input"
        type="checkbox"
        aria-checked={checked}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        disabled={disabled}
      />

      <span className="checkbox__control" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="checkbox__icon" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>

      {label && <span className="checkbox__label">{label}</span>}
    </label>
  )
}

export default Checkbox
