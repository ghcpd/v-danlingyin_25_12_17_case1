import React from 'react'
import { Link } from 'react-router-dom'
import type { Podcast } from '../types'

interface Props {
  podcast: Podcast
}

export const PodcastCard: React.FC<Props> = React.memo(({ podcast }) => {
  return (
    <article className="bg-white border rounded-md p-3 shadow-sm hover:shadow-md transition" aria-labelledby={`pod-${podcast.id}`}>
      <Link to={`/podcast/${podcast.id}`} className="flex gap-3 items-center">
        <img src={podcast.coverImage} alt={podcast.title} className="w-20 h-20 rounded-md object-cover" />
        <div>
          <h3 id={`pod-${podcast.id}`} className="font-semibold">{podcast.title}</h3>
          <p className="text-sm text-gray-500">{podcast.author}</p>
          <p className="text-xs text-gray-400 mt-1">{podcast.episodeCount} episodes • {podcast.rating}★</p>
        </div>
      </Link>
    </article>
  )
})

PodcastCard.displayName = 'PodcastCard'
export default PodcastCard
