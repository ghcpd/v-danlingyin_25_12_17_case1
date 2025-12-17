import React from 'react';
import { Podcast } from '../types/index';
import SubscribeButton from './SubscribeButton';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  podcast: Podcast;
}

const PodcastHeader: React.FC<Props> = ({ podcast }) => {
  const { subscriptions, addFavorite, removeFavorite, favorites } = useLibrary();
  const isFavorited = favorites.includes(podcast.id);

  const { playEpisode } = usePlayer();

  const handleFavorite = () => {
    if (isFavorited) removeFavorite(podcast.id);
    else addFavorite(podcast.id);
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <img src={podcast.coverImage} alt={`Cover for ${podcast.title}`} className="w-24 h-24 object-cover rounded" />
      <div>
        <h1 className="text-3xl font-semibold">{podcast.title}</h1>
        <p className="text-sm text-gray-600">By {podcast.author}</p>
        <div className="mt-2 flex space-x-4">
          <SubscribeButton podcast={podcast} />
          <button
            onClick={handleFavorite}
            aria-pressed={isFavorited}
            className={`px-3 py-1 rounded ${isFavorited ? 'bg-accent text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {isFavorited ? 'Remove Favorite' : 'Add Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PodcastHeader;
