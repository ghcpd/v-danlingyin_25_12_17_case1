import React from 'react'
import { useLibrary } from '../context/LibraryContext'

interface Props {
  podcastId: string
}

export const SubscribeButton: React.FC<Props> = ({ podcastId }) => {
  const { subscriptions, toggleSubscribe } = useLibrary()
  const subbed = subscriptions.includes(podcastId)
  return (
    <button onClick={() => toggleSubscribe(podcastId)} aria-label={subbed ? 'Unsubscribe' : 'Subscribe'} className={`px-3 py-1 rounded-md text-sm ${subbed ? 'bg-gray-200 text-gray-800' : 'bg-accent text-white'}`}>
      {subbed ? 'Subscribed' : 'Subscribe'}
    </button>
  )
}

export default SubscribeButton
