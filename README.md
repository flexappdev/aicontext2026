# AI Context 2026

A dark-mode AI reference site — a living cheat sheet for the 2026 AI landscape.

Served at `/ai/` (behind the images-pipeline server).

## Stack

- **React 18 + TypeScript** via Vite (SWC)
- **Tailwind CSS** — dark `#050507` background, green accent
- **react-markdown + remark-gfm** — renders `.md` files from `public/`
- **lucide-react** — icons

## Structure

```
src/
  App.tsx          # Two-panel layout: sidebar nav + main content
  content.ts       # Section registry — id, title, mdPath
  components/
    MarkdownPanel.tsx  # Fetches and renders a public/*.md file
    Footer.tsx
    Hero.tsx        # (unused — legacy template component)
    Features.tsx    # (unused — legacy template component)

public/            # Markdown content files (one per section)
  overview.md
  ai-apps.md
  models.md
  claude-code.md
  openclaw.md
  skills.md
  mcps.md
  playwright-mcp.md
  firecrawl-mcp.md
  workflows.md
  infrastructure.md
  abc-goal.md
  README.md
```

## Sections

| ID | Title | Content |
|----|-------|---------|
| overview | AI Context 2026 | Bullet overview — apps, models, tools, goal |
| ai-apps | AI Apps | Claude, ChatGPT, Gemini, Antigravity, AI Studio, Grok |
| models | Models | Claude Opus/Sonnet 4.6, GPT-5, Gemini 2.5 Pro, Llama 4 |
| claude-code | Claude Code (CC) | CLI, CLAUDE.md, Skills, MCPs, Subagents, Hooks |
| openclaw | Open Claw (OC) | Local AI gateway — route to any provider |
| skills | Skills | Reusable CC skills and invocable workflows |
| mcps | MCPs | MCP overview and available servers |
| mcp-playwright | MCP: Playwright | Browser automation via MCP |
| mcp-firecrawl | MCP: Firecrawl | Web scraping/crawling via MCP |
| workflows | Workflows | NotebookLM, VAD, AAD, AIS, PG workflows |
| infrastructure | Infrastructure | Vercel, AWS S3, MongoDB, Tailscale, Ollama |
| abc-goal | 2026 ABC Goal | Apps (13 sites) · Backoffice · Context |

## Dev

```bash
npm install
npm run dev      # http://localhost:8080/ai/
npm run build
npm run lint
```

## 2026 Goal: ABC

1. **Apps** — MSCORE, MSLISTS, MSTRAVEL across 13 sites
2. **Backoffice** — asset pipeline, curation, generation
3. **Context** — this site + CLAUDE.md + memory system
