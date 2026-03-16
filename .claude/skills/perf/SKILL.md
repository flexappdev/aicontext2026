---
name: perf
description: Analyze application performance — bundle size, build times, component complexity, and database query patterns. Use when the user says "perf", "/perf", "performance", "optimize", or wants to identify and fix performance bottlenecks.
---

# Performance Analyzer

Analyze and optimize AgentAI performance.

## Commands

### Bundle Analysis (`/perf bundle`)
1. Run `npx next build` and capture output
2. Parse route sizes from build output
3. Identify largest routes (by First Load JS)
4. Flag routes exceeding 200KB threshold
5. Suggest code-splitting opportunities
6. Report sorted route size table

### Build Time (`/perf build`)
1. Run `time npx next build` to measure total build time
2. Capture route generation timing
3. Identify slow-compiling routes
4. Report build duration breakdown

### Component Complexity (`/perf components`)
1. Scan `components/` and `app/` for .tsx files
2. Count lines, imports, and useState/useEffect hooks per file
3. Flag components with:
   - More than 300 lines
   - More than 15 imports
   - More than 5 useState calls
   - More than 3 useEffect calls
4. Suggest splitting opportunities
5. Report complexity table sorted by score

### Query Analysis (`/perf queries`)
1. Scan `actions/` for Supabase query patterns
2. Check for:
   - Missing `.eq("org_id", ...)` scoping
   - `select("*")` without column limiting
   - Missing `.limit()` on list queries
   - N+1 query patterns (queries in loops)
3. Report findings with file locations and suggestions

### Full Report (`/perf full`)
1. Run all analysis commands
2. Compile combined report
3. Prioritize findings by impact (high/medium/low)
4. Report actionable recommendations

## Output Format

```
Performance Report:
- Bundle: N routes, largest = X KB
- Build: N seconds
- Components: N complex (>300 lines)
- Queries: N issues found

Top 3 Recommendations:
1. ...
2. ...
3. ...
```

## Conventions

- Analysis is read-only — never modify code during perf checks
- Measure before and after when applying optimizations
- Focus on actionable recommendations, not micro-optimizations
