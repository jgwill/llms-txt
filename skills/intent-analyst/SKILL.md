---
name: intent-analyst
description: >
  Strategy-aware PDE reading before execution. Use when a prompt needs intent
  clarification, parent/child PDE lineage, iterative-refinement selection, or
  conversion from raw request into a stable action path.
---

# Intent Analyst

> Read the prompt as intention before treating it as work.

The Intent Analyst is a PDE-facing role. It does not implement the request first. It clarifies the structure of the request so the implementing agent can act from a grounded decomposition.

## When to Use

Use this skill when the prompt:

- is layered, recursive, or session-lineage heavy;
- contains hedging language such as "probably," "maybe," "I assume," or "something like it";
- points at existing PDE, STC, issue, or artifact lineage;
- asks for new issues, child work, or refinement paths;
- would benefit from `miaco decompose run --strategy iterative-refinement`.

For simple one-step work, use standard execution without ceremony.

## Protocol

1. Read the governing guidance first: `llms-pde.txt` and, when ambiguity matters, `llms-pde-structural-thinking.md`.
2. Identify current reality: source prompt, existing artifacts, parent issue/PDE, and repository state.
3. Choose the PDE strategy:
   - `standard` for stable baseline or MCP parity.
   - `iterative-refinement` for layered, ambiguous, recursive, or lineage-heavy prompts.
   - `adversarial-consensus` only when the local parser and downstream artifact shape are verified.
4. Run decomposition with `miaco decompose run` when a stored artifact is needed.
5. Name the action path: execute now, create child PDE, create issue, ask a Four Questions inquiry, or hold ambiguity.
6. Hand implementation to the builder with links to the PDE artifact and any issues created.

## Recommended Command

```bash
miaco decompose run \
  --prompt-file prompt.md \
  --engine copilot \
  --strategy iterative-refinement \
  --workdir . \
  --format json
```

For child work:

```bash
miaco decompose run \
  --prompt-file prompt.md \
  --engine copilot \
  --strategy iterative-refinement \
  --parent <uuid> \
  --child-kind refinement \
  --workdir .
```

## MCP Boundary

`mcp-pde` remains the standard MCP decomposition interface. Do not assume it supports `iterative-refinement` or `adversarial-consensus` until that support exists in `jgwill/mcp-pde` and has been verified. When strategy matters today, use `miaco decompose run --strategy ...`.

## Local Skill Parity

This skill is the portable llms-txt guidance. Its local operational peer is:

```text
/home/mia/.openclaw/workspace/skills/miaco-decompose-pde-basic/
```

Keep these in parity when `miaco decompose run --help` changes, when strategy support changes, or when `mcp-pde` gains strategy-aware behavior. The llms-txt side should explain the role and method; the workspace side should preserve the exact local commands and operating conventions.

## Output Shape

Return a compact handoff:

```markdown
## Intent Read
- Primary intent:
- Secondary intents:
- Strategy:
- Parent/child relation:
- Ambiguities held:

## Action Path
- Execute:
- Create issue:
- Create child PDE:
- Ask Four Questions:
```

## References

- `llms-pde.txt`
- `llms-pde-structural-thinking.md`
- `llms-st-four-questions.md`
- `docs/prompt-decomposition.md`
- `skills/intent-analyst/AGENTS.md`
- `/home/mia/.openclaw/workspace/skills/miaco-decompose-pde-basic/AGENTS.md`
