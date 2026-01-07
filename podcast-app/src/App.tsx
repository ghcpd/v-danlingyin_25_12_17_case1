import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { GlobalAudioPlayer } from './components/GlobalAudioPlayer';
import { HomePage } from './pages/HomePage';
import { PodcastDetailPage } from './pages/PodcastDetailPage';
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import { CategoryPage } from './pages/CategoryPage';

function App() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(true);
    navigate('/search');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchClick={handleSearchClick} />

      <main className="pb-24"> {/* Add padding for fixed player */}
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
  );
}

export default App;