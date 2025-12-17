import React, { createContext, useContext, useState } from 'react'
import type { Episode } from '../types'

interface PlayerState {
  current?: Episode
  playing: boolean
  volume: number
  queue: Episode[]
  currentTime: number
  play: (ep: Episode, queue?: Episode[]) => void
  toggle: () => void
  pause: () => void
  setVolume: (v: number) => void
  setCurrentTime: (t: number) => void
  next: () => void
  prev: () => void
}

const PlayerContext = createContext<PlayerState | undefined>(undefined)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<Episode | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.8)
  const [queue, setQueue] = useState<Episode[]>([])
  const [currentTime, setCurrentTime] = useState(0)

  function play(ep: Episode, q: Episode[] = []) {
    setCurrent(ep)
    if (q.length) setQueue(q)
    setPlaying(true)
    setCurrentTime(0)
  }
  function toggle() {
    setPlaying((p) => !p)
  }
  function pause() {
    setPlaying(false)
  }
  function setVolume(v: number) {
    setVolumeState(Math.max(0, Math.min(1, v)))
  }
  function next() {
    if (!current) return
    const idx = queue.findIndex((x) => x.id === current.id)
    const next = queue[idx + 1]
    if (next) play(next, queue)
  }
  function prev() {
    if (!current) return
    const idx = queue.findIndex((x) => x.id === current.id)
    const p = queue[idx - 1]
    if (p) play(p, queue)
  }

  const value: PlayerState = {
    current,
    playing,
    volume,
    queue,
    currentTime,
    play,
    toggle,
    pause,
    setVolume,
    setCurrentTime,
    next,
    prev
  }
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
