export type CheatSection = {
  id: string
  title: string
  mdPath?: string
  bullets?: string[]
}

export const sections: CheatSection[] = [
  {
    id: 'overview',
    title: 'AI Context 2026 — Cheat Sheet',
    bullets: [
      'Apps: Claude, ChatGPT, Antigravity, AI Studio',
      'Models: GPT 5.2, Opus 4.5',
      'Tools: MCP, Playwright, Firecrawl',
      'Infra: AWS, GCP, Azure, Grok, Meta',
    ],
  },
  { id: 'workflows', title: 'Workflows', mdPath: '/README.md' },
  { id: 'mcp-playwright', title: 'MCP: Playwright', mdPath: '/playwright-mcp.md' },
  { id: 'mcp-firecrawl', title: 'MCP: Firecrawl', mdPath: '/firecrawl-mcp.md' },
]
