import React from 'react';
import PodcastCard from './PodcastCard';
import { Podcast } from '../types/index';

interface Props {
  podcasts: Podcast[];
  columns?: number;
}

const PodcastList: React.FC<Props> = ({ podcasts, columns = 4 }) => {
  const getGridClass = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
  };
  return (
    <div className={`grid gap-4 ${getGridClass()}`} role="list">
      {podcasts.map((p) => (
        <PodcastCard key={p.id} podcast={p} />
      ))}
    </div>
  );
};

export default PodcastList;
