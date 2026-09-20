#!/usr/bin/env bash
# __PULL_upstream.sh — bring technical facts IN from the repos that own them.
#
#   Sources:      the repos named in ./__PULL_manifest.txt — a local checkout when there
#                 is one, that repo's published docs site when there is not
#   Destination:  this repo (jgwill/llms-txt)
#
# The counterpart of __SYNC_llms.sh. That script carries guidance OUT to the
# agent-instruction target; this one carries facts IN from the source of truth.
#
# Why it exists. Before 2026-09-20 a Medicine Wheel release or a Stateloom version bump
# meant reading two upstream documents and retyping their numbers here by hand. Retyping
# has one failure mode and it is silent: the numbers stay readable long after they stop
# being true, and an agent quoting "15 MCP tools" from a file dated last month sounds
# exactly as confident as one quoting 27. The tables here had drifted by three package
# versions and twelve tools. The August answer was to delete the content and leave URL
# pointers — no drift, and also nothing for context7 to index. This script is the other
# answer: carry the content, and let a script carry it.
#
# Two kinds of destination, and the distinction is the whole design:
#
#   generated (copy / section)  the file IS the pull. Its header says so. Editing one by
#                               hand writes into a file the next pull overwrites.
#   grafted   (graft)           the file is AUTHORED here and carries one fenced region
#                               that is pulled. llms-stc-state-machine.md is framing —
#                               Fritz read as event-driven architecture — and framing is
#                               written, never generated. Only its §6 version table is
#                               upstream's to state.
#
# Usage:
#   ./__PULL_upstream.sh                    pull; rewrite what drifted
#   ./__PULL_upstream.sh --check            report only; exit 1 if anything is stale
#   ./__PULL_upstream.sh --offline          local checkouts only; never reach the network
#   ./__PULL_upstream.sh --repos-root DIR   where local checkouts live (/workspace/repos)
#   ./__PULL_upstream.sh --only FILE        one destination
#
# Exit codes — the contract __SYNC_llms.sh and reconcile.py already use, so "I found
# nothing" never renders the same as "I could not see":
#   0  every destination already current, or pulled successfully
#   1  drift found (--check), or a graft marker is missing from its destination
#   2  could not look — a source is unreachable and has no local checkout, or the
#      manifest is absent or malformed

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 2

MANIFEST="$SCRIPT_DIR/__PULL_manifest.txt"
REPOS_ROOT="${LLMS_PULL_REPOS_ROOT:-/workspace/repos}"
CHECK_ONLY=0
OFFLINE=0
ONLY=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        --check|--dry-run|-n) CHECK_ONLY=1 ;;
        --offline)            OFFLINE=1 ;;
        --repos-root)         REPOS_ROOT="${2:?--repos-root needs a directory}"; shift ;;
        --only)               ONLY="${2:?--only needs a destination file name}"; shift ;;
        -h|--help)            sed -n '2,48p' "$0"; exit 0 ;;
        *) echo "unknown option: $1" >&2; exit 2 ;;
    esac
    shift
done

say() { printf '%s\n' "$*"; }

