import React from 'react';
import { Podcast, PodcastCardProps } from '../types';
import { Play, Check } from 'lucide-react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PodcastCard: React.FC<PodcastCardProps> = ({
  podcast,
  onClick,
  isSubscribed = false,
  onSubscribeClick,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/podcast/${podcast.id}`);
    }
  };

  return (
    <div
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
      onClick={handleCardClick}
      role="article"
    >
      {/* Cover Image */}
      <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-square">
        <img
          src={podcast.coverImage}
          alt={podcast.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <Play
            size={48}
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
          {podcast.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-3">
          {podcast.author}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span>{podcast.episodeCount} episodes</span>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span>{podcast.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSubscribeClick?.(e);
          }}
          className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            isSubscribed
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200'
              : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 hover:bg-primary-200'
          }`}
          aria-label={isSubscribed ? 'Subscribed' : 'Subscribe'}
        >
          <div className="flex items-center justify-center gap-2">
            {isSubscribed && <Check size={16} />}
            <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

// Memoized version for performance
export const PodcastCardMemo = React.memo(PodcastCard);
