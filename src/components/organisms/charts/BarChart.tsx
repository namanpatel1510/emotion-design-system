import React from 'react'
import './charts.css'

type Bar = { label: string; value: number }

type Props = {
  data: Bar[]
  height?: number
  color?: string
}

const BarChart: React.FC<Props> = ({ data, height = 160, color = 'var(--color-accent)' }) => {
  const width = 640
  const padding = { left: 36, right: 16, top: 12, bottom: 28 }
  const innerWidth = width - padding.left - padding.right
  const innerHeight = height - padding.top - padding.bottom
  const max = Math.max(...data.map((d) => d.value), 1)
  const barWidth = innerWidth / data.length - 12

  return (
    <div className="eds-chart">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {data.map((d, i) => {
          const x = padding.left + i * (barWidth + 12)
          const h = (d.value / max) * innerHeight
          const y = padding.top + innerHeight - h
          return (
            <g key={i}>
              <rect x={x} y={y} width={barWidth} height={h} rx={6} fill={color} />
              <text x={x + barWidth / 2} y={height - 6} fontSize={11} fill="var(--color-slate-500)" textAnchor="middle">
                {d.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default BarChart
