---
name: deploy
description: Pre-deployment verification for AgentAI. Use when the user says "deploy", "/deploy", "build check", "pre-push", or wants to verify the app is ready to deploy. Runs build, type-check, lint, and summarizes QA status.
---

# Deploy Check

Verify AgentAI is ready to deploy.

## Steps

1. **Type Check**
   ```bash
   npx tsc --noEmit
   ```
   Report any TypeScript errors.

2. **Lint**
   ```bash
   npx next lint
   ```
   Report any lint warnings/errors.

3. **Build**
   ```bash
   npx next build
   ```
   Must succeed with zero errors. Report route count and any warnings.

4. **Git Status**
   ```bash
   git status
   git log --oneline -5
   ```
   Check for uncommitted changes. Warn if working tree is dirty.

5. **Env Check**
   Verify `.env.local` exists and contains required keys:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - MONGO_URI (if engine features enabled)

6. **Summary Report**
   ```
   Deploy Readiness:
   - TypeScript: PASS/FAIL
   - Lint: PASS/FAIL (N warnings)
   - Build: PASS/FAIL (N routes)
   - Git: Clean/Dirty
   - Env: PASS/FAIL

   Verdict: READY / NOT READY
   ```

If all checks pass, ask user if they want to push to main.
