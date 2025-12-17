import React from 'react';

const ProgressBar: React.FC<{ value: number; max: number; onSeek?: (t: number) => void }> = ({ value, max, onSeek }) => {
  const percent = max > 0 ? (value / max) * 100 : 0;
  return (
    <div
      className="h-2 bg-gray-200 rounded cursor-pointer" 
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      onClick={(e) => {
        if (!onSeek) return;
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const t = (x / rect.width) * max;
        onSeek(Math.max(0, Math.min(max, t)));
      }}
    >
      <div className="h-2 bg-primary rounded" style={{ width: `${percent}%` }} />
    </div>
  );
};

export default ProgressBar;
