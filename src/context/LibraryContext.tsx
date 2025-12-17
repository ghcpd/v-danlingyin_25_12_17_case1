import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Podcast, Episode } from '../types/index';

interface LibraryContextProps {
  subscriptions: string[]; // podcast ids
  favorites: string[]; // podcast ids
  history: Episode[];
  subscribe: (podcastId: string) => void;
  unsubscribe: (podcastId: string) => void;
  addFavorite: (podcastId: string) => void;
  removeFavorite: (podcastId: string) => void;
  addHistory: (episode: Episode) => void;
  clearHistory: () => void;
}

const LibraryContext = createContext<LibraryContextProps | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useLocalStorage<string[]>('subscriptions', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [history, setHistory] = useLocalStorage<Episode[]>('history', []);

  const subscribe = (id: string) => setSubscriptions((prev) => Array.from(new Set([...prev, id])));
  const unsubscribe = (id: string) => setSubscriptions((prev) => prev.filter((pid) => pid !== id));

  const addFavorite = (id: string) => setFavorites((prev) => Array.from(new Set([...prev, id])));
  const removeFavorite = (id: string) => setFavorites((prev) => prev.filter((pid) => pid !== id));

  const addHistory = (episode: Episode) => {
    setHistory((prev) => [episode, ...prev].slice(0, 100)); // keep last 100
  };
  const clearHistory = () => setHistory([]);

  return (
    <LibraryContext.Provider
      value={{ subscriptions, favorites, history, subscribe, unsubscribe, addFavorite, removeFavorite, addHistory, clearHistory }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider');
  return ctx;
};
