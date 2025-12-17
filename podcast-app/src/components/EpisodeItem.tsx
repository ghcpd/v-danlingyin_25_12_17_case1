import React from 'react';
import { Episode, Podcast, EpisodeItemProps } from '../types';
import { Play, Pause, Clock } from 'lucide-react';
import { formatDuration, formatDate } from '../utils/formatters';
import { usePlayer } from '../context/PlayerContext';

export const EpisodeItem: React.FC<EpisodeItemProps> = ({
  episode,
  podcast,
  onPlayClick,
  isPlaying = false,
}) => {
  const { state } = usePlayer();

  return (
    <div className="group border-b border-gray-200 dark:border-gray-700 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors px-4 -mx-4">
      <div className="flex gap-4 items-start">
        {/* Play Button */}
        <button
          onClick={onPlayClick}
          className="mt-1 p-2 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 hover:bg-primary-200 transition-colors flex-shrink-0"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
            Episode {episode.episodeNumber}: {episode.title}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
            {episode.description}
          </p>
          
          <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatDuration(episode.duration)}</span>
            </div>
            <span>{formatDate(episode.releaseDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EpisodeListProps {
  episodes: Episode[];
  podcast: Podcast;
  onEpisodePlay: (episode: Episode) => void;
  currentPlayingEpisodeId?: string;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  podcast,
  onEpisodePlay,
  currentPlayingEpisodeId,
}) => {
  if (episodes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No episodes found</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {episodes.map((episode) => (
        <EpisodeItem
          key={episode.id}
          episode={episode}
          podcast={podcast}
          onPlayClick={() => onEpisodePlay(episode)}
          isPlaying={currentPlayingEpisodeId === episode.id}
        />
      ))}
    </div>
  );
};
