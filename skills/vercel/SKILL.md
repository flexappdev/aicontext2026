---
name: vercel
description: Vercel operations — sync env vars from .env.local, manage deployments, check status, promote, rollback, and configure project settings. Use when the user says "vercel", "/vercel", "deploy to vercel", "sync env", "vercel env", or wants to manage the Vercel deployment.
---

# Vercel — Deployment & Environment Management

Manage Vercel deployments, environment variables, and project configuration for AgentAI.

## Prerequisites

- Vercel CLI installed: `npm i -g vercel`
- Project linked: `.vercel/project.json` must exist (run `vercel link` if not)
- Authenticated: `vercel whoami` must return a valid user

## Arguments

```
/vercel env sync          — Sync all .env.local vars to Vercel (production)
/vercel env diff          — Compare .env.local vs Vercel env vars
/vercel env add <KEY>     — Add a single env var to Vercel
/vercel env rm <KEY>      — Remove a var from Vercel
/vercel deploy            — Trigger a production deployment
/vercel status            — Show latest deployment status
/vercel logs              — Show recent deployment logs
/vercel rollback          — Rollback to previous deployment
/vercel domains           — List configured domains
```

## Process

### /vercel env sync

Sync environment variables from `.env.local` to Vercel production:

1. Read `.env.local` and parse all `KEY=VALUE` pairs
2. Run `vercel env ls` to get currently configured vars
3. Identify missing vars (in .env.local but not on Vercel)
4. Identify extra vars (on Vercel but not in .env.local)
5. Skip local-only vars that don't apply to production:
   - `OLLAMA_URL` (localhost service)
   - `OLLAMA_DEFAULT_MODEL` (local model)
   - Any var with `localhost` or `127.0.0.1` in its value
6. For each missing var, add to Vercel production:
   ```bash
   echo "<value>" | vercel env add <KEY> production
   ```
7. Report what was synced, skipped, and any conflicts

**Important:** Never display env var values in output. Show only key names and sync status.

### /vercel env diff

Compare local vs Vercel environment:

1. Parse `.env.local` key names
2. Run `vercel env ls` to get Vercel key names
3. Report:
   ```
   Env Var Diff:
   ✓ KEY_NAME          — in both
   + KEY_NAME          — local only (missing from Vercel)
   - KEY_NAME          — Vercel only (not in .env.local)
   ⚠ KEY_NAME          — local-only, skipped (localhost value)
   ```

### /vercel env add <KEY>

Add a single variable:

1. Read the value from `.env.local`
2. If not found locally, ask the user for the value
3. Run `echo "<value>" | vercel env add <KEY> production`
4. Confirm success

### /vercel deploy

Trigger a production deployment:

1. Run `npx next build` to verify build passes locally
2. Check `git status` — warn if uncommitted changes
3. Run `vercel --prod` to deploy
4. Report deployment URL and status

### /vercel status

Show deployment status:

1. Run `vercel ls --limit 5` to show recent deployments
2. Run `vercel inspect <latest-url>` for details
3. Report: URL, state, created time, branch, commit

### /vercel logs

Show recent logs:

1. Run `vercel logs <latest-deployment-url> --limit 100`
2. Filter for errors and warnings
3. Report findings

### /vercel rollback

Rollback to previous deployment:

1. Run `vercel ls --limit 5` to show recent deployments
2. Ask user to confirm which deployment to promote
3. Run `vercel promote <deployment-url>`
4. Confirm rollback

## Conventions

- Always use `production` environment for env vars (not preview/development)
- Never display environment variable values — show only key names
- Always build-check locally before deploying
- Vercel scope: `flexappdev` (linked to `flexappdev` GitHub account)
- Project ID: `prj_Yuqhm1VAO6yqTPnCOfKUbddl7xmB`
- Vercel project name: `agentai`
- Production URL: `https://agentai-gray.vercel.app/`
- Dashboard: `https://vercel.com/flexappdev/agentai`
