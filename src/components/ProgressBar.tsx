import React from 'react';

interface Props {
  current: number;
  duration: number;
  onSeek?: (time: number) => void;
}

const ProgressBar: React.FC<Props> = ({ current, duration, onSeek }) => {
  const percent = duration ? (current / duration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration || !onSeek) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - bounds.left;
    const newTime = (clickX / bounds.width) * duration;
    onSeek(newTime);
  };

  return (
    <div
      className="flex items-center text-xs text-gray-600"
      aria-label="Progress bar"
      onClick={handleClick}
    >
      <span>{Math.floor(current)}s</span>
      <div className="flex-1 mx-2 h-2 bg-gray-300 rounded cursor-pointer relative">
        <div className="h-2 bg-primary rounded" style={{ width: `${percent}%` }} />
      </div>
      <span>{Math.floor(duration)}s</span>
    </div>
  );
};

export default ProgressBar;
