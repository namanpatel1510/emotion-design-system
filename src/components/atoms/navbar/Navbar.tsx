import React from 'react'
import './navbar.css'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__brand">Emotion</div>

      <ul className="navbar__nav">
        <li className="navbar__item"><a className="navbar__link" href="#">Dashboard</a></li>
        <li className="navbar__item"><a className="navbar__link" href="#">Reports</a></li>
        <li className="navbar__item"><a className="navbar__link" href="#">Settings</a></li>
      </ul>

      <div className="navbar__actions">
        <a className="navbar__action" href="#">Help</a>
      </div>
    </nav>
  )
}

export default Navbar
