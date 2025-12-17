import React from 'react';
import { SubscribeButton } from './SubscribeButton';
import { Podcast } from '../types';
import { useLibrary } from '../context/LibraryContext';

interface PodcastHeaderProps {
  podcast: Podcast;
}

export function PodcastHeader({ podcast }: PodcastHeaderProps) {
  const { state, dispatch } = useLibrary();
  const isSubscribed = state.subscribedPodcasts.includes(podcast.id);

  const handleSubscribe = () => {
    if (isSubscribed) {
      dispatch({ type: 'UNSUBSCRIBE_PODCAST', payload: podcast.id });
    } else {
      dispatch({ type: 'SUBSCRIBE_PODCAST', payload: podcast.id });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={podcast.coverImage}
          alt={`${podcast.title} cover`}
          className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{podcast.title}</h1>
          <p className="text-lg text-gray-600 mb-4">by {podcast.author}</p>
          <SubscribeButton
            isSubscribed={isSubscribed}
            onClick={handleSubscribe}
          />
        </div>
      </div>
    </div>
  );
}