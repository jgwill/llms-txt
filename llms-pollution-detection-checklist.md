# Paradigm Pollution Detection Checklist

> A structured, operational checklist for assessing whether an academic or industry source embeds paradigmatic assumptions incompatible with creative-orientation, relational, and ceremonial frameworks. Produces a severity score and a `paradigm_compatibility` rating for use in source ledgers.

---

## How to Use This Checklist

1. **Read the source's abstract and methodology sections** first (these are where paradigmatic assumptions are most visible).
2. **Run each detection signal** below against the source. Mark Present (P) or Absent (A).
3. **Score each Present signal** at the severity level indicated.
4. **Sum the severity scores** and map to the compatibility rating.
5. **Record the result** in your `source-ledger.yaml` under `paradigm_compatibility`.

---

## Detection Signals by Incompatibility Type

### Type 1: Problem-Solving Orientation

The source treats all intellectual and creative work as beginning with identifying and eliminating problems.

| # | Signal | Example | Severity |
|---|--------|---------|----------|
| 1.1 | Uses "solve," "fix," or "eliminate" as the primary verb for creative work | "solve creative challenges" | 1 |
| 1.2 | Compound term "creative problem-solving" used as unproblematic category | "support creative problem-solving" | 2 |
| 1.3 | Success defined as gap elimination rather than desired-outcome manifestation | "bridging the ideation gap" | 2 |
| 1.4 | Methodology organized around problem identification → solution generation → evaluation | "identify pain points, generate solutions, test" | 3 |
| 1.5 | No distinction between creating and reacting; creation treated as a form of problem-solving | Entire framework assumes creation = solving | 3 |

**External grounding**: Fritz (1989, *The Path of Least Resistance*) demonstrates that problem-solving orientation produces oscillating patterns (temporary resolution → regression) while creative orientation produces advancing patterns (cumulative capacity building). This is structural, not preferential.

### Type 2: Extractive Epistemology

The source treats knowledge as a neutral resource to be mined, accumulated, and transferred without transformation of the knower.

| # | Signal | Example | Severity |
|---|--------|---------|----------|
| 2.1 | Ideas treated as extractable commodities ("generate ideas," "harvest insights") | "the system generates innovative ideas" | 1 |
| 2.2 | Knowledge transfer assumed context-independent and value-neutral | "transfer best practices across domains" | 2 |
| 2.3 | No acknowledgment that research transforms the researcher | Methodology section describes process without positionality | 2 |
| 2.4 | More-than-human agency excluded from knowledge production | Only human cognitive agents recognized | 2 |
| 2.5 | Knowledge validated solely by novelty and utility metrics | "ideas evaluated for novelty and feasibility" | 3 |

**External grounding**: Smith (2012, *Decolonizing Methodologies*) and Wilson (2008, *Research Is Ceremony*) establish that knowledge is relational — it lives in relationships and transforms those who participate in its creation. Tuck & Yang (2012) identify extraction as a structural feature of settler-colonial epistemology.

### Type 3: Autonomous Agent Ontology

The source assumes intelligence resides in discrete, optimizable individuals or systems rather than emerging from relational webs.

| # | Signal | Example | Severity |
|---|--------|---------|----------|
| 3.1 | Agents modeled as independent optimizers without relational context | "each agent maximizes its objective function" | 2 |
| 3.2 | Collective intelligence designed as aggregate of individual contributions | "combine individual insights into group solutions" | 2 |
| 3.3 | AI positioned as tool serving individual users, not relational participant | "the tool assists the user in generating ideas" | 1 |
| 3.4 | No accountability structure for who/what is affected by the system's outputs | "designed for general use across domains" | 3 |
| 3.5 | Spiritual, ceremonial, or more-than-human agency excluded by ontological assumption | Only computational and cognitive agents acknowledged | 2 |

**External grounding**: Wilson (2008) articulates a relational ontology where reality is composed of relationships, not discrete objects. Kovach (2009, *Indigenous Methodologies*) demonstrates that intelligence emerges from conversational, relational engagement.

