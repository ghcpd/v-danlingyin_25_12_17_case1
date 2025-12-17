import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { mockPodcasts } from '../data/mockPodcasts';
import { formatDuration } from '../utils/formatDuration';
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '@heroicons/react/24/solid';

const GlobalAudioPlayer: React.FC = () => {
  const {
    currentEpisode,
    isPlaying,
    togglePlay,
    seekTo,
    currentTime,
    duration,
    setVolume,
    volume
  } = usePlayer();
  const [expanded, setExpanded] = useState(false);

  // Find podcast title by matching podcastId
  const podcast = currentEpisode
    ? mockPodcasts.find((p) => p.id === currentEpisode.podcastId)
    : undefined;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - bounds.left;
    const newTime = (clickX / bounds.width) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  if (!currentEpisode) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 p-2 ${expanded ? 'h-56' : 'h-16'} transition-height duration-300`} aria-label="Audio player" role="region">
      <div className="flex items-center h-full">
        <div className="flex-1 min-w-0">
          <div className={`text-sm ${expanded ? 'text-base' : ''}`}>
            <div className="font-semibold truncate" title={currentEpisode.title}>
              {currentEpisode.title}
            </div>
            {podcast && (
              <div className="text-xs text-gray-500 truncate" title={podcast.title}>
                {podcast.title}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
          </button>
          {/* Could add prev/next buttons here */}
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? 'Minimize player' : 'Expand player'}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 12H4"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center text-xs text-gray-600">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <div
            className="flex-1 mx-2 h-2 bg-gray-300 rounded cursor-pointer relative"
            onClick={handleBarClick}
          >
            <div className="h-2 bg-primary rounded" style={{ width: `${progressPercent}%` }} />
          </div>
          <span>{formatDuration(Math.floor(duration))}</span>
        </div>
        <div className="flex items-center mt-1 text-xs">
          <label htmlFor="volume" className="mr-1">Vol</label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;
