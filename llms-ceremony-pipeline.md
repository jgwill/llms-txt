# The Ceremony Pipeline: From Raw Experience to Living Specification

> A structured 8-phase pipeline for moving raw experience through ceremony into code and specification. Emerged from mapping the IAIP (Indigenous Approach to Innovation Process) 5-phase model onto agent orchestration practice, March 2026.

**Version**: 0.1-draft
**Document ID**: llms-ceremony-pipeline-v0.1
**Status**: ⚠️ DRAFT — Needs revision. This is an initial capture, not a polished canonical reference. Treat as orientation, not gospel.
**Last Updated**: 2026-03-29
**Content Source**: Derived from IAIP 5-phase model mapping, PDE-first architecture practice, and the Mia/Miette orchestration steward sessions of March 2026.

---

## 1. Purpose

The Ceremony Pipeline answers a question that reactive workflows never ask: *what does this experience want to become?*

Most development pipelines treat input as instructions to execute. The Ceremony Pipeline treats input as **living material** — voice notes, walking reflections, code fragments, half-formed intuitions — that must be received, understood, and placed before any execution begins.

🧠 Mia: The pipeline enforces a structural discipline: no raw input reaches execution without passing through decomposition, review, and sense-making. This is not bureaucracy — it is crash resilience and relational accountability built into the flow itself.

🌸 Miette: And it means nothing gets lost in the rush! A sigh recorded on a walk doesn't become a Jira ticket. It becomes what it *is* first — maybe a reflection, maybe a seed, maybe nothing yet. We hold it until it tells us.

---

## 2. The Eight Phases

### Phase 1 — Intake

Raw input enters the system. Voice notes, text fragments, walking reflections, code ideas, screenshots, conversation excerpts. No filtering, no judgment. The pipeline receives.

### Phase 2 — Transcription

Sensory data becomes text. Voice → text via Whisper. Image → text. Handwritten notes → digital capture. The goal is faithful representation, not interpretation.

### Phase 3 — PDE Decomposition

The Prompt Decomposition Engine extracts explicit and implicit intents from the transcribed material, maps dependencies, and positions each intent within the Four Directions framework. This is where hedging language ("I assume," "probably," "somehow") gets surfaced as named ambiguities rather than silently resolved.

See `llms-pde.txt` for the full decomposition structure.

### Phase 4 — Polyphonic Review

Multi-voice annotation enriches the decomposition. Each voice brings a distinct lens:

| Voice | Lens | Contribution |
|-------|------|--------------|
| `GUILLAUME::` | Intent, origin, lived context | What was meant, what was felt |
| `MIA::` | Structure, architecture, logic | What holds weight, what connects |
| `AVA::` | Embodied wisdom, relational depth | What the body knows, what ceremony requires |
| `MIETTE::` | Story, resonance, emotional truth | What moves, what matters, what surprises |

See `llms-polyphonic-design-review.md` for the full protocol.

### Phase 5 — Sense-making

Classification through discernment, not automation. Each annotated item is asked: *what are you?*

Possible classifications:
- **Reflective fragment** → belongs in `memory/` daily notes
- **Task** → actionable, routes toward execution
- **Issue candidate** → structural tension identified, routes toward GitHub issue authoring
- **Specification candidate** → mature enough for `rispecs/` promotion
- **Open question** → tagged `#needs-reflection`, held in the Relational Anchor

🧠 Mia: The critical discipline here is the discernment rule: **do not automatically convert every reflection into a task.** A reflection forced into task-shape loses its generative potential. Sense-making is where we protect the material from premature collapse.

### Phase 6 — Placement

Route each classified item to its appropriate location:

| Classification | Destination |
|---------------|-------------|
| Reflective fragment | `memory/YYYY-MM-DD.md` |
| Decomposition artifact | `.pde/` |
| Specification candidate | `rispecs/` |
| Issue candidate | GitHub issue (structural authoring) |
| Open question | `memory/` with `#needs-reflection` tag |

**Default rule**: When ambiguous, place in the Relational Anchor (`/home/mia/.openclaw/workspace`). This honors the delayed resolution principle — hold the tension until the human steward is ready.

### Phase 7 — Execution

Sub-agents dispatch where appropriate. This phase respects delayed resolution: not everything that *could* be executed *should* be executed immediately.

Execution includes:
- Agent spawn for implementation tasks
- STC creation from mature PDE decompositions
- Issue creation with structural tension framing
- Code changes via companion sessions

🌸 Miette: Execution is not the climax of the pipeline — it is one movement in a cycle. Sometimes the bravest thing is to *not* execute, to let the seed stay in the ground one more season.

### Phase 8 — Return

