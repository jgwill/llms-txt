# Field 03 — Medicine Wheel Propriety

**Sources:** `mashford-pringle-shawanda-2023`, `robertson-2021`, `bear-nicholas-via-sfu` *(unverified — see note)*, `aldred-2000`, `kovach-2021`

> This is the sharpest risk area in the portfolio. It is not softened here.

---

## What the literature establishes

### 1. Medicine Wheel teachings are nation-specific, not pan-Indigenous

This is the consistent position across the sources consulted. The Medicine Wheel is not a shared Indigenous symbol held in common; the teachings attached to the four quadrants are **specific to particular nations and communities**, vary between and within them, and in some cases are not appropriate for open publication at all.

The portfolio already states this. `docs/indigenous-research-paradigm.md` lists as anti-pattern #5: *"Pan-Indigenous Flattening — treating all Indigenous worldviews as interchangeable."* The literature agrees with that statement completely. The problem is that the portfolio's practice does not.

### 2. Use as a research framework IS legitimate — under a stated condition

**Mashford-Pringle, A. & Shawanda, A. (2023).** "Using the Medicine Wheel as theory, conceptual framework, analysis, and evaluation tool in health research." *SSM — Qualitative Research in Health* 3, 100251. DOI 10.1016/j.ssmqr.2023.100251.

This is the most useful source for the portfolio, because it says **yes, the Medicine Wheel can be theory, conceptual framework, analysis tool, and evaluation method in research.** That is a real permission, published in a peer-reviewed venue by an Indigenous scholar (Mashford-Pringle is an urban Algonquin woman from Timiskaming First Nation).

But the permission carries a condition, and the condition is the whole thing:

> it is important for researchers and scholars using the Medicine Wheel as a conceptual framework to be **connected to their community teachings rather than pan-Indigenize**

The article's own framework is explicitly grounded in **Anishinaabe** teachings — a named nation. Its method is: reflect on the teachings associated with each quadrant *as your community holds them*.

So the test is not "may the Medicine Wheel be used as a framework?" (yes) but **"is this use grounded in one community's teachings, or composed from several?"**

### 3. The displacement critique

Wolastoqew academic **Andrea Bear Nicholas** is reported to argue that the broad adoption of a generic medicine wheel has *"effectively and almost totally displaced the unique oral traditions of many Indigenous nations"* — the popularized version crowding out the nation-specific teachings it purports to represent.

> **Provenance note:** This argument is well-attested across secondary sources but the primary publication was not located during this research pass. It is recorded in the ledger as `verified: false`. **Do not cite Bear Nicholas as a primary source until the original is located.** The argument itself is corroborated independently by the pan-Indigenization caution in Mashford-Pringle & Shawanda.

### 4. The commercialization frame

**Aldred, L. (2000).** "Plastic Shamans and Astroturf Sun Dances: New Age Commercialization of Native American Spirituality." *American Indian Quarterly* 24(3), 329–352.

Aldred's account of how non-Native packaging of Native spiritual tradition marginalizes and disembodies Indigenous histories is the relevant standard for **any project that distributes ceremonial vocabulary as a product.** The `@medicine-wheel/*` suite is eighteen npm packages, a CLI (`mw`), a server (`mwsrv`), and a 64-tool MCP server. That is distribution at scale. Aldred's critique applies on the basis of *what the artifact does in the world*, independent of the author's intentions — and intentions here appear sincere. That does not exempt the artifact.

### 5. Additional critical voice

**Robertson, L.H. (2021).** "The Medicine Wheel Revisited: Reflections on Indigenization in Counseling and Education." *SAGE Open* 11(2). DOI 10.1177/21582440211015202. Peer-reviewed, open access; examines the contested modern history of the Medicine Wheel and questions how faithfully widely-circulated frameworks represent the traditions they claim. Included as a critical voice; should be read alongside, not instead of, Indigenous-authored sources.

---

## Assessment of this portfolio's usage

