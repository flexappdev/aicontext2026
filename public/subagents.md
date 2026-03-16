# Subagents

Subagents are specialized Claude instances launched by the main Claude Code session. They run their own autonomous loops in isolated context and return summaries.

---

## How Subagents Work

```
Main Claude session
  └─ Agent tool call → launches subagent subprocess
       └─ Subagent runs with its own tools + context
            └─ Returns single summary message to parent
```

- Each subagent starts fresh — no shared context with the parent
- The parent sees only the final result, not intermediate steps
- Multiple subagents can run **in parallel** in a single message
- Use `run_in_background: true` for fire-and-forget tasks

---

## Available Agent Types

| Type | Description | Tools |
|------|-------------|-------|
| `general-purpose` | Default — research, code search, multi-step tasks | All tools |
| `Explore` | Fast codebase exploration — file patterns, keyword search | Read, Glob, Grep, Bash, WebFetch, WebSearch |
| `Plan` | Software architect — implementation plans, trade-off analysis | Read, Glob, Grep, Bash, WebFetch, WebSearch |
| `claude-code-guide` | Claude Code / API / SDK questions | Glob, Grep, Read, WebFetch, WebSearch |
| `ms26-pg-architect` | PG ecosystem — MSCORE, MSLISTS, MSTRAVEL, backoffice, 13 sites | All tools |

---

## When to Use Each Agent

### `Explore` — Fast codebase search
- Finding files by pattern: `src/components/**/*.tsx`
- Keyword search: "API endpoints"
- Quick architecture questions: "how do API endpoints work?"
- Thoroughness levels: `quick` | `medium` | `very thorough`

### `Plan` — Architecture design
- Before implementing a complex feature
- When you need step-by-step implementation plans
- Trade-off analysis between approaches

### `general-purpose` — Open-ended research
- Complex multi-step tasks
- When you're not sure which files/keywords to search for
- Tasks requiring multiple rounds of searching

### `ms26-pg-architect` — PG ecosystem
- New features on any of the 13 sites
- MSLISTS / MSTRAVEL / MSCORE work
- Backoffice asset pipeline design
- Anything touching the 1G (ABC) annual goal

---

## Usage Patterns

### Sequential (dependent)
```
Subagent 1: research API → returns findings
Subagent 2: uses findings to write code
```

### Parallel (independent)
```
Message with multiple Agent tool calls at once:
  - Subagent A: search for X
  - Subagent B: search for Y
  - Subagent C: search for Z
```

### Background
```typescript
run_in_background: true
// parent continues working
// notified when subagent completes
```

---

## Resuming Subagents

Each subagent call returns an **agent ID**. Pass it back as `resume` to continue with full previous context:

```
First call:  agent_id = "abc123"
Resume call: resume: "abc123"
             → agent continues from where it left off
```

---

## Isolation Mode

Use `isolation: "worktree"` to give the subagent a **temporary git worktree** — an isolated copy of the repo. The worktree is:
- Auto-cleaned up if no changes were made
- Returned as a branch if changes were made

Useful for: experimental refactors, risky implementations, parallel feature work.

---

## Tips

- Provide **detailed prompts** — subagents have no prior context
- Specify whether the agent should **read only** or **write code**
- Use `Explore` for search tasks (faster, protects main context)
- Use `general-purpose` for tasks requiring 3+ rounds of searching
- Don't duplicate work — if you delegate research, don't also search yourself
