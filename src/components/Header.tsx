import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  // Mobile menu state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-md" role="navigation" aria-label="Main navigation">
      {/* Skip to content link */}
      <a href="#maincontent" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 p-2 bg-white text-black">
        Skip to content
      </a>
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-semibold">Podcast App</Link>
        <div className="flex items-center">
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'underline' : undefined)}
            >Home</NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? 'underline' : undefined)}
            >Search</NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) => (isActive ? 'underline' : undefined)}
            >Library</NavLink>
          </nav>
          <DarkModeToggle />
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isOpen ? (
              // X icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile nav links */}
      <nav
        className={`md:hidden px-4 pb-4 ${isOpen ? 'block' : 'hidden'}`}
        role="menu"
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'underline block py-1' : 'block py-1')}
        >Home</NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? 'underline block py-1' : 'block py-1')}
        >Search</NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) => (isActive ? 'underline block py-1' : 'block py-1')}
        >Library</NavLink>
      </nav>
    </header>
  );
};

export default Header;
