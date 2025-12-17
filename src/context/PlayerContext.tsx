import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { Episode } from '../types'

interface PlayerState {
  current?: Episode
  queue: Episode[]
  playing: boolean
  currentTime: number
  volume: number
  play: (ep: Episode, queue?: Episode[]) => void
  pause: () => void
  toggle: () => void
  seek: (time: number) => void
  setVolume: (v: number) => void
  next: () => void
  prev: () => void
}

const PlayerContext = createContext<PlayerState | undefined>(undefined)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [current, setCurrent] = useState<Episode | undefined>(undefined)
  const [queue, setQueue] = useState<Episode[]>([])
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolumeState] = useState(1)

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio()
    const a = audioRef.current
    const onTime = () => setCurrentTime(a.currentTime)
    const onEnded = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('ended', onEnded)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('ended', onEnded)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const play = (ep: Episode, q: Episode[] = []) => {
    setCurrent(ep)
    setQueue(q)
    const a = audioRef.current!
    a.src = ep.audioUrl
    a.play()
    setPlaying(true)
  }
  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
  }
  const toggle = () => (playing ? pause() : current && play(current, queue))
  const seek = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }
  const setVolume = (v: number) => setVolumeState(v)
  const next = () => {
    if (!current) return
    const idx = queue.findIndex((e) => e.id === current.id)
    const nextEp = queue[idx + 1]
    if (nextEp) play(nextEp, queue)
  }
  const prev = () => {
    if (!current) return
    const idx = queue.findIndex((e) => e.id === current.id)
    const prevEp = queue[idx - 1]
    if (prevEp) play(prevEp, queue)
  }

  return (
    <PlayerContext.Provider
      value={{ current, queue, playing, currentTime, volume, play, pause, toggle, seek, setVolume, next, prev }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
