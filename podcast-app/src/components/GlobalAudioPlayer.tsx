import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { formatDuration } from '../utils/formatters';
import { Play, Pause, Volume2, ChevronDown, ChevronUp, SkipBack, SkipForward } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { PlaybackSpeed } from '../types';

export const GlobalAudioPlayer: React.FC = () => {
  const { state, togglePlayPause, seek, setVolume, setPlaybackSpeed, nextEpisode, previousEpisode } =
    usePlayer();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!state.currentEpisode || !state.currentPodcast) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* Progress Bar */}
      <div className="px-4 py-1">
        <ProgressBar
          currentTime={state.currentTime}
          duration={state.duration}
          onSeek={seek}
        />
      </div>

      {/* Player Controls */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Episode Info */}
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <img
              src={state.currentEpisode.thumbnail || state.currentPodcast.coverImage}
              alt={state.currentEpisode.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">{state.currentPodcast.title}</p>
              <p className="font-semibold text-sm line-clamp-1">{state.currentEpisode.title}</p>
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousEpisode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Previous episode"
              disabled={state.queueIndex <= 0}
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
              aria-label={state.isPlaying ? 'Pause' : 'Play'}
            >
              {state.isPlaying ? <Pause size={24} className="fill-white" /> : <Play size={24} className="fill-white" />}
            </button>

            <button
              onClick={nextEpisode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Next episode"
              disabled={state.queueIndex >= state.queue.length - 1}
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Right: Volume & Expand */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <VolumeControl volume={state.volume} onVolumeChange={setVolume} />
            
            <select
              value={state.playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value) as PlaybackSpeed)}
              className="text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
              aria-label="Playback speed"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          </div>

          {/* Mobile Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>

        {/* Expanded Controls (Mobile) */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4 md:hidden">
            <div>
              <p className="text-sm font-medium mb-2">Volume</p>
              <VolumeControl volume={state.volume} onVolumeChange={setVolume} />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Playback Speed</p>
              <select
                value={state.playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value) as PlaybackSpeed)}
                className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800"
                aria-label="Playback speed"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
