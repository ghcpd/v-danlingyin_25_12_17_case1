import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Episode, Podcast, PlayerState, PlaybackSpeed } from '../types';

interface PlayerContextType {
  state: PlayerState;
  playEpisode: (episode: Episode, podcast: Podcast) => void;
  togglePlayPause: () => void;
  pause: () => void;
  play: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setPlaybackSpeed: (speed: PlaybackSpeed) => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
  addToQueue: (episode: Episode) => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayerState>({
    currentEpisode: null,
    currentPodcast: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    playbackSpeed: PlaybackSpeed.Normal,
    queue: [],
    queueIndex: -1,
  });

  const [audioElement] = useState<HTMLAudioElement>(() => {
    const audio = new Audio();
    audio.crossOrigin = 'anonymous';
    return audio;
  });

  // Update audio playback when state changes
  useEffect(() => {
    if (!state.currentEpisode) return;

    audioElement.src = state.currentEpisode.audioUrl;
    audioElement.volume = state.volume;
    audioElement.playbackRate = state.playbackSpeed;

    if (state.isPlaying) {
      audioElement.play().catch((err) => console.error('Play error:', err));
    } else {
      audioElement.pause();
    }
  }, [state.currentEpisode, state.isPlaying, state.volume, state.playbackSpeed, audioElement]);

  // Listen to audio events
  useEffect(() => {
    const handleTimeUpdate = () => {
      setState((prev) => ({ ...prev, currentTime: audioElement.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setState((prev) => ({ ...prev, duration: audioElement.duration }));
    };

    const handleEnded = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
      // Auto-play next episode if in queue
      if (state.queueIndex < state.queue.length - 1) {
        const nextEp = state.queue[state.queueIndex + 1];
        if (state.currentPodcast) {
          playEpisode(nextEp, state.currentPodcast);
        }
      }
    };

    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioElement, state.queueIndex, state.queue, state.currentPodcast]);

  const playEpisode = useCallback((episode: Episode, podcast: Podcast) => {
    setState((prev) => ({
      ...prev,
      currentEpisode: episode,
      currentPodcast: podcast,
      isPlaying: true,
      currentTime: 0,
      queueIndex: prev.queue.findIndex((e) => e.id === episode.id),
    }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const play = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const seek = useCallback((time: number) => {
    audioElement.currentTime = time;
    setState((prev) => ({ ...prev, currentTime: time }));
  }, [audioElement]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState((prev) => ({ ...prev, volume: clampedVolume }));
  }, []);

  const setPlaybackSpeed = useCallback((speed: PlaybackSpeed) => {
    setState((prev) => ({ ...prev, playbackSpeed: speed }));
  }, []);

  const nextEpisode = useCallback(() => {
    if (state.queueIndex < state.queue.length - 1 && state.currentPodcast) {
      const nextEp = state.queue[state.queueIndex + 1];
      playEpisode(nextEp, state.currentPodcast);
    }
  }, [state.queueIndex, state.queue, state.currentPodcast, playEpisode]);

  const previousEpisode = useCallback(() => {
    if (state.queueIndex > 0 && state.currentPodcast) {
      const prevEp = state.queue[state.queueIndex - 1];
      playEpisode(prevEp, state.currentPodcast);
    } else {
      seek(0);
    }
  }, [state.queueIndex, state.queue, state.currentPodcast, playEpisode, seek]);

  const addToQueue = useCallback((episode: Episode) => {
    setState((prev) => {
      const alreadyInQueue = prev.queue.some((e) => e.id === episode.id);
      if (alreadyInQueue) return prev;
      return { ...prev, queue: [...prev.queue, episode] };
    });
  }, []);

  const clearQueue = useCallback(() => {
    setState((prev) => ({
      ...prev,
      queue: [],
      queueIndex: -1,
    }));
  }, []);

  const value: PlayerContextType = {
    state,
    playEpisode,
    togglePlayPause,
    pause,
    play,
    seek,
    setVolume,
    setPlaybackSpeed,
    nextEpisode,
    previousEpisode,
    addToQueue,
    clearQueue,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
};
