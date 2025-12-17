import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[24rem] bg-cover bg-center text-white"
      style={{ backgroundImage: 'url(https://picsum.photos/seed/hero/1200/400)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Discover Podcasts</h1>
        <p className="text-lg md:text-xl mb-6 max-w-md">Explore a world of audio stories, interviews, news, and more.</p>
        <div className="w-full max-w-xl">
          <SearchBar value={''} onChange={(q) => navigate('/search?q=' + encodeURIComponent(q))} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
