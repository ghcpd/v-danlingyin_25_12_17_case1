import React from 'react';
import { useLibrary } from '../context/LibraryContext';

const SubscribeButton: React.FC<{ podcastId: string }> = ({ podcastId }) => {
  const { subscribed, subscribe, unsubscribe } = useLibrary();
  const isSubscribed = subscribed.includes(podcastId);
  return (
    <button
      onClick={() => (isSubscribed ? unsubscribe(podcastId) : subscribe(podcastId))}
      className={`px-3 py-1 rounded ${isSubscribed ? 'bg-gray-200' : 'bg-primary text-white'}`}
      aria-pressed={isSubscribed}
    >
      {isSubscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  );
};

export default SubscribeButton;