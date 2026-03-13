# Model Context Protocol (MCP)

MCP is an open standard for connecting AI models to external tools and services.

## What is MCP?

MCP gives Claude access to tools beyond its built-in capabilities:
- **Browser automation** (Playwright)
- **Web scraping** (Firecrawl)
- **File systems, databases, APIs**
- **Custom tools** you build

## Configuration

### Project-level: `.mcp.json`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

### CLI: Add a server

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest
claude mcp add firecrawl -e FIRECRAWL_API_KEY=key -- npx -y firecrawl-mcp
```

## MCP Servers 2026

| Server | Package | What It Does |
|--------|---------|--------------|
| **Playwright** | `@playwright/mcp` | Browser automation, screenshots, form fills |
| **Firecrawl** | `firecrawl-mcp` | Web scraping, crawling, AI extraction |
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | Read/write local files |
| **Memory** | `@modelcontextprotocol/server-memory` | Persistent key-value store |
| **Puppeteer** | `@modelcontextprotocol/server-puppeteer` | Browser automation |
| **GitHub** | `@modelcontextprotocol/server-github` | Repos, PRs, issues |
| **Postgres** | `@modelcontextprotocol/server-postgres` | Database queries |
| **Brave Search** | `@modelcontextprotocol/server-brave-search` | Web search |
| **Slack** | `@modelcontextprotocol/server-slack` | Send messages |

## How Claude Uses MCP Tools

1. Claude decides it needs a tool (e.g. scrape a page)
2. Calls the MCP tool via the `mcp__<server>__<tool>` pattern
3. Tool executes in a separate process
4. Result returned to Claude's context
5. Claude continues reasoning with the result

## Build Your Own MCP Server

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "my-server", version: "1.0.0" }, {
  capabilities: { tools: {} }
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{ name: "my_tool", description: "Does something", inputSchema: { type: "object" } }]
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => ({
  content: [{ type: "text", text: "Result here" }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);
```

## Resources

- Spec: modelcontextprotocol.io
- Registry: github.com/modelcontextprotocol/servers
- Claude docs: docs.anthropic.com/en/docs/claude-code/mcp
