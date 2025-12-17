# Podcast Listening Website

A modern, responsive podcast listening platform built with **React 18**, **TypeScript**, **Tailwind CSS**, **Vite** and **pnpm**.

## Features
- Discover and browse podcasts (home page)
- Podcast detail page with episode list and play controls
- Global audio player (fixed at bottom)
- Search page with client-side filtering and debouncing
- User library (subscriptions, favorites, listening history) persisted in `localStorage`
- Responsive layouts (mobile, tablet, desktop)
- Accessibility: keyboard navigation, ARIA labels, focus states

## Technical stack
- **Frontend**: React 18 + TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State**: React Context (Player + Library)
- **Package manager**: pnpm
- **Build**: Vite

## Project Setup
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build project
pnpm build

# Run validation / tests
pnpm test
```

## Folder structure (summary)
```
podcast-app/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ components/       # Reusable UI components
│  ├─ pages/            # Page components
│  ├─ hooks/            # Custom React hooks
│  ├─ context/          # Context providers (Player + Library)
│  ├─ data/             # Mock data
│  ├─ types/            # TypeScript types
│  ├─ utils/            # Utilities (formatDate, formatDuration)
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css         # Tailwind directives
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.js
├─ validate_project.js # validation script
├─ test_runner.js      # test runner that runs validation + build
├─ run_validation.bat / run_validation.sh  # scripts to run checks
└─ README.md
```

## Notes & Limitations
- Uses mock data (`src/data/mockPodcasts.ts`) with placeholder images from picsum.photos and audio from public samples.
- Audio player currently has no playlist/no next/prev queue, but the context has placeholders for future implementation.

# Setup & Run
1. `pnpm install` to install dependencies
2. `pnpm dev` starts the dev server at `http://localhost:5173`
3. `pnpm build` builds production assets
4. `pnpm validate` runs the `validate_project.js` script
5. `pnpm test` runs the `test_runner.js` script (validation + tsc + build)
