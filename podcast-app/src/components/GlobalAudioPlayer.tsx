import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { formatDuration } from '../utils/formatters';

export function GlobalAudioPlayer() {
  const { state, dispatch } = usePlayer();
  const { currentEpisode, isPlaying, currentTime, duration, volume } = state;
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!currentEpisode) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    dispatch({ type: 'SET_CURRENT_TIME', payload: newTime });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const newVolume = isMuted ? 1 : 0;
    dispatch({ type: 'SET_VOLUME', payload: newVolume });
    setIsMuted(!isMuted);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-24'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        {/* Episode Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <img
            src={currentEpisode.thumbnail || 'https://picsum.photos/60/60?random=episode'}
            alt={`${currentEpisode.title} thumbnail`}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-gray-900 truncate">{currentEpisode.title}</h4>
            <p className="text-sm text-gray-600 truncate">Episode {currentEpisode.episodeNumber}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_TIME', payload: Math.max(currentTime - 15, 0) })}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Skip backward 15 seconds"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_PLAY_PAUSE' })}
              className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            <button
              onClick={() => dispatch({ type: 'SET_CURRENT_TIME', payload: Math.min(currentTime + 15, duration) })}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Skip forward 15 seconds"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-10 text-right">
              {formatDuration(Math.floor(currentTime))}
            </span>
            <div
              className="flex-1 h-1 bg-gray-200 rounded-full cursor-pointer relative"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500 w-10">
              {formatDuration(Math.floor(duration))}
            </span>
          </div>
        </div>

        {/* Volume & Minimize */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-1 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
            aria-label={isMinimized ? 'Expand player' : 'Minimize player'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}