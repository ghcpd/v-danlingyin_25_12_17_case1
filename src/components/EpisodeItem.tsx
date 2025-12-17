import React from 'react';
import { Episode } from '../types/index';
import { formatDuration } from '../utils/formatDuration';
import { formatDate } from '../utils/formatDate';
import PlayButton from './PlayButton';

interface Props {
  episode: Episode;
}

const EpisodeItem: React.FC<Props> = ({ episode }) => {
  return (
    <div className="flex items-center border-b py-2" role="listitem">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-md truncate" title={episode.title}>
          {episode.title}
        </h3>
        <p className="text-sm text-gray-500">
          {formatDate(episode.releaseDate)} • {formatDuration(episode.duration)}
        </p>
      </div>
      <div className="ml-4">
        <PlayButton episode={episode} />
      </div>
    </div>
  );
};

export default EpisodeItem;
