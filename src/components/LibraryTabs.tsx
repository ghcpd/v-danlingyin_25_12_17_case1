import React from 'react'
import { useLibrary } from '../context/LibraryContext'
import PodcastList from './PodcastList'
import EmptyState from './EmptyState'
import { podcasts } from '../data/mockPodcasts'

export const LibraryTabs: React.FC = () => {
  const { subscriptions, favorites, history } = useLibrary()
  const subs = podcasts.filter((p) => subscriptions.includes(p.id))
  const favEps = favorites
  const hist = history

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Subscribed Podcasts</h3>
        <div className="mt-3">{subs.length ? <PodcastList items={subs} /> : <EmptyState title="No subscriptions" message="Subscribe to podcasts to see them here." />}</div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Favorites</h3>
        <div className="mt-3">{favEps.length ? <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{favEps.map((f) => <div key={f} className="bg-white p-3 rounded shadow text-sm">{f}</div>)}</div> : <EmptyState title="No favorites" message="Mark episodes as favorite to find them here." />}</div>
      </div>

      <div>
        <h3 className="text-lg font-semibold">History</h3>
        <div className="mt-3">{hist.length ? <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{hist.map((h) => <div key={h} className="bg-white p-3 rounded shadow text-sm">{h}</div>)}</div> : <EmptyState title="No history" message="Played episodes will appear here." />}</div>
      </div>
    </div>
  )
}

export default LibraryTabs
