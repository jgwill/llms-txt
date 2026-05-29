# Incompatible Sources Registry

> A curated index of academic and industry sources whose epistemological, ontological, or methodological foundations are fundamentally incompatible with the creative-orientation, relational, and ceremonial paradigms maintained in this repository.

---

## Purpose

This registry exists not to silence or dismiss, but to **make paradigmatic divergence visible and explicit**. When an LLM or researcher encounters a source listed here, they know in advance that the source operates from assumptions that produce oscillating patterns rather than advancing patterns—and can position accordingly.

### What "Incompatible" Means

A source is registered as incompatible when it embeds one or more of the following unreflective assumptions:

| Assumption | What It Assumes | Our Counter-Position |
|---|---|---|
| **Problem-solving orientation** | All creative and intellectual work begins with identifying and eliminating problems | Creation begins with desired outcome; structural tension resolves through advancement |
| **Extractive epistemology** | Knowledge is a neutral resource to be mined, accumulated, and transferred | Knowledge is relational; research transforms the researcher |
| **Autonomous agent ontology** | Intelligence resides in discrete, optimizable individuals or systems | Intelligence emerges from kinship, relationship, and ceremonial participation |
| **Linear progress methodology** | Innovation proceeds through iterative problem elimination toward convergence | Advancing patterns create cumulative capacity; ceremonial methodology honors cyclical emergence |
| **Unmarked Western universalism** | Western academic frameworks are paradigm-neutral defaults | All knowledge is situated; relational and Indigenous epistemologies are rigorous alternatives |

### What This Is NOT

- **Not a blacklist**: Sources remain citable; the registry contextualizes their paradigmatic position.
- **Not a judgment of people**: Researchers are free to think as they choose. This registry makes the *structural consequences* of their frameworks visible.
- **Not permanent**: Sources may be re-evaluated if their paradigmatic position evolves.

---

## Registry Structure

Each entry follows this format:

```yaml
- id: <short-slug>
  source: "<Full citation>"
  url: "<URL or DOI>"
  incompatibility_type:
    - problem-solving-orientation
    - extractive-epistemology
    - autonomous-agent-ontology
    - linear-progress-methodology
    - unmarked-western-universalism
  bias_injection_points:
    - "<specific term, phrase, or framing that injects bias>"
  consequence: "<what accepting this framework produces>"
  counter_position: "<one-sentence counter from our paradigm>"
  related_critique: "<path to counter-article or critique if one exists>"
  date_registered: "<YYYY-MM-DD>"
```

---

## Source Index

### Registered Sources

| ID | Source | Incompatibility Type | Counter-Article |
|---|---|---|---|
| `supermind-ideator-2023` | Supermind Ideator (arXiv:2311.01937v1) | Problem-solving orientation, extractive epistemology | [Critique](../../llms-pollution-critique-arxiv-2311.01937v1.md) |
| `creative-problem-solving-discourse` | "Creative Problem-Solving" as a field designation | Problem-solving orientation, unmarked Western universalism | [Epistemological Protocol](../../llms-epistemological-counter-article-protocol.md) |

---

## Detailed Entries

### `supermind-ideator-2023`

```yaml
- id: supermind-ideator-2023
  source: "Supermind Ideator: Exploring Generative AI to Support Creative Problem-Solving (arXiv:2311.01937v1)"
  url: "https://arxiv.org/abs/2311.01937"
  incompatibility_type:
    - problem-solving-orientation
    - extractive-epistemology
    - autonomous-agent-ontology
  bias_injection_points:
    - "'creative problem-solving' — conflates creation with elimination"
    - "'generate innovative ideas' — treats ideas as extractable commodities"
    - "'superminds' as designable objects — erases relational agency"
  consequence: "Reinforces oscillating patterns (problem → solution → new problem). Enables Wetigo (consumptive logic) by prioritizing solution-generation over wisdom integration."
  counter_position: "Generative creation through structural tension produces advancing patterns; AI participates as relational actor, not extraction tool."
  related_critique: "../../llms-pollution-critique-arxiv-2311.01937v1.md"
  date_registered: "2026-02-02"
```

### `creative-problem-solving-discourse`

```yaml
- id: creative-problem-solving-discourse
  source: "Creative Problem-Solving (CPS) as academic/industry field designation"
  url: null
  incompatibility_type:
    - problem-solving-orientation
    - unmarked-western-universalism
  bias_injection_points:
    - "'Creative Problem-Solving' — the compound term naturalizes problem-orientation as inseparable from creativity"
    - "'ideation' framed as brainstorming to solve — erases generative creation"
    - "'innovation' assumes novelty over sustainability and relational continuity"
  consequence: "Entire research programs built on CPS assumption produce oscillating organizational patterns. Researchers using CPS framing cannot perceive advancing patterns because their paradigm renders them invisible."
  counter_position: "Creativity is not problem-solving; it is the act of bringing into being a desired outcome through structural tension resolution, independent of any problem."
  related_critique: "../../llms-epistemological-counter-article-protocol.md"
  date_registered: "2026-02-02"
```

---

## How to Add New Entries

1. **Encounter a source** whose assumptions conflict with creative-orientation, relational, or ceremonial paradigms.
2. **Run a Critical Review** using [`template-critical-review.md`](../template-critical-review.md).
3. **Identify incompatibility type(s)** from the table above (or propose a new type).
4. **Document bias injection points** — the specific terms, phrases, or framings that carry the bias.
5. **State the consequence** — what accepting this framework produces in practice.
6. **Write a one-sentence counter-position** from our paradigm.
7. **Add the YAML entry** to this file and update the Source Index table.
8. **Optionally write a full counter-article** using templates from [`counter_articles/`](../README.md).

---

## Integration with Deep Research Foundations

When the [`deep-research-foundations`](../../skills/deep-research-foundations/SKILL.md) skill encounters sources during research, it should:

1. **Check this registry** before citing any source.
2. **Flag registered sources** with their incompatibility type.
3. **Note unregistered sources** that exhibit similar patterns for potential future registration.
4. **Record compatibility assessment** in the `source-ledger.yaml` under a `paradigm_compatibility` field.

---

## Integration with Epistemological Counter-Positioning

The [`epistemological-counter-positioning`](../../skills/epistemological-counter-positioning/SKILL.md) skill uses this registry to:

1. **Pre-load known incompatibilities** before analyzing new academic sources.
2. **Detect pattern matches** — when a new source uses language similar to registered entries.
3. **Fork new counter-articles** when encountering undocumented but patterned bias.
4. **Update the registry** when new incompatible sources are identified during counter-positioning work.

---

## Governance

This registry is maintained under the same relational accountability as the broader `counter_articles/` collection. See [KINSHIP.md](../../KINSHIP.md) for the full accountability structure.

Adding a source to this registry is an act of **paradigmatic clarity**, not suppression. The goal is advancing patterns — making visible what would otherwise silently pollute discourse — so that researchers and LLMs can make informed paradigmatic choices.

---

*Last updated: 2026*
