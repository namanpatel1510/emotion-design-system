import React, { useState } from 'react'
import './charts.css'

type Bar = { label: string; value: number }

type Props = {
  data: Bar[]
  height?: number
  title?: string
  subtitle?: string
  badge?: string
}

const BarChart: React.FC<Props> = ({
  data,
  height = 200,
  title,
  subtitle,
  badge,
}) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const width = 640
  const pad = { left: 44, right: 16, top: 20, bottom: 36 }
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const max = Math.max(...data.map((d) => d.value), 1)
  const groupW = innerW / data.length
  const barW = Math.min(groupW - 14, 72)
  const avg = (data.reduce((s, d) => s + d.value, 0) / data.length).toFixed(1)
  const peak = Math.max(...data.map((d) => d.value))
  const ticks = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className="eds-chart eds-barchart">
      {(title || badge) && (
        <div className="eds-barchart__header">
          <div>
            {title && <h3 className="eds-chart__title">{title}</h3>}
            {subtitle && <p className="eds-chart__subtitle">{subtitle}</p>}
          </div>
          {badge && <span className="eds-chart__badge">{badge}</span>}
        </div>
      )}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={title ?? 'Bar chart'}
      >
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary-500)" />
            <stop offset="100%" stopColor="var(--color-primary-300)" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="bar-grad-hover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary-700)" />
            <stop offset="100%" stopColor="var(--color-primary-500)" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* Y-axis grid lines + labels */}
        {ticks.map((t, i) => {
          const gy = pad.top + innerH - t * innerH
          return (
            <g key={i}>
              <line
                x1={pad.left}
                y1={gy}
                x2={width - pad.right}
                y2={gy}
                stroke="var(--color-slate-100)"
                strokeWidth={1}
                strokeDasharray={i === 0 ? '0' : '4 3'}
              />
              <text x={pad.left - 6} y={gy + 4} fontSize={10} fill="var(--color-slate-400)" textAnchor="end">
                {(t * max).toFixed(1)}%
              </text>
            </g>
          )
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = pad.left + i * groupW + groupW / 2
          const bx = cx - barW / 2
          const bh = (d.value / max) * innerH
          const by = pad.top + innerH - bh
          const isHov = hovered === i

          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Hover column highlight */}
              <rect
                x={pad.left + i * groupW + 2}
                y={pad.top}
                width={groupW - 4}
                height={innerH}
                fill={isHov ? 'var(--color-primary-50)' : 'transparent'}
                rx={4}
              />
              {/* Bar */}
              <rect
                x={bx}
                y={by}
                width={barW}
                height={bh}
                rx={6}
                fill={isHov ? 'url(#bar-grad-hover)' : 'url(#bar-grad)'}
                className="eds-barchart__bar"
              />
              {/* Value label */}
              <text
                x={cx}
                y={by - 7}
                fontSize={11}
                fontWeight="600"
                fill={isHov ? 'var(--color-primary-700)' : 'var(--color-slate-600)'}
                textAnchor="middle"
              >
                {d.value}%
              </text>
              {/* X-axis label */}
              <text x={cx} y={height - 6} fontSize={11} fill="var(--color-slate-500)" textAnchor="middle">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Summary footer */}
      <div className="eds-barchart__summary">
        <div className="eds-barchart__stat">
          <span className="eds-barchart__stat-label">Avg growth</span>
          <span className="eds-barchart__stat-value">{avg}%</span>
        </div>
        <div className="eds-barchart__stat">
          <span className="eds-barchart__stat-label">Peak month</span>
          <span className="eds-barchart__stat-value eds-barchart__stat-value--peak">{peak}%</span>
        </div>
        <div className="eds-barchart__stat">
          <span className="eds-barchart__stat-label">Months tracked</span>
          <span className="eds-barchart__stat-value">{data.length}</span>
        </div>
      </div>
    </div>
  )
}

export default BarChart
