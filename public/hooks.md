# Hooks

Hooks run **outside the Claude Code loop** as deterministic shell scripts. They fire automatically in response to Claude Code events — before or after tool calls.

---

## How Hooks Work

```
Claude Code loop
  ├─ [PreToolUse hook runs] → can block or modify
  ├─ Tool executes
  └─ [PostToolUse hook runs] → can react/log
```

Hooks are:
- **Deterministic** — plain shell scripts, no AI
- **Synchronous** — Claude waits for hooks to complete
- **Blocking** — a hook can prevent a tool call from proceeding
- **Outside the loop** — not part of Claude's reasoning

---

## Hook Events

| Event | When It Fires |
|-------|--------------|
| `PreToolUse` | Before any tool call |
| `PostToolUse` | After any tool call completes |
| `Notification` | When Claude sends a notification |
| `Stop` | When the main agent loop finishes |

---

## Configuration

Hooks are configured in `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo '[hook] bash call' >> /tmp/claude-audit.log"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint --silent 2>&1 | head -20"
          }
        ]
      }
    ]
  }
}
```

---

## Matchers

| Matcher | Matches |
|---------|---------|
| `"Bash"` | All Bash tool calls |
| `"Write"` | All Write tool calls |
| `"Edit"` | All Edit tool calls |
| `".*"` | All tool calls (regex) |
| `"Bash|Write"` | Multiple tools |

---

## Hook Output

Hooks communicate back to Claude via stdout/stderr:

| Output | Effect |
|--------|--------|
| Exit code `0` | Success — Claude proceeds |
| Exit code `1` | Failure — Claude sees the error |
| Exit code `2` | **Block** — Claude cannot proceed with the tool call |
| stdout text | Shown to Claude as hook feedback |

---

## Common Use Cases

### Audit log
```bash
#!/bin/bash
echo "$(date) TOOL=$CLAUDE_TOOL_NAME" >> ~/claude-audit.log
```

### Auto-lint on file write
```bash
#!/bin/bash
# Run after Write tool — lint the written file
if [[ "$CLAUDE_TOOL_INPUT_FILE_PATH" == *.ts ]]; then
  npx eslint "$CLAUDE_TOOL_INPUT_FILE_PATH" --fix
fi
```

### Block dangerous commands
```bash
#!/bin/bash
# Block rm -rf in Bash tool
if echo "$CLAUDE_TOOL_INPUT_COMMAND" | grep -q "rm -rf"; then
  echo "Blocked: rm -rf not allowed"
  exit 2
fi
```

### Auto-format on save
```bash
#!/bin/bash
# Run prettier after any file write
if [[ "$CLAUDE_TOOL_NAME" == "Write" ]]; then
  npx prettier --write "$CLAUDE_TOOL_INPUT_FILE_PATH" 2>/dev/null
fi
```

### Notify on completion
```bash
#!/bin/bash
# Notify when Claude finishes (Stop event)
notify-send "Claude Code" "Task complete" 2>/dev/null || \
  osascript -e 'display notification "Task complete" with title "Claude Code"'
```

---

## Environment Variables

Hooks receive tool context via environment variables:

| Variable | Value |
|----------|-------|
| `CLAUDE_TOOL_NAME` | Name of the tool being called |
| `CLAUDE_TOOL_INPUT_*` | Tool input parameters (flattened) |

---

## Hook vs Skill vs MCP

| Feature | Hook | Skill | MCP |
|---------|------|-------|-----|
| Runs | Outside the loop | Inside the loop | Inside the loop |
| Triggered by | Events (tool calls) | User (`/skill`) or Claude | Tool calls |
| Language | Shell script | Markdown prompt | Node/Python server |
| Can block | Yes | No | No |
| AI-aware | No | Yes | Yes |
