import { useCallback, useRef, useState } from 'react';
import type { Episode } from '../types';

export type PlayerState = {
  current?: Episode;
  playing: boolean;
  volume: number;
  currentTime: number;
};

export default function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>({ playing: false, volume: 1, currentTime: 0 });

  const play = useCallback((episode: Episode) => {
    if (!audioRef.current) audioRef.current = new Audio(episode.audioUrl);
    else if (state.current?.id !== episode.id) {
      audioRef.current.src = episode.audioUrl;
    }

    setState((s) => ({ ...s, current: episode }));
    audioRef.current.play();
    setState((s) => ({ ...s, playing: true }));

    audioRef.current.ontimeupdate = () => {
      setState((s) => ({ ...s, currentTime: audioRef.current?.currentTime ?? 0 }));
    };

    audioRef.current.onended = () => setState((s) => ({ ...s, playing: false }));
  }, [state.current]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setState((s) => ({ ...s, playing: false }));
  }, []);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setState((s) => ({ ...s, currentTime: time }));
  }, []);

  const setVolume = useCallback((v: number) => {
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.volume = v;
    setState((s) => ({ ...s, volume: v }));
  }, []);

  return { audioRef, state, play, pause, seek, setVolume };
}