### Type 4: Linear Progress Methodology

The source assumes innovation proceeds through iterative problem elimination toward convergence, without cyclical or ceremonial phases.

| # | Signal | Example | Severity |
|---|--------|---------|----------|
| 4.1 | Methodology described as linear pipeline (input → process → output) | "users submit problems, system generates solutions" | 1 |
| 4.2 | Iteration framed as successive approximation toward fixed solution | "iterative refinement toward optimal design" | 2 |
| 4.3 | No recognition of germination, assimilation, completion phases | Creative process flattened to ideation + evaluation | 2 |
| 4.4 | Emergence, surprise, and unplanned outcomes treated as noise, not signal | "ensuring consistent, predictable outputs" | 3 |
| 4.5 | No delayed resolution — tension immediately collapsed by generating answers | "the system immediately suggests 20 ideas" | 3 |

**External grounding**: Fritz (1989, 1999) identifies three phases of the creative process (germination, assimilation, completion), each with distinct requirements. Premature resolution of structural tension produces false equilibrium rather than genuine advancement.

### Type 5: Unmarked Western Universalism

The source presents Western academic frameworks as paradigm-neutral defaults without acknowledging their situated nature.

| # | Signal | Example | Severity |
|---|--------|---------|----------|
| 5.1 | No positionality statement or paradigmatic self-identification | Methodology presented as "standard" or "objective" | 1 |
| 5.2 | Western paradigm terms used as universal categories without qualification | "creativity," "innovation," "knowledge" as self-evident concepts | 1 |
| 5.3 | Non-Western knowledge systems absent from literature review | Only Western academic citations | 2 |
| 5.4 | Framework presented as applicable to "any domain" without cultural contextualization | "can be applied to any problem" | 2 |
| 5.5 | Indigenous, relational, or ceremonial methodologies not mentioned as legitimate alternatives | Complete erasure of non-Western research paradigms | 3 |

**External grounding**: Fricker (2007, *Epistemic Injustice*) names testimonial injustice (credibility deficit based on identity) and hermeneutical injustice (conceptual exclusion) as structural features of knowledge systems that present themselves as universal. Mignolo (2011) traces "Western universalism" to specific colonial histories.

---

## Scoring and Rating

### Scoring Method

Sum all severity scores for **Present** signals only.

### Rating Thresholds

