import React, { useMemo, useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import SearchResults from '../components/SearchResults'
import { podcasts } from '../data/mockPodcasts'
import { useDebounce } from '../hooks/useDebounce'
import { Category } from '../types'

export const SearchPage: React.FC = () => {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<Category | undefined>(undefined)
  const debounced = useDebounce(q, 300)

  const results = useMemo(() => {
    const base = podcasts.filter((p) => (!category || p.category.includes(category)))
    if (!debounced) return base
    const term = debounced.toLowerCase()
    return base.filter((p) => p.title.toLowerCase().includes(term) || p.author.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))
  }, [debounced, category])

  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-4 gap-4">
        <aside className="md:col-span-1">
          <FilterPanel category={category} onCategoryChange={setCategory} />
        </aside>
        <section className="md:col-span-3">
          <SearchBar value={q} onChange={setQ} />
          <div className="mt-4">
            <SearchResults results={results} />
          </div>
        </section>
      </div>
    </main>
  )
}

export default SearchPage
