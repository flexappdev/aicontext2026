# Claude Code Pro Tips

Power-user patterns for getting the most out of Claude Code.

---

## Context Management

**Use `/compact` often** — summarizes conversation history and frees up context window. Do it before switching tasks or after a big feature lands.

**Use `/clear` between unrelated tasks** — starts fresh, prevents context bleed from earlier work.

**Be specific with file paths** — "read `src/App.tsx`" beats "look at the app file". Claude reads exactly what you name.

**CLAUDE.md layers** — global (`~/.claude/CLAUDE.md`) + project (`./CLAUDE.md`) both load. Use global for personal preferences, project for repo conventions.

---

## Workflow Acceleration

**Shift+Tab = auto-accept mode** — Claude executes tools without asking. Use for trusted, repetitive tasks (seeding, formatting, doc generation).

**Skills for repeated workflows** — if you type the same 3-sentence prompt more than twice, make it a `/skill`. Stored in `.claude/skills/<name>/SKILL.md`.

**Chain skills** — end a skill with `+ /push` or `+ /qa` to chain into the next step automatically (as in this very session).

**Plan mode first** — for big refactors, invoke `/plan` or `EnterPlanMode` before any edits. Claude will outline the approach before touching code.

---

## Subagents & Parallelism

**Background agents for long tasks** — use `run_in_background: true` so you can keep working while the agent runs.

**Worktree isolation** — `EnterWorktree` gives the agent its own git branch, so experiments don't dirty your working tree.

**Parallelize independent reads** — Claude can call Read/Grep/Glob on multiple files simultaneously. Ask for it explicitly: "read these 4 files in parallel".

**Subagent types matter:**

| Type | Best for |
|---|---|
| `general-purpose` | Broad research, multi-step tasks |
| `Explore` | Fast codebase search, pattern matching |
| `Plan` | Architecture decisions, implementation strategy |
| `claude-code-guide` | Questions about Claude Code itself |

---

## Hooks for Automation

**Auto-format on save** — PostToolUse hook on Write:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{ "type": "command", "command": "prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\"" }]
    }]
  }
}
```

**Auto-lint on edit** — same pattern with your lint command.

**Guard dangerous ops** — PreToolUse hook on Bash to block `rm -rf` patterns.

---

## Model Selection

```bash
claude --model claude-opus-4-6    # most capable, best for complex tasks
claude --model claude-sonnet-4-6  # default, great balance
claude --model claude-haiku-4-5   # fastest + cheapest, great for bulk ops
/model                            # switch mid-session
/fast                             # toggle fast mode (Opus 4.6, faster output)
```

**Cost tip:** Use Haiku for seeding, formatting, and search. Use Opus/Sonnet for planning, architecture, and writing.

---

## Permissions & Safety

**Permission modes:**

| Mode | Flag | Use case |
|---|---|---|
| Default | (none) | Interactive work, prompts on risky ops |
| Auto | `--dangerously-skip-permissions` | CI/CD, trusted automation |
| Allow-list | settings.json `allow` array | Specific tools only |

**Never skip hooks with `--no-verify`** — if a hook fails, fix the underlying issue.

---

## Debugging & Cost

```
/cost          # show token usage for current session
/help          # full command reference
Escape         # interrupt current action immediately
```

**Token tips:**
- Each file read costs tokens — only read what you need
- `/compact` before a big task = more room for the actual work
- Subagents have their own context — use them to protect the main window

---

## Memory System

Auto-memory lives at `~/.claude/projects/<path>/memory/` — Claude writes here across sessions.

**MEMORY.md** is the index (loaded every session, keep it under 200 lines).

**Memory types:** `user`, `feedback`, `project`, `reference` — each in its own `.md` file with frontmatter.

**Feedback memories are the most valuable** — they prevent Claude from repeating the same mistake twice.

---

## Quick Reference

| Action | How |
|---|---|
| Invoke a skill | `/skill-name` |
| Switch model | `/model` |
| Free context | `/compact` |
| Auto-accept | `Shift+Tab` |
| Stop action | `Escape` |
| Check cost | `/cost` |
| Fresh start | `/clear` |
| Toggle fast mode | `/fast` |
