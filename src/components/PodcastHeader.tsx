import React from 'react'
import type { Podcast } from '../types'
import { useLibrary } from '../context/LibraryContext'

export const PodcastHeader: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  const { subscriptions, subscribe, unsubscribe } = useLibrary()
  const isSubscribed = subscriptions.some((s) => s.id === podcast.id)
  return (
    <div className="flex items-center gap-4">
      <img src={podcast.coverImage} alt="cover" className="w-36 h-36 object-cover rounded-md" />
      <div>
        <h1 className="text-2xl font-bold">{podcast.title}</h1>
        <p className="text-sm text-gray-500">by {podcast.author}</p>
        <div className="mt-3">
          <button
            onClick={() => (isSubscribed ? unsubscribe(podcast.id) : subscribe(podcast))}
            className={`px-3 py-2 rounded ${isSubscribed ? 'bg-gray-200' : 'bg-primary text-white'}`}>
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PodcastHeader
