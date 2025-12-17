const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  'package.json',
  'tsconfig.json',
  'tailwind.config.js',
  'vite.config.ts',
  'index.html',
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/PodcastCard.tsx',
  'src/components/CategoryPill.tsx',
  'src/components/PodcastList.tsx',
  'src/components/EpisodeItem.tsx',
  'src/components/PlayButton.tsx',
  'src/components/GlobalAudioPlayer.tsx',
  'src/components/ProgressBar.tsx',
  'src/components/VolumeControl.tsx',
  'src/components/SearchBar.tsx',
  'src/components/FilterPanel.tsx',
  'src/components/PodcastHeader.tsx',
  'src/components/SubscribeButton.tsx',
  'src/components/EmptyState.tsx',
  'src/components/LibraryTabs.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/PodcastDetailPage.tsx',
  'src/pages/SearchPage.tsx',
  'src/pages/LibraryPage.tsx',
  'src/pages/CategoryPage.tsx',
  'src/context/PlayerContext.tsx',
  'src/context/LibraryContext.tsx',
  'src/hooks/useDebounce.ts',
  'src/hooks/useLocalStorage.ts',
  'src/hooks/useAudioPlayer.ts',
  'src/data/mockPodcasts.ts',
  'src/types/index.ts',
  'src/utils/formatDuration.ts',
  'src/utils/formatDate.ts'
];

const report = {
  missingFiles: [],
  dependenciesIncomplete: false,
  tsStrict: false,
  anyFound: false,
  ariaFound: 0,
  hasTypeScriptErrors: false,
};

function checkFiles() {
  REQUIRED_FILES.forEach((file) => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) report.missingFiles.push(file);
  });
}

function checkDependencies() {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
    const required = ['react', 'react-dom', 'react-router-dom', 'typescript', 'tailwindcss', '@heroicons/react'];
    for (const d of required) {
      if (!deps[d]) {
        report.dependenciesIncomplete = true;
        return;
      }
    }
  } catch (e) {
    report.dependenciesIncomplete = true;
  }
}

function checkTsStrict() {
  try {
    const ts = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    if (ts.compilerOptions && ts.compilerOptions.strict) report.tsStrict = true;
  } catch (e) {}
}

function scanSourceForAny() {
  const srcFiles = fs.readdirSync('src', { withFileTypes: true });
  function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(entry.name)) {
        const content = fs.readFileSync(p, 'utf8');
        if (/\bany\b/.test(content)) report.anyFound = true;
        if (/\baria-/.test(content)) report.ariaFound++;
      }
    });
  }
  walk('src');
}

function checkTypeScriptErrors() {
  try {
    // try to run tsc --noEmit to catch errors
    const { execSync } = require('child_process');
    execSync('npx tsc --noEmit', { stdio: 'ignore' });
  } catch (e) {
    report.hasTypeScriptErrors = true;
  }
}

checkFiles();
checkDependencies();
checkTsStrict();
scanSourceForAny();
checkTypeScriptErrors();

const result = {
  filesMissing: report.missingFiles,
  dependenciesComplete: !report.dependenciesIncomplete,
  typescriptStrict: report.tsStrict,
  anyFound: report.anyFound,
  ariaAttributesCount: report.ariaFound,
  hasTypeScriptErrors: report.hasTypeScriptErrors
};

console.log(JSON.stringify(result, null, 2));

if (!report.dependenciesIncomplete && report.missingFiles.length === 0 && report.tsStrict && !report.anyFound && !report.hasTypeScriptErrors) {
  process.exit(0);
} else {
  process.exit(1);
}
