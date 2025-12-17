import React from 'react';
import { useParams } from 'react-router-dom';
import { mockPodcasts, mockEpisodesByPodcast } from '../data/mockPodcasts';
import { Episode } from '../types/index';
import { formatDate } from '../utils/formatDate';
import { formatDuration } from '../utils/formatDuration';
import EpisodeItem from '../components/EpisodeItem';
import { useLibrary } from '../context/LibraryContext';

const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const podcast = mockPodcasts.find((p) => p.id === id);
  const episodes = id ? mockEpisodesByPodcast[id] ?? [] : [];

  const {
    subscribe,
    unsubscribe,
    subscriptions,
    addFavorite,
    removeFavorite,
    favorites
  } = useLibrary();

  if (!podcast) return <div className="p-4">Podcast not found</div>;

  const isSubscribed = subscriptions.includes(podcast.id);
  const isFavorited = favorites.includes(podcast.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img src={podcast.coverImage} alt={`Cover for ${podcast.title}`} className="w-24 h-24 object-cover rounded" />
        <div>
          <h1 className="text-3xl font-semibold">{podcast.title}</h1>
          <p className="text-sm text-gray-600">By {podcast.author}</p>
          <div className="mt-2 flex space-x-4">
            <button
              onClick={() => (isSubscribed ? unsubscribe(podcast.id) : subscribe(podcast.id))}
              className={`px-4 py-2 rounded ${isSubscribed ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-800'}`}
              aria-pressed={isSubscribed}
            >
              {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
            <button
              onClick={() => (isFavorited ? removeFavorite(podcast.id) : addFavorite(podcast.id))}
              className={`px-4 py-2 rounded ${isFavorited ? 'bg-accent text-white' : 'bg-gray-200 text-gray-800'}`}
              aria-pressed={isFavorited}
            >
              {isFavorited ? 'Remove Favorite' : 'Add Favorite'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">About</h2>
        <p className="text-gray-700">{podcast.description}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Episodes</h2>
        {episodes.length === 0 ? (
          <div className="text-gray-500">No episodes found.</div>
        ) : (
          <div role="list" aria-label={`Episodes for ${podcast.title}`}>
            {episodes.map((ep) => (
              <EpisodeItem key={ep.id} episode={ep} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastDetailPage;
