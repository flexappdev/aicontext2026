---
name: rich-ui
description: Design and build rich, interactive UI responses for agents — structured cards, forms, dashboards, and data visualizations that agents can generate dynamically. Inspired by Google A2UI. Use when the user says "rich-ui", "/rich-ui", "agent ui", "dynamic cards", or wants agents to return structured visual responses instead of plain text.
---

# Rich UI for Agent Responses

Design and implement structured UI response formats that agents can generate, going beyond plain text chat.

Inspired by: [A2UI](https://github.com/google/A2UI) (Agent-to-User Interface standard for declarative agent UIs).

## Commands

```
/rich-ui catalog          — Show available UI response types with examples
/rich-ui component <type> — Build a new response component (card, form, chart, table, etc.)
/rich-ui schema           — Define the JSON schema for agent UI responses
/rich-ui render <json>    — Preview how a JSON response would render
/rich-ui agent <name>     — Configure an agent to return rich UI responses
```

## Response Types

Agents can return these structured response types (rendered by the playground/chat UI):

### 1. Info Card
```json
{
  "type": "card",
  "title": "Persona Analysis",
  "subtitle": "Dr. Sarah Chen",
  "content": "Expert in NLP with 12 years experience...",
  "badges": ["AI/ML", "Senior", "Active"],
  "actions": [{ "label": "View Profile", "href": "/personas/dr-sarah-chen" }]
}
```

### 2. Data Table
```json
{
  "type": "table",
  "title": "Skill Comparison",
  "columns": ["Skill", "Level", "Usage"],
  "rows": [["Python", "Expert", "87%"], ["TypeScript", "Advanced", "65%"]]
}
```

### 3. Metric Dashboard
```json
{
  "type": "metrics",
  "items": [
    { "label": "Tasks Complete", "value": 42, "trend": "+12%" },
    { "label": "Success Rate", "value": "94%", "trend": "+3%" }
  ]
}
```

### 4. Step List
```json
{
  "type": "steps",
  "title": "Migration Plan",
  "items": [
    { "label": "Backup database", "status": "done" },
    { "label": "Run migration", "status": "in-progress" },
    { "label": "Verify data", "status": "pending" }
  ]
}
```

### 5. Form Request
```json
{
  "type": "form",
  "title": "Create Persona",
  "fields": [
    { "name": "name", "type": "text", "label": "Name", "required": true },
    { "name": "domain", "type": "select", "label": "Domain", "options": ["Tech", "Finance", "Health"] }
  ]
}
```

## Process

### /rich-ui component <type>

1. Define the JSON schema for the response type
2. Create a React component in `components/chat/` that renders the schema
3. Register the component in the playground's message renderer
4. Add TypeScript types in `lib/types/rich-ui.ts`
5. Test with sample JSON data

### /rich-ui schema

Output the full JSON schema definition for all rich UI types. This schema is included in agent system prompts so they know how to format structured responses.

### /rich-ui agent <name>

1. Read the agent's current configuration
2. Add rich UI instructions to the agent's system prompt:
   - When to use structured responses vs plain text
   - Available response types and their schemas
   - Formatting rules (keep data concise, use badges for status)
3. Update the agent's skill configuration

## Conventions

- Rich UI responses are JSON blocks within the chat message (fenced with ```json)
- The playground message renderer detects and renders them
- Agents should default to plain text and only use rich UI when it adds clarity
- All response components use AgentAI theme classes (bg-card, text-foreground, border-border)
- Components must be responsive (mobile-first)
- Security: rich UI is declarative data, never executable code — no inline JS, no dangerouslySetInnerHTML
