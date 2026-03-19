---
name: forge-issue
description: >
  Forge GitHub issues using structural tension as the authoring frame.
  Five questions map directly to five sections: Context (current reality),
  Desired State (creation target), Action Steps (secondary choices advancing
  toward it), Structural Tension (explicit Fritz framing), Related (kinship).
  Use when agents or humans need to author issues that carry creative orientation
  rather than bug-report reactive framing. Depends on structural-tension-charting
  for the tension model and creative-orientation for the generative mindset.
---

# Forge Issue

> Author issues as structural tension charts — not bug reports.

## The Five Questions

Every issue begins with five questions. Each maps to a section:

| Question | Section | Function |
|----------|---------|----------|
| *What exists now?* | **Context** | Ground the reader in current reality |
| *What do I want to exist?* | **Desired State** | Name the creation, not the problem |
| *What moves me from one to the other?* | **Action Steps** | Strategic secondary choices |
| *What is the tension?* | **Structural Tension** | Make the causal force visible |
| *What is this related to?* | **Related** | Weave kinship to other work |

## Issue Template

```markdown
## Context

[Current reality — what exists now. Factual, specific, no motivation language.]

## Desired State

[The creation you want to bring into being. Describe the result, not the process.]

## Action Steps

- [ ] [Strategic secondary choice 1]
- [ ] [Strategic secondary choice 2]
- [ ] [...]

## Structural Tension

**Current reality:** [one-line restatement]
**Desired state:** [one-line restatement]

## Related

- [issue/ceremony/repo references — kinship connections]
```

## Authoring Principles

### 1. Create, don't fix

Frame the issue as something being brought into existence, not a problem being eliminated.

| ❌ Reactive | ✅ Generative |
|---|---|
| "Fix broken auth flow" | "Auth flow that honors session lifecycle" |
| "Missing docs for X" | "Guidance for X that agents can act on" |
| "Bug: list renders wrong" | "List rendering that preserves structural intent" |

### 2. Context is current reality

Follow structural tension charting rules for current reality:
- Objective and factual
- No "ready to begin" or motivational framing
- Specific enough that another agent can assess whether it changed

### 3. Desired State is the primary choice

Follow desired outcome quality (Fritz):
- Can you picture it?
- Describe results, not process
- Avoid comparative terms
- Be specific

### 4. Action Steps are strategic secondary choices

Not a checklist. Each step should pass the test:
> "If we took these steps, would we achieve this result?"

Each action step can telescope into its own structural tension chart (its own issue).

### 5. Structural Tension makes the force explicit

The two-line summary at the bottom makes the disequilibrium visible. This is the engine — without it, the issue is just a task list.

### 6. Related weaves kinship

Issues don't exist alone. Name the ceremonies, repos, other issues, and upstream/downstream dependencies. This is relational accountability applied to issue tracking.

## When to Use

- Authoring any GitHub issue in the llms-txt ecosystem
- Creating issues in kinship repos that follow these ways of knowing
- When an agent needs to create an issue as part of its workflow
- When converting observed work into trackable advancement

## Integration

- **[Structural Tension Charting](../structural-tension-charting/SKILL.md)** — the tension model this skill applies to issue authoring
- **[Creative Orientation](../creative-orientation/SKILL.md)** — generative mindset that prevents reactive framing
- **[Kinship Hub](../kinship-hub/SKILL.md)** — the Related section implements kinship mapping
- **[docs/current.md](../../../docs/current.md)** — living document where in-progress guidance lands before graduating
