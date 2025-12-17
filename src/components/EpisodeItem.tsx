import React from 'react'
import type { Episode } from '../types'
import { formatDuration, formatDate } from '../utils'
import { usePlayer } from '../context/PlayerContext'
import { useLibrary } from '../context/LibraryContext'

interface Props {
  episode: Episode
}

export const EpisodeItem: React.FC<Props> = ({ episode }) => {
  const { play } = usePlayer()
  const { addHistory } = useLibrary()

  const onPlay = () => {
    play(episode)
    addHistory(episode)
  }

  return (
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center gap-3">
        <img src={episode.thumbnail} alt="thumb" className="w-16 h-16 rounded-md object-cover" />
        <div>
          <div className="font-medium">{episode.title}</div>
          <div className="text-xs text-gray-500">{formatDate(episode.releaseDate)} • {formatDuration(episode.duration)}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button aria-label={`Play ${episode.title}`} onClick={onPlay} className="px-3 py-2 bg-primary text-white rounded">Play</button>
      </div>
    </div>
  )
}

export default EpisodeItem
