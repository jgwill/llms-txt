# Prompt Decomposition Engine (PDE)

> Intention exploration as EAST practice — decomposing prompts into explicit and implicit intents, mapping dependencies, and organizing action through the Four Directions.

---

## PDE as EAST Practice

Prompt Decomposition is part of the **EAST** direction in the Medicine Wheel framework — the direction of **Vision**, where:

- Intentions are explored before action begins
- Explicit and implicit needs are surfaced
- Ambiguities are named rather than assumed away
- The full scope of what is being asked becomes visible

The EAST practice then guides toward **SOUTH** — planning and structured activities with human and AI companions. This is the bridge from vision to embodied action.

---

## How PDE Works

A prompt is decomposed into:

### Primary Intent
The single most important action — what the prompt is fundamentally asking for.

### Secondary Intents
Everything else, distinguished as:
- **Explicit** — stated directly in the prompt
- **Implicit** — inferred from hedging language ("probably," "I assume," "somehow")

### Four Directions Mapping

| Direction | Role | Examples |
|-----------|------|----------|
| 🌅 **East** | Vision — what is being asked | Requirements, desired outcomes, vision statements |
| 🔥 **South** | Analysis — what needs to be learned | Research, investigation, reading, growing |
| 🌊 **West** | Validation — what needs reflection | Testing, review, accountability checks |
| ❄️ **North** | Action — what executes the cycle | Implementation, delivery, creation |

### Action Stack
An ordered list of tasks respecting dependencies, each mapped to a direction.

### Ambiguities
Places where the prompt is vague or uses uncertain language — surfaced explicitly rather than resolved by assumption.

---

## Recommended CLI Path

For current agent work, use `miaco decompose run` as the main operational entrypoint:

```bash
miaco decompose run -P prompt.md -e copilot -s iterative-refinement -w .
```

Use `standard` when you need the stable baseline or compatibility with existing MCP decomposition flows. Use `iterative-refinement` when the prompt is layered, recursive, or likely to benefit from multiple readings before action. Treat `adversarial-consensus` as experimental until the local parser and downstream artifact shape are verified.

The current MCP path (`mcp-pde`, repo `jgwill/mcp-pde`) remains the standard decomposition interface. Strategy-aware MCP support is a likely future direction; until it exists, prefer `miaco decompose run --strategy ...` for strategy selection.

---

## Intent Analyst Role

The Intent Analyst is a PDE-facing role for reading a prompt before execution. Its work is to name the primary creative intent, surface secondary explicit and implicit intents, select the decomposition strategy, and decide whether a parent, child, refinement, or sibling PDE should be created.

The role is especially useful when a prompt contains phrases like "probably," "maybe," "I assume," "what will become," or references to prior sessions. Those are signals that `iterative-refinement` may preserve more intent than a single standard pass.

---

## PDE and Delayed Resolution

PDE embodies the [delayed resolution principle](../llms-delayed-resolution-principle.md): ambiguities are **named and held** rather than silently resolved. This prevents:

- Premature commitment to misunderstood requirements
- False confidence in AI interpretation
- Loss of the generative tension between "what was asked" and "what is needed"

---

## Integration

| Framework | Connection |
|-----------|-----------|
| [Creative Orientation](creative-orientation.md) | PDE frames decomposition as creation, not analysis |
| [Structural Tension](structural-tension.md) | Each decomposed intent creates its own tension chart |
| [Narrative Craft](narrative-craft.md) | Complex prompts contain story — PDE surfaces the narrative structure |

---

## Key Sources

- [llms-pde.txt](../llms-pde.txt) — PDE reference (llms-txt format)
- [@medicine-wheel/prompt-decomposition](https://www.npmjs.com/package/@medicine-wheel/prompt-decomposition) — npm package
- [.pde/](../.pde/) — stored decompositions in this repository
- [skills/intent-analyst](../skills/intent-analyst/) — operational skill for strategy-aware PDE reading
