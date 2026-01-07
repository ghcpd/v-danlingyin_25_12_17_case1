import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Episode, PlayerState } from '../types';

type PlayerAction =
  | { type: 'PLAY_EPISODE'; payload: Episode }
  | { type: 'TOGGLE_PLAY_PAUSE' }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'ADD_TO_QUEUE'; payload: Episode }
  | { type: 'REMOVE_FROM_QUEUE'; payload: string };

const initialState: PlayerState = {
  currentEpisode: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  queue: [],
};

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY_EPISODE':
      return {
        ...state,
        currentEpisode: action.payload,
        isPlaying: true,
      };
    case 'TOGGLE_PLAY_PAUSE':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload,
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload,
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter(ep => ep.id !== action.payload),
      };
    default:
      return state;
  }
}

const PlayerContext = createContext<{
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
} | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
}