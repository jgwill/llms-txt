# Context Layer — Indigenous Relational Foundations

**Packet:** `indigenous-relational-foundations`
**Generated:** 2026-07-20
**Method:** `deep-research-foundations`
**Repo:** `avadisabelle/ava-llms-txt` (fork of `jgwill/llms-txt`, published at llms.jgwill.com)

---

## 1. Shared language and canonical terms

Terms used throughout this packet, each fixed to a published source. Where this repository currently uses a term differently, the divergence is noted and carried into `gap-analysis.md`.

| Term | Canonical meaning (source) | How this repo uses it |
|---|---|---|
| **Research as ceremony** | Research IS the ceremony of maintaining accountability to relationships (Wilson 2008) | Used broadly as an epistemological stance; also operationalized as `ceremony_open` / `ceremony_close` software state transitions |
| **Relational accountability** | Accountability to actual relations — people, community, land, ancestors (Wilson 2008) | Rendered partly as a computed score (`computeWilsonAlignment`) |
| **Etuaptmumk / Two-Eyed Seeing** | Learning to see with the strengths of Indigenous ways of knowing from one eye and Western from the other, using both together, in a **co-learning journey** (Bartlett, Marshall & Marshall 2012) | Extended to "Two-Eyed AI" — a dual-view abstraction over metrics |
| **Medicine Wheel** | Nation-specific teachings; used legitimately as a research framework when the researcher is connected to *their* community teachings rather than pan-Indigenizing (Mashford-Pringle & Shawanda 2023) | Used as a generic Four Directions software architecture across many packages |
| **OCAP®** | First Nations Principles of Ownership, Control, Access, Possession — First Nations–specific, registered trademark of FNIGC | Used as a generic computable data-ethics flag type |
| **CARE Principles** | Collective Benefit, Authority to Control, Responsibility, Ethics — international Indigenous data governance, complementing FAIR (Carroll et al. 2020) | Not currently referenced in the repo |
| **Seven Generations** | Haudenosaunee provenance; entered sustainability discourse via Clarkson, Morrissette & Régallet (1992) | Used as a generic long-horizon archival tool name |
| **Structural tension** | The generative discrepancy between current reality and desired outcome (Fritz 1989) | Used as-is, plus asserted as equivalent to "entering sacred space" |
| **MMOT** | A four-step managerial performance conversation (Bodaken & Fritz 2006) | Asserted as equivalent to relational accountability practice |
| **Wétiko / windigo** | Algonquian concept; "the sickness of exploitation" (Forbes) | Spelled "Wetigo", placed in a pan-Indigenous comparison table |
| **mana** | Oceanic (Polynesian/Melanesian, incl. Māori) concept of power, authority, prestige | Placed in the "Indigenous Paradigm Equivalent" column of a table otherwise attributed to Lakota and Innu sources |

---

## 2. Field decomposition (MECE)

Eight fields, chosen so that every load-bearing claim in the portfolio lands in exactly one.

| # | Field | Covers | File |
|---|---|---|---|
| 01 | Indigenous research paradigm | Wilson, Kovach, Smith, Absolon, Chilisa; relational ontology/epistemology/axiology; the Rs | `field-01-indigenous-research-paradigm.md` |
| 02 | Two-Eyed Seeing | Etuaptmumk; Marshall; faithfulness of usage; critical literature | `field-02-two-eyed-seeing.md` |
| 03 | Medicine Wheel propriety | Nation-specificity; conditions of appropriate use; the software-metaphor question | `field-03-medicine-wheel-propriety.md` |
| 04 | Indigenous data sovereignty | OCAP®; CARE; FAIR; Kukutai & Taylor | `field-04-data-sovereignty.md` |
| 05 | Seven Generations | Haudenosaunee provenance vs. generic sustainability usage | `field-05-seven-generations.md` |
| 06 | Structural dynamics | Fritz; MMOT; academic standing of the body of work | `field-06-structural-dynamics.md` |
| 07 | Braiding and appropriation critique | Kimmerer; Tuck & Yang; Todd; Aldred; the synthesis claim itself | `field-07-braiding-and-critique.md` |
| 08 | Indigenous AI | Indigenous Protocol and AI; Abundant Intelligences | `field-08-indigenous-ai.md` |