[[ -f "$MANIFEST" ]] || { say "⛔ no __PULL_manifest.txt beside this script — nothing declares what to pull"; exit 2; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# ── parse the manifest ───────────────────────────────────────────────────────────
declare -A SRC_URL SRC_PATH
declare -a S_DEST S_TITLE S_INTRO S_SLUG S_FILE S_MODE S_SECTION S_BLOCK
declare -a DESTS

flush_stanza() {
    [[ -z "${cur_dest:-}" ]] && return 0
    if [[ "$cur_dest" == @source* ]]; then
        local slug="${cur_dest#@source }"
        SRC_URL["$slug"]="${k_url:-}"
        SRC_PATH["$slug"]="${k_path:-$REPOS_ROOT/$slug}"
    else
        S_DEST+=("$cur_dest");       S_TITLE+=("${k_title:-}")
        S_INTRO+=("${k_intro:-}");   S_SLUG+=("${k_source:-}")
        S_FILE+=("${k_file:-}");     S_MODE+=("${k_mode:-copy}")
        S_SECTION+=("${k_section:-}"); S_BLOCK+=("${k_block:-}")
        printf '%s\n' "${DESTS[@]:-}" | grep -qxF "$cur_dest" || DESTS+=("$cur_dest")
    fi
    cur_dest=""; k_url=""; k_path=""; k_title=""; k_intro=""
    k_source=""; k_file=""; k_mode=""; k_section=""; k_block=""
}

cur_dest=""
while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ -z "${line//[[:space:]]/}" ]] && continue
    if [[ "$line" =~ ^\[(.+)\]$ ]]; then
        flush_stanza
        cur_dest="${BASH_REMATCH[1]}"
        continue
    fi
    if [[ "$line" =~ ^[[:space:]]*([a-z]+)[[:space:]]*=[[:space:]]*(.*)$ ]]; then
        key="${BASH_REMATCH[1]}"; val="${BASH_REMATCH[2]}"
        val="${val%"${val##*[![:space:]]}"}"
        printf -v "k_$key" '%s' "$val"
        continue
    fi
    say "⛔ malformed manifest line: $line"
    exit 2
done < "$MANIFEST"
flush_stanza

[[ ${#S_DEST[@]} -gt 0 ]] || { say "⛔ manifest declares no pulls"; exit 2; }

# ── fetch one upstream file, cached for the run ──────────────────────────────────
# A source is looked at in two places before it is called unreachable: the local
# checkout, then the published docs site. Exit 2 means neither could be read — which is
# not the same as "nothing to pull", and is why it is a different code.
upstream_file() {
    local slug="$1" rel="$2"
    local cache="$TMP/${slug//\//_}__${rel//\//_}"
    [[ -f "$cache" ]] && { printf '%s\n' "$cache"; return 0; }

    local lp="${SRC_PATH[$slug]:-$REPOS_ROOT/$slug}/$rel"
    if [[ -f "$lp" ]]; then
        cp -- "$lp" "$cache" || return 2
        printf '%s\n' "$cache"
        SOURCE_NOTE["$slug"]="local checkout ${SRC_PATH[$slug]:-$REPOS_ROOT/$slug}"
        return 0
    fi

    if [[ $OFFLINE -eq 1 ]]; then
        say "⛔ $slug/$rel — no local checkout at $lp, and --offline forbids the network" >&2
        return 2
    fi
    local url="${SRC_URL[$slug]:-}"
    [[ -n "$url" ]] || { say "⛔ $slug/$rel — no local checkout and no published url in the manifest" >&2; return 2; }
    if ! curl -fsSL --max-time 30 "$url/$rel" -o "$cache"; then
        say "⛔ $slug/$rel — no local checkout at $lp, and $url/$rel did not answer" >&2
        return 2
    fi
    SOURCE_NOTE["$slug"]="published $url"
    printf '%s\n' "$cache"
}
declare -A SOURCE_NOTE

# ── one markdown section, heading line excluded ──────────────────────────────────
extract_section() {
    local file="$1" heading="$2"
    local hashes="${heading%%[![::space:]#]*}"; hashes="${heading%% *}"
    local level="${#hashes}"
    awk -v H="$heading" -v L="$level" '
        !inside { if ($0 == H) { inside = 1 } ; next }
        /^#+ / {
            n = index($0, " ") - 1
            if (n <= L) exit
        }
        { print }
    ' "$file"
}

# strip leading/trailing blank lines
trim_blank() { awk 'NF {p = 1} p' "$@" | tac | awk 'NF {p = 1} p' | tac; }

# Upstream writes links relative to its own repo. Carried here verbatim they point at
# files this repository does not have, which is a worse failure than a stale number: the
# reader follows it and lands nowhere. Rewrite them to the source repo, leave absolute
# links, anchors and mailto alone.
rewrite_links() {
    local slug="$1" base="https://github.com/$1/blob/main"
    sed -e 's#](http#@@ABS@@(http#g' \
        -e 's#](\##@@ABS@@(\##g' \
        -e 's#](mailto:#@@ABS@@(mailto:#g' \
        -e "s#](\.)#@@ABS@@(https://github.com/$slug)#g" \
        -e 's#](\./#](#g' \
        -e "s#](\([^)]*\))#](=BASE=/\1)#g" \
        -e "s#=BASE=#$base#g" \
        -e 's#@@ABS@@#]#g'
}

content_sha() { sha256sum | cut -c1-16; }

# ── assemble what a destination should contain ───────────────────────────────────
assemble() {
    local dest="$1" i
    for i in "${!S_DEST[@]}"; do
        [[ "${S_DEST[$i]}" == "$dest" ]] || continue
        local src; src="$(upstream_file "${S_SLUG[$i]}" "${S_FILE[$i]}")" || return 2
        case "${S_MODE[$i]}" in
            copy)
                # the upstream title line is dropped; this file carries its own
                tail -n +2 "$src" | trim_blank | rewrite_links "${S_SLUG[$i]}"
                ;;
            section|graft)
                local body; body="$(extract_section "$src" "${S_SECTION[$i]}")"
                if [[ -z "${body//[[:space:]]/}" ]]; then
                    say "⛔ $dest — '${S_SECTION[$i]}' not found in ${S_SLUG[$i]}/${S_FILE[$i]}" >&2
                    say "   Renamed upstream? A section that moved is not a section that vanished." >&2
                    return 2
                fi
                [[ "${S_MODE[$i]}" == section ]] && printf '%s\n\n' "${S_SECTION[$i]}"
                printf '%s\n' "$body" | trim_blank | rewrite_links "${S_SLUG[$i]}"
                ;;
            *) say "⛔ $dest — unknown mode '${S_MODE[$i]}'" >&2; return 2 ;;
        esac
        printf '\n'
    done
}

