---
name: persona
description: Manage persona lifecycle — create, version, clone, compare, and bulk operations. Use when the user says "persona", "/persona", "create persona", "clone persona", or wants to work with character profiles in the system.
---

# Persona Operations

Manage the full persona lifecycle in AgentAI.

## Commands

### Create (`/persona create <name>`)
1. Prompt for required fields: name, role, personality traits, background
2. Generate a slug from the name
3. Build `data_json` with structured persona data:
   - `traits`: array of personality descriptors
   - `background`: backstory text
   - `voice`: communication style notes
   - `constraints`: behavioral boundaries
4. Create via `createPersona()` server action with org_id scoping
5. Report the created persona with ID

### Clone (`/persona clone <id>`)
1. Fetch the source persona by ID
2. Deep-copy all fields, append " (Copy)" to name, generate new slug
3. Create as a new persona via server action
4. Report the cloned persona with new ID

### Compare (`/persona compare <id1> <id2>`)
1. Fetch both personas
2. Diff their `data_json` fields side by side
3. Highlight differences in traits, voice, constraints
4. Report a structured comparison table

### Version (`/persona version <id> <note>`)
1. Fetch current persona state
2. Create a `persona_versions` record with snapshot of current data
3. Include the change note
4. Report version number and timestamp

### Bulk Status (`/persona bulk-status <status>`)
1. List all personas for the current org
2. Update status to the specified value (active, draft, archived)
3. Report count of updated personas

## File References

- Server actions: `actions/personas.ts`
- Types: `lib/types/persona.ts`
- List page: `app/(app)/personas/page.tsx`
- Detail component: `components/personas/persona-detail.tsx`
- Form component: `components/personas/persona-form.tsx`
- Supabase tables: `personas`, `persona_versions`

## Conventions

- Always scope queries with `org_id`
- Store flexible data in `data_json` (jsonb)
- Tag personas with comma-separated `tags` field
- Use status values: draft, active, archived
