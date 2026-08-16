#!/usr/bin/env bash
# __SYNC_llms.sh — distribute jgwill/llms-txt guidance into an agent-instruction target.
#
#   Source:  this repo (jgwill/llms-txt)
#   Target:  /etc/claude-code  (jgwill/etc-claude-code), override with --target / $LLMS_SYNC_TARGET
#
# The set that travels is the UNION of:
#   - ./__SYNC_manifest.txt        the canonical distribution list (source side)
#   - <target>/guidance.txt        host-local additions (target side)
# After a sync the union is written back to <target>/guidance.txt, so that file stays an
# honest record of what is installed on this host.
#
# Earned 2026-08-16. The previous version of this script had five defects, all of the same
# family — it could not tell "nothing to do" from "I did not look":
#   1. commit+push were wrapped in `if [ "$USER" == "jgi" ]`. On every other host the copy
#      half ran and the landing half silently did not. Five months of drift, no signal.
#   2. `git add .` / `git commit .` in the target would have swept unrelated untracked files.
#      The target repo's own law is: stage what you edited, never everything.
#   3. `tar cf - "$f" | (cd "$T" && tar xvf -)` — a pipeline's exit status is the LAST
#      command's, so a failed read reported success.
#   4. a missing target guidance.txt printed a warning and `exit 0` — a fresh host, which
#      needs the sync most, was the one case treated as already done.
#   5. nothing ever told you a NEW guidance file existed and had never been distributed.
#
# Usage:
#   ./__SYNC_llms.sh                  sync, commit, push
#   ./__SYNC_llms.sh --check          report only; exit 1 if anything would change
#   ./__SYNC_llms.sh --no-push        sync and commit, leave the push to a human
#   ./__SYNC_llms.sh --no-commit      copy only
#   ./__SYNC_llms.sh --adopt          also install llms-* files the target references but
#                                     neither list names (adds them to <target>/guidance.txt)
#   ./__SYNC_llms.sh --target DIR     sync somewhere other than /etc/claude-code
#   ./__SYNC_llms.sh --install-hook   wire this into `git push` (sets core.hooksPath)
#
# Exit codes — the same contract skills-reconcile.py uses, so a pipeline can tell the
# cases apart and "I found nothing" never renders the same as "I could not see":
#   0  clean, or synced successfully
#   1  drift found (--check), or a listed file is missing from the source
#   2  could not look — the target is absent, unreadable, or not a git work tree

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 2

MANIFEST="$SCRIPT_DIR/__SYNC_manifest.txt"
TARGET="${LLMS_SYNC_TARGET:-/etc/claude-code}"
DO_COMMIT=1
DO_PUSH=1
CHECK_ONLY=0
ADOPT=0
FROM_HOOK=0

while [[ $# -gt 0 ]]; do
    case "$1" in
        --check|--dry-run|-n) CHECK_ONLY=1 ;;
        --no-commit)          DO_COMMIT=0; DO_PUSH=0 ;;
        --no-push)            DO_PUSH=0 ;;
        --adopt)              ADOPT=1 ;;
        --target)             TARGET="${2:?--target needs a directory}"; shift ;;
        --from-hook)          FROM_HOOK=1 ;;
        --install-hook)       git config core.hooksPath .githooks &&
                              chmod +x "$SCRIPT_DIR/.githooks/"* 2>/dev/null
                              echo "✅ core.hooksPath = .githooks — \`git push\` now runs this sync"
                              exit 0 ;;
        -h|--help)            sed -n '2,45p' "$0"; exit 0 ;;
        *) echo "unknown option: $1" >&2; exit 2 ;;
    esac
    shift
done

say() { printf '%s\n' "$*"; }

# ── the target must be lookable-at ───────────────────────────────────────────────
if [[ ! -d "$TARGET" ]]; then
    say "⛔ target does not exist: $TARGET"
    say "   Not the same as 'nothing to sync'. Point --target somewhere real, or clone"
    say "   git@github.com:jgwill/etc-claude-code.git into place."
    exit 2
fi
if [[ ! -w "$TARGET" ]]; then
    say "⛔ target is not writable by $(whoami): $TARGET"
    exit 2
