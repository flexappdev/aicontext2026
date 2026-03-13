---
name: test
description: Run QA tests against AgentAI routes and features. Use when the user says "test", "/test", "run tests", or wants to verify that pages load, APIs respond, and components render without errors.
---

# QA Test Runner

Run automated QA checks against AgentAI routes and features.

## Commands

### Smoke Test (`/test smoke`)
1. Run `npx next build` and capture the route manifest
2. For each route in the build output, verify it compiled successfully
3. Run `npx tsc --noEmit` to check for type errors
4. Run `npx next lint` to check for lint issues
5. Report pass/fail for each check

### Route Test (`/test route <path>`)
1. Check that `app/(app)/<path>/page.tsx` exists
2. Read the file and verify it exports a valid component
3. Check for required imports (org-provider if data-dependent)
4. Verify route is in `top-navigation.tsx` routeTitles
5. Verify route is in `readme-panel.tsx` routeReadme
6. Verify route has a sidebar entry in `left-sidebar.tsx`
7. Report any missing navigation entries

### QA Suite (`/test suite`)
1. Read `lib/sidebar/qa-data.ts` for all registered test cases
2. Group by module/suite
3. Report total test cases, pass/fail status, coverage gaps
4. Identify modules without any test cases

### Full (`/test full`)
1. Run smoke test
2. Run route test for all app routes
3. Run QA suite check
4. Report combined results

## Output Format

```
QA Test Results:
- Build: PASS/FAIL
- TypeScript: PASS/FAIL (N errors)
- Lint: PASS/FAIL (N warnings)
- Routes: N/M verified
- QA Coverage: N modules covered, M uncovered

Verdict: ALL PASS / N FAILURES
```

## Conventions

- Never modify code during test runs — read-only analysis
- Report failures with file paths and line numbers when possible
- Suggest fixes for common failures (missing nav entries, type errors)