The Medicine Wheel here is not treated as one nation's teaching. It is treated as a **general-purpose architectural pattern**: a directional state machine (EAST→SOUTH→WEST→NORTH), a package layout, an agent-role assignment in a LangGraph, a spec-positioning scheme across 71 rispecs, and a session lifecycle.

And the concepts placed in those quadrants are drawn from **at least five unconnected peoples**:

| Concept in the portfolio | Actual origin |
|---|---|
| Etuaptmumk / Two-Eyed Seeing | **Mi'kmaq** (Elder Albert Marshall) |
| Lakota and Mani-Utenam (Innu) attribution in `LICENSE` | **Lakota** (Northern Plains) and **Innu** (Nitassinan, Québec/Labrador) |
| "Wetigo" (wétiko / windigo) | **Algonquian** — Cree, Ojibwe |
| "Nindokendaan" (`docs/storytelling.md`) | **Anishinaabemowin** |
| *mana* (`docs/indigenous-research-paradigm.md`, `docs/relational-science.md`) | **Oceanic** — Polynesian / Melanesian, incl. Māori |
| Medicine Wheel / Four Directions | **Plains and Anishinaabe** traditions, nation-specific |

The *mana* entry deserves particular attention. It appears in the "Indigenous Paradigm Equivalent" column of the table that carries the portfolio's central claim: *"Structural Tension Charting → Entering Sacred Space — tension between vision and reality is **mana**."* Mana is an Oceanic concept — Māori, Hawaiian, Tongan, Samoan, Fijian and related traditions — concerning power, authority, prestige and spiritual efficacy derived from atua and whakapapa. It has no relationship to Lakota, Innu, Mi'kmaw or Anishinaabe thought, and it is not a synonym for generative tension.

**This is textbook pan-Indigenous flattening, occurring inside the document that names pan-Indigenous flattening as anti-pattern #5.** It is the packet's single most significant finding, and the good news is that it is also the most fixable.

---

## Is the Medicine Wheel appropriate as a *software architecture* metaphor?

The published literature does not address software architecture directly. What it establishes is a test, and the test transfers cleanly:

| Test | This portfolio |
|---|---|
| Grounded in **one** community's teachings? | No — composed across five-plus peoples |
| Author connected to **their** community teachings for this wheel? | Not stated in the repository. May be true; if so, state which nation and which teachings |
| Are the teachings appropriate for open publication? | Not established. No community has been asked, per the repo's own `LICENSE` |
| Distributed commercially or at scale? | Yes — 18 npm packages, CLI, server, 64-tool MCP |
| Community review before publication? | None recorded |

The honest conclusion: **using a four-directions cyclical structure as a development lifecycle is not inherently improper.** Cyclical development, seasonal metaphors, and directional phase models are widely used. What creates the exposure is (a) *naming* it Medicine Wheel, (b) attaching teachings from multiple nations to the quadrants, and (c) publishing it as an Indigenous-grounded product.

Those three are separable. That is where the remedy lives.

---

## Engineering implications

1. **Remove *mana* from the comparison tables**, or replace it with a concept from a nation actually named in the portfolio's own attribution, with a citation. This is a two-line fix with outsized effect.
2. **Attribute each borrowed term to its nation inline** — "wétiko (Cree; see Forbes)", "Etuaptmumk (Mi'kmaw; Marshall)", "Nindokendaan (Anishinaabemowin)". This alone converts the largest risk into a demonstration of care.
3. **State which nation's teachings the Four Directions structure draws on**, or state that it is a general cyclical structure the authors are working with and not a rendering of any nation's Medicine Wheel teachings. Either is defensible. The current silence is not.
4. **Cite Mashford-Pringle & Shawanda (2023)** in `docs/medicine-wheel-research.md`. It is the source that grants the permission the portfolio needs — and quoting its condition alongside its permission is what makes the citation honest.
5. Consider whether the **published package names** need to carry "medicine-wheel". A rename is expensive; it is listed here as a decision to make consciously rather than by default.
