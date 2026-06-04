# Medicine Wheel MCP Tools — Complete Reference

> 64 tools for relational research, ceremonial technology development, and Indigenous-aligned software engineering.
> Package: `@medicine-wheel/mcp` (v4.3.0) · Transport: stdio · Binary: `medicine-wheel-mcp`
> CLI: `bin/mw` · API: `http://localhost:3940/api/`

---

## Overview

The Medicine Wheel MCP server provides structured tools for creating and managing relational research within an Indigenous epistemological framework. It is grounded in Shawn Wilson's *Research Is Ceremony* (2008), Elder Albert Marshall's Two-Eyed Seeing (Etuaptmumk), and OCAP® (Ownership, Control, Access, Possession) data sovereignty principles.

Full documentation: `https://docs.medicine-wheel.jgwill.com/`

All data persists to `.mw/store/` as JSONL files (one per entity type). The same store is shared between the MCP server and the Next.js Web UI.

---

## Quick Start

### MCP Configuration

Published to npm — run via `npx` (recommended):

```json
{
  "mcpServers": {
    "medicine-wheel": {
      "command": "npx",
      "args": ["-y", "@medicine-wheel/mcp"]
    }
  }
}
```

Or from a local build:

```json
{
  "mcpServers": {
    "medicine-wheel": {
      "command": "node",
      "args": ["/workspace/repos/jgwill/medicine-wheel/mcp/dist/index.js"]
    }
  }
}
```

The server advertises itself over MCP as `@medicine-wheel/mcp` (name/version derived from `package.json`).

### CLI

```bash
./bin/mw status                     # System health check
./bin/mw ceremony open "Begin research on relational ontology"
./bin/mw cycle create "How does Wilson's relational ontology translate to software architecture?"
./bin/mw directions                  # All four directions with medicines and teachings
./bin/mw node list --type human      # List human relational nodes
./bin/mw tools                       # List all 64 tools by category
```

### REST API

```
GET  /api/nodes?type=human&direction=east
POST /api/nodes                      → { name, type, description, direction?, metadata? }
GET  /api/ceremonies?direction=east&type=talking_circle
POST /api/ceremonies                 → { type, direction, participants, medicines_used, intentions }
GET  /api/edges
POST /api/edges                      → { from_node_id, to_node_id, relationship_type }
GET  /api/narrative/beats
POST /api/narrative/beats            → { direction, title, description, learnings }
GET  /api/narrative/cycles
POST /api/narrative/cycles           → { research_question, current_direction }
GET  /api/directions                 → Four directions with Ojibwe names, medicines, teachings
GET  /api/resources                  → Wilson paradigm, OCAP®, teaching resources
```

---

## Ceremony Lifecycle (4 tools)

The most important pattern. Every session should be wrapped in ceremony.

### mw_ceremony_open

Open a ceremony. Creates an opening record with intention and direction.

```json
{
  "intention": "Review shared-persistence implementation",
  "direction": "east",
  "participants": ["Guillaume", "Mia"],
  "medicines": ["Tobacco"]
}
```

Returns: `{ ceremony_id, status: "opened", current_direction, teaching }`

### mw_ceremony_close

Close a ceremony. Logs closing record linked to the opening.

```json
{
  "ceremony_id": "ceremony:1775338506041:h8pwj",
  "summary": "Reviewed PR #27, found 9 enhancement opportunities",
  "learnings": ["Stale lock recovery needed", "CRUD coverage at 70%"]
}
```

### mw_get_direction

Get directional metadata. Sacred medicine, season, teaching, life stage, color.

```json
{ "direction": "east" }
// or
{ "ceremony_id": "ceremony:..." }
```

Returns: `{ direction, medicine, season, teaching, life_stage, color }`

| Direction | Ojibwe | Season | Medicine | Life Stage |
|-----------|--------|--------|----------|------------|
| East | Waabinong | Spring | Tobacco (Asemaa) | Birth–7 (Good Life) |
| South | Zhaawanong | Summer | Cedar (Giizhik) | 7–14 (Fast Life) |
| West | Epangishmok | Fall | Sage & Strawberry | 35–49 (Truth) |
| North | Kiiwedinong | Winter | Cedar & Stories | 49+ (Elders, Wisdom) |

### mw_store_memory

Store a relational memory as a knowledge node.

```json
{
  "key": "pr27-stale-lock-finding",
  "value": "Orphan .lock files from crashed processes permanently block writes",
  "direction": "west",
  "ceremony_id": "ceremony:..."
}
```

---

## Relational CRUD (12 tools)

