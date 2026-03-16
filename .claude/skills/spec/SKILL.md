---
name: spec
description: Spec-driven development — brainstorm requirements, write specs, break into chunks, and execute with subagents. Inspired by superpowers and get-shit-done. Use when the user says "spec", "/spec", "write spec", "plan feature", or wants structured requirement-to-implementation flow.
---

# Spec-Driven Development

Structured requirement → specification → implementation pipeline. Prevents context rot and ensures quality on complex features.

Inspired by: [superpowers](https://github.com/obra/superpowers) (spec-driven methodology), [get-shit-done](https://github.com/gsd-build/get-shit-done) (context engineering).

## Commands

```
/spec brainstorm <idea>    — Explore and refine an idea into concrete requirements
/spec write <feature>      — Write a detailed spec from requirements
/spec chunk <spec-file>    — Break a spec into implementable chunks
/spec execute <spec-file>  — Run spec through subagent-driven implementation
/spec review <spec-file>   — Review a spec for completeness and feasibility
```

## Process

### /spec brainstorm <idea>

1. **Understand** — What is the user trying to achieve? Ask 2-3 clarifying questions max
2. **Context scan** — Read related existing files to understand current state
3. **Explore** — Consider 3 different approaches, briefly describe each
4. **Converge** — Recommend the best approach with trade-offs explained
5. **Output** — A requirements list ready for `/spec write`

### /spec write <feature>

Write a structured spec document at `docs/spec-<slug>.md`:

```markdown
# <Feature> — Specification

## Problem
What problem does this solve? Who has this problem?

## Solution
High-level approach in 2-3 sentences.

## Requirements
### Must Have
- [ ] Requirement with acceptance criteria

### Nice to Have
- [ ] Optional requirement

## Data Model
Tables, columns, relationships, RLS policies.

## API Surface
Server actions or API routes with input/output types.

## UI/UX
Page layout, interactions, responsive behavior.

## File Plan
| File | Action | Description |
|------|--------|-------------|
| path/to/file | create/modify | what changes |

## Dependencies
External packages, env vars, migrations needed.

## Risks
What could go wrong? Mitigation strategies.

## Chunks
Numbered implementation chunks, each independently testable.
```

### /spec chunk <spec-file>

1. Read the spec file
2. Break into 3-7 chunks, each:
   - Has a clear input and output
   - Can be independently tested (`npx tsc --noEmit` after each)
   - Takes no more than ~30 minutes of implementation
   - Has explicit file list (create/modify)
3. Order chunks by dependency (what must come first?)
4. Output a numbered chunk list with estimated effort

### /spec execute <spec-file>

1. Read the spec and its chunks
2. For each chunk:
   - Enter plan mode briefly to verify approach
   - Implement the chunk
   - Run `npx tsc --noEmit` to verify
   - Report chunk completion
3. After all chunks: run full build (`npx next build`)
4. Report summary of all files created/modified

### /spec review <spec-file>

Check the spec for:
- **Completeness** — Does it cover data, API, UI, and edge cases?
- **Feasibility** — Can it be built with the current stack?
- **Consistency** — Does it align with existing patterns?
- **Testability** — Can each requirement be verified?
- **Scope** — Is it too big? Should it be split?

Output a review with pass/warn/fail per section.

## Conventions

- Specs live in `docs/spec-<slug>.md`
- Each spec should be implementable in one session
- If a spec is too big (>7 chunks), split it into multiple specs
- Always include a File Plan — no surprises about what gets created/modified
- Chunks should be ordered so that later chunks never require undoing earlier ones
- After execution, update backlog PBIs to reflect completion
