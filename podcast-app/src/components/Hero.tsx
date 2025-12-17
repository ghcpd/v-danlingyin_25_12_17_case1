import React from 'react';
import { Podcast } from '../types';
import { Star, Users } from 'lucide-react';

interface HeroProps {
  podcast?: Podcast;
}

export const Hero: React.FC<HeroProps> = ({ podcast }) => {
  if (!podcast) return null;

  return (
    <div className="relative h-96 md:h-96 bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
      <img
        src={podcast.coverImage}
        alt={podcast.title}
        className="w-full h-full object-cover opacity-30 absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-end pb-8">
        <div className="flex gap-6 w-full">
          <img
            src={podcast.coverImage}
            alt={podcast.title}
            className="w-24 h-24 md:w-40 md:h-40 rounded-lg object-cover shadow-lg"
          />
          
          <div className="flex-1 text-white">
            <p className="text-sm font-semibold opacity-90 mb-2">FEATURED PODCAST</p>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 line-clamp-2">{podcast.title}</h1>
            <p className="text-sm md:text-base opacity-90 mb-4">{podcast.author}</p>
            
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{(podcast.subscribers / 1000).toFixed(0)}K subscribers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>{podcast.rating.toFixed(1)} rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
