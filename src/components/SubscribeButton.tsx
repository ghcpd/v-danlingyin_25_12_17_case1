import React from 'react'
import { useLibrary } from '../context/LibraryContext'
import type { Podcast } from '../types'

export const SubscribeButton: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  const { subscriptions, subscribe, unsubscribe } = useLibrary()
  const isSubscribed = subscriptions.some((s) => s.id === podcast.id)
  return (
    <button onClick={() => (isSubscribed ? unsubscribe(podcast.id) : subscribe(podcast))} className={`px-3 py-1 rounded ${isSubscribed ? 'bg-gray-200' : 'bg-primary text-white'}`}>
      {isSubscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  )
}

export default SubscribeButton
