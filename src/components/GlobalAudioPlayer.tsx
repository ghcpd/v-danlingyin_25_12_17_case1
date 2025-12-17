import React from 'react'
import { usePlayer } from '../context/PlayerContext'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'
import { formatDuration } from '../utils'

export const GlobalAudioPlayer: React.FC = () => {
  const { current, playing, toggle, currentTime, seek, setVolume, volume, next, prev } = usePlayer()

  if (!current) return null

  return (
    <div role="region" aria-live="polite" className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <img src={current.thumbnail} alt="current" className="w-14 h-14 rounded-md object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">{current.title}</div>
              <div className="text-xs text-gray-500">{current.podcastId}</div>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Previous" onClick={prev} className="p-2">⏮</button>
              <button aria-label={playing ? 'Pause' : 'Play'} onClick={toggle} className="p-2 bg-primary text-white rounded">{playing ? 'Pause' : 'Play'}</button>
              <button aria-label="Next" onClick={next} className="p-2">⏭</button>
            </div>
          </div>
          <div className="mt-2">
            <ProgressBar progress={currentTime} duration={current.duration} onSeek={seek} />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(current.duration)}</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <VolumeControl value={volume} onChange={setVolume} />
        </div>
      </div>
    </div>
  )
}

export default GlobalAudioPlayer
