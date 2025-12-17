import React from 'react'

interface Props {
  value: number
  onChange: (v: number) => void
}

export const VolumeControl: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M11 5L6 9H3v6h3l5 4V5z" fill="#334155" />
      </svg>
      <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}

export default VolumeControl
