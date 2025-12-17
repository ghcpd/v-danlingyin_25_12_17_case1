import React from 'react'

interface Props {
  value: number
  onChange: (v: number) => void
}

export const VolumeControl: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="vol" className="sr-only">Volume</label>
      <input id="vol" type="range" min={0} max={1} step={0.01} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}

export default VolumeControl
