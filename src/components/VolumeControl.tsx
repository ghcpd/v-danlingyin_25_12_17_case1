import React from 'react';

interface Props {
  volume: number;
  onChange: (vol: number) => void;
}

const VolumeControl: React.FC<Props> = ({ volume, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <label className="flex items-center text-xs text-gray-600" aria-label="Volume control">
      <span className="mr-1">Vol</span>
      <input
        id="volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleChange}
        className="w-32"
      />
    </label>
  );
};

export default VolumeControl;
