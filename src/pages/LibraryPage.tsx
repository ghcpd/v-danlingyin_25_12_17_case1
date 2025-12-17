import React from 'react'
import LibraryTabs from '../components/LibraryTabs'

export const LibraryPage: React.FC = () => {
  return (
    <main role="main" className="container py-6">
      <h1 className="text-2xl font-bold mb-4">My Library</h1>
      <LibraryTabs />
    </main>
  )
}

export default LibraryPage
