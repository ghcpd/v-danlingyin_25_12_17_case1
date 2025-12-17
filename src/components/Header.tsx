import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2" aria-label="Home">
            <div className="w-10 h-10 bg-gradient-to-tr from-accent to-brand rounded-full flex items-center justify-center text-white font-bold">P</div>
            <span className="font-semibold text-lg">PodCastify</span>
          </Link>
        </div>
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-accent font-medium' : 'text-gray-600')}>Discover</NavLink>
          <NavLink to="/search" className={({ isActive }) => (isActive ? 'text-accent font-medium' : 'text-gray-600')}>Search</NavLink>
          <NavLink to="/library" className={({ isActive }) => (isActive ? 'text-accent font-medium' : 'text-gray-600')}>Library</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/search" className="text-sm text-gray-600 md:hidden">Search</Link>
          <button aria-label="Open menu" className="p-2 rounded-md hover:bg-gray-100 md:hidden"> 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