### Nodes

| Tool | Input | Returns |
|------|-------|---------|
| `create_relational_node` | `{ name, type, description, direction?, metadata? }` | Created node with ID |
| `get_relational_node` | `{ node_id }` | Full node object |
| `update_relational_node` | `{ node_id, description?, metadata?, direction? }` | Updated node |
| `list_relational_nodes` | `{ type?, direction?, limit? }` | Array of nodes |
| `search_nodes` | `{ query, type?, direction?, limit? }` | Matching nodes |

Node types: `human`, `land`, `spirit`, `ancestor`, `future`, `knowledge`

### Edges

| Tool | Input | Returns |
|------|-------|---------|
| `create_relational_edge` | `{ from_node_id, to_node_id, relationship_type, strength?, obligations? }` | Created edge |
| `list_edges` | `{ node_id?, limit? }` | Array of edges |
| `get_relational_web` | `{ node_id, depth? }` | Full relational web (up to depth 5) |

### Ceremonies

| Tool | Input | Returns |
|------|-------|---------|
| `log_ceremony_with_memory` | `{ type, direction, participants, medicines_used, intentions, research_context?, relations_honored? }` | Ceremony record |
| `get_ceremony` | `{ ceremony_id }` | Full ceremony object |
| `list_ceremonies` | `{ direction?, type?, limit? }` | Array of ceremonies |

Ceremony types: `smudging`, `talking_circle`, `spirit_feeding`, `opening`, `closing`

### Narrative Beats

| Tool | Input | Returns |
|------|-------|---------|
| `create_narrative_beat` | `{ direction, title, description, learnings, ceremony_ids?, relations_honored? }` | Beat record |

---

## Research Cycles (5 tools)

A cycle is a complete turn of the Medicine Wheel around a research question.

| Tool | Input | Returns |
|------|-------|---------|
| `create_research_cycle` | `{ research_question, current_direction? }` | Cycle with ID |
| `list_cycles` | `{ status? }` | All cycles (status: active/archived/all) |
| `get_cycle` | `{ cycle_id }` | Cycle object |
| `update_cycle_direction` | `{ cycle_id, new_direction }` | Updated cycle (east→south→west→north) |
| `get_narrative_arc` | `{ cycle_id }` | Full narrative arc across all directions |

---

## Structural Tension (12 tools)

Based on Robert Fritz's structural tension methodology. Charts have desired outcomes (creative), not problems to solve.

| Tool | Input | Purpose |
|------|-------|---------|
| `create_structural_tension_chart` | `{ desired_outcome, current_reality, direction, due_date?, action_steps? }` | Create STC |
| `add_action_step` | `{ chart_id, title, current_reality, due_date? }` | Add strategic secondary choice |
| `telescope_action_step` | `{ chart_id, action_step_id, new_current_reality, initial_action_steps? }` | Expand step into sub-chart |
| `update_action_progress` | `{ chart_id, action_step_id, progress, new_current_reality? }` | Update progress (0–100) |
| `mark_action_complete` | `{ chart_id, action_step_id, ceremony_id? }` | Complete step |
| `update_current_reality` | `{ chart_id, new_current_reality }` | Update reality assessment |
| `get_chart_progress` | `{ chart_id }` | Progress report |
| `list_structural_tension_charts` | `{ direction? }` | List charts |
| `creator_moment_of_truth` | `{ chart_id, expected_outcome, actual_outcome, analysis, adjustments, feedback_system? }` | 4-step MMOT review |
| `link_ceremony_to_chart` | `{ chart_id, ceremony_id }` | Link ceremony to chart |
| `link_chart_to_cycle` | `{ chart_id, cycle_id }` | Link chart to cycle |
| `honor_relation_in_action_step` | `{ chart_id, action_step_id, node_id }` | Honor relation in step |

### MMOT — Creator Moment of Truth

The 4-step review process (West direction — reflection and truth):

1. **Acknowledge** — What was expected vs. what actually happened? Factual, no judgment.
2. **Analyze** — How did this come to pass? Step-by-step causal chain.
3. **Plan** — What specific adjustments will be made? Creative orientation.
4. **Feedback** — How will you track whether changes are being made?

---

## Direction Guidance (13 tools)

Directional tools provide ceremony guidance, protocols, and teachings specific to each Medicine Wheel direction.

### East — 🌅 Waabinong (Vision, Spring, Tobacco)

| Tool | Purpose |
|------|---------|
| `east_vision_inquiry` | Map relational obligations for new research |
| `east_spirit_invocation` | Opening ceremony guidance (research_opening, land_acknowledgment, elder_invitation) |
| `east_new_relation_mapper` | Map ALL relational obligations at project start |

