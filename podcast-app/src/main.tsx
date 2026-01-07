import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext'
import { LibraryProvider } from './context/LibraryContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <LibraryProvider>
          <App />
        </LibraryProvider>
      </PlayerProvider>
    </BrowserRouter>
  </React.StrictMode>,
)