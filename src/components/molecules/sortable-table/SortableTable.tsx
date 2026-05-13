import React, { useMemo, useState } from 'react'
import './sortable-table.css'

type Column<T> = {
  key: keyof T | string
  label: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

type Props<T> = {
  columns: Column<T>[]
  data: T[]
  /** Shows skeleton rows while data is fetching */
  loading?: boolean
}

const SKELETON_ROWS = 5

function SortableTable<T extends Record<string, any>>({ columns, data, loading = false }: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc')

  const sorted = useMemo(() => {
    if (!sortKey) return data
    const arr = [...data]
    arr.sort((a, b) => {
      const va = a[sortKey]
      const vb = b[sortKey]
      if (va == null) return 1
      if (vb == null) return -1
      if (typeof va === 'number' && typeof vb === 'number') return direction === 'asc' ? va - vb : vb - va
      return direction === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va))
    })
    return arr
  }, [data, sortKey, direction])

  const onSort = (col: Column<T>) => {
    if (!col.sortable) return
    const key = String(col.key)
    if (sortKey === key) setDirection(direction === 'asc' ? 'desc' : 'asc')
    else {
      setSortKey(key)
      setDirection('asc')
    }
  }

  const isEmpty = !loading && data.length === 0

  return (
    <div className={`eds-table-wrap${loading ? ' eds-table-wrap--loading' : ''}`}>
      <table className="eds-table" aria-busy={loading ? 'true' : undefined}>
        <thead>
          <tr>
            {columns.map((col) => {
              const key = String(col.key)
              const isSorted = sortKey === key
              return (
                <th
                  key={key}
                  className={[
                    col.sortable ? 'eds-table__th--sortable' : '',
                    isSorted ? 'eds-table__th--active' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <button
                    className="eds-table__th-btn"
                    onClick={() => onSort(col)}
                    aria-sort={isSorted ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                    disabled={loading}
                  >
                    <span>{col.label}</span>
                    {col.sortable && (
                      <span className={`eds-table__caret${isSorted ? ' is-sorted' : ''}`}>
                        {direction === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {/* ── State: loading — skeleton rows ── */}
          {loading && Array.from({ length: SKELETON_ROWS }).map((_, idx) => (
            <tr key={`skel-${idx}`} className={idx % 2 === 0 ? 'eds-table__row--striped' : ''} aria-hidden="true">
              {columns.map((col) => (
                <td key={String(col.key)} className="eds-table__td">
                  <span className="eds-table__skeleton" />
                </td>
              ))}
            </tr>
          ))}

          {/* ── State: empty ── */}
          {isEmpty && (
            <tr>
              <td className="eds-table__empty" colSpan={columns.length}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                <span>No data available</span>
              </td>
            </tr>
          )}

          {/* ── State: default — data rows ── */}
          {!loading && sorted.map((row, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'eds-table__row--striped' : ''}>
              {columns.map((col) => (
                <td key={String(col.key)} className="eds-table__td">
                  {col.render ? col.render(row) : (row as any)[String(col.key)]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SortableTable
