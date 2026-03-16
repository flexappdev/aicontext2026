---
name: migrate
description: Assist with codebase migrations — dependency upgrades, API changes, schema migrations, and pattern refactors. Use when the user says "migrate", "/migrate", "upgrade", or wants to move from one version/pattern to another.
---

# Migration Assistant

Guide and execute codebase migrations in AgentAI.

## Commands

### Dependency Upgrade (`/migrate dep <package>`)
1. Check current version in `package.json`
2. Look up latest version via `npm info <package> version`
3. Check the package changelog for breaking changes
4. Update `package.json`
5. Run `npm install`
6. Search codebase for usage of changed APIs
7. Apply necessary code changes
8. Run `npx next build` to verify

### Schema Migration (`/migrate schema <name>`)
1. Create a new migration file: `supabase/migrations/XXX_<name>.sql`
2. Use `IF NOT EXISTS` guards
3. Include RLS policies for new tables
4. Add `org_id` scoping for multi-tenant
5. Generate corresponding TypeScript type updates in `lib/types/`
6. Update server actions if column signatures changed
7. Report migration SQL for review

### Pattern Refactor (`/migrate pattern <from> <to>`)
1. Search codebase for instances of the source pattern
2. List all files and occurrences
3. Show before/after for each change
4. Ask for confirmation before applying
5. Apply changes
6. Run build to verify

### Next.js Upgrade (`/migrate next`)
1. Check current Next.js version
2. Read Next.js upgrade guide for target version
3. Identify breaking changes that affect this codebase
4. Apply changes file by file
5. Update `next.config.ts` if needed
6. Run full build and report results

## Process

1. **Analyze** — Understand current state and target state
2. **Plan** — List all affected files and changes
3. **Confirm** — Present plan to user for approval
4. **Execute** — Apply changes incrementally
5. **Verify** — Build + type check after each significant change
6. **Report** — Summary of all changes made

## Conventions

- Always create a git checkpoint before starting: `git stash` or commit
- Make changes incrementally, verifying build between steps
- Never force-install or skip peer dependency warnings without user approval
