# Infrastructure 2026

## Cloud Providers

| Provider | Services Used |
|----------|--------------|
| **Vercel** | Frontend deploys, serverless functions, edge |
| **AWS** | S3 (media), Bedrock (Claude/Llama), Lambda |
| **GCP** | Vertex AI, Earth Studio, YouTube |
| **Azure** | OpenAI Service, GitHub Copilot |

## Networking

### Tailscale
- Zero-config VPN mesh across all devices
- Connect XPS16 ↔ S24 ↔ iPad ↔ cloud VMs
- Expose local services (openclaw gateway) securely

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4   # get this device's tailscale IP
```

## Devices (XPS16 Context)

| Device | Role |
|--------|------|
| XPS16 | Primary dev machine (3 desktops) |
| S24 | Mobile testing, TikTok, on-the-go |
| iPad | Reading, sketching, Obsidian |
| Cloud | Vercel, AWS S3, GCP |

## Storage

| Service | Use |
|---------|-----|
| **S3** | Media assets (images, videos, thumbnails) |
| **MongoDB Atlas** | App data (MSCORE, bo26) |
| **Supabase / Postgres** | Structured data, RLS auth |
| **Obsidian Vault** | Local knowledge base, linked notes |

## AI Infra

| Tool | Purpose |
|------|---------|
| **Ollama** | Local LLM serving (Llama, Mistral, Gemma) |
| **Stability Matrix** | Local image/video model management |
| **OpenRouter** | Unified API for 100+ models |
| **Runware** | Fast image generation API |
| **Open Claw** | Local AI gateway / router |

## Frontend Stack

```
React 18 / Next.js 15    → Apps (MSCORE, MSLISTS, MSTRAVEL)
Vite + React             → Tools (aicontext2026, bo26)
Tailwind CSS             → Styling
TypeScript               → Type safety
```

## CI/CD

```
git push origin main
  → Vercel auto-deploy (preview URL)
  → vercel --prod (production)
```

## Key Repos (github.com/flexappdev)

| Repo | App |
|------|-----|
| aicontext2026 | This reference app |
| bo26 | Backoffice 2026 |
| openclaw | AI gateway |
| mscore | MSCORE app bundle |
| mslists | MSLISTS app bundle |
| mstravel | MSTRAVEL app bundle |