### South — 🔥 Zhaawanong (Growth, Summer, Cedar)

| Tool | Purpose |
|------|---------|
| `south_growth_practice` | Embodiment practices for active research phases |
| `south_youth_mentorship_protocol` | Protocols for engaging youth with Elder co-facilitation |
| `south_embodied_data_collection` | Walking interviews, land observation, ceremony participation |

### West — 🌊 Epangishmok (Reflection, Fall, Sage)

| Tool | Purpose |
|------|---------|
| `west_reflection_ceremony` | Talking circles, dream work, storytelling, forgiveness |
| `west_emotional_processing` | Process trauma, grief, anger, shame, colonial wounds |
| `west_strawberry_teaching` | Forgiveness and heart-centered healing |

### North — ❄️ Kiiwedinong (Wisdom, Winter, Cedar & Stories)

| Tool | Purpose |
|------|---------|
| `north_wisdom_synthesis` | Integrate learnings from all directions into wisdom |
| `north_elder_council_invocation` | Elder council protocols (validation, closing, guidance, conflict) |
| `north_spirit_feeding_ceremony` | Honor ancestors and maintain relational continuity |
| `north_story_archiving` | OCAP®-compliant story preservation |

---

## Epistemic — Four Ways of Knowing (2 tools)

The ImportanceUnit is the relational unit of knowledge, carrying epistemic weight by source dimension (Land, Dream, Code, Vision) and tracking spiral/circle depth (repetition as ceremony).

| Tool | Input | Purpose |
|------|-------|---------|
| `mw_create_importance_unit` | `{ summary, source, direction, createdBy, axiologicalPillar?, inquiryRef? }` | Create a relationally-accountable ImportanceUnit. Assigns epistemic weight by source (land/dream/code/vision); circle depth starts at 1 |
| `mw_circle_back` | `{ unit_id, shift }` | Circle back to an existing unit to deepen it. Increments circle depth and records what shifted this pass |

---

## Coordination — Fire Keeper (3 tools)

The Fire Keeper is the active relational-alignment agent that tends the ceremony fire, gates risky actions, and issues stop-work orders.

| Tool | Input | Purpose |
|------|-------|---------|
| `mw_fire_keeper_status` | `{ inquiryRef }` | Check Fire Keeper status: trajectory confidence and active stop-work orders |
| `mw_relational_check_back` | `{ action, inquiryRef }` | The sacred 4-step check-back before autonomous action: honors relations, strengthens spirit-body relationship, accountable to all directions, Elder-approvable |
| `mw_enforce_gate` | `{ filePath, governanceConfig? }` | Enforce a ceremony gate on a file path. Blocks changes to restricted/sacred paths without proper authority |

---

## Governance & Transformation (3 tools)

Community review circles, living consent, and Wilson-validity transformation snapshots.

| Tool | Input | Purpose |
|------|-------|---------|
| `mw_review_circle_open` | `{ artifactId, artifactType }` | Open a community review circle (status `gathering`), awaiting reviewers and talking-circle entries |
| `mw_consent_grant` | `{ grantor, grantee, scopeDescription, id?, dataTypes?, purposes? }` | Record the initial granting of relational consent (`pending` → `granted`) and establish scope |
| `mw_snapshot_transformation` | `{ researchCycleId, understanding, direction, ceremonyPhase, keyInsights?, openQuestions? }` | Capture a snapshot of researcher understanding + Wilson validity audit (growth, community impact, relational shifts) |

---

## Reasoning & Observability (2 tools)

| Tool | Input | Purpose |
|------|-------|---------|
| `mw_decompose_prompt` | `{ prompt }` | Decompose a prompt into ontological intents mapped to the Four Directions (East/Vision, South/Analysis, West/Validation, North/Action). Detects implicit intents; generates ceremony guidance if balance is poor |
| `mw_analyze_session` | `{ sessionId }` | Analyze an agent session from JSONL events. Extracts tool usage, feedback counts, and potential value-divergence patterns |

---

## Validation (4 tools)

| Tool | Input | Purpose |
|------|-------|---------|
| `wilson_paradigm_checker` | `{ research_description }` | Check alignment with Wilson's Indigenous paradigm |
| `ocap_compliance_checker` | `{ data_plan: { storage_location, ownership_statement, access_controls, community_approval, data_sharing_agreements } }` | Verify OCAP® compliance |
| `accountability_validator` | `{ research_plan: { title, methods, duration, ceremony_integration, community_benefit, data_storage, ... } }` | Audit relational accountability |
| `two_eyed_seeing_bridge` | `{ concept, direction: "western_to_indigenous" \| "indigenous_to_western" \| "integrate_both" }` | Translate between worldviews |

