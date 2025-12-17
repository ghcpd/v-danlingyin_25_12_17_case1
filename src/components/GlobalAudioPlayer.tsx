import React, { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../context/PlayerContext'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'
import { formatDuration } from '../utils/formatDuration'

export const GlobalAudioPlayer: React.FC = () => {
  const { current, playing, toggle, pause, setCurrentTime, currentTime, setVolume, volume, next, prev } = usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio()
    const audio = audioRef.current
    audio.volume = volume
    function onTime() {
      setCurrentTime(audio.currentTime)
    }
    function onLoaded() {
      setDuration(audio.duration || 0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', () => next())
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [setCurrentTime, volume, next])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !current) return
    if (audio.src !== current.audioUrl) {
      audio.src = current.audioUrl
    }
    if (playing) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [current, playing])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  function handleSeek(p: number) {
    if (!audioRef.current) return
    audioRef.current.currentTime = p * (duration || 1)
    setCurrentTime(audioRef.current.currentTime)
  }

  return (
    <div role="region" aria-live="polite" className="fixed left-0 right-0 bottom-0 bg-white border-t shadow-lg">
      <div className="container flex items-center gap-4 py-3">
        <div className="flex items-center gap-3 w-64">
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-sm">{current ? <img src={current.thumbnail ?? ''} alt="" className="w-12 h-12 object-cover rounded-md" /> : '—'}</div>
          <div className="flex-1">
            <div className="text-sm font-medium">{current ? current.title : 'Not playing'}</div>
            <div className="text-xs text-gray-500">{current ? current.podcastId : ''}</div>
          </div>
        </div>

        <div className="flex-1">
          <ProgressBar progress={duration ? currentTime / duration : 0} onSeek={handleSeek} />
          <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
            <div>{formatDuration(Math.floor(currentTime))}</div>
            <div>{formatDuration(Math.floor(duration || 0))}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-4">
          <button aria-label="Previous" onClick={prev} className="p-2 rounded-md hover:bg-gray-100">⏮</button>
          <button aria-label="Play/Pause" onClick={toggle} className="p-2 rounded-full bg-accent text-white w-10 h-10 flex items-center justify-center">{playing ? '▮▮' : '▶'}</button>
          <button aria-label="Next" onClick={next} className="p-2 rounded-md hover:bg-gray-100">⏭</button>
          <VolumeControl value={volume} onChange={(v) => setVolume(v)} />
        </div>
      </div>
    </div>
  )
}

export default GlobalAudioPlayer
