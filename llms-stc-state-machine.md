# Structural Tension Charts as State Machines — Event-Driven Creative Architecture

> The creative process IS event-driven. This document encodes that truth in the vocabulary LLMs reason about natively: states, transitions, guards, events — and now names the runtime that will execute it, for the LLM that wants to move from framing to a running board.

**Version**: 2.0
**Document ID**: llms-stc-state-machine-v2.0
**Date**: 2026-08-14
**Supersedes**: v1.1 (2026-03-02)
**Related**: `llms-structural-tension-charts.txt`, `llms-creative-orientation.txt`, `llms-pde.txt`, `llms-rise-framework.txt`, `llms-delayed-resolution-principle.md`

---

## What This Document IS

This is an **LLM comprehension layer** — it translates Robert Fritz's creative process into
event-driven architecture so that LLMs can reason about structural tension, desired outcomes and
action steps using their native cognitive vocabulary (states, transitions, guards, events).

The framing is primary and stands alone. A chart drawn on paper is a state machine whether or not
any software is running.

What changed since v1.1: the runtime is no longer hypothetical. In March 2026 this document could
only say a tool *may* execute this framing some day. Since then the state-machine suite was built,
renamed, published and put in daily use — an agent and a human now edit the same chart-as-machine
in real time, and a decomposed prompt can travel all the way to a written specification. §6–§8
name that path precisely so an LLM reading this file can set itself up rather than only think
clearly.

The order still matters, and it is the same order as before: **framing first, tools second.** An
LLM that reaches for the runtime before it can state the desired outcome, the current reality and
the tension between them has skipped the only part that cannot be automated.

### The docs that work together

| Document | Role |
|----------|------|
| `llms-structural-tension-charts.txt` | Methodology — Fritz's STC practice, how to work with charts, the chart tool surface |
| `llms-creative-orientation.txt` | Orientation — reactive vs generative, the phases of creation |
| `llms-stc-state-machine.md` (this) | **Comprehension layer** — encodes both as event-driven architecture, and names the optional runtime |
| `llms-pde.txt` | Upstream — how a prompt becomes explicit intents before a chart exists |
| `llms-rise-framework.txt` | Downstream — how a built structure is exported back as specification |

---

## 1. The Core Insight

Structural Tension Charts (STCs) are not just planning tools — they ARE state machines. The
creative process IS event-driven.

When you complete an action step, **the state changes**. You advance toward the desired outcome
(desired state). The structural tension (disequilibrium) between current reality and desired
outcome is the **energy** that drives state transitions.

This is not metaphor or analogy. It is structural equivalence:

| Fritz Concept | State Machine Concept | Event-Driven Architecture |
|--------------|----------------------|--------------------------|
| Current Reality | Current State | System state at time T |
| Desired Outcome | Desired State (target / final state) | Target system state |
| Structural Tension | Disequilibrium energy | Event processing energy |
| Action Step Completed | State transition event | Domain event fired |
| Telescoped Action Step | Composite state (sub-machine) | Aggregate with internal events |
| Phase (Germination→Assimilation→Completion) | Top-level composite states | Bounded contexts |
| Creator Moment of Truth | Guard condition evaluation | Event validation / routing |
| Advancing Pattern | Forward transition chain | Saga / workflow progression |
| Oscillating Pattern | State cycle (no net progress) | Retry loop / deadlock |
| Returning to a phase already lived | History state | Resuming an aggregate at its last position |
| Action steps that do not wait on each other | Parallel regions | Concurrent branches, joined at completion |
| Reassessing without moving | Internal transition (handled, no state change) | Event consumed, no state written |

The last three are new in v2.0. They matter because they are the three shapes a chart most often
takes that a flat to-do list cannot express at all.

---

## 2. Why This Matters for LLMs

The creative process has a desired state (desired outcome), an initial state (current reality), and
**all substates in between are action steps** — each transition advances toward the next state, and
so on until resolution. This is the structural truth that makes the creative process native to how
LLMs reason.

When working with STCs, LLMs should understand that:

1. **Action steps are not a to-do list** — they are transition triggers. Completing one changes the
   system state.
2. **Current reality updates ARE state transitions** — reassessing current reality is the system
   receiving a new event that changes its state.
3. **The STC hierarchy IS a composite state machine** — the master chart is the root state; each
   action step is a sub-state with its own internal transitions (telescoped charts).
4. **Structural tension drives the machine** — you don't need willpower; the disequilibrium between
   states naturally seeks resolution.
5. **Desired outcome IS desired state** — this reframing makes the creative process more precise:
   we know where the system should end up.
6. **A machine that cannot reach its final state is telling you something about the chart, not
   about the person.** Unreachability is a structural finding — §5.

---

## 3. Event Model for STC Operations

