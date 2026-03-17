# Backlog — AI Context 2026

_Last updated: 2026-03-17_

---

## Summary

| Status | Count | SP |
|--------|-------|-----|
| ✅ DONE | 34 | 54 |
| 🔄 WIP | 0 | — |
| 📋 DO | 13 | 27 |

---

## ✅ DONE

| ID | Section / Feature | Effort | SP | Priority | Notes |
|----|-------------------|--------|----|----------|-------|
| S01 | Overview section (inline bullets) | S | 1 | high | Live in content.ts |
| S07 | MCP: Playwright page | M | 2 | high | `/ai/playwright-mcp.md` |
| S08 | MCP: Firecrawl page | M | 2 | high | `/ai/firecrawl-mcp.md` |
| F00 | Remove Hero.tsx / Features.tsx | S | 1 | high | Dead code deleted |
| P01 | Subagents page | M | 2 | high | `/ai/subagents.md` |
| P02 | Hooks page | M | 2 | high | `/ai/hooks.md` |
| P03 | CLAUDE.md page | M | 2 | high | `/ai/claude-md.md` |
| P04 | Memory page | M | 2 | high | `/ai/memory.md` |
| P05 | NotebookLM page | M | 2 | high | `/ai/notebooklm.md` |
| P06 | Ollama page | M | 2 | medium | `/ai/ollama.md` |
| P07 | Tailscale page | S | 1 | medium | `/ai/tailscale.md` |
| R01 | Top 100 AI page | L | 3 | high | `/ai/top100.md` |
| R02 | AI History page | L | 3 | medium | `/ai/ai-history.md` |
| R03 | AI Models reference page | L | 3 | high | `/ai/ai-models-ref.md` |
| R04 | AI People page | M | 2 | medium | `/ai/ai-people.md` |
| R05 | AI Future page | M | 2 | medium | `/ai/ai-future.md` |
| F01 | Keyboard nav (j/k / arrows) | M | 2 | medium | keydown in App.tsx |
| F02 | URL hash sync (`#section-id`) | M | 2 | medium | replaceState on nav |
| F03 | Sidebar section grouping | M | 2 | medium | groups in content.ts |
| F05 | Copy-to-clipboard on code blocks | S | 1 | medium | CopyablePre in MarkdownPanel |
| F08 | Recently visited sections | S | 1 | medium | localStorage in App.tsx |
| C03 | Claude Code — verified & path fix | S | 1 | medium | `.claude/skills/` path corrected |
| C05 | Skills — path fix | S | 1 | medium | `.claude/skills/` path corrected |
| C06 | MCPs — verified accurate | S | 1 | low | No changes needed |
| C07 | Workflows — verified accurate | S | 1 | low | No changes needed |
| C08 | Infrastructure — verified accurate | S | 1 | low | No changes needed |
| C09 | 2026 ABC Goal — verified accurate | S | 1 | low | No changes needed |
| C02 | Models — verified current | S | 1 | low | No changes needed |
| C04 | Open Claw — verified accurate | S | 1 | low | No changes needed |
| I01 | CI/CD — GitHub Actions | M | 2 | high | `.github/workflows/ci.yml` |
| I03 | Meta tags / SEO | S | 1 | medium | OG + Twitter in index.html |
| B03 | vite.config.ts base `/ai/` confirmed | S | 1 | low | Verified ✓ |
| B04 | `.gitignore` — add node_modules/dist | S | 1 | medium | Fixed 2026-03-17 |
| W01 | NotebookLM workflow docs | M | 2 | high | Covered by P05 notebooklm.md |

---

## 🔄 WIP

_(none)_

---

## 📋 DO

### High Priority

| ID | Feature | Effort | SP | Skill | Notes |
|----|---------|--------|----|-------|-------|
| F07 | Full-text search across markdown | L | 3 | `/feature` | Search all .md content, not just titles |
| C01 | AI Apps — expand content | S | 1 | content | Add more apps, update descriptions |

### Medium Priority

| ID | Feature | Effort | SP | Skill | Notes |
|----|---------|--------|----|-------|-------|
| F04 | Mobile bottom nav / drawer | L | 3 | `/component` | Sidebar unusable on mobile currently |
| W02 | VAD workflow docs | M | 2 | content | Video a Day pipeline |
| W03 | AAD workflow docs | M | 2 | content | App a Day pipeline |
| W05 | PG workflow docs | M | 2 | content | Prod Game full cycle |

### Low Priority

| ID | Feature | Effort | SP | Skill | Notes |
|----|---------|--------|----|-------|-------|
| F06 | Dark/light mode toggle | M | 2 | `/component` | Already dark, toggle optional |
| F09 | Print / PDF export | M | 2 | `/component` | Nice to have |
| F10 | Version badges / last-updated dates | M | 2 | `/component` | Per-section freshness indicator |
| F11 | External links per page | S | 1 | content | Docs, GitHub, official sites |
| F12 | Collapsible cheat card format | M | 2 | `/component` | Quick-ref mode |
| P08 | Sociology — port markdown | M | 2 | `/add` | Port `sociology/` into app |
| W04 | AIS workflow docs | S | 1 | content | Accounts / API key management |

---

## Remaining SP by Priority

| Priority | Items | SP |
|----------|-------|----|
| High | F07, C01 | 4 |
| Medium | F04, W02, W03, W05 | 9 |
| Low | F06, F09, F10, F11, F12, P08, W04 | 12 |
| **Total remaining** | **13** | **27** |
