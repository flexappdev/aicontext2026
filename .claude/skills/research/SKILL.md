---
name: research
description: Deep research for development decisions — web search, repo analysis, library comparison, and architecture review. Inspired by Perplexica and autoresearch. Use when the user says "research", "/research", "compare libraries", "find alternatives", or needs informed technical decisions before building.
---

# Research

Deep technical research for development decisions. Combines web search, GitHub analysis, and codebase context to produce actionable recommendations.

Inspired by: [Perplexica](https://github.com/ItzCrazyKns/Perplexica) (AI search engine), [autoresearch](https://github.com/karpathy/autoresearch) (autonomous research agent).

## Commands

```
/research library <need>       — Compare libraries for a specific need (e.g., "drag and drop", "rich text editor")
/research pattern <topic>      — Research architecture patterns (e.g., "workflow engine", "kanban board")
/research api <service>        — Research an API's capabilities and integration approach
/research stack <question>     — Answer a stack-level question with evidence
/research competitor <product> — Analyze a competing product's approach
```

## Process

### /research library <need>

1. **Define requirements** — What does AgentAI need? (features, bundle size, TypeScript support, maintenance status)
2. **Search** — Web search for "best <need> library React 2026", "npm <need> comparison"
3. **Shortlist** — Pick top 3-5 candidates
4. **Evaluate each** — Check:
   - GitHub stars, last commit, open issues
   - Bundle size (bundlephobia)
   - TypeScript support
   - Framework compatibility (Next.js App Router, React Server Components)
   - Community activity
5. **Recommend** — Output comparison table + recommendation with rationale

### /research pattern <topic>

1. **Search** — Web search for "<topic> architecture pattern", "<topic> best practices 2026"
2. **Analyze** — How do popular projects implement this? (check starred repos, open-source examples)
3. **Contextualize** — How does this pattern fit AgentAI's stack?
   - Supabase for data? MongoDB for engine?
   - Server actions or API routes?
   - Client components or server components?
4. **Propose** — Concrete implementation sketch with file paths and pseudocode

### /research api <service>

1. **Fetch docs** — Get the API reference via WebFetch
2. **Summarize** — Key endpoints, auth method, rate limits, pricing
3. **Integration sketch** — How to integrate into AgentAI:
   - Environment variables needed
   - Server action or API route wrapper
   - Error handling approach
   - Type definitions

### /research stack <question>

1. **Search** — Multiple web searches with different phrasings
2. **Cross-reference** — Check official docs, Stack Overflow, GitHub discussions
3. **Synthesize** — Answer with citations and code examples where applicable
4. **Verify** — Does the answer hold for our specific versions? (Next.js 15, React 19, Supabase v2)

## Output Format

Always include:
- **Sources** — Links to references used
- **Confidence** — High/Medium/Low based on source quality
- **Next steps** — Concrete actions (create PBI, install package, create migration, etc.)

## Conventions

- Always cite sources with URLs
- Prefer official documentation over blog posts
- Check compatibility with the AgentAI stack before recommending
- When comparing libraries, always check the last commit date — abandoned projects are a red flag
- Never recommend a library without checking its license compatibility (MIT, Apache 2.0 preferred)
