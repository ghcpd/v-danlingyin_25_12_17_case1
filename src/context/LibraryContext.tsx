import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Podcast, Episode } from '../types'

interface LibraryState {
  subscriptions: Podcast[]
  favorites: Episode[]
  history: Episode[]
  subscribe: (p: Podcast) => void
  unsubscribe: (id: string) => void
  addFavorite: (e: Episode) => void
  addHistory: (e: Episode) => void
}

const LibraryContext = createContext<LibraryState | undefined>(undefined)

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useLocalStorage<Podcast[]>('subscriptions', [])
  const [favorites, setFavorites] = useLocalStorage<Episode[]>('favorites', [])
  const [history, setHistory] = useLocalStorage<Episode[]>('history', [])

  const subscribe = (p: Podcast) => setSubscriptions((s) => (s.find((x) => x.id === p.id) ? s : [...s, p]))
  const unsubscribe = (id: string) => setSubscriptions((s) => s.filter((x) => x.id !== id))
  const addFavorite = (e: Episode) => setFavorites((s) => (s.find((x) => x.id === e.id) ? s : [e, ...s]))
  const addHistory = (e: Episode) => setHistory((s) => [e, ...s].slice(0, 50))

  return (
    <LibraryContext.Provider value={{ subscriptions, favorites, history, subscribe, unsubscribe, addFavorite, addHistory }}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}
