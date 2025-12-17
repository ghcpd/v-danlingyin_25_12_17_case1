import React from 'react'
import type { Podcast } from '../types'
import PodcastCard from './PodcastCard'

export const PodcastList: React.FC<{ podcasts: Podcast[]; columns?: number }> = ({ podcasts, columns = 3 }) => {
  const cols = columns === 1 ? 'grid-cols-1' : columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
  return (
    <div className={`grid gap-4 ${cols} grid-cols-1`}>{/* responsive grid */}
      {podcasts.map((p) => (
        <PodcastCard key={p.id} podcast={p} />
      ))}
    </div>
  )
}

export default PodcastList
