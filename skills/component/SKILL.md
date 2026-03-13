---
name: component
description: Build reusable UI components following AgentAI design patterns — theme-aware styling, proper TypeScript interfaces, and consistent structure. Use when the user says "component", "/component", "build component", or wants to create a new UI component.
---

# Component Builder

Create reusable UI components following AgentAI conventions.

## Command

```
/component <name> [--variant card|form|list|modal|widget]
```

## Process

### 1. Analyze
- Determine component purpose and where it will be used
- Check `components/` for similar existing components to follow patterns
- Identify required props and state

### 2. Create Component

Create `components/<category>/<name>.tsx`:

```typescript
"use client";

import { useState } from "react";

interface <Name>Props {
  // typed props
}

export function <Name>({ ...props }: <Name>Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {/* component content */}
    </div>
  );
}
```

### 3. Style Rules

- **Cards**: `rounded-lg border border-border bg-card p-6`
- **Section headers**: `text-xs font-mono uppercase tracking-wider text-muted-foreground`
- **Page headings**: `text-2xl font-heading font-normal text-foreground`
- **Accent color**: `style={{ color: "var(--org-accent)" }}` — never hardcoded
- **Hover states**: `hover:bg-white/5 hover:text-foreground`
- **Active states**: `bg-white/5` with accent border via style prop
- **Badges**: `px-1.5 py-0.5 rounded text-[10px] font-mono`
- **Icons**: Import from `lucide-react`, size `w-4 h-4` or `w-3.5 h-3.5`

### 4. Variants

- **card** — Bordered card with header, body, optional footer
- **form** — Form with labeled inputs, validation, submit/cancel buttons
- **list** — Scrollable list with search, filter, and item click handler
- **modal** — Dialog overlay using `ConfirmDialog` pattern or custom
- **widget** — Compact dashboard widget with metric and sparkline

### 5. Verify

1. Import and render the component in a page
2. Run `npx next build` to verify no errors
3. Check that all theme classes are used (no hardcoded colors)

## File References

- Shared components: `components/shared/` (StatusBadge, ConfirmDialog, etc.)
- UI primitives: `components/ui/` (Button, Tabs, etc.)
- Feature components: `components/<feature>/` (agent-card, persona-form, etc.)

## Conventions

- Export named functions, not default exports
- Use `"use client"` only if the component uses hooks or event handlers
- Props interface named `<Name>Props`
- Destructure props in function signature
