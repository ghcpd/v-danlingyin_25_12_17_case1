#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = __dirname;
const logsDir = path.join(projectRoot, 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

interface TestResult {
  test_name: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  duration: number;
  output?: string;
  error?: string;
}

interface TestReport {
  timestamp: string;
  total_tests: number;
  passed: number;
  failed: number;
  warnings: number;
  overall_score: number;
  tests: TestResult[];
  summary: string;
}

const report: TestReport = {
  timestamp: new Date().toISOString(),
  total_tests: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  overall_score: 0,
  tests: [],
  summary: '',
};

const runTest = (name: string, command: string, cwd: string = projectRoot): TestResult => {
  console.log(`\n🧪 Running: ${name}...`);
  const startTime = Date.now();

  try {
    const output = execSync(command, { cwd, encoding: 'utf-8' });
    const duration = Date.now() - startTime;
    console.log(`   ✅ PASSED (${duration}ms)`);
    return {
      test_name: name,
      status: 'PASS',
      duration,
      output,
    };
  } catch (error: any) {
    const duration = Date.now() - startTime;
    const errorMsg = error.message || String(error);
    console.log(`   ❌ FAILED (${duration}ms)`);
    console.log(`   Error: ${errorMsg.slice(0, 100)}`);
    return {
      test_name: name,
      status: 'FAIL',
      duration,
      error: errorMsg,
    };
  }
};

const runWarningTest = (name: string, command: string, cwd: string = projectRoot): TestResult => {
  console.log(`\n⚠️  Checking: ${name}...`);
  const startTime = Date.now();

  try {
    execSync(command, { cwd, stdio: 'pipe' });
    const duration = Date.now() - startTime;
    console.log(`   ✅ OK (${duration}ms)`);
    return {
      test_name: name,
      status: 'PASS',
      duration,
    };
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.log(`   ⚠️  WARNING (${duration}ms)`);
    return {
      test_name: name,
      status: 'WARN',
      duration,
      error: error.message || String(error),
    };
  }
};

const log = (msg: string) => {
  console.log(msg);
  report.summary += msg + '\n';
};

log('╔════════════════════════════════════════════════════════╗');
log('║  Podcast Listening App - Test Runner                   ║');
log('╚════════════════════════════════════════════════════════╝\n');

// Test 1: Project Structure
log('\n📁 Phase 1: Project Structure Validation\n');
const structTest = runTest(
  'Validate project structure',
  'node validate_project.js'
);
report.tests.push(structTest);
if (structTest.status === 'PASS') report.passed++;
else report.failed++;
report.total_tests++;

// Test 2: TypeScript Compilation
log('\n🔧 Phase 2: TypeScript Compilation\n');
const tsTest = runTest('TypeScript strict mode check', 'tsc --noEmit');
report.tests.push(tsTest);
if (tsTest.status === 'PASS') report.passed++;
else report.failed++;
report.total_tests++;

// Test 3: Dependencies Check
log('\n📦 Phase 3: Dependencies Check\n');
const depsTest = runTest('Check dependencies', 'npm list --depth=0');
report.tests.push(depsTest);
if (depsTest.status === 'PASS') report.passed++;
else report.failed++;
report.total_tests++;

// Test 4: Build Check
log('\n🔨 Phase 4: Build Validation\n');
const buildTest = runTest('Build project', 'npm run build');
report.tests.push(buildTest);
if (buildTest.status === 'PASS') report.passed++;
else if (buildTest.status === 'WARN') report.warnings++;
else report.failed++;
report.total_tests++;

// Calculate overall score
report.overall_score = Math.round((report.passed / report.total_tests) * 100);

// Summary
log('\n╔════════════════════════════════════════════════════════╗');
log('║                    Test Results                        ║');
log('╚════════════════════════════════════════════════════════╝\n');
log(`Total Tests:  ${report.total_tests}`);
log(`Passed:       ${report.passed}`);
log(`Failed:       ${report.failed}`);
log(`Warnings:     ${report.warnings}`);
log(`Score:        ${report.overall_score}%\n`);

if (report.failed === 0) {
  log('✅ All critical tests PASSED!\n');
} else {
  log('❌ Some tests FAILED. Please review the errors above.\n');
}

// Save report
const reportPath = path.join(logsDir, `test_report_${Date.now()}.json`);
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
log(`📊 Test report saved: logs/test_report_${Date.now()}.json\n`);

process.exit(report.failed > 0 ? 1 : 0);
