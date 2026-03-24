# Awesome Claude

> Curated list of the best Claude resources — 1,200+ GitHub stars · [github.com/webfuse-com/awesome-claude](https://github.com/webfuse-com/awesome-claude)

---

## Official Anthropic Resources

### Current Models (Claude 4.6 Family — Early 2026)

| Model | Release | Best For | Input / Output |
|-------|---------|----------|---------------|
| **Claude Opus 4.6** | Feb 5, 2026 | Coding, long-horizon agents, enterprise | $5 / $25 per MTok |
| **Claude Sonnet 4.6** | Feb 17, 2026 | Balanced intelligence + speed (default) | $3 / $15 per MTok |
| **Claude Haiku 4.5** | Oct 2025 | High-volume, real-time, sub-agent tasks | $1 / $5 per MTok |

- All models: 200K standard context / 1M token beta (Opus & Sonnet)
- [Models overview & pricing](https://platform.claude.com/docs/en/about-claude/models/overview)

### API & Dev Platform

- [Claude Developer Console](https://console.anthropic.com) — API keys, prompt testing, usage
- [Official Docs](https://platform.claude.com/docs/) — Messages API, tool use, computer use, MCP Connector
- [Models & Pricing](https://platform.claude.com/docs/en/about-claude/models/overview)

### Official SDKs

**Client SDKs** (full feature parity: messages, tools, streaming, caching, computer use)

- [Python SDK](https://github.com/anthropics/anthropic-sdk-python) — async + type hints
- [TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript) — Node.js + browser
- [Java SDK](https://github.com/anthropics/anthropic-sdk-java)
- [Go SDK](https://github.com/anthropics/anthropic-sdk-go)
- [Ruby SDK](https://github.com/anthropics/anthropic-sdk-ruby)
- [C# SDK (Beta)](https://github.com/anthropics/anthropic-sdk-csharp)
- [PHP SDK (Beta)](https://github.com/anthropics/anthropic-sdk-php)

**Agent SDKs**

- [Python Agent SDK](https://github.com/anthropics/claude-agent-sdk-python)
- [TypeScript Agent SDK](https://github.com/anthropics/claude-agent-sdk-typescript)
- [Agent SDK Docs](https://platform.claude.com/docs/en/agent-sdk/overview)

**Starters**

- [Claude Cookbook](https://github.com/anthropics/claude-cookbooks) — Official notebooks (RAG, tool use, Skills, MCP)
- [Claude Quickstarts](https://github.com/anthropics/claude-quickstarts) — Ready-to-deploy example apps

### Cloud Providers

| Provider | Notes |
|----------|-------|
| **[Amazon Bedrock](https://aws.amazon.com/bedrock/anthropic/)** | Fully managed, cross-region inference, fine-tuning, guardrails |
| **[Google Cloud Vertex AI](https://cloud.google.com/products/model-garden/claude)** | Provisioned throughput, FedRAMP High, batch predictions |
| **[Azure AI Model Catalog](https://ai.azure.com/catalog/publishers/anthropic)** | Serverless deploy, fine-tuning, billing via Azure |

### Transparency & Safety

- [Transparency Hub](https://www.anthropic.com/transparency)
- [All System Cards](https://www.anthropic.com/system-cards)
- [Claude Code Security](https://www.anthropic.com/news/claude-code-security) — threat model (Feb 2026)

---

## Claude Code & MCP

### Claude Code

Terminal-first agentic coding CLI + VS Code/JetBrains IDE integrations + Desktop GUI (Cowork).

```bash
# Install
curl -fsSL https://claude.ai/install.sh | bash
```

- [Official Docs](https://code.claude.com/docs/en/overview) — commands, memory, hooks, GitHub Actions, IDE
- [Claude Desktop](https://claude.ai/download) — macOS + Windows; Code tab + Cowork GUI
- [Claude for Chrome (Beta)](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) — multi-tab browser control (Max plan)

### Model Context Protocol (MCP)

Open standard (Linux Foundation) for connecting Claude to tools, databases, repos, and more.

- [MCP Official Site](https://modelcontextprotocol.io/) — spec, SDKs, quickstart
- [Intro to MCP Course](https://anthropic.skilljar.com/introduction-to-model-context-protocol) — build servers + clients in Python
- [MCP Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics)
- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — community curated MCP list

---

## Community Curated Lists

| List | Focus |
|------|-------|
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Slash commands, CLAUDE.md files, CLI tools, workflows |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | Resources for customizing AI workflows with Skills |
| [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | Categorized skills: docs, dev tools, data analysis |
| [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts) | Prompt examples to improve Claude interactions |
| [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | Specialized agent teams for building & debugging |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 100+ community-maintained subagents for full-stack dev |
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | MCP servers for extending Claude's capabilities |

---

## Extensions & Integrations

### IDE Extensions

- [Claude Code for VS Code](https://marketplace.visualstudio.com/items?itemName=Anthropic.claude-code) — Official; inline diffs, `@`-mentions, plan review
- [Claude Code for JetBrains (Beta)](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) — IntelliJ, PyCharm, WebStorm
- [Claude Code Chat](https://github.com/andrepimenta/claude-code-chat) — Native chat UI with history + MCP support in VS Code
- [Claude Code Theme](https://github.com/ashwingopalsamy/claude-code-theme) — Dark/light/high-contrast VS Code theme

### Browser Extensions

- [Claude for Chrome (Beta)](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) — Browser control (Max plan)
- [Claude Usage Tracker](https://chromewebstore.google.com/detail/claude-usage-tracker/knemcdpkggnbhpoaaagmjiigenifejfo) — Track usage + metrics

---

## Educational Resources

### Official Free Courses (Anthropic SkillJar)

| Course | Focus |
|--------|-------|
| [Building with the Claude API](https://anthropic.skilljar.com/claude-with-the-anthropic-api) | Full API usage |
| [Claude Code in Action](https://anthropic.skilljar.com/claude-code-in-action) | Practical CC workflow |
| [Intro to MCP](https://anthropic.skilljar.com/introduction-to-model-context-protocol) | Build MCP servers in Python |
| [MCP Advanced Topics](https://anthropic.skilljar.com/model-context-protocol-advanced-topics) | Sampling, notifications, transports |
| [Claude with Amazon Bedrock](https://anthropic.skilljar.com/claude-in-amazon-bedrock) | Bedrock integration |
| [Claude with Google Vertex AI](https://anthropic.skilljar.com/claude-with-google-vertex) | Vertex AI integration |
| [AI Fluency: Framework & Foundations](https://anthropic.skilljar.com/ai-fluency-framework-foundations) | Core AI literacy |

### Community Guides

- [Claude Code Everything You Need to Know](https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know) — Setup, hooks, workflows, MCP, BMAD method
- [40+ Claude Code Tips](https://github.com/ykdojo/claude-code-tips) — Custom status line, system prompt reduction, Gemini CLI integration
- [My Experience With Claude Code — Part 1](https://sankalp.bearblog.dev/my-claude-code-experience-after-2-weeks-of-usage/) — TODO.md workflow, cost management
- [Claude Code 2.0 Guide](https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/) — Agent Manager mindset, context engineering, sub-agents

---

## Community

- [Claude Discord](https://discord.com/invite/prcdpx7qMm) — Official community for users and developers
- [r/ClaudeAI](https://www.reddit.com/r/ClaudeAI/) — Reddit discussions and tips
- [Awesome Claude Site](https://awesomeclaude.ai) — Web version of this list
