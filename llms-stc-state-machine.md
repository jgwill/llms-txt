# Structural Tension Charts as State Machines — Event-Driven Creative Architecture

> How Robert Fritz's creative process methodology maps structurally to hierarchical state machines and event-driven architecture.

**Version**: 1.0
**Document ID**: llms-stc-state-machine-v1.0
**Date**: 2026-02-28
**Related**: `llms-structural-tension-charts.txt`, `llms-creative-orientation.txt`, `rispecs/smcraft-integration/01-state-machine-creative-process.spec.md`

---

## The Core Insight

Structural Tension Charts (STCs) are not just planning tools — they ARE state machines.

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

When working with STCs, LLMs should understand that:

1. **Action steps are not a to-do list** — they are transition triggers. Completing one changes the system state.
2. **Current reality updates ARE state transitions** — reassessing current reality is equivalent to the system receiving a new event that changes its state.
3. **The STC hierarchy IS a composite state machine** — the master chart is the root state, each action step is a sub-state with its own internal transitions (telescoped charts).
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

## Connection to smcraft

The `smcraft` (State Machine Craft) framework provides the formal engine for this:

- **SMDF format** defines the state machine structure
- **Runtime** executes state transitions
- **Code generator** produces executable state machine code
- **Web designer** visualizes the state machine graphically
- **MCP server** enables AI agents to interact with the state machine

See `examples/creative-process.smdf.json` for the canonical creative process state machine definition.

## Guidance for LLM Interactions

When a user creates or works with an STC:

1. **Frame it as a state machine**: "Your desired outcome is the target state. Your current reality is where you are now. The tension between them drives advancement."
2. **Action steps are transitions**: "Each action step, when completed, moves you to a new state closer to your desired outcome."
3. **Don't flatten the hierarchy**: Each telescoped action step IS a sub-state machine. Respect the nesting.
4. **Watch for oscillation**: If the user keeps returning to the same state without net advancement, flag the oscillating pattern.
5. **Use desired-state language**: "Desired state" is often clearer than "desired outcome" because it explicitly describes WHERE the system should be, not just WHAT it should produce.

---

*This document bridges `llms-structural-tension-charts.txt` (STC methodology) with `llms-creative-orientation.txt` (creative process phases) through the lens of state machine formalism.*
