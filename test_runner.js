const fs = require('fs');
const { execSync } = require('child_process');

const logFile = 'logs/validation_run.log';
const writeLog = (msg) => {
  fs.appendFileSync(logFile, msg + '\n');
  console.log(msg);
};

try {
  writeLog('=== Running validation script ===');
  execSync('node validate_project.js', { stdio: 'inherit' });
  writeLog('Validation script passed.');
} catch (e) {
  writeLog('Validation script failed.');
  process.exit(1);
}

try {
  writeLog('=== Running TypeScript compilation ===');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  writeLog('TypeScript compilation passed.');
} catch (e) {
  writeLog('TypeScript compilation failed.');
  process.exit(1);
}

try {
  writeLog('=== Running pnpm build ===');
  execSync('pnpm build', { stdio: 'inherit' });
  writeLog('pnpm build passed.');
} catch (e) {
  writeLog('pnpm build failed.');
  process.exit(1);
}

writeLog('All checks passed.');
process.exit(0);
