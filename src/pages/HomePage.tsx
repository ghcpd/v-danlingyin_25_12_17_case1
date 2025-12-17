import React, { useMemo, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import PodcastList from '../components/PodcastList'
import CategoryPill from '../components/CategoryPill'
import { podcasts } from '../data/mockPodcasts'
import { Category } from '../types'

export const HomePage: React.FC = () => {
  const [filter, setFilter] = useState<Category | undefined>(undefined)
  const featured = podcasts[0]
  const trending = podcasts.slice(0, 6)
  const recently = podcasts.slice().sort((a, b) => b.subscribers - a.subscribers).slice(0, 6)

  const categories = Object.values(Category)
  const filtered = useMemo(() => (filter ? podcasts.filter((p) => p.category.includes(filter)) : podcasts), [filter])

  return (
    <main role="main">
      <Header />
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <Hero featured={featured} />
        <section>
          <h3 className="font-semibold mb-3">Trending Now</h3>
          <PodcastList podcasts={trending} columns={3} />
        </section>
        <section>
          <h3 className="font-semibold mb-3">Categories</h3>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <CategoryPill key={c} label={c} active={filter === c} onClick={() => setFilter((s) => (s === c ? undefined : c))} />
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-semibold mb-3">Recently Added</h3>
          <PodcastList podcasts={recently} columns={3} />
        </section>
      </div>
    </main>
  )
}

export default HomePage
