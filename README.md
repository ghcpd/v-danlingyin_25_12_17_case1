# Podcast Listening App (Mini)

A production-like React + TypeScript + Tailwind single-page app that demonstrates a podcast listening experience. Built for the bug bash assignment.

Tech stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- pnpm (recommended)

Getting started
1. pnpm install
2. pnpm dev
3. Open http://localhost:5173

Build
- pnpm build

Validation
- node validate_project.js
- ./run_validation.sh (mac/Linux)
- run_validation.bat (Windows)
- node test_runner.js

Project structure
- src/components - reusable UI components
- src/pages - page views & routes
- src/context - React Context providers (Player, Library)
- src/data - mock podcasts & episodes
- validate_project.js - validation script that writes validation_checklist.json

Features implemented
- Homepage (featured, trending, categories, recently added)
- Podcast detail page with episodes and sorting
- Search page with debounce and filters
- Library (subscriptions, favorites, history) stored in localStorage
- Global audio player with play/pause, seek, volume, prev/next
- Responsive design (mobile/tablet/desktop)
- Accessibility basics (aria labels, roles, focus styles)

Known limitations
- No backend (mock data only)
- Playback uses a shared audio sample for all episodes
- Some advanced accessibility & performance features are intentionally minimal (no virtualization)

If you want me to expand tests, add more polish or wire a backend, tell me which area to prioritize.
