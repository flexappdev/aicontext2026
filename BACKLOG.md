# Backlog — AI Context 2026

_Last updated: 2026-03-16_

---

## Summary

| Status | Count |
|--------|-------|
| ✅ DONE | 14 |
| 🔄 WIP | 0 |
| 📋 DO | 19 |

---

## ✅ DONE

| ID | Section / Feature | Notes |
|----|-------------------|-------|
| S01 | Overview section (inline bullets) | Live in content.ts |
| S07 | MCP: Playwright page | `/ai/playwright-mcp.md` live |
| S08 | MCP: Firecrawl page | `/ai/firecrawl-mcp.md` live |
| F00 | Remove Hero.tsx / Features.tsx dead code | Done 2026-03-16 |
| P01 | Add Subagents page | `/ai/subagents.md` + content.ts |
| P02 | Add Hooks page | `/ai/hooks.md` + content.ts |
| P03 | Add CLAUDE.md page | `/ai/claude-md.md` + content.ts |
| P04 | Add Memory page | `/ai/memory.md` + content.ts |
| F01 | Keyboard nav (j/k / arrow keys) | keydown listener in App.tsx |
| F02 | URL hash sync (`#section-id`) | window.history.replaceState on active change |
| F03 | Sidebar section grouping | groups in content.ts, rendered in App.tsx |
| F05 | Copy-to-clipboard on code blocks | CopyablePre in MarkdownPanel.tsx |
| F08 | Recently visited sections (localStorage) | tracked in App.tsx, shown in sidebar |

---

## 🔄 WIP

_(none)_

---

## 📋 DO

### Content Review — existing pages

| ID | Section | File | Skill |
|----|---------|------|-------|
| C01 | AI Apps | `public/ai-apps.md` | content |
| C02 | Models | `public/models.md` | content |
| C03 | Claude Code | `public/claude-code.md` | content |
| C04 | Open Claw | `public/openclaw.md` | content |
| C05 | Skills | `public/skills.md` | content |
| C06 | MCPs | `public/mcps.md` | content |
| C07 | Workflows | `public/workflows.md` | content |
| C08 | Infrastructure | `public/infrastructure.md` | content |
| C09 | 2026 ABC Goal | `public/abc-goal.md` | content |

### New Pages to Add

| ID | Page | Description | Skill | Effort | SP |
|----|------|-------------|-------|--------|----|
| P05 | NotebookLM | sources → video → infographic → blog → slide → YouTube | `/add` | M | 2 |
| P06 | Ollama | local model runner, model list, Open Claw integration | `/add` | M | 2 |
| P07 | Tailscale | private network, connecting WSL / Mac / server | `/add` | S | 1 |
| P08 | Sociology | port `sociology/` markdown content into app | `/add` | M | 2 |

### Features — Navigation & UX

| ID | Feature | Skill | Effort | SP |
|----|---------|-------|--------|----|
| F01 | Keyboard nav (j/k or arrow keys between sections) | `/component` | M | 2 |
| F02 | URL hash sync (`/ai/#claude-code`) | `/component` | M | 2 |
| F03 | Sidebar section tags/grouping (Apps, Tools, Infra, Workflows) | `/component` | M | 2 |
| F04 | Mobile bottom nav or drawer for sidebar | `/component` | L | 3 |
| F05 | Copy-to-clipboard on code blocks in markdown | `/component` | S | 1 |

### Features — App

| ID | Feature | Skill | Effort | SP |
|----|---------|-------|--------|----|
| F06 | Dark/light mode toggle | `/component` | M | 2 |
| F07 | Full-text search across all markdown content | `/feature` | L | 3 |
| F08 | Recently visited sections (localStorage) | `/component` | S | 1 |
| F09 | Print / PDF export of a section | `/component` | M | 2 |
| F10 | Version badges / last-updated dates per section | `/component` | M | 2 |
| F11 | External links section per page | content | S | 1 |
| F12 | Quick-reference cheat card format (collapsible bullets) | `/component` | M | 2 |

### Infrastructure

| ID | Item | Skill | Effort | SP |
|----|------|-------|--------|----|
| I01 | CI/CD — GitHub Actions → build → deploy | `/deploy` | M | 2 |
| I02 | Sociology route (`public/sociology/`) | `/add` | S | 1 |
| I03 | `sitemap.xml` / meta tags for SEO | `/scaffold` | S | 1 |

### Bugs

| ID | Bug | Skill | Effort |
|----|-----|-------|--------|
| B03 | Confirm `vite.config.ts` base `/ai/` matches prod path | `/deploy` | S |
| B04 | Commit `.gitignore` / `vite.config.ts` line-ending changes | git | S |

---

## Workflows to Document

| ID | Workflow | Description |
|----|----------|-------------|
| W01 | NotebookLM | sources → video → infographic → blog → slide → YouTube |
| W02 | VAD (Video a Day) | mscore / mslists / mstravel pipeline |
| W03 | AAD (App a Day) | daily app scaffold workflow |
| W04 | AIS (Accounts) | account/credential management |
| W05 | PG (Prod Game) | full PG system workflow |
