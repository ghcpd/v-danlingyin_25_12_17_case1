import React from 'react';
import { Play, Pause } from 'lucide-react';

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PlayButton({ isPlaying, onClick, size = 'md', className = '' }: PlayButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      onClick={onClick}
      className={`bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center ${sizeClasses[size]} ${className}`}
      aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
    >
      {isPlaying ? (
        <Pause className={iconSizeClasses[size]} />
      ) : (
        <Play className={iconSizeClasses[size]} />
      )}
    </button>
  );
}