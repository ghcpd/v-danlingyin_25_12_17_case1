import React from 'react';
import type { Podcast } from '../types';
import { Link } from 'react-router-dom';

const PodcastCard: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link to={`/podcast/${podcast.id}`} className="block">
        <img src={podcast.coverImage} alt={`${podcast.title} cover`} className="w-full h-48 object-cover" />
        <div className="p-3">
          <h3 className="text-sm font-semibold">{podcast.title}</h3>
          <p className="text-xs text-gray-500">{podcast.author}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-600">{podcast.episodeCount} episodes</span>
            <span className="text-xs bg-gray-100 px-2 rounded">⭐ {podcast.rating}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default React.memo(PodcastCard);