dest_mode() {
    local dest="$1" i
    for i in "${!S_DEST[@]}"; do
        [[ "${S_DEST[$i]}" == "$dest" ]] && { printf '%s\n' "${S_MODE[$i]}"; return 0; }
    done
}

dest_meta() {  # title / intro / block / the human-readable source list
    local dest="$1" want="$2" i out=""
    for i in "${!S_DEST[@]}"; do
        [[ "${S_DEST[$i]}" == "$dest" ]] || continue
        case "$want" in
            title) [[ -n "${S_TITLE[$i]}" ]] && { printf '%s\n' "${S_TITLE[$i]}"; return 0; } ;;
            intro) [[ -n "${S_INTRO[$i]}" ]] && { printf '%s\n' "${S_INTRO[$i]}"; return 0; } ;;
            block) [[ -n "${S_BLOCK[$i]}" ]] && { printf '%s\n' "${S_BLOCK[$i]}"; return 0; } ;;
            slug)  [[ -n "${S_SLUG[$i]}"  ]] && { printf '%s\n' "${S_SLUG[$i]}";  return 0; } ;;
            sources)
                local one="\`${S_FILE[$i]}\`"
                [[ -n "${S_SECTION[$i]}" ]] && one="$one § ${S_SECTION[$i]#\#\# }"
                out="${out:+$out, }$one" ;;
        esac
    done
    [[ "$want" == sources ]] && printf '%s\n' "$out"
}

recorded_sha() { [[ -f "$1" ]] && sed -n 's/^.*pull-content-sha256: \([0-9a-f]*\).*$/\1/p' "$1" | head -1; }

# ── the crossing ─────────────────────────────────────────────────────────────────
say "📥 upstream → llms-txt   (checkouts under $REPOS_ROOT)"

CHANGED=(); CURRENT=(); BROKEN=(); MALFORMED=()

