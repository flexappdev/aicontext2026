---
name: db
description: Database operations for AgentAI — migrations, seeding, and schema verification. Use when the user says "db", "/db", "migrate", "seed", "schema", or needs to work with Supabase tables, MongoDB collections, or database migrations.
---

# Database Operations

Manage Supabase and MongoDB for AgentAI.

## Supabase Schema

Tables defined in `supabase/migrations/`:
- `orgs` — Workspaces with name, slug, accent_color, ai_config
- `org_members` — User membership with role (admin/editor/viewer)
- `personas` — Character profiles with data_json, tags, status
- `persona_versions` — Version history with change notes
- `chat_sessions` — Conversation archive with messages jsonb
- `persona_media` — Generated images/videos with metadata

All tables have RLS enabled and org_id scoping.

## Commands

### Create Migration (`/db migrate <name>`)
1. Create `supabase/migrations/XXX_<name>.sql` with next sequence number
2. Use `IF NOT EXISTS` guards for safety
3. Include RLS policy creation
4. Add `org_id` column + foreign key for multi-tenant scoping
5. Report the SQL for review before applying

### Verify Schema (`/db verify`)
1. Read all migration files in `supabase/migrations/`
2. List all tables, columns, RLS policies defined
3. Check for missing indexes on foreign keys
4. Report schema summary

### Seed Data (`/db seed`)
1. Read seed data from `agentai.json` (tenants, master agent config)
2. Generate INSERT statements for orgs and org_members
3. Include sample personas if schema supports it
4. Output as executable SQL

## MongoDB

- Connection: `lib/mongodb.ts` using mongoose
- Database: `agentai` (from MONGO_DB env var)
- Planned collections: generated_personas, generation_jobs, domain_taxonomy
- Use for engine/generation features, not for core CRUD

## Conventions

- Always use `uuid_generate_v4()` for primary keys
- Always add `created_at timestamptz default now()`
- Always enable RLS on new tables
- Always add org_id FK to orgs table
- Use jsonb for flexible data (data_json, metadata, messages)
