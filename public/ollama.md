# Ollama

Run large language models locally on your machine — no API key, no cloud, fully private.

**Website:** [ollama.com](https://ollama.com) | **GitHub:** [github.com/ollama/ollama](https://github.com/ollama/ollama)

---

## Install

```bash
# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download from ollama.com/download

# WSL2 (Windows)
curl -fsSL https://ollama.com/install.sh | sh
# Then: ollama serve &  (in WSL terminal)
```

---

## Quick Start

```bash
ollama run llama3.3          # pull + run in one command
ollama run mistral           # pull + run Mistral
ollama run phi4              # Microsoft Phi-4 (14B, fast)
ollama run gemma3            # Google Gemma 3
ollama run qwen2.5           # Alibaba Qwen

ollama list                  # list installed models
ollama ps                    # show running models
ollama stop llama3.3         # stop a running model
ollama rm llama3.3           # remove a model
```

---

## Top Models (2026)

| Model | Size | Best For | RAM Needed |
|-------|------|---------|-----------|
| `llama3.3` | 70B | General, best quality | 48GB |
| `llama3.2` | 3B / 11B | Fast, everyday tasks | 4–8GB |
| `llama3.1` | 8B / 70B | Balanced | 8–48GB |
| `mistral` | 7B | Fast, efficient | 8GB |
| `mixtral` | 8x7B | MoE, diverse tasks | 32GB |
| `phi4` | 14B | Strong reasoning, compact | 10GB |
| `gemma3` | 4B / 12B / 27B | Google quality locally | 4–20GB |
| `qwen2.5` | 7B / 72B | Multilingual, coding | 8–48GB |
| `qwen2.5-coder` | 7B / 32B | Code generation | 8–24GB |
| `deepseek-r1` | 7B / 32B | Reasoning (chain of thought) | 8–24GB |
| `codellama` | 7B / 34B | Code, Python, JS | 8–24GB |
| `nomic-embed-text` | — | Embeddings / RAG | 2GB |

---

## Model Pulling

```bash
ollama pull llama3.3         # download without running
ollama pull mistral:7b       # specific tag/version
ollama pull llama3.2:3b      # specific size
```

Models stored at: `~/.ollama/models/`

---

## REST API

Ollama exposes an OpenAI-compatible API on `localhost:11434`:

```bash
# Chat completion
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.3",
  "messages": [{ "role": "user", "content": "Hello!" }],
  "stream": false
}'

# Generate (single prompt)
curl http://localhost:11434/api/generate -d '{
  "model": "mistral",
  "prompt": "Why is the sky blue?"
}'

# List models
curl http://localhost:11434/api/tags

# OpenAI-compatible endpoint
curl http://localhost:11434/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{ "model": "llama3.3", "messages": [{"role":"user","content":"Hello"}] }'
```

---

## Use with Open Claw

Open Claw routes to Ollama as a provider:

```bash
# In openclaw config
{
  "providers": {
    "ollama": {
      "base_url": "http://localhost:11434",
      "models": ["llama3.3", "mistral", "phi4"]
    }
  }
}
```

Then query Open Claw's gateway — it routes to Ollama when specified.

---

## Use with Python / Node

```python
# Python (via openai library)
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
response = client.chat.completions.create(
    model="llama3.3",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

```typescript
// TypeScript (via openai library)
import OpenAI from 'openai'

const ollama = new OpenAI({ baseURL: 'http://localhost:11434/v1', apiKey: 'ollama' })
const res = await ollama.chat.completions.create({
  model: 'llama3.3',
  messages: [{ role: 'user', content: 'Hello!' }],
})
```

---

## Modelfile — Custom Models

Create a custom model with system prompts and parameters:

```Dockerfile
# Modelfile
FROM llama3.3

SYSTEM """
You are a concise assistant. Always respond in bullet points.
Never use more than 5 bullets.
"""

PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER num_ctx 8192
```

```bash
ollama create my-model -f ./Modelfile
ollama run my-model
```

---

## Performance Tips

| Hardware | Recommended Models | Notes |
|----------|-------------------|-------|
| 8GB RAM | 3B–7B (q4) | phi4, llama3.2:3b |
| 16GB RAM | 7B–13B | mistral, llama3.1:8b |
| 24GB VRAM (GPU) | 13B–30B | qwen2.5:14b |
| 48GB+ | 70B | llama3.3, qwen2.5:72b |

```bash
# Check GPU usage
ollama ps  # shows VRAM usage per model

# Force CPU only
OLLAMA_NUM_GPU=0 ollama run mistral
```

---

## WSL2 Setup (Windows)

```bash
# 1. Install Ollama in WSL2
curl -fsSL https://ollama.com/install.sh | sh

# 2. Start the server
ollama serve &

# 3. Access from Windows host
# Default: http://localhost:11434

# 4. For GPU (NVIDIA) in WSL2
# Install CUDA drivers on Windows, WSL2 auto-detects
```

---

## Ollama vs API

| | Ollama (local) | Cloud API |
|-|---------------|-----------|
| Cost | Free (hardware) | Pay per token |
| Privacy | Fully private | Data sent to provider |
| Speed | Depends on hardware | Consistent fast |
| Quality | Good (7B–70B) | Best (frontier) |
| Setup | Requires install | Instant |
| Internet | Not needed | Required |
| Best for | Private data, offline, experiments | Production, best quality |
