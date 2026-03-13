---
name: push
description: Push current changes to the main branch. Use when the user says "push", "/push", "push to main", or wants to commit and push their work. Stages all modified/new files, creates a descriptive commit, and pushes to origin main.
---

# Push to Main

Commit all current changes and push to `origin main`.

## Workflow

1. Run `git status` to see all changes (staged, unstaged, untracked)
2. Run `git diff --stat` to understand what changed
3. Run `git log --oneline -3` to see recent commit style
4. If there are no changes, inform the user and stop
5. Stage all relevant changed files with `git add` (list specific files, avoid `.env` or secrets)
6. Write a concise commit message that summarizes the changes (1-2 sentences, focus on "why")
7. Commit using a HEREDOC for the message, always include the co-author trailer:
   ```
   Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
   ```
8. Run `git push origin main`
9. Report the result: commit hash, files changed, push status
