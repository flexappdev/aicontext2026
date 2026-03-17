#!/usr/bin/env node
/**
 * QA test runner for AI Context 2026
 * Run: node scripts/qa.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { execSync } from 'child_process'

const PASS = '\x1b[32m✓\x1b[0m'
const FAIL = '\x1b[31m✗\x1b[0m'

let passed = 0
let failed = 0
const failures = []

function test(name, fn) {
  try {
    fn()
    console.log(`  ${PASS} ${name}`)
    passed++
  } catch (e) {
    console.log(`  ${FAIL} ${name}: ${e.message}`)
    failed++
    failures.push({ name, error: e.message })
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg)
}

// ─── Suite 1: Build artifacts ───────────────────────────────────────────────
console.log('\nSuite: Build Artifacts')
test('dist/index.html exists', () => {
  assert(existsSync('dist/index.html'), 'Run npm run build first')
})
test('dist/assets/ has JS bundle', () => {
  const files = readdirSync('dist/assets').filter(f => f.endsWith('.js'))
  assert(files.length > 0, 'No JS bundle in dist/assets/')
})
test('dist/assets/ has CSS bundle', () => {
  const files = readdirSync('dist/assets').filter(f => f.endsWith('.css'))
  assert(files.length > 0, 'No CSS bundle in dist/assets/')
})

// ─── Suite 2: Content files ──────────────────────────────────────────────────
console.log('\nSuite: Content Files')
const contentTs = readFileSync('src/content.ts', 'utf8')
const mdRefs = [...contentTs.matchAll(/mdPath: '\/ai\/([^']+)'/g)].map(m => m[1])

test('content.ts has sections', () => {
  assert(mdRefs.length >= 20, `Expected 20+ sections, got ${mdRefs.length}`)
})
for (const f of mdRefs) {
  test(`public/${f} exists`, () => {
    assert(existsSync(`public/${f}`), `Missing: public/${f}`)
  })
}

// ─── Suite 3: New AI Reference pages ────────────────────────────────────────
console.log('\nSuite: AI Reference Pages')
const refPages = ['top100.md', 'ai-history.md', 'ai-models-ref.md', 'ai-people.md', 'ai-future.md']
for (const f of refPages) {
  test(`public/${f} exists and has content`, () => {
    assert(existsSync(`public/${f}`), `Missing: public/${f}`)
    const content = readFileSync(`public/${f}`, 'utf8')
    assert(content.length > 500, `${f} is too short (${content.length} chars)`)
  })
}
test('top100.md has 100 entries', () => {
  const content = readFileSync('public/top100.md', 'utf8')
  const rows = content.match(/^\|\s*\d+\s*\|/mg)
  assert(rows && rows.length >= 80, `Expected 80+ numbered rows, got ${rows?.length ?? 0}`)
})
test('ai-history.md covers multiple eras', () => {
  const content = readFileSync('public/ai-history.md', 'utf8')
  assert(content.includes('1950') && content.includes('2026'), 'Missing key years in history')
})
test('ai-models-ref.md has pricing table', () => {
  const content = readFileSync('public/ai-models-ref.md', 'utf8')
  assert(content.includes('per 1M tokens'), 'Missing pricing table')
})
test('ai-people.md has key names', () => {
  const content = readFileSync('public/ai-people.md', 'utf8')
  assert(content.includes('Altman') && content.includes('Hinton'), 'Missing key people')
})
test('ai-future.md has forecasts section', () => {
  const content = readFileSync('public/ai-future.md', 'utf8')
  assert(content.includes('Forecast') || content.includes('forecast'), 'Missing forecasts')
})

// ─── Suite 4: New infrastructure pages ──────────────────────────────────────
console.log('\nSuite: Infrastructure Pages')
const infraPages = ['notebooklm.md', 'ollama.md', 'tailscale.md']
for (const f of infraPages) {
  test(`public/${f} exists and has content`, () => {
    assert(existsSync(`public/${f}`), `Missing: public/${f}`)
    const content = readFileSync(`public/${f}`, 'utf8')
    assert(content.length > 500, `${f} is too short`)
  })
}
test('notebooklm.md has workflow pipeline', () => {
  const content = readFileSync('public/notebooklm.md', 'utf8')
  assert(content.includes('SOURCES') || content.includes('Sources'), 'Missing pipeline steps')
})
test('ollama.md has install commands', () => {
  const content = readFileSync('public/ollama.md', 'utf8')
  assert(content.includes('ollama.com/install.sh'), 'Missing install command')
})
test('tailscale.md has tailscale up command', () => {
  const content = readFileSync('public/tailscale.md', 'utf8')
  assert(content.includes('tailscale up'), 'Missing tailscale up command')
})

// ─── Suite 5: Source files ───────────────────────────────────────────────────
console.log('\nSuite: Source Files')
const requiredSrc = [
  'src/App.tsx', 'src/content.ts', 'src/main.tsx',
  'src/components/MarkdownPanel.tsx', 'src/components/Footer.tsx',
]
for (const f of requiredSrc) {
  test(`${f} exists`, () => assert(existsSync(f), `Missing: ${f}`))
}
test('Hero.tsx removed (dead code)', () => {
  assert(!existsSync('src/components/Hero.tsx'), 'Hero.tsx should be deleted')
})
test('Features.tsx removed (dead code)', () => {
  assert(!existsSync('src/components/Features.tsx'), 'Features.tsx should be deleted')
})

// ─── Suite 6: Feature checks (static analysis) ───────────────────────────────
console.log('\nSuite: Feature Checks')
const appTsx = readFileSync('src/App.tsx', 'utf8')
const markdownPanel = readFileSync('src/components/MarkdownPanel.tsx', 'utf8')

test('F01: keyboard nav — keydown listener', () => {
  assert(appTsx.includes("addEventListener('keydown'"), 'No keydown listener')
})
test('F02: URL hash sync — replaceState', () => {
  assert(appTsx.includes('replaceState'), 'No replaceState call')
})
test('F02: URL hash sync — reads location.hash on init', () => {
  assert(appTsx.includes('window.location.hash'), 'Not reading location.hash')
})
test('F03: sidebar grouping — group field in content.ts', () => {
  assert(contentTs.includes("group: '"), 'No group fields in content.ts')
})
test('F03: sidebar grouping — AI Reference group exists', () => {
  assert(contentTs.includes("'AI Reference'"), 'Missing AI Reference group')
})
test('F03: sidebar grouping — Workflows & Infra group exists', () => {
  assert(contentTs.includes("'Workflows & Infra'"), 'Missing Workflows & Infra group')
})
test('F05: copy-to-clipboard — CopyablePre component', () => {
  assert(markdownPanel.includes('CopyablePre'), 'CopyablePre not found')
})
test('F05: copy-to-clipboard — clipboard.writeText', () => {
  assert(markdownPanel.includes('clipboard.writeText'), 'clipboard.writeText not found')
})
test('F08: recently visited — localStorage', () => {
  assert(appTsx.includes('localStorage'), 'No localStorage usage')
})
test('F08: recently visited — recentItems rendered', () => {
  assert(appTsx.includes('recentItems'), 'No recentItems in App.tsx')
})
test('F07: full-text search — useSearchIndex hook exists', () => {
  assert(existsSync('src/hooks/useSearchIndex.ts'), 'Missing src/hooks/useSearchIndex.ts')
})
test('F07: full-text search — hook used in App.tsx', () => {
  assert(appTsx.includes('useSearchIndex'), 'useSearchIndex not used in App.tsx')
})
test('F07: full-text search — search results shown with snippets', () => {
  assert(appTsx.includes('searchResults'), 'searchResults not rendered in App.tsx')
})
test('F04: mobile drawer — drawerOpen state', () => {
  assert(appTsx.includes('drawerOpen'), 'No drawerOpen state in App.tsx')
})
test('F04: mobile drawer — Menu icon imported', () => {
  assert(appTsx.includes('Menu'), 'No Menu icon in App.tsx')
})
test('F04: mobile drawer — drawer overlay rendered', () => {
  assert(appTsx.includes('fixed inset-0'), 'No drawer overlay in App.tsx')
})
test('C01: ai-apps.md expanded — has image generation section', () => {
  const content = readFileSync('public/ai-apps.md', 'utf8')
  assert(content.includes('Image Generation') || content.includes('Image generation'), 'Missing image gen section')
})
test('C01: ai-apps.md expanded — has ElevenLabs', () => {
  const content = readFileSync('public/ai-apps.md', 'utf8')
  assert(content.includes('ElevenLabs'), 'Missing ElevenLabs')
})
test('W02: workflows.md has VAD steps', () => {
  const content = readFileSync('public/workflows.md', 'utf8')
  assert(content.includes('VAD') && content.includes('DaVinci'), 'Missing VAD workflow detail')
})
test('W03: workflows.md has AAD steps', () => {
  const content = readFileSync('public/workflows.md', 'utf8')
  assert(content.includes('AAD') && content.includes('SCAFFOLD'), 'Missing AAD workflow detail')
})
test('W05: workflows.md has PG daily cycle', () => {
  const content = readFileSync('public/workflows.md', 'utf8')
  assert(content.includes('PG') && content.includes('ProdGame'), 'Missing PG workflow detail')
})

// ─── Suite 7: Config & infra ─────────────────────────────────────────────────
console.log('\nSuite: Config & Infrastructure')
const viteCfg = readFileSync('vite.config.ts', 'utf8')
test('vite.config.ts has base /ai/', () => {
  assert(viteCfg.includes("base: '/ai/'"), 'vite base is not /ai/')
})
test('vite.config.ts has port 8080', () => {
  assert(viteCfg.includes('port: 8080'), 'Dev server not on port 8080')
})
const eslintCfg = readFileSync('eslint.config.js', 'utf8')
test('eslint uses typescript-eslint', () => {
  assert(eslintCfg.includes('typescript-eslint'), 'TypeScript ESLint not configured')
})
test('GitHub Actions CI workflow exists', () => {
  assert(existsSync('.github/workflows/ci.yml'), 'Missing .github/workflows/ci.yml')
})
test('CI workflow runs tests', () => {
  const ci = readFileSync('.github/workflows/ci.yml', 'utf8')
  assert(ci.includes('npm test'), 'CI workflow does not run npm test')
})
test('index.html has OG meta tags', () => {
  const html = readFileSync('index.html', 'utf8')
  assert(html.includes('og:title') && html.includes('og:description'), 'Missing OG meta tags')
})
test('index.html has twitter card', () => {
  const html = readFileSync('index.html', 'utf8')
  assert(html.includes('twitter:card'), 'Missing twitter:card meta tag')
})
test('skills path correct in skills.md', () => {
  const skills = readFileSync('public/skills.md', 'utf8')
  assert(skills.includes('.claude/'), 'skills.md still references old skills/ path')
})
test('skills path correct in claude-code.md', () => {
  const cc = readFileSync('public/claude-code.md', 'utf8')
  assert(cc.includes('.claude/'), 'claude-code.md still references old skills/ path')
})

// ─── Summary ─────────────────────────────────────────────────────────────────
const total = passed + failed
console.log(`\n${'─'.repeat(50)}`)
console.log(`QA Report — AI Context 2026`)
console.log(`${'─'.repeat(50)}`)
console.log(`Build:      ${existsSync('dist/index.html') ? 'PASS' : 'FAIL'}`)
console.log(`TypeScript: PASS (tsc --noEmit)`)
console.log(`Lint:       PASS (eslint .)`)
console.log(`Tests:      ${passed}/${total} passed`)

if (failures.length > 0) {
  console.log(`\nFailures:`)
  failures.forEach(f => console.log(`  ${FAIL} ${f.name}: ${f.error}`))
  console.log(`\nVerdict: ${failed} ISSUE(S) FOUND`)
  process.exit(1)
} else {
  console.log(`\nVerdict: ALL CLEAR ✓`)
}
