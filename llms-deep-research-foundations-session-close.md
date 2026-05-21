# Deep Research Foundations — Session Close Protocol

When a repo has a derived `deep-research-foundations` skill and a `./foundations/` tree
(produced by that skill's diamond-pattern research), session close carries an obligation:

## Trigger

Both conditions must be true:
- A `./foundations/<field>/` tree exists (with `field.md`, `source-ledger.yaml`)
- The session implemented something in this repo or a related branch

## Steps

### 1. Compare against foundation fields

Read each `foundations/<field>/field.md`. For every design decision made during the
session, determine which field's `design_decisions_supported` list it maps to.

If a decision is not yet listed → candidate for provenance update.

### 2. Update source-ledger if warranted

In `foundations/<field>/source-ledger.yaml`, add under `implemented_decisions:`:

```yaml
implemented_decisions:
  - session: <date--uuid-slug>
    decision: "<what was built>"
    maps_to: "<field design_decisions_supported entry>"
    commit: "<hash or PR ref>"
    verified: false
```

Only add entries you can trace to actual work. Do not fabricate.

### 3. Commit — scoped and issue-referenced

Commit message form:
```
foundations(<field-slug>): record implemented decision — <short description>

Refs: <owner/repo#issue>
```

If no issue exists, explain the blocker rather than committing without a reference.

### 4. Blocker path

If the session cannot be traced to any foundation field, state:
> "No foundation field match — session close provenance skipped."

Do not invent a field. Do not update the ledger speculatively.

## What this is NOT

This is not a research step. The `deep-research-foundations` skill produces the
`./foundations/` tree in a prior session. Session close only *reads* and *appends* —
it does not re-run research.
