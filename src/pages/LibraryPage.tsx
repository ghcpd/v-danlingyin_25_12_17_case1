import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { podcasts, episodes } from '../data/mockPodcasts';
import PodcastList from '../components/PodcastList';
import EmptyState from '../components/EmptyState';

const LibraryPage: React.FC = () => {
  const { subscribed, favorites, history } = useLibrary();
  const [tab, setTab] = useState<'subscribed' | 'favorites' | 'history'>('subscribed');

  const subscribedPods = podcasts.filter((p) => subscribed.includes(p.id));
  const favEpisodes = episodes.filter((e) => favorites.includes(e.id));
  const historyEpisodes = history.map((id) => episodes.find((e) => e.id === id)).filter(Boolean) as typeof episodes;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-4">My Library</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('subscribed')} className={`px-3 py-1 rounded ${tab === 'subscribed' ? 'bg-primary text-white' : 'bg-white'}`}>Subscribed Podcasts</button>
        <button onClick={() => setTab('favorites')} className={`px-3 py-1 rounded ${tab === 'favorites' ? 'bg-primary text-white' : 'bg-white'}`}>Favorites</button>
        <button onClick={() => setTab('history')} className={`px-3 py-1 rounded ${tab === 'history' ? 'bg-primary text-white' : 'bg-white'}`}>History</button>
      </div>

      {tab === 'subscribed' && (subscribedPods.length ? <PodcastList podcasts={subscribedPods} /> : <EmptyState title="No subscriptions" subtitle="Subscribe to podcasts to see them here" />)}

      {tab === 'favorites' && (favEpisodes.length ? (
        <div className="space-y-4">{favEpisodes.map((e) => <div key={e.id} className="p-3 bg-white rounded shadow">{e.title}</div>)}</div>
      ) : <EmptyState title="No favorites" subtitle="Mark episodes as favorite" />)}

      {tab === 'history' && (historyEpisodes.length ? (
        <div className="space-y-4">{historyEpisodes.map((e) => <div key={e.id} className="p-3 bg-white rounded shadow">{e.title}</div>)}</div>
      ) : <EmptyState title="No history" subtitle="Listen to episodes to build your history" />)}
    </div>
  );
};

export default LibraryPage;