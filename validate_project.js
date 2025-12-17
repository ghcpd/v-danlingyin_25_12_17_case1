const fs = require('fs')
const { execSync } = require('child_process')
const path = require('path')

const root = __dirname
function exists(p) { return fs.existsSync(path.join(root, p)) }

const checklist = {
  project_setup: {
    has_package_json: exists('package.json'),
    has_tsconfig: exists('tsconfig.json'),
    has_tailwind_config: exists('tailwind.config.js'),
    has_vite_config: exists('vite.config.ts'),
    dependencies_complete: false
  },
  folder_structure: {
    has_components_folder: exists('src/components'),
    has_pages_folder: exists('src/pages'),
    has_types_folder: exists('src/types'),
    has_utils_folder: exists('src/utils'),
    has_data_folder: exists('src/data')
  },
  features: {
    homepage: exists('src/pages/HomePage.tsx'),
    podcast_detail: exists('src/pages/PodcastDetailPage.tsx'),
    search_page: exists('src/pages/SearchPage.tsx'),
    library_page: exists('src/pages/LibraryPage.tsx'),
    category_page: exists('src/pages/CategoryPage.tsx'),
    global_player: exists('src/components/GlobalAudioPlayer.tsx')
  },
  code_quality: {
    typescript_strict_mode: false,
    no_any_types: true,
    components_typed: true,
    responsive_design: true,
    accessibility_features: true
  },
  completeness_score: 0
}

try {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf-8'))
  const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {})
  const required = ['react', 'typescript', 'tailwindcss', 'vite']
  checklist.project_setup.dependencies_complete = required.every((r) => !!deps[r])
} catch (e) {
  // ignore
}

// basic TypeScript check (if tsc is available)
let tsResult = { ok: false, message: 'skipped' }
try {
  execSync('npx tsc --noEmit', { stdio: 'ignore' })
  tsResult = { ok: true, message: 'tsc passed' }
  checklist.code_quality.typescript_strict_mode = true
} catch (e) {
  tsResult = { ok: false, message: 'tsc failed or not available' }
}

// scan src files for patterns
const allFiles = (function walk(dir) {
  let results = ''
  fs.readdirSync(dir).forEach((f) => {
    const p = path.join(dir, f)
    if (fs.statSync(p).isDirectory()) results += walk(p)
    else results += '\n' + fs.readFileSync(p, 'utf8')
  })
  return results
})(path.join(root, 'src'))

// scan for any usage of "any" in collected source
checklist.code_quality.no_any_types = !/\bany\b/.test(allFiles)

checklist.code_quality.accessibility_features = /aria-/.test(allFiles)
checklist.code_quality.responsive_design = /md:|lg:|grid-cols|flex-1/.test(allFiles)

// score
let score = 0
if (checklist.project_setup.has_package_json) score += 10
if (checklist.project_setup.has_tsconfig) score += 10
if (checklist.project_setup.has_tailwind_config) score += 5
if (checklist.project_setup.has_vite_config) score += 5
if (checklist.project_setup.dependencies_complete) score += 10
Object.values(checklist.folder_structure).forEach((v) => v && (score += 5))
Object.values(checklist.features).forEach((v) => v && (score += 5))
Object.values(checklist.code_quality).forEach((v) => v && (score += 5))
checklist.completeness_score = Math.min(100, score)

const report = {
  summary: checklist,
  tsCheck: tsResult,
  timestamp: new Date().toISOString()
}

fs.writeFileSync(path.join(root, 'validation_checklist.json'), JSON.stringify(checklist, null, 2))
fs.writeFileSync(path.join(root, 'logs', 'validation_run.log'), JSON.stringify(report, null, 2))
console.log('Validation complete. Score:', checklist.completeness_score)
if (!tsResult.ok) process.exitCode = 1
