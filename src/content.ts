export type CheatSection = {
  id: string
  title: string
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
  { id: 'ai-apps', title: 'AI Apps', mdPath: '/ai/ai-apps.md' },
  { id: 'models', title: 'Models', mdPath: '/ai/models.md' },
  { id: 'claude-code', title: 'Claude Code (CC)', mdPath: '/ai/claude-code.md' },
  { id: 'openclaw', title: 'Open Claw (OC)', mdPath: '/ai/openclaw.md' },
  { id: 'skills', title: 'Skills', mdPath: '/ai/skills.md' },
  { id: 'mcps', title: 'MCPs', mdPath: '/ai/mcps.md' },
  { id: 'mcp-playwright', title: 'MCP: Playwright', mdPath: '/ai/playwright-mcp.md' },
  { id: 'mcp-firecrawl', title: 'MCP: Firecrawl', mdPath: '/ai/firecrawl-mcp.md' },
  { id: 'workflows', title: 'Workflows', mdPath: '/ai/workflows.md' },
  { id: 'infrastructure', title: 'Infrastructure', mdPath: '/ai/infrastructure.md' },
  { id: 'abc-goal', title: '2026 ABC Goal', mdPath: '/ai/abc-goal.md' },
  { id: 'readme', title: 'README', mdPath: '/ai/README.md' },
]
