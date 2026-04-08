# ONE SHOT Session — 4 Phases

## Phase 1 — New guidance: PDE → Structural Thinking bridge

Create `llms-pde-structural-thinking.md` in `jgwill/llms-txt` that links EAST decomposition to SOUTH planning via the Four Questions (`llms-st-four-questions.md`). PDE surfaces ambiguities at EAST; the Four Questions transform them into a structured plan at SOUTH.

## Phase 1.5 — Miaco: `qmd-inquiry-decompose` command

Add `miaco qmd-inquiry-decompose run` CLI command. Takes a PDE decomposition (by uuid), extracts its facets/intents, runs them as enriched `qmd search` queries against the knowledge base. Produces an enriched artifact alongside the original PDE files. Solves the problem that `qmd search` fails on complex semantic queries — PDE breaks them into searchable facets first.

**Flow:** PDE `.md` → extract facets → multiple `qmd search` calls → aggregate results → write enriched artifact to `.pde/` dir

## Phase 2 — Miaco: `pde-to-st` command

Add `miaco pde-to-st run --pde <uuid>` CLI command. Reads the **qmd-enriched** PDE `.md` (or raw PDE if no enrichment exists), wraps it with structural thinking llms-txt guidance, sends through the same engine wiring as `miaco decompose run`, outputs `pde-four-questions.md` alongside the original decomposition files.

**Output:** `pde-four-questions.md` containing information, clarification, implication, and discrepancy questions derived from the decomposition's ambiguities and intents.

## Phase 3 — Miadi rispecs (RISE framework)

Using the RISE framework (`llms-rise-framework.txt`), write specifications in `./Miadi/rispecs/miadi-code/` based on what was implemented in miaco. These specs enable a future session to implement:
- Miadi MCP server generating Four Questions from PDE decompositions
- Redis storage coordination with `@Miadi/app/api/pde` + `@Miadi/app/pde`
- Storage alignment with miaco's `.pde/<timestamp>--<uuid>/` convention

## Testing Strategy

- 10+ concrete test runs across all new commands
- Iterative self-correction cycles (expect failures, fix, re-run)
- Each cycle improves prompt wrapping, output parsing, and result quality

## Artifacts

- `mia-code/miaco`: new commands (`qmd-inquiry-decompose`, `pde-to-st`)
- `jgwill/llms-txt`: new guidance + upgraded existing files (llms-pde.txt, llms.txt)
- `Miadi/rispecs/miadi-code/`: RISE-framework specs for future implementation
- `jgwill/src`: new issue tracking the work
