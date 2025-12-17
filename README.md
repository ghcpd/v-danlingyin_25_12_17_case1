# Podcast App (Prototype)

A modern podcast listening prototype built with React + TypeScript + Tailwind + Vite.

## Tech stack
- React 18
- TypeScript (strict)
- Tailwind CSS
- Vite
- pnpm

## Setup
1. Install dependencies: `pnpm install`
2. Start dev server: `pnpm dev`
3. Build: `pnpm build`

## Project Structure
- `src/components` - Reusable UI components
- `src/pages` - Page views
- `src/context` - React Context providers for player and library
- `src/data/mockPodcasts.ts` - Mock data (12 podcasts, 5-10 episodes each)
- `validate_project.js` - Basic validation script
- `test_runner.js` - Runs validation and build

## Features Implemented
- Homepage with featured hero, trending, categories, recently added
- Podcast detail page with episodes list and subscribe
- Global audio player (play/pause/seek)
- Search page with client-side filtering and category filters
- Library (subscriptions, favorites, history) saved to localStorage
- Responsive layout and accessible attributes

## Validation
Run `pnpm run validate` or `node validate_project.js` to generate `logs/validation_report.json`.

## Known limitations
- Playback features are basic (no playlist controls, no speed control)
- Accessibility improvements possible (more ARIA live regions, keyboard shortcuts)
- Unit tests not included in this prototype
