# NotebookLM

Google's AI-powered research and content creation tool. Add sources, ask questions, generate podcasts, slides, infographics, and video scripts.

**URL:** [notebooklm.google.com](https://notebooklm.google.com)

---

## What It Does

NotebookLM acts as an AI research assistant grounded in **your sources** — it only uses what you give it, no hallucination from general training.

| Feature | Description |
|---------|-------------|
| **Audio Overview** | AI-generated podcast from your sources (2 hosts) |
| **Briefing Doc** | Comprehensive summary of all sources |
| **Study Guide** | Key questions + answers, glossary |
| **FAQ** | Frequently asked questions from sources |
| **Timeline** | Chronological view of events in sources |
| **Infographic** | Visual summary (portrait, dark mode) |
| **Slide Deck** | Presentation from sources |

---

## Source Types

| Type | Details |
|------|---------|
| Google Docs | Direct import |
| Google Slides | Direct import |
| PDFs | Upload or Drive |
| Web URLs | Paste any URL |
| YouTube | Paste YouTube link |
| Audio files | MP3, WAV, etc. |
| Text / Markdown | Paste directly |
| Copy-paste | Any text content |

**Limit:** 50 sources per notebook, 500K words total

---

## Content Pipeline (Workflow 1)

The full VAD/AAD content creation pipeline:

```
1. SOURCES      Add URLs, PDFs, YouTube videos, docs to notebook
2. AUDIO        Generate Audio Overview (podcast, ~20 min)
3. INFOGRAPHIC  Generate portrait (vertical) dark mode cinematic
4. SLIDES       Generate dark mode cinematic presentation
5. BLOG         Write 5 key topics, ~1000 words
6. VIDEO SCRIPT Write 5 key topics landscape 16:9
7. THUMBNAIL    Generate high-CTR YouTube thumbnail
8. YOUTUBE      Write title, description, hashtags
9. SAVE         ~/VIDEOS/2026/NN-Title/
```

---

## Prompt Templates

### Video Script
```
Video in 5 key topics, Landscape 16x9 cinematic dark mode video,
infographics and 3D inspired visuals
```

### Infographic
```
Dark mode cinematic infographic portrait (vertical),
following the structure of the video
```

### Blog Post
```
Blog post in 5 key topics with about 1000 words,
following the structure of the video
```

### Thumbnail
```
YouTube thumbnail, high click-rate, dark mode cinematic,
bold title text, dramatic lighting
```

### YouTube Description
```
Write a YouTube title, description and 5 hashtags.
No intro sentence. No "in this video". No references to sources.
```

---

## Tips & Best Practices

| Tip | Detail |
|-----|--------|
| **Ground your notebook** | Add primary sources first before generating |
| **Use YouTube** | Paste YouTube URLs for auto-transcription |
| **Cite check** | Click any claim to see which source it came from |
| **Customize podcast** | Can add focus instructions before generating |
| **Studio mode** | Audio Overview can be interrupted and redirected |
| **Share** | Notebooks can be shared publicly or with specific accounts |

---

## NotebookLM vs ChatGPT vs Claude

| Feature | NotebookLM | ChatGPT | Claude |
|---------|-----------|---------|--------|
| Source grounding | ✅ Always | ⚠️ Optional | ⚠️ Optional |
| Audio podcast | ✅ Native | ❌ | ❌ |
| Max context | 500K words | 128K | 200K |
| Hallucination | Very low | Medium | Low |
| Source citations | ✅ Inline | ❌ | ⚠️ |
| Free tier | ✅ Yes | ✅ Limited | ✅ Limited |

---

## Integration with AI Workflow

```
NotebookLM                      →  Content creation (blog, video, podcast)
Claude Code + CLAUDE.md         →  App development
Gemini (AI Studio)              →  API testing, image generation
Veo 3 / Sora                    →  Video generation from script
ElevenLabs                      →  Voice cloning for audio
Midjourney / Flux               →  Thumbnail and infographic images
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/⌘ + Enter` | Send message |
| `Ctrl/⌘ + K` | New note |
| Click source citation | Jump to source |
| Three dots menu | Source options |

---

## 2026 Updates

- **Notebook sharing** — collaborate in real-time
- **Video Overviews** — Veo-powered video summaries (rolling out)
- **Longer audio** — extended podcast episodes
- **API access** — programmatic notebook creation (beta)
