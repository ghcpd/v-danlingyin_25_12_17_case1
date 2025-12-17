import React from 'react'
import type { Podcast } from '../types'
import PodcastList from './PodcastList'

export const SearchResults: React.FC<{ results: Podcast[] }> = ({ results }) => {
  if (results.length === 0) return <div className="p-4">No results</div>
  return <PodcastList podcasts={results} />
}

export default SearchResults
