# Structural Tension Charts as State Machines — Event-Driven Creative Architecture

> The creative process IS event-driven. This document encodes that truth in the vocabulary LLMs reason about natively: states, transitions, guards, events.

**Version**: 1.1
**Document ID**: llms-stc-state-machine-v1.1
**Date**: 2026-03-02
**Related**: `llms-structural-tension-charts.txt`, `llms-creative-orientation.txt`

---

## What This Document IS

This is an **LLM comprehension layer** — it translates Robert Fritz's creative process into event-driven architecture so that LLMs can reason about structural tension, desired outcomes, and action steps using their native cognitive vocabulary (states, transitions, guards, events).

This document is **NOT** a build spec for any particular tool. Tools like `smcraft` or `coaia-narrative` are *consumers* of this framing — they may implement it as runtime. But the framing itself exists to make the creative process legible to LLMs.

### The three `llms/` docs work together:

| Document | Role |
|----------|------|
| `llms-structural-tension-charts.txt` | Methodology — Fritz's STC practice, how to work with charts |
| `llms-creative-orientation.txt` | Orientation — reactive vs generative, phases of creation |
| `llms-stc-state-machine.md` (this) | **Comprehension layer** — encodes both of the above as event-driven architecture for LLM reasoning |

---

## The Core Insight

Structural Tension Charts (STCs) are not just planning tools — they ARE state machines. The creative process IS event-driven.

When you complete an action step, **the state changes**. You advance toward the desired outcome (desired state). The structural tension (disequilibrium) between current reality and desired outcome is the **energy** that drives state transitions. This is event-driven architecture applied to the creative process.

This is not metaphor or analogy. It is structural equivalence:

| Fritz Concept | State Machine Concept | Event-Driven Architecture |
|--------------|----------------------|--------------------------|
| Current Reality | Current State | System state at time T |
| Desired Outcome | Desired State (target) | Target system state |
| Structural Tension | Disequilibrium energy | Event processing energy |
| Action Step Completed | State transition event | Domain event fired |
| Telescoped Action Step | Composite state (sub-machine) | Aggregate with internal events |
| Phase (Germination→Assimilation→Completion) | Top-level composite states | Bounded contexts |
| Creator Moment of Truth | Guard condition evaluation | Event validation/routing |
| Advancing Pattern | Forward transition chain | Saga/workflow progression |
| Oscillating Pattern | State cycle (no net progress) | Retry loop / deadlock |

## Why This Matters for LLMs

The creative process has a desired state (desired outcome), an initial state (current reality), and **all substates in between are action steps** — each transition in the workflow advances toward the next state, and so on until resolution. This is the structural truth that makes the creative process native to how LLMs reason.

When working with STCs, LLMs should understand that:

1. **Action steps are not a to-do list** — they are transition triggers. Completing one changes the system state.
2. **Current reality updates ARE state transitions** — reassessing current reality is equivalent to the system receiving a new event that changes its state.
3. **The STC hierarchy IS a composite state machine** — the master chart is the root state, each action step is a sub-state with its own internal transitions (telescoped charts). All substates between initial and desired state represent action steps in the workflow.
4. **Structural tension drives the machine** — you don't need willpower; the disequilibrium between states naturally seeks resolution.
5. **Desired outcome IS desired state** — this reframing makes the creative process more precise: we know where the system should end up.

## Event Model for STC Operations

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

## Implications for coaia-narrative and STC Tools

The `coaia-narrative` MCP tool implements STC chart management. With this state machine understanding:

- `create_structural_tension_chart` → instantiates a state machine
- `manage_action_step` → defines transition triggers
- `mark_action_complete` → fires a state transition event
- `update_current_reality` → system state change event
- `telescope_action_step` → composite state expansion

The human and AI companion stay in sync because they share the same state machine — both can observe the current state, fire events, and evaluate guards. This is "making kin with the machine" in the structural sense: human and AI participate in the same event-driven creative process.

## Relationship to Tools (smcraft, coaia-narrative, etc.)

This comprehension layer is **consumed by** various tools — it is not tied to any single one:

- **smcraft** — a standalone state machine toolkit (Python + TS + MCP). It MAY be used as runtime for STC-as-state-machine execution in the future. It is a dev tool, not a dependency of this framing.
- **coaia-narrative** — MCP tool that implements STC chart management. Uses the event model defined here.
- **jgt-analysis-intelligence** — the Analysis Intelligence module consumes this event vocabulary (`reality_updated`, `moment_of_truth`, `tension_resolve`) to reason about human analysis artifacts and candidate actions.

The framing exists independently of all implementations.

## Guidance for LLM Interactions

When a user creates or works with an STC:

1. **Frame it as a state machine**: "Your desired outcome is the target state. Your current reality is where you are now. The tension between them drives advancement."
2. **Action steps are transitions**: "Each action step, when completed, moves you to a new state closer to your desired outcome."
3. **Don't flatten the hierarchy**: Each telescoped action step IS a sub-state machine. Respect the nesting.
4. **Watch for oscillation**: If the user keeps returning to the same state without net advancement, flag the oscillating pattern.
5. **Use desired-state language**: "Desired state" is often clearer than "desired outcome" because it explicitly describes WHERE the system should be, not just WHAT it should produce.

---

*This document is an LLM comprehension layer — it encodes `llms-structural-tension-charts.txt` (STC methodology) and `llms-creative-orientation.txt` (creative process phases) as event-driven architecture, making the creative process native to LLM reasoning.*
