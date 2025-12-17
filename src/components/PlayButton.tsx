import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import type { Episode } from '../types';

const PlayButton: React.FC<{ episode: Episode }> = ({ episode }) => {
  const { current, playing, play, pause } = usePlayer();
  const isCurrent = current?.id === episode.id;

  return (
    <button
      onClick={() => (isCurrent && playing ? pause() : play(episode))}
      aria-label={isCurrent && playing ? 'Pause' : 'Play'}
      className="p-2 rounded bg-primary text-white"
    >
      {isCurrent && playing ? '⏸' : '▶️'}
    </button>
  );
};

export default PlayButton;