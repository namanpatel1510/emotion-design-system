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
}

function SortableTable<T extends Record<string, any>>({ columns, data }: Props<T>) {
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
      const sa = String(va)
      const sb = String(vb)
      return direction === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa)
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

  return (
    <div className="eds-table-wrap">
      <table className="eds-table">
        <thead>
          <tr>
            {columns.map((col) => {
              const key = String(col.key)
              const isSorted = sortKey === key
              return (
                <th key={key} className={col.sortable ? 'eds-table__th--sortable' : ''}>
                  <button className="eds-table__th-btn" onClick={() => onSort(col)} aria-sort={isSorted ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
                    <span>{col.label}</span>
                    {col.sortable && <span className={`eds-table__caret ${isSorted ? 'is-sorted' : ''}`}>{direction === 'asc' ? '▲' : '▼'}</span>}
                  </button>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {sorted.map((row, idx) => (
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
