import React from 'react';
import { ProgressBarProps } from '../types';
import { formatDuration } from '../utils/formatters';

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
}) => {
  const percentage = (currentTime / duration) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono text-gray-600 dark:text-gray-400 w-10">
        {formatDuration(currentTime)}
      </span>
      <div
        className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer group"
        onClick={handleClick}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
      >
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <span className="text-xs font-mono text-gray-600 dark:text-gray-400 w-10 text-right">
        {formatDuration(duration)}
      </span>
    </div>
  );
};
