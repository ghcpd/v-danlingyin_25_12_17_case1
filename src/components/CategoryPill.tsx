import React from 'react'

interface Props {
  label: string
  active?: boolean
  onClick?: () => void
}

export const CategoryPill: React.FC<Props> = ({ label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full border ${active ? 'bg-primary text-white' : 'bg-white'} text-sm`}
    aria-pressed={active}
  >
    {label}
  </button>
)

export default CategoryPill
