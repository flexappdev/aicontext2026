# Claude Code: Current Best — 2026-03-22

> Auto-generated from codebase state. Run `/aic cc` to refresh.

---

## Setup

```bash
npm install -g @anthropic-ai/claude-code
claude                          # launch in current directory
claude --model claude-opus-4-6  # most capable
claude --model claude-sonnet-4-6  # default, great balance
claude --model claude-haiku-4-5   # fastest + cheapest
```

---

## Best Commands Right Now

| Command | What it does |
|---------|-------------|
| `/compact` | Summarize + compress context — do this before switching tasks |
| `/clear` | Fresh context — prevents bleed between unrelated tasks |
| `/model` | Switch model mid-session |
| `/fast` | Toggle fast mode (Opus 4.6, faster output) |
| `/cost` | Show token usage for current session |
| `Shift+Tab` | Toggle auto-accept mode — Claude executes without prompting |
| `Escape` | Interrupt current action immediately |
| `/help` | Full command reference |

---

## All Skills (54 installed)

### Master Agents
| Skill | What it does |
|-------|-------------|
| `/abc` (`/1g`) | Super Master Agent for Mat's 1G (ABC) goal — routes all work |
| `/aicontext` (`/aic`) | AI Context 2026 site brain — research, update, status |
| `/apps` | APPS codebase orchestrator — 13 sites + all apps |
| `/audio` | AUDIO codebase manager — DJ recordings, NotebookLM pipeline |
| `/bo` | Backoffice orchestrator — NextJS + Supabase + Vercel |
| `/images` | IMAGES codebase manager — generation, S3, BO pipeline |
| `/msl` (`/mslists`) | mslists apps + @top100lists YouTube channel |
| `/mst` | mstravel — 6 live travel sites |
| `/pg` | Prodgame tracker — POMs, 1G progress, streaks |
| `/vad26` | VAD26 content operation — daily publishing pipeline |

### Content & Characters
| Skill | What it does |
|-------|-------------|
| `/gorai` | Gorai VAD scenes — cinematic video prompts + thumbnails |
| `/selena` | Selena Voss VAD scenes — cinematic video prompts + thumbnails |
| `/nano-banana` | Image generation via Gemini CLI (Nano Banana) |
| `/reformat` | Reformat markdown files — clean blank lines + headings |

### Dev Tools
| Skill | What it does |
|-------|-------------|
| `/add` | Add feature end-to-end — page, nav, PRD, QA, deploy |
| `/backlog` | Full backlog lifecycle — review, prioritize, implement, mark DONE |
| `/cleanup` | Fix lint, remove unused imports/deps, optimize bundle |
| `/component` | Build reusable UI component with theme-aware styling |
| `/db` | Database ops — migrations, seeding, schema verification |
| `/deploy` | Pre-deploy check — build, type-check, lint, QA status |
| `/doc` | Generate/update docs — PRDs, test plans, API docs |
| `/env` | Manage .env files — validate, compare, generate templates |
| `/feature` | Build complete feature — page, API, types, server actions |
| `/github` | GitHub ops via gh CLI — issues, PRs, starred repos |
| `/history` | Log sessions, update docs/history.md |
| `/import` | Import data from JSON, CSV, API responses |
| `/knowledge` | Agent memory + knowledge graph management |
| `/migrate` | Codebase migrations — deps, APIs, schema, patterns |
| `/monitor` | Monitor long-running jobs — builds, imports, AI gen |
| `/perf` | Analyze performance — bundle size, build times, DB queries |
| `/persona` | Manage persona lifecycle — create, version, clone |
| `/push` | Stage + commit + push to origin main |
| `/qa` | Full QA lifecycle — run all tests, fix failures, update status |
| `/release` | Version bump, changelog, release notes, tag |
| `/research` | Deep research — web search, repo analysis, library compare |
| `/review` | Code review — conventions, theme consistency, patterns |
| `/rich-ui` | Rich interactive UI — cards, forms, dashboards for agents |
| `/scaffold` | Generate pages, API routes, server actions |
| `/seed` | Manage seed data — generate, load, reset, export |
| `/spec` | Spec-driven dev — brainstorm → spec → chunks → subagents |
| `/test` | Run QA tests against routes and features |
| `/tiktok` | TikTok operations |
| `/ux` | Full site UX review — mobile, tablet, desktop |
| `/vercel` | Vercel ops — env sync, deploy, promote, rollback |

### Utilities & Aliases
| Skill | What it does |
|-------|-------------|
| `/skill-creator` | Create, modify, evaluate, and benchmark skills |
| `/agents-md` | Generate AGENTS.md files for repos |
| `/ai` | AI provider config — API keys, model selection, cost tracking |
| `/claude-api` | Build apps with Claude API / Anthropic SDK |
| `/keybindings-help` | Customize keybindings in `~/.claude/keybindings.json` |
| `/simplify` | Review changed code for quality, reuse, and efficiency |
| `/loop` | Run a prompt or skill on a recurring interval |

---

## Recently Added / Changed

From commits in the last 14 days:

| Commit | Change |
|--------|--------|
| `c1fe709` | Added GitHub links to all skills + links to docs table in README |
| `8cfe168` | Added **CC Pro Tips** section (`/claude-code-pro-tips`) |
| `f4e1616` | Added `lastUpdated` date to README |
| `1aee2f9` | Added `/docs` directory, skills reference, rewrote README |
| `87a2602` | Added dark/light mode, print export, quick-ref mode |

---

## Best Workflows This Week

### 1. AI Context Update Loop
```
/aic status          ← check what's stale
/aic update [topic]  ← research + update all 5 places
/push                ← commit + push
```

### 2. Backlog Sprint
```
/aic backlog         ← review + prioritize
/aic update [item]   ← tackle top item
/push                ← ship it
```

### 3. New CC Reference (this command)
```
/aic cc              ← regenerate cc-current.md from live state
/push                ← commit the updated reference
```

---

## Key Agents (Subagent Types)

| Type | Best for |
|------|----------|
| `general-purpose` | Broad research, multi-step tasks |
| `Explore` | Fast codebase search, pattern matching |
| `Plan` | Architecture decisions, implementation strategy |
| `claude-code-guide` | Questions about Claude Code itself |
| `ms26-pg-architect` | MS26/PG ecosystem — MSCORE, MSLISTS, MSTRAVEL |

---

## Key MCPs

| MCP | What it does |
|-----|-------------|
| `playwright` | Browser automation — screenshot, click, navigate, scrape |
| `firecrawl` | Extract content from web pages + AI documentation sites |

---

## Pro Tips (Top 5)

1. **`/compact` before every big task** — frees context, prevents stale tool calls from dominating the window.
2. **Shift+Tab = auto-accept mode** — use for repetitive trusted tasks (seeding, formatting, doc generation).
3. **Skills for repeated prompts** — if you type the same 3-sentence prompt more than twice, make it a `/skill`.
4. **Feedback memories are the most valuable** — they prevent Claude from repeating the same mistake twice.
5. **Subagents have their own context** — use `run_in_background: true` so you can keep working while the agent runs.
