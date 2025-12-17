import React from 'react';
import { Podcast } from '../types';
import { PodcastCard } from './PodcastCard';

interface PodcastListProps {
  podcasts: Podcast[];
  isLoading?: boolean;
  onSubscribeToggle?: (podcastId: string, subscribed: boolean) => void;
  subscribedIds?: Set<string>;
  columns?: 'auto' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
}

export const PodcastList: React.FC<PodcastListProps> = ({
  podcasts,
  isLoading = false,
  onSubscribeToggle,
  subscribedIds = new Set(),
  columns = 'auto',
}) => {
  const gridClass = columns === 'auto' 
    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    : columns;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-square animate-pulse" />
        ))}
      </div>
    );
  }

  if (podcasts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No podcasts found</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          podcast={podcast}
          isSubscribed={subscribedIds.has(podcast.id)}
          onSubscribeClick={(e) => {
            e.preventDefault();
            const newState = !subscribedIds.has(podcast.id);
            onSubscribeToggle?.(podcast.id, newState);
          }}
        />
      ))}
    </div>
  );
};
