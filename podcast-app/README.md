# Podcast Listening Website

A modern, responsive podcast listening platform built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Discover Podcasts**: Browse trending podcasts, categories, and recently added content
- **Podcast Details**: View detailed information, episodes, and subscribe to podcasts
- **Audio Player**: Global audio player with play/pause, seek, volume controls
- **Search & Filter**: Advanced search with category, duration, and rating filters
- **My Library**: Manage subscribed podcasts, favorites, and listening history
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React

## 📁 Project Structure

```
podcast-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PodcastCard.tsx
│   │   ├── EpisodeItem.tsx
│   │   ├── GlobalAudioPlayer.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── HomePage.tsx
│   │   ├── PodcastDetailPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── LibraryPage.tsx
│   │   └── CategoryPage.tsx
│   ├── hooks/          # Custom React hooks
│   │   ├── useAudioPlayer.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── context/        # React Context providers
│   │   ├── PlayerContext.tsx
│   │   └── LibraryContext.tsx
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── data/           # Mock data
│   │   └── mockPodcasts.ts
│   ├── utils/          # Utility functions
│   │   └── formatters.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── validation_checklist.json
├── feature_matrix.json
├── validate_project.js
├── run_validation.sh
├── run_validation.bat
├── test_runner.js
├── README.md
└── logs/               # Test results and logs
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd podcast-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 🧪 Testing & Validation

### Run Validation Tests

**On Linux/macOS:**
```bash
./run_validation.sh
```

**On Windows:**
```bash
run_validation.bat
```

### Run Full Test Suite

```bash
node test_runner.js
```

This will:
- Install dependencies
- Run TypeScript compilation
- Execute project validation
- Generate test reports in `logs/`

## 📊 Validation Files

- `validation_checklist.json` - Feature implementation checklist
- `feature_matrix.json` - Detailed feature mapping
- `validate_project.js` - Automated validation script
- `test_runner.js` - Comprehensive test runner
- `logs/` - Test results and validation reports

## 🎯 Key Features Implemented

### Core Pages
- **Homepage**: Hero section, trending podcasts, categories, recently added
- **Podcast Detail**: Episode list, subscribe functionality, podcast stats
- **Search**: Debounced search with advanced filters
- **Library**: Subscribed podcasts, favorites, listening history
- **Category**: Category-specific podcast listings

### Audio Player
- Global fixed player at bottom of screen
- Play/pause, seek, volume controls
- Episode queue management
- Responsive design (expands on larger screens)

### State Management
- Player state (current episode, playback status, volume)
- Library state (subscriptions, favorites, history)
- Persistent storage with localStorage

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly controls
- Optimized layouts for all screen sizes

### Accessibility
- ARIA labels and roles
- Keyboard navigation
- Focus management
- WCAG AA color contrast
- Semantic HTML

## 🔧 Configuration

### TypeScript
- Strict mode enabled
- No implicit any types
- Comprehensive type definitions

### Tailwind CSS
- Custom color palette
- Extended animations
- Responsive utilities
- Custom components

### Vite
- React plugin
- Optimized build configuration
- Fast development server

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6)
- Secondary: Gray (#64748b)
- Accent: Amber (#f59e0b)

### Typography
- Font Family: Inter
- Responsive text sizes
- Proper line heights

### Components
- Consistent spacing
- Hover and focus states
- Loading states
- Error handling

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

1. Build the project: `pnpm build`
2. Deploy the `dist` folder to your hosting provider
3. Configure routing for SPA (if needed)

## 📈 Performance

- Lazy loading for images
- Memoized components
- Optimized bundle size
- Fast initial load

## 🐛 Known Limitations

- Audio files are placeholder URLs
- No real backend integration
- Limited episode data
- No user authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run validation tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.