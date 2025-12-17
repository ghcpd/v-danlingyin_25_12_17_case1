import React from 'react'
import { Category } from '../types'
import CategoryPill from './CategoryPill'

interface Props {
  selected: string | null
  onSelect: (c: string | null) => void
}

export const FilterPanel: React.FC<Props> = ({ selected, onSelect }) => {
  const cats = Object.values(Category)
  return (
    <div className="bg-white p-3 rounded-md shadow-sm">
      <div className="mb-2 text-sm font-medium">Categories</div>
      <div className="flex gap-2 flex-wrap">
        <CategoryPill name="All" active={selected === null} onClick={() => onSelect(null)} />
        {cats.map((c) => (
          <CategoryPill key={c} name={c} active={selected === c} onClick={() => onSelect(c)} />
        ))}
      </div>
    </div>
  )
}

export default FilterPanel
