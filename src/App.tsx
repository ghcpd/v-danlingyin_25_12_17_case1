import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'

const HomePage = lazy(() => import('./pages/HomePage'))
const PodcastDetailPage = lazy(() => import('./pages/PodcastDetailPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const LibraryPage = lazy(() => import('./pages/LibraryPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))

const App: React.FC = () => {
  return (
    <div className="min-h-screen pb-32 bg-gray-50">
      <Header />
      <Suspense fallback={<div className="container py-6">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/podcast/:id" element={<PodcastDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="*" element={<div className="container py-6">Not found</div>} />
        </Routes>
      </Suspense>

      <GlobalAudioPlayer />
    </div>
  )
}

export default App
