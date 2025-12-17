import React, { useMemo, useState } from 'react'
import { podcasts, episodes } from '../data/mockPodcasts'
import Hero from '../components/Hero'
import PodcastList from '../components/PodcastList'
import CategoryPill from '../components/CategoryPill'
import { Category } from '../types'

export const HomePage: React.FC = () => {
  const featured = podcasts[0]
  const trending = podcasts.slice(0, 8)
  const recently = useMemo(() => episodes.slice(0, 8), [])
  const [selected, setSelected] = useState<string | null>(null)
  const cats = Object.values(Category)
  const filtered = selected ? podcasts.filter((p) => p.category.includes(selected as Category)) : podcasts

  return (
    <main role="main" className="container py-6">
      <Hero featured={featured} />

      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Trending Now</h3>
          <div className="text-sm text-gray-500">Updated hourly</div>
        </div>
        <PodcastList items={trending} columns={4} />
      </section>

      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="text-sm text-gray-500">Filter by topic</div>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          <CategoryPill name="All" active={selected === null} onClick={() => setSelected(null)} />
          {cats.map((c) => (
            <CategoryPill key={c} name={c} active={selected === c} onClick={() => setSelected(c)} />
          ))}
        </div>
        <div>
          <PodcastList items={filtered} columns={3} />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Recently Added</h3>
          <div className="text-sm text-gray-500">Latest episodes</div>
        </div>
        <div className="grid gap-3">
          {recently.map((e) => (
            <div key={e.id} className="bg-white p-3 rounded shadow">{e.title} — {e.podcastId}</div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
