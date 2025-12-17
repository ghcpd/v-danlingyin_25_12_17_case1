#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = __dirname;
const srcDir = path.join(projectRoot, 'src');
const logsDir = path.join(projectRoot, 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

interface ValidationResult {
  timestamp: string;
  passed: number;
  failed: number;
  score: number;
  checks: Record<string, boolean>;
  errors: string[];
  warnings: string[];
}

const result: ValidationResult = {
  timestamp: new Date().toISOString(),
  passed: 0,
  failed: 0,
  score: 0,
  checks: {},
  errors: [],
  warnings: [],
};

const log = (message: string) => {
  console.log(message);
};

const checkFile = (filePath: string, name: string): boolean => {
  const exists = fs.existsSync(filePath);
  result.checks[name] = exists;
  if (exists) {
    result.passed++;
  } else {
    result.failed++;
    result.errors.push(`Missing file: ${name} at ${filePath}`);
  }
  return exists;
};

const checkDirectory = (dirPath: string, name: string): boolean => {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  result.checks[name] = exists;
  if (exists) {
    result.passed++;
  } else {
    result.failed++;
    result.errors.push(`Missing directory: ${name} at ${dirPath}`);
  }
  return exists;
};

log('🔍 Podcast App Validation Script\n');

// Check configuration files
log('📋 Checking configuration files...');
checkFile(path.join(projectRoot, 'package.json'), 'package.json');
checkFile(path.join(projectRoot, 'tsconfig.json'), 'tsconfig.json');
checkFile(path.join(projectRoot, 'tailwind.config.js'), 'tailwind.config.js');
checkFile(path.join(projectRoot, 'vite.config.ts'), 'vite.config.ts');
checkFile(path.join(projectRoot, 'index.html'), 'index.html');

// Check folder structure
log('\n📁 Checking folder structure...');
checkDirectory(path.join(srcDir, 'components'), 'src/components');
checkDirectory(path.join(srcDir, 'pages'), 'src/pages');
checkDirectory(path.join(srcDir, 'hooks'), 'src/hooks');
checkDirectory(path.join(srcDir, 'context'), 'src/context');
checkDirectory(path.join(srcDir, 'types'), 'src/types');
checkDirectory(path.join(srcDir, 'utils'), 'src/utils');
checkDirectory(path.join(srcDir, 'data'), 'src/data');

// Check component files
log('\n🧩 Checking components...');
const components = [
  'Header.tsx',
  'Hero.tsx',
  'PodcastCard.tsx',
  'PodcastList.tsx',
  'EpisodeItem.tsx',
  'GlobalAudioPlayer.tsx',
  'ProgressBar.tsx',
  'VolumeControl.tsx',
  'CategoryPill.tsx',
  'SearchBar.tsx',
  'FilterPanel.tsx',
  'EmptyState.tsx',
  'PodcastHeader.tsx',
];

components.forEach((comp) => {
  checkFile(path.join(srcDir, 'components', comp), `components/${comp}`);
});

// Check page files
log('\n📄 Checking pages...');
const pages = ['HomePage.tsx', 'PodcastDetailPage.tsx', 'SearchPage.tsx', 'LibraryPage.tsx', 'CategoryPage.tsx'];
pages.forEach((page) => {
  checkFile(path.join(srcDir, 'pages', page), `pages/${page}`);
});

// Check source files
log('\n📝 Checking source files...');
checkFile(path.join(srcDir, 'App.tsx'), 'App.tsx');
checkFile(path.join(srcDir, 'main.tsx'), 'main.tsx');
checkFile(path.join(srcDir, 'index.css'), 'index.css');
checkFile(path.join(srcDir, 'types', 'index.ts'), 'types/index.ts');
checkFile(path.join(srcDir, 'hooks', 'index.ts'), 'hooks/index.ts');
checkFile(path.join(srcDir, 'context', 'PlayerContext.tsx'), 'context/PlayerContext.tsx');
checkFile(path.join(srcDir, 'context', 'index.tsx'), 'context/index.tsx');
checkFile(path.join(srcDir, 'utils', 'formatters.ts'), 'utils/formatters.ts');
checkFile(path.join(srcDir, 'data', 'mockPodcasts.ts'), 'data/mockPodcasts.ts');

// Check TypeScript compilation
log('\n✅ Checking TypeScript compilation...');
try {
  execSync('tsc --noEmit', { cwd: projectRoot, stdio: 'pipe' });
  result.checks['typescript_compilation'] = true;
  result.passed++;
  log('   ✓ TypeScript compiles without errors');
} catch (error) {
  result.checks['typescript_compilation'] = false;
  result.failed++;
  result.errors.push('TypeScript compilation failed');
}

// Calculate score
result.score = Math.round((result.passed / (result.passed + result.failed)) * 100);

// Print results
log('\n📊 Validation Results:');
log(`   Passed: ${result.passed}`);
log(`   Failed: ${result.failed}`);
log(`   Score: ${result.score}%`);

if (result.errors.length > 0) {
  log('\n❌ Errors:');
  result.errors.forEach((err) => log(`   - ${err}`));
}

if (result.warnings.length > 0) {
  log('\n⚠️  Warnings:');
  result.warnings.forEach((warn) => log(`   - ${warn}`));
}

// Save validation report
const reportPath = path.join(logsDir, `validation_${Date.now()}.json`);
fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
log(`\n📝 Validation report saved to: ${reportPath}`);

// Exit with appropriate code
process.exit(result.score >= 80 ? 0 : 1);