| Total Score | Rating | Meaning |
|---|---|---|
| 0–3 | `compatible` | Source operates from a compatible or sufficiently neutral paradigm. Cite normally. |
| 4–8 | `mixed` | Source uses compatible surface language but embeds incompatible assumptions at structural level. Cite with explicit paradigmatic contextualization. See [Mixed Compatibility Protocol](#mixed-compatibility-protocol). |
| 9+ | `incompatible` | Source's paradigmatic foundations are fundamentally incompatible. Requires counter-positioning before citation. Register in [Incompatible Sources Registry](counter_articles/incompatible-sources/README.md). |

### Recording in Source Ledger

```yaml
sources:
  - id: <short-id>
    field: <field>
    title: <title>
    url: <url>
    paradigm_compatibility: compatible | mixed | incompatible
    pollution_score: <number>
    incompatibility_types:
      - <type-slug if any signals present>
    incompatibility_notes: "<specific signals found>"
    registered_incompatible: true|false
```

---

## Mixed Compatibility Protocol

Sources rated `mixed` are often **more dangerous than clearly incompatible ones** because their compatible surface language can disable critical assessment.

### Handling Rules for Mixed Sources

1. **Extract the specific compatible claim** with a scoped citation: "On the specific question of X, [Author] finds..." — do not allow the citation to import the author's broader framework.
2. **Explicitly name the incompatible layer**: "While [Author]'s finding on X is useful, their methodology embeds problem-solving orientation at the structural level (see signals 1.4, 4.2)."
3. **Do not allow compatible surface to license incompatible methodology**: If you cite a source's finding, you have not endorsed their paradigm. Make this visible in your text.

### Mixed Signal Examples

| Compatible Surface | Incompatible Mechanism | What Happens If You Don't Distinguish |
|---|---|---|
| "We aim to support human flourishing" | Methodology: "identify pain points and generate solutions" | Reader imports problem-solving methodology under cover of flourishing language |
| "Co-creative design with communities" | Ontology: communities as user-groups to extract insights from | "Relational" language masks extractive practice |
| "Fostering innovation ecosystems" | Epistemology: innovation = novelty-production; ecosystem = market | Ecological metaphor masks commodity logic |

---

## Worked Example: arXiv:2311.01937v1 ("Supermind Ideator")

### Signal Assessment

| Signal | Present? | Score | Evidence from Paper |
|---|---|---|---|
| 1.1 | P | 1 | "support creative problem-solving" |
| 1.2 | P | 2 | "creative problem-solving" used as unproblematic compound throughout |
| 1.3 | P | 2 | Success = generating novel ideas for problem domains |
| 1.4 | P | 3 | Methodology: identify problem → generate ideas → select → refine |
| 1.5 | P | 3 | No distinction between creating and problem-solving |
| 2.1 | P | 1 | "suggest new ideas that might never have occurred to the users" |
| 2.2 | P | 2 | "extended to support additional techniques for other specific problem-solving domains" |
| 2.3 | P | 2 | No researcher positionality or transformation acknowledged |
| 2.5 | P | 3 | Ideas evaluated by novelty and applicability |
| 3.3 | P | 1 | "help people use creative problem-solving techniques" — AI as tool |
| 3.4 | P | 3 | "superminds" designed without accountability structure |
| 4.1 | P | 1 | Linear pipeline: problem → AI ideation → user selection |
| 4.5 | P | 3 | System "suggest[s] new ideas" immediately, collapsing creative tension |
| 5.1 | P | 1 | No positionality statement |
| 5.4 | P | 2 | "can be applied to any problem" |

**Total Score: 30** → Rating: **`incompatible`**

### Result

This source scores well above the `incompatible` threshold across all five types. Registered in [Incompatible Sources Registry](counter_articles/incompatible-sources/README.md) as `supermind-ideator-2023`.

---

## Contextual Discrimination: When Problem-Solving IS Appropriate

This checklist does not claim that problem-solving is never valid. Some situations structurally call for problem resolution:

- **Medical emergencies**: A specific harmful condition must be eliminated. The organizing question is correctly "what is wrong and how do we fix it?"
- **Engineering safety**: A bridge failure mode must be identified and corrected. Problem-solving orientation is structurally appropriate.
- **Crisis response**: Immediate harm requires immediate response directed at the source of harm.

The checklist identifies sources that embed problem-solving orientation **as the default for ALL creative and intellectual work** — including domains where creative orientation would produce advancing patterns rather than oscillation. The contamination is not in problem-solving itself, but in its unreflective universalization.

### Decision Heuristic

Ask: **What is the structural call of the situation?**

- If the situation calls for **eliminating a specific harmful condition** → problem-solving orientation is appropriate
- If the situation calls for **bringing a desired outcome into being** → creative orientation is appropriate
- If both are present → identify which is primary (what you want to create) and which is secondary (obstacles to address along the way)

When a source treats problem-solving as the universal default without this discrimination, it earns incompatibility signals regardless of its domain contributions.

---

## Related Documents

- **[Incompatible Sources Registry](counter_articles/incompatible-sources/README.md)** — Where incompatible sources are registered
- **[Epistemological Counter-Positioning Skill](skills/epistemological-counter-positioning/SKILL.md)** — Workflow for producing counter-articles
- **[Deep Research Foundations](skills/deep-research-foundations/SKILL.md)** — Phase 3.5 source compatibility assessment
- **[Creative Orientation Framework](llms-creative-orientation.txt)** — Foundational framework
- **[Counter-Article Templates](counter_articles/README.md)** — Templates for each article type

---

*Last updated: 2026*
