import React from 'react';
import { VolumeControlProps } from '../types';
import { Volume2, Volume, Volume1 } from 'lucide-react';

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  onVolumeChange,
}) => {
  const getVolumeIcon = () => {
    if (volume === 0) return <Volume1 size={20} />;
    if (volume < 0.5) return <Volume size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="flex items-center gap-2">
      {getVolumeIcon()}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-20 h-1 bg-gray-300 dark:bg-gray-600 rounded-full appearance-none cursor-pointer accent-primary-600"
        aria-label="Volume"
        role="slider"
      />
      <span className="text-xs text-gray-600 dark:text-gray-400 w-8">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
};
