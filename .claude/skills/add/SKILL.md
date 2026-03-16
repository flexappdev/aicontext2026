---
name: add
description: Add any feature end-to-end with page, nav, PRD doc, QA test plan, build, and optional deploy. Use when the user says "add", "/add", "add feature", or wants to quickly scaffold and wire up a new feature area with full documentation and test coverage.
---

# Add Feature

Add a complete feature to AgentAI: page, navigation, PRD doc, QA test plan, build check, and optional deploy.

## Arguments

```
/add <topic>
```

Example: `/add backlog-update`, `/add notifications`, `/add api-keys`

## Process

### 1. Understand

- Parse the topic name from the argument (e.g., `backlog-update`)
- Derive a slug (`backlog-update`), a title (`Backlog Update`), and a route (`/backlog-update`)
- If the topic is ambiguous, ask one clarifying question, then proceed

### 2. Scaffold Page

Create `app/(app)/<slug>/page.tsx`:

- `"use client"` with basic placeholder UI
- Import `useOrg` from `@/providers/org-provider`
- Use theme classes: `bg-card`, `text-foreground`, `border-border`
- Page heading: `text-2xl font-heading font-normal text-foreground`
- Status section showing "Coming soon — this feature is in the backlog"
- Cards with: `rounded-lg border border-border bg-card p-6`

### 3. Update Navigation

**left-sidebar.tsx** — Add to the most relevant existing section (Build, Knowledge, Workspace, QA, Lab, Docs). If none fit, create a new section. Import the icon and add to `iconMap` if not already present.

**top-navigation.tsx** — Add entry to `routeTitles`:
```typescript
"/<slug>": { section: "<Section>", title: "<Title>" },
```

**readme-panel.tsx** — Add entry to `routeReadme` with title, description, features, and tips. Add to `routeToModule` mapping.

### 4. Create PRD Doc

Create `docs/prd-<slug>.md`:

```markdown
# <Title> — Product Requirements

## Overview
Brief description of the feature.

## User Stories
- As a user, I want to ...
- As an admin, I want to ...

## Requirements
### Must Have
- [ ] Requirement 1
- [ ] Requirement 2

### Nice to Have
- [ ] Optional requirement

## Data Model
Describe tables/collections if applicable.

## UI/UX
Describe the page layout and interactions.

## API
Describe endpoints or server actions if applicable.

## Dependencies
List related modules or external services.

## Status
- Phase: Placeholder
- Priority: TBD
- Assigned: Unassigned
```

### 5. Create QA Test Plan

Create `docs/test-<slug>.md`:

```markdown
# <Title> — QA Test Plan

## Scope
What this test plan covers.

## Test Cases

### TC-01: Page loads successfully
- **Route:** `/<slug>`
- **Steps:** Navigate to the page
- **Expected:** Page renders with heading, no console errors
- **Status:** [ ] Pass / [ ] Fail

### TC-02: Navigation entry visible
- **Steps:** Open sidebar, find the section
- **Expected:** "<Title>" link appears under correct section, icon renders
- **Status:** [ ] Pass / [ ] Fail

### TC-03: Core interaction
- **Steps:** Interact with the primary UI element
- **Expected:** Expected behavior occurs
- **Status:** [ ] Pass / [ ] Fail

### TC-04: Empty state
- **Steps:** Load page with no data
- **Expected:** Friendly empty state message, no broken UI
- **Status:** [ ] Pass / [ ] Fail

### TC-05: Error handling
- **Steps:** Trigger an error condition (e.g., network failure)
- **Expected:** Error message shown, no crash
- **Status:** [ ] Pass / [ ] Fail

## Regression
- [ ] Build passes (`npx next build`)
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No lint errors (`npx next lint`)
- [ ] Existing pages still load
```

Also add test entries to `lib/sidebar/qa-data.ts`:
- Add 3-5 test cases for the new feature under a new suite slug
- Add the suite mapping in `getSuiteForModule`
- Test titles should cover: page loads, core interaction, edge case, error state

### 6. Build

Run `npx next build` to verify zero errors. If errors occur, fix them before proceeding.

### 7. Test

Run quick smoke tests after the build:
- Verify the new page route compiles (check build output for the route)
- Verify `npx tsc --noEmit` passes with zero type errors
- Verify `npx next lint` passes with zero errors
- If any check fails, fix the issue and re-run

### 8. Deploy (Optional)

If the user says "and deploy" or "push it":
1. Stage all created and modified files with `git add`
2. Commit with a descriptive message + co-author trailer
3. Run `git push origin main`
4. Report the commit hash and push status

If not requested, skip this step and inform the user they can run `/push` when ready.

### 9. Report

Output a summary:

```
/add <topic> — Complete

Files created:
  - app/(app)/<slug>/page.tsx
  - docs/prd-<slug>.md
  - docs/test-<slug>.md

Files modified:
  - components/layout/left-sidebar.tsx (nav entry)
  - components/layout/top-navigation.tsx (route title)
  - components/layout/readme-panel.tsx (guide + module mapping)
  - lib/sidebar/qa-data.ts (test cases)

Navigation: <Section> > <Title>
PRD: docs/prd-<slug>.md
QA Test Plan: docs/test-<slug>.md
Build: PASS
Type Check: PASS
Lint: PASS
Deploy: <pushed | skipped — run /push when ready>
```

## Conventions

- Always scope data queries with `org_id`
- Use Lucide icons — pick the most semantically relevant one
- Theme classes only (no hardcoded colors)
- Accent color via `var(--org-accent)` style prop
- Font classes: `font-heading` for titles, `font-mono` for labels/badges
- Follow existing page patterns — read a similar page before creating
