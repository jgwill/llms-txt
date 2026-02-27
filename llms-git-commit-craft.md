# llms-git-commit-craft

> Git commit shaping techniques — writing, rewriting, and relating commits to their context.

## Amending the Last Commit

```bash
# Rewrite HEAD's message only (no file changes)
git commit --amend -m "new message here"

# Add forgotten files to HEAD commit
git add <file>
git commit --amend --no-edit
```

- Only affects **HEAD** (the latest commit)
- Rewrites the SHA — if already pushed, requires `--force`

## Rewording Older Commits via Rebase

When you need to edit a commit that is **not** HEAD:

```bash
# Stash uncommitted work first
git stash

# Start interactive rebase from the commit's parent
GIT_SEQUENCE_EDITOR="sed -i 's/^pick <short-sha>/reword <short-sha>/'" \
  git rebase -i <target-commit>~1

# Editor opens for each 'reword' commit — supply new message
# After rebase completes:
git stash pop
```

### Automated Rewording (multiple commits)

```bash
# Mark ALL commits in range as reword
GIT_SEQUENCE_EDITOR="sed -i 's/^pick /reword /g'" \
  GIT_EDITOR="/path/to/editor-script.sh" \
  git rebase -i <oldest-commit>~1
```

Editor script pattern — detect which commit by content:

```bash
#!/bin/bash
if grep -q "unique-keyword" "$1"; then
  cat > "$1" << 'MSG'
new commit message for this one
MSG
else
  cat > "$1" << 'MSG'
new commit message for the other
MSG
fi
```

### Tradeoffs

| Aspect | `--amend` | `rebase reword` |
|--------|-----------|-----------------|
| Scope | HEAD only | Any commit in history |
| History rewrite | 1 commit | All commits from target onward |
| Force push needed | If pushed | If pushed |
| Risk | Low | Medium — new SHAs cascade |

## Relating Commits to Issues

Use `Relates to` or `Fixes` in commit body to link to GitHub issues:

```
feat(module): short summary

Context explaining the change.

Relates to owner/repo#2
Fixes owner/repo#5
```

- **`Fixes #N`** → auto-closes issue on merge to default branch
- **`Relates to #N`** → creates reference link without closing

## Commit Message Anatomy

```
<type>(<scope>): <imperative summary>     ← subject line (≤72 chars)
                                           ← blank line
<body — the WHY, not the what>            ← wrap at 72 chars
                                           ← blank line
<footer — issue refs, co-authors>
```

### Types

| Type | When |
|------|------|
| `feat` | New capability |
| `fix` | Bug resolution |
| `refactor` | Restructure without behavior change |
| `docs` | Documentation only |
| `chore` | Tooling, config, maintenance |
| `test` | Test additions or fixes |

## Pre-Rebase Checklist

1. **Stash or commit** uncommitted work
2. **Verify scope** — `git log --oneline <target>~1..HEAD` to see what will be replayed
3. **Check push state** — `git log --oneline origin/main..HEAD` to know if force push is needed
4. **Abort hatch** — `git rebase --abort` if anything goes sideways
