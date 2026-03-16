export type CheatSection = {
  id: string
  title: string
  group?: string
  mdPath?: string
  bullets?: string[]
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
  { id: 'ai-apps', title: 'AI Apps', group: 'Apps & Models', mdPath: '/ai/ai-apps.md' },
  { id: 'models', title: 'Models', group: 'Apps & Models', mdPath: '/ai/models.md' },
  { id: 'claude-code', title: 'Claude Code (CC)', group: 'Claude Code', mdPath: '/ai/claude-code.md' },
  { id: 'claude-md', title: 'CLAUDE.md', group: 'Claude Code', mdPath: '/ai/claude-md.md' },
  { id: 'subagents', title: 'Subagents', group: 'Claude Code', mdPath: '/ai/subagents.md' },
  { id: 'hooks', title: 'Hooks', group: 'Claude Code', mdPath: '/ai/hooks.md' },
  { id: 'memory', title: 'Memory', group: 'Claude Code', mdPath: '/ai/memory.md' },
  { id: 'openclaw', title: 'Open Claw (OC)', group: 'Tools', mdPath: '/ai/openclaw.md' },
  { id: 'skills', title: 'Skills', group: 'Tools', mdPath: '/ai/skills.md' },
  { id: 'mcps', title: 'MCPs', group: 'Tools', mdPath: '/ai/mcps.md' },
  { id: 'mcp-playwright', title: 'MCP: Playwright', group: 'Tools', mdPath: '/ai/playwright-mcp.md' },
  { id: 'mcp-firecrawl', title: 'MCP: Firecrawl', group: 'Tools', mdPath: '/ai/firecrawl-mcp.md' },
  { id: 'workflows', title: 'Workflows', group: 'Workflows & Infra', mdPath: '/ai/workflows.md' },
  { id: 'infrastructure', title: 'Infrastructure', group: 'Workflows & Infra', mdPath: '/ai/infrastructure.md' },
  { id: 'abc-goal', title: '2026 ABC Goal', group: 'Workflows & Infra', mdPath: '/ai/abc-goal.md' },
  { id: 'readme', title: 'README', group: 'Workflows & Infra', mdPath: '/ai/README.md' },
]
