---
name: rise-specification
description: >
  RISE (Reverse-engineer, Intent-extract, Specify, Export) framework for creating specifications
  through creative archaeology rather than reactive documentation. Built on SpecLang prose-code
  methodology. Use when reverse-engineering existing code, extracting creative intent from
  prototypes, creating specifications that preserve what users love, or generating SpecLang
  prose-code specs that focus on desired outcomes rather than problem elimination.
---

# RISE Specification Framework

## SpecLang Foundation: Prose Code

Specifications are "prose code" — natural language representations of computation behavior that still require you to "think like a programmer."

### Key Principles
- **Spec as Source of Truth**: The specification is what you maintain; executable code is secondary
- **Variable Detail**: Offhand remarks for boilerplate, exact protocol for critical behavior
- **"Create and Adjust"**: Start simple, refine against running output, stop when it matches your vision
- **Bi-directional Ideation**: The model "yes-ands" your intent, extending ideas naturally
- **Intent-based Expression**: Focus on behavior, let toolchain handle plumbing

## The RISE Method

**R**everse-engineer → **I**ntent-extract → **S**pecify → **E**xport

### Phase 1: Reverse-Engineering (Creative Archaeology)

Extract specifications capturing both functionality and creative intent.

**Discovery Process:**
- **Core Creative Intent**: What does this application empower users to create?
- **User Creation Flows**: Map journeys leading to manifestation of desired outcomes
- **Structural Tension**: What tension exists between current user reality and desired results?
- **Advancing vs. Oscillating**: Which patterns support continuous movement? Which create back-and-forth?

### Phase 2: Intent Extraction

Identify the beloved qualities — what makes the prototype valuable beyond its features.

**Extract:**
- What users genuinely care about preserving
- The creative consciousness embedded in design decisions
- Structural dynamics that naturally guide users toward goals
- Choice points where users advance toward their vision

### Phase 3: Specification Creation

Write SpecLang prose-code that captures intent at the right level of detail.

**Guidelines:**
- Focus on what the system enables users to CREATE
- Describe desired outcomes, not just features
- Identify structural tension dynamics in user flows
- Use advancing-pattern language, not problem-solving framing
- Variable detail: precise where critical, suggestive where flexible

### Phase 4: Export Optimization

Generate implementation-ready specifications that preserve creative intent.

**Ensure:**
- Spec supports advancing patterns, not oscillating maintenance
- Features build upon each other systematically
- Natural progression through user journeys is preserved
- Structural dynamics that resolve tension forward are maintained

## Where Specifications Land

Write into the `rispecs/` at the root of the repository or package the spec describes. The full layout is in [`llms-rispecs-layout.md`](../../llms-rispecs-layout.md).

```
rispecs/
├── README.md                 roadmap: one row per topic folder
└── <topic>/                  one folder per surface
    ├── README.md             outcome, files in reading order, status
    ├── 01-reverse-engineer.md · 02-intent.md      R, I (when the whole pass lives here)
    ├── SPEC.md               master: the whole surface, how the parts compose
    ├── 03-<part>.spec.md     a part · 03-<part>.kin.md its why
    ├── 04-export.md          E
    └── STATUS.md             what is built
```

- **Whose part is this?** Put the file in that surface's folder. A `rispecs/` root that has topic folders holds only `README.md` and `AGENTS.md`.
- **Numbers are reading order**, and reading order follows R → I → S → E. They are given at birth and never reused.
- **Moving a misplaced spec** uses `git mv` into its surface's folder and keeps the file name. Then fix path citations, and add a Moved row to `rispecs/README.md`.
- **Check**: run `python3 rispecs_layout_check.py <repo>` from a jgwill/llms-txt checkout.

## Creative Orientation in Specifications

| Reactive (Traditional) | Creative (RISE) |
|---|---|
| "Fix the search feature" | "Users create precise search queries that manifest their desired information" |
| "Remove loading delays" | "Instant, fluid interaction that supports creative flow" |
| "Handle edge cases" | "Graceful support for all paths users take toward their vision" |
| Features = problems to solve | Features = outcomes to create |
| Oscillating maintenance specs | Advancing creation specs |

## Advancing vs. Oscillating Patterns in Code

**Advancing**: Features build on each other. Natural progression. Structural dynamics resolve tension forward.

**Oscillating**: Dependency loops. Repeated effort required. Constant maintenance to function.

**Test**: Does this feature move users TOWARD their desired outcome, or does it just prevent a problem?

## Integration

- **Creative Orientation** (`/creative-orientation`): Foundation — RISE implements creative archaeology
- **Structural Tension Charting** (`/structural-tension-charting`): Specs can be structured as tension charts with desired system state vs. current state
