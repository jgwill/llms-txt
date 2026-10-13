# Field 02 — Two-Eyed Seeing (Etuaptmumk)

**Sources:** `bartlett-marshall-marshall-2012`, `wright-etal-2019`, `broadhead-howard-2021`

---

## What it actually is

**Bartlett, C., Marshall, M., & Marshall, A. (2012).** "Two-Eyed Seeing and other lessons learned within a co-learning journey of bringing together indigenous and mainstream knowledges and ways of knowing." *Journal of Environmental Studies and Sciences* 2(4), 331–340. DOI 10.1007/s13412-012-0086-8.

Mi'kmaw Elder **Albert Marshall's** definition, as published:

> learning to see from one eye with the strengths of Indigenous ways of knowing, and from the other eye with the strengths of Western ways of knowing, and using both of these eyes together

Three facts from the source that constrain how it may be used:

1. **It is Mi'kmaw.** *Etuaptmumk* is a Mi'kmaw word and Marshall is a Mi'kmaw Elder. It is not a generic Indigenous principle.
2. **It emerged from a specific institutional practice** — the Integrative Science program at Cape Breton University — over years of co-teaching.
3. **The article's own title names it a *co-learning journey*.** The unit is a relationship between people over time, not a framework one party adopts.

---

## Is this portfolio's usage faithful?

**Partly. The definition is quoted accurately; the application drifts.**

**Accurate:** `llms-medicine-wheel-mcp-tools.md` correctly grounds the work in "Elder Albert Marshall's Two-Eyed Seeing (Etuaptmumk)" and correctly pairs it with Wilson and OCAP®. `/home/mia/.claude/CLAUDE.md` correctly attributes Etuaptmumk to Elder Albert Marshall and correctly identifies it as Mi'kmaq. The *content* of the definition is not distorted.

**Drift 1 — "Two-Eyed AI".** The portfolio's headline construct is a **dual-view metrics abstraction**: one eye on Deep-Thinking Ratio and token efficiency, one eye on Wilson alignment scores and OCAP flags, both computable "in the same space." This is a coinage derived from Marshall's term, not Marshall's term. It is currently presented in `docs/medicine-wheel-research.md` and `docs/indigenous-research-paradigm.md` in a way that reads as though Marshall's framework endorses it.

The mismatch is structural: Marshall's two eyes belong to **people in relationship**, learning together over time. The portfolio's two eyes are **two columns in an evaluation dashboard.** Something specific is lost — the co-learning, which in the source is the whole point.

**Drift 2 — no second eye is actually present.** Two-Eyed Seeing requires both strengths to be genuinely brought. In this repository, the Western/technical eye is fully staffed. The Indigenous eye is represented by cited texts and computed scores, with no named knowledge holder, Elder, or community partner in the loop. Under Marshall's definition, that is one eye and a picture of an eye.

**Drift 3 — a citation to check.** `llms-medicine-wheel-mcp-tools.md:406` cites *"Marshall, A. (2004). Two-Eyed Seeing."* No 2004 publication was confirmed for this. The canonical citable source is **Bartlett, Marshall & Marshall (2012)**, DOI 10.1007/s13412-012-0086-8. The 2004 reference should be replaced or given a real locator.

---

## The critical literature (mandatory reading before publishing)

**Wright, Gabel, Ballantyne, Jack & Wahoush (2019).** *International Journal of Qualitative Methods* 18. DOI 10.1177/1609406919869695. An integrative review finding that practical guidance on Two-Eyed Seeing remains vague, producing inconsistent practice, and that the literature is unsettled on whether it is an ethical protocol, a guiding principle, or a framework. Their warning is directly applicable:

> A simplistic application of Two-Eyed Seeing (e.g., as merely supporting rationale for the consideration of Indigenous perspectives) undermines the entire premise of the approach as egalitarian and collaborative.

The scoping-review literature on Etuaptmumk in health research carries a sharper version of the same caution: the work *"can all too easily slip into a lazy, tokenistic approach in which Etuaptmumk/Two-Eyed Seeing and similar efforts quickly become mere jargon, trivialized, romanticized, co-opted, or used as a 'mechanism' where pieces of knowledge are merely assembled in a way that lacks the S/spirit of co-learning."*

"Pieces of knowledge merely assembled in a way that lacks the spirit of co-learning" is a fair description of a type system that holds Wilson scores next to token metrics. This is the sentence the authors should sit with.

**Broadhead & Howard (2021).** "Confronting the contradictions between Western and Indigenous science: a critical perspective on Two-Eyed Seeing." *AlterNative* 17(1), 111–119. DOI 10.1177/1177180121996326. Argues that Two-Eyed Seeing's commitment to avoiding "a clash of knowledges" has blunted it; that some worldview differences are genuinely irreconcilable; and that in practice Western science is often deployed instrumentally without any real epistemological transformation. Their line — *"conflict-avoidance is not conflict resolution"* — is a direct challenge to a project whose method is to place both epistemologies in one harmonious data structure.

---

## Engineering implications

- Replace the unlocatable *Marshall (2004)* citation with Bartlett, Marshall & Marshall (2012), DOI 10.1007/s13412-012-0086-8.
- State plainly, wherever "Two-Eyed AI" appears, that it is **this portfolio's coinage extending Marshall's Etuaptmumk**, not Marshall's framework.
- Cite Wright et al. (2019) and Broadhead & Howard (2021) in `docs/`. A portfolio that cites Two-Eyed Seeing without citing its critical literature is exactly the shallow application that literature describes.
- Recognise that the strongest available response to Wright et al. is not a better abstraction. It is a named co-learning relationship. Until one exists, the honest description is "informed by Two-Eyed Seeing," not "grounded in Two-Eyed Seeing."
