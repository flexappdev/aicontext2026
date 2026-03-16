---
name: agents-md
description: Generate and maintain AGENTS.md files — the standard format for guiding AI coding agents in repositories. Inspired by agents.md. Use when the user says "agents-md", "/agents-md", "generate agents.md", or wants to create agent guidance files for repos.
---

# AGENTS.md Generator

Generate and maintain AGENTS.md files — a standard format for providing context and instructions to AI coding agents working in a repository.

Inspired by: [agents.md](https://github.com/agentsmd/agents.md) (open format for guiding coding agents).

## Commands

```
/agents-md generate          — Generate AGENTS.md for the current repo
/agents-md update            — Update existing AGENTS.md with current state
/agents-md audit             — Check if AGENTS.md is accurate and complete
/agents-md template <stack>  — Generate a template for a specific stack
```

## Process

### /agents-md generate

1. **Scan the codebase** to understand:
   - Stack and frameworks (package.json, config files)
   - Project structure (key directories and their purpose)
   - Build and test commands
   - Environment setup requirements
   - Database and external service dependencies
   - Code conventions and patterns
   - CI/CD configuration

2. **Read existing docs** — CLAUDE.md, README.md, .env.example, contributing guides

3. **Generate AGENTS.md** at the repo root with these sections:

```markdown
# AGENTS.md

## Overview
Brief project description and purpose.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Database: Supabase (PostgreSQL + Auth + Storage)
- Auth: Clerk
- Styling: Tailwind CSS + shadcn/ui
- Language: TypeScript (strict mode)

## Project Structure
Key directories and what they contain.

## Development Setup
How to get the project running locally.

## Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npx tsc --noEmit` | Type check |
| `npx next build` | Production build |

## Code Conventions
- File naming patterns
- Component patterns
- Data fetching approach
- Error handling
- State management

## Database
- Schema overview
- Migration approach
- Multi-tenancy (org_id scoping)

## Testing
How to run tests, what to test.

## PR Instructions
How to format commits and PRs.

## Common Pitfalls
Things agents frequently get wrong in this codebase.
```

### /agents-md update

1. Read the existing AGENTS.md
2. Scan for changes since last update:
   - New dependencies in package.json
   - New directories or key files
   - Changed build/test commands
   - New environment variables
3. Update only the changed sections
4. Add a "Last updated" timestamp

### /agents-md audit

1. Read AGENTS.md
2. Verify each section against the actual codebase:
   - Are listed commands still valid?
   - Do referenced files/dirs still exist?
   - Are conventions still followed?
   - Are dependencies up to date?
3. Report discrepancies as warnings

## Conventions

- AGENTS.md lives at the repo root
- Keep it concise — agents work best with focused instructions
- Include only project-specific info, not general programming advice
- Update after major structural changes (new modules, stack changes)
- The file complements CLAUDE.md — AGENTS.md is stack-agnostic guidance, CLAUDE.md is Claude-specific