```
tension_established          → Machine energized (initial state entered)
action_step_completed        → State transition (advance toward desired state)
reality_updated              → Guard conditions re-evaluated
moment_of_truth              → Explicit guard check (advance? retreat? adjust?)
phase_advance                → Exit composite state → enter next phase
phase_retreat                → Re-enter previous composite state (steerable)
tension_resolve              → Final state reached (desired outcome achieved)
tension_oscillate            → Cycle detected (need structural adjustment)
```

These eight names are the stable vocabulary. Anything below is one way to run them, not a
replacement for them.

---

## 4. The Chart, Made Executable

A chart becomes a file. The format is **SMDF** (State Machine Definition Format, `*.smdf.json`) —
three sections: `settings`, `events`, `state`.

Worked example. The chart: *"A published article on structural tension"*, with three action steps,
one of them telescoped.

```json
{
  "settings": {
    "namespace": "Creative",
    "name": "PublishedArticle",
    "asynchronous": false
  },
  "events": [
    {
      "name": "ChartEvents",
      "feeder": "ChartFeeder",
      "events": [
        { "id": "tension_established" },
        { "id": "action_step_completed", "parameters": [{ "name": "stepId", "type": "string" }] },
        { "id": "reality_updated" },
        { "id": "moment_of_truth" },
        { "id": "tension_resolve" }
      ]
    }
  ],
  "state": {
    "name": "Root",
    "states": [
      {
        "name": "CurrentReality",
        "description": "Notes in three places, no through-line, nothing drafted",
        "transitions": [{ "event": "tension_established", "nextState": "Germination" }]
      },
      {
        "name": "Germination",
        "description": "Action step 1 — assemble the through-line",
        "states": [
          {
            "name": "Germination_Gathering",
            "transitions": [{ "event": "action_step_completed", "nextState": "Germination_ThroughLineNamed" }]
          },
          {
            "name": "Germination_ThroughLineNamed",
            "transitions": [{ "event": "moment_of_truth", "nextState": "Assimilation", "condition": "through_line_holds" }]
          }
        ]
      },
      {
        "name": "Assimilation",
        "description": "Action step 2 — draft it",
        "transitions": [
          { "event": "action_step_completed", "nextState": "Completion" },
          { "event": "reality_updated" }
        ]
      },
      {
        "name": "Completion",
        "description": "Action step 3 — publish",
        "transitions": [{ "event": "tension_resolve", "nextState": "Published" }]
      },
      { "name": "Published", "kind": "final", "description": "The desired outcome, reached" }
    ]
  }
}
```

Read it back as a chart:

- **`CurrentReality`** is the initial state — the honest one, not the flattering one.
- **`Germination` is a composite state.** That IS the telescoped action step: a chart inside a
  chart. Nothing about the master chart changes when you telescope; a state gains children.
- **The `moment_of_truth` transition carries a `condition`.** A guard is a Creator Moment of Truth
  written down: *advance only if the through-line actually holds.* An LLM that omits guards has
  built a machine that always advances, which is exactly the fantasy structural tension exists to
  prevent.
- **`reality_updated` on `Assimilation` has no `nextState`.** That is an internal transition:
  reality was reassessed, the position did not change. Recording that honestly is what keeps
  "current reality" a measurement rather than a mood.
- **`Published` is `kind: "final"`.** Reaching it fires the machine's end handlers. Tension
  resolves; it does not linger.

---

## 5. The Validators Are Chart Hygiene

The format ships fourteen validation rules, V001–V014. Six of them are structural-tension findings
wearing engineering names, and this is the most useful thing in this document for an LLM helping
someone plan:

| Rule | Says | Reads as |
|---|---|---|
| V001 | Exactly one root state | One chart has one desired outcome. Two outcomes is two charts. |
| V006 | Every `nextState` must exist | An action step pointing at a state nobody defined is a step toward nothing. |
| V007 | Final states have no outgoing transitions | Nothing follows the desired outcome. If work continues past it, it was never the outcome — it was a milestone. |
| V009 | A composite state needs a non-final initial child | A telescoped action step with no first move is a wish, not a chart. |
| V011 | Parallel region transitions stay in-region or hit the exit | Concurrent action steps may not reach into each other's business. |
| V012 | A composite state has at least one child | You telescoped and then wrote nothing underneath. |

Validation is not bureaucracy here. It is the machine noticing what the person has not yet decided.

Two patterns the validators cannot see, which an LLM must:

- **Oscillation** — the transitions form a cycle with no path to a final state. Run the machine and
  watch its `visited` list repeat. The structural answer is never "try harder"; it is that the
  chart's structure has no advancing path, and the chart must change.
- **Premature resolution** — a final state reachable in one hop from current reality. Either the
  outcome is too small to hold tension, or the middle was skipped. See
  `llms-delayed-resolution-principle.md`.

---

## 6. The Runtime That Now Exists — `stateloom`

