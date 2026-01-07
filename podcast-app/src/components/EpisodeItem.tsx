import React from 'react';
import { PlayButton } from './PlayButton';
import { Episode } from '../types';
import { formatDuration, formatDate } from '../utils/formatters';
import { usePlayer } from '../context/PlayerContext';

interface EpisodeItemProps {
  episode: Episode;
  isCurrentEpisode?: boolean;
}

export function EpisodeItem({ episode, isCurrentEpisode = false }: EpisodeItemProps) {
  const { state, dispatch } = usePlayer();
  const isPlaying = isCurrentEpisode && state.isPlaying;

  const handlePlay = () => {
    if (isCurrentEpisode) {
      dispatch({ type: 'TOGGLE_PLAY_PAUSE' });
    } else {
      dispatch({ type: 'PLAY_EPISODE', payload: episode });
    }
  };

  return (
    <div className={`p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
      isCurrentEpisode ? 'bg-primary-50 border-primary-200' : ''
    }`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <PlayButton
            isPlaying={isPlaying}
            onClick={handlePlay}
            size="md"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 line-clamp-2">
                Episode {episode.episodeNumber}: {episode.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {episode.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span>{formatDuration(episode.duration)}</span>
            <span>{formatDate(episode.releaseDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}