# Workflows 2026

Five core production workflows powering the daily ABC cycle.

---

## Workflow 1: NotebookLM (Content Pipeline)

See the dedicated **[NotebookLM](/ai/notebooklm.md)** page for the full pipeline.

**Quick reference:**
```
Sources → Audio Overview → Infographic → Slides → Blog → Video script → Thumbnail → YouTube
```

**Prompt templates:**
```
Video: 5 key topics, Landscape 16x9 cinematic dark mode, infographics and 3D inspired
Infographic: dark mode cinematic portrait (vertical), following structure of the video
Blog: 5 key topics, ~1000 words, following structure of the video
```

**Save path:** `~/VIDEOS/2026/NN-Title/`

---

## Workflow 2: VAD (Video a Day)

Daily video production pipeline for YouTube + TikTok.

### Steps

```
1. SOURCE     Screen capture / AI-generated / curated clip
2. EDIT       DaVinci Resolve (long-form) or CapCut (short-form / mobile)
3. THUMBNAIL  AI-generated in Midjourney — high CTR prompt:
              "YouTube thumbnail, bold title text, dark cinematic, dramatic lighting"
4. UPLOAD     YouTube (title + description + hashtags via NotebookLM)
              TikTok (recut to vertical, 30-60s)
5. SAVE       ~/VIDEOS/2026/NN-Title/
```

### File Naming

```
~/VIDEOS/2026/
  01-topic-name/
    raw.mp4
    edit.mp4
    thumbnail.png
    description.txt
```

### Tools

| Step | Tool |
|------|------|
| Screen capture | OBS Studio or Windows Game Bar |
| AI video | Veo 3, Sora, Kling |
| Edit | DaVinci Resolve (free) / CapCut |
| Thumbnail | Midjourney |
| Upload | YouTube Studio, TikTok Creator |
| Script | NotebookLM → Claude |

---

## Workflow 3: AAD (App a Day)

Daily app scaffold + ship workflow.

### Steps

```
1. SS         Screenshot inspiration or sketch spec
2. STITCH     Combine screenshots into PRD image (or describe in text)
3. PLAN       Claude: "Build this app: [description + image]"
4. SCAFFOLD   Claude Code: /add or /scaffold
5. BUILD      Antigravity / Cursor / Claude Code
6. QA         /qa → npm test → fix failures
7. DEPLOY     /push → vercel --prod
8. SHARE      GitHub link + Vercel URL
```

### Tech Choices by App Type

| App Type | Stack |
|----------|-------|
| Landing page | Vite + React + Tailwind |
| Dashboard | Next.js 15 + Supabase |
| Data app | Next.js + MongoDB |
| Tool / utility | Vite + React (this repo pattern) |
| API / backend | FastAPI or Hono |

### Prompting Claude for Scaffold

```
Build a [type] app:
- Stack: Vite + React + Tailwind
- Features: [list 3-5 features]
- Style: dark mode, #050507 bg, green accent
- Serve at: /[path]/

Start with the file structure, then implement.
```

---

## Workflow 4: AIS (Accounts / AI Studio)

Managing API keys, accounts, and provider credentials.

### Key Services

| Service | Purpose | Manage At |
|---------|---------|-----------|
| Anthropic | Claude API | console.anthropic.com |
| OpenAI | GPT API, DALL-E | platform.openai.com |
| Google | Gemini API, AI Studio | aistudio.google.com |
| Firecrawl | Web scraping | firecrawl.dev |
| ElevenLabs | Voice/TTS | elevenlabs.io |
| Runware | Image gen | runware.ai |
| Replicate | Open models | replicate.com |

### Key Management

```bash
# Store in ~/.env or per-project .env.local (never commit)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...
FIRECRAWL_API_KEY=fc-...
```

### Monthly Checklist

- Review API usage and costs per provider
- Rotate keys that haven't been rotated in 90+ days
- Check for unused subscriptions
- Update spending limits if needed
- Archive accounts no longer in use

---

## Workflow 5: PG (Prod Game)

The full Prod Game daily cycle — gamified productivity for the ABC goal.

### What is Prod Game?

ProdGame is a Pomodoro + gamification system for daily focus on the ABC pillars:
- **A** — Apps (MSCORE, MSLISTS, MSTRAVEL across 13 sites)
- **B** — Backoffice (BO26 — assets, media, generation)
- **C** — Context (this site + CLAUDE.md + memory)

### Daily Cycle

```
MORNING
  1. ProdGame checkin (Pomodoro session start)
  2. Review backlog → pick ONE task from A, B, or C

WORK
  3. /implement → write code
  4. /qa        → run tests
  5. /push      → ship it

EVENING
  6. Update Century Grid (daily progress visualization)
  7. NotebookLM content pipeline (if VAD/AAD day)
```

### App Routing

```bash
/mscore   → fad (Fashion a Day), ms (Main Site), spm
/mslists  → yb100 (YouTube 100), fi, sp, xmas
/mstravel → wbp, ybl, fix, mtd, lituk, wsl
```

### Desktop Layout (XPS16 — 3 Desktops)

| Desktop | Apps | Focus Area |
|---------|------|------------|
| 1 | VSC + Antigravity + Mongo Compass | MSCORE + Backoffice |
| 2 | Runware + Gemini + S3 + Stability Matrix | MSLISTS media pipeline |
| 3 | Cursor + YouTube Studio + TikTok | MSTRAVEL + content |

### PG Principles

1. **One task at a time** — no task switching mid-Pomodoro
2. **Ship daily** — even a tiny commit counts
3. **Context before code** — read CLAUDE.md before starting
4. **QA before push** — never push broken builds
5. **Grid never lies** — missed days are visible forever

---

## Cross-Workflow Tools

| Tool | Used In |
|------|---------|
| Claude Code | AAD, PG (implementation) |
| NotebookLM | VAD, W1 (content pipeline) |
| Veo 3 / Sora | VAD (video generation) |
| Midjourney | VAD (thumbnails), AAD (mockups) |
| ElevenLabs | VAD (voiceover) |
| Vercel | AAD (deployment) |
| GitHub | All workflows (source control) |
