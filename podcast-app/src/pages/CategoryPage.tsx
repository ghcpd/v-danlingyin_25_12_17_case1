import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastList } from '../components/PodcastList';
import { mockPodcasts } from '../data/mockPodcasts';
import { Category } from '../types';

export function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();

  const category = useMemo(() => {
    return Object.values(Category).find(cat => cat === categoryName);
  }, [categoryName]);

  const categoryPodcasts = useMemo(() => {
    if (!category) return [];
    return mockPodcasts.filter(podcast => podcast.category.includes(category));
  }, [category]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category}</h1>
          <p className="text-gray-600">
            Discover the best {category.toLowerCase()} podcasts
          </p>
        </div>

        <PodcastList
          podcasts={categoryPodcasts}
          title={`${category} Podcasts`}
        />
      </div>
    </div>
  );
}