---
name: ai
description: Manage AI provider configuration — API keys, model selection, provider health checks, and cost tracking. Use when the user says "ai", "/ai", "configure provider", "switch model", or wants to manage AI settings.
---

# AI Provider Management

Configure and manage AI providers for AgentAI.

## Commands

### Status (`/ai status`)
1. Read current AI config from org settings (`orgs.ai_config` jsonb field)
2. List configured providers (anthropic, openai, google, etc.)
3. Show active model for each provider
4. Check API key presence (show masked, never full key)
5. Report provider health status

### Switch (`/ai switch <provider>`)
1. Validate provider name (anthropic, openai, google)
2. Update `orgs.ai_config` to set the active provider
3. Verify the API key exists in environment or org config
4. Report the switch

### Models (`/ai models`)
1. List available models per configured provider:
   - Anthropic: claude-opus-4-6, claude-sonnet-4-6, claude-haiku-4-5-20251001
   - OpenAI: gpt-4o, gpt-4o-mini, o1
   - Google: gemini-2.0-flash, gemini-2.0-pro
2. Show which model is currently active
3. Show model capabilities (vision, tool use, streaming)

### Set Model (`/ai model <model-id>`)
1. Validate model ID against known models
2. Update org's AI config with the selected model
3. Report the change

### Test (`/ai test`)
1. Send a simple test prompt to the active provider
2. Measure response time
3. Report success/failure with latency

## File References

- Provider config: `lib/ai/providers.ts` (if exists)
- Playground API: `app/api/playground/respond/route.ts`
- Org settings: `orgs.ai_config` column
- Environment: `.env.local` for API keys

## Conventions

- Never log or display full API keys
- Always validate provider/model before switching
- Use org-level config, not global — supports multi-tenant
