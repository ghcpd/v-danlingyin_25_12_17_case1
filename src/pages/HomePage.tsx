import React, { useMemo } from 'react';
import Hero from '../components/Hero';
import PodcastList from '../components/PodcastList';
import FilterPanel from '../components/FilterPanel';
import { podcasts, episodes } from '../data/mockPodcasts';
import { Category } from '../types';

const categories = Object.values(Category) as Category[];

const HomePage: React.FC = () => {
  const trending = useMemo(() => podcasts.slice(0, 8), []);
  const recentlyAdded = useMemo(() => {
    return podcasts.slice().sort((a, b) => b.episodeCount - a.episodeCount).slice(0, 6);
  }, []);

  return (
    <div>
      <Hero />
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Trending Now</h2>
        <PodcastList podcasts={trending} />
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <FilterPanel categories={categories} />
      </section>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Recently Added</h2>
        <PodcastList podcasts={recentlyAdded} />
      </section>
    </div>
  );
};

export default HomePage;