---

## Read/Search (7 tools)

| Tool | Input | Purpose |
|------|-------|---------|
| `list_relational_nodes` | `{ type?, direction?, limit? }` | List nodes |
| `list_ceremonies` | `{ direction?, type?, limit? }` | List ceremonies |
| `list_narrative_beats` | `{ direction?, limit? }` | List beats |
| `list_cycles` | `{ status? }` | List cycles |
| `list_edges` | `{ node_id?, limit? }` | List edges |
| `list_mmots` | `{ chart_id }` | List MMOTs for chart |
| `telescope_narrative_beat` | `{ beat_id, depth? }` | Drill into beat's relational web |

---

## Archive (1 tool)

### archive_for_seven_generations

Archive a research cycle with OCAP® compliance. Requires Elder approval and community verification.

```json
{
  "cycle_id": "cycle-...",
  "consent_level": "community_only",
  "community_verified": true,
  "elder_approved": true
}
```

Consent levels: `public`, `community_only`, `restricted`, `sacred_private`

---

## Data Model

### Entity Types

| Entity | JSONL File | Key Fields |
|--------|-----------|------------|
| Node | `nodes.jsonl` | id, name, type, description, direction, metadata |
| Edge | `edges.jsonl` | from_id, to_id, relationship_type, strength, obligations, ceremony_honored |
| Ceremony | `ceremonies.jsonl` | id, type, direction, participants, medicines_used, intentions |
| Beat | `beats.jsonl` | id, direction, title, description, learnings, ceremony_ids |
| Cycle | `cycles.jsonl` | id, research_question, current_direction, wilson_alignment, ocap_compliant |
| Chart | `charts.jsonl` | id, desired_outcome, current_reality, direction, action_steps |
| MMOT | `mmots.jsonl` | id, chart_id, expected_outcome, actual_outcome, analysis, adjustments |

### Persistence

- Store location: `.mw/store/` (configurable via `MW_DATA_DIR`)
- Format: JSONL (one JSON object per line per entity)
- Shared between MCP server (stdio) and Web UI (Next.js)
- Atomic writes with file locking (stale lock recovery after 30s)
- Cross-process safe

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  Consumers                       │
│                                                 │
│  Claude/Copilot    bin/mw CLI    Next.js Web UI │
│  (MCP tools)       (bash)        (REST API)     │
└────────┬──────────────┬──────────────┬──────────┘
         │              │              │
         ▼              ▼              ▼
    MCP Server     JSON-RPC/HTTP    lib/store.ts
    (stdio)         (pipe)          (import)
         │              │              │
         └──────────────┴──────┬───────┘
                               ▼
                     .mw/store/*.jsonl
                     (shared persistence)
```

---

## Academic Foundation

- **Wilson, S. (2008).** *Research Is Ceremony.* Fernwood Publishing. — Relational ontology, three R's (respect, reciprocity, responsibility), research as ceremony.
- **Marshall, A. (2004).** Two-Eyed Seeing. — Seeing with both Indigenous and Western eyes together.
- **Kovach, M. (2009).** *Indigenous Methodologies.* — Conversational method, story as research.
- **Smith, L. T. (1999).** *Decolonizing Methodologies.* — Challenging Eurocentric research paradigms.
- **FNIGC. (2014).** OCAP® — Ownership, Control, Access, Possession for First Nations data sovereignty.

---

## Related Projects

| Project | Relationship |
|---------|-------------|
| [medicine-wheel-pi](https://docs.medicine-wheel.jgwill.com/workspace/repos/jgwill/medicine-wheel-pi/) | Ceremony-focused Pi agent platform consuming these MCP tools |
| [agent-pi](https://docs.medicine-wheel.jgwill.com/workspace/repos/jgwill/agent-pi/) | General-purpose Pi agent (sibling to medicine-wheel-pi) |
| [mino-sdk](https://docs.medicine-wheel.jgwill.com/a/src/mino-sdk/) | Shared @mino packages (types, inquiry, ceremony, store, agent, view, cli) |
| [mcp-medicine-wheel](https://docs.medicine-wheel.jgwill.com/a/src/mcp-medicine-wheel/) | Elder MCP server (Redis-backed, predecessor) |

---

*64 tools · 7 entity types · 4 directions · All my relations 🌿*
