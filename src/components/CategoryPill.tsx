import React from 'react'

interface Props {
  name: string
  active?: boolean
  onClick?: () => void
}

export const CategoryPill: React.FC<Props> = ({ name, active, onClick }) => {
  return (
    <button onClick={onClick} aria-pressed={active} className={`px-3 py-1 rounded-full text-sm border ${active ? 'bg-accent text-white border-accent' : 'bg-white text-gray-700 border-gray-200'} focus:outline-none`}>{name}</button>
  )
}

export default CategoryPill
