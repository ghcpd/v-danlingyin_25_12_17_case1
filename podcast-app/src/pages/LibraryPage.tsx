import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PodcastList } from '../components/PodcastList';
import { EmptyState } from '../components/EmptyState';
import { mockPodcasts } from '../data/mockPodcasts';
import { useLibrary } from '../context/LibraryContext';

type TabType = 'subscribed' | 'favorites' | 'history';

export function LibraryPage() {
  const [activeTab, setActiveTab] = useState<TabType>('subscribed');
  const { state } = useLibrary();

  const tabs = [
    { id: 'subscribed' as TabType, label: 'Subscribed Podcasts', count: state.subscribedPodcasts.length },
    { id: 'favorites' as TabType, label: 'Favorites', count: state.favorites.length },
    { id: 'history' as TabType, label: 'History', count: state.history.length },
  ];

  const getPodcastsForTab = () => {
    switch (activeTab) {
      case 'subscribed':
        return mockPodcasts.filter(podcast => state.subscribedPodcasts.includes(podcast.id));
      case 'favorites':
        // For favorites, we'd need to get podcasts that have favorited episodes
        // Simplified: return all podcasts for now
        return mockPodcasts.slice(0, 3);
      case 'history':
        // Similar for history
        return mockPodcasts.slice(0, 2);
      default:
        return [];
    }
  };

  const podcasts = getPodcastsForTab();

  const getEmptyState = () => {
    switch (activeTab) {
      case 'subscribed':
        return {
          title: 'No subscribed podcasts',
          description: 'Subscribe to podcasts to see them here.',
          action: (
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Browse Podcasts
            </Link>
          ),
        };
      case 'favorites':
        return {
          title: 'No favorite episodes',
          description: 'Mark episodes as favorites to see them here.',
        };
      case 'history':
        return {
          title: 'No listening history',
          description: 'Your recently played episodes will appear here.',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Library</h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 py-0.5 px-2 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          {podcasts.length > 0 ? (
            <PodcastList podcasts={podcasts} />
          ) : (
            <EmptyState {...getEmptyState()} />
          )}
        </div>
      </div>
    </div>
  );
}