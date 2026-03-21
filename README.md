# AI Context 2026

A dark-mode AI reference site — a living cheat sheet for the 2026 AI landscape.

_Last updated: 2026-03-21_

---

## Product

A single-page reference app covering the full 2026 AI stack: models, tools, workflows, and infrastructure. Built as the **Context** pillar of the 2026 ABC Goal — alongside Apps (13 sites) and Backoffice (asset pipeline).

**Sections:** AI Apps · Models · Claude Code · CC Pro Tips · Open Claw · Skills · MCPs · Workflows · Infrastructure · Sociology · Top 100 · AI History · AI People · AI Future · 2026 ABC Goal

**Live at:** `/ai/` (served behind the images-pipeline server)

---

## UX

- **Two-panel layout** — collapsible sidebar nav + main content area
- **Dark/light mode** — toggle with Sun/Moon button, persisted in localStorage
- **Full-text search** — instant cross-section search via `useSearchIndex` hook
- **Keyboard nav** — `j`/`k` or arrow keys to move between sections
- **Mobile drawer** — bottom nav drawer with overlay for small screens
- **Quick-ref mode** — collapsible cheat-card format (bullets only)
- **URL hash sync** — `#section-id` in URL, bookmarkable and shareable
- **Print/PDF export** — printer button + `@media print` CSS
- **Copy code blocks** — one-click copy via `CopyablePre` component
- **Recently visited** — last-viewed sections tracked in localStorage

---

## Tech

**Stack:** React 18 + TypeScript · Vite (SWC) · Tailwind CSS · react-markdown + remark-gfm · lucide-react

```
src/
  App.tsx              # Two-panel layout, nav, keyboard/mobile/search logic
  content.ts           # Section registry — id, title, mdPath, groups
  components/
    MarkdownPanel.tsx  # Fetches and renders a public/*.md file
    Footer.tsx
  hooks/
    useSearchIndex.ts  # Full-text search index across all markdown

public/                # Markdown content files (one per section, ~30 files)
.claude/skills/        # 32 reusable Claude Code skills
docs/                  # Project documentation (backlog, MCP guides, skills)
sociology/             # Source markdown for sociology sections
```

**Design tokens:** `#050507` background · green accent · CSS custom properties for dark/light

---

## Flow

```bash
npm install
npm run dev      # http://localhost:8080/ai/
npm run build    # outputs to dist/
npm run lint
```

**Content editing:** Add or edit `.md` files in `public/`, then register the section in `src/content.ts`.

**Adding a skill:** Create `.claude/skills/<name>/SKILL.md` with frontmatter (`name`, `description`) and invoke with `/name`.

**CI/CD:** GitHub Actions runs lint + build on every push (`.github/workflows/ci.yml`).

---

## Prod

- **Base path:** `/ai/` — configured in `vite.config.ts`
- **Host:** Images-pipeline server (reverse proxy to `dist/`)
- **Build output:** `dist/` — static files, no server required
- **Deployment:** `npm run build` → copy `dist/` to server → served at `/ai/`
- **SEO:** OG + Twitter meta tags in `index.html`

---

_See [docs/](docs/) for backlog, MCP guides, and skills reference._
