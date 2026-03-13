# Open Claw (OC)

Open Claw is a local AI orchestration tool — a gateway that routes requests to multiple AI providers from a single interface.

## Install

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

## Setup & Launch

```bash
cd ~/openclaw && claude   # launch Claude Code inside openclaw project
```

## CLI Commands

```bash
openclaw setup            # initial configuration
openclaw tui              # terminal UI dashboard
openclaw dashboard        # web dashboard

openclaw health           # check all service health
openclaw doctor           # diagnose and fix issues

openclaw gateway start    # start the API gateway
openclaw gateway stop     # stop the gateway
openclaw gateway restart  # restart the gateway
```

## What It Does

- **Gateway** — Single OpenAI-compatible endpoint (`localhost:PORT`) routing to multiple backends
- **Providers** — Claude, OpenAI, Gemini, Ollama, OpenRouter, etc.
- **Tailscale** — Expose gateway securely across devices (no public internet)
- **TUI** — Monitor requests, costs, latency in the terminal

## Tailscale Integration

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
# Access openclaw gateway from any device on your tailnet
```

## Use Cases

| Use Case | Description |
|----------|-------------|
| Local fallback | Route to Ollama when API quota is exceeded |
| Cost control | Force cheap models for bulk tasks |
| Multi-model testing | Same prompt → multiple models |
| Privacy | Keep requests on local network |

## Links

- Website: [openclaw.ai](https://openclaw.ai)
- GitHub: github.com/flexappdev (private)
- Docs: openclaw.ai/docs
