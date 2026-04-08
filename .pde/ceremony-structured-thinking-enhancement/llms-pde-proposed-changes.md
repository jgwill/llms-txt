# Proposed Changes to llms-pde.txt (post-prototype)

## New Sections to Add

### 1. "Four Questions Integration" (after "PDE as Relational Practice")
- PDE ambiguities → Four Questions pipeline (information, clarification, implication, discrepancy)
- Each ambiguity is classified by question type
- Questions are surfaced for HITL before entering SOUTH phase
- Source: `llms-st-four-questions.md`

### 2. "Implementation Architectures" (after "Storage")
- Lean lineage (miaco): single-file, multi-engine CLI dispatch, flat schema
- Deep lineage (miadi): 5-layer pipeline, MCP server, webhook, Redis
- Both share `.pde/<timestamp>--<uuid>/` storage convention

### 3. "MCP Tools" (after "Implementation Architectures")
- `pde_decompose` — build prompt for LLM decomposition
- `pde_parse_response` — parse result, store, optionally webhook
- `pde_get` / `pde_list` / `pde_export_markdown`

### 4. "Engine Configuration" (after "MCP Tools")
- Multi-engine: gemini, claude, copilot
- Fallback behavior (primary fails → copilot)
- Cost guard (MIAC-18: no opus/sonnet on copilot engine)

## Additional Files Likely Affected

| File | Change |
|------|--------|
| `llms.txt` | Expand PDE entry description + Related links |
| `llms-ceremony-pipeline.md` | May reference Four Questions as Phase 3.5 |
| `llms-polyphonic-design-review.md` | Four Questions could feed into polyphonic voices |
| `llms-inquiry-routing.md` | New routing path: PDE → Four Questions → inquiry |
| `docs/prompt-decomposition.md` | Extended docs — update with architectures |
