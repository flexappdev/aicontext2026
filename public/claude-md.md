# CLAUDE.md

CLAUDE.md is a **persistent context file** that Claude Code reads at the start of every session. It's how you give Claude standing instructions that don't have to be repeated each time.

---

## How It Works

```
Session starts
  └─ Claude reads CLAUDE.md files (all scopes)
       └─ Content injected into system context
            └─ Claude follows these instructions throughout
```

CLAUDE.md is:
- **Always loaded** — no need to mention it each session
- **Markdown** — plain text, any format
- **Scoped** — global, project, or directory-level
- **Checked in** — lives in the repo, versioned with your code

---

## File Locations

| Scope | Path | When Used |
|-------|------|-----------|
| Global | `~/.claude/CLAUDE.md` | Every Claude Code session |
| Project root | `./CLAUDE.md` | When working in this repo |
| Subdirectory | `./src/CLAUDE.md` | When Claude edits files in `src/` |

Multiple CLAUDE.md files are **merged** — all apply simultaneously.

---

## What to Put in CLAUDE.md

### Project context
```markdown
# My Project
This is a Next.js 15 app using Supabase for auth and Postgres.
The main entry point is `src/app/page.tsx`.
All API routes are in `src/app/api/`.
```

### Standing instructions
```markdown
## Rules
- Always run `npm run typecheck` before marking a task done
- Never use `any` in TypeScript
- Prefer server components over client components
- All database queries go through `lib/db.ts`
```

### Tech stack notes
```markdown
## Stack
- React 18 + TypeScript via Vite (SWC)
- Tailwind CSS — dark #050507 background, green accent
- Supabase — auth + Postgres
- MongoDB — persona/session storage
```

### Current context (ephemeral)
```markdown
## Current Sprint
Working on the ABC goal — Apps, Backoffice, Context.
Priority: finish MSLISTS v2 by end of March.
```

---

## Project vs Global

### `~/.claude/CLAUDE.md` (global)
Best for: personal preferences, tools you always use, your coding style.

```markdown
# Global Claude Instructions
- I prefer concise responses — no summaries at the end
- Always check if a file exists before creating it
- I use WSL2 on Windows — use Linux paths
- My main projects are in ~/APPS/
```

### `./CLAUDE.md` (project)
Best for: repo-specific rules, tech stack, team conventions, domain context.

```markdown
# AI Context 2026
Vite + React + Tailwind cheat-sheet site served at /ai/.
Skills live in .claude/skills/. Content lives in public/*.md.
Run `npm run build` to verify before committing.
```

---

## CLAUDE.md vs Memory

| Feature | CLAUDE.md | Memory files |
|---------|-----------|-------------|
| Format | Markdown file | `.claude/memory/*.md` |
| Scope | Project or global | Project-scoped |
| Written by | Developer | Claude (auto) |
| When loaded | Every session | On-demand |
| Best for | Standing rules | Learned preferences |

---

## Tips

- Keep it focused — Claude reads all of it every session
- Use headers (`##`) to organize sections
- Put the most important rules first
- Update it when your project conventions change
- Commit it so teammates get the same Claude behavior
- Use `@CLAUDE.md` in chat to reference it explicitly

---

## Example: This Project

```markdown
# Claude Code Extensions

The 6 Claude Code extensions we use:
1. CLAUDE.md - Adds persistent context Claude sees every session
2. Skills - Add reusable knowledge and invocable workflows
3. MCP - Connects Claude to external services and tools
4. Subagents - Run their own loops in isolated context
5. Hooks - Run outside the loop as deterministic scripts
6. Plugins and marketplaces - Package and distribute these features
```
