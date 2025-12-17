import React from 'react'
import type { Podcast } from '../types'
import { Link } from 'react-router-dom'

interface Props {
  featured: Podcast
}

export const Hero: React.FC<Props> = ({ featured }) => {
  return (
    <section className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img src={featured.coverImage} alt="featured" className="w-40 h-40 rounded-md object-cover shadow" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Featured: {featured.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{featured.description}</p>
          <div className="mt-4 flex gap-3">
            <Link to={`/podcast/${featured.id}`} className="px-4 py-2 bg-accent text-white rounded-md">Listen</Link>
            <button className="px-4 py-2 border rounded-md text-sm">View details</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
