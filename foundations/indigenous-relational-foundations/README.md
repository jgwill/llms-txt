# Indigenous Relational Foundations

A foundations packet grounding — and honestly bounding — the Indigenous-paradigm, Two-Eyed Seeing, Medicine Wheel, data-sovereignty, Seven Generations, and structural-dynamics claims made across this portfolio.

**Generated:** 2026-07-20 · **Method:** `deep-research-foundations` · **Status:** v1.0

---

## Read in this order

| # | File | What it gives you |
|---|---|---|
| 1 | [`synthesis.md`](synthesis.md) | **Start here.** What the literature establishes, the four findings that matter, what to do |
| 2 | [`gap-analysis.md`](gap-analysis.md) | Every claim classified 🟢 / 🟡 / 🔴, with suggested rewording and a priority order for the PR |
| 3 | [`source-ledger.yaml`](source-ledger.yaml) | 27 sources with locators, verification flags, and a `posture` field marking which ones challenge this work |
| 4 | [`context-layer.md`](context-layer.md) | Shared terms, field decomposition, source-quality rules, provenance discipline, repo crosswalk |
| 5 | [`intent-understanding.md`](intent-understanding.md) | Why the packet exists, audience, current reality, structural tension |

**Field files** (one per field, cited in the synthesis):

- [`field-01-indigenous-research-paradigm.md`](field-01-indigenous-research-paradigm.md) — Wilson, Kovach, Smith, Absolon, Chilisa; the Four Rs attribution
- [`field-02-two-eyed-seeing.md`](field-02-two-eyed-seeing.md) — Etuaptmumk; faithfulness of usage; the critical literature
- [`field-03-medicine-wheel-propriety.md`](field-03-medicine-wheel-propriety.md) — **the sharpest risk area**; nation-specificity; conditions of appropriate use
- [`field-04-data-sovereignty.md`](field-04-data-sovereignty.md) — OCAP® trademark and scope; CARE as the fitting framework
- [`field-05-seven-generations.md`](field-05-seven-generations.md) — Haudenosaunee provenance vs. generic usage
- [`field-06-structural-dynamics.md`](field-06-structural-dynamics.md) — Fritz; MMOT; honest disciplinary framing
- [`field-07-braiding-and-critique.md`](field-07-braiding-and-critique.md) — **the central assessment**; Kimmerer, Tuck & Yang, Todd; full suggested rewording
- [`field-08-indigenous-ai.md`](field-08-indigenous-ai.md) — the standard the Indigenous AI field has already set

---

## Headline findings

| | Finding |
|---|---|
| 🔴 | The portfolio lists **"Pan-Indigenous Flattening"** as anti-pattern #5, then performs it in its own central table — composing Mi'kmaw, Lakota, Innu, Algonquian and **Polynesian** (*mana*) concepts into one column |
| 🔴 | **OCAP®** is First Nations–specific and a registered FNIGC trademark, obtained expressly to prevent misuse. This repo ships `auditOcapCompliance()` and claims sovereignty is "enforced at the code level" |
| 🔴 | **"Structural Dynamics IS Ceremonial Technology"** — bold, in three documents, uncited, and unaffirmed by any knowledge keeper. Tuck & Yang (2012) name this exact move |
| 🔴 | `computeWilsonAlignment` renders relational accountability as a number. The repo's own upgrade log already says this cannot work (`overallValid: false`) |
| 🟢 | Wilson's relational ontology/epistemology/axiology framing is **faithfully rendered and publishable as stated** |
| 🟢 | The structural-dynamics work is **original, accurate, and stands on its own** |

**Four edits, roughly four lines, remove most of the exposure.** See the priority table at the end of `gap-analysis.md`.

---

## Provenance

27 sources. **25 verified**, 2 declared unverified. Verified means author, year, title, venue and locator were all confirmed against a live publisher, journal, catalogue or repository record on 2026-07-20.

The two unverified entries — `bear-nicholas-via-sfu` and `seven-generations-attribution-caution` — are named openly in `gap-analysis.md` and **must not be cited as settled**.

One verified entry, `fnigc-ocap`, carries a caveat: fnigc.ca returned HTTP 403 to automated fetch. **A human should read fnigc.ca/ocap-training directly and contact FNIGC before this repository publishes any OCAP® claim.**

**9 of 27 sources are postured `challenges`** — scholarship that contradicts or constrains this portfolio's synthesis. A foundations packet that cited only friendly sources would not be a foundation.

---

## Scope

This packet establishes **what the published literature says** about these concepts, and **under what conditions the relevant communities and scholars describe their use as appropriate.**

It does not assess anyone's identity, ancestry, relationships, or right to particular knowledge. It has no basis for that and does not speculate. Several findings resolve simply by *stating a relationship or lineage that may already exist* — the authors are the only ones positioned to do that.

---

## Maintenance

See [`../README.md`](../README.md) for the maintenance contract. In brief: every source carries a `verified` flag; critical sources are mandatory; the gap analysis is the load-bearing document; date every revision.

**Cross-repo note:** GAP-01 and GAP-02 apply beyond this repository — the same Four Directions framing and `OCAP` API surface propagate into `mia-code-server` (71 rispecs), `jgwill/medicine-wheel` (7 packages), and the published `@medicine-wheel/*` npm suite. Correcting them here corrects them at the source. See `context-layer.md` §5.
