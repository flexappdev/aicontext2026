# Backlog — AI Context 2026

_Last updated: 2026-03-16_

---

## Summary

| Status | Count | SP Done | SP Remaining |
|--------|-------|---------|-------------|
| ✅ DONE | 24 | 38 | — |
| 🔄 WIP | 0 | — | — |
| 📋 DO | 14 | — | 27 |

---

## ✅ DONE

| ID | Section / Feature | Effort | SP | Priority | Notes |
|----|-------------------|--------|----|----------|-------|
| S01 | Overview section (inline bullets) | S | 1 | high | Live in content.ts |
| S07 | MCP: Playwright page | M | 2 | high | `/ai/playwright-mcp.md` live |
| S08 | MCP: Firecrawl page | M | 2 | high | `/ai/firecrawl-mcp.md` live |
| F00 | Remove Hero.tsx / Features.tsx dead code | S | 1 | high | 2026-03-16 |
| P01 | Add Subagents page | M | 2 | high | `/ai/subagents.md` |
| P02 | Add Hooks page | M | 2 | high | `/ai/hooks.md` |
| P03 | Add CLAUDE.md page | M | 2 | high | `/ai/claude-md.md` |
| P04 | Add Memory page | M | 2 | high | `/ai/memory.md` |
| F01 | Keyboard nav (j/k / arrow keys) | M | 2 | medium | keydown in App.tsx |
| F02 | URL hash sync (`#section-id`) | M | 2 | medium | replaceState on nav |
| F03 | Sidebar section grouping | M | 2 | medium | groups in content.ts |
| F05 | Copy-to-clipboard on code blocks | S | 1 | medium | CopyablePre component |
| F08 | Recently visited sections | S | 1 | medium | localStorage in App.tsx |
| R01 | Top 100 AI page | L | 3 | high | `/ai/top100.md` |
| R02 | AI History page | L | 3 | medium | `/ai/ai-history.md` |
| R03 | AI Models reference page | L | 3 | high | `/ai/ai-models-ref.md` |
| R04 | AI People page | M | 2 | medium | `/ai/ai-people.md` |
| R05 | AI Future page | M | 2 | medium | `/ai/ai-future.md` |
| C03 | Claude Code content review | S | 1 | low | Content verified accurate |
| C06 | MCPs content review | S | 1 | low | Content verified accurate |
| C07 | Workflows content review | S | 1 | low | Content verified accurate |
| C08 | Infrastructure content review | S | 1 | low | Content verified accurate |
| C09 | 2026 ABC Goal content review | S | 1 | low | Content verified accurate |
| B03 | Confirm vite.config.ts base `/ai/` | S | 1 | low | Confirmed ✓ |
| P05 | NotebookLM page | M | 2 | high | `/ai/notebooklm.md` |
| P06 | Ollama page | M | 2 | medium | `/ai/ollama.md` |
| P07 | Tailscale page | S | 1 | medium | `/ai/tailscale.md` |
| I01 | CI/CD — GitHub Actions | M | 2 | high | `.github/workflows/ci.yml` |
| I03 | Meta tags / SEO | S | 1 | medium | index.html |
| C01 | AI Apps content review | S | 1 | medium | Expanded with more apps |
| C02 | Models content review | S | 1 | medium | Verified current |
| C04 | Open Claw content review | S | 1 | medium | Verified accurate |
| C05 | Skills content review | S | 1 | medium | Fixed path (.claude/skills/) |

---

## 🔄 WIP

_(none)_

---

## 📋 DO

### Features — Navigation & UX

| ID | Feature | Effort | SP | Priority | Skill |
|----|---------|--------|----|----------|-------|
| F04 | Mobile bottom nav / drawer for sidebar | L | 3 | medium | `/component` |
| F07 | Full-text search across markdown content | L | 3 | high | `/feature` |

### Features — App

| ID | Feature | Effort | SP | Priority | Skill |
|----|---------|--------|----|----------|-------|
| F06 | Dark/light mode toggle | M | 2 | low | `/component` |
| F09 | Print / PDF export of a section | M | 2 | low | `/component` |
| F10 | Version badges / last-updated dates | M | 2 | low | `/component` |
| F11 | External links section per page | S | 1 | low | content |
| F12 | Quick-reference cheat card (collapsible) | M | 2 | low | `/component` |

### New Pages

| ID | Page | Effort | SP | Priority | Skill |
|----|------|--------|----|----------|-------|
| P08 | Sociology — port `sociology/` markdown | M | 2 | low | `/add` |

### Infrastructure

| ID | Item | Effort | SP | Priority | Skill |
|----|------|--------|----|----------|-------|
| I02 | Sociology route (`public/sociology/`) | S | 1 | low | `/add` |

### Workflows to Document

| ID | Workflow | Effort | SP | Priority |
|----|----------|--------|----|----------|
| W01 | NotebookLM pipeline | M | 2 | high |
| W02 | VAD (Video a Day) | M | 2 | medium |
| W03 | AAD (App a Day) | M | 2 | medium |
| W04 | AIS (Accounts) | S | 1 | low |
| W05 | PG (Prod Game) | M | 2 | medium |

---

## SP Summary

| Group | Items | SP |
|-------|-------|-----|
| AI Reference pages (R) | 5 | 13 |
| Core CC pages (P) | 4 | 8 |
| UX features (F) | 8 | 12 |
| Content reviews (C) | 9 | 9 |
| Infrastructure (I) | 3 | 4 |
| Bugs (B) | 2 | 2 |
| **Total done** | **24+** | **38** |
| **Remaining** | **14** | **27** |
