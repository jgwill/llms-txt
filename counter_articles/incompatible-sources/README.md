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
  severity: <1|2|3>
    # 1 = framing-level (can be cited with brief caveat)
    # 2 = structural assumption (requires positioned response when citing)
    # 3 = paradigm-defining (requires counter-article before citation)
  bias_injection_points:
    - "<specific term, phrase, or framing that injects bias>"
  linguistic_fingerprint:
    - "<terms/phrases to watch for in new sources indicating similar bias>"
  consequence: "<what accepting this framework produces>"
  counter_position: "<one-sentence counter from our paradigm>"
  citation_protocol: "<how to cite this source in a relationally-accountable way>"
  related_critique: "<path to counter-article or critique if one exists>"
  date_registered: "<YYYY-MM-DD>"
```

---

## Source Index

### Registered Sources

| ID | Source | Incompatibility Type | Severity | Counter-Article |
|---|---|---|---|---|
| `supermind-ideator-2023` | Rick et al. — Supermind Ideator (arXiv:2311.01937v1) | Problem-solving orientation, extractive epistemology, autonomous agent ontology | 3 | [Critique](../../llms-pollution-critique-arxiv-2311.01937v1.md) |
| `osborn-applied-imagination-1953` | Osborn — *Applied Imagination* (1953) | Problem-solving orientation, unmarked Western universalism | 3 | — |
| `design-thinking-ideo-2009` | Brown — *Change by Design* (2009) / Stanford d.school | Problem-solving orientation, extractive epistemology | 2 | — |
| `de-bono-lateral-thinking-1967` | de Bono — *Lateral Thinking* (1967/1970) | Problem-solving orientation, linear progress methodology | 2 | — |
| `thinking-skills-creativity-journal` | *Thinking Skills and Creativity* (Elsevier journal) | Problem-solving orientation, unmarked Western universalism | 2 | — |
| `cresowlve-benchmark-2026` | Ismayilzada et al. — CresOWLve (arXiv:2604.03374) | Problem-solving orientation, extractive epistemology | 2 | — |
| `creative-problem-solving-discourse` | "Creative Problem-Solving" as field designation | Problem-solving orientation, unmarked Western universalism | 3 | [Epistemological Protocol](../../llms-epistemological-counter-article-protocol.md) |

---

## Detailed Entries

### `supermind-ideator-2023`

```yaml
- id: supermind-ideator-2023
  source: "Rick, S.R., Giacomelli, G., Wen, H., Laubacher, R.J., et al. 'Supermind Ideator: Exploring Generative AI to Support Creative Problem-Solving.' arXiv:2311.01937v1. Nov 2023."
  url: "https://arxiv.org/abs/2311.01937"
  incompatibility_type:
    - problem-solving-orientation
    - extractive-epistemology
    - autonomous-agent-ontology
  severity: 3
  bias_injection_points:
    - "'creative problem-solving' — conflates creation with elimination"
    - "'generate innovative ideas' — treats ideas as extractable commodities"
    - "'superminds' as designable objects — erases relational agency"
    - "'applied to any problem' — universalizes problem orientation"
  linguistic_fingerprint:
    - "creative problem-solving"
    - "generate ideas"
    - "stimulate creative ideas"
    - "problem-solving techniques"
    - "problem-solving domains"
    - "design superminds"
  consequence: "Reinforces oscillating patterns (problem → solution → new problem). Enables consumptive logic by prioritizing solution-generation over wisdom integration. Treats collective intelligence as designable artifact without relational accountability."
  counter_position: "Generative creation through structural tension produces advancing patterns; AI participates as relational actor, not extraction tool."
  citation_protocol: "Cite only with explicit framing: 'Working from problem-solving orientation, Rick et al. (2023) find...' to flag the paradigmatic position before the claim."
  related_critique: "../../llms-pollution-critique-arxiv-2311.01937v1.md"
  date_registered: "2026-02-02"
```

### `osborn-applied-imagination-1953`

```yaml
- id: osborn-applied-imagination-1953
  source: "Osborn, A.F. Applied Imagination: Principles and Procedures of Creative Problem Solving. Charles Scribner's Sons, New York. 1953."
  url: null
  incompatibility_type:
    - problem-solving-orientation
    - unmarked-western-universalism
  severity: 3
  bias_injection_points:
    - "'Creative Problem Solving' — the book's subtitle makes problem-orientation definitional"
    - "'brainstorming' — structured ideation that requires a clear problem statement before beginning"
    - "quantity-produces-quality assumption — probabilistic theory treats ideas as commodities"
    - "deferred judgment — separates generation from evaluation as universal cognitive truth"
  linguistic_fingerprint:
    - "applied imagination"
    - "brainstorming"
    - "go for quantity"
    - "withhold criticism"
    - "creative problem solving"
    - "ideation session"
  consequence: "Established the foundational assumption that creativity requires a problem as starting point. Every subsequent CPS framework (Parnes, Puccio, Creative Education Foundation) inherits this orientation. Produces oscillating patterns by structural necessity: problem → ideation → temporary resolution → new problem."
  counter_position: "Creativity does not require a problem; it is the act of bringing desired outcomes into being through structural tension, independent of any deficiency to eliminate."
  citation_protocol: "Historical reference only: 'Osborn (1953), writing from a mid-century advertising-industry problem-solving paradigm, introduced brainstorming as...'"
  related_critique: null
  date_registered: "2026-05-29"
