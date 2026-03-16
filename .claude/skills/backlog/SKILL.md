---
name: backlog
description: Run the full backlog lifecycle — review PBIs, assign skills, test DONE items, implement WIP items, update docs and history. Use when doing a backlog sweep or sprint cycle.
argument-hint: [action] — review | test | implement | release | full
---

# Backlog Management

Run a full backlog lifecycle across all project layers. Actions can be scoped or run end-to-end.

## Actions

| Action | What It Does |
|--------|-------------|
| `review` | Review all PBIs, assign skills, update statuses |
| `test` | Test all DONE PBIs to verify they actually work |
| `implement` | Implement all WIP PBIs, then QA and mark done |
| `release` | Update docs, history, readme, and changelog |
| `full` | Run all four actions in sequence |

## Data Files

| File | Purpose |
|------|---------|
| `lib/sidebar/backlog-data.ts` | Structured PBI data (id, moduleId, title, status, effort, sp) |
| `docs/backlog.md` | Master backlog document (human-readable) |
| `docs/history.md` | Session history log |
| `docs/pages/*.md` | Per-page PRDs with DONE/WIP/DO backlogs |
| `lib/sidebar/qa-data.ts` | QA test cases linked to features |
| `lib/sidebar/qa-data.ts` | Module → category mapping |
| `CLAUDE.md` | Project context (update counts) |

---

## Story Points (SP)

Every PBI has an `effort` size and a corresponding `sp` (story points) value using the Fibonacci sequence:

| Effort | Story Points | Description |
|--------|-------------|-------------|
| S | 1 | Small — single file, quick fix |
| M | 2 | Medium — 2-3 files, moderate logic |
| L | 3 | Large — multi-file, complex logic |
| XL | 5 | Extra Large — cross-cutting, architectural |

If an item would be 8+ SP, split it into smaller PBIs.

### SP in the codebase

- **PBI interface**: `effort: PBIEffort` + `sp?: StoryPoints` in `lib/sidebar/backlog-data.ts`
- **Mapping**: `EFFORT_TO_SP` constant maps effort → SP
- **Summary functions**: `getBacklogSummary()` returns `totalSP`, `doneSP`, `remainingSP`
- **Skill interface**: `effort?: SkillEffort` + `sp?: SkillSP` in `lib/types/skill.ts`
- **Seed skills**: Each skill in `actions/seed-skills.ts` has `effort` and `sp` fields
- **Backlog page**: Shows SP badges, SP per module, burndown chart with SP

### When adding new PBIs

Always include both `effort` and `sp` fields:
```typescript
{ id: "mod-N", module_id: "module", title: "...", status: "do", effort: "M", sp: 2, priority: "medium", agent: "ui-agent", skill: "/add", sort_order: N }
```

---

## Step 1: Review PBIs (`review`)

Read all backlog sources to get current state:

```
lib/sidebar/backlog-data.ts    — structured data
docs/backlog.md            — master doc
docs/pages/*.md            — per-page backlogs
```

For each PBI:

1. **Verify status accuracy** — Is a "done" item actually shipped? Is a "wip" item actually in progress?
2. **Assign a skill** — Which Claude Code skill (from `docs/analysis.md`) would be used to implement this PBI?
3. **Check for orphans** — Any PBI in `backlog-data.ts` not in `docs/backlog.md` or vice versa?
4. **Check for stale items** — Any "wip" items that have been WIP for too long?
5. **Sync page PRDs** — Ensure each `docs/pages/*.md` DONE/WIP/DO section matches `backlog-data.ts`

Output a review table:

```
| ID | Module | Title | Status | Skill | Notes |
```

### Updating PBI Status

When changing a PBI status, update ALL three locations:
- `lib/sidebar/backlog-data.ts` — change `status` field
- `docs/backlog.md` — move between DONE/WIP/DO sections
- `docs/pages/{module}.md` — move in the page-level backlog

---

## Step 2: Test DONE PBIs (`test`)

For each PBI with `status: 'done'`:

1. **Find matching QA test** — Check `lib/sidebar/qa-data.ts` for a test covering this PBI
2. **If test exists** — Run it via the QA runner or manually verify
3. **If no test exists** — Create a test definition and add to test-definitions.ts
4. **Manual verification** — For features that can't be auto-tested:
   - Page loads? Check the route renders (no 500/404)
   - API works? Check endpoint returns expected shape
   - CRUD works? Check server action succeeds
   - UI correct? Check component renders with correct data

