# Tailscale

Zero-config VPN mesh network — connect all your devices securely without exposing ports or managing firewalls.

**Website:** [tailscale.com](https://tailscale.com) | **Docs:** [tailscale.com/kb](https://tailscale.com/kb)

---

## What Is Tailscale?

Tailscale creates a **private mesh network** (a "tailnet") across all your devices using WireGuard under the hood. Every device gets a stable private IP (`100.x.x.x`) that's reachable from any other device on your tailnet — regardless of NAT, firewalls, or physical location.

```
XPS16 (100.64.0.1) ←→ Tailscale cloud coordination ←→ S24 (100.64.0.2)
                                                    ←→ iPad (100.64.0.3)
                                                    ←→ VPS/Cloud (100.64.0.4)
```

---

## Install

```bash
# Linux / WSL2
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up

# macOS
brew install tailscale
# or: download from tailscale.com/download

# Windows
# Download .exe from tailscale.com/download

# Android / iOS
# Install from Play Store / App Store
```

---

## Key Commands

```bash
sudo tailscale up                    # connect / authenticate
sudo tailscale up --ssh              # enable Tailscale SSH
tailscale status                     # show all peers and status
tailscale ip -4                      # show this device's tailscale IP
tailscale ping <device-name>         # ping another device
tailscale netcheck                   # network diagnostics
sudo tailscale down                  # disconnect
tailscale logout                     # log out of account

# Access a device by name (MagicDNS)
ssh user@my-laptop.tailnet-name.ts.net
curl http://my-server.tailnet-name.ts.net:8080
```

---

## MagicDNS

Tailscale automatically assigns DNS names to every device:

```
machine-name.tailnet-name.ts.net
```

Access by name instead of IP — even if the IP changes.

---

## Use Cases

| Use Case | How |
|----------|-----|
| SSH into home machine | `ssh user@my-laptop.ts.net` from anywhere |
| Access dev server remotely | `http://my-laptop.ts.net:3000` |
| Expose Open Claw gateway | Access `http://xps16.ts.net:PORT` from phone |
| WSL2 ↔ Windows host | Connect WSL2 to Windows Tailscale IP |
| Secure cloud VM access | No public SSH port, only tailscale |
| Share port with team | Use Tailscale funnel or subnet routes |

---

## Open Claw Integration

Expose your local Open Claw gateway to all your devices:

```bash
# On XPS16: start openclaw gateway on port 11434
openclaw gateway start

# From any Tailscale device:
curl http://xps16.tailnet-name.ts.net:11434/v1/chat/completions \
  -d '{ "model": "llama3.3", "messages": [...] }'
```

No port forwarding, no firewall rules, no public exposure.

---

## Tailscale Funnel

Expose a local service to the **public internet** (not just your tailnet):

```bash
# Expose local port 3000 to https://<device>.ts.net
tailscale funnel 3000

# Expose specific path
tailscale funnel --set-path=/api 8080
```

Useful for: webhooks, sharing a dev build, testing with external services.

---

## Subnet Routing

Route traffic to an entire subnet through a Tailscale device:

```bash
# Advertise a subnet (e.g., home LAN 192.168.1.0/24)
sudo tailscale up --advertise-routes=192.168.1.0/24

# Other devices can now reach 192.168.1.x via this node
```

---

## Tailscale SSH

Built-in SSH that uses Tailscale identity for auth (no SSH keys needed):

```bash
# Enable on a device
sudo tailscale up --ssh

# SSH from another device
ssh my-laptop  # Tailscale handles auth
```

---

## Exit Nodes

Route all internet traffic through another Tailscale device (VPN-style):

```bash
# Advertise as exit node
sudo tailscale up --advertise-exit-node

# Use another device as exit node
sudo tailscale up --exit-node=my-vps
```

---

## Free vs Paid

| Feature | Free (Personal) | Plus/Business |
|---------|----------------|---------------|
| Devices | 100 | Unlimited |
| Users | 1 | Multiple |
| Funnel | ✅ | ✅ |
| Subnet routing | ✅ | ✅ |
| ACL policies | Basic | Advanced |
| Price | Free | $6/user/mo |

---

## Device Setup Summary (Your Stack)

| Device | Role | Notes |
|--------|------|-------|
| XPS16 | Primary dev, Open Claw host | WSL2 + Tailscale |
| S24 | Mobile access | Android app |
| iPad | Reading/sketching access | iOS app |
| Cloud VMs | Servers, deploy targets | Linux agent |

```bash
# Check all devices are connected
tailscale status
# Should show: XPS16, S24, iPad as "online"
```
