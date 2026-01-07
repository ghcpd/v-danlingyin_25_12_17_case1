import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = __dirname;

function checkFileExists(filePath) {
  return fs.existsSync(path.join(projectRoot, filePath));
}

function checkPackageJson() {
  if (!checkFileExists('package.json')) return false;

  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

  const requiredDeps = [
    'react', 'react-dom', 'react-router-dom', 'lucide-react'
  ];

  const requiredDevDeps = [
    '@types/react', '@types/react-dom', 'typescript', 'tailwindcss', 'vite'
  ];

  const hasAllDeps = requiredDeps.every(dep => packageJson.dependencies && packageJson.dependencies[dep]);
  const hasAllDevDeps = requiredDevDeps.every(dep => packageJson.devDependencies && packageJson.devDependencies[dep]);

  return hasAllDeps && hasAllDevDeps;
}

function checkTypeScriptFiles() {
  const tsFiles = [
    'src/types/index.ts',
    'src/components/Header.tsx',
    'src/components/PodcastCard.tsx',
    'src/pages/HomePage.tsx',
    'src/App.tsx',
    'src/main.tsx'
  ];

  return tsFiles.every(file => checkFileExists(file));
}

function checkTailwindUsage() {
  const files = [
    'src/index.css',
    'tailwind.config.js'
  ];

  return files.every(file => checkFileExists(file));
}

function checkAccessibility() {
  // Simple check for aria-labels in components
  const componentFiles = fs.readdirSync(path.join(projectRoot, 'src/components'))
    .filter(file => file.endsWith('.tsx'));

  let hasAriaLabels = 0;
  componentFiles.forEach(file => {
    const content = fs.readFileSync(path.join(projectRoot, 'src/components', file), 'utf8');
    if (content.includes('aria-label') || content.includes('role=')) {
      hasAriaLabels++;
    }
  });

  return hasAriaLabels > 0;
}

function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    checks: {
      packageJson: checkPackageJson(),
      tsconfig: checkFileExists('tsconfig.json'),
      viteConfig: checkFileExists('vite.config.ts'),
      tailwindConfig: checkFileExists('tailwind.config.js'),
      indexHtml: checkFileExists('index.html'),
      typeScriptFiles: checkTypeScriptFiles(),
      tailwindUsage: checkTailwindUsage(),
      accessibility: checkAccessibility(),
      folderStructure: {
        components: checkFileExists('src/components'),
        pages: checkFileExists('src/pages'),
        types: checkFileExists('src/types'),
        utils: checkFileExists('src/utils'),
        data: checkFileExists('src/data'),
        context: checkFileExists('src/context'),
      }
    },
    score: 0,
    status: 'PASS'
  };

  // Calculate score
  const totalChecks = Object.keys(report.checks).length + Object.keys(report.checks.folderStructure).length - 1;
  let passedChecks = 0;

  Object.values(report.checks).forEach(check => {
    if (typeof check === 'boolean' && check) passedChecks++;
    else if (typeof check === 'object') {
      passedChecks += Object.values(check).filter(Boolean).length;
    }
  });

  report.score = Math.round((passedChecks / totalChecks) * 100);

  if (report.score < 80) {
    report.status = 'FAIL';
  }

  return report;
}

function main() {
  console.log('🔍 Running project validation...\n');

  const report = generateReport();

  console.log(`📊 Validation Report`);
  console.log(`==================`);
  console.log(`Status: ${report.status}`);
  console.log(`Score: ${report.score}/100`);
  console.log(`Timestamp: ${report.timestamp}\n`);

  console.log('Detailed Checks:');
  Object.entries(report.checks).forEach(([key, value]) => {
    if (typeof value === 'object') {
      console.log(`  ${key}:`);
      Object.entries(value).forEach(([subKey, subValue]) => {
        console.log(`    ${subKey}: ${subValue ? '✅' : '❌'}`);
      });
    } else {
      console.log(`  ${key}: ${value ? '✅' : '❌'}`);
    }
  });

  // Write to logs
  const logsDir = path.join(projectRoot, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  fs.writeFileSync(
    path.join(logsDir, 'validation_run.log'),
    JSON.stringify(report, null, 2)
  );

  console.log(`\n📝 Report saved to logs/validation_run.log`);

  process.exit(report.status === 'PASS' ? 0 : 1);
}

if (require.main === module) {
  main();
}

export { generateReport };