```

### `design-thinking-ideo-2009`

```yaml
- id: design-thinking-ideo-2009
  source: "Brown, T. Change by Design: How Design Thinking Transforms Organizations and Inspires Innovation. HarperBusiness. 2009. ISBN 978-0-06-176608-4. See also: Brown, T. 'Design Thinking.' Harvard Business Review, June 2008."
  url: "https://hbr.org/2008/06/design-thinking"
  incompatibility_type:
    - problem-solving-orientation
    - extractive-epistemology
  severity: 2
  bias_injection_points:
    - "'needfinding' and 'problem framing' — entire apparatus presupposes something is wrong"
    - "'How Might We' questions — generative-sounding language that structures around a problem"
    - "'Empathize → Define → Ideate → Prototype → Test' — Define stage crystallizes 'the problem' before ideation"
    - "'human-centered design' — extracts insights from observed users without relational reciprocity"
  linguistic_fingerprint:
    - "design thinking"
    - "how might we"
    - "needfinding"
    - "empathize"
    - "pain points"
    - "user needs"
    - "problem framing"
    - "wicked problems"
  consequence: "Uses generative and empathetic surface language while structurally embedding problem-solving at the methodological core. Particularly dangerous as a 'mixed' source because the compatible surface (empathy, human-centeredness) disables critical assessment of the incompatible mechanism (problem-first methodology, extractive observation)."
  counter_position: "Design begins with desired outcome, not with what is wrong; empathy serves vision-formation, not problem-identification."
  citation_protocol: "Cite with structural caveat: 'Brown (2009), while centering empathy, structurally embeds problem-solving orientation through needfinding and problem-framing methodology...'"
  related_critique: null
  date_registered: "2026-05-29"
```

### `de-bono-lateral-thinking-1967`

```yaml
- id: de-bono-lateral-thinking-1967
  source: "de Bono, E. The Use of Lateral Thinking. Jonathan Cape, London. 1967. See also: de Bono, E. Lateral Thinking: Creativity Step by Step. Harper & Row. 1970. ISBN 978-0-06-090325-4."
  url: null
  incompatibility_type:
    - problem-solving-orientation
    - linear-progress-methodology
  severity: 2
  bias_injection_points:
    - "'solving problems using an indirect and creative approach' — de Bono's own definition of lateral thinking"
    - "provocation techniques always directed at a problem-target"
    - "'escape from pattern lock' — creativity as breaking out of constraint, not bringing into being"
    - "no empirical validation — described as pseudo-scientific by Sternberg and Cambridge evaluation"
  linguistic_fingerprint:
    - "lateral thinking"
    - "six thinking hats"
    - "provocation"
    - "pattern escape"
    - "PO" (linguistic operator)
    - "vertical thinking"
    - "random entry"
  consequence: "Treats creativity as an alternative route to problem-solving rather than a fundamentally different orientation. Techniques are directed at existing patterns rather than desired outcomes. Empirically unvalidated framework (Sternberg, Cambridge Frameworks for Thinking evaluation) despite widespread commercial adoption."
  counter_position: "Creativity is not alternative problem-solving; it is generative manifestation through structural tension between desired outcome and current reality."
  citation_protocol: "Cite with empirical caveat: 'de Bono (1967), whose lateral thinking framework lacks rigorous empirical validation (see Sternberg; Cambridge Frameworks for Thinking), proposes...'"
  related_critique: null
  date_registered: "2026-05-29"
```

### `thinking-skills-creativity-journal`

```yaml
- id: thinking-skills-creativity-journal
  source: "Thinking Skills and Creativity. Elsevier. ISSN 1871-1871 (Print), 1878-0423 (Online)."
  url: "https://www.sciencedirect.com/journal/thinking-skills-and-creativity"
  incompatibility_type:
    - problem-solving-orientation
    - unmarked-western-universalism
  severity: 2
  bias_injection_points:
    - "journal title treats creativity as a 'skill' — cognitive capacity residing in individuals"
    - "dominant methodology: educational interventions measured by divergent thinking scores"
    - "closely aligned with Osborn-Parnes CPS tradition and Bloom's taxonomy"
    - "creativity instrumentalized toward problem resolution across published papers"
  linguistic_fingerprint:
    - "thinking skills"
    - "divergent thinking"
    - "creative thinking skills"
    - "fluency" (idea count)
    - "originality scores"
    - "creative self-efficacy"
  consequence: "Academic publication venue that reinforces the paradigmatic assumption that creativity is a measurable cognitive skill deployed for problem resolution. Papers published here reproduce the CPS orientation through peer review norms, methodology expectations, and outcome metrics."
  counter_position: "Creativity is not a skill to be measured; it is a structural orientation that produces advancing patterns when the relationship between desired outcome and current reality generates genuine tension."
  citation_protocol: "Cite individual papers with journal-paradigm caveat: 'Published in Thinking Skills and Creativity, a journal operating from cognitive-developmental educational psychology paradigm, [Author] finds...'"
  related_critique: null
  date_registered: "2026-05-29"
