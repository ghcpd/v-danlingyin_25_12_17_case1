import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Episode } from '../types/index';

interface PlayerContextProps {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  playEpisode: (episode: Episode) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  currentTime: number;
  duration: number;
  setVolume: (vol: number) => void;
  volume: number;
  skipNext: () => void;
  skipPrev: () => void;
}

export const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

import { useLibrary } from './LibraryContext';

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  // library context to add to history when episode plays
  const { addHistory } = useLibrary();

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [audioRef.current]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    addHistory(episode);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentEpisode]);

  useEffect(() => {
    if (currentEpisode && audioRef.current) {
      audioRef.current.src = currentEpisode.audioUrl;
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [currentEpisode]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const seekTo = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  };
  const skipNext = () => {
    // No queue implemented in this simple example
  };
  const skipPrev = () => {
    // No queue implemented in this simple example
  };

  return (
    <PlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        playEpisode,
        togglePlay,
        seekTo,
        currentTime,
        duration,
        setVolume,
        volume,
        skipNext,
        skipPrev
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
