import React from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { usePlayer } from '../context/PlayerContext';
import { Episode } from '../types/index';

interface Props {
  episode: Episode;
}

const PlayButton: React.FC<Props> = ({ episode }) => {
  const { currentEpisode, isPlaying, playEpisode, togglePlay } = usePlayer();

  const handleClick = () => {
    if (currentEpisode?.id === episode.id) {
      togglePlay();
    } else {
      playEpisode(episode);
    }
  };

  const playingThis = currentEpisode?.id === episode.id && isPlaying;

  return (
    <button
      aria-label={playingThis ? 'Pause' : 'Play'}
      onClick={handleClick}
      className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      {playingThis ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
    </button>
  );
};

export default PlayButton;
