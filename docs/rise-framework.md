# RISE Framework

> **R**everse-engineer, **I**ntent-extract, **S**pecify, **E**xport — a creative-oriented methodology for understanding and generating code architectures through structural tension dynamics.

---

## Foundation: Specifications as Prose Code

RISE builds on SpecLang's core insight: **specifications are "prose code"** — natural language representations of computation that still require you to think like a programmer.

### SpecLang Principles

- **Spec as Source of Truth** — the specification is what you maintain; executable code is secondary
- **Variable Detail Levels** — offhand remarks may generate dozens of boilerplate lines; exact steps when precision matters
- **Creating and Adjusting** — start simple, refine against running output, stop when reality matches vision
- **Bi-directional Ideation** — the model "yes-ands" your intent, extending ideas naturally
- **Intent-based Expression** — focus on behavior; toolchain handles plumbing

---

## The Four Phases and the Return

One phase per letter, and each phase leaves a named file in the `rispecs/` folder of the
repository it describes.

| Phase | The question it answers | What it leaves in `rispecs/<topic>/` |
|---|---|---|
| 1 · **R** Reverse-engineer | What does the prototype do, and what do people love in it? | `01-reverse-engineer.md` |
| 2 · **I** Intent-extract | What did its creator want to bring into being, and what is it in relationship with? | `02-intent.md`, the kin file `<topic>.kin.md` |
| 3 · **S** Specify | What is to be built, in prose another LLM can implement? | `SPEC.md` + `NN-<part>.spec.md` |
| 4 · **E** Export | Who takes it up, and where is it remembered? | `NN-export.md`, a row in `rispecs/README.md`, the episode's `rispecs:` entry |
| ↺ Return | What has the code done since the spec was written? | `STATUS.md`, specs brought up to date |

### Phase 1: Reverse-engineer (R)

**Creative Archaeology**: extracting what exists with respect for what was created.

- Map the existing system's structure without importing preconceptions
- Identify what users *love* about the current prototype
- Use [Structural Thinking](creative-orientation.md): start with nothing, picture what is said, ask questions

### Phase 2: Intent-extract (I)

**Uncovering creative vision**: what the creator wanted to bring into being.

- Distinguish between what the code *does* and what the creator *intended*
- Name the structural tension: desired outcome and current reality
- Preserve the "beloved qualities" that make prototypes valuable
- Write the kin file (`<topic>.kin.md`): who and what the spec is in relationship with, and what each relationship asks of us ([llms-rispecs-kinship.md](../llms-rispecs-kinship.md); what *relationship* means: [llms-relationality.md](../llms-relationality.md))

### Phase 3: Specify (S)

**SpecLang prose-code**: writing specifications that capture desired outcomes.

- Specifications focus on *what you want to create*, not problems to fix
- Detail varies: broad strokes for obvious patterns, precision for critical behavior
- Creative Advancement Scenarios take the place of BDD scenarios
- The test: could another LLM implement the surface from the specification alone?

### Phase 4: Export (E)

**The specification leaves its author**: it lands where its readers find it, is written for the
next builder, and is recorded where the work is remembered.

- Lands in the surface's own folder under `rispecs/`, with a row in the roadmap README
- An export file gives the builder the scenarios, contracts and the gates that prove it built
- The episode that asked for it lists the spec folder in `episode.yaml`

Implementation follows Export. Building from the specification is not a fifth letter.

### ↺ The Return

**Keeping specifications alive**: a RISE pass run on what changed since the specification was
written. Git history dates the spec against the code, commit messages carry the intent, the
specs take the change, and `STATUS.md` records what is built.

---

## Where Specifications Land

```
rispecs/
├── README.md                   roadmap: one row per topic folder
└── <topic>/                    one folder per surface
    ├── README.md               outcome, files in reading order, status
    ├── 01-reverse-engineer.md  R
    ├── 02-intent.md            I
    ├── SPEC.md                 S  master: the whole surface, how the parts compose
    ├── <topic>.kin.md          I  the kin file, always: relatives, and what each asks
    ├── 03-<part>.spec.md       S  a part
    ├── 04-export.md            E
    └── STATUS.md               ↺  what is built
```

Ask *"whose part is this?"* and put the file in that surface's folder. Number prefixes are
reading order, and reading order follows the phases. Moving a misplaced spec changes its folder,
never its file name. Full layout and checker: [llms-rispecs-layout.md](../llms-rispecs-layout.md).

---

## RISE and the Creative Orientation

RISE changes how reverse engineering is practiced:

| Reactive Approach | RISE Approach |
|------------------|---------------|
| Find bugs and fix them | Discover creative intent and honor it |
| Document what's broken | Specify what's desired |
| Patch problems | Advance toward the vision |
| Technical debt analysis | Creative archaeology |

---

## Key Sources

- [llms-rise-framework.txt](../llms-rise-framework.txt) — full framework (2.0.0)
- [llms-rispecs-layout.md](../llms-rispecs-layout.md) — the `rispecs/` tree, its names, and how to move a misplaced spec
- [llms-creative-orientation.txt](../llms-creative-orientation.txt) — foundational principles
- [llms-structural-thinking.txt](../llms-structural-thinking.txt) — structural thinking methodology (master index)
