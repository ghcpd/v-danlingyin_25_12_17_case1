import React, { createContext, useContext } from 'react';
import useAudioPlayer from '../hooks/useAudioPlayer';
import type { Episode } from '../types';

type PlayerContextType = {
  current?: Episode;
  playing: boolean;
  volume: number;
  currentTime: number;
  play: (ep: Episode) => void;
  pause: () => void;
  seek: (t: number) => void;
  setVolume: (v: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, play, pause, seek, setVolume } = useAudioPlayer();

  const value: PlayerContextType = {
    current: state.current,
    playing: state.playing,
    volume: state.volume,
    currentTime: state.currentTime,
    play,
    pause,
    seek,
    setVolume
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
