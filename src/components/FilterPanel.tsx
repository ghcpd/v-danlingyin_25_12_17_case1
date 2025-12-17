import React from 'react'
import { Category } from '../types'

interface Props {
  category?: string
  onCategoryChange?: (c?: string) => void
}

export const FilterPanel: React.FC<Props> = ({ category, onCategoryChange }) => {
  return (
    <aside className="p-2 border rounded">
      <div className="mb-2 font-medium">Categories</div>
      <div className="flex flex-wrap gap-2">
        {Object.values(Category).map((c) => (
          <button key={c} onClick={() => onCategoryChange?.(c)} className={`px-2 py-1 rounded ${category === c ? 'bg-primary text-white' : 'bg-white'}`}>
            {c}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default FilterPanel
