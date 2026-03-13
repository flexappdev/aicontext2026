# AI Models 2026

## Claude (Anthropic)

| Model | ID | Context | Best For |
|-------|----|---------|----------|
| Opus 4.6 | `claude-opus-4-6` | 200k | Complex reasoning, architecture |
| Sonnet 4.6 | `claude-sonnet-4-6` | 200k | Daily coding, balanced speed/quality |
| Haiku 4.5 | `claude-haiku-4-5-20251001` | 200k | Fast tasks, subagents, hooks |

**Key Claude features:** Extended thinking, prompt caching, tool use, vision, 200k context

## OpenAI (GPT)

| Model | Notes |
|-------|-------|
| GPT-5 | Flagship reasoning + multimodal |
| o3 / o3-mini | Deep reasoning chain-of-thought |
| GPT-4o | Fast multimodal, image gen |

## Google (Gemini)

| Model | Notes |
|-------|-------|
| Gemini 2.5 Pro | 1M context, multimodal |
| Gemini 2.5 Flash | Fast, cost-efficient |
| Gemini 2.0 | Video understanding |

## Meta (Llama)

| Model | Notes |
|-------|-------|
| Llama 4 Scout | 10M context, MoE |
| Llama 3.3 70B | Strong open-weight |

## xAI (Grok)

| Model | Notes |
|-------|-------|
| Grok 3 | Real-time X/web data |
| Grok 3 Mini | Fast reasoning |

## Open / Local

| Model | Tool |
|-------|------|
| Mistral, DeepSeek | Ollama, LM Studio |
| Qwen 2.5 | Stability Matrix |
| Gemma 3 | OpenRouter |

## Infra & Chips

- **Nvidia** — H100, B200, GB200 (Blackwell)
- **AWS** — Bedrock (Claude, Titan, Llama)
- **GCP** — Vertex AI (Gemini, Claude via Vertex)
- **Azure** — OpenAI Service, GitHub Copilot
- **Energy** — Solar, Wind, Nuclear (AI data centers)

## Model Selection Guide

```
Speed-critical    → Haiku 4.5 / Flash 2.5
Coding            → Sonnet 4.6 / GPT-4o
Complex reasoning → Opus 4.6 / GPT-5 / o3
Long context      → Gemini 2.5 Pro (1M)
Local / private   → Llama 4 via Ollama
```
