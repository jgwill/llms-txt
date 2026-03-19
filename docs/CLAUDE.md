# docs/ — Agent Guidance

## The `current.md` Pattern

`current.md` is the **working edge** of this guidance portfolio. It holds guidance that is still being forged.

### Rules for agents

1. **Append, don't overwrite.** Add new sections to `current.md` under the appropriate heading. If no heading fits, create one.
2. **Follow the evaluated elevation pattern** — every entry needs: Context, Failure mode, Correction, Why it matters.
3. **Graduate stable sections.** When a section in `current.md` is self-contained and stable, move it to its own `docs/*.md` file, add it to `index.md`, and log the graduation in `current.md`.
4. **Always update `index.md`** when adding a new graduated file.
5. **Reference issue #13** in commits that touch `current.md` or graduate sections from it.
6. **Do not create new `docs/` files for in-progress guidance.** That's what `current.md` is for.

### File roles

| File | Role |
|------|------|
| `index.md` | Stable navigation — links to graduated guidance + `current.md` |
| `current.md` | Living draft — active edge where new guidance lands |
| `platforms/*.md` | Platform-specific graduated guidance |
| `CLAUDE.md` | This file — agent instructions for the docs folder |

### Structural tension

**Current reality → Desired state:** Raw observations → Evaluated, portable guidance files.

The path: observe → capture in `current.md` → refine → graduate → link from `index.md`.