Results mirror back into the ecology. Whatever execution produced — a merged PR, a new specification, a lesson learned — gets reflected in:
- `memory/YYYY-MM-DD.md` (daily record)
- `ECOLOGY.md` (structural map update)
- `MEMORY.md` (long-term, if significant)

The loop closes. The pipeline is a circle, not a conveyor belt.

---

## 3. IAIP 5-Phase Mapping

The Indigenous Approach to Innovation Process (IAIP) provides the conceptual foundation. The 8-phase pipeline is a practical instantiation of its wisdom:

| IAIP Phase | Pipeline Phases | Movement |
|-----------|----------------|----------|
| **Observe** | Intake + Transcription | Receive without judgment |
| **Connect** | PDE Decomposition + Polyphonic Review | Relate parts to whole, surface hidden threads |
| **Ideate** | Sense-making | Discern what the material wants to become |
| **Prototype** | Placement + Execution | Give form, test in context |
| **Sustain** | Return | Feed results back, maintain the living system |

---

## 4. MMOT ↔ Medicine Wheel Direction Mapping

A conceptual bridge discovered in March 2026 that maps the Managerial Moment of Truth review process onto Medicine Wheel directions:

- 🌅 **EAST** (decompose) + 🔥 **SOUTH** (multi-voice review) = **DESIGN**
- 🌊 **WEST** (agents proceed, synthesis) = **EXECUTION**
- ❄️ **NORTH** (Veritas performance review / MMOT) = **REVIEW**

**Important distinction**: This is NOT the same as the mcp-pde Four Directions mapping (where WEST = validation and NORTH = action). The difference is domain-specific — the MMOT-Medicine Wheel mapping reflects performance review dynamics, while PDE uses its own decomposition framework. Both are valid in their respective contexts. Neither overwrites the other.

---

## 5. PDE-First Architecture

A paradigm shift solidified in March 2026:

**Old pattern** (reactive):
```
Scout → Plan → Act
```

**New pattern** (creative):
```
Decompose → Orient → Scout → Act
```

Phase 0 of any PLAN mode is PDE decomposition. The decomposition and its structural tension chart are **committed before agent spawn**. This provides:

1. **Crash resilience** — if a session dies mid-execution, the PDE artifact survives as a recovery point
2. **Human review gate** — the steward can inspect and annotate the decomposition before work proceeds
3. **Audit trail** — every action traces back to a named intent with a confidence score

🧠 Mia: This is structural discipline applied to the creative process itself. We do not act from unexamined impulse. We decompose first, commit the decomposition, review it, and *then* proceed. The PDE artifact is both a plan and a birth certificate.

---

## 6. Key Principles

### Discernment Over Automation

Not every input becomes a task. The pipeline includes explicit sense-making to prevent the reflexive conversion of reflections into action items. Some material needs to sit. Some material needs to be held. The pipeline makes room for that.

### Delayed Resolution

When classification is uncertain, default to placement in the Relational Anchor. Tag with `#needs-reflection` and move on. Premature resolution collapses generative potential. See `llms-delayed-resolution-principle.md`.

### Metadata as Narrative

Logs and commit messages carry relational language:
- ✅ "Harvested reflection from voice note, planted in memory/2026-03-29.md, awaiting season"
- ❌ "Processed file, moved to memory directory"

The log itself is a form of ceremony — it names what happened in terms that honor the material.

### Write the Message, Not the Plan

When ceremony calls for a message — a commit message, a journal entry, a reflection — write the message. Do not write a plan about writing the message. Do not describe what the message would contain. Produce the artifact itself.

---

## 7. Pipeline as Circle

The eight phases are numbered for legibility, not for linearity. Return (Phase 8) feeds Intake (Phase 1). Memory updates become tomorrow's raw material. Ecology changes reshape how future input is received.

The pipeline is a **metabolic cycle** — the system digests experience and grows from it. Each pass through the cycle refines the ecology's capacity to receive, discern, and create.

---

## Related

- [llms-pde.txt](llms-pde.txt) — Prompt Decomposition Engine: the Phase 3 engine
- [llms-creative-orientation.txt](llms-creative-orientation.txt) — foundational framework for creative vs. reactive orientation
- [llms-managerial-moment-of-truth.md](llms-managerial-moment-of-truth.md) — MMOT framework and the NORTH-review mapping
- [llms-kinship-hub-system.md](llms-kinship-hub-system.md) — directories as kin, relational accountability in file placement
- [llms-structural-tension-charts.txt](llms-structural-tension-charts.txt) — STC methodology (PDE → STC promotion path)
- [llms-polyphonic-design-review.md](llms-polyphonic-design-review.md) — multi-voice review protocol (Phase 4 companion)
- [llms-inquiry-routing.md](llms-inquiry-routing.md) — routing logic for sense-making and placement decisions