```

### `cresowlve-benchmark-2026`

```yaml
- id: cresowlve-benchmark-2026
  source: "Ismayilzada, M., Cuomao, R., Yurshevich, D., Sotnikova, A., van der Plas, L., & Bosselut, A. 'CresOWLve: Benchmarking Creative Problem-Solving Over Real-World Knowledge.' arXiv:2604.03374. Apr 2026."
  url: "https://doi.org/10.48550/arXiv.2604.03374"
  incompatibility_type:
    - problem-solving-orientation
    - extractive-epistemology
  severity: 2
  bias_injection_points:
    - "'creative problem-solving' in title — directly compounds the terms"
    - "benchmarking creativity — treats creative capacity as measurable against correct answers"
    - "'non-obvious creative connections' — creativity reduced to fact-recombination"
    - "AI models evaluated as problem-solvers, not as relational participants"
  linguistic_fingerprint:
    - "benchmarking creativity"
    - "creative problem-solving"
    - "lateral thinking" (used as test category)
    - "creative connections"
    - "knowledge retrieval"
  consequence: "Establishes benchmarks that define creativity as fact-recombination within a problem-solving frame. AI systems trained against these benchmarks will optimize for problem-solving pattern-matching, structurally unable to develop genuine creative orientation."
  counter_position: "Creativity cannot be benchmarked as problem-solving performance; genuine creation produces outcomes that were not predictable from initial conditions and cannot be evaluated against predetermined correct answers."
  citation_protocol: "Cite with paradigm flag: 'Ismayilzada et al. (2026), measuring creative performance within a problem-solving benchmark, find...'"
  related_critique: null
  date_registered: "2026-05-29"
```

### `creative-problem-solving-discourse`

```yaml
- id: creative-problem-solving-discourse
  source: "Creative Problem-Solving (CPS) as academic/industry field designation. Foundational works: Osborn (1953), Parnes (1967), Puccio et al. (2011). Institutional home: Creative Education Foundation, Buffalo, NY."
  url: "https://creativeeducationfoundation.org"
  incompatibility_type:
    - problem-solving-orientation
    - unmarked-western-universalism
  severity: 3
  bias_injection_points:
    - "'Creative Problem-Solving' — the compound term naturalizes problem-orientation as inseparable from creativity"
    - "'ideation' framed as brainstorming to solve — erases generative creation"
    - "'innovation' assumes novelty over sustainability and relational continuity"
    - "'challenge statement' as required input — cannot begin without a problem"
  linguistic_fingerprint:
    - "creative problem-solving"
    - "CPS process"
    - "challenge statement"
    - "divergent thinking"
    - "convergent thinking"
    - "Clarify-Ideate-Develop-Implement"
    - "Creative Education Foundation"
  consequence: "Entire research programs built on CPS assumption produce oscillating organizational patterns. Researchers using CPS framing cannot perceive advancing patterns because their paradigm renders them invisible. The compound term 'creative problem-solving' contaminates discourse by making problem-orientation appear as a natural property of creativity rather than a paradigmatic choice."
  counter_position: "Creativity is not problem-solving; it is the act of bringing into being a desired outcome through structural tension resolution, independent of any problem."
  citation_protocol: "Cite with paradigm identification: 'The CPS tradition (Osborn, 1953; Parnes, 1967), operating from a problem-solving paradigm that treats all creative work as deficiency-elimination,...'"
  related_critique: "../../llms-epistemological-counter-article-protocol.md"
  date_registered: "2026-02-02"
```

---

## How to Add New Entries

1. **Encounter a source** whose assumptions conflict with creative-orientation, relational, or ceremonial paradigms.
2. **Run the Pollution Detection Checklist** ([`llms-pollution-detection-checklist.md`](../../llms-pollution-detection-checklist.md)) to score the source and determine its `paradigm_compatibility` rating.
3. **If scored `incompatible` (9+)**, proceed with registration. If `mixed` (4–8), consider whether registration or a Mixed Compatibility Protocol citation is more appropriate.
4. **Run a Critical Review** using [`template-critical-review.md`](../template-critical-review.md) for full paradigm mapping.
5. **Identify incompatibility type(s)** from the table above (or propose a new type).
6. **Assign severity**: 1 (framing-level), 2 (structural assumption), 3 (paradigm-defining).
7. **Document bias injection points** — the specific terms, phrases, or framings that carry the bias.
8. **Extract linguistic fingerprint** — terms that would indicate similar bias in unregistered sources.
9. **State the consequence** — what accepting this framework produces in practice.
10. **Write a one-sentence counter-position** from our paradigm.
11. **Write the citation protocol** — exactly how to cite this source in relationally-accountable writing.
12. **Add the YAML entry** to this file and update the Source Index table.
13. **Optionally write a full counter-article** using templates from [`counter_articles/`](../README.md).

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