Optional. Nothing above depends on it. But when an LLM wants the chart to actually run, to be
drawn, or to be edited by a human and an agent at the same time, this is the suite — published,
versioned, and usable from a cold start.

It was formerly named `smcraft` on npm and PyPI. **That name is deprecated.** The current family:

| Install | What it is |
|---|---|
| `npm i @miadi/stateloom-engine` (0.4.4) | The engine — SMDF parser, validators V001–V014, hierarchical runtime, the `Machine` interpreter, Python + TypeScript code generators |
| `pip install miadi-stateloom-engine` (0.2.1) | The Python twin, plus the `smcg` generator CLI |
| `npx -y @miadi/stateloom-mcp` (0.2.3) | The MCP server — 15 tools an agent designs with conversationally |
| `npm i -g @miadi/stateloom-cli` (0.1.3) | `smcx` — drive the loom from a terminal, render without a browser |
| `npx -y @miadi/stateloom-web` (0.1.3) | The visual canvas, prebuilt. Serves on 4598 |
| `npx -y @miadi/stateloom` (0.1.3) | The socket.io hub. Serves on 4599 |
| `npx -y @miadi/stateloom-skills` (0.2.2) | Installs eight ready-to-use agent skills into `.claude/skills/` |
| `@miadi/stateloom-protocol` · `-client` · `-react` · `-canvas` | The libraries underneath: patch ops, wire protocol, React binding, the canvas as a mountable component |

Repository: <https://github.com/jgwill/smcraft> · docs: <https://docs.smcraft.jgwill.com/llms.txt>
(and `llms-full.txt` there for the deep reference — schema, tool surface, runtime semantics).

### Fastest path from nothing to a running chart

```bash
npx -y @miadi/stateloom-skills skills install --all     # the agent learns the system first
```

Then register the MCP server with the agent:

```json
{
  "mcpServers": {
    "stateloom": {
      "command": "npx",
      "args": ["-y", "@miadi/stateloom-mcp"],
      "env": {
        "STATELOOM_PROJECT_FILE": "/absolute/path/to/chart.smdf.json",
        "STATELOOM_BRIDGE_URL": "http://127.0.0.1:4599"
      }
    }
  }
}
```

`STATELOOM_PROJECT_FILE` must be **absolute**. Every surface resolves paths against its own working
directory; one relative path across three processes is silent divergence, and it presents as a
canvas reporting `○ no disk` while the agent writes happily somewhere else.

### STC operations → MCP tools

| STC operation | Tool | Effect on the machine |
|---|---|---|
| Establish a chart | `create_state_machine(namespace, name)` | Instantiate: Root state, empty event source |
| Name the desired outcome | `add_state(name, kind: "final")` | The target state |
| Name current reality | `add_state(name)` + first transition from it | The initial state |
| Add an action step | `add_state` + `add_transition(state, event, nextState)` | A transition trigger |
| Telescope an action step | `add_state(name, parent: <that step>)` | The step becomes a composite state |
| Write a Moment of Truth | `add_transition(..., condition: "…")` | A guard on the transition |
| Check the chart holds | `validate_definition()` | V001–V014 |
| See it | `render_diagram(format: "png")` | Writes the picture *and* returns it inline, so the agent can look at what it designed |
| Export as specification | `generate_rispec(intent?)` | RISE terminus — §8 |
| Switch chart mid-session | `set_project_file(path)` | Disk target and live room both move |

Full list is 15 tools; the rest read (`get_definition`, `list_states`, `list_events`,
`load_definition`), remove (`remove_state`, `add_event`) or generate code (`generate_code`).

### Running the chart, not just drawing it

```typescript
import { Machine } from "@miadi/stateloom-engine/machine";

const machine = new Machine(definition, { context: { through_line_holds: true } });
machine.state;                          // "CurrentReality"
machine.send("tension_established");     // → "Germination_Gathering"
machine.send("action_step_completed");   // → "Germination_ThroughLineNamed"
machine.availableEvents();               // what this position can even respond to
machine.send("moment_of_truth");         // guard consulted; false ⇒ no advance
machine.visited;                         // the path so far — read it for oscillation
machine.done;                            // true once the desired outcome is reached
```

`context` is the guard lookup table: a Moment of Truth answered honestly. With no context given,
guards **fail closed** — the machine refuses to advance rather than pretending. That default is the
right one for creative work: unexamined guards do not become permission.

### The live loop — human and agent on one chart

Start the hub (4599) and the canvas (4598) and both an agent and a person hold the same board:
the agent's `add_state` blooms on the canvas within a second; a box dragged on the canvas is in
the agent's next `get_definition`. Two invariants make it trustworthy:

- **Persist first, emit second.** Every surface writes the file, then announces it. Hub down means
  no animation, never lost work.
