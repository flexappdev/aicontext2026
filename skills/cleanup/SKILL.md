---
name: cleanup
description: Clean up the AgentAI codebase — fix lint issues, remove unused imports/deps, optimize bundle. Use when the user says "cleanup", "/cleanup", "clean", "fix lint", "remove unused", or wants to tidy the codebase.
---

# Cleanup

Tidy the AgentAI codebase.

## Tasks

### Fix Lint Issues
1. Run `npx next lint` to find issues
2. Fix auto-fixable issues
3. Report remaining manual fixes needed

### Remove Unused Imports
1. Scan all .tsx/.ts files for unused imports
2. Remove them
3. Verify build still passes

### Check Unused Dependencies
1. Read package.json dependencies
2. Search codebase for actual usage of each dep
3. List deps that appear unused
4. Suggest removal (don't auto-remove without confirmation)

### Theme Consistency
1. Search for hardcoded color values that should use CSS variables:
   - Grep for `#060e1a`, `#0a1628`, `#0d1f3c` (old blue palette)
   - Grep for `#E8602C` (old orange accent)
   - Grep for `rgba(0, 102, 153` or `rgba(0,102,153` (old border color)
   - Grep for `rgba(180, 200, 220` (old muted text)
   - Grep for `rgba(232, 96, 44` or `rgba(232,96,44` (old accent rgba)
2. Report files with legacy colors
3. Suggest replacements using theme classes

### File Organization
1. Check for empty directories
2. Check for duplicate logic across files
3. Verify all imports use `@/` alias (not relative `../../../`)

## Process

1. Run all checks above
2. Present findings as a summary table
3. Ask user which fixes to apply
4. Apply approved fixes
5. Run `npx next build` to verify nothing broke
