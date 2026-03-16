# Memory

Auto memory is a **persistent, file-based memory system** that lets Claude remember things across sessions. Claude builds it up over time so future conversations have full context on you, your preferences, and the project.

---

## How It Works

```
Conversation
  └─ Claude learns something useful
       └─ Writes a memory file to .claude/memory/
            └─ Updates MEMORY.md index
                 └─ Future session loads MEMORY.md → reads relevant files
```

Memory is:
- **File-based** — plain markdown files in `.claude/memory/`
- **Persistent** — survives across sessions
- **Project-scoped** — lives next to the code it describes
- **Indexed** — `MEMORY.md` is always loaded, files loaded on demand

---

## Memory Types

| Type | What It Stores | When Claude Saves |
|------|----------------|-------------------|
| `user` | Role, goals, expertise, preferences | When learning about who you are |
| `feedback` | Corrections, "don't do X", behavior changes | When you correct Claude's approach |
| `project` | Goals, decisions, deadlines, context | When learning about ongoing work |
| `reference` | Pointers to external systems | When you mention Jira, Slack, Grafana, etc. |

---

## File Structure

```
.claude/
  memory/
    MEMORY.md              ← index (always loaded, max 200 lines)
    user_role.md           ← who you are
    user_preferences.md    ← how you like to work
    feedback_testing.md    ← don't mock the DB
    feedback_responses.md  ← keep responses terse
    project_abc_goal.md    ← current sprint context
    reference_linear.md    ← where to find tickets
```

---

## Memory File Format

Each memory file has frontmatter:

```markdown
---
name: No trailing summaries
description: User wants terse responses without end-of-response summaries
type: feedback
---

Do not summarize what you just did at the end of responses.

**Why:** User finds it redundant — they can read the diff.
**How to apply:** Every response in every session.
```

---

## MEMORY.md Index

`MEMORY.md` is the index — always loaded, contains only pointers:

```markdown
## User
- [user_role.md](memory/user_role.md) — role, expertise, context
- [user_preferences.md](memory/user_preferences.md) — response style, work preferences

## Feedback
- [feedback_responses.md](memory/feedback_responses.md) — terse, no summaries
- [feedback_testing.md](memory/feedback_testing.md) — no mocking the DB

## Project
- [project_abc_goal.md](memory/project_abc_goal.md) — 2026 ABC goal context

## References
- [reference_linear.md](memory/reference_linear.md) — ticket tracking location
```

---

## When Claude Saves Memory

| Trigger | Memory Type |
|---------|-------------|
| "I'm a data scientist..." | `user` |
| "I've been writing Go for 10 years but new to React" | `user` |
| "Stop summarizing at the end" | `feedback` |
| "Don't mock the DB — we got burned last quarter" | `feedback` |
| "We're freezing merges after Thursday for the mobile release" | `project` |
| "Check the Linear project INGEST for pipeline bugs" | `reference` |

---

## What NOT to Save

Memory is **not** for:
- Code patterns or conventions (read the code)
- Git history (use `git log`)
- Debugging solutions (the fix is in the code)
- Anything already in CLAUDE.md
- Temporary in-session state

---

## Memory vs CLAUDE.md

| Feature | Memory | CLAUDE.md |
|---------|--------|-----------|
| Written by | Claude (automatic) | Developer (manual) |
| Content | Learned preferences | Standing instructions |
| Format | Structured frontmatter | Free-form markdown |
| When loaded | On-demand | Every session |
| Best for | What Claude observed | What you want Claude to know |

---

## Manual Memory Management

You can ask Claude to:
- **Save**: "Remember that I prefer X"
- **Forget**: "Forget that I said X"
- **Check**: "What do you remember about me?"

Or manage files directly in `.claude/memory/`.
