import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users } from 'lucide-react';
import { Podcast } from '../types';
import { formatNumber } from '../utils/formatters';

interface PodcastCardProps {
  podcast: Podcast;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <Link
      to={`/podcast/${podcast.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={podcast.coverImage}
          alt={`${podcast.title} cover`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
          {podcast.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{podcast.author}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current text-yellow-400" />
            <span>{podcast.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>{formatNumber(podcast.subscribers)}</span>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {podcast.category.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}