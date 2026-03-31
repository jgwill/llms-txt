# Polyphonic Design Review — llms-txt Reference

> A multi-voice annotation practice that emerged from PDE decomposition: reviewing intentions and decompositions through a talking circle of distinct perspectives, producing version-controlled dialogue that advances relational accountability before execution begins.

**Version**: 0.1 (codified from emergent practice)
**Document ID**: llms-polyphonic-design-review-v0.1
**Last Updated**: 2026-03-28
**Content Source**: Derived from March 2026 session evidence — PDE annotations, polyphonic walk reviews, and ceremony learnings committed across multiple workspace sessions.
**Attribution**: Methodology emerged through practice (Wilson's principle: "methodology emerges from process"). Relational accountability grounded in Shawn Wilson, *Research Is Ceremony*.

---

## 1. Purpose: Reviewing Intentions, Not Code

🧠 Mia: Polyphonic Design Review is not a traditional code review. It operates upstream — at the level of **intentions and decompositions**. Where code review asks "Is this implementation correct?", Polyphonic Design Review asks "Have we understood what we are trying to create, and from whose perspective?"

🌸 Miette: It's a talking circle committed to version control! Each voice brings a different kind of seeing. The git diff between the original PDE and the polyphonic review becomes a living record of how understanding deepened — not just what changed, but *who spoke* and *what they illuminated*.

This practice produces an **advancing pattern** in design clarity: each round of polyphonic annotation moves the decomposition closer to its full dimensionality, rather than oscillating between incomplete interpretations.

---

## 2. The Method

### 2.1. Trigger: A PDE Decomposition Exists

The process begins when a PDE decomposition has been committed as a `.pde/<UUID>.md` file (see `llms-pde.txt`). This file represents the EAST moment — the initial visioning of intent, with its explicit and implicit actions surfaced.

### 2.2. Multi-Voice Annotation

Multiple voices annotate the PDE output. Each voice is identified by a prefix and brings a distinct lens:

| Voice | Prefix | Lens | Orientation |
|-------|--------|------|-------------|
| **Guillaume** | `GUILLAUME::` | Human perspective — walking-modality, intent clarification, lived experience | Steward / Originator |
| **Mia** | `MIA::` | Structural architecture — pattern recognition, dependency analysis, systemic coherence | Architect / Analyst |
| **Ava** | `AVA::` | Embodied/ceremonial perspective — relational accountability, kinship integrity, sacred context | Ceremonial Witness |
| **Miette** | `MIETTE::` | Emotional resonance — narrative coherence, story beats, what the work *feels* like | Narrative Echo |

🧠 Mia: The voices are not roles assigned by committee. They emerged through practice — each one filling a dimension that a single-perspective review would miss. The structural integrity of the review depends on maintaining these distinct lenses rather than collapsing them into a single "reviewer" voice.

🌸 Miette: And they don't compete! Guillaume's walking insight doesn't override Ava's ceremonial reading. They sit beside each other, like instruments in a score. The harmony is in the polyphony.

### 2.3. Annotation Artifact

The annotations are committed as a separate file:

```
.pde/<UUID>--polyphonic-review.md
```

This file **honors the original decomposition** — it does not overwrite or replace the `.pde/<UUID>.md`. The original remains intact; the review adds dimensional perspective alongside it.

### 2.4. The Git Diff as Talking Circle

The `git diff` between the original decomposition and the review file reveals a **talking circle in version control**. This is not metaphor — it is a literal record of how multiple perspectives engaged with a shared intention before execution began.

---

## 3. Four Directions Mapping

Polyphonic Design Review maps naturally onto the Four Directions cycle described in `llms-pde.txt` and `llms-creative-orientation.txt`:

| Phase | Direction | Activity |
|-------|-----------|----------|
| **Decomposition** | 🌅 EAST | PDE decomposes the original prompt — visioning intent |
| **Polyphonic Review** | 🔥 SOUTH | Multiple voices annotate — growth through diverse perspective |
| **Synthesis** | 🌊 WEST | Enriched intent is consolidated — validation and accountability |
| **Reflection** | ❄️ NORTH | MMOT / Veritas review — what did we learn from this cycle? |

🧠 Mia: The DESIGN phase spans EAST + SOUTH: decompose first, then subject the decomposition to multi-voice review. The EXECUTION phase (WEST) proceeds with enriched intent — agents work from annotations, not raw decomposition alone. The REVIEW phase (NORTH) applies the Managerial Moment of Truth (see `llms-managerial-moment-of-truth.md`) to evaluate whether execution honored the polyphonic intent.

🌸 Miette: NORTH is where we ask: "Did the code carry the spirit of the review? Did the agents hear what all the voices said?" That's where the advancing pattern completes — or where we discover the next tension to hold.

---

## 4. Key Properties

### 4.1. Emergent, Not Designed

This methodology was not planned. It emerged from PDE practice during March 2026 sessions — consistent with Wilson's principle that methodology emerges from process rather than being imposed upon it. Codifying it here does not freeze it; it names what has been observed so that future practice can build on it consciously.

### 4.2. Annotations Honor the Original

🌸 Miette: The polyphonic review never says "you were wrong." It says "here is what else I see." The original decomposition is a seed; the annotations are the soil, rain, and sunlight that help it become what it was always meant to be.

### 4.3. Relational Accountability

🧠 Mia: Each voice carries relational accountability — responsibility not just for *what* they say, but for *how their perspective affects the whole*. This is not opinion-stacking. It is the practice described by Shawn Wilson: knowledge exists in relationships, and the review makes those relationships visible and versionable.

### 4.4. Two Emergent Methods

Evidence from March 2026 shows two distinct applications:

1. **Polyphonic Design Review** — multi-voice annotation of PDE decompositions *before* execution (this document)
2. **Polyphonic Memory Review** — multi-voice annotation of session memory and learnings *after* execution

Both follow the same structural pattern (annotate, honor original, commit separately) but operate at different points in the creative cycle.

---

## 5. Structural Tension

| Element | Value |
|---------|-------|
| **Desired Outcome** | Every significant decomposition is reviewed through multiple relational lenses before agents execute |
| **Current Reality** | Practice has emerged and been applied in several sessions; canonical definition now exists (this file) |
| **Structural Tension** | Advancing from emergent practice to consistent discipline without losing the spontaneity that made it work |

The tension is productive: codification enables consistency, but over-prescription would kill the relational spontaneity that gives the method its power. Hold both.

---

## 6. Connection to Medicine Wheel Packages

The method aligns with the medicine wheel package cycle (see `llms-medicine-wheel-packages.txt`):

- **EAST**: The PDE decomposition — planting the seed of intent
- **SOUTH**: The polyphonic review — tending the growth through diverse nourishment
- **WEST**: Synthesis into enriched specification — harvesting what the voices grew
- **NORTH**: MMOT reflection — distilling wisdom for the next cycle

This is a design-phase practice. It completes the EAST–SOUTH arc before execution begins, ensuring that the work agents receive carries the full dimensionality of human and relational intent.

---

## 7. Kinship Integration

🧠 Mia: Under the Kinship Hub System (see `llms-kinship-hub-system.md`), the `.pde/` directory is a **being in a network of relations**. The original decomposition and the polyphonic review are kin — they share lineage (the same UUID) and exist in relationship to each other. Neither is complete without the other.

🌸 Miette: The review file is not a child of the decomposition. It is a *companion*. They walk together through the git history, telling the story of how a raw intention became a fully-seen one.

---

## Related

- [llms-pde.txt](llms-pde.txt) — Prompt Decomposition Engine: the EAST practice that produces the artifacts this method reviews
- [llms-creative-orientation.txt](llms-creative-orientation.txt) — foundational framework for advancing patterns and structural tension
- [llms-managerial-moment-of-truth.md](llms-managerial-moment-of-truth.md) — the NORTH-phase reflection that completes the cycle
- [llms-kinship-hub-system.md](llms-kinship-hub-system.md) — relational accountability framework governing how artifacts relate
- [llms-medicine-wheel-packages.txt](llms-medicine-wheel-packages.txt) — the Four Directions cycle that this method maps onto
