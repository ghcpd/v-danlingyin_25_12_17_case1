import React, { useMemo, useState } from 'react';
import { useLibrary } from '../context/index';
import { PodcastList } from '../components/PodcastList';
import { EmptyState } from '../components/EmptyState';
import { getPodcastById, getPodcastEpisodes } from '../data/mockPodcasts';
import { Podcast, Episode } from '../types';
import { History, Bookmark, Heart } from 'lucide-react';

export const LibraryPage: React.FC = () => {
  const { subscribed, favorites, history, subscribe, unsubscribe } = useLibrary();
  const [activeTab, setActiveTab] = useState<'subscribed' | 'favorites' | 'history'>('subscribed');

  const subscribedPodcasts = useMemo(() => {
    const podcasts: Podcast[] = [];
    subscribed.forEach((id) => {
      const podcast = getPodcastById(id);
      if (podcast) podcasts.push(podcast);
    });
    return podcasts;
  }, [subscribed]);

  const favoriteEpisodes = useMemo(() => {
    const episodes: (Episode & { podcast: Podcast })[] = [];
    favorites.forEach((key) => {
      const [podcastId, episodeId] = key.split('-').slice(0, 2);
      if (podcastId && episodeId) {
        const podcast = getPodcastById(podcastId);
        const podcastEpisodes = getPodcastEpisodes(podcastId);
        const episode = podcastEpisodes.find((e) => e.id.includes(episodeId));
        if (podcast && episode) {
          episodes.push({ ...episode, podcast });
        }
      }
    });
    return episodes;
  }, [favorites]);

  const historyPodcasts = useMemo(() => {
    const podcastMap = new Map<string, Podcast>();
    history.forEach((item) => {
      if (!podcastMap.has(item.podcastId)) {
        const podcast = getPodcastById(item.podcastId);
        if (podcast) {
          podcastMap.set(item.podcastId, podcast);
        }
      }
    });
    return Array.from(podcastMap.values());
  }, [history]);

  const handleSubscribeToggle = (podcastId: string, shouldSubscribe: boolean) => {
    if (shouldSubscribe) {
      subscribe(podcastId);
    } else {
      unsubscribe(podcastId);
    }
  };

  return (
    <div className="pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Library</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'subscribed', label: 'Subscribed', icon: Bookmark },
            { id: 'favorites', label: 'Favorites', icon: Heart },
            { id: 'history', label: 'History', icon: History },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'subscribed' && (
            <>
              {subscribedPodcasts.length > 0 ? (
                <PodcastList
                  podcasts={subscribedPodcasts}
                  onSubscribeToggle={handleSubscribeToggle}
                  subscribedIds={subscribed}
                />
              ) : (
                <EmptyState
                  title="No subscriptions yet"
                  description="Subscribe to podcasts to see them here. Explore and discover new content!"
                  action={{ label: 'Browse Podcasts', onClick: () => window.location.href = '/' }}
                />
              )}
            </>
          )}

          {activeTab === 'favorites' && (
            <>
              {favoriteEpisodes.length > 0 ? (
                <div className="space-y-4">
                  {favoriteEpisodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex gap-4">
                        <img
                          src={episode.podcast.coverImage}
                          alt={episode.podcast.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{episode.podcast.title}</p>
                          <h3 className="font-semibold">{episode.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                            {episode.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No favorite episodes"
                  description="Mark episodes as favorites to save them for later."
                />
              )}
            </>
          )}

          {activeTab === 'history' && (
            <>
              {historyPodcasts.length > 0 ? (
                <PodcastList
                  podcasts={historyPodcasts}
                  onSubscribeToggle={handleSubscribeToggle}
                  subscribedIds={subscribed}
                />
              ) : (
                <EmptyState
                  title="No listening history"
                  description="Start listening to podcasts to see your history here."
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
