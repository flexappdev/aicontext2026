---
name: seed
description: Manage seed data for AgentAI — generate, load, reset, and export seed datasets for skills, personas, agents, and orgs. Use when the user says "seed", "/seed", "seed data", "reset data", or wants to populate the database with defaults.
---

# Seed Data Manager

Generate and manage seed data for AgentAI.

## Commands

### Seed All (`/seed all`)
1. Run `seedDefaultSkills()` from `actions/seed-skills.ts`
2. Seed default personas if `actions/seed-personas.ts` exists
3. Seed default agents if `actions/seed-agents.ts` exists
4. Report inserted vs skipped counts for each entity type

### Seed Skills (`/seed skills`)
1. Call `seedDefaultSkills(orgId, userId)`
2. Report: N inserted, M skipped (already exist)

### Seed Personas (`/seed personas`)
1. Check if `actions/seed-personas.ts` exists
2. If not, create it following the `seed-skills.ts` pattern
3. Define 5-8 default personas with varied roles and traits
4. Insert with deduplication by slug
5. Report results

### Reset (`/seed reset <entity>`)
1. Confirm with user before proceeding (destructive)
2. Delete all records of the specified entity type for the current org
3. Re-run the seed for that entity
4. Report deleted + re-inserted counts

### Export (`/seed export`)
1. Fetch all skills, personas, and agents for the current org
2. Format as JSON matching the seed file structure
3. Write to `data/seed-export.json`
4. Report file path and record counts

## File References

- Skill seeds: `actions/seed-skills.ts`
- Seed trigger: Skills page "Seed Default Skills" button
- Supabase tables: `skills`, `personas`, `agents`, `agent_skills`
- Config: `agentai.json` for org definitions

## Conventions

- Always check for existing records before inserting (deduplication by slug)
- Scope all operations to the current org_id
- Never delete data without explicit user confirmation
- Use the `DefaultSkill` / `DefaultPersona` interface pattern
