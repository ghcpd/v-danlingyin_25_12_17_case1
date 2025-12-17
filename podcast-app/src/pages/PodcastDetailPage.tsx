import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Users, Calendar } from 'lucide-react';
import { PodcastHeader } from '../components/PodcastHeader';
import { EpisodeItem } from '../components/EpisodeItem';
import { mockPodcasts, mockEpisodes } from '../data/mockPodcasts';
import { formatNumber } from '../utils/formatters';
import { usePlayer } from '../context/PlayerContext';

export function PodcastDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { state } = usePlayer();

  const podcast = useMemo(() => {
    return mockPodcasts.find(p => p.id === id);
  }, [id]);

  const episodes = useMemo(() => {
    return mockEpisodes.filter(e => e.podcastId === id);
  }, [id]);

  if (!podcast) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Podcast Not Found</h1>
          <p className="text-gray-600">The podcast you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PodcastHeader podcast={podcast} />

        {/* Podcast Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{podcast.episodeCount}</div>
              <div className="text-sm text-gray-600">Episodes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(podcast.subscribers)}</div>
              <div className="text-sm text-gray-600">Subscribers</div>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <div className="text-2xl font-bold text-gray-900">{podcast.rating}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{podcast.category.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed">{podcast.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {podcast.category.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Episodes */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Episodes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {episodes.map((episode) => (
              <EpisodeItem
                key={episode.id}
                episode={episode}
                isCurrentEpisode={state.currentEpisode?.id === episode.id}
              />
            ))}
          </div>
          {episodes.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No episodes available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}