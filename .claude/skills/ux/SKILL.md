---
name: ux
description: "Review the whole site UX flow across mobile, tablet, and desktop. Check each page for responsiveness, accessibility, interaction patterns, and visual consistency. Update design-system and storybook pages, and add UX improvement PBIs to the backlog."
---

# UX Review & Design System Audit

Full-site UX analysis: review every page for mobile/tablet/desktop responsiveness, interaction quality, accessibility, and design consistency. Maintains the design-system and storybook reference pages.

## Command

```
/ux [mode]
```

Modes: `full` (default), `audit`, `responsive`, `a11y`, `storybook`, `design-system`

## Full UX Review (`/ux` or `/ux full`)

Runs all 6 phases in sequence:

### Phase 1 — Responsive Audit

For every page in the app, check:

1. **Mobile (< 640px)**
   - Content doesn't overflow horizontally
   - Touch targets are >= 44px
   - Text is readable (>= 14px body)
   - Navigation is accessible (hamburger menu works)
   - Cards stack vertically
   - Tables switch to card/list view
   - Modals/dialogs are full-screen or fit viewport
   - No horizontal scroll

2. **Tablet (640px–1024px)**
   - Two-column layouts adapt (sidebar + content)
   - Split-pane views collapse or stack
   - Top navigation items are accessible
   - Cards show 2-per-row grid

3. **Desktop (> 1024px)**
   - Three-panel layout renders (left sidebar + content + right panel)
   - Content area uses max-width for readability
   - Hover states are visible
   - Keyboard navigation works

### Phase 2 — Interaction Quality

For each page, verify:

1. **Loading states** — Skeleton loaders or spinners while data loads
2. **Empty states** — Helpful message when no data exists
3. **Error states** — Graceful error handling with retry
4. **Form validation** — Inline errors, scroll-to-error
5. **Unsaved changes** — Warning before navigation
6. **Success feedback** — Toast/banner on successful actions
7. **Keyboard navigation** — Tab order, focus rings, Enter/Escape handling
8. **Scroll behavior** — Sticky headers, scroll-to-top, infinite scroll vs pagination

### Phase 3 — Accessibility (a11y)

Check WCAG 2.1 AA compliance:

1. **Color contrast** — Text/background ratio >= 4.5:1 (3:1 for large text)
2. **ARIA labels** — All interactive elements have accessible names
3. **Alt text** — Images have descriptive alt attributes
4. **Focus management** — Visible focus indicators, logical tab order
5. **Screen reader** — Semantic HTML, landmarks, live regions
6. **Motion** — Respect prefers-reduced-motion
7. **Touch targets** — Minimum 44x44px on mobile

### Phase 4 — Visual Consistency

Verify adherence to the design system:

1. **Typography** — Correct font families (DM Sans, JetBrains Mono, Instrument Serif)
2. **Colors** — Using CSS custom properties, not hardcoded colors
3. **Spacing** — Consistent padding/margins per component type
4. **Border radius** — Using Tailwind radius tokens
5. **Icons** — All from lucide-react, consistent sizing (w-4 h-4 default)
6. **Shadows** — Minimal, consistent with theme
7. **Component patterns** — Cards, badges, buttons follow established patterns

### Phase 5 — Design System Update

Update the design-system page (`/design-system`) with:

1. **Tools & Libraries** — All design dependencies from package.json
2. **Color Tokens** — Full palette with CSS custom property names
3. **Typography Scale** — Font families, sizes, weights
4. **Spacing System** — Padding/margin conventions
5. **Component Patterns** — Card, button, badge, input conventions
6. **Responsive Breakpoints** — sm, md, lg, xl definitions
7. **Theme System** — Dark/light mode, accent color mechanics

### Phase 6 — Storybook Update

Update the storybook page (`/storybook`) with:

1. **Component Registry** — Every component used in the app
2. **Per-Page Mapping** — Which components each page uses
3. **Component Previews** — Live rendering of each component variant
4. **Props Documentation** — Interface/type definitions
5. **Usage Examples** — Code snippets for common patterns

## Individual Modes

### `/ux audit` — Quick audit (Phase 1-4)
Run responsive, interaction, a11y, and visual checks. Report issues but don't update pages.

