---
name: feature
description: Build a complete feature end-to-end in AgentAI. Use when the user says "build feature", "/feature", "implement", or wants to create a full feature with page, API, types, and server actions. This creates everything needed for a working feature area.
---

# Feature Builder

Build a complete feature with all layers.

## Process

1. **Understand** — Ask what the feature does, which data it needs, and which personas/agents/skills schema sections it touches. Read `agentai.json` for schema reference.

2. **Plan** — Enter plan mode. Identify all files to create/modify:
   - Types (if new data shape)
   - Server actions or API routes
   - Page component(s): list, detail, create, edit
   - Nav entries (sidebar, top-nav, readme-panel)
   - QA test cases

3. **Implement** — Build each layer:

### Types
- Create in `lib/types/<feature>.ts` if new data shapes needed
- Use Zod schemas that match Supabase table columns
- Export both the Zod schema and inferred TypeScript type

### Data Layer
- Server actions in `actions/<feature>.ts` for mutations
- API routes in `app/api/<feature>/route.ts` for client fetches
- Always scope queries with `org_id` from auth context
- Use Supabase server client for server actions, browser client for client components

### Pages
- List page: search, filter, status badges, create button
- Detail page: tabbed sections, edit/archive actions
- Create/Edit page: form with Zod validation, loading states
- Follow existing theme classes (bg-card, border-border, text-foreground, etc.)

### Navigation
- Add to `left-sidebar.tsx` sections array with appropriate icon
- Add to `top-navigation.tsx` routeTitles
- Add to `readme-panel.tsx` routeToModule and routeReadme

### QA
- Add route health check to QA test cases in `app/(app)/qa/page.tsx`
- Add feature-specific tests if the feature has testable client behavior

4. **Verify** — Run `npx next build` and confirm zero errors

5. **Report** — List all files created/modified with line counts

## Conventions

- Supabase for relational data (personas, agents, skills, orgs)
- MongoDB for engine/generation data (generated_personas, jobs)
- Lucide icons for all UI icons
- shadcn/ui components for form elements
- Font classes: `font-heading` for titles, `font-mono` for labels/badges
