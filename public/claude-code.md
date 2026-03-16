# Claude Code (CC)

Claude Code is Anthropic's official CLI for agentic software development.

## Install & Launch

```bash
npm install -g @anthropic-ai/claude-code
claude                          # launch in current directory
claude --model claude-opus-4-6  # specify model
```

## 6 Extensions

| # | Extension | Description |
|---|-----------|-------------|
| 1 | **CLAUDE.md** | Persistent context Claude sees every session |
| 2 | **Skills** | Reusable knowledge & invocable workflows (`/skill-name`) |
| 3 | **MCP** | Connects Claude to external services (Playwright, Firecrawl…) |
| 4 | **Subagents** | Run isolated loops in separate context, return summaries |
| 5 | **Hooks** | Deterministic shell scripts that run outside the loop |
| 6 | **Plugins** | Package & distribute all the above |

## CLAUDE.md

- Place in project root or `~/.claude/CLAUDE.md` (global)
- Injected into every session automatically
- Use for: tech stack, conventions, commands, warnings

## Skills

```
.claude/
  skills/
    <skill-name>/
      SKILL.md    ← skill definition (frontmatter + instructions)
```

Invoke: type `/skill-name` in chat, or use the Skill tool in code.

```yaml
---
name: push
description: Push current changes to main
argument-hint: [--dry-run]
---
```

## Hooks

Run shell commands at lifecycle events — no Claude involvement:

```json
{
  "hooks": {
    "PreToolUse": [{ "matcher": "Bash", "hooks": [{ "type": "command", "command": "echo pre" }] }],
    "PostToolUse": [{ "matcher": "Write", "hooks": [{ "type": "command", "command": "prettier --write $FILE" }] }]
  }
}
```

Hook events: `PreToolUse`, `PostToolUse`, `Notification`, `Stop`

## Subagents (Task tool)

Spawn isolated agents for parallel or large-context work:

```typescript
// Claude uses Task tool internally
Task({ subagent_type: "general-purpose", prompt: "...", run_in_background: true })
```

Built-in types: `general-purpose`, `Explore`, `Plan`, `claude-code-guide`

## MCP (.mcp.json)

```json
{
  "mcpServers": {
    "playwright": { "command": "npx", "args": ["-y", "@playwright/mcp@latest"] },
    "firecrawl": { "command": "npx", "args": ["-y", "firecrawl-mcp"], "env": { "FIRECRAWL_API_KEY": "..." } }
  }
}
```

## Memory

Auto-memory at `~/.claude/projects/<path>/memory/MEMORY.md` — persists across sessions.

## Key Commands

```
claude                  # start session
/clear                  # clear context
/compact                # summarize and compress
/help                   # show help
/model                  # switch model
/fast                   # toggle fast mode (Opus 4.6 faster output)
/cost                   # show token usage
Shift+Tab               # toggle auto-accept mode
Escape                  # interrupt current action
```

## Permissions

Modes: **default** (prompt on risky), **auto** (`--dangerously-skip-permissions`), or custom allow-lists via settings.
