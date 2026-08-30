---

## Distribution

Publishing here is the release. `__SYNC_llms.sh` carries the set named in
[`__SYNC_manifest.txt`](__SYNC_manifest.txt) into the agent-instruction target
(`/etc/claude-code`, repo `jgwill/etc-claude-code`) and lands it there — a guidance file
that is pushed here but never reaches the target is written, not in effect.

```bash
./__SYNC_llms.sh --install-hook   # once per checkout — the sync then runs at `git push`
./__SYNC_llms.sh --check          # what would travel, changing nothing
```

