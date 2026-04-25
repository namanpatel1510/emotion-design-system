import React from 'react'
import './charts.css'

type Point = { label: string; value: number }

type Props = {
  data: Point[]
  height?: number
  color?: string
}

const padding = { top: 16, right: 16, bottom: 28, left: 36 }

const LineChart: React.FC<Props> = ({ data, height = 160, color = 'var(--color-primary)' }) => {
  const width = 640
  const innerWidth = width - padding.left - padding.right
  const innerHeight = height - padding.top - padding.bottom
  const values = data.map((d) => d.value)
  const min = Math.min(...values, 0)
  const max = Math.max(...values, 1)

  const scaleX = (i: number) => (i / Math.max(1, data.length - 1)) * innerWidth + padding.left
  const scaleY = (v: number) => padding.top + innerHeight - ((v - min) / (max - min || 1)) * innerHeight

  const pathD = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(d.value)}`)
    .join(' ')

  return (
    <div className="eds-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="lineGrad" x1="0" x2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.08" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* area under curve */}
        <path d={`${pathD} L ${padding.left + innerWidth} ${padding.top + innerHeight} L ${padding.left} ${padding.top + innerHeight} Z`} fill="url(#lineGrad)" />

        {/* line */}
        <path d={pathD} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {/* points */}
        {data.map((d, i) => (
          <circle key={i} cx={scaleX(i)} cy={scaleY(d.value)} r={3.5} fill={color} />
        ))}

        {/* x labels */}
        {data.map((d, i) => (
          <text key={i} x={scaleX(i)} y={height - 6} fontSize={11} fill="var(--color-slate-500)" textAnchor="middle">
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

export default LineChart
