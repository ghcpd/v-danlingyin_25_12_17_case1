import React from 'react'
import type { Episode } from '../types'
import { formatDuration } from '../utils/formatDuration'
import { formatDate } from '../utils/formatDate'
import { usePlayer } from '../context/PlayerContext'
import { useLibrary } from '../context/LibraryContext'
import PlayButton from './PlayButton'

interface Props {
  episode: Episode
  compact?: boolean
}

export const EpisodeItem: React.FC<Props> = ({ episode, compact = false }) => {
  const { current, playing, play } = usePlayer()
  const { pushHistory } = useLibrary()
  const isCurrent = current?.id === episode.id

  function handlePlay() {
    play(episode)
    pushHistory(episode.id)
  }

  return (
    <div className={`flex items-center gap-4 p-3 rounded-md hover:bg-gray-50 ${compact ? 'text-sm' : 'bg-white shadow-sm'}`}>
      <PlayButton playing={isCurrent && playing} onClick={handlePlay} ariaLabel={`Play ${episode.title}`} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{episode.episodeNumber}. {episode.title}</div>
            <div className="text-xs text-gray-500">{formatDate(episode.releaseDate)} • {formatDuration(episode.duration)}</div>
          </div>
          <div className="text-sm text-gray-400">{compact ? '' : '...'} </div>
        </div>
        {!compact && <p className="mt-2 text-sm text-gray-600">{episode.description}</p>}
      </div>
    </div>
  )
}

export default EpisodeItem
