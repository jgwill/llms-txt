# Guillaume Descoteaux-Isabelle — LLMS-txt

> An interdisciplinary portfolio at the nexus of Indigenous epistemologies, AI systems, and narrative storytelling.

Guidance for AI Companions grounded in relational accountability, structural dynamics, and ceremonial technology.

This repository contains knowledge protected under the **Indigenous Knowledge Stewardship License (IKSL)**.

---

📖 **[Explore the full documentation →](docs/index.md)**

---

| Resource | Description |
|----------|-------------|
| [docs/](docs/index.md) | Full interlinked documentation hub |
| [llms.txt](llms.txt) | Minimal index of all guidance documents |
| [llms-full.txt](llms-full.txt) | Expanded index with detailed summaries |
| [LICENSE](LICENSE) | Indigenous Knowledge Stewardship License |
| [KINSHIP.md](KINSHIP.md) | How this repo relates to the rest of the ecosystem |

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

See [KINSHIP.md](KINSHIP.md#jgwilletc-claude-code--cloned-at-etcclaude-code-on-every-host)
for the union rule, the drift checks, and the exit-code contract.

