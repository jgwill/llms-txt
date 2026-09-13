# Gap Analysis — Indigenous Relational Foundations

**Packet:** `indigenous-relational-foundations` · **Date:** 2026-07-20

Each claim is classified:

- 🟢 **Grounded** — supported by verified published sources; publishable as stated
- 🟡 **Plausible but unestablished** — reasonable, not contradicted, but asserted rather than demonstrated; publishable **with** an explicit caveat
- 🔴 **Not currently defensible as stated** — contradicted by, or unsupported against, the published record; requires rewording before publication

> **Scope reminder.** These findings concern *what is published and how it is worded.* They do not concern anyone's identity, ancestry, relationships, or right to particular knowledge — this packet has no basis for that and makes no such assessment. Several findings are resolved simply by *stating a relationship or lineage that may already exist.*

---

## Summary

| ID | Claim | Verdict |
|---|---|---|
| GAP-01 | Four Directions / Medicine Wheel structure with concepts drawn from multiple nations | 🔴 |
| GAP-02 | OCAP® as a computable flag "enforced at the code level" | 🔴 |
| GAP-03 | `computeWilsonAlignment` — relational accountability as a numeric score | 🔴 |
| GAP-04 | "Structural Dynamics **IS** Ceremonial Technology" | 🔴 |
| GAP-05 | Seven Generations usage | 🟡 |
| GAP-06 | Fritz's structural dynamics presented without disciplinary framing | 🟡 |
| GAP-07 | "Wilson's 3R" / Four Rs attribution | 🔴 *(simple factual error)* |
| GAP-08 | "Alignment with Abundant Intelligences" | 🟡 |
| GAP-09 | IKSL presented as operative governance | 🟡 |
| GAP-10 | Wilson / Kovach / Marshall relational ontology framing | 🟢 |
| GAP-11 | Creative orientation, structural tension, advancing/oscillating patterns | 🟢 |
| GAP-12 | Two-Eyed Seeing definition as quoted | 🟢 · usage 🟡 |

Two 🔴 findings (GAP-02, GAP-07) are simple factual corrections. Two (GAP-01, GAP-04) require rewording. **None require abandoning the work.**

---

## 🔴 GAP-01 — Pan-Indigenous composition

**Claimed:** A Four Directions / Medicine Wheel architecture presented as a coherent Indigenous grounding.

**Problem:** The concepts placed in that structure come from at least five unconnected peoples — Mi'kmaq (Etuaptmumk), Lakota and Innu (per `LICENSE`), Cree/Ojibwe ("Wetigo"), Anishinaabe ("Nindokendaan"), and Polynesia (*mana*). The Medicine Wheel itself is Plains/Anishinaabe and nation-specific.

Mashford-Pringle & Shawanda (2023) permit the Medicine Wheel as a research framework **on the condition** that researchers are "connected to their community teachings rather than pan-Indigenize." Kovach (2021) grounds Indigenous methodology in tribal-specific epistemology.

`docs/indigenous-research-paradigm.md` lists **"Pan-Indigenous Flattening"** as anti-pattern #5 — and then does it, in the table two screens above.

**Suggested rewording:**
1. Remove *mana* from the equivalence tables, or replace with a properly cited concept from a nation named in the portfolio's own attribution. *(Two lines. Largest single risk reduction available.)*
2. Attribute every borrowed term to its nation inline: "wétiko (Cree — Forbes)", "Etuaptmumk (Mi'kmaw — Marshall)", "Nindokendaan (Anishinaabemowin)".
3. Add to `docs/medicine-wheel-research.md`: *"The Four Directions structure we use is a cyclical development lifecycle. Medicine Wheel teachings are nation-specific and vary between and within nations; we do not present this architecture as a rendering of any nation's Medicine Wheel teachings."* — **or**, if the authors are working from a specific nation's teachings, name that nation and that relationship. Either resolves it.
4. Cite Mashford-Pringle & Shawanda (2023) — including their condition, not only their permission.

---

## 🔴 GAP-02 — OCAP® misuse

**Claimed:** `llms-medicine-wheel-packages.txt:175` — *"OCAP® Sovereignty: Indigenous data sovereignty (Ownership, Control, Access, Possession) is **enforced at the code level**."* Plus `OCAPFlags`, `auditOcapCompliance()`, `ocap_compliance_checker`.

**Problem:** Three verified facts. OCAP® is **First Nations–specific and explicitly not pan-Indigenous**. OCAP® and PCAP® are **registered trademarks of FNIGC** (logos Aug 2014, acronyms Aug 2015), obtained specifically *to prevent misuse and improper interpretation that could distort the principles' original intent*. And OCAP® describes a **governance relationship** in which a First Nation holds authority — not a property software can self-assess.

"Enforced at the code level" inverts the direction of authority: it relocates enforcement from the nation to the software. `KINSHIP.md` already senses the tension ("the OCAP isn't clear on that"). It has not reached the API.

