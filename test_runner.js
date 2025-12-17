const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString();
  } catch (e) {
    return { error: String(e) };
  }
}

const out = [];
out.push('Running validate_project.js');
const v = run('node validate_project.js');
out.push(String(v));

out.push('\nAttempting build with pnpm build');
const b = run('pnpm build');
out.push(String(b));

fs.writeFileSync('logs/validation_run.log', out.join('\n\n'));
console.log('Test run complete. See logs/validation_run.log');
