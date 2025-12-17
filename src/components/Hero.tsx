import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC<{ title?: string; subtitle?: string }> = ({ title = 'Featured Podcast', subtitle = 'Listen to our top picks for today' }) => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent text-white py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-sm opacity-90">{subtitle}</p>
          <Link to="/" className="inline-block mt-4 bg-white text-primary px-4 py-2 rounded">Explore</Link>
        </div>
        <div className="w-56 h-56 bg-white/20 rounded-lg flex items-center justify-center">🎧</div>
      </div>
    </section>
  );
};

export default Hero;
