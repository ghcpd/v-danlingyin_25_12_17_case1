import React from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm">
      <input aria-label="Search podcasts" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search podcasts, hosts, topics..." className="flex-1 px-2 py-2 text-sm outline-none" />
      <div className="text-sm text-gray-400">⌕</div>
    </div>
  )
}

export default SearchBar
