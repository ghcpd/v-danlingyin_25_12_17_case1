import React, { useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import SearchResults from '../components/SearchResults'
import useDebounce from '../hooks/useDebounce'
import { podcasts } from '../data/mockPodcasts'
import { Category } from '../types'

export const SearchPage: React.FC = () => {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const deb = useDebounce(q, 300)
  const [sort, setSort] = useState<'relevance' | 'rating' | 'recent'>('relevance')

  const results = useMemo(() => {
    let r = podcasts.filter((p) => p.title.toLowerCase().includes(deb.toLowerCase()) || p.description.toLowerCase().includes(deb.toLowerCase()) || p.author.toLowerCase().includes(deb.toLowerCase()))
    if (category) r = r.filter((p) => p.category.includes(category as Category))
    if (sort === 'rating') r = r.sort((a, b) => b.rating - a.rating)
    if (sort === 'recent') r = r.sort((a, b) => b.episodeCount - a.episodeCount)
    return r
  }, [deb, category, sort])

  return (
    <main role="main" className="container py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <div className="space-y-4">
          <FilterPanel selected={category} onSelect={setCategory} />
          <div className="bg-white p-3 rounded shadow">
            <div className="mb-2 text-sm font-medium">Sort</div>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="text-sm w-full">
              <option value="relevance">Relevance</option>
              <option value="rating">Rating</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>
      </div>
      <div className="md:col-span-3 space-y-4">
        <SearchBar value={q} onChange={setQ} />
        <SearchResults results={results} />
      </div>
    </main>
  )
}

export default SearchPage
