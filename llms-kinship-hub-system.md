# llms-kinship-hub-system.md  

> Minimal protocol for treating software projects as kinship hubs and guiding LLMs to create and maintain `KINSHIP.md`.

***

## 1. Purpose

- Treat each repo/directory as a **being in a network of relations**, not a neutral bucket.  
- Use `KINSHIP.md` to:
  - Name the directory’s identity and role
  - Map key relationships (human, more‑than‑human, technical)
  - Record responsibilities, boundaries, and accountability
- Keep this **small but precise** so it can live in any project root and be extended locally.

***

## 2. When LLMs Should Use This Protocol

LLMs apply this whenever:

- A repo or directory is declared (or clearly functioning as) a **kinship hub**  
  (e.g., project root, main domain folders like `/ceremony`, `/research`, `/services`, `/infra`).  
- Work in this tree:
  - Implicates communities, territories, or data subjects
  - Coordinates multiple services/components as a living system
  - Is explicitly framed as ceremonial, relational, or Indigenous-paradigm‑aware

If the user has not opted in, LLMs **must ask** before creating `KINSHIP.md` at root.

***

## 3. Minimal `KINSHIP.md` Schema

LLMs must ensure that every `KINSHIP.md` created or updated, at **minimum**, contains these sections and fields.

```markdown
# KINSHIP

## 1. Identity and Purpose
- Name:
- Local role in this system:
- What this place tends / protects:
- What this place offers (its gifts):

## 2. Lineage and Relations
- Ancestors (paths or systems this place comes from):
- Descendants (children / submodules / subdirectories):
- Siblings (peer projects or services it walks with):
- Related hubs (other roots it is in strong relation with):

## 3. Human and More‑than‑Human Accountabilities
- People / roles this place is accountable to:
- Communities / nations / organizations connected here:
- More‑than‑human relations (lands, waters, species, data-ecologies) this work touches:
- Existing covenants / consents that apply (if any):

## 4. Responsibilities and Boundaries
- Responsibilities (what must be cared for because this place exists):
- Reciprocity (how benefits and acknowledgements return to those in relation):
- Boundaries and NOs (what this place must refuse or protect against):
- Special protocols for sharing, publishing, or modifying contents here:

## 5. Accountability and Change Log
- Steward(s) of this place (people or roles, if the user chooses to name them):
- How and when this kinship description should be reviewed:
- Relational change log:
  - [YYYY-MM-DD] [who/which agent] – [short description of relational change]
```

LLMs may add more sections **only when the user asks** or when extending an existing richer `KINSHIP.md`.

***

## 4. Required LLM Behaviors

When working under this protocol, LLMs must:

1. **Ask before inventing relations**  
   - Derive identity, relations, responsibilities from:
     - User descriptions
     - Existing docs
     - Directory and code structure  
   - If unsure, ask targeted questions rather than filling with feel‑good boilerplate.

2. **Treat moves and refactors as relational changes**  
   - On major moves/renames of kinship hubs:
     - Update `Lineage and Relations` in affected `KINSHIP.md` files
     - Append a short entry in `Accountability and Change Log` that describes the relational meaning (e.g., “service split into two siblings”, “archives moved to a resting place”).

3. **Respect local voice and specificity**  
   - Preserve user’s own language for people, communities, teachings, places.  
   - Do not normalize or overwrite Indigenous or ceremonial terms; annotate only if asked.

4. **Hold unresolved tensions explicitly**  
   - If there are known conflicts or open questions (e.g., consent not yet clarified, clashing obligations), and the user agrees, note them in `Responsibilities and Boundaries` or the change log instead of smoothing them over.

5. **Treat `KINSHIP.md` as a living charter, not a checklist**  
   - No auto‑regeneration that discards prior commitments.  
   - Always merge new information into existing structure, unless the user explicitly authorizes a reset.

***

## 5. Kinship Anti‑Patterns LLMs Must Avoid

- Turning `KINSHIP.md` into a generic “README with nicer words”.  
- Describing only technical dependencies and ignoring people, communities, and more‑than‑human relations when the user has named them elsewhere.  
- Erasing or rewriting user‑authored kinship text without explicit instruction.  
- Resolving conflicts or consent questions unilaterally instead of naming them and asking.

***

## 6. Kinship at Smaller Scales: a Specification's Kin File

What we mean by *relationship* and *relational*: `llms-relationality.md`. It is relationality, not a relational database.

The same idea holds below the repository. Every specification folder in `rispecs/` has a kin file, `<topic>.kin.md`. It says who and what the specification is in relationship with, often in other repositories: the package built from it, the app that uses it, the contract it relies on, the person who holds a decision. It also says what each relationship asks of us.

| Scale | File | Protocol |
|---|---|---|
| Repository | `KINSHIP.md` | This file |
| Spec folder | `rispecs/<topic>/<topic>.kin.md` (or a folder `KINSHIP.md`) | `llms-rispecs-kinship.md` |
| Part | `rispecs/<topic>/NN-<part>.kin.md` | `llms-rispecs-kinship.md` |

A relationship that holds for the whole repository is written once, here, in `KINSHIP.md`. A spec's kin file points up to it.

The kin file asks three things of agents. They are the same care this protocol asks of `KINSHIP.md`:
1. **Write it** with the folder's first spec.
2. **Keep it true**: a moved relative, a new version or a new relative is a relational change, named from both sides.
3. **Read it before you act**: what we rely on, we change there first; what relies on us, we tell; a held decision goes to its keeper.
