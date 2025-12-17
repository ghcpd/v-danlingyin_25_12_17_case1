import React from 'react'
import type { Podcast } from '../types'

export const Hero: React.FC<{ featured: Podcast }> = ({ featured }) => {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/5 p-6 rounded">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-center">
        <img src={featured.coverImage} alt="Featured" className="w-40 h-40 rounded-md object-cover" />
        <div>
          <h2 className="text-2xl font-bold">{featured.title}</h2>
          <p className="text-sm text-gray-600">by {featured.author}</p>
          <p className="mt-2 text-gray-700">{featured.description}</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
