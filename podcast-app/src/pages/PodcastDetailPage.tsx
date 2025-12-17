import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getPodcastById, getPodcastEpisodes } from '../data/mockPodcasts';
import { PodcastHeader } from '../components/PodcastHeader';
import { EpisodeList } from '../components/EpisodeItem';
import { EmptyState } from '../components/EmptyState';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/index';

export const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playEpisode } = usePlayer();
  const { state: playerState } = usePlayer();
  const { subscribed, subscribe, unsubscribe } = useLibrary();

  const podcast = useMemo(() => getPodcastById(id || ''), [id]);
  const episodes = useMemo(() => (podcast ? getPodcastEpisodes(podcast.id) : []), [podcast]);

  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');

  const sortedEpisodes = useMemo(() => {
    const sorted = [...episodes];
    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    } else {
      sorted.sort((a, b) => b.episodeNumber - a.episodeNumber);
    }
    return sorted;
  }, [episodes, sortBy]);

  if (!podcast) {
    return (
      <EmptyState
        title="Podcast not found"
        description="The podcast you're looking for doesn't exist or has been removed."
        action={{ label: 'Go to Home', onClick: () => window.location.href = '/' }}
      />
    );
  }

  const isSubscribed = subscribed.has(podcast.id);

  const handleSubscribeClick = () => {
    if (isSubscribed) {
      unsubscribe(podcast.id);
    } else {
      subscribe(podcast.id);
    }
  };

  return (
    <div className="pb-32">
      <PodcastHeader
        podcast={podcast}
        isSubscribed={isSubscribed}
        onSubscribe={handleSubscribeClick}
        episodeCount={episodes.length}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{podcast.description}</p>
        </section>

        {/* Episodes Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Episodes</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
            >
              <option value="date">Latest First</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>

          <EpisodeList
            episodes={sortedEpisodes}
            podcast={podcast}
            onEpisodePlay={(episode) => playEpisode(episode, podcast)}
            currentPlayingEpisodeId={playerState.currentEpisode?.id}
          />
        </section>
      </div>
    </div>
  );
};
