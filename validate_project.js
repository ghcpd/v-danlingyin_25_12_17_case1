const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();
const report = { checks: [], summary: { passed: 0, failed: 0 } };

function checkFile(p) {
  const exists = fs.existsSync(path.join(root, p));
  report.checks.push({ check: `exists:${p}`, ok: exists });
  if (!exists) report.summary.failed++;
  else report.summary.passed++;
  return exists;
}

function safeJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
  } catch (e) {
    return null;
  }
}

// Basic existence checks
checkFile('package.json');
checkFile('tsconfig.json');
checkFile('tailwind.config.js');
checkFile('vite.config.ts');
checkFile('index.html');
checkFile('src/App.tsx');
checkFile('src/main.tsx');
checkFile('src/data/mockPodcasts.ts');
checkFile('src/components/GlobalAudioPlayer.tsx');
checkFile('src/pages/HomePage.tsx');

// package.json deps
const pkg = safeJSON('package.json');
if (pkg) {
  const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
  const want = ['react', 'react-dom', 'vite', 'tailwindcss'];
  want.forEach((w) => {
    const ok = !!deps[w];
    report.checks.push({ check: `dependency:${w}`, ok });
    if (!ok) report.summary.failed++;
    else report.summary.passed++;
  });
}

// tsconfig strict
const ts = safeJSON('tsconfig.json');
if (ts) {
  const strict = !!(ts.compilerOptions && ts.compilerOptions.strict);
  report.checks.push({ check: 'tsconfig.strict', ok: strict });
  strict ? report.summary.passed++ : report.summary.failed++;
}

// Simple scan for tailwind usage
const files = fs.readdirSync(path.join(root, 'src'));
let tailwindFound = false;
files.forEach((f) => {
  const full = path.join(root, 'src', f);
  if (fs.statSync(full).isFile()) {
    const c = fs.readFileSync(full, 'utf8');
    if (c.includes('className')) tailwindFound = true;
  }
});
report.checks.push({ check: 'tailwindUsage', ok: tailwindFound });
tailwindFound ? report.summary.passed++ : report.summary.failed++;

// Try TypeScript type-check (if tsc available)
try {
  execSync('npx tsc --noEmit', { stdio: 'ignore' });
  report.checks.push({ check: 'typescriptCompile', ok: true });
  report.summary.passed++;
} catch (e) {
  report.checks.push({ check: 'typescriptCompile', ok: false, error: String(e) });
  report.summary.failed++;
}

// Save report
if (!fs.existsSync('logs')) fs.mkdirSync('logs');
fs.writeFileSync('logs/validation_report.json', JSON.stringify(report, null, 2));
console.log('Validation finished. Report written to logs/validation_report.json');
process.exit(report.summary.failed > 0 ? 1 : 0);
