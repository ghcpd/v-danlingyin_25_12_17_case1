import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { LibraryState } from '../types';

type LibraryAction =
  | { type: 'SUBSCRIBE_PODCAST'; payload: string }
  | { type: 'UNSUBSCRIBE_PODCAST'; payload: string }
  | { type: 'ADD_TO_FAVORITES'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: string }
  | { type: 'ADD_TO_HISTORY'; payload: string };

const initialState: LibraryState = {
  subscribedPodcasts: [],
  favorites: [],
  history: [],
};

function libraryReducer(state: LibraryState, action: LibraryAction): LibraryState {
  switch (action.type) {
    case 'SUBSCRIBE_PODCAST':
      return {
        ...state,
        subscribedPodcasts: [...state.subscribedPodcasts, action.payload],
      };
    case 'UNSUBSCRIBE_PODCAST':
      return {
        ...state,
        subscribedPodcasts: state.subscribedPodcasts.filter(id => id !== action.payload),
      };
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload),
      };
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        history: [action.payload, ...state.history.filter(id => id !== action.payload)],
      };
    default:
      return state;
  }
}

const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
} | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within LibraryProvider');
  }
  return context;
}