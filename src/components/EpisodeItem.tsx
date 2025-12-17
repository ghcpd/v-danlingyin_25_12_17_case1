import React from 'react';
import type { Episode } from '../types';
import PlayButton from './PlayButton';

const formatDuration = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const EpisodeItem: React.FC<{ episode: Episode }> = ({ episode }) => {
  return (
    <div className="flex items-center gap-4 p-3 border-b">
      <img src={episode.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{episode.title}</h4>
          <div className="text-xs text-gray-500">{formatDuration(episode.duration)}</div>
        </div>
        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{episode.description}</p>
        <div className="mt-2">
          <PlayButton episode={episode} />
        </div>
      </div>
    </div>
  );
};

export default EpisodeItem;