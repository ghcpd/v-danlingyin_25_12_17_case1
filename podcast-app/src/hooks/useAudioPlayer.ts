import { useState, useRef, useEffect, useCallback } from 'react';
import { Episode } from '../types';

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [queue, setQueue] = useState<Episode[]>([]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Play next episode if available
      if (queue.length > 0) {
        const nextEpisode = queue[0];
        setQueue(prev => prev.slice(1));
        playEpisode(nextEpisode);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue]);

  const playEpisode = useCallback((episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = episode.audioUrl;
      audioRef.current.play();
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolumeLevel = useCallback((vol: number) => {
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  }, []);

  const skipForward = useCallback((seconds: number = 15) => {
    if (audioRef.current) {
      const newTime = Math.min(currentTime + seconds, duration);
      seekTo(newTime);
    }
  }, [currentTime, duration, seekTo]);

  const skipBackward = useCallback((seconds: number = 15) => {
    if (audioRef.current) {
      const newTime = Math.max(currentTime - seconds, 0);
      seekTo(newTime);
    }
  }, [currentTime, seekTo]);

  const addToQueue = useCallback((episode: Episode) => {
    setQueue(prev => [...prev, episode]);
  }, []);

  return {
    audioRef,
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    playEpisode,
    togglePlayPause,
    seekTo,
    setVolumeLevel,
    skipForward,
    skipBackward,
    addToQueue,
  };
}