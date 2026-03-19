---
name: structural-issue-authoring
description: >
  Portable skill for authoring GitHub issues as structural tension charts.
  Five questions → five sections. Works in any repository, any codebase.
  Agents install this skill to shift issue authoring from reactive bug-report
  framing to generative creative orientation. No repo-specific dependencies.
  Grounded in Robert Fritz's structural dynamics and creative orientation.
---

# Structural Issue Authoring

> Forge issues as structural tension charts — in any repo, any codebase.

This is a **portable skill**. It has no dependency on any specific repository structure. Any agent that reads this file can author issues using structural tension.

---

## The Five Questions

Before writing an issue, answer five questions. Each produces one section:

| # | Question | Section | What it captures |
|---|----------|---------|-----------------|
| 1 | *What exists now?* | **Context** | Current reality — factual, specific |
| 2 | *What do I want to exist?* | **Desired State** | The creation, not the problem |
| 3 | *What moves me from one to the other?* | **Action Steps** | Strategic secondary choices |
| 4 | *What is the tension?* | **Structural Tension** | The causal force made visible |
| 5 | *What is this related to?* | **Related** | Kinship — nothing exists alone |

---

## Template

```markdown
## Context

[Current reality — what exists now. Factual, specific, no motivation language.
No "ready to begin." No "excited to start." Just what is.]

## Desired State

[The creation you want to bring into being.
Describe the result, not the process.
"Auth flow that honors session lifecycle" not "Fix broken auth."]

## Action Steps

- [ ] [Strategic secondary choice 1]
- [ ] [Strategic secondary choice 2]
- [ ] [...]

## Structural Tension

**Current reality:** [one-line restatement]
**Desired state:** [one-line restatement]

## Related

- [issues, repos, ceremonies, upstream/downstream — kinship connections]
```

---

## Authoring Principles

### 1. Create, don't fix

The issue describes something being **brought into existence**, not a problem being eliminated. This is the foundational shift.

| ❌ Reactive (problem-solving) | ✅ Generative (creative orientation) |
|---|---|
| "Fix broken auth flow" | "Auth flow that honors session lifecycle" |
| "Missing docs for X" | "Guidance for X that agents can act on" |
| "Bug: list renders wrong" | "List rendering that preserves structural intent" |
| "Refactor messy utils" | "Utils organized by domain responsibility" |

### 2. Context = Current Reality

- **Objective and factual** — what exists right now
- **No motivation language** — not "eager to," "ready to," "need to"
- **Specific enough** that someone else can verify whether it changed
- Reference commits, files, or observable state when possible

### 3. Desired State = Primary Choice

Follow Robert Fritz's desired outcome quality:

1. **Can you picture it?** — Form a mental image of the result
2. **Quantify where possible** — "5 platform guides" not "more documentation"
3. **Avoid comparative terms** — "adequate test coverage" not "better tests"
4. **Describe results, not process** — "API with typed endpoints" not "type the API"
5. **Be specific** — "Auth middleware with JWT validation and refresh" not "improved auth"

### 4. Action Steps = Strategic Secondary Choices

Not a to-do list. Each step is chosen **because** it advances toward the desired state.

**The test:** *"If we took these steps, would we achieve this result?"*
If no → add more strategic steps or reconsider the desired state.

Each action step can **telescope** — become the desired state of its own issue. This is how large work decomposes naturally.

### 5. Structural Tension = The Engine

The two-line summary makes **disequilibrium visible**. Without it, the issue is a task list with no causal force. With it, readers understand *why* the work pulls forward.

The tension between current reality and desired state is not a gap to bridge — it is a **force that resolves through creation**.

### 6. Related = Kinship

Issues don't exist alone. Name:
- **Upstream:** what feeds into this work
- **Downstream:** what this work enables
- **Siblings:** parallel efforts in the same domain
- **Ceremonies/contexts:** the broader initiative this belongs to

---

## When to Use

- Authoring any GitHub issue where the work is generative (building, designing, establishing)
- Converting observed patterns or session learnings into trackable work
- When an agent creates issues as part of its workflow
- Decomposing large desired outcomes into telescoped sub-issues
- Any context where reactive "fix/bug/broken" framing would obscure the creative intent

## When NOT to Use

- Genuine incident reports where the reactive frame is accurate ("service down, restore it")
- Security advisories with prescribed remediation
- Simple chores with no creative tension ("bump dependency to v2.3")

Even in these cases, the five questions can clarify thinking — but forcing the template would be ceremony without substance.

---

## Source

This skill is grounded in:
- **Robert Fritz** — structural tension, creative orientation, structural thinking
- **Relational accountability** — the Related section ensures nothing is authored in isolation
- Lived practice within the [llms-txt](https://github.com/jgwill/llms-txt) ecosystem

---

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│         STRUCTURAL ISSUE AUTHORING      │
│                                         │
│  1. What exists now?      → Context     │
│  2. What do I want?       → Desired     │
│  3. What moves me there?  → Steps       │
│  4. What's the tension?   → Tension     │
│  5. What's related?       → Related     │
│                                         │
│  Create, don't fix.                     │
│  Tension resolves through creation.     │
└─────────────────────────────────────────┘
```
