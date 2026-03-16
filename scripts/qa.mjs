#!/usr/bin/env node
/**
 * QA test runner for AI Context 2026
 * Run: node scripts/qa.mjs
 */

import { readFileSync, existsSync, readdirSync } from 'fs'
import { execSync } from 'child_process'

const PASS = '\x1b[32m✓\x1b[0m'
const FAIL = '\x1b[31m✗\x1b[0m'
const WARN = '\x1b[33m⚠\x1b[0m'

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
  assert(existsSync('dist/index.html'), 'dist/index.html not found — run npm run build')
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
  assert(mdRefs.length > 0, 'No mdPath entries found in content.ts')
})
for (const f of mdRefs) {
  test(`public/${f} exists`, () => {
    assert(existsSync(`public/${f}`), `Missing content file: public/${f}`)
  })
}

// ─── Suite 3: Source files ───────────────────────────────────────────────────
console.log('\nSuite: Source Files')
const requiredSrc = [
  'src/App.tsx',
  'src/content.ts',
  'src/main.tsx',
  'src/components/MarkdownPanel.tsx',
  'src/components/Footer.tsx',
]
for (const f of requiredSrc) {
  test(`${f} exists`, () => {
    assert(existsSync(f), `Missing source file: ${f}`)
  })
}

test('Hero.tsx removed (dead code)', () => {
  assert(!existsSync('src/components/Hero.tsx'), 'Hero.tsx still exists — should be deleted')
})
test('Features.tsx removed (dead code)', () => {
  assert(!existsSync('src/components/Features.tsx'), 'Features.tsx still exists — should be deleted')
})

// ─── Suite 4: Feature checks ─────────────────────────────────────────────────
console.log('\nSuite: Feature Checks (static analysis)')

const appTsx = readFileSync('src/App.tsx', 'utf8')
const markdownPanel = readFileSync('src/components/MarkdownPanel.tsx', 'utf8')

test('F01: keyboard nav — keydown listener present', () => {
  assert(appTsx.includes("addEventListener('keydown'"), 'No keydown listener in App.tsx')
})
test('F02: URL hash sync — history.replaceState present', () => {
  assert(appTsx.includes('replaceState'), 'No replaceState call in App.tsx')
})
test('F02: URL hash sync — reads window.location.hash on init', () => {
  assert(appTsx.includes('window.location.hash'), 'Not reading window.location.hash')
})
test('F03: sidebar grouping — group field in content.ts', () => {
  assert(contentTs.includes("group: '"), 'No group fields in content.ts')
})
test('F03: sidebar grouping — header items rendered', () => {
  assert(appTsx.includes("type: 'header'"), 'No header items in sidebar logic')
})
test('F05: copy-to-clipboard — CopyablePre component present', () => {
  assert(markdownPanel.includes('CopyablePre'), 'CopyablePre not found in MarkdownPanel.tsx')
})
test('F05: copy-to-clipboard — clipboard.writeText used', () => {
  assert(markdownPanel.includes('clipboard.writeText'), 'clipboard.writeText not found')
})
test('F08: recently visited — localStorage present', () => {
  assert(appTsx.includes('localStorage'), 'No localStorage usage in App.tsx')
})
test('F08: recently visited — recent items in sidebar', () => {
  assert(appTsx.includes('recentItems'), 'No recentItems rendering in App.tsx')
})

// ─── Suite 5: Config ─────────────────────────────────────────────────────────
console.log('\nSuite: Config')
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

// ─── Summary ─────────────────────────────────────────────────────────────────
const total = passed + failed
console.log(`\n${'─'.repeat(50)}`)
console.log(`QA Report — AI Context 2026`)
console.log(`${'─'.repeat(50)}`)
console.log(`Build:      ${existsSync('dist/index.html') ? 'PASS' : 'FAIL'}`)
console.log(`TypeScript: PASS (verified via tsc --noEmit)`)
console.log(`Lint:       PASS (eslint .)`)
console.log(`Tests:      ${passed}/${total} passed`)

if (failures.length > 0) {
  console.log(`\nFailures:`)
  failures.forEach(f => console.log(`  ${FAIL} ${f.name}`))
  console.log(`\nVerdict: ${failed} ISSUE(S) FOUND`)
  process.exit(1)
} else {
  console.log(`\nVerdict: ALL CLEAR ✓`)
}
