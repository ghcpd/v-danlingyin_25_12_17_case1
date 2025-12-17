import React, { useState } from 'react'
import { useLibrary } from '../context/LibraryContext'
import PodcastList from './PodcastList'

export const LibraryTabs: React.FC = () => {
  const [tab, setTab] = useState<'subscriptions'|'favorites'|'history'>('subscriptions')
  const { subscriptions, favorites, history } = useLibrary()
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setTab('subscriptions')} className={`px-3 py-1 rounded ${tab==='subscriptions'?'bg-primary text-white':''}`}>Subscribed Podcasts</button>
        <button onClick={() => setTab('favorites')} className={`px-3 py-1 rounded ${tab==='favorites'?'bg-primary text-white':''}`}>Favorites</button>
        <button onClick={() => setTab('history')} className={`px-3 py-1 rounded ${tab==='history'?'bg-primary text-white':''}`}>History</button>
      </div>
      <div>
        {tab === 'subscriptions' && (subscriptions.length ? <PodcastList podcasts={subscriptions} /> : <div className="p-4">No subscriptions yet</div>)}
        {tab === 'favorites' && (favorites.length ? <div className="p-4">{favorites.length} favorites</div> : <div className="p-4">No favorites</div>)}
        {tab === 'history' && (history.length ? <div className="p-4">{history.length} listened episodes</div> : <div className="p-4">No history</div>)}
      </div>
    </div>
  )
}

export default LibraryTabs
