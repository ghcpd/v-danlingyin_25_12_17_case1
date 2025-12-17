import React from 'react'

interface Props {
  playing?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export const PlayButton: React.FC<Props> = ({ playing = false, onClick, ariaLabel = 'Play or pause' }) => {
  return (
    <button aria-label={ariaLabel} onClick={onClick} className="w-10 h-10 rounded-full bg-white border flex items-center justify-center shadow-sm">
      {playing ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="6" y="5" width="4" height="14" rx="1" fill="#0f172a" />
          <rect x="14" y="5" width="4" height="14" rx="1" fill="#0f172a" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 3v18l15-9L5 3z" fill="#0f172a" />
        </svg>
      )}
    </button>
  )
}

export default PlayButton
