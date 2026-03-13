---
name: import
description: Import data from external sources — JSON files, CSV, API responses, or other AgentAI instances. Use when the user says "import", "/import", "load data", or wants to bring external data into the system.
---

# Data Importer

Import data into AgentAI from external sources.

## Commands

### JSON Import (`/import json <file>`)
1. Read the JSON file from the specified path
2. Detect the data shape (skills, personas, agents, or generic)
3. Validate required fields per entity type
4. Map to Supabase table columns with org_id scoping
5. Insert with deduplication by slug (skip existing)
6. Report: N imported, M skipped, K errors

### CSV Import (`/import csv <file>`)
1. Read the CSV file
2. Parse headers to detect entity type
3. Map columns to table fields
4. Validate each row
5. Insert valid rows, collect errors
6. Report results with row-level error details

### Skill File Import (`/import skill <path>`)
1. Read the SKILL.md file from the specified path
2. Parse YAML frontmatter for name and description
3. Extract markdown body as system_prompt
4. Create skill via `createSkill()` server action
5. Report the imported skill

### Bulk Import (`/import bulk <directory>`)
1. Scan directory for .json, .csv, and .md files
2. Classify each file by entity type
3. Present import plan to user
4. Execute imports in sequence
5. Report combined results

## Validation Rules

- Skills: require `name`, `slug`, `system_prompt`
- Personas: require `name`, `slug`, `data_json`
- Agents: require `name`, `slug`, `persona_id`
- All entities: auto-generate `slug` from `name` if missing

## File References

- Server actions: `actions/skills.ts`, `actions/personas.ts`, `actions/agents.ts`
- Types: `lib/types/skill.ts`, `lib/types/persona.ts`, `lib/types/agent.ts`

## Conventions

- Always validate before inserting — never insert malformed data
- Scope all imports to the current org_id
- Preserve original IDs in metadata for traceability
- Report errors per-record, don't fail entire batch on one bad record
