import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <header role="navigation" className="bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-md" aria-hidden />
          <span className="font-bold">Podcaster</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary' : ''}>Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/category/Technology">Categories</NavLink>
        </nav>
        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2 rounded focus:outline-none">☰</button>
        </div>
      </div>
    </header>
  )
}

export default Header
