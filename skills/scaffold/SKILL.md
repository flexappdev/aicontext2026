---
name: scaffold
description: Generate new pages, API routes, or server actions following AgentAI project patterns. Use when the user says "scaffold", "/scaffold", "create page", "add route", "new action", or wants to generate boilerplate code for a new feature area. Supports pages, API routes, and server actions.
---

# Scaffold

Generate files following established AgentAI patterns.

## Before Scaffolding

1. Read `agentai.json` for project config, routes, and schema definitions
2. Check existing similar files for the current pattern (e.g., read an existing page, action, or API route)
3. Identify which nav sections need updating (left-sidebar.tsx, top-navigation.tsx, readme-panel.tsx)

## Page Scaffold (`/scaffold page <route>`)

Create `app/(app)/<route>/page.tsx` following this pattern:

- Use `"use client"` only if the page needs interactivity
- Import from `@/providers/org-provider` if org context needed
- Import from `@/lib/supabase/client` for data fetching
- Use Tailwind theme classes: `bg-card`, `text-foreground`, `border-border`, `text-muted-foreground`
- Use `var(--org-accent)` via style prop for accent-colored elements
- Page heading: `text-2xl font-heading font-normal text-foreground`
- Cards: `rounded-lg border border-border bg-card p-6`
- Section headers: `text-sm font-semibold text-foreground uppercase tracking-wider font-mono`
- Add route to `routeTitles` in top-navigation.tsx
- Add route to `routeReadme` in readme-panel.tsx
- Add nav item to left-sidebar.tsx if it's a new section

## API Route Scaffold (`/scaffold api <path>`)

Create `app/api/<path>/route.ts`:

- Export named handlers: `GET`, `POST`, `PUT`, `DELETE`
- Use Supabase server client from `@/lib/supabase/server`
- Validate request body with Zod
- Return `NextResponse.json()` with appropriate status codes
- Include org_id scoping for multi-tenant queries
- Handle errors with try/catch returning 500

## Server Action Scaffold (`/scaffold action <name>`)

Create in `actions/<name>.ts`:

- Add `"use server"` directive
- Use Supabase server client
- Accept `FormData` parameter
- Return `{ error?: string; success?: boolean; data?: T }`
- Validate with Zod before DB operations
- Follow the pattern in `actions/auth.ts`

## After Scaffolding

1. Run `npx next build` to verify no errors
2. Report what was created and what nav entries were added
