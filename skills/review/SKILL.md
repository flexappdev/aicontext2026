---
name: review
description: Code review for AgentAI project conventions. Use when the user says "review", "/review", "check code", "audit", or wants to verify code quality, theme consistency, and pattern adherence across the codebase.
---

# Code Review

Review code against AgentAI conventions.

## Checklist

### Theme & Styling
- [ ] No hardcoded colors — use CSS variable classes: `bg-card`, `bg-background`, `bg-secondary`, `text-foreground`, `text-muted-foreground`, `border-border`
- [ ] Accent color via `style={{ color/backgroundColor: "var(--org-accent)" }}` — never hardcoded hex
- [ ] Fallback in style props: `var(--org-accent, #006699)`
- [ ] No references to old blue palette (#060e1a, #0a1628, #0d1f3c) or old orange (#E8602C)
- [ ] Font classes: `font-heading` for titles, `font-mono` for code/labels, `font-sans` for body

### Component Patterns
- [ ] Pages use `"use client"` only when needed (interactivity, hooks)
- [ ] Cards use `rounded-lg border border-border bg-card p-6`
- [ ] Section headers use `text-sm font-semibold text-foreground uppercase tracking-wider font-mono`
- [ ] Active states use `bg-white/5` + accent border via style prop
- [ ] Hover states use `hover:bg-white/5 hover:text-foreground`

### Data & Auth
- [ ] All Supabase queries scoped by org_id
- [ ] Server actions use Supabase server client (not browser client)
- [ ] Client components use Supabase browser client
- [ ] Zod validation before any DB mutation
- [ ] Error handling with try/catch, typed error responses

### Navigation
- [ ] New routes added to all 3 nav files: left-sidebar.tsx, top-navigation.tsx, readme-panel.tsx
- [ ] Route has entry in routeTitles, routeReadme, and routeToModule
- [ ] Sidebar icon imported from lucide-react and added to iconMap

### Structure
- [ ] No unused imports
- [ ] No console.log left in production code
- [ ] TypeScript strict mode satisfied (no any without eslint-disable comment)
- [ ] Exports match what's imported elsewhere

## Process

1. Read the files being reviewed
2. Check each item against the checklist
3. Report findings grouped by category (pass/warn/fail)
4. Suggest specific fixes for any failures
