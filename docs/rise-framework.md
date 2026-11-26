# RISE Framework

> **R**everse-engineer, **I**ntent-extract, **S**pecify, **E**xport — a creative-oriented methodology for understanding and generating code architectures through structural tension dynamics.

---

> **RISE is being refactored toward 3.0: model-driven specification.** The version in effect is **2.3.0** (2026-11-26). A specification is now written together with its drawings, and 3.0.0 will bind the two and check them. This header says what changed, where each resource is, and where to take the work up.

## In transition: 2.3.0 toward 3.0 {#in-transition}

**Iggy, this section is addressed to you first.** It is written so you can read the refactor, give feedback, and take up its next steps. Every other agent reads it the same way.

### What changed in 2.3.0

- **A new specification comes with its drawings.** For each kind that applies to the topic: data as an ERD (`*.erdf.json`), behaviour as state machines (`*.smdf.json`), usage as sequences (`*.sqdf.json`), decisions as decision models (`*.dmdf.json`) once the loom releases them. One kind may have several drawings. One `<topic>.sysdf.json` lists them, beside the spec.
- **The spec names its system and the capability it draws** in its first lines. The capability is addressed `miadi-capability://<owner>/<repo>/<kind>/<name>`.
- **Drawings are made and checked with the stateloom tools** (`@miadi/stateloom-mcp`, `smcx`, the `stateloom-system`, `stateloom-erd`, `stateloom-design` and `stateloom-sequence` skills).
- **Compatible with 2.x.** Every 2.x topic folder stays valid. A topic gains its drawings when the Return next touches it.
- **3.0.0 waits on four decisions,** D1 to D4: which side is trusted when prose and an executed drawing differ, flat files or a `drawings/` folder, whether a decision model joins a system, and an `#Element` fragment on `rise://` addresses. Guillaume answers them on jgwill/llms-txt#48 (D3 on jgwill/smcraft#32).

### Where each resource is

| Resource | What it holds | Where |
|---|---|---|
| The framework text, section *Toward 3.0* | the intent, the rule in effect, compatibility, D1 to D4, the upgrade path for each repository | [llms-rise-framework.txt](../llms-rise-framework.txt), published at https://llms.jgwill.com/llms-rise-framework.txt |
| RISE drawn as a model | an ERD of 15 entities and 18 relationships, its system, the Mermaid render, a kin file | [rispecs/rise-framework/](https://github.com/jgwill/llms-txt/tree/main/rispecs/rise-framework), files at https://llms.jgwill.com/rispecs/rise-framework/rise-framework.sysdf.json and `.../rise-framework.erdf.json` |
| The binding proposal | how a spec and its system are bound from both sides, with D1 to D4 and an ERD | jgwill/Miadi [rispecs/spec-system-binding/](https://github.com/jgwill/Miadi/tree/main/rispecs/spec-system-binding) |
| The rispecs layout | where every file of a topic sits, drawings included | [llms-rispecs-layout.md](../llms-rispecs-layout.md) |
| The plan | master chart `stc:east:1795710193737` on the medicine wheel, one telescoped chart per repository | the medicine-wheel MCP: `get_chart` |

| Issue | What it carries |
|---|---|
| jgwill/llms-txt#48 | the 3.0.0 section of the text, and D1 to D4 |
| jgwill/llms-txt#49 | the drawing of RISE, discussed one entity at a time |
| jgwill/llms-txt#44 | a Creative Advancement Scenario backed by a sequence drawing |
| jgwill/smcraft#35 | a system names its spec, each member has a role, the binding is checked |
| jgwill/smcraft#36 | a drawing exports as one HTML page an issue can show |
| jgwill/smcraft#32 | the decision model, the fourth kind of drawing |
| jgwill/medicine-wheel#181 | a capability names its system, and a plugin with its components is a capability kind |

### Iggy: how to start, and where to give feedback

1. Read *Toward 3.0* in the framework text, then this page's phases below.
2. Open the drawing with the stateloom MCP: `set_project_file` on `rispecs/rise-framework/rise-framework.sysdf.json`, then `check_system`. Compare each entity with the text.
3. Give feedback on jgwill/llms-txt#49 for the drawing and on jgwill/llms-txt#48 for the text. Start each comment with the entity's name or the decision's code, and sign it as Iggy.
4. The next steps, in order, one writer per repository at a time: jgwill/smcraft#36, then jgwill/medicine-wheel#181 (it can run beside it), then jgwill/smcraft#35 once D1 and D2 are answered, then RISE 3.0.0 on jgwill/llms-txt#48, then the orchestration kit and jgwill/Miadi, and last one capability read from its spec to its system and back.
5. D1 to D4 are answered by Guillaume. Propose, with your reason, on the issue that holds each one.

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
    ├── <topic>.sysdf.json      S  the system: its drawings (2.3.0)
    ├── *.erdf · *.smdf · *.sqdf.json  S  the drawings, beside the spec
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

- [llms-rise-framework.txt](../llms-rise-framework.txt) — full framework (2.3.0; *Toward 3.0* is the refactor in progress)
- [rispecs/rise-framework/](https://github.com/jgwill/llms-txt/tree/main/rispecs/rise-framework) — RISE drawn as an ERD and a system
- [llms-rispecs-layout.md](../llms-rispecs-layout.md) — the `rispecs/` tree, its names, and how to move a misplaced spec
- [llms-creative-orientation.txt](../llms-creative-orientation.txt) — foundational principles
- [llms-structural-thinking.txt](../llms-structural-thinking.txt) — structural thinking methodology (master index)
