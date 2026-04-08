# Ceremony: Structural Thinking × PDE Integration Prototype

**Goal:** Raise context7 score by implementing the Four Questions (`llms-st-four-questions.md`) as a live pipeline stage within PDE — not just enriching docs, but making structural thinking *executable* through the decomposition engine.

## Core Innovation

PDE already surfaces ambiguities. The prototype turns those ambiguities into **structural thinking questions** (information, clarification, implication, discrepancy) — making the Four Questions a first-class output of decomposition.

## Files to Touch (in order)

| # | File / Path | Action | Why |
|---|-------------|--------|-----|
| 1 | `Miadi/miadi-code/src/pde/` | Prototype | Add Four Questions generation from PDE ambiguities — the core new capability |
| 2 | `Miadi/miadi-code/src/mcp-pde/` | Extend | MCP tools serve the questions + store in Redis |
| 3 | `@Miadi/app/api/pde` + `@Miadi/app/pde` | Coordinate | Web UI to view stored decompositions + generated questions from Redis |
| 4 | `llms-pde.txt` | Enrich | Document the Four Questions integration, implementation architectures, practical examples — *after* prototype works |
| 5 | `llms.txt` | Update | Expand PDE entry + add Related links |
| 6 | Other `llms-*.txt` files | TBD | Upgraded as consequence of prototype — scope surfaces during implementation |

**Note:** `llms-structural-thinking.txt` serves — it doesn't need back-references to consumers. No changes there.

* But we could have another guidance that establish the relationship of that step  because if PDE is at the EAST, viewing these question is pretty close or even part of the SOUTH where we shall have a full plan from that...

## Two Lineages

- **Miaco** (lean): `decompose.ts`, multi-engine CLI, flat schema, parent-child nesting — already works, published as `miaco decompose run -p <prompt>`
* If possible, I think that could be, add `miaco pde-to-st run --pde <uuid> (feeds the  the .md from the pde dir)` then we would have a pde-four-questions.md (or something aside the PDE file, this could be simple and we would use the same wirering that the `miaco decompose run -p <prompt>` has, we would just need to add probably into miaco folder enought guidance or at build time we wrap a more larger prompt or something that makes the model that reads the PDE have the necessary LLMS-txt guidance they nee)
- **Miadi** (deep, prototype focus): 5-layer pipeline + MCP server — where Four Questions integration happens

**Storage:** Miadi may not use the same `.pde/` folder convention as miaco — alignment needed as part of the prototype.

## Before Switching Model Provider (you say before switching model, that does not make sense to me... I want you todo as much as possible when we switch)

- [x] PDE decompose round-trip works on all 3 engines (already published via miaco)
- [ ] Storage format consistent between miaco and miadi (.pde/ folder convention)
- [ ] Miadi server-side (`app/api/pde`, `app/pde`) coordinated with `miadi-code/mcp-pde` + Redis
- [ ] Four Questions generation from PDE ambiguities prototyped and tested in Miadi
- [ ] Multiple `llms-*.txt` files upgraded to reflect new capabilities

## Score Prediction

Executable structural thinking through PDE (not just documentation) → subscore well beyond 25/40. The prototype makes the *practice* visible, not just the *concept*.
