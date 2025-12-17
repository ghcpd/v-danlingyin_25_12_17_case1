import React from 'react'
import { useParams } from 'react-router-dom'
import { podcasts } from '../data/mockPodcasts'
import PodcastList from '../components/PodcastList'

export const CategoryPage: React.FC = () => {
  const { name } = useParams()
  const items = podcasts.filter((p) => p.category.includes(name as any))
  if (!items.length) return <main className="container py-6">No podcasts found in {name}</main>
  return (
    <main role="main" className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Category: {name}</h1>
      <PodcastList items={items} />
    </main>
  )
}

export default CategoryPage
