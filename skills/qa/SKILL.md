---
name: qa
description: Full QA lifecycle — run all tests across all features and pages, debug failures, add bugs to backlog, fix issues, and update status. Use when the user says "qa", "/qa", "run qa", "test everything", or wants end-to-end quality assurance.
---

# QA Lifecycle Runner

End-to-end quality assurance: test everything, debug failures, log bugs, fix them, update status.

## Command

```
/qa [mode]
```

Modes: `full` (default), `test`, `debug`, `fix`, `report`

## Full QA Cycle (`/qa` or `/qa full`)

Runs all 5 phases in sequence:

### Phase 1 — Test All Routes

1. Run `npx next build` and capture the route manifest
2. For every route in the build output, verify it compiled
3. Run `npx tsc --noEmit` for type errors
4. Run `npx next lint` for lint issues
5. Record results per route

### Phase 2 — Test All Features

Read `lib/sidebar/qa-data.ts` for all registered test cases (109 tests across 14 suites).

For each suite, verify:
- **Page load** — Route exists and compiles in build output
- **Navigation** — Entry exists in `left-sidebar.tsx`, `top-navigation.tsx`, `readme-panel.tsx`
- **Component render** — Page file exports a valid component (no missing imports, no type errors)
- **Data layer** — Server actions or API routes exist for data-dependent pages
- **Empty state** — Page handles no-data gracefully (search for empty state patterns)

Suites to check:
| Suite | Tests | Key Routes |
|-------|-------|------------|
| personas | 6 | `/personas`, `/personas/new`, `/personas/[id]` |
| skills | 8 | `/skills`, `/skills/new`, `/skills/[slug]` |
| agents | 5 | `/agents`, `/agents/new`, `/agents/[slug]` |
| playground | 5 | `/playground` |
| assets | 5 | `/assets` |
| vault | 6 | `/vault`, `/vault/[id]` |
| dashboard | 4 | `/` |
| lab | 3 | `/paperclip`, `/pixel-agents`, `/notebooklm` |
| engine | 8 | `/engine`, `/engine/personas`, `/engine/generate`, `/engine/domains` |
| taxonomy | 4 | `/taxonomy` |
| village | 4 | `/village` |
| profile | 4 | `/profile` |
| backlog | 5 | `/backlog` |
| platform | 4 | `/`, `/auth/login` |

### Phase 3 — Debug Failures

For each failure found in Phase 1 or 2:
1. Read the failing file
2. Identify the root cause (missing import, type error, broken reference, stale data)
3. Classify severity:
   - **critical** — Page won't render, build breaks
   - **high** — Feature broken but page loads
   - **medium** — UI glitch, missing data
   - **low** — Cosmetic, minor inconsistency
4. Document the bug with file path, line number, and root cause

### Phase 4 — Add Bugs to Backlog

For each confirmed bug, add a PBI to `lib/sidebar/backlog-data.ts`:

```typescript
{
  id: "bug-<N>",
  module_id: "<module>",
  title: "Bug: <description>",
  description: "<root cause and fix approach>",
  status: "do",
  effort: "<S|M|L>",
  priority: "<critical|high|medium|low>",
  agent: "qa-agent",
  skill: "/qa",
  page: "<affected route>",
  sort_order: <next>,
}
```

Also add `"/qa"` to the `SkillCmd` type union if not already present.

### Phase 5 — Fix and Update

For each bug (prioritized by severity):
1. Apply the fix
2. Verify the fix compiles: `npx tsc --noEmit`
3. Update the PBI status to `"done"` in `backlog-data.ts`
4. Update the QA test status to `"pass"` in `qa-data.ts`
5. Move to next bug

After all fixes:
1. Run `npx next build` — must pass with zero errors
2. Report final results

## Individual Modes

### `/qa test` — Test only (Phase 1-2)
Run all tests, report results, don't fix anything.

### `/qa debug` — Test + Debug (Phase 1-3)
Run tests and diagnose failures. Don't fix or log bugs.

### `/qa fix` — Fix known bugs
Read backlog for items with `agent: "qa-agent"` and `status: "do"`.
Fix each one, update status.

### `/qa report` — Status report only
Read `qa-data.ts` and `backlog-data.ts`. Report:
- Test coverage per suite (pass/fail/untested)
- Open bug count by severity
- Backlog health (done vs outstanding)

## Output Format

```
QA Report — AgentAI
═══════════════════════════

Build:      PASS/FAIL
TypeScript: PASS/FAIL (N errors)
Lint:       PASS/FAIL (N warnings)

Test Suites:
  personas    6/6 pass
  skills      7/8 pass (1 fail)
  agents      5/5 pass
  ...

Bugs Found: N
  Critical: N
  High:     N
  Medium:   N
  Low:      N

Bugs Fixed: N/M
  ✓ bug-1: <title> — fixed
  ✓ bug-2: <title> — fixed
  ✗ bug-3: <title> — needs manual review

Backlog Updated: N PBIs added, M PBIs marked done

Verdict: ALL CLEAR / N ISSUES REMAINING
```

## File References

- QA test cases: `lib/sidebar/qa-data.ts` (109 tests, 14 suites)
- Backlog PBIs: `lib/sidebar/backlog-data.ts` (100+ PBIs, 16 modules)
- QA page: `app/(app)/qa/page.tsx`
- Backlog page: `app/(app)/backlog/page.tsx`
- Navigation: `components/layout/left-sidebar.tsx`
- Route titles: `components/layout/top-navigation.tsx`
- Guide panel: `components/layout/readme-panel.tsx`

## Conventions

- Always run build check before and after fixes
- Never skip a failing test — debug it or mark as blocked
- Log every bug to backlog, even if immediately fixed (audit trail)
- Update both `qa-data.ts` (test status) and `backlog-data.ts` (PBI status)
- Use `qa-agent` role and `/qa` skill for all bug PBIs
