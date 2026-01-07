import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Users } from 'lucide-react';
import { Podcast } from '../types';
import { formatNumber } from '../utils/formatters';

interface HeroProps {
  featuredPodcast: Podcast;
}

export function Hero({ featuredPodcast }: HeroProps) {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Your Next
                <span className="block text-accent-400">Favorite Podcast</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-primary-100 max-w-lg">
                Explore thousands of podcasts across categories. Listen, subscribe, and never miss an episode.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/podcast/${featuredPodcast.id}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Listen Now
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                Browse All
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:mx-0">
              <img
                src={featuredPodcast.coverImage}
                alt={`${featuredPodcast.title} cover`}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg p-4 text-gray-900">
              <h3 className="font-semibold text-lg mb-1">{featuredPodcast.title}</h3>
              <p className="text-sm text-gray-600 mb-2">by {featuredPodcast.author}</p>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span>{featuredPodcast.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{formatNumber(featuredPodcast.subscribers)} subscribers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}