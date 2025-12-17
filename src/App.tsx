import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import { LibraryProvider } from './context/LibraryContext';
import { PlayerProvider } from './context/PlayerContext';

// Lazy load page components for route-based code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const PodcastDetailPage = lazy(() => import('./pages/PodcastDetailPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

const App: React.FC = () => (
  <LibraryProvider>
    <PlayerProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto p-4">
            <Suspense fallback={<div className="p-4">Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/podcast/:id" element={<PodcastDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
              </Routes>
            </Suspense>
          </main>
          <GlobalAudioPlayer />
        </div>
      </Router>
    </PlayerProvider>
  </LibraryProvider>
);

export default App;

