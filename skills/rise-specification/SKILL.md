---
name: rise-specification
description: >
  RISE (Reverse-engineer, Intent-extract, Specify, Export) framework for creating specifications
  through creative archaeology rather than reactive documentation. Built on SpecLang prose-code
  methodology. Use when reverse-engineering existing code, extracting creative intent from
  prototypes, creating specifications that preserve what users love, generating SpecLang
  prose-code specs that focus on desired outcomes rather than problem elimination, deciding where
  a spec lands in rispecs/ and what it is named, or bringing existing rispecs up to date with the
  code (the Return).
---

# RISE Specification Framework

Full method: [`llms-rise-framework.txt`](../../llms-rise-framework.txt) (2.0.0). Where each file lands: [`llms-rispecs-layout.md`](../../llms-rispecs-layout.md).

## SpecLang Foundation: Prose Code

Specifications are "prose code" — natural language representations of computation behavior that still require you to "think like a programmer."

- **Spec as Source of Truth**: The specification is what you maintain; executable code is secondary
- **Variable Detail**: Offhand remarks for boilerplate, exact protocol for critical behavior
- **"Create and Adjust"**: Start simple, refine against running output, stop when it matches your vision
- **Bi-directional Ideation**: The model "yes-ands" your intent, extending ideas naturally
- **Intent-based Expression**: Focus on behavior, let toolchain handle plumbing

## The Method: One Phase per Letter, One File per Phase

**R**everse-engineer → **I**ntent-extract → **S**pecify → **E**xport → ↺ Return

| Phase | Question | Leaves in `rispecs/<topic>/` |
|---|---|---|
| 1 · R | What does the prototype do, and what do people love in it? | `01-reverse-engineer.md` |
| 2 · I | What did its creator want to bring into being, and in which relations does it live? | `02-intent.md`, the kin `<topic>.kin.md` |
| 3 · S | What is to be built, in prose another LLM implements? | `SPEC.md` + `NN-<part>.spec.md`, or `<topic>.spec.md` |
| 4 · E | Who takes it up, and where is it remembered? | `NN-export.md`, a row in `rispecs/README.md`, the episode's `rispecs:` entry |
| ↺ Return | What has the code done since? | `STATUS.md`, specs brought up to date |

Before 2.0, Export was "Phase 3" and maintenance was "Phase 4". Read old citations that way.

### Phase 1: Reverse-engineer (Creative Archaeology)

Observe before deciding. Record:
- **Core Creative Intent**: What does this application empower users to create?
- **User Creation Flows**: Journeys leading to the desired outcomes, and their choice points
- **Feature Inventory**: Vision-supporting, tension-resolving, manifestation features
- **Structural Patterns Worth Preserving**: Architecture, data flow, integrations that carry the progression
- **Prototype Addresses**: published address and editing address, for a hosted prototype

When the observations live elsewhere (an episode vessel, donor scripts), the topic `README.md` names the place.

### Phase 2: Intent-extract

Name what the creator wanted, as distinct from what the code happens to do:
- **Desired Outcome**: what result, how users know they have it, why it matters to them
- **Current Reality**: plain facts, no value word ("Current Reality", never "Current Structural Reality")
- **Structural Tension**: how the tension between the two naturally progresses
- **Beloved Qualities**: what users would miss, which design decisions must survive a rewrite
- **Kin**: the relations the surface lives in (ancestor, upstream, downstream, sibling, guardian, place), each with where its kin lives and what it asks. Write `<topic>.kin.md` per [`llms-rispecs-kinship.md`](../../llms-rispecs-kinship.md). It is not "the why", and not a database pointer

### Phase 3: Specify

Write SpecLang prose code at the right level of detail:
- Desired outcome, current reality, **Creative Advancement Scenarios** (not BDD), supporting structures
- `## Screens` → `## Components` → `## Data`, with `**Behavior:**`, `**Styling:**`, `**Layout:**`
- Codebase-agnostic: references point to sibling specs (`./03-data-models.spec.md`), never to code paths as contracts
- Draw when drawing says it better: `*.smdf.json` (behaviour), `*.erdf.json` (data), `*.sqdf.json` (a scenario), beside the spec
- **Test**: could another LLM implement the surface from this alone?

