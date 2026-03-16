# Claude Code Skills

Skills are reusable, invocable workflows stored as markdown in your project's `.claude/skills/` directory.

## Structure

```
.claude/
  skills/
    <skill-name>/
      SKILL.md
```

## SKILL.md Format

```markdown
---
name: deploy
description: Build and deploy to Vercel. Use when user says "deploy" or "/deploy".
argument-hint: [--prod | --preview]
---

# Deploy to Vercel

Steps:
1. Run `npm run build` — must pass
2. Run `vercel --prod` or `vercel` for preview
3. Report deployment URL
```

## How Claude Uses Skills

1. User types `/deploy` or "deploy the app"
2. Claude reads the matching `SKILL.md`
3. Follows instructions in the skill document
4. Uses argument-hint for optional parameters

## Skills in This Project

| Skill | Description |
|-------|-------------|
| `/backlog` | Full backlog lifecycle — review, test, implement, release |
| `/qa` | End-to-end QA — test routes, debug failures, fix bugs |
| `/push` | Commit and push current changes to origin main |
| `/deploy` | Build and deploy to Vercel |
| `/add` | Scaffold a new page or feature |
| `/research` | Research a topic and return structured findings |
| `/ai` | General AI-powered skill |
| `/agents-md` | Generate agents.md documentation |

## Common Skill Patterns

### Git / Deploy Skills
```markdown
---
name: push
description: Commit and push to main
---
```

### Research Skills
```markdown
---
name: research
description: Research a topic and summarize findings
argument-hint: <topic>
---
```

### QA Skills
```markdown
---
name: qa
description: Run full QA lifecycle
argument-hint: [full | test | fix | report]
---
```

## Best Practices

- Keep skills **focused** — one skill, one job
- Use **argument-hint** to document parameters
- Write skills in **imperative style** — "Run X, then Y"
- Reference specific files with paths
- Include **output format** expectations
- Update skills when the codebase changes

## Skill vs CLAUDE.md

| | CLAUDE.md | Skill |
|-|-----------|-------|
| When loaded | Every session | When invoked |
| Purpose | Static context | Procedural workflow |
| Size | Keep brief | Can be detailed |
| Invocation | Automatic | `/skill-name` |