for dest in "${DESTS[@]}"; do
    [[ -n "$ONLY" && "$dest" != "$ONLY" ]] && continue

    body="$(assemble "$dest")"
    rc=$?
    if [[ $rc -ne 0 ]]; then BROKEN+=("$dest"); continue; fi
    body="$(printf '%s\n' "$body" | trim_blank)"
    sha="$(printf '%s\n' "$body" | content_sha)"
    slug="$(dest_meta "$dest" slug)"
    srcs="$(dest_meta "$dest" sources)"
    mode="$(dest_mode "$dest")"

    if [[ "$mode" == graft ]]; then
        block="$(dest_meta "$dest" block)"
        [[ -f "$dest" ]] || { say "⛔ $dest — graft destination does not exist here"; MALFORMED+=("$dest"); continue; }
        if ! grep -q "PULLED:$block BEGIN" "$dest" || ! grep -q "PULLED:$block END" "$dest"; then
            say "⛔ $dest — no PULLED:$block markers. A graft needs a place to land:"
            say "     <!-- PULLED:$block BEGIN ... -->"
            say "     <!-- PULLED:$block END -->"
            MALFORMED+=("$dest"); continue
        fi
        have="$(awk -v B="PULLED:$block BEGIN" -v E="PULLED:$block END" \
                    'index($0,E){inside=0} inside{print} index($0,B){inside=1}' "$dest" | trim_blank)"
        if [[ "$have" == "$body" ]]; then CURRENT+=("$dest"); continue; fi
        say "  ~ $dest  § $block  (grafted from $slug)"
        CHANGED+=("$dest")
        [[ $CHECK_ONLY -eq 1 ]] && continue
        printf '%s\n' "$body" > "$TMP/graft.body"
        awk -v B="PULLED:$block BEGIN" -v E="PULLED:$block END" -v F="$TMP/graft.body" '
            index($0, B) { print; while ((getline l < F) > 0) print l; close(F); skip = 1; next }
            index($0, E) { skip = 0 }
            !skip { print }
        ' "$dest" > "$TMP/graft.out" && mv "$TMP/graft.out" "$dest"
        continue
    fi

    if [[ "$(recorded_sha "$dest")" == "$sha" ]]; then CURRENT+=("$dest"); continue; fi
    if [[ -f "$dest" ]]; then say "  ~ $dest  (from $slug: $srcs)"; else say "  + $dest  (new, from $slug)"; fi
    CHANGED+=("$dest")
    [[ $CHECK_ONLY -eq 1 ]] && continue

    title="$(dest_meta "$dest" title)"; intro="$(dest_meta "$dest" intro)"
    url="${SRC_URL[$slug]:-}"
    {
        printf '# %s\n\n' "${title:-$dest}"
        [[ -n "$intro" ]] && printf '> %s\n>\n' "$intro"
        printf '> **Pulled, not written.** This file is generated by [`__PULL_upstream.sh`](__PULL_upstream.sh)\n'
        printf '> from **%s** (%s). `%s` owns these facts; correct them there and the next\n' "$slug" "$srcs" "$slug"
        printf '> pull carries the correction here. An edit made in this file is lost at that pull.\n'
        [[ -n "$url" ]] && printf '>\n> Canonical: <%s/%s>\n' "$url" "$(dest_meta "$dest" sources | sed 's/`//g; s/ §.*//; s/,.*//')"
        printf '>\n> `pull-content-sha256: %s`\n\n' "$sha"
        printf -- '---\n\n'
        printf '%s\n' "$body"
    } > "$dest"
done

# ── report ───────────────────────────────────────────────────────────────────────
say ""
if [[ ${#BROKEN[@]} -gt 0 ]]; then
    say "⛔ could not look at a source for: ${BROKEN[*]}"
    say "   Not the same as 'nothing to pull'. Clone the repo under $REPOS_ROOT, or let the"
    say "   published docs site answer."
    exit 2
fi

if [[ ${#MALFORMED[@]} -gt 0 ]]; then
    say "⛔ the graft has nowhere to land in: ${MALFORMED[*]}"
    say "   The source was read fine. Restore the PULLED markers in that file."
    exit 1
fi

if [[ ${#CHANGED[@]} -eq 0 ]]; then
    say "✅ ${#CURRENT[@]} destination(s) already carry the upstream's current word"
    exit 0
fi

if [[ $CHECK_ONLY -eq 1 ]]; then
    say "📋 --check: ${#CHANGED[@]} destination(s) are behind their source. Run without --check to pull."
    exit 1
fi

say "📦 pulled ${#CHANGED[@]} destination(s): ${CHANGED[*]}"
say "   Unstaged. Read the diff, then commit — publishing this repo is what puts it in effect."
exit 0
