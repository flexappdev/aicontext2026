---
name: github
description: GitHub operations via gh CLI — starred repos, repo analysis, issues, PRs, releases, and integration discovery. Use when the user says "github", "/github", "check stars", "starred repos", "github issues", or wants to interact with GitHub repositories.
---

# GitHub Operations

Interact with GitHub via the `gh` CLI (authenticated as `flexappdev`, scopes: gist, project, read:org, repo, workflow) for repo discovery, starred repo analysis, issue/PR management, Actions monitoring, and integration scouting.

## Commands

```
/github                     — Dashboard summary: latest 5 stars, 5 repos, 3 Actions runs, recent activity
/github stars               — List starred repos (filterable by language, searchable, sortable)
/github repos               — List own repos with public/private filter
/github search "query"      — Search GitHub repos or code
/github trending            — Trending repos (search API with date filter for recent high-star repos)
/github profile [user]      — User/org profile card
/github issues              — List/manage issues for current or specified repo
/github prs                 — List/manage PRs for current or specified repo
/github actions             — GitHub Actions run status for current or specified repo
/github gists               — List/manage gists
/github scout               — Full pipeline: stars → analyze → recommend integrations
```

## Process

### /github (dashboard)

1. Fetch latest 5 starred repos: `gh api "user/starred?per_page=5" -H "Accept: application/vnd.github.star+json" --jq '.[].repo | {name: .full_name, desc: .description, stars: .stargazers_count, lang: .language}'`
2. Fetch own 5 most recent repos: `gh repo list flexappdev --limit 5 --json name,description,isPrivate,stargazerCount,updatedAt`
3. Fetch 3 recent Actions runs: `gh run list --limit 3 --json databaseId,displayTitle,status,conclusion,updatedAt`
4. Fetch recent events: `gh api "users/flexappdev/events?per_page=10" --jq '.[].type'`
5. Present as a compact dashboard summary

### /github stars

1. Run `gh api "user/starred" -H "Accept: application/vnd.github.star+json" --paginate --jq '.[].repo | {name: .full_name, desc: .description, stars: .stargazers_count, lang: .language, topics: .topics, updated: .updated_at}'`
2. Support filters: `--language <lang>`, `--search <term>`, `--sort stars|updated|name`
3. Present as a table sorted by stars descending

### /github repos

1. Run `gh repo list flexappdev --json name,description,isPrivate,stargazerCount,language,updatedAt --limit 50`
2. Support filters: `--public`, `--private`, `--search <term>`
3. Present with visibility badges

### /github search "query"

1. Run `gh search repos "query" --json fullName,description,stargazersCount,language,updatedAt --limit 20`
2. Present as a ranked table

### /github trending

1. Calculate date 7 days ago
2. Run `gh api "search/repositories?q=created:>DATE+stars:>50&sort=stars&order=desc&per_page=20" --jq '.items[] | {name: .full_name, desc: .description, stars: .stargazers_count, lang: .language}'`
3. Present as a ranked table

### /github profile [user]

1. Run `gh api "users/<username>"` (defaults to `flexappdev`)
2. Extract: name, bio, company, location, public_repos, followers, following, created_at
3. Present as a profile card

### /github issues

1. Run `gh issue list --repo <repo> --json number,title,state,author,labels,createdAt --limit 20`
2. Support filters: `--state open|closed|all`, `--label <label>`
3. Present with state badges

### /github prs

1. Run `gh pr list --repo <repo> --json number,title,state,author,labels,createdAt --limit 20`
2. Support filters: `--state open|closed|merged|all`
3. Present with state badges

### /github actions

1. Run `gh run list --repo <repo> --json databaseId,displayTitle,status,conclusion,headBranch,updatedAt --limit 10`
2. Present with pass/fail badges and branch info

### /github gists

1. Run `gh gist list --limit 20`
2. Support: `--public`, `--secret`
3. Present with visibility badges

### /github scout

Full integration discovery pipeline:
1. Fetch all starred repos
2. Analyze each for AgentAI relevance
3. Group into tiers (Direct Integration / Pattern Adoption / Data Source / Reference)
4. For Tier 1 repos, propose concrete next steps:
   - Create a new skill? → Write SKILL.md
   - Add as dependency? → Specify package + integration points
   - Import data? → Describe the import pipeline
   - Adopt pattern? → Describe the pattern and where to apply it
5. Optionally create PBIs in backlog-data.ts for recommended integrations

## Conventions

- Always use `gh` CLI (never raw curl to GitHub API)
- Never expose tokens or auth details
- Rate limit awareness: batch API calls, use `--paginate` for lists
- When analyzing repos, always contextualize against AgentAI's current stack and modules
- Output tables in markdown format for readability
