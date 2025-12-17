import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { Podcast } from '../types/index';

interface Props {
  podcast: Podcast;
}

const SubscribeButton: React.FC<Props> = ({ podcast }) => {
  const { subscriptions, subscribe, unsubscribe } = useLibrary();
  const subscribed = subscriptions.includes(podcast.id);
  const handleClick = () => {
    if (subscribed) unsubscribe(podcast.id);
    else subscribe(podcast.id);
  };
  return (
    <button
      onClick={handleClick}
      aria-pressed={subscribed}
      className={`px-3 py-1 rounded ${subscribed ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-800'}`}
    >
      {subscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};

export default SubscribeButton;
