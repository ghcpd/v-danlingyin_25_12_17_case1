import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { podcasts, episodes } from '../data/mockPodcasts'
import SubscribeButton from '../components/SubscribeButton'
import EpisodeItem from '../components/EpisodeItem'

export const PodcastDetailPage: React.FC = () => {
  const { id } = useParams()
  const podcast = podcasts.find((p) => p.id === id)
  const [sort, setSort] = useState<'new' | 'old' | 'popular'>('new')
  const list = useMemo(() => episodes.filter((e) => e.podcastId === id), [id])
  const sorted = useMemo(() => {
    return [...list].sort((a, b) => {
      if (sort === 'new') return +new Date(b.releaseDate) - +new Date(a.releaseDate)
      if (sort === 'old') return +new Date(a.releaseDate) - +new Date(b.releaseDate)
      return b.duration - a.duration
    })
  }, [list, sort])

  if (!podcast) return <main className="container py-6">Podcast not found</main>

  return (
    <main role="main" className="container py-6">
      <div className="bg-white p-6 rounded-md shadow mb-6 flex gap-6 items-start">
        <img src={podcast.coverImage} alt="cover" className="w-36 h-36 object-cover rounded-md" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{podcast.title}</h1>
          <div className="text-sm text-gray-500">{podcast.author}</div>
          <div className="mt-3 flex items-center gap-3">
            <SubscribeButton podcastId={podcast.id} />
            <div className="text-sm text-gray-500">{podcast.episodeCount} episodes</div>
            <div className="text-sm text-gray-500">{podcast.subscribers.toLocaleString()} subscribers</div>
            <div className="text-sm text-gray-500">★ {podcast.rating}</div>
          </div>
          <div className="mt-4 text-gray-700">{podcast.description}</div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Episodes</h3>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Sort</label>
            <select aria-label="Sort episodes" value={sort} onChange={(e) => setSort(e.target.value as any)} className="text-sm">
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
              <option value="popular">By duration</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          {sorted.map((ep) => (
            <EpisodeItem key={ep.id} episode={ep} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default PodcastDetailPage