### Running Tests

```bash
# Run all QA tests via the API
curl -X POST http://localhost:3000/api/qa/run -H 'Content-Type: application/json'

# Or run a specific suite
curl -X POST http://localhost:3000/api/qa/run -H 'Content-Type: application/json' -d '{"suite":"Pages"}'
```

### Adding Missing Tests

Follow the pattern in `lib/sidebar/qa-data.ts`:

```typescript
{
  id: 'page.{module}.load',
  suite: 'Pages',
  category: '{Category}',
  name: '{Feature} loads',
  description: 'GET /{route} returns 200 and renders {feature} content',
  type: 'page_load',
  tags: ['{module}'],
},
```

Also update `lib/sidebar/qa-data.ts` if adding a new category.

---

## Step 3: Implement WIP PBIs (`implement`)

For each PBI with `status: 'wip'`:

1. **Read the PBI** — Get full context from backlog-data.ts and the page PRD
2. **Identify the skill** — Which skill covers this implementation?
3. **Implement** — Write the code following project patterns
4. **Test** — Verify the implementation works:
   - `npx tsc --noEmit` (type check)
   - `npm run build` (build check)
   - Manual verification (page loads, feature works)
5. **Add/update QA test** — Ensure test coverage for the new feature
6. **Mark done** — Update status in all three locations:
   - `lib/sidebar/backlog-data.ts` → `status: 'done'`
   - `docs/backlog.md` → move to DONE section
   - `docs/pages/{module}.md` → move to DONE section

### Implementation Order

Implement WIP items in dependency order:
1. Database/schema changes first
2. Server actions / API routes second
3. UI components third
4. Integration / polish last

---

## Step 4: Release (`release`)

After implementing and testing, update all documentation:

### 4a. Update docs/backlog.md

Sync the master backlog with current `backlog-data.ts`:
- Move completed items to DONE
- Update counts in the summary table
- Update the "Last updated" date

### 4b. Update docs/history.md

Add a new session entry:

```markdown
## Session {N} — {Date}

**Duration:** {time}
**Model:** Claude Opus 4.6

### What happened
- {bullet points of what was done}

### Commits
- `{hash}` {message}

### Stats
- Tokens: {input}/{output}
```

### 4c. Update page PRDs

For each module with changes, update `docs/pages/{module}.md`:
- Move items between DONE/WIP/DO sections
- Update test case table if tests were added
- Update file inventory if files were created

### 4d. Update CLAUDE.md

- Update QA test count if tests were added
- Update backlog item count if items were added/removed
- Update any module descriptions that changed

### 4e. Update docs/qa.md

If new test definitions were added, update the QA spec:
- Add test rows to the appropriate suite table
- Update total test count

### 4f. Build and Verify

```bash
npx tsc --noEmit
npm run build
```

---

## Quick Reference: Skill Assignment Guide

Use this to assign skills to PBIs during review:

| PBI Pattern | Skill |
|-------------|-------|
| "Page scaffold", "Add X page" | `add` |
| "Create/update/delete X" (Supabase) | `persona-crud` or `skill-crud` |
| "API endpoint for X" | `engine-endpoint` |
| "MongoDB schema change" | `engine-schema` |
| "Generation pipeline" | `engine-generate` |
| "Ollama prompt" | `engine-prompt` |
| "Engine UI component" | `engine-component` |
| "Engine diagnostics" | `engine-health` |
| "New table / RLS policy" | `supabase-migration` |
| "Auth / role guard" | `auth-policy` |
| "Export / system prompt" | `persona-export` |
| "Import / validation" | `persona-import` |
| "AI provider" | `playground-provider` |
| "Chat session" | `playground-session` |
| "Agent + skills" | `agent-assembly` |
| "NotebookLM job" | `notebook-pipeline` |
| "Image / video" | `media-generate` |
| "Test definition" | `qa-test` |
| "UI component" | `design-component` |
| "Taxonomy attribute" | `taxonomy-update` |
| "Deploy / build" | `deploy` |

---

## Output Format

After running any action, output a summary:

```
## Backlog Summary

| Metric | Before | After |
|--------|--------|-------|
| Total PBIs | X | Y |
| DONE | X | Y |
| WIP | X | Y |
| DO | X | Y |
| Story Points (remaining) | X | Y |

### Changes Made
- {list of files modified}
- {list of PBIs changed}
- {list of tests added}

### Next Steps
- {what to do next}
```
