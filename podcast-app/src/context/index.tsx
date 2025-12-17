import React, { createContext, useContext, useCallback } from 'react';
import { HistoryItem } from '../types';
import { useLocalStorage } from '../hooks';

interface LibraryContextType {
  subscribed: Set<string>;
  favorites: Set<string>;
  history: HistoryItem[];
  subscribe: (podcastId: string) => void;
  unsubscribe: (podcastId: string) => void;
  isSubscribed: (podcastId: string) => boolean;
  toggleFavorite: (episodeId: string, podcastId: string) => void;
  isFavorite: (episodeId: string) => boolean;
  addToHistory: (episodeId: string, podcastId: string, currentTime: number) => void;
  clearHistory: () => void;
  getHistory: () => HistoryItem[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscribed, setSubscribed] = useLocalStorage<string[]>('podcast_subscribed', []);
  const [favorites, setFavorites] = useLocalStorage<string[]>('podcast_favorites', []);
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('podcast_history', []);

  const subscribedSet = new Set(subscribed);
  const favoritesSet = new Set(favorites);

  const subscribe = useCallback(
    (podcastId: string) => {
      if (!subscribedSet.has(podcastId)) {
        setSubscribed([...subscribed, podcastId]);
      }
    },
    [subscribed, subscribedSet, setSubscribed]
  );

  const unsubscribe = useCallback(
    (podcastId: string) => {
      setSubscribed(subscribed.filter((id) => id !== podcastId));
    },
    [subscribed, setSubscribed]
  );

  const isSubscribed = useCallback((podcastId: string) => {
    return subscribedSet.has(podcastId);
  }, [subscribedSet]);

  const toggleFavorite = useCallback(
    (episodeId: string, podcastId: string) => {
      const key = `${podcastId}-${episodeId}`;
      if (favoritesSet.has(key)) {
        setFavorites(favorites.filter((id) => id !== key));
      } else {
        setFavorites([...favorites, key]);
      }
    },
    [favorites, favoritesSet, setFavorites]
  );

  const isFavorite = useCallback(
    (favoriteKey: string) => {
      return favoritesSet.has(favoriteKey);
    },
    [favoritesSet]
  );

  const addToHistory = useCallback(
    (episodeId: string, podcastId: string, currentTime: number) => {
      const newHistoryItem: HistoryItem = {
        episodeId,
        podcastId,
        currentTime,
        timestamp: Date.now(),
      };

      // Remove duplicate if exists
      const filtered = history.filter((item) => item.episodeId !== episodeId);
      setHistory([newHistoryItem, ...filtered].slice(0, 100)); // Keep last 100 items
    },
    [history, setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const getHistory = useCallback(() => {
    return history;
  }, [history]);

  const value: LibraryContextType = {
    subscribed: subscribedSet,
    favorites: favoritesSet,
    history,
    subscribe,
    unsubscribe,
    isSubscribed,
    toggleFavorite,
    isFavorite,
    addToHistory,
    clearHistory,
    getHistory,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider');
  }
  return context;
};
