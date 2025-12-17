const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function run(cmd) {
  try {
    console.log('>', cmd)
    const out = execSync(cmd, { stdio: 'pipe' }).toString()
    return { ok: true, out }
  } catch (e) {
    return { ok: false, out: (e.stdout || e.message || '').toString() }
  }
}

const logs = []
logs.push({ step: 'validate', result: run('node validate_project.js') })
// attempt build using pnpm if available, fallback to npm
let buildCmd = 'pnpm build'
let buildRes = run(buildCmd)
if (!buildRes.ok) {
  buildCmd = 'npm run build'
  buildRes = run(buildCmd)
}
logs.push({ step: 'build', cmd: buildCmd, result: buildRes })

fs.writeFileSync(path.join(__dirname, 'logs', 'validation_run.log'), JSON.stringify({ timestamp: new Date().toISOString(), logs }, null, 2))
console.log('Test runner finished, see logs/validation_run.log')
if (!buildRes.ok) process.exitCode = 1
