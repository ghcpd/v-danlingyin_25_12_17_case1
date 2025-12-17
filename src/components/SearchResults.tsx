import React from 'react'
import type { Podcast } from '../types'
import PodcastList from './PodcastList'

interface Props {
  results: Podcast[]
}

export const SearchResults: React.FC<Props> = ({ results }) => {
  if (!results.length) return <div className="p-6 bg-white rounded-md shadow text-center">No results found</div>
  return <PodcastList items={results} />
}

export default SearchResults
