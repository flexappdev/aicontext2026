# AI Models Reference

Comprehensive reference for frontier AI models in 2026 — capabilities, context windows, pricing, and use cases.

---

## Anthropic — Claude Family

| Model | Context | Best For | API Name |
|-------|---------|---------|---------|
| **Claude Opus 4.6** | 200K | Complex reasoning, coding, analysis | `claude-opus-4-6` |
| **Claude Sonnet 4.6** | 200K | Balanced — speed + quality, daily use | `claude-sonnet-4-6` |
| **Claude Haiku 4.5** | 200K | Fast, cheap, high-volume tasks | `claude-haiku-4-5-20251001` |

**Claude strengths:** long context, code, safety, instruction following, nuanced writing

---

## OpenAI — GPT Family

| Model | Context | Best For |
|-------|---------|---------|
| **GPT-5** | 128K | Reasoning, multimodal, STEM |
| **GPT-4o** | 128K | Vision, audio, real-time |
| **o3** | 200K | Deep chain-of-thought reasoning |
| **o3-mini** | 128K | Fast reasoning, math/code |
| **GPT-4o mini** | 128K | Fast, cheap, daily tasks |

**OpenAI strengths:** ecosystem, DALL-E 3, Whisper integration, Codex fine-tuning

---

## Google — Gemini Family

| Model | Context | Best For |
|-------|---------|---------|
| **Gemini 2.5 Pro** | 1M | Long doc analysis, complex reasoning |
| **Gemini 2.5 Flash** | 1M | Fast, cost-effective, high volume |
| **Gemini 2.0 Pro** | 1M | Multimodal, Google Workspace |
| **Gemini Nano** | 4K | On-device, Android |

**Google strengths:** 1M context window, Google Search/Workspace/Maps grounding, Veo 3 video

---

## Meta — Llama Family

| Model | Context | Best For |
|-------|---------|---------|
| **Llama 4 Scout** | 10M | Ultra-long context, MoE |
| **Llama 4 Maverick** | 1M | General reasoning, coding |
| **Llama 3.3 70B** | 128K | Best open-weights for most tasks |
| **Llama 3.2 11B Vision** | 128K | Multimodal, open-source |

**Meta strengths:** fully open weights, commercial license, runs on consumer hardware

---

## Mistral — European AI

| Model | Context | Best For |
|-------|---------|---------|
| **Mistral Large 2** | 128K | Reasoning, multilingual |
| **Mixtral 8x22B** | 65K | Open MoE, efficient |
| **Mistral Small 3** | 128K | Fast, cheap, EU data sovereignty |
| **Codestral** | 32K | Code completion, FIM |

**Mistral strengths:** EU-based, GDPR-friendly, open weights, efficient MoE architecture

---

## DeepSeek — Chinese Frontier

| Model | Context | Best For |
|-------|---------|---------|
| **DeepSeek V3** | 128K | Coding, math, cost-effective |
| **DeepSeek R1** | 64K | Chain-of-thought reasoning (open weights) |
| **DeepSeek Coder V2** | 128K | Code generation |

**DeepSeek strengths:** open weights, very low API cost, strong math/coding benchmarks

---

## Other Notable Models

| Model | Company | Strength |
|-------|---------|---------|
| **Command R+** | Cohere | RAG, enterprise, multilingual |
| **Grok 3** | xAI | Real-time X data, uncensored |
| **Phi-4** | Microsoft | Small but capable (14B) |
| **Qwen 2.5** | Alibaba | Multilingual, open weights |
| **Yi-Large** | 01.AI | Chinese, strong reasoning |
| **Falcon 180B** | TII UAE | Large open model |

---

## Model Benchmark Comparison (2026)

| Benchmark | Claude Opus 4.6 | GPT-5 | Gemini 2.5 Pro | Notes |
|-----------|----------------|-------|----------------|-------|
| MMLU | ~92% | ~92% | ~90% | General knowledge |
| HumanEval | ~95% | ~93% | ~88% | Python coding |
| MATH | ~88% | ~90% | ~89% | Mathematical reasoning |
| SWE-bench | ~65% | ~55% | ~45% | Real GitHub issues |
| GPQA | ~80% | ~78% | ~75% | PhD-level science |

---

## Context Windows Cheat Sheet

| Size | Models | Good For |
|------|--------|---------|
| 200K tokens | Claude (all) | ~150K words, full codebases |
| 1M tokens | Gemini, Llama 4 | Entire novels, large repos |
| 10M tokens | Llama 4 Scout | Massive document sets |
| 128K tokens | GPT-4o, Mistral | Most professional tasks |
| 32K tokens | Older GPT-4 | Standard documents |

~1 token ≈ 0.75 words in English

---

## Pricing Quick Reference (API, ~2026)

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| Claude Opus 4.6 | $15 | $75 |
| Claude Sonnet 4.6 | $3 | $15 |
| Claude Haiku 4.5 | $0.25 | $1.25 |
| GPT-5 | $10 | $30 |
| GPT-4o mini | $0.15 | $0.60 |
| Gemini 2.5 Pro | $3.50 | $10.50 |
| Gemini 2.5 Flash | $0.15 | $0.60 |
| Llama 4 (via Groq) | $0.11 | $0.34 |
| DeepSeek V3 | $0.27 | $1.10 |

---

## Model Selection Guide

| Use Case | Recommended Model | Why |
|----------|------------------|-----|
| Agentic coding | Claude Opus 4.6 | Best tool use, long context |
| Daily assistant | Claude Sonnet 4.6 | Fast + smart, cost-effective |
| High-volume tasks | Claude Haiku / Gemini Flash | Sub-cent cost |
| Deep reasoning | o3 / Claude Opus 4.6 | Extended thinking |
| Long documents | Gemini 2.5 Pro | 1M context |
| Open weights needed | Llama 4 / DeepSeek R1 | Run locally |
| EU data compliance | Mistral | European infrastructure |
| Real-time data | Grok 3 | X/Twitter integration |
| Multimodal | GPT-4o / Gemini 2.5 Pro | Best vision + audio |
| Math / STEM | o3 / GPT-5 | Chain-of-thought |

---

## Model Families: Architecture Notes

| Architecture | Examples | Key Innovation |
|-------------|---------|---------------|
| Dense Transformer | GPT-4, Claude, early Gemini | All parameters active every token |
| Mixture of Experts (MoE) | Mixtral, Llama 4, Gemini 1.5 | Only top-K experts fire, more efficient |
| Chain-of-Thought | o1, o3, Claude extended thinking | Explicit reasoning before answer |
| Multimodal Native | GPT-4o, Gemini 2.0 | Images/audio/text in one model |
| State Space Models | Mamba, RWKV | Linear attention, efficient long context |