### `/ux responsive` — Responsive only (Phase 1)
Check every page at mobile/tablet/desktop breakpoints.

### `/ux a11y` — Accessibility only (Phase 3)
Run WCAG 2.1 AA compliance checks.

### `/ux storybook` — Update storybook page (Phase 6)
Scan all pages, catalog components, update `/storybook` page.

### `/ux design-system` — Update design system page (Phase 5)
Update `/design-system` page with current tokens, patterns, and conventions.

## How to Check Each Page

For each route in the app:

1. Read the page file: `app/(app)/<route>/page.tsx`
2. Identify all components imported and used
3. Check responsive classes (sm:, md:, lg:, xl: prefixes)
4. Verify mobile-first patterns (default = mobile, sm+ = tablet, lg+ = desktop)
5. Check for `hidden` / `lg:flex` / `lg:hidden` patterns
6. Verify touch target sizes on interactive elements
7. Check color contrast of text elements
8. Verify loading/empty/error state handling

## Adding UX PBIs to Backlog

For each issue found, add a PBI to `lib/sidebar/backlog-data.ts`:

```typescript
{
  id: "ux-<N>",
  module_id: "ux",
  title: "UX: <description>",
  description: "<details of the issue and fix approach>",
  status: "do",
  effort: "<S|M|L|XL>",
  sp: <1|2|3|5>,
  priority: "<critical|high|medium|low>",
  agent: "ui-agent",
  skill: "/ux",
  page: "<affected route>",
  sort_order: <next>,
}
```

Priority classification:
- **critical** — Broken on mobile, inaccessible, content overflow
- **high** — Missing loading states, poor touch targets, no empty states
- **medium** — Inconsistent spacing, missing hover states, minor a11y gaps
- **low** — Polish items, animation smoothness, nice-to-have enhancements

## File References

- Design system page: `app/(app)/design-system/page.tsx`
- Storybook page: `app/(app)/storybook/page.tsx`
- UX/Theme editor: `app/(app)/ux/page.tsx`
- Global styles: `app/globals.css`
- Theme provider: `providers/theme-provider.tsx`
- UI components: `components/ui/*.tsx` (14 shadcn components)
- Layout components: `components/layout/*.tsx`
- Feature components: `components/{agents,personas,skills,playground,industries,roadmaps}/*.tsx`
- Shared components: `components/shared/*.tsx`
- Backlog PBIs: `lib/sidebar/backlog-data.ts`
- Package deps: `package.json`
- Navigation: `components/layout/left-sidebar.tsx`
- Route titles: `components/layout/top-navigation.tsx`
- Guide panel: `components/layout/readme-panel.tsx`

## Key Routes to Review (48 total)

| Section | Routes |
|---------|--------|
| Core | `/` |
| Auth | `/auth/login`, `/auth/signup`, `/auth/forgot-password`, `/auth/reset-password` |
| Build | `/agents`, `/personas`, `/skills`, `/industry`, `/playground` + create/edit variants |
| Knowledge | `/assets`, `/vault` |
| Engine | `/engine`, `/engine/personas`, `/engine/generate`, `/engine/domains` |
| Explore | `/taxonomy`, `/village`, `/roadmap` |
| Workspace | `/workspaces`, `/settings`, `/profile` |
| UX | `/ux`, `/design-system`, `/storybook` |
| QA | `/qa`, `/qa/coverage`, `/backlog` |
| Docs | `/docs`, `/docs/api`, `/docs/tutorials`, `/docs/changelog`, `/history` |
| Lab | `/pixel-agents`, `/paperclip`, `/notebooklm`, `/agentai-workflow` |

## Conventions

- Always check mobile-first — default styles are mobile, then sm/md/lg override
- Use `hidden lg:flex` pattern for desktop-only elements
- Use `lg:hidden` pattern for mobile-only elements (hamburger, stacked layouts)
- All interactive elements need visible focus rings
- Touch targets: minimum 44x44px on mobile
- Loading skeletons should match the layout shape
- Empty states should guide the user to take action
- Error states should offer retry or alternative paths
- All colors from CSS custom properties, never hardcoded hex in components
- Icons from lucide-react only, default size w-4 h-4
