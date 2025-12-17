import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

interface LibraryState {
  subscriptions: string[]
  favorites: string[]
  history: string[]
  toggleSubscribe: (podcastId: string) => void
  toggleFavorite: (episodeId: string) => void
  pushHistory: (episodeId: string) => void
}

const LibraryContext = createContext<LibraryState | undefined>(undefined)

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useLocalStorage<string[]>('lib:subs', [])
  const [favorites, setFavorites] = useLocalStorage<string[]>('lib:favs', [])
  const [history, setHistory] = useLocalStorage<string[]>('lib:hist', [])

  function toggleSubscribe(podcastId: string) {
    setSubscriptions((s) => (s.includes(podcastId) ? s.filter((x) => x !== podcastId) : [podcastId, ...s]))
  }
  function toggleFavorite(episodeId: string) {
    setFavorites((s) => (s.includes(episodeId) ? s.filter((x) => x !== episodeId) : [episodeId, ...s]))
  }
  function pushHistory(episodeId: string) {
    setHistory((h) => [episodeId, ...h.filter((x) => x !== episodeId)].slice(0, 100))
  }

  return (
    <LibraryContext.Provider value={{ subscriptions, favorites, history, toggleSubscribe, toggleFavorite, pushHistory }}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}
