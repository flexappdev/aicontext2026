---
name: knowledge
description: Agent knowledge and memory management — build knowledge graphs, manage context windows, create RAG pipelines, and maintain persistent agent memory. Inspired by cognee. Use when the user says "knowledge", "/knowledge", "agent memory", "knowledge graph", or wants to manage what agents know and remember.
---

# Knowledge Management

Build and manage knowledge systems for AgentAI's agents. Create knowledge bases, manage context, and design memory architectures.

Inspired by: [cognee](https://github.com/topoteretes/cognee) (knowledge engine for AI agent memory).

## Commands

```
/knowledge audit              — Audit what knowledge sources exist and how agents access them
/knowledge design <agent>     — Design the knowledge architecture for a specific agent
/knowledge context <agent>    — Analyze and optimize an agent's context window usage
/knowledge rag <source>       — Design a RAG pipeline for a data source
/knowledge graph <domain>     — Design a knowledge graph schema for a domain
```

## Process

### /knowledge audit

1. **Scan data sources** — What data exists in the system?
   - Supabase tables (personas, agents, skills, chat_sessions, assets)
   - Uploaded assets (documents, images, audio)
   - Chat history and conversation logs
   - Persona definitions and skill configurations
   - Industry data and taxonomy
2. **Map access patterns** — How do agents currently access data?
   - Direct DB queries via server actions
   - System prompt injection
   - Tool/function calling
3. **Identify gaps** — What knowledge is missing?
   - Cross-session memory (conversations forgotten)
   - Cross-agent knowledge sharing (agents siloed)
   - Semantic search (only exact match available)
   - User preference learning (no adaptation over time)
4. **Output** — Knowledge audit report with gap analysis

### /knowledge design <agent>

1. **Read agent config** — What persona, skills, and tools does this agent have?
2. **Identify knowledge needs** — What does this agent need to know to do its job?
   - Static knowledge (persona traits, domain expertise)
   - Dynamic knowledge (conversation history, user preferences)
   - Shared knowledge (other agents' outputs, system state)
3. **Design layers**:
   - **System prompt** — Core identity and instructions (always loaded)
   - **Skill prompts** — Task-specific knowledge (loaded per skill)
   - **Context window** — Recent conversation + relevant history
   - **RAG retrieval** — On-demand knowledge from vector store
   - **Tool results** — Real-time data from API calls
4. **Output** — Knowledge architecture diagram + implementation plan

### /knowledge context <agent>

1. Estimate current context usage:
   - System prompt tokens (persona + skills + instructions)
   - Average conversation length
   - Tool result sizes
2. Identify optimization opportunities:
   - Trim redundant instructions
   - Summarize long conversations
   - Lazy-load skill prompts (only when needed)
   - Cache frequent tool results
3. Output recommended context budget allocation

### /knowledge rag <source>

Design a Retrieval-Augmented Generation pipeline:
1. **Source analysis** — What data, what format, how much?
2. **Chunking strategy** — How to split documents (by paragraph, section, semantic boundary)
3. **Embedding model** — Which model for vectorization
4. **Vector store** — Supabase pgvector vs external (Pinecone, Qdrant)
5. **Retrieval strategy** — Similarity search, hybrid search, re-ranking
6. **Integration** — How agents query the pipeline (tool call vs automatic injection)
7. **Output** — Implementation spec with migration, server action, and agent config changes

### /knowledge graph <domain>

Design a knowledge graph for a domain:
1. **Entities** — What are the nodes? (personas, skills, industries, roles)
2. **Relationships** — What connects them? (has_skill, belongs_to, specializes_in)
3. **Properties** — What attributes do nodes/edges have?
4. **Queries** — What questions should the graph answer?
5. **Storage** — Supabase (relational) vs Neo4j/graph extension
6. **Output** — Schema definition + migration plan + query examples

## Conventions

- Always consider multi-tenancy (org_id scoping) in knowledge designs
- Prefer Supabase pgvector over external vector stores (fewer dependencies)
- Knowledge architectures must respect the 7-layer hierarchy
- Context budgets should leave 40% headroom for agent responses
- All knowledge designs should include a data freshness strategy (how/when to update)
