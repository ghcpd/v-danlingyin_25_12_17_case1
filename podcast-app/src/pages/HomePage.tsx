import React, { useMemo } from 'react';
import { Hero } from '../components/Hero';
import { PodcastList } from '../components/PodcastList';
import { CategoryGrid } from '../components/CategoryPill';
import { mockPodcasts, getTrendingPodcasts, getRecentlyAddedPodcasts, getAllCategories } from '../data/mockPodcasts';
import { useLibrary } from '../context/index';
import { Category } from '../types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const HomePage: React.FC = () => {
  const { subscribed, subscribe, unsubscribe } = useLibrary();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const trending = useMemo(() => getTrendingPodcasts(8), []);
  const recent = useMemo(() => getRecentlyAddedPodcasts(8), []);
  const categories = useMemo(() => getAllCategories(), []);

  const filtered = useMemo(() => {
    if (!selectedCategory) return mockPodcasts;
    return mockPodcasts.filter((p) => p.category.includes(selectedCategory));
  }, [selectedCategory]);

  const handleSubscribeToggle = (podcastId: string, shouldSubscribe: boolean) => {
    if (shouldSubscribe) {
      subscribe(podcastId);
    } else {
      unsubscribe(podcastId);
    }
  };

  return (
    <div className="pb-32">
      {/* Hero Section */}
      <Hero podcast={trending[0]} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
          <CategoryGrid
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Trending */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <button
              onClick={() => navigate('/search')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All →
            </button>
          </div>
          <PodcastList
            podcasts={trending}
            onSubscribeToggle={handleSubscribeToggle}
            subscribedIds={subscribed}
          />
        </section>

        {/* By Category */}
        {selectedCategory && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{selectedCategory}</h2>
            <PodcastList
              podcasts={filtered}
              onSubscribeToggle={handleSubscribeToggle}
              subscribedIds={subscribed}
            />
          </section>
        )}

        {/* Recently Added */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recently Added</h2>
          </div>
          <PodcastList
            podcasts={recent}
            onSubscribeToggle={handleSubscribeToggle}
            subscribedIds={subscribed}
          />
        </section>
      </div>
    </div>
  );
};
