import React from 'react'

export const PlayButton: React.FC<{ playing?: boolean; onClick?: () => void }> = ({ playing, onClick }) => (
  <button aria-label={playing ? 'Pause' : 'Play'} onClick={onClick} className="px-3 py-1 rounded bg-primary text-white">
    {playing ? 'Pause' : 'Play'}
  </button>
)

export default PlayButton
