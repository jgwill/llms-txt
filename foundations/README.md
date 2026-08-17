# `foundations/`

Repository-local **foundations packets**: durable, provenance-disciplined academic grounding for the claims this portfolio makes.

A foundations packet is not a research summary and not marketing. It is the place where a claim made elsewhere in this repository is checked against the published literature, and where the checking is recorded honestly — including when the check fails.

---

## Packets

| Packet | Topic | Status |
|---|---|---|
| [`indigenous-relational-foundations/`](indigenous-relational-foundations/) | The Indigenous-paradigm, Two-Eyed Seeing, Medicine Wheel, data-sovereignty, Seven Generations, and Fritz structural-dynamics claims made across `docs/` and the `llms-*` guidance files | v1.0 — 2026-07-20 |

---

## What a packet contains

Per the `deep-research-foundations` stewardship contract:

```
foundations/<topic>/
  README.md                 # what this packet is, how to read it
  context-layer.md          # shared language, field decomposition, provenance rules
  intent-understanding.md   # why the packet exists, audience, structural tension
  synthesis.md              # what the literature actually establishes
  gap-analysis.md           # what is grounded / plausible / not defensible as stated
  source-ledger.yaml        # every source, with locator and verified flag
  field-NN-*.md             # one file per field
```

---

## Maintenance rules

1. **Every source in `source-ledger.yaml` carries a `verified` flag.** `verified: true` means the citation was checked against a live publisher, index, or repository record and the author/year/title/venue/locator all matched. `verified: false` means it could not be confirmed and must not be cited as settled in any public-facing document.

2. **Never add a citation you have not opened or confirmed against a catalogue record.** This repository's entire thesis is relational accountability. A fabricated citation is not a formatting error here — it is a breach of the thing being claimed.

3. **Critical sources are mandatory, not optional.** A packet that cites only sources supporting the portfolio's position is not a foundation. Scholarship that challenges the synthesis belongs in the ledger with the same weight.

4. **The gap analysis is the load-bearing document.** When a claim moves from "not currently defensible" to "grounded," update `gap-analysis.md` first and record what changed. When a claim in `docs/` is reworded in response to this packet, note it.

5. **Do not adjudicate identity or relationship.** These packets establish what the *published literature* says and what conditions the relevant communities and scholars describe as appropriate. They do not, and cannot, assess anyone's standing, kinship, or right to particular knowledge. That determination belongs to the people and communities concerned.

6. **Date every revision.** Fields move. The Medicine Wheel and Indigenous data-sovereignty literatures in particular are actively developing.

---

*Packets are written to be read by people preparing to make a public claim — including in a pull request to an upstream repository. They should make an over-reaching claim uncomfortable to publish.*
