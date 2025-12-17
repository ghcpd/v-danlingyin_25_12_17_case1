const fs = require('fs')
const { exec } = require('child_process')
const path = require('path')

function exists(p) { return fs.existsSync(path.resolve(p)) }

const checks = {
  files: {
    package: exists('package.json'),
    tsconfig: exists('tsconfig.json'),
    tailwind: exists('tailwind.config.js'),
    vite: exists('vite.config.ts'),
    src: exists('src')
  },
  scripts: {},
  typescript: null,
  aria: false
}

try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  checks.scripts = pkg.scripts || {}
  checks.devDeps = pkg.devDependencies || {}
} catch (e) {
  // ignore
}

const tsResult = exec('npx tsc --noEmit', (err, stdout, stderr) => {
  checks.typescript = err ? false : true
  // Read all source files to do a light scan
  function readAll(dir) {
    let result = ''
    const items = fs.readdirSync(dir, { withFileTypes: true })
    for (const it of items) {
      const p = path.join(dir, it.name)
      if (it.isDirectory()) result += readAll(p)
      else if (it.isFile()) result += '\n' + fs.readFileSync(p, 'utf8')
    }
    return result
  }
  const all = exists('src') ? readAll('src') : ''
  checks.aria = /aria-label|aria-live|role=/.test(all)

  const report = { checks }
  fs.mkdirSync('logs', { recursive: true })
  fs.writeFileSync('logs/validation_run.log', JSON.stringify(report, null, 2))
  console.log('Validation complete. Report written to logs/validation_run.log')
})

// Fallback small checks if tsc not available
setTimeout(() => {
  if (!checks.typescript) {
    try { fs.mkdirSync('logs', { recursive: true }); fs.writeFileSync('logs/validation_run.log', JSON.stringify({ checks }, null, 2)) } catch (e) {}
    console.log('Validation wrote basic report to logs/validation_run.log')
  }
}, 2000)
