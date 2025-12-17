import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import ProgressBar from './ProgressBar';

const format = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

const GlobalAudioPlayer: React.FC = () => {
  const { current, playing, pause, play, currentTime, seek, setVolume } = usePlayer();
  if (!current) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <img src={current.thumbnail} alt="thumb" className="w-12 h-12 rounded object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{current.title}</div>
              <div className="text-xs text-gray-500">{current.podcastId}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => (playing ? pause() : play(current))} aria-label={playing ? 'Pause' : 'Play'} className="p-2 rounded bg-primary text-white">
                {playing ? '⏸' : '▶️'}
              </button>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar value={currentTime} max={current.duration} onSeek={seek} />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{format(currentTime)}</span>
              <span>{format(current.duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;
