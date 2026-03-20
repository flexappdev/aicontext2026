# Playwright MCP Server

## Overview

The [Playwright MCP server](https://github.com/microsoft/playwright-mcp) by Microsoft provides browser automation capabilities through the Model Context Protocol. It enables LLMs to interact with web pages using structured accessibility snapshots rather than screenshots, making it fast, lightweight, and vision-model-free.

## Installation

### Project-level (`.mcp.json`)

Already configured in this repository's `.mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

### Claude Code CLI

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest
```

### Install Playwright browsers (if needed)

```bash
npx playwright install
```

## Configuration Options

| Flag | Description |
|------|-------------|
| `--browser <browser>` | Browser to use: `chrome`, `firefox`, `webkit`, `msedge` |
| `--headless` | Run in headless mode (headed by default) |
| `--device "<name>"` | Emulate a device, e.g. `"iPhone 15"` |
| `--user-data-dir <path>` | Persist browser data between sessions |
| `--storage-state <path>` | Load cookies/local storage from a file |
| `--extension` | Connect to a running browser instance (Edge/Chrome only) |

### Example with options

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest", "--browser", "chrome", "--headless"]
    }
  }
}
```

## Available Capabilities

The server exposes tools for:

- **Navigation** - open URLs, go back/forward, reload
- **Interaction** - click, type, hover, select options, drag
- **Observation** - get page snapshots (accessibility tree), take screenshots
- **Tabs** - create, switch, close browser tabs
- **Files** - upload and download files
- **Keyboard** - press keys, type text

Additional capability flags (`--caps`):
- `vision` - enable screenshot-based interactions
- `pdf` - enable PDF generation
- `devtools` - enable DevTools access

## Usage Tips

- Say "Use playwright mcp to open a browser to example.com" the first time so the LLM knows to use the MCP server rather than bash.
- The server uses Playwright's accessibility tree for deterministic, structured interactions.
- For troubleshooting, try pinning a specific version instead of `@latest` if you encounter compatibility issues.

## References

- [GitHub - microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- [npm - @playwright/mcp](https://www.npmjs.com/package/@playwright/mcp)
- [Playwright MCP Docs](https://executeautomation.github.io/mcp-playwright/docs/intro)