**Suggested rewording:**
1. **Delete "enforced at the code level."** It is the most quotable line against this project.
2. Migrate the API to **CARE** (Carroll et al. 2020, DOI 10.5334/dsj-2020-043) — international, no trademark, purpose-built for exactly this: `OCAPFlags` → `CareFlags`; `auditOcapCompliance()` → `assessCareAlignment()`; `ocap_compliance_checker` → `care_alignment_checker`.
3. "Compliance" → "alignment" or "assessment" throughout.
4. Retain OCAP® only as a *documented reference* ("informed by the First Nations Principles of OCAP®; see fnigc.ca"), and **contact FNIGC before publishing any OCAP® claim.**

---

## 🔴 GAP-03 — Wilson alignment as a computed score

**Claimed:** `computeWilsonAlignment()`, "Wilson alignment scores," "Wilson alignment over time" dashboards, `wilson_paradigm_checker`.

**Problem:** Wilson's relational accountability is accountability to **actual, named, living relations** — specific people, community, territory, ancestors — held by a researcher who is known and answerable to them. It is not a property of a data structure, and it cannot be discharged computationally.

**The repository already knows this.** `upgrade/260316/05-synthesis-context7-medicine-wheel.md`: *"AI-conducted research cannot satisfy Wilson's relational accountability. The transformation snapshot returned `overallValid: false`."* That is correct and well-reasoned — and it is buried in an upgrade log while `docs/` presents the scores confidently.

**Suggested rewording:**
1. Rename to what it measures: `computeRelationalCompletenessHeuristic()` or `assessDocumentedRelations()`.
2. If the Wilson name is kept, every reference needs the caveat: *"This heuristic checks whether relations, obligations and ceremony context have been **documented**. It does not and cannot assess relational accountability in Wilson's sense, which is held between people and cannot be computed."*
3. **Promote the `overallValid: false` finding into `docs/`.** It is the most intellectually credible sentence in the repository. Publishing it is a strength, not an admission.

---

## 🔴 GAP-04 — "Structural Dynamics IS Ceremonial Technology"

**Claimed:** In bold, in three documents, with no citation anywhere.

**Problem:** Asserts identity where the supportive literature (Kimmerer; Bartlett/Marshall/Marshall) explicitly keeps strands distinct. Uncited. Its supporting table pan-Indigenizes (GAP-01). It mischaracterises MMOT — a managerial performance conversation — as a practice that "prevents Wetigo." No knowledge keeper has affirmed it; the portfolio's own `LICENSE` records knowledge keepers as "to be designated." And Tuck & Yang (2012) name this exact move: grafting decolonial vocabulary onto an existing Western framework, yielding decolonial standing without material transfer.

**This is the claim most likely to be over-reaching, and it is over-reaching.**

**Suggested rewording:** See `field-07-braiding-and-critique.md` for the full replacement text. In brief — replace "IS" with an explicitly-labelled resonance under exploration; retitle the table's second column to "Resonance we notice (analogy, not equivalence)"; state that no knowledge keeper has reviewed the correspondence; acknowledge that it may not be available to be made (Broadhead & Howard 2021; Tuck & Yang 2012).

---

## 🔴 GAP-07 — Four Rs attribution *(simple factual error)*

**Claimed:** "Wilson's 3R"; the Four/Six Rs cited without attribution.

**Correction:** The Four Rs — Respect, Relevance, Reciprocity, Responsibility — originate with **Kirkness, V.J. & Barnhardt, R. (1991)**, *Journal of American Indian Education* 30(3), 1–15. Wilson works within and extends this lineage; he did not originate it.

**Fix:** Cite Kirkness & Barnhardt wherever the Rs appear. One-line change, and in a document about relational accountability, correct attribution is not cosmetic.

---

## 🟡 GAP-05 — Seven Generations

Usage is generic-sustainability, not a claim on Haudenosaunee law — the mildest finding here. But the Haudenosaunee are never named and Clarkson et al. (1992) is never cited, so context implies more depth than the usage has.

**Fix:** One sentence in `docs/`: *"Seven Generations thinking is Haudenosaunee in origin. Our usage follows its adoption in sustainable-development practice (Clarkson, Morrissette & Régallet, 1992, IISD); we do not claim to transmit Haudenosaunee law."* Do not quote the "in every deliberation" line — it does not appear in written transcriptions of the Great Law *(secondary sources only; see ledger)*.

---

## 🟡 GAP-06 — Fritz without disciplinary framing

Fritz's work is presented alongside peer-reviewed Indigenous scholarship without noting that it is trade-press practitioner literature with no substantial peer-reviewed empirical base. Senge's endorsement and the Innovation Associates lineage are real and citable, but they are practitioner standing, not validation.