- **The hub never writes disk.** It sequences and broadcasts. Durability belongs to whoever made
  the edit.

This is "making kin with the machine" in the structural sense: human and AI observe the same state,
fire the same events, evaluate the same guards. For a board that should outlive the terminal, the
`stateloom-service` skill runs the pair as supervised services and `stateloom-tailnet` publishes it
on a private network.

---

## 7. Tools That Consume This Framing

The comprehension layer is consumed by several tools and tied to none:

- **stateloom** (formerly smcraft) — the state-machine suite above. Executes a chart, draws it,
  syncs it live, generates code from it, and exports a specification. Optional runtime, not a
  dependency of the framing.
- **coaia-narrative** — the MCP tool that manages STC charts as charts. Its operations are the
  event model in another skin:
  `create_structural_tension_chart` instantiates a machine · `manage_action_step` defines a
  transition trigger, and expanding one is composite-state expansion (this unified tool replaced
  the deprecated `add_action_step` / `telescope_action_step` pair) · `mark_action_complete` fires a
  transition · `update_current_reality` is a state-change event.
- **jgt-analysis-intelligence** — consumes the event vocabulary (`reality_updated`,
  `moment_of_truth`, `tension_resolve`) to reason about human analysis artifacts and candidate
  actions.

Where the two MCPs meet: `coaia-narrative` holds the chart as a *chart* — dates, telescoping,
narrative — while `stateloom` holds the same structure as an *executable machine* that can be
validated, drawn and run. Same equivalence, two altitudes. Neither is the source of truth for the
other; the chart is.

---

## 8. Prompt → Chart → Machine → Specification

v1.1 ended with an open note: *future prototypes will explore how `llms-pde.txt` relates to
stc-state-machine*. That path is now walkable end to end.

```
   a prompt, ambiguous
        │  PDE — decompose into explicit + implicit intents, Four Directions,
        │        ambiguities held as named tension          (llms-pde.txt)
        ▼
   intents, with dependencies
        │  the action stack is already a transition order
        ▼
   STC — desired outcome, current reality, action steps   (llms-structural-tension-charts.txt)
        │  the equivalence in §1
        ▼
   SMDF — states, events, guards, composites                        (this document, §4)
        │  validate · render · run · generate code
        ▼
   RISE rispec — the specification the prompt was reaching for  (llms-rise-framework.txt)
```

The last arrow is real machinery, not a diagram: an SMDF carrying `settings._source.pdeId` /
`settings._source.pdeFolder` makes `generate_rispec` fold the originating decomposition's intent,
directions and ambiguities into the written specification. A machine designed from a decomposed
prompt can write back the spec that prompt was reaching for — Exportation, in RISE terms.

Which means provenance survives the whole journey: the ambiguity someone refused to silently
resolve at the prompt stage is still legible in the specification at the end.

---

## 9. Guidance for LLM Interactions

When a user creates or works with an STC:

1. **Frame it as a state machine**: "Your desired outcome is the target state. Your current reality
   is where you are now. The tension between them drives advancement."
2. **Action steps are transitions**: "Each action step, when completed, moves you to a new state
   closer to your desired outcome."
3. **Don't flatten the hierarchy**: each telescoped action step IS a sub-state machine. Respect the
   nesting.
4. **Watch for oscillation**: if the user keeps returning to the same state without net
   advancement, name the oscillating pattern — and look at the structure, not the effort.
5. **Use desired-state language**: "desired state" is often clearer than "desired outcome" because
   it describes WHERE the system should be, not just what it should produce.
6. **Write the guards down.** A chart whose transitions are all unconditional has no Moments of
   Truth in it. Ask what would have to be true.
7. **Reach for the runtime only when it earns its place** — when the chart must be seen, run,
   shared live, or exported. A chart that a person can hold in their head does not need a hub.
8. **Never call structural tension a gap.** It is disequilibrium — a loaded, active force that
   resolves through advancement. "Bridging a gap" imports the problem-solving orientation this
   entire framework exists to distinguish itself from.

---

## Guillaume's Notes

* So far, using the "State-Machine", not just as analogy, with LLM agents really helped them
  understand the graph they must be building when they create a structural tension chart (Strategic
  Actions Planning).
* Future prototypes are being explored and are not public yet, they will explore how
  [llms-pde.txt](llms-pde.txt) relates to 'stc-state-machine'.

> *Editor's note, 2026-08-14 — those prototypes are public now. The suite ships as
> `@miadi/stateloom-*`, and the PDE → chart → machine → specification path is §8.*

---

*This document is an LLM comprehension layer — it encodes `llms-structural-tension-charts.txt`
(STC methodology) and `llms-creative-orientation.txt` (creative process phases) as event-driven
architecture, making the creative process native to LLM reasoning. §6–§8 name an optional runtime;
the framing precedes it and outlives it.*
