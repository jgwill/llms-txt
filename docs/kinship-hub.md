# Kinship Hub System

> Treating software projects as beings in networks of relations — where every directory carries identity, lineage, responsibilities, and accountability to human and more-than-human kin.

---

## Core Principle

Under the Kinship Hub protocol, each directory is a **being-with-a-role**:

- It has **identity** — who/what it is in this system
- It has **lineage** — ancestors, descendants, siblings
- It has **responsibilities and gifts** — what it tends, protects, and offers
- It has **relationships** — to other directories, people, communities, lands, and more-than-human kin
- It participates in **cycles** — review, ceremony, archival, sunset

This is not metaphor. It is a structural reorientation grounded in Indigenous kinship law, Shawn Wilson's *research as ceremony*, and the Four/Six Rs of Indigenous research.

---

## The `KINSHIP.md` File

Every kinship hub carries a `KINSHIP.md` — a living ceremonial charter that states:

| Section | Purpose |
|---------|---------|
| Identity and Purpose | What this place tends and offers |
| Lineage and Place | Ancestors, descendants, siblings, related hubs |
| Human and Collective Relations | People, communities, consent agreements |
| More-than-Human Relations | Lands, waters, beings, cosmological connections |
| Responsibilities and the Rs | Concrete practices for each of the Six Rs |
| Protocols and Boundaries | Access, sovereignty, safety, consent |
| Accountability and Review | Stewardship, feedback loops, review rhythm |
| Tensions and Contradictions | Unresolved questions held openly |
| Ceremony, Story, and Memory | Narrative beats, relational events |
| Change Log (Relational) | Meaning of changes, not just mechanics |

---

## At the Scale of a Specification

Below the repository, each specification in `rispecs/` carries its own kin: `<topic>.kin.md`. It names the specification's relations across folders, layers of the architecture and repositories:
- the package that realizes it, and the app that stands on it;
- the contract it stands on, and the sibling it must not restate;
- the person who holds a decision it touches.

For each relation it says what it asks of the agent: begin upstream, tell downstream, bring a held decision to its holder.

Agents keep it true, and read it before acting. When a relation falls out of step, harmony is restored where the relation lives, not only in the local text (Wilson, *Research Is Ceremony*, p. 78: re-translating the text "may have helped to correct the misinformation, but it would not have restored the relationship").

Protocol: [llms-rispecs-kinship.md](../llms-rispecs-kinship.md).

---

## Key Behaviors

### For AI Companions

When working within a Kinship Hub:

1. **Ask before inventing relations** — derive from user descriptions, existing docs, and code structure
2. **Treat refactors as relational changes** — update lineage, append to change log with relational meaning
3. **Respect local voice** — preserve user's own language for communities, teachings, places
4. **Hold unresolved tensions** — record in Tensions section rather than smoothing over
5. **Never auto-regenerate** — `KINSHIP.md` is a living charter, not a checklist

### Anti-Patterns to Avoid

- Decorative Indigeneity — kinship language without structural change
- Pan-Indigenous flattening — treating all worldviews as interchangeable
- Premature resolution — explaining away contradictions
- Consent elision — assuming permission without checking
- Task-log collapse — reducing ceremonial charter to a to-do list

---

## Integration

| Framework | Connection |
|-----------|-----------|
| [Creative Orientation](creative-orientation.md) | Defines desired relational outcomes vs. current relational reality |
| [Structural Tension](structural-tension.md) | Diagnoses advancing vs. oscillating patterns in care and reciprocity |
| [Narrative Craft](narrative-craft.md) | Beats capture relational events; referenced from KINSHIP.md |
| [Performance Truth](performance-truth.md) | MMOT for relational discrepancies — expectation vs. delivery in care |
| [RISE Framework](rise-framework.md) | Extracts kinship-relevant specs when reverse-engineering systems; each spec's `.kin.md` names its relations |

---

## Key Sources

- [llms-kinship-hub-system.md](../llms-kinship-hub-system.md) — minimal protocol
- [llms-kinship-hub-system-full.md](../llms-kinship-hub-system-full.md) — full protocol with Indigenous foundations
- [llms-rispecs-kinship.md](../llms-rispecs-kinship.md) — a specification's `.kin.md`: its relations, what each asks, the two duties
- [KINSHIP.md](../KINSHIP.md) — this repo's own relational charter
