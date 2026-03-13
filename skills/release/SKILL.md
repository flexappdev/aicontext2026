---
name: release
description: Manage releases — version bumping, changelog generation, release notes, and tag creation. Use when the user says "release", "/release", "version bump", "tag release", or wants to prepare a new release.
---

# Release Manager

Prepare and execute releases for AgentAI.

## Commands

### Prepare (`/release prepare <version>`)
1. Validate semantic version format (major.minor.patch)
2. Update version in `package.json`
3. Generate changelog from git log since last tag:
   ```bash
   git log --oneline $(git describe --tags --abbrev=0 2>/dev/null || echo "HEAD~20")..HEAD
   ```
4. Categorize commits: features, fixes, refactors, docs, other
5. Write/update `CHANGELOG.md` with new version section
6. Present release notes for review

### Tag (`/release tag <version>`)
1. Verify all changes are committed (clean working tree)
2. Run pre-release checks:
   - `npx tsc --noEmit` — type check
   - `npx next lint` — lint
   - `npx next build` — build
3. Create annotated git tag: `git tag -a v<version> -m "Release v<version>"`
4. Report tag creation

### Publish (`/release publish`)
1. Push current branch to remote
2. Push tags: `git push --tags`
3. Report pushed branch and tags

### Notes (`/release notes <version>`)
1. Read `CHANGELOG.md` for the specified version section
2. Format as release notes with:
   - Version header and date
   - Highlights (top 3 changes)
   - Full categorized change list
   - Breaking changes section (if any)
3. Output formatted release notes

### Status (`/release status`)
1. Show current version from `package.json`
2. Show latest git tag
3. Count commits since last tag
4. Show unreleased changes summary
5. Report release readiness

## Process

1. `/release status` — check current state
2. `/release prepare <version>` — prepare changelog
3. Review and edit changelog if needed
4. `/release tag <version>` — create tag after checks pass
5. `/release publish` — push to remote

## Conventions

- Follow semantic versioning (semver)
- Always run full build check before tagging
- Never force-push tags
- Changelog entries should describe user-facing changes
