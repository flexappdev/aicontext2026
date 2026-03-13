---
name: history
description: Manage session history — log new sessions, update docs/history.md, and keep the history page in sync. Use when the user says "history", "/history", "log session", "update history", or wants to record or view Claude Code session data.
---

# History — Session Log Manager

Track and display Claude Code session history for AgentAI.

## IMPORTANT: Always Update docs/history.md

Every time a session is logged — whether via `/history log`, at the end of a conversation, or when the user says "log session" — you MUST append/update `docs/history.md`. This is not optional. The file is the single source of truth for all session data and must stay current.

### Mandatory steps after logging any session:

1. **Read** `docs/history.md` to get the current state
2. **Append** a new row to the session table (sessions are sorted oldest-first, so add the new row at the bottom of the table, just before the `---` separator above the Totals section)
3. **Update the Totals section** — recalculate: total sessions, estimated API cost, total tokens, total commits, latest session date/number
4. **Update the Notes section** if needed (e.g., concurrent sessions, overnight spans)
5. **Verify** the file is well-formed markdown (no broken table rows, no missing columns)

### Entry format for each session row:

```markdown
| {session_number} | {YYYY-MM-DD} | {HH:MM–HH:MM or "—"} | {duration or "—"} | Sub | {$cost or "—"} | {tokens or "—"} | Opus 4.6 | {goal in 3-8 words} | {summary in 1-2 sentences} | {commit_count} |
```

### Required fields per entry:

- **Session number**: next sequential integer
- **Date**: YYYY-MM-DD format
- **Time (UTC)**: start–end range, or "—" if unknown
- **Duration**: human-readable (e.g., "2 hr 15 min"), or "—" if unknown
- **Billing**: "Sub" (subscription) or "API"
- **Cost**: estimated API-equivalent cost from token pricing, or "—" if not computed
- **Tokens**: total tokens in shorthand (e.g., "55.8M"), or "—" if not computed
- **Model**: Claude model used (currently "Opus 4.6")
- **Goal**: primary objective in 3-8 words
- **Summary**: what was accomplished in 1-2 sentences
- **Commits**: number of git commits made during the session

### Totals section update formula:

```
Total sessions  = count of all rows in the session table
Estimated cost  = sum of all Cost column values (use ~prefix for estimates)
Total tokens    = sum of all Tokens column values
Total commits   = sum of all Commits column values
Latest session  = date and number of the last row
```

## Commands

```
/history log                — Log the current session to docs/history.md
/history update             — Refresh totals and sync history page data
/history show               — Display the full session timeline
```

## /history log

Add the current session to `docs/history.md`:

1. Read `docs/history.md` to get the current session count
2. Determine the next session number
3. Gather session metadata:
   - **Date**: from today's date
   - **Time**: from first to last message timestamps (approximate)
   - **Duration**: wall-clock time estimate
   - **Billing**: "API" or "Subscription" — infer from context or ask user
   - **Cost**: estimated API-equivalent cost from token usage (always compute even for subscription)
   - **Tokens**: total token count for the session (input + cache_write + cache_read + output)
   - **Model**: the Claude model used (e.g., Opus 4.6)
   - **Goal**: the primary objective of the session (1 phrase)
   - **Summary**: what was accomplished (1-2 sentences)
   - **Commits**: count commits made in this session (`git log` since session start)
4. Append a new row to the session table
5. Update the Totals section (total sessions, total cost, total tokens, total commits, latest session)

### Token extraction

Read the session JSONL file from `~/.claude/projects/-home-matsiems-APPS-agentai/`. Each assistant turn has a `message.usage` object:

```json
{
  "input_tokens": 927,
  "cache_creation_input_tokens": 152928,
  "cache_read_input_tokens": 1271426,
  "output_tokens": 4020
}
```

- **Total tokens** = input + cache_creation + cache_read + output
- **Estimated API cost** = (input × $15 + cache_creation × $18.75 + cache_read × $1.875 + output × $75) / 1,000,000

These are Opus 4 list prices. For subscription users the actual out-of-pocket cost is just the subscription fee — the "cost" column shows what the equivalent API usage would have cost.

## /history update

Refresh the history document:

1. Read `docs/history.md`
2. Recalculate totals from all session rows
3. Update the Totals table
4. Check that session numbers are sequential and dates are chronological

## Table Format

```markdown
| # | Date | Time (UTC) | Duration | Billing | Cost | Tokens | Model | Goal | Summary | Commits |
```

- `#` — Sequential session number (1, 2, 3...)
- `Date` — YYYY-MM-DD
- `Time (UTC)` — HH:MM–HH:MM range
- `Duration` — Human-readable (e.g., "2 hr 15 min", "45 min")
- `Billing` — "API" or "Sub" (subscription)
- `Cost` — Estimated API-equivalent cost (e.g., "$47.75"); always shown even for subscription billing
- `Tokens` — Total tokens used (e.g., "29.0M", "1.4M")
- `Model` — Claude model name (e.g., "Opus 4.6")
- `Goal` — Primary objective in 3-8 words
- `Summary` — What was accomplished (1-2 sentences)
- `Commits` — Number of git commits made

## File References

- Session log: `docs/history.md`
- Session JSONL: `~/.claude/projects/-home-matsiems-APPS-agentai/*.jsonl`
- History page: `app/(app)/history/page.tsx`

## Conventions

- Sessions are numbered sequentially (never skip or reuse numbers)
- All times in UTC
- **Sort order**: oldest first (session 1 at top, newest session at bottom of the table)
- Costs are **estimated API-equivalent costs** based on token usage, not actual charges
- For subscription users, add a note in the Totals section clarifying the distinction
- Token counts use shorthand: "1.4M" for 1,400,000; "29.0M" for 29,000,000
- Overlapping sessions (concurrent instances) are noted in the Notes section
- Keep the Totals section accurate after every update
- **docs/history.md is the canonical record** — it must be updated every time session data changes
