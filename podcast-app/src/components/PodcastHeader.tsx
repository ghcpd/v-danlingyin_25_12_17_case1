import React from 'react';
import { Podcast } from '../types';
import { Users, Star, Bell } from 'lucide-react';

interface PodcastHeaderProps {
  podcast: Podcast;
  isSubscribed: boolean;
  onSubscribe: () => void;
  episodeCount: number;
}

export const PodcastHeader: React.FC<PodcastHeaderProps> = ({
  podcast,
  isSubscribed,
  onSubscribe,
  episodeCount,
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <img
            src={podcast.coverImage}
            alt={podcast.title}
            className="w-40 h-40 md:w-48 md:h-48 rounded-lg object-cover shadow-lg"
          />

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold opacity-90 mb-2">PODCAST</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{podcast.title}</h1>
              <p className="text-lg opacity-90 mb-4">{podcast.author}</p>
              <p className="text-sm opacity-80 line-clamp-3">{podcast.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-4">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span className="text-sm">{(podcast.subscribers / 1000).toFixed(0)}K subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="fill-yellow-400" />
                <span className="text-sm">{podcast.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">{episodeCount} episodes</span>
              </div>
            </div>

            <button
              onClick={onSubscribe}
              className={`mt-4 w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                isSubscribed
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800'
              }`}
              aria-label={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            >
              <Bell size={20} />
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
