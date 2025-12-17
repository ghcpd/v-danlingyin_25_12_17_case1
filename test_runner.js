const { exec } = require('child_process')
const fs = require('fs')
fs.mkdirSync('logs', { recursive: true })

function run(cmd) {
  return new Promise((res) => {
    exec(cmd, { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
      res({ err, stdout, stderr })
    })
  })
}

;(async () => {
  const t1 = await run('node validate_project.js')
  fs.writeFileSync('logs/validate_output.log', JSON.stringify(t1, null, 2))

  const build = await run('pnpm build')
  fs.writeFileSync('logs/build_output.log', JSON.stringify(build, null, 2))

  const report = {
    validation: t1.err ? 'FAIL' : 'PASS',
    build: build.err ? 'FAIL' : 'PASS'
  }
  fs.writeFileSync('logs/test_report.json', JSON.stringify(report, null, 2))
  console.log('Test run complete. See logs/test_report.json')
})()
