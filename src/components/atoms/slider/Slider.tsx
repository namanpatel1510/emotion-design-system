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
}) => {
  const inputId = id ?? `slider-${Math.random().toString(36).slice(2, 9)}`
  const [internal, setInternal] = useState<number>(defaultValue ?? min)
  const current = typeof value === 'number' ? value : internal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    if (typeof value !== 'number') setInternal(v)
    onChange && onChange(v)
  }

  return (
    <div className={`slider slider--size-${size}`}>
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
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={current}
        />

        {showValue && <output className="slider__value">{current}</output>}
      </div>
    </div>
  )
}

export default Slider
