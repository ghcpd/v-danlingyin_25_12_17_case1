import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import PodcastList from '../components/PodcastList'
import { podcasts } from '../data/mockPodcasts'
import { Category } from '../types'

export const CategoryPage: React.FC = () => {
  const { name } = useParams()
  const filtered = podcasts.filter((p) => name ? p.category.includes(name as Category) : false)
  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <PodcastList podcasts={filtered} columns={3} />
      </div>
    </main>
  )
}

export default CategoryPage
