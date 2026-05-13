import React, { useState } from 'react'
import './slider.css'

interface Props {
  id?: string
  label?: React.ReactNode
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  /** Visual state: default | disabled | error */
  state?: 'default' | 'disabled' | 'error'
}

const Slider: React.FC<Props> = ({
  id,
  label,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = 'md',
  showValue = true,
  state = 'default',
}) => {
  const inputId = id ?? `slider-${Math.random().toString(36).slice(2, 9)}`
  const [internal, setInternal] = useState<number>(defaultValue ?? min)
  const current = typeof value === 'number' ? value : internal

  const resolvedDisabled = state === 'disabled' || disabled

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    if (typeof value !== 'number') setInternal(v)
    onChange && onChange(v)
  }

  const classes = [
    'slider',
    `slider--size-${size}`,
    state !== 'default' ? `slider--${state}` : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {label && (
        <label className="slider__label" htmlFor={inputId}>{label}</label>
      )}

      <div className="slider__row">
        <input
          id={inputId}
          className="slider__input"
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleChange}
          disabled={resolvedDisabled}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
          aria-invalid={state === 'error' ? 'true' : undefined}
        />

        {showValue && (
          <output className="slider__value">{current}</output>
        )}
      </div>

      {state === 'error' && (
        <span className="slider__error-msg" role="alert">Value out of acceptable range</span>
      )}
    </div>
  )
}

export default Slider
