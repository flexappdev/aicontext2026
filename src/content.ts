export type CheatSection = {
  id: string
  title: string
  group?: string
  mdPath?: string
  bullets?: string[]
  lastUpdated?: string
  links?: { label: string; url: string }[]
}

export const sections: CheatSection[] = [
  {
    id: 'overview',
    title: 'AI Context 2026',
    bullets: [
      'Apps: Claude, ChatGPT, Gemini, Antigravity, AI Studio, Grok',
      'Models: Claude Opus 4.6 / Sonnet 4.6, GPT-5, Gemini 2.5 Pro, Llama 4',
      'Claude Code: CLI, Skills, MCPs, Subagents, Hooks, CLAUDE.md',
      'Open Claw: local AI gateway — route to any provider',
      'Infra: Vercel, AWS S3, MongoDB, Tailscale, Ollama',
      '2026 Goal: ABC — Apps (13 sites) · Backoffice · Context',
    ],
  },
  { id: 'top100', title: 'Top 100 AI', group: 'AI Reference', mdPath: '/ai/top100.md', lastUpdated: '2026-03-17' },
  { id: 'ai-history', title: 'AI History', group: 'AI Reference', mdPath: '/ai/ai-history.md', lastUpdated: '2026-03-17' },
  { id: 'ai-models-ref', title: 'AI Models', group: 'AI Reference', mdPath: '/ai/ai-models-ref.md', lastUpdated: '2026-03-17', links: [{ label: 'Anthropic', url: 'https://anthropic.com' }, { label: 'OpenAI', url: 'https://openai.com' }, { label: 'Google AI', url: 'https://ai.google' }] },
  { id: 'ai-people', title: 'AI People', group: 'AI Reference', mdPath: '/ai/ai-people.md', lastUpdated: '2026-03-17' },
  { id: 'ai-future', title: 'AI Future', group: 'AI Reference', mdPath: '/ai/ai-future.md', lastUpdated: '2026-03-17' },
  { id: 'ai-apps', title: 'AI Apps', group: 'Apps & Models', mdPath: '/ai/ai-apps.md', lastUpdated: '2026-03-17', links: [{ label: 'claude.ai', url: 'https://claude.ai' }, { label: 'chatgpt.com', url: 'https://chatgpt.com' }, { label: 'gemini.google.com', url: 'https://gemini.google.com/app' }] },
  { id: 'models', title: 'Models', group: 'Apps & Models', mdPath: '/ai/models.md', lastUpdated: '2026-03-17' },
  { id: 'claude-code', title: 'Claude Code (CC)', group: 'Claude Code', mdPath: '/ai/claude-code.md', lastUpdated: '2026-03-17', links: [{ label: 'Docs', url: 'https://docs.anthropic.com/en/docs/claude-code' }, { label: 'npm', url: 'https://www.npmjs.com/package/@anthropic-ai/claude-code' }] },
  { id: 'claude-md', title: 'CLAUDE.md', group: 'Claude Code', mdPath: '/ai/claude-md.md', lastUpdated: '2026-03-17' },
  { id: 'subagents', title: 'Subagents', group: 'Claude Code', mdPath: '/ai/subagents.md', lastUpdated: '2026-03-17' },
  { id: 'hooks', title: 'Hooks', group: 'Claude Code', mdPath: '/ai/hooks.md', lastUpdated: '2026-03-17' },
  { id: 'memory', title: 'Memory', group: 'Claude Code', mdPath: '/ai/memory.md', lastUpdated: '2026-03-17' },
  { id: 'claude-code-pro-tips', title: 'CC Pro Tips', group: 'Claude Code', mdPath: '/ai/claude-code-pro-tips.md', lastUpdated: '2026-03-21', links: [{ label: 'CC Docs', url: 'https://docs.anthropic.com/en/docs/claude-code' }] },
  { id: 'openclaw', title: 'Open Claw (OC)', group: 'Tools', mdPath: '/ai/openclaw.md', links: [{ label: 'GitHub', url: 'https://github.com/flexappdev/openclaw' }] },
  { id: 'skills', title: 'Skills', group: 'Tools', mdPath: '/ai/skills.md', lastUpdated: '2026-03-17' },
  { id: 'mcps', title: 'MCPs', group: 'Tools', mdPath: '/ai/mcps.md', links: [{ label: 'MCP Docs', url: 'https://modelcontextprotocol.io' }] },
  { id: 'mcp-playwright', title: 'MCP: Playwright', group: 'Tools', mdPath: '/ai/playwright-mcp.md', links: [{ label: 'npm', url: 'https://www.npmjs.com/package/@modelcontextprotocol/server-playwright' }] },
  { id: 'mcp-firecrawl', title: 'MCP: Firecrawl', group: 'Tools', mdPath: '/ai/firecrawl-mcp.md', links: [{ label: 'firecrawl.dev', url: 'https://firecrawl.dev' }] },
  { id: 'notebooklm', title: 'NotebookLM', group: 'Workflows & Infra', mdPath: '/ai/notebooklm.md', lastUpdated: '2026-03-17', links: [{ label: 'notebooklm.google.com', url: 'https://notebooklm.google.com' }] },
  { id: 'ollama', title: 'Ollama', group: 'Workflows & Infra', mdPath: '/ai/ollama.md', lastUpdated: '2026-03-17', links: [{ label: 'ollama.com', url: 'https://ollama.com' }, { label: 'Models', url: 'https://ollama.com/library' }] },
  { id: 'tailscale', title: 'Tailscale', group: 'Workflows & Infra', mdPath: '/ai/tailscale.md', lastUpdated: '2026-03-17', links: [{ label: 'tailscale.com', url: 'https://tailscale.com' }, { label: 'Admin', url: 'https://login.tailscale.com/admin' }] },
  { id: 'workflows', title: 'Workflows', group: 'Workflows & Infra', mdPath: '/ai/workflows.md', lastUpdated: '2026-03-17' },
  { id: 'infrastructure', title: 'Infrastructure', group: 'Workflows & Infra', mdPath: '/ai/infrastructure.md' },
  { id: 'abc-goal', title: '2026 ABC Goal', group: 'Workflows & Infra', mdPath: '/ai/abc-goal.md' },
  { id: 'readme', title: 'README', group: 'Workflows & Infra', mdPath: '/ai/README.md' },
  { id: 'sociology-intro', title: 'Intro to Sociology', group: 'Sociology', mdPath: '/ai/sociology-intro.md', lastUpdated: '2026-03-17' },
  { id: 'sociology-society', title: 'Society & Social Rules', group: 'Sociology', mdPath: '/ai/sociology-society.md', lastUpdated: '2026-03-17' },
  { id: 'sociology-socialization', title: 'Socialization', group: 'Sociology', mdPath: '/ai/sociology-socialization.md', lastUpdated: '2026-03-17' },
  { id: 'sociology-groups', title: 'Social Groups', group: 'Sociology', mdPath: '/ai/sociology-groups.md', lastUpdated: '2026-03-17' },
  { id: 'sociology-culture', title: 'Culture & Identity', group: 'Sociology', mdPath: '/ai/sociology-culture.md', lastUpdated: '2026-03-17' },
]
