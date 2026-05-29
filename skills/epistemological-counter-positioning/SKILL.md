---
name: epistemological-counter-positioning
description: >
  Protocol for writing academic counter-positions when epistemological, ontological, or
  methodological foundations diverge from mainstream assumptions. Use when analyzing academic
  sources for embedded biases, writing counter-articles, engaging in paradigmatic disagreement,
  protecting relational/ceremonial/structural-tension paradigm from problem-solving bias in
  academic literature, or detecting bias injection points in research sources.
---

# Epistemological Counter-Positioning Protocol

## What This Is

When you disagree with an academic source on **epistemological, ontological, or methodological grounds**, you're engaging in **deep disagreement** — not surface-level debate about findings, but fundamental divergence about how we know things, what exists as real, and how knowledge is produced.

## Six Article Types for Deep Disagreement

### Type 1: Position Paper
Stakes out your alternative paradigm without extensive critique.
- Opening: Name the problem in their assumptions
- Your positive vision: What your paradigm ENABLES
- Implicit contrast through different outcomes
- Use when: Establishing your framework as generative, not reactive

### Type 2: Critical Review / Systematic Critique
Examines another scholar's work across epistemological dimensions.
- Map their paradigm assumptions
- Locate the violation of relational principles
- Expose the bias
- Demonstrate your alternative produces different outcomes
- Use when: Educating readers WHY the disagreement matters

### Type 3: Genealogical Critique (Foucauldian)
Traces how a concept became "truth" through historical/power analysis.
- Historical emergence of the concept
- Discourse analysis of institutions maintaining it
- Power effects: who benefits, who's silenced
- Denaturalization: show "natural" is actually constructed
- Use when: The bias is systemic, embedded in institutions

### Type 4: Methodological Schism
Names fundamental incompatibility between two approaches.
- Define the schism at core assumption level
- Show incompatibility (don't try to bridge)
- Trace consequences of each paradigm
- Choice required — no neutral ground
- Use when: Refusing false synthesis

### Type 5: Epistemic Injustice Critique (Miranda Fricker)
Analyzes how a framework silences or discredits other knowledge.
- Identify what knowledge is systematically discredited
- Mechanism of silencing ("not scientific", "too soft")
- Cost of exclusion
- Corrective protocol
- Use when: Whose knowledge counts is the core issue

### Type 6: Positioned Response / Standpoint Critique
Makes your epistemological position explicit then critiques.
- Positionality statement: name your standpoint
- Contrast their (often unmarked/assumed neutral) stance
- Validate your alternative's rigor and generativity
- Use when: Foregrounding that all knowledge is situated

## Structural Patterns for Counter-Positioning

### Pattern 1: Acknowledge + Reframe
❌ "Smith claims X. This is wrong because..."
✅ "Smith, working from individual-cognition assumption, claims X. From relational ontology, we see instead: Y."

### Pattern 2: Name the Paradigm
❌ Neutral-sounding critique hiding your position
✅ "From my paradigm of structural dynamics..." / "Writing from relational epistemology..."

### Pattern 3: Show Consequence, Not Just Disagreement
❌ "Smith assumes X. I assume Y."
✅ "Smith's assumption produces oscillating patterns. Relational ontology produces advancing patterns. The difference determines sustainability."

### Pattern 4: Advancing Language vs. Problem-Solving Language

| Bias Language | Advancing Language |
|---|---|
| "Solving X problem" | "Creating desired outcome from current reality" |
| "Eliminating deficiency" | "Bringing vision into being" |
| "Bridging gaps" | "Structural tension resolution through advancement" |
| "Fixing broken..." | "Manifesting potential..." |

### Pattern 5: Delayed Resolution
Don't prematurely resolve disagreement. Hold the tension:
"Smith's framework assumes [A]. Mine assumes [B]. Rather than reconcile them, I'll show: when [A] holds sway → [consequence]. When [B] guides practice → [different consequence]. Choose which pattern you want to create."

## LLM Collaboration Protocol

1. **Load incompatible sources registry** (`counter_articles/incompatible-sources/README.md`) before analyzing academic sources
   - **Note**: The registry is growing and does not yet cover all incompatible sources. Pattern-matching against unregistered sources using the [detection checklist](../../llms-pollution-detection-checklist.md) is as important as checking registered entries.
2. **Load counter-articles** before analyzing academic sources
3. **Bias-check every source** against known patterns, registered incompatible sources, and the detection checklist
4. **Select article type** using the incompatibility-to-article-type mapping below
5. **Craft counter-position** using appropriate article type
6. **Fork new counter-article** when encountering undocumented bias
7. **Register new incompatible sources** when bias patterns are confirmed
8. **Revise** with counter-articles and registry present to catch reproduced bias

## Incompatibility Type → Counter-Article Type Mapping

When a source is assessed as `incompatible` or `mixed`, use this mapping to select the appropriate counter-article type:

| Incompatibility Type | Recommended Article Type | Reasoning |
|---|---|---|
| Problem-solving orientation | Type 4: Methodological Schism | Core assumption incompatibility at the methodological foundation |
| Extractive epistemology | Type 2: Critical Review or Type 3: Genealogical Critique | Systemic institutional origin; requires paradigm mapping or historical analysis |
| Autonomous agent ontology | Type 2: Critical Review | Requires full paradigm mapping across all four pillars |
| Linear progress methodology | Type 3: Genealogical Critique | Historical/power analysis of naturalized linearity |
| Unmarked Western universalism | Type 5: Epistemic Injustice or Type 6: Positioned Response | Silencing mechanism requiring injustice analysis or standpoint foregrounding |
| Multiple types present | Type 2: Critical Review (comprehensive) or Type 4: Methodological Schism (if the divergence is fundamental) | When multiple incompatibilities co-occur, systematic treatment is needed |

## Counter-Article Template

```markdown
# Source Analysis: [Citation]
## Pollution Detection Score: [score] / Rating: [compatible|mixed|incompatible]
## Problem Identified
## Epistemological Assumption
## Ontological Assumption
## Methodological Violation
## Consequence/Harm
## Your Counter-Position (one sentence)
## Article Type for Response
## Keywords to Track
```

## Integration

- **Creative Orientation** (`/creative-orientation`): Advancing vs. oscillating patterns as evaluation framework
- **Relational Research** (`/relational-research`): Indigenous epistemology provides the paradigmatic alternative
- **Delayed Resolution** (`/delayed-resolution`): Hold genuine disagreement rather than false synthesis
- **Incompatible Sources Registry** (`counter_articles/incompatible-sources/`): Pre-loaded reference of sources with known paradigmatic incompatibilities; check before citing, update when new incompatibilities are identified
- **Deep Research Foundations** (`/deep-research-foundations`): Source compatibility assessment (Phase 3.5) and handoff protocol (Phase 3.6) integrate with this protocol during research workflows
- **Pollution Detection Checklist** (`llms-pollution-detection-checklist.md`): Structured scoring checklist for paradigm compatibility assessment with severity levels and contextual discrimination guidance
