import React from 'react'
import type { Podcast } from '../types'
import PodcastCard from './PodcastCard'

interface Props {
  items: Podcast[]
  columns?: number
}

export const PodcastList: React.FC<Props> = ({ items, columns = 3 }) => {
  const cols = columns <= 1 ? 'grid-cols-1' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3 lg:grid-cols-4'
  return (
    <div className={`grid gap-4 ${cols} grid-cols-1`} role="list">
      {items.map((p) => (
        <div role="listitem" key={p.id}>
          <PodcastCard podcast={p} />
        </div>
      ))}
    </div>
  )
}

export default PodcastList
