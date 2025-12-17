import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Podcast, Episode } from '../types';

type LibraryState = {
  subscribed: string[]; // podcast ids
  favorites: string[]; // episode ids
  history: string[]; // episode ids most recent first
  subscribe: (podcastId: string) => void;
  unsubscribe: (podcastId: string) => void;
  toggleFavorite: (episodeId: string) => void;
  addHistory: (episodeId: string) => void;
};

const LibraryContext = createContext<LibraryState | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscribed, setSubscribed] = useLocalStorage<string[]>('subscribed', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [history, setHistory] = useLocalStorage<string[]>('history', []);

  const subscribe = (podcastId: string) => {
    setSubscribed((s) => (s.includes(podcastId) ? s : [...s, podcastId]));
  };
  const unsubscribe = (podcastId: string) => setSubscribed((s) => s.filter((id) => id !== podcastId));
  const toggleFavorite = (episodeId: string) => setFavorites((f) => (f.includes(episodeId) ? f.filter((e) => e !== episodeId) : [episodeId, ...f]));
  const addHistory = (episodeId: string) => setHistory((h) => [episodeId, ...h.filter((e) => e !== episodeId)].slice(0, 200));

  return (
    <LibraryContext.Provider value={{ subscribed, favorites, history, subscribe, unsubscribe, toggleFavorite, addHistory }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider');
  return ctx;
};
