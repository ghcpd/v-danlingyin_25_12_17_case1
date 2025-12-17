import React from 'react'
import Header from '../components/Header'
import LibraryTabs from '../components/LibraryTabs'

export const LibraryPage: React.FC = () => {
  return (
    <main>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">My Library</h2>
        <LibraryTabs />
      </div>
    </main>
  )
}

export default LibraryPage
