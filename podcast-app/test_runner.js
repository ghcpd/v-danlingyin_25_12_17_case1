import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = __dirname;

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { cwd: projectRoot, stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully\n`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} failed\n`);
    console.error(error.message);
    return false;
  }
}

function runValidation() {
  console.log('🧪 Running comprehensive test suite...\n');

  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    overall: 'PASS'
  };

  // Test 1: Install dependencies
  const installSuccess = runCommand('pnpm install', 'Installing dependencies');
  results.tests.push({
    name: 'Dependency Installation',
    status: installSuccess ? 'PASS' : 'FAIL',
    command: 'pnpm install'
  });

  // Test 2: TypeScript compilation
  const tsSuccess = runCommand('pnpm build', 'TypeScript compilation and build');
  results.tests.push({
    name: 'TypeScript Build',
    status: tsSuccess ? 'PASS' : 'FAIL',
    command: 'pnpm build'
  });

  // Test 3: Validation script
  const validationSuccess = runCommand('node validate_project.js', 'Project validation');
  results.tests.push({
    name: 'Project Validation',
    status: validationSuccess ? 'PASS' : 'FAIL',
    command: 'node validate_project.js'
  });

  // Calculate overall result
  const failedTests = results.tests.filter(test => test.status === 'FAIL');
  if (failedTests.length > 0) {
    results.overall = 'FAIL';
  }

  // Write results
  const logsDir = path.join(projectRoot, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }

  fs.writeFileSync(
    path.join(logsDir, 'test_results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('📊 Test Results Summary');
  console.log('=======================');
  console.log(`Overall Status: ${results.overall}`);
  console.log(`Tests Run: ${results.tests.length}`);
  console.log(`Passed: ${results.tests.filter(t => t.status === 'PASS').length}`);
  console.log(`Failed: ${failedTests.length}`);

  if (failedTests.length > 0) {
    console.log('\nFailed Tests:');
    failedTests.forEach(test => {
      console.log(`  - ${test.name}`);
    });
  }

  console.log(`\n📝 Detailed results saved to logs/test_results.json`);

  return results.overall === 'PASS';
}

if (require.main === module) {
  const success = runValidation();
  process.exit(success ? 0 : 1);
}

export { runValidation };