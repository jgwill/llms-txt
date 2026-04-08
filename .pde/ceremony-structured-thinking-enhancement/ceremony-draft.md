# Ceremony: Enhance PDE Score in llms-txt

**Goal:** Raise context7 structured-thinking subscore (currently ~8/40) by enriching `llms-pde.txt` with real implementation patterns from miaco and miadi.

## Files to Touch (in order)

| # | File | Action | Why |
|---|------|--------|-----|
| 1 | `llms-pde.txt` | Enrich | Add implementation architectures (lean vs 5-layer), MCP tools, engine config, practical example. Currently a concept stub — needs "how to use" content. |
| 2 | `llms.txt` | Update entry | Expand PDE description + add Related links (ceremony-pipeline, polyphonic-review, structural-thinking) |
| 3 | `llms-structural-thinking.txt` | Add reference | PDE is missing from the Applied Practice section — it should be there |

## Two Lineages to Document

- **Miaco** (lean): single `decompose.ts`, shells to CLI engines, flat schema, parent-child nesting, auto-fallback to copilot
- **Miadi** (deep): 5-layer pipeline (intent→deps→wheel→workflow→execution), dedicated MCP server with 5 tools, webhook integration, richer types

**Approach:** Document both as valid lineages in llms-pde.txt — don't pick one.

## Before Switching Model Provider

- [ ] PDE decompose round-trip works on all 3 engines (gemini/claude/copilot)
- [ ] Engine fallback tested (primary fails → copilot catches)
- [ ] MIAC-18 guard active (no opus/sonnet on copilot engine)
- [ ] Storage format consistent between miaco and miadi (.pde/ folder convention)

## Score Prediction

Enriched `llms-pde.txt` with implementation guidance + better cross-linking → structured-thinking subscore ~25/40 (from ~8/40).
