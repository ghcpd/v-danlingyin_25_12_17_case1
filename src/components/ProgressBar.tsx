import React from 'react'

interface Props {
  progress: number
  duration: number
  onSeek: (t: number) => void
}

export const ProgressBar: React.FC<Props> = ({ progress, duration, onSeek }) => {
  const pct = duration > 0 ? Math.min(1, progress / duration) : 0
  return (
    <div className="w-full h-2 bg-gray-200 rounded cursor-pointer" onClick={(e) => {
      const el = e.currentTarget as HTMLDivElement
      const rect = el.getBoundingClientRect()
      const x = (e as React.MouseEvent).clientX - rect.left
      const t = (x / rect.width) * duration
      onSeek(t)
    }} aria-label="Seek bar">
      <div style={{ width: `${pct * 100}%` }} className="h-2 bg-primary rounded" />
    </div>
  )
}

export default ProgressBar
