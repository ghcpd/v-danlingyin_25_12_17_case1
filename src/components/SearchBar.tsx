import React from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">Search</label>
      <input id="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search podcasts, episodes..." className="w-full border rounded p-2" />
    </div>
  )
}

export default SearchBar
