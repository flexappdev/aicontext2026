---
name: monitor
description: Monitor long-running lab processes — build pipelines, data imports, AI generation jobs, and background tasks. Use when the user says "monitor", "/monitor", "check status", "watch", or wants to track the progress of running processes.
---

# Lab Process Monitor

Monitor and manage long-running processes in AgentAI's lab environment.

## Commands

### Status (`/monitor status`)
1. Check for running background processes:
   - Active `next build` or `next dev` processes
   - Running npm/node processes
   - Background data import jobs
2. Report process list with PID, runtime, and status

### Watch Build (`/monitor build`)
1. Start `npx next build` as a monitored process
2. Stream build output in real-time
3. Track route compilation progress
4. Report final result: success/failure with timing
5. Alert on errors with file paths and messages

### Watch Dev (`/monitor dev`)
1. Check if `next dev` is running
2. If running, report the PID and uptime
3. If not running, offer to start it
4. Monitor for compilation errors in output

### Logs (`/monitor logs [process]`)
1. Check recent build/dev output
2. Filter for errors and warnings
3. Group by severity
4. Report with timestamps

### Resources (`/monitor resources`)
1. Check disk usage of the project directory
2. Check `node_modules` size
3. Check `.next` build cache size
4. Report storage breakdown
5. Suggest cleanup if thresholds exceeded:
   - `node_modules` > 500MB
   - `.next` > 200MB

### Kill (`/monitor kill <pid>`)
1. Confirm with user before proceeding
2. Send SIGTERM to the specified process
3. Verify process has stopped
4. Report result

## Output Format

```
Lab Monitor:
- Processes: N running
- Build: idle / running (N seconds)
- Dev Server: running on :3000 / stopped
- Disk: N MB project, M MB node_modules, K MB .next
```

## Conventions

- Never kill processes without user confirmation
- Monitor is read-only by default — only `/monitor kill` modifies state
- Report timestamps in local time
- Use process names, not just PIDs, for clarity
