import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { mockPodcasts } from '../data/mockPodcasts';
import PodcastList from '../components/PodcastList';
import LibraryTabs from '../components/LibraryTabs';
import EmptyState from '../components/EmptyState';

const LibraryPage: React.FC = () => {
  const { subscriptions, favorites, history, clearHistory } = useLibrary();

  const [currentTab, setCurrentTab] = React.useState<'subscriptions' | 'favorites' | 'history'>('subscriptions');

  const filteredPodcasts = mockPodcasts.filter((p) => {
    if (currentTab === 'subscriptions') return subscriptions.includes(p.id);
    if (currentTab === 'favorites') return favorites.includes(p.id);
    return true; // history handled separately
  });

  const renderContent = () => {
    if (currentTab === 'history') {
      if (history.length === 0) return <EmptyState title="No listening history" description="Start listening and your history will appear here." />;
      // show last episodes in history
      const recentEpisodes = history.slice(0, 20);
      return (
        <div className="space-y-2">
          {recentEpisodes.map((ep) => (
            <div key={ep.id} className="border-b py-2">
              <div className="font-semibold">{ep.title}</div>
              <div className="text-sm text-gray-600">
                {ep.episodeNumber} — {ep.podcastId}
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (filteredPodcasts.length === 0) return <EmptyState title="No results" description="You have no items in this tab." />;
    return <PodcastList podcasts={filteredPodcasts} />;
  };

  return (
    <div>
      <LibraryTabs current={currentTab} onChange={setCurrentTab} />
      {renderContent()}
      {currentTab === 'history' && history.length > 0 && (
        <button
          onClick={clearHistory}
          className="mt-4 px-4 py-2 rounded bg-gray-200 text-gray-800"
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default LibraryPage;