```
**Creative Advancement Scenario**: [Scenario Name]
**User Intent**: [Desired outcome they want to create]
**Current Reality**: [Starting state/context]
**Natural Progression Steps**: 1. … 2. … 3. …
**Achieved Outcome**: [Manifested desired result]
**Supporting Features**: [Capabilities enabling this advancement]
```

### Phase 4: Export

The specification leaves its author:
- **Lands** in its surface's folder in `rispecs/` (below), with a row in `rispecs/README.md`
- **Written for the next builder** in `NN-export.md`: scenarios, contracts, data models, the per-harness recipe, and the gates that prove it built
- **Recorded** in the episode: `rispecs:` as `rise://<owner>/<repo>/rispecs/<topic>/<entry>`, pinned to a commit, with `derived_from` and `system`

Implementation follows Export. It is not a fifth letter.

### ↺ The Return

A RISE pass run on what changed since the spec was written:
- **R**: `git log -1 --format='%cs %h' -- rispecs/<topic>/`, then `git log --since=<that date> --no-merges` on the code
- **I**: read the commit messages for intent ("Restored Gemini, was not leading anymore")
- **S**: map `git diff --name-only` to the specs, and write each change with its creative intent and commit reference
- **E**: update `STATUS.md`, and list the touched specs in the episode

## The Kin: Two Duties

1. **Keep it true.** Update the kin when a relation changes: the spec's contract, a moved or renamed kin, a new version, a new consumer, a new dependency. Write the reciprocal row in the kin's own file, or open an issue there.
2. **Follow it before acting.** Upstream: the change begins there (issue, publish, then bump here). Downstream: tell them or bump and deliver. Sibling: consume, never restate. Guardian: bring the held decision to its holder. Place: deliver to where it runs. Record what you did under Harmony.

## Where Specifications Land

```
rispecs/
├── README.md                 roadmap: one row per topic folder
└── <topic>/                  one folder per surface
    ├── README.md             outcome, files in reading order, status
    ├── 01-reverse-engineer.md · 02-intent.md      1 R, 2 I (when the whole pass lives here)
    ├── SPEC.md               3 S  master: the whole surface, how the parts compose
    ├── <topic>.kin.md        2 I  kin: relations across layers and repos, what each asks
    ├── 03-<part>.spec.md     3 S  a part
    ├── 04-export.md          4 E
    └── STATUS.md             ↺    what is built
```

- **Whose part is this?** Put the file in that surface's folder. A `rispecs/` root that has topic folders holds only `README.md` and `AGENTS.md`. A `rispecs/` that describes one surface (a package) is that surface's folder.
- **Numbers are reading order**, and reading order follows R → I → S → E. They are given at birth and never reused.
- **Moving a misplaced spec** uses `git mv` into its surface's folder and keeps the file name. Then fix path citations, and add a Moved row to `rispecs/README.md`.
- **Check**: run `python3 rispecs_layout_check.py <repo>` from a jgwill/llms-txt checkout.

## Creative Orientation in Specifications

| Reactive (Traditional) | Creative (RISE) |
|---|---|
| "Fix the search feature" | "Users create precise search queries that manifest their desired information" |
| "Remove loading delays" | "Instant, fluid interaction that supports creative flow" |
| "Handle edge cases" | "Support for every path users take toward their vision" |
| Features = problems to solve | Features = outcomes to create |
| Oscillating maintenance specs | Advancing creation specs |

**Advancing**: Features build on each other. Natural progression. Structural dynamics resolve tension forward.

**Oscillating**: Dependency loops. Repeated effort required. Constant maintenance to function.

**Test**: Does this feature move users TOWARD their desired outcome, or does it just prevent a problem?

## Integration

- **Creative Orientation** (`/creative-orientation`): Foundation — RISE implements creative archaeology
- **Structural Tension Charting** (`/structural-tension-charting`): A spec's desired outcome and current reality can be held as a tension chart, and a designed chart can export its own rispec (`generate_rispec`, `llms-stc-state-machine.md`)
