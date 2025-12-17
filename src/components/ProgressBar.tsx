import React, { useRef } from 'react'

interface Props {
  progress: number // 0..1
  onSeek?: (p: number) => void
}

export const ProgressBar: React.FC<Props> = ({ progress, onSeek }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  function handleClick(e: React.MouseEvent) {
    if (!ref.current || !onSeek) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const p = Math.max(0, Math.min(1, x / rect.width))
    onSeek(p)
  }
  return (
    <div ref={ref} onClick={handleClick} className="h-2 bg-gray-200 rounded-full cursor-pointer w-full" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
      <div style={{ width: `${progress * 100}%` }} className="h-2 bg-accent rounded-full" />
    </div>
  )
}

export default ProgressBar