fi
if ! git -C "$TARGET" rev-parse --git-dir >/dev/null 2>&1; then
    say "⛔ target is not a git work tree: $TARGET"
    say "   A sync that cannot be committed is a copy that evaporates on the next image."
    exit 2
fi

say "📂 llms-txt → $TARGET"

# ── build the union: source manifest + target guidance.txt ───────────────────────
read_list() {  # strips comments and blanks; missing file is not an error here
    [[ -f "$1" ]] || return 0
    while IFS= read -r line || [[ -n "$line" ]]; do
        line="${line%%#*}"; line="${line// /}"
        [[ -n "$line" ]] && printf '%s\n' "$line"
    done < "$1"
}

if [[ ! -f "$MANIFEST" ]]; then
    say "⛔ no __SYNC_manifest.txt beside this script — the distribution has no source list"
    exit 2
fi

FILES=()
while IFS= read -r f; do
    [[ -n "$f" ]] && FILES+=("$f")
done < <( { read_list "$MANIFEST"; read_list "$TARGET/guidance.txt"; } | awk '!seen[$0]++' )

# ── what the target's own instructions reach for but no list names ───────────────
UNLISTED=()
DANGLING=()
if [[ -f "$TARGET/CLAUDE.md" ]]; then
    while IFS= read -r ref; do
        printf '%s\n' "${FILES[@]}" | grep -qxF "$ref" && continue
        if [[ ! -f "$SCRIPT_DIR/$ref" ]]; then
            # not distributable from here; a pointer to nothing on this host is still rot
            [[ -f "$TARGET/$ref" ]] || DANGLING+=("$ref")
            continue
        fi
        printf '%s\n' "${UNLISTED[@]:-}" | grep -qxF "$ref" && continue
        UNLISTED+=("$ref")
    done < <(grep -rhoE 'llms-[A-Za-z0-9._-]+\.(txt|md)' \
                 "$TARGET/CLAUDE.md" "$TARGET"/skills/*/SKILL.md 2>/dev/null | sort -u)
fi

if [[ ${#DANGLING[@]} -gt 0 ]]; then
    say ""
    say "🔎 DANGLING-REFERENCE — the target's instructions send an agent to these, and they"
    say "   exist neither in this repo nor in the target:"
    for f in "${DANGLING[@]}"; do say "     $f"; done
    say "   Renamed, or never written. A skill that points at nothing loads nothing."
    say ""
fi

if [[ ${#UNLISTED[@]} -gt 0 ]]; then
    say ""
    say "🔎 REFERENCED-BUT-UNLISTED — the target's CLAUDE.md or skills name these, they exist"
    say "   in this repo, and neither list carries them:"
    for f in "${UNLISTED[@]}"; do say "     $f"; done
    if [[ $ADOPT -eq 1 && $CHECK_ONLY -eq 0 ]]; then
        say "   --adopt: adding to $TARGET/guidance.txt"
        FILES+=("${UNLISTED[@]}")
    else
        say "   Re-run with --adopt to install them, or add them to __SYNC_manifest.txt"
        say "   if every host should carry them."
    fi
    say ""
fi

# ── copy ─────────────────────────────────────────────────────────────────────────
CHANGED=()
MISSING=()
for f in "${FILES[@]}"; do
    src="$SCRIPT_DIR/$f"
    dst="$TARGET/$f"
    if [[ ! -f "$src" ]]; then
        MISSING+=("$f")
        continue
    fi
    if cmp -s "$src" "$dst" 2>/dev/null; then
        continue
    fi
    if [[ -f "$dst" ]]; then say "  ~ $f"; else say "  + $f  (new)"; fi
    CHANGED+=("$f")
    [[ $CHECK_ONLY -eq 1 ]] && continue
    if ! cp -- "$src" "$dst"; then
        say "⛔ could not write $dst"
        exit 2
    fi
done

if [[ ${#MISSING[@]} -gt 0 ]]; then
    say ""
    say "⛔ LISTED-BUT-ABSENT — named by a list, not present in this repo:"
    for f in "${MISSING[@]}"; do say "     $f"; done
    say "   Renamed or deleted upstream? Fix the list; do not leave the target guessing."
fi

# ── keep the target's guidance.txt honest ────────────────────────────────────────
GUIDANCE_DIRTY=0
if [[ $CHECK_ONLY -eq 0 ]]; then
    NEW_GUIDANCE="$(printf '%s\n' "${FILES[@]}")"
    if [[ "$NEW_GUIDANCE" != "$(read_list "$TARGET/guidance.txt")" ]]; then
        printf '%s\n' "$NEW_GUIDANCE" > "$TARGET/guidance.txt" && GUIDANCE_DIRTY=1
        say "  ~ guidance.txt  (${#FILES[@]} entries)"
    fi
elif [[ "$(printf '%s\n' "${FILES[@]}")" != "$(read_list "$TARGET/guidance.txt")" ]]; then
    say "  ~ guidance.txt  (would become ${#FILES[@]} entries)"
    GUIDANCE_DIRTY=1
fi

# ── report / commit / push ───────────────────────────────────────────────────────
if [[ ${#CHANGED[@]} -eq 0 && $GUIDANCE_DIRTY -eq 0 ]]; then
    say "✅ ${#FILES[@]} guidance files already in sync"
    [[ ${#MISSING[@]} -gt 0 || ${#UNLISTED[@]} -gt 0 || ${#DANGLING[@]} -gt 0 ]] && exit 1
    exit 0
fi

if [[ $CHECK_ONLY -eq 1 ]]; then
    say ""
    say "📋 --check: ${#CHANGED[@]} file(s) would change. Run without --check to land it."
    exit 1
fi

if [[ $DO_COMMIT -eq 0 ]]; then
    say "📋 copied ${#CHANGED[@]} file(s); --no-commit, so they are unlanded in $TARGET"
    exit 0
fi

# Bring the target up to date first — another host may have pushed since.
git -C "$TARGET" fetch --quiet origin 2>/dev/null
BRANCH="$(git -C "$TARGET" rev-parse --abbrev-ref HEAD)"
if git -C "$TARGET" rev-parse --verify --quiet "origin/$BRANCH" >/dev/null; then
    BEHIND="$(git -C "$TARGET" rev-list --count "HEAD..origin/$BRANCH")"
    if [[ "$BEHIND" -gt 0 ]]; then
        say "ℹ️  $TARGET is $BEHIND commit(s) behind origin/$BRANCH — not pushing over it."
        say "   Rebase the target yourself, then re-run. The copies are already in place."
        exit 1
    fi
fi

# Stage BY NAME. Never `git add .` — the target repo carries untracked host-local files
# that are not this script's to adopt.
TO_STAGE=("${CHANGED[@]}")
[[ $GUIDANCE_DIRTY -eq 1 ]] && TO_STAGE+=("guidance.txt")
if ! git -C "$TARGET" add -- "${TO_STAGE[@]}"; then
    say "⛔ could not stage in $TARGET"
    exit 2
fi

if git -C "$TARGET" diff --cached --quiet; then
    say "✅ nothing staged — target already carried this content"
    exit 0
fi

SUMMARY="sync:llms-txt — $(printf '%s, ' "${CHANGED[@]}" | sed 's/, $//')"
[[ ${#SUMMARY} -gt 72 ]] && SUMMARY="sync:llms-txt — ${#CHANGED[@]} guidance files from jgwill/llms-txt"

SRC_REV="$(git -C "$SCRIPT_DIR" rev-parse --short HEAD 2>/dev/null || echo unknown)"
if ! git -C "$TARGET" commit --quiet -m "$SUMMARY" -m "\
Distributed by __SYNC_llms.sh from jgwill/llms-txt@$SRC_REV.

Files (union of the source manifest and this host's guidance.txt):
$(printf '  - %s\n' "${TO_STAGE[@]}")

Staged by name, not by \`git add .\` — untracked host-local files in this repo belong to
whoever put them here." -- "${TO_STAGE[@]}"; then
    say "⛔ commit failed in $TARGET"
    exit 2
fi
say "📦 committed in $TARGET: $(git -C "$TARGET" rev-parse --short HEAD)"

if [[ $DO_PUSH -eq 0 ]]; then
    say "ℹ️  --no-push: the commit is local to $TARGET. Written is not yet in effect elsewhere."
    exit 0
fi

if ! git -C "$TARGET" push --quiet; then
    say "⛔ push failed in $TARGET — the commit is landed locally but not distributed."
    exit 1
fi
say "✅ $TARGET synced and pushed"
exit 0
