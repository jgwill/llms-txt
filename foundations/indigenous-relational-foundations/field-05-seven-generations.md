# Field 05 — Seven Generations

**Sources:** `clarkson-morrissette-regallet-1992`, `seven-generations-attribution-caution` *(unverified)*

---

## Where it comes from

The Seven Generations principle is **Haudenosaunee** in origin, associated with the **Great Law of Peace (Gayanashagowa)** — the oral constitution of the Haudenosaunee Confederacy, variously dated between roughly 1142 and 1500 CE.

That much is consistently attested. The next part is where care is required.

## The attribution caution

The formulation most often quoted —

> *"In every deliberation, we must consider the impact on the seventh generation."*

— is widely attributed to the Great Law of Peace, but **those words do not appear in written transcriptions of the Great Law.**

> **Provenance note:** This caution is consistently reported across multiple secondary sources and is credible, but no primary Haudenosaunee source or peer-reviewed study confirming it was located in this research pass. It is recorded in the ledger as `verified: false`. **Do not present it as settled scholarship.** Before this repository makes any claim about Great Law content, a Haudenosaunee source should be consulted — Onondaga Nation or Haudenosaunee Confederacy publications are the appropriate starting points.
>
> The methodological point stands regardless of how that check resolves: a repository built on relational accountability should not quote another nation's constitution from memory.

## How it entered sustainability discourse

**Clarkson, L., Morrissette, V. & Régallet, G. (1992).** *Our Responsibility to the Seventh Generation: Indigenous Peoples and Sustainable Development.* International Institute for Sustainable Development, Winnipeg.

This is the main documented vector by which "seven generations" moved from Haudenosaunee governance into international sustainable-development language. Two of the three authors are Indigenous (both based in Winnipeg); Régallet was an IISD programme officer.

This matters because it means there are **two distinct lineages**, and a project should know which one it is drawing on:

| Lineage | What it is | Appropriate citation |
|---|---|---|
| **Haudenosaunee ceremonial and governance transmission** | A nation's own law and practice, transmitted within that nation | Requires a Haudenosaunee source; not casually citable |
| **Sustainability-discourse adoption** | A widely-adopted long-horizon design heuristic, in circulation since ~1992 | Clarkson, Morrissette & Régallet (1992) |

Subsequent generic commercial usage — the household-products brand, corporate ESG language — is a third, further-diluted stream. It is not a citable lineage; it is the drift that makes careful attribution necessary.

---

## How this repository uses it

- `archive_for_seven_generations` — an MCP tool in the medicine-wheel server
- `upgrade/260316/05-synthesis-context7-medicine-wheel.md`: *"**Honor seven generations**: Assess long-term impacts of Miadi design choices on descendants' AI sovereignty"*
- The `LICENSE` FAQ: *"consider how your work serves the seven generations to come"*
- Several counter-article templates use "seven generations" as an axiological commitment alongside reciprocity and kinship

**Assessment:** This is the **mildest** of the packet's findings. The usage is generic-sustainability, not a claim to hold Haudenosaunee law. Nothing here asserts Haudenosaunee authority or reproduces Haudenosaunee ceremonial content. The exposure is attribution drift, not appropriation.

But the portfolio does not name the Haudenosaunee anywhere, and it does not cite Clarkson et al. So a reader encountering `archive_for_seven_generations` alongside Medicine Wheel packages and IKSL language would reasonably infer a depth of Indigenous grounding that the seven-generations usage, specifically, does not have.

The fix is one sentence and one citation.

---

## Engineering implications

1. **Name the origin once, in `docs/`:** "Seven Generations thinking is Haudenosaunee in origin. Our usage follows its adoption in sustainable-development practice (Clarkson, Morrissette & Régallet, 1992, IISD) as a long-horizon design heuristic; we do not claim to transmit Haudenosaunee law."

   That sentence resolves the entire finding. It costs nothing and it demonstrates exactly the discipline the portfolio says it values.

2. **Do not quote the "in every deliberation" line** in any published document unless and until a primary Haudenosaunee source is confirmed.

3. **Keep the tool name.** `archive_for_seven_generations` is fine once the lineage is stated. Renaming it would obscure the intent without improving the accuracy.

4. **Cite Clarkson, Morrissette & Régallet (1992)** wherever seven-generations reasoning is invoked as a principle rather than a passing metaphor.
