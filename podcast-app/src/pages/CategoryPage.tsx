import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockPodcasts, getAllCategories } from '../data/mockPodcasts';
import { PodcastList } from '../components/PodcastList';
import { EmptyState } from '../components/EmptyState';
import { useLibrary } from '../context/index';
import { Category } from '../types';
import { ChevronLeft } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { subscribed, subscribe, unsubscribe } = useLibrary();

  const category = useMemo(() => {
    if (!categoryName) return null;
    const decoded = decodeURIComponent(categoryName);
    return getAllCategories().find((c) => c === decoded) || null;
  }, [categoryName]);

  const podcasts = useMemo(() => {
    if (!category) return [];
    return mockPodcasts.filter((p) => p.category.includes(category));
  }, [category]);

  const handleSubscribeToggle = (podcastId: string, shouldSubscribe: boolean) => {
    if (shouldSubscribe) {
      subscribe(podcastId);
    } else {
      unsubscribe(podcastId);
    }
  };

  if (!category) {
    return (
      <EmptyState
        title="Category not found"
        description="This category doesn't exist."
        action={{ label: 'Go Back', onClick: () => navigate('/') }}
      />
    );
  }

  return (
    <div className="pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <h1 className="text-4xl font-bold mb-2">{category}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {podcasts.length} podcast{podcasts.length !== 1 ? 's' : ''} in this category
        </p>

        {podcasts.length > 0 ? (
          <PodcastList
            podcasts={podcasts}
            onSubscribeToggle={handleSubscribeToggle}
            subscribedIds={subscribed}
          />
        ) : (
          <EmptyState
            title="No podcasts in this category"
            description="Check back later for new content in this category."
            action={{ label: 'Browse All', onClick: () => navigate('/') }}
          />
        )}
      </div>
    </div>
  );
};
