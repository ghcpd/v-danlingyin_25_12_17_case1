import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'
import HomePage from './pages/HomePage'
import PodcastDetailPage from './pages/PodcastDetailPage'
import SearchPage from './pages/SearchPage'
import LibraryPage from './pages/LibraryPage'
import CategoryPage from './pages/CategoryPage'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen pb-28">{/* reserve space for player */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/podcast/:id" element={<PodcastDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Routes>
        <GlobalAudioPlayer />
      </Suspense>
    </div>
  )
}

export default App
