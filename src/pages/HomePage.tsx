import React from 'react';
import Hero from '../components/Hero';
import PodcastCard from '../components/PodcastCard';
import CategoryPill from '../components/CategoryPill';
import { mockPodcasts } from '../data/mockPodcasts';

const HomePage: React.FC = () => {
  const trending = mockPodcasts.slice(0, 6);
  const recentlyAdded = mockPodcasts.slice(-6);

  return (
    <div className="space-y-8">
      <Hero />
      <section>
        <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map((p) => (
            <PodcastCard key={p.id} podcast={p} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap">
          {['Technology', 'Business', 'Comedy', 'Education', 'Health & Fitness'].map((c) => (
            <CategoryPill key={c} label={c} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recently Added</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentlyAdded.map((p) => (
            <PodcastCard key={p.id} podcast={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
