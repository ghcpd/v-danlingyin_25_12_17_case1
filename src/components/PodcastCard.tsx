import React from 'react';
import { Link } from 'react-router-dom';
import { Podcast } from '../types/index';
import StarRating from './StarRating';

interface Props {
  podcast: Podcast;
}

const PodcastCard: React.FC<Props> = ({ podcast }) => (
  <div className="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow duration-200">
    <Link
      to={`/podcast/${podcast.id}`}
      aria-label={`View details for ${podcast.title}`}
      className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <img
        src={podcast.coverImage}
        alt={`Cover for ${podcast.title}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg truncate text-gray-900 dark:text-gray-100" title={podcast.title}>
          {podcast.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate" title={podcast.author}>
          {podcast.author}
        </p>
        <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
          <span>{podcast.episodeCount} episodes</span> •{' '}
          <span>{podcast.subscribers.toLocaleString()} subscribers</span>
        </div>
        <div className="mt-2">
          <StarRating rating={podcast.rating} />
        </div>
      </div>
    </Link>
  </div>
);

export default React.memo(PodcastCard);