Field 07 is where the packet's central assessment lives. Fields 01–06 establish what each concept actually is; field 07 asks whether combining them as this portfolio does is supportable; field 08 establishes the standard the adjacent Indigenous-AI field has already set.

---

## 3. Source quality rules applied

Accepted, in descending preference:

1. **Primary Indigenous-authored scholarship** — books and peer-reviewed articles by Indigenous scholars writing from named nations (Wilson, Kovach, Absolon, Todd, Mashford-Pringle, Kimmerer, Lewis, Arista, Whaanga).
2. **Governing bodies speaking for themselves** — FNIGC on OCAP®; the RDA International Indigenous Data Sovereignty Interest Group on CARE.
3. **Peer-reviewed critical scholarship** — including work that challenges this portfolio (Broadhead & Howard, Wright et al., Tuck & Yang, Aldred).
4. **Established trade/practitioner works, labelled as such** — Fritz, Bodaken & Fritz.

Excluded: content farms, AI-generated encyclopedia mirrors, commercial "Indigenous wisdom" vendors, and any page selling ceremonial goods or services. One secondary-sourced entry (`bear-nicholas-via-sfu`) is retained because the argument is important and well-attested, but it is flagged `verified: false` and must not be cited as primary.

---

## 4. Provenance discipline

Every entry in `source-ledger.yaml` carries:

- `verified: true|false` — true only where author, year, title, venue and locator were all confirmed against a live publisher/index/catalogue record on 2026-07-20
- `posture: supports | qualifies | challenges` — so a reader can see at a glance that the ledger is not stacked
- `caution:` / `challenges:` — the specific way the source constrains or contradicts this portfolio's use of it

Two entries are `verified: false` and are named openly in `gap-analysis.md`:

- `bear-nicholas-via-sfu` — argument attested, primary publication not located
- `seven-generations-attribution-caution` — widely reported, primary confirmation outstanding

One entry, `fnigc-ocap`, is `verified: true` but carries a verification note: a direct automated fetch of fnigc.ca returned HTTP 403 and the FNIGC brochure PDF could not be text-extracted. The substance was confirmed from FNIGC page content surfaced in search plus corroborating institutional guides. **A human should read fnigc.ca directly and contact FNIGC before this repository publishes any claim of OCAP® conformance.**

---

## 5. Repo placement and crosswalk

This packet lives at `foundations/indigenous-relational-foundations/` in `avadisabelle/ava-llms-txt` because that is where the claims it grounds are published.

Crosswalk notes for the wider workspace:

- **`jgwill/llms-txt`** — the upstream repo this fork intends to submit a PR to. The packet is written to travel with that PR.
- **`/workspace/JGWILL.md`** — uses the same Four Directions framing across `mia-code-server` rispecs (71), `medicine-wheel` rispecs (7 packages), and the Platform Layer. **Every finding in this packet applies to those repos as well.** GAP-01 and GAP-02 in particular are workspace-wide, not local to this repo.
- **`miadisabelle/Etuaptmumk-RSM`** — carries the article this portfolio's academic positioning derives from, and the tracking issues (#161–#166). This packet should be referenced from that tracking set.
- **`jgwill/medicine-wheel` / `@medicine-wheel/*` npm packages** — the published artifacts most exposed to GAP-02 (OCAP® trademark and scope) and GAP-03 (Wilson alignment as computed score).
- **QMD** — this packet is suitable for indexing and federation. It is written to be readable standalone.

---

## 6. Related artifacts

- `docs/indigenous-research-paradigm.md`, `docs/relational-science.md`, `docs/ceremonial-technology.md`, `docs/medicine-wheel-research.md`, `docs/academic-positioning.md`
- `LICENSE` — the Indigenous Knowledge Stewardship License (IKSL) v1.0
- `KINSHIP.md` — which already records unresolved OCAP ownership questions about the Medicine Wheel Development Suite
- `llms-inquiry-6406eb37-...md`, `llms-creative-orientation.txt`, `llms-structural-tension-charts.txt`, `llms-medicine-wheel-mcp-tools.md`
- `upgrade/260316/05-synthesis-context7-medicine-wheel.md` — already contains the honest note that "AI-conducted research cannot satisfy Wilson's relational accountability… `overallValid: false`". That admission is the most intellectually credible sentence in the repository and should be promoted, not buried.