**Fix:** State the disciplinary location plainly in `docs/creative-orientation.md` and `docs/structural-tension.md`. This *strengthens* the portfolio — it shows the authors know what kind of claim they are making. Cite Fritz (1989, ISBN 9780449903377) and Bodaken & Fritz (2006, ISBN 9780743288521) properly; the repo currently cites itself for Fritz's ideas.

---

## 🟡 GAP-08 — "Alignment with Abundant Intelligences"

Abundant Intelligences is defined by Indigenous leadership, Indigenous majority, 12 community-based organizations, and knowledge keepers in the room. "Alignment" in that field is a claim about **constitution**, not topic.

**Fix:** "Informed by" / "in conversation with" instead of "aligned with." Cite Lewis, Whaanga & Yolgörmez (2024), DOI 10.1007/s00146-024-02099-4. Reframe the pod references so they describe the programme rather than situating this work inside it.

---

## 🟡 GAP-09 — IKSL as operative governance

The `LICENSE` asserts a governance regime — Indigenous protocols taking precedence, license revocation for ceremonial violations, restorative processes — while recording `"knowledge_keepers": ["To be designated by community"]` and `Contact: [Community contact to be established]`. It also names two unconnected peoples (Lakota; Mani-Utenam Innu) as joint origin communities.

The license describes authority that does not yet operate. That is an honest early state, but it is not currently labelled as one, and unenforced governance language can read as a claim to sanction that has not been given.

**Fix:** Add a status header — *"IKSL v1.0 is an aspirational stewardship framework authored by this repository's steward. Knowledge keepers have not yet been designated and community governance is not yet operational. It states commitments we hold ourselves to; it does not represent authority granted by any nation."* Separate the Lakota and Innu attributions and describe each relationship distinctly, or state that transmission paths are still being documented.

---

## 🟢 GAP-10, GAP-11, GAP-12 — What is solid

**GAP-10 — Relational ontology / epistemology / axiology framing.** The four-quadrant retraining tables are a faithful, recognisable rendering of Wilson (2008), consistent with Kovach, Absolon and Chilisa. **Publishable as stated.** Improvement: cite the scholars by name and nation rather than citing internal `llms-*` files.

**GAP-11 — Creative orientation and structural tension.** Accurately represents Fritz. Original technical development (`smcraft`, STC MCP tooling, state-machine formulation) is genuine and stands on its own. **Publishable as stated**, with GAP-06's framing note.

**GAP-12 — Two-Eyed Seeing.** The *definition* as quoted is accurate and correctly attributed to Elder Albert Marshall. 🟢. The *application* — "Two-Eyed AI" as a dual-view metrics abstraction, with no co-learning partner — is 🟡: label it as this portfolio's coinage extending Marshall's Etuaptmumk, cite Wright et al. (2019) and Broadhead & Howard (2021), and replace the unlocatable *Marshall (2004)* citation with Bartlett, Marshall & Marshall (2012).

---

## Unverified — declared

Two ledger entries are `verified: false` and **must not be cited as settled**:

| Entry | Status | Required before use |
|---|---|---|
| `bear-nicholas-via-sfu` | Argument well-attested in secondary sources; primary publication not located | Locate the primary, or cite the SFU Library page explicitly as secondary |
| `seven-generations-attribution-caution` | Widely reported that the popular "seventh generation" edict is absent from written Great Law transcriptions; no primary or peer-reviewed confirmation found | Consult a Haudenosaunee source (Onondaga Nation / Haudenosaunee Confederacy publications) |

One entry, `fnigc-ocap`, is `verified: true` with a caveat: fnigc.ca returned HTTP 403 to automated fetch and the FNIGC brochure PDF could not be text-extracted. Substance was confirmed via FNIGC page content surfaced in search plus corroborating institutional guides, consistent across sources. **A human should read fnigc.ca/ocap-training directly and contact FNIGC before publishing any OCAP® claim.**

---

## Priority order for the PR

| # | Action | Cost | Risk reduced |
|---|---|---|---|
| 1 | Delete "OCAP® … enforced at the code level" | One line | Very high |
| 2 | Remove *mana* from the equivalence tables | Two lines | Very high |
| 3 | Reword "Structural Dynamics IS Ceremonial Technology" | One section | Very high |
| 4 | Attribute each borrowed term to its nation, inline | ~10 lines | High |
| 5 | Fix Four Rs attribution → Kirkness & Barnhardt (1991) | One line | Medium *(accuracy)* |
| 6 | Promote the `overallValid: false` finding into `docs/` | One paragraph | High *(credibility gain)* |
| 7 | Cite real sources in `docs/` "Key Sources" instead of internal files | ~30 lines | High |
| 8 | Add IKSL status header | One paragraph | Medium |
| 9 | "Aligned with" → "informed by" for Abundant Intelligences | One line | Medium |
| 10 | Migrate `OCAP*` API surface → CARE | Refactor + release | High *(deferrable)* |

Items 1–9 are documentation edits achievable in a single pass. Item 10 is the only one requiring engineering work, and it can follow.
