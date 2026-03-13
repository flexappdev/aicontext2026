# Firecrawl MCP Server

## Overview

The [Firecrawl MCP server](https://github.com/firecrawl/firecrawl-mcp-server) provides web scraping, crawling, and search capabilities through the Model Context Protocol. It returns clean markdown and structured JSON optimized for LLMs, with ads, navigation, footers, and boilerplate automatically removed.

## Prerequisites

- **Node.js/npm** installed
- **Firecrawl API Key** - get one at https://firecrawl.dev/app/api-keys (free tier available, no credit card required)

## Installation

### Project-level (`.mcp.json`)

Already configured in this repository's `.mcp.json`. Replace `YOUR_API_KEY` with your actual key:

```json
{
  "mcpServers": {
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

### Claude Code CLI

```bash
claude mcp add firecrawl -e FIRECRAWL_API_KEY=your-api-key -- npx -y firecrawl-mcp
```

## Available Tools

| Tool | Description |
|------|-------------|
| **scrape** | Scrape a single publicly accessible URL |
| **crawl** | Start a crawl job with filtering and extraction options |
| **map** | Discover URLs from a starting page |
| **search** | Web search with content extraction |
| **extract** | Extract structured data from a web page using LLM |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `FIRECRAWL_API_KEY` | Your Firecrawl API key (required) |
| `FIRECRAWL_API_URL` | Custom API URL for self-hosted instances |
| `FIRECRAWL_RETRY_MAX_ATTEMPTS` | Max retry attempts |
| `FIRECRAWL_RETRY_INITIAL_DELAY` | Initial retry delay |
| `FIRECRAWL_RETRY_MAX_DELAY` | Max retry delay |
| `FIRECRAWL_RETRY_BACKOFF_FACTOR` | Backoff multiplier |
| `FIRECRAWL_CREDIT_WARNING_THRESHOLD` | Credit warning threshold |
| `FIRECRAWL_CREDIT_CRITICAL_THRESHOLD` | Credit critical threshold |

## Free Tier Limits

- 10 scrapes per minute
- 10 maps per minute
- 5 searches per minute
- 1 crawl per minute

## Usage Tips

- Claude will automatically determine when to use Firecrawl for web content retrieval.
- Firecrawl preprocesses all content to remove noise and return clean, LLM-friendly markdown.
- For self-hosted Firecrawl, set `FIRECRAWL_API_URL` to your instance URL.

## Windows Note

If running on Windows and encountering issues, use:

```bash
cmd /c "set FIRECRAWL_API_KEY=your-api-key && npx -y firecrawl-mcp"
```

## References

- [Firecrawl MCP Docs](https://docs.firecrawl.dev/mcp-server)
- [GitHub - firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server)
- [Firecrawl](https://www.firecrawl.dev)
