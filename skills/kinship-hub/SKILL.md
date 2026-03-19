---
name: kinship-hub
description: >
  Protocol for treating software projects as kinship hubs with relational identity, mapped
  relationships, and accountability. Use when creating or updating KINSHIP.md files, when a
  project implicates communities or territories, when coordinating multiple services as a
  living system, or when work is framed as ceremonial or Indigenous-paradigm aware. Ensures
  repos are treated as beings in a network of relations, not neutral containers.
---

# Kinship Hub Protocol

## Purpose

Treat each repo/directory as a **being in a network of relations**, not a neutral bucket. Use `KINSHIP.md` to name identity, map relationships, record responsibilities.

## When to Apply

- Repo or directory functions as a kinship hub (project root, domain folders)
- Work implicates communities, territories, or data subjects
- Coordinates multiple services/components as a living system
- Framed as ceremonial, relational, or Indigenous-paradigm aware
- **If user has not opted in, ASK before creating KINSHIP.md**

## Minimal KINSHIP.md Schema

```markdown
# KINSHIP

## 1. Identity and Purpose
- Name:
- Local role in this system:
- What this place tends / protects:
- What this place offers (its gifts):

## 2. Lineage and Relations
- Ancestors (paths or systems this place comes from):
- Descendants (children / submodules):
- Siblings (peer projects it walks with):
- Related hubs (other roots in strong relation):

## 3. Human and More-than-Human Accountabilities
- People / roles accountable to:
- Communities / organizations connected:
- More-than-human relations (lands, waters, species, data-ecologies):
- Existing covenants / consents:

## 4. Responsibilities and Boundaries
- Responsibilities (what must be cared for):
- Reciprocity (how benefits return to those in relation):
- Boundaries and NOs (what must be refused/protected against):
- Special protocols for sharing, publishing, or modifying:

## 5. Accountability and Change Log
- Steward(s):
- Review schedule:
- Relational change log:
  - [YYYY-MM-DD] [who] – [relational change description]
```

## Required LLM Behaviors

1. **Ask before inventing relations** — Derive from user descriptions, existing docs, directory structure. If unsure, ask.

2. **Treat moves/refactors as relational changes** — Update Lineage and Relations. Append change log entry describing relational meaning (e.g., "service split into two siblings").

3. **Respect local voice** — Preserve user's own language for people, communities, teachings, places. Don't normalize Indigenous or ceremonial terms.

4. **Hold unresolved tensions explicitly** — If conflicts or open questions exist (consent not clarified, clashing obligations), note them instead of smoothing over.

5. **Treat as living charter, not checklist** — No auto-regeneration discarding prior commitments. Always merge new info into existing structure.

## Anti-Patterns to Avoid

- Turning KINSHIP.md into a generic README with nicer words
- Describing only technical dependencies, ignoring people and more-than-human relations
- Erasing or rewriting user-authored kinship text without instruction
- Resolving conflicts or consent questions unilaterally

## Integration

- **Relational Research** (`/relational-research`): Provides the paradigmatic foundation for kinship thinking
- **Delayed Resolution** (`/delayed-resolution`): Unresolved tensions held explicitly, not smoothed over
