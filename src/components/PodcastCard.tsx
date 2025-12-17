import React from 'react'
import type { Podcast } from '../types'
import { Link } from 'react-router-dom'

interface Props {
  podcast: Podcast
}

export const PodcastCard: React.FC<Props> = React.memo(({ podcast }) => {
  return (
    <article className="bg-white rounded-lg shadow p-4 flex flex-col" role="article">
      <Link to={`/podcast/${podcast.id}`} className="flex gap-4 items-center">
        <img src={podcast.coverImage} alt={`${podcast.title} cover`} className="w-20 h-20 rounded-md object-cover flex-shrink-0" loading="lazy" />
        <div>
          <h3 className="font-semibold">{podcast.title}</h3>
          <p className="text-sm text-gray-500">{podcast.author}</p>
          <div className="mt-2 text-xs text-gray-400">
            <span className="mr-2">{podcast.episodeCount} eps</span>
            <span className="mr-2">•</span>
            <span>{podcast.subscribers.toLocaleString()} subs</span>
          </div>
        </div>
      </Link>
    </article>
  )
})

PodcastCard.displayName = 'PodcastCard'
export default PodcastCard
