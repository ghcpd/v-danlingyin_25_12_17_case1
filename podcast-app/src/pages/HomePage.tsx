import React, { useMemo } from 'react';
import { Hero } from '../components/Hero';
import { PodcastList } from '../components/PodcastList';
import { CategoryPill } from '../components/CategoryPill';
import { Category } from '../types';
import { mockPodcasts } from '../data/mockPodcasts';

export function HomePage() {
  const featuredPodcast = mockPodcasts[0];

  const trendingPodcasts = useMemo(() => {
    return mockPodcasts
      .sort((a, b) => b.subscribers - a.subscribers)
      .slice(0, 8);
  }, []);

  const recentPodcasts = useMemo(() => {
    return mockPodcasts.slice(0, 6);
  }, []);

  const categories = Object.values(Category).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero featuredPodcast={featuredPodcast} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Trending Now */}
        <PodcastList
          podcasts={trendingPodcasts}
          title="Trending Now"
        />

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <CategoryPill key={category} category={category} />
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <PodcastList
          podcasts={recentPodcasts}
          title="Recently Added"
        />
      </div>
    </div>
  );
}