import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'

const COMPONENTS = [
  { label: 'Search Bar',      id: 'search-bar'   },
  { label: 'Download Button', id: 'download-button' },
  { label: 'Checkbox',        id: 'checkbox'     },
  { label: 'Slider',          id: 'slider'       },
  { label: 'Modal',           id: 'modal'        },
]

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const dropdownRef = useRef<HTMLLIElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const goToComponent = (id: string) => {
    setOpen(false)
    navigate('/components')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `navbar__link${isActive ? ' is-active' : ''}`

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <NavLink to="/" className="navbar__brand">Emotion</NavLink>

      <ul className="navbar__nav">
        <li className="navbar__item">
          <NavLink to="/" end className={navClass}>Docs</NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/releases" className={navClass}>Releases</NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/settings" className={navClass}>Settings</NavLink>
        </li>

        <li className="navbar__item navbar__dropdown-wrapper" ref={dropdownRef}>
          <button
            className={`navbar__link navbar__dropdown-trigger${open ? ' is-open' : ''}`}
            onClick={() => setOpen(prev => !prev)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            Components
            <svg className="navbar__chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <ul className="navbar__dropdown" role="listbox">
              {COMPONENTS.map((c) => (
                <li key={c.label} role="option">
                  <button className="navbar__dropdown-item" onClick={() => goToComponent(c.id)}>
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>

      <div className="navbar__actions">
        <a className="navbar__action" href="https://github.com/namanpatel1510/emotion-design-system" target="_blank" rel="noreferrer">GitHub</a>
        <button
          className="navbar__theme-toggle"
          onClick={() => setDark(prev => !prev)}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={dark ? 'Light mode' : 'Dark mode'}
        >
          {dark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
