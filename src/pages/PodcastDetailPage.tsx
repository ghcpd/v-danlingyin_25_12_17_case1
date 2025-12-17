import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import PodcastHeader from '../components/PodcastHeader'
import EpisodeItem from '../components/EpisodeItem'
import { podcasts, episodes } from '../data/mockPodcasts'

export const PodcastDetailPage: React.FC = () => {
  const { id } = useParams()
  const podcast = podcasts.find((p) => p.id === id)
  if (!podcast) return <div>Not found</div>
  const eps = episodes.filter((e) => e.podcastId === podcast.id).sort((a, b) => b.episodeNumber - a.episodeNumber)

  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <PodcastHeader podcast={podcast} />
        <div className="border rounded p-4">
          <h3 className="font-semibold mb-3">About</h3>
          <p className="text-sm text-gray-700">{podcast.description}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Episodes</h3>
          <div className="space-y-2">
            {eps.map((e) => (
              <EpisodeItem key={e.id} episode={e} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default PodcastDetailPage
