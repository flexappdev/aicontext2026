---
name: doc
description: Generate and update project documentation — PRDs, test plans, API docs, and the skills reference. Use when the user says "doc", "/doc", "document", "write docs", or wants to create or update documentation files.
---

# Documentation Generator

Create and maintain project documentation for AgentAI.

## Commands

### PRD (`/doc prd <topic>`)
1. Derive slug and title from topic
2. Create `docs/prd-<slug>.md` with sections:
   - Overview, User Stories, Requirements (Must Have / Nice to Have)
   - Data Model, UI/UX, API, Dependencies, Status
3. Follow the template from `/add` skill
4. Report file path

### Test Plan (`/doc test <topic>`)
1. Derive slug and title from topic
2. Create `docs/test-<slug>.md` with sections:
   - Scope, Test Cases (5 default: page load, nav, core interaction, empty state, error handling)
   - Regression checklist (build, tsc, lint, existing pages)
3. Add test entries to `lib/sidebar/qa-data.ts`
4. Report file path

### API Doc (`/doc api`)
1. Scan `app/api/` for all route.ts files
2. For each route, extract:
   - HTTP methods exported (GET, POST, PUT, DELETE)
   - Request body shape (from Zod schemas if present)
   - Response shape
3. Generate `docs/api.md` with endpoint table and details
4. Report endpoint count

### Skills Doc (`/doc skills`)
1. Read all `.claude/skills/*/SKILL.md` files
2. Update `docs/skills.md`:
   - Update count in header
   - Rebuild quick reference table
   - Add/update detailed sections for each skill
   - Update file tree at the bottom
3. Report changes made

### Changelog (`/doc changelog`)
1. Read `git log --oneline -20` for recent commits
2. Group by type (feature, fix, refactor, docs)
3. Append to `docs/changelog.md` (create if needed)
4. Report entries added

## Conventions

- Use markdown with consistent heading hierarchy
- PRD files go in `docs/prd-*.md`
- Test plans go in `docs/test-*.md`
- Reference docs go in `docs/*.md`
- Never overwrite existing docs without reading them first
