import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { GlobalAudioPlayer } from './components/GlobalAudioPlayer';
import { HomePage } from './pages/HomePage';
import { PodcastDetailPage } from './pages/PodcastDetailPage';
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import { CategoryPage } from './pages/CategoryPage';
import { PlayerProvider } from './context/PlayerContext';
import { LibraryProvider } from './context/index';

function App() {
  return (
    <PlayerProvider>
      <LibraryProvider>
        <Router>
          <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen">
            <Header />
            <main role="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/podcast/:id" element={<PodcastDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
              </Routes>
            </main>
            <GlobalAudioPlayer />
          </div>
        </Router>
      </LibraryProvider>
    </PlayerProvider>
  );
}

export default App;
