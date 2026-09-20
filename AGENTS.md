# AGENTS.md — jgwill/llms-txt

Two crossings run through this repository, and they run in opposite directions. Knowing
which one a file belongs to tells you whether to edit it.

```
   jgwill/medicine-wheel  ──┐                        ┌──→  /etc/claude-code
   jgwill/smcraft         ──┴─→  [ llms-txt ]  ──────┘     (jgwill/etc-claude-code)
        __PULL_upstream.sh                __SYNC_llms.sh
        facts come IN                     guidance goes OUT
```

## Upstream — what is pulled in

A fact has one author. Medicine Wheel owns its package inventory; Stateloom owns its
version table. Those numbers are **pulled** from the source repositories, never retyped
here, by [`__PULL_upstream.sh`](__PULL_upstream.sh) reading
[`__PULL_manifest.txt`](__PULL_manifest.txt).

```bash
./__PULL_upstream.sh --check      # is anything behind its source? changes nothing
./__PULL_upstream.sh              # pull; rewrite what drifted
./__PULL_upstream.sh --offline    # local checkouts only, never the network
```

Sources are read from a local checkout under `/workspace/repos/<owner>/<repo>` when one
exists and from the repository's published docs site when one does not, so a host without
checkouts still pulls.

**Before editing any `llms-*` file, look at its top.** A file whose header reads
*"Pulled, not written"* is generated end to end; an edit there survives until the next
pull and no longer. Correct it in the repository named in that header. A file with
`<!-- PULLED:<id> BEGIN -->` markers is authored here and carries one generated region —
write freely outside the markers, never inside them.

| file | kind |
|---|---|
| `llms-medicine-wheel-packages.txt` | generated — `jgwill/medicine-wheel` |
| `llms-medicine-wheel-mcp-tools.md` | generated — `jgwill/medicine-wheel` |
| `llms-stateloom-suite.md` | generated — `jgwill/smcraft` |
| `llms-stc-state-machine.md` | authored here; §6 package table is grafted from `jgwill/smcraft` |

Everything else in this repository is written here.

## Finish it — commit and push

Work that is written but never pushed reaches nobody. **Do not stop at "ready to commit"
and hand the commit back.** Commit what you edited and push it. That is the end of the
task, not a separate task needing its own permission.

- Stage **by name**, never `git add .` — this checkout carries untracked host-local files
  that are not yours to adopt.
- The push runs `.githooks/pre-push`, which reports upstream drift and distributes to
  `/etc/claude-code`. That distribution is the normal completion of a change here. It is
  not a shared-infra deploy needing a separate word, and the hook never blocks a push.
- No `Co-Authored-By` trailer. No session link.

Hold, and only for these: force-push, rewriting published history, deleting work someone
else wrote, and anything the user put the word **before** in front of ("before you
commit, show me X" means stop at X).

Ending a turn with "say the word and I'll commit" after the work is already done is the
failure this section exists to prevent.

## Distribution — what goes out

Publishing here is the release. [`__SYNC_llms.sh`](__SYNC_llms.sh) carries the set named in
[`__SYNC_manifest.txt`](__SYNC_manifest.txt) into the agent-instruction target
(`/etc/claude-code`, repo `jgwill/etc-claude-code`) and lands it there — a guidance file
that is pushed here but never reaches the target is written, not in effect.

```bash
./__SYNC_llms.sh --install-hook   # once per checkout — the sync then runs at `git push`
./__SYNC_llms.sh --check          # what would travel, changing nothing
```

With the hook installed, `git push` reports upstream drift and then distributes. Both
scripts use the same exit codes: `0` clean or done, `1` drift found, `2` could not look.
The third is the one that matters — "I could not see" must never render as "nothing to do".

See [KINSHIP.md](KINSHIP.md) for how this repository relates to the rest of the ecosystem.
