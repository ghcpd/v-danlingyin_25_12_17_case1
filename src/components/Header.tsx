import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">P</div>
          <span className="font-semibold text-lg">PodCast</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center" role="navigation" aria-label="Main Navigation">
          <Link to="/search" className="text-sm hover:underline">Search</Link>
          <Link to="/library" className="text-sm hover:underline">Library</Link>
        </nav>
        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2" onClick={() => setOpen((v) => !v)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t">
          <div className="px-4 py-2">
            <Link to="/search" className="block py-2">Search</Link>
            <Link to="/library" className="block py-2">Library</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
