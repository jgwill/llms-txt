# LLMS-txt Upgrade Recommendations Based on Miadi Orchestration Kit Analysis

**Date**: 2026-06-13  
**Analysis Source**: Context7 queries to `/jgwill/miadi-orchestration-kit/`  
**Scope**: Guidance to add to this LLMS-txt repository for Miadi platform integration

---

## Executive Summary

The Miadi Orchestration Kit reveals three significant domains of guidance missing from the current LLMS-txt:

1. **Orchestration Patterns & Handoff Contracts** — How agents coordinate work through durable markdown state
2. **Plugin Architecture as First-Class Guidance** — Copilot plugins as the deployment model for Miadi kit assets
3. **Relational & Ceremony-First Integration** — Medicine Wheel as foundation, consent-aware stewardship, ceremony-aware workflows

This upgrade adds four new LLMS-txt documents to close these gaps.

---

## Recommended New LLMS-txt Documents

### Recommendation 1: ORCHESTRATION HANDOFF CONTRACTS & STATE MANAGEMENT

**Title**: `llms-miadi-orchestration-handoff-contracts.md`

**Purpose**: Document how Miadi kits coordinate agent work through structured handoff contracts, state.md files, and marked transitions.

**Covers**:
- State.md file structure and mandatory sections (Structural Tension, Active Stage, Artifacts, Route, Blockers)
- Handoff contract anatomy (from_agent, to_agent_or_skill, summary, created_at)
- Route decision semantics (continue | revise | pause | ask-human | closed)
- Review output format with structural assessment
- When to use pause conditions vs. ask-human
- Artifact acceptance and pending state tracking
- Integration with Fritz's structural tension (desired outcome ↔ current reality → progression)

**Connections to existing LLMS-txt**:
- Related: `llms-structural-tension-charts.txt` (Fritz framework)
- Related: `llms-managerial-moment-of-truth.md` (turning discrepancies into learning)
- Related: `llms-narrative-beats.txt` (stage transitions as narrative arcs)

**Rationale**: The Miadi kit's use of durable markdown state for agent coordination is distinct from existing guidance. It bridges structural tension to operational workflow, deserving dedicated guidance.

---

### Recommendation 2: MIADI PLUGIN ARCHITECTURE & REUSABLE KIT PATTERNS

**Title**: `llms-miadi-copilot-plugin-architecture.md`

**Purpose**: Document the plugin-first architecture model for Miadi orchestration kits, covering kit structure, agent + skill organization, plugin manifests, and launch patterns.

**Covers**:
- Plugin-first architecture principle (why not Python packages?)
- Standard kit folder structure (.github/plugin/plugin.json, agents/, skills/)
- Agent definition patterns (agent role, structural tension, working rules)
- Skill definition patterns (skill charter, tool specification, state output)
- Plugin manifest JSON structure (plugin.json requirements)
- Copilot launch command patterns (`--plugin-dir`, `--add-dir` orchestration)
- Reusability principle: adapting vs. cloning patterns
- When to create single vs. multiple plugin folders
- Example kit types: Storyweaver, STCKin, Adversarial Review, Promotion Context
- Launch composition recipes (multi-kit orchestration)

**Connections to existing LLMS-txt**:
- Related: `llms-rise-framework.txt` (reverse-engineer → intent → specify → export applies to kit creation)
- Related: `llms-kinship-hub-system.md` (kits as relational beings with dependencies)
- Related: `llms-narrative-beats.txt` (agent handoffs as story beats)

**Rationale**: Plugin architecture is the operational envelope for all Miadi kits. Lacks dedicated guidance despite being central to deployment and reusability. Distinct from generic Copilot guidance.

---

### Recommendation 3: MEDICINE WHEEL RELATIONAL FOUNDATIONS & CONSENT-AWARE STEWARDSHIP

**Title**: `llms-miadi-medicine-wheel-orchestration.md`

**Purpose**: Document the Medicine Wheel as foundational relation source for Miadi orchestration, and how to implement consent-aware, ceremony-aware, and community-aware stewardship in kits.

**Covers**:
- Medicine Wheel as relation source (not metaphor, not decoration — foundational)
- What it means for plugins to "declare relation":
  - Which Medicine Wheel surfaces consumed (data reads)
  - Which surfaces written to (state mutations)
  - Which communities affected (stakeholder claim)
  - Which boundaries enforced (who can request what)
- Consent-aware review pattern (Cultural Protocol Steward agent)
- Source ledger integration (tracking who claims what, who validates)
- Ceremonial storytelling workflow support (vs. generic narrative)
- Refusal/deferral semantics (when to say "this exceeds permissions")
- Integration with kinship framework (responsible agents, not neutral tools)
- Examples from Storyweaver Kit (cultural protocol check, source attribution)

**Connections to existing LLMS-txt**:
- Related: `llms-inquiry-6406eb37-69b1-471d-9cac-07ae69449c35.md` (Indigenous research paradigm)
- Related: `llms-kinship-hub-system.md` (repositories as beings with relations)
- Related: `llms-deep-research-foundations-session-close.md` (source ledgers, provenance)
- Related: `llms-medicine-wheel-packages.txt` (Medicine Wheel framework)

**Rationale**: The kit's relational and ceremonial grounding is philosophically and operationally distinct from the existing LLMS-txt. It's not just "be respectful" — it's a foundational architecture choice with specific agent patterns, state structures, and claim verification practices.

---

### Recommendation 4: MCP INTEGRATION & TRANSPARENT TOOL ABSTRACTION IN MIADI KITS

**Title**: `llms-miadi-mcp-transparent-integration.md`

**Purpose**: Document how Miadi kits use MCP for transparent tool integration, particularly for distributed artifact access via remote QMD, and how to design abstraction boundaries that don't leak transport details to agents.

**Covers**:
- MCP as transparent abstraction layer (agents don't need to know remote vs. local)
- Remote QMD (Query MD) server integration patterns:
  - stdio transport (single-agent sessions)
  - HTTP daemon transport (multi-agent shared access on port 8182)
- mcpServers JSON configuration in Copilot sessions
- Tool surface contract (qmd-remote:query, qmd-remote:get, qmd-remote:multi_get, qmd-remote:status)
- Collection filtering and limits (QMD_REMOTE_COLLECTIONS, QMD_REMOTE_LIMIT)
- When to use stdio vs. HTTP daemon
- Contract-based external integrations (why kits don't implement direct Discord/arXiv/GitHub connectors)
- Integration with launch recipes
- Debugging transparent tool integration failures

**Connections to existing LLMS-txt**:
- Related: `llms-coaiapy-mcp-config-guide.md` (MCP configuration)
- Related: `llms-coaia-fuse-guidance.md` (observability of MCP operations)
- Related: `llms-deep-research-foundations-session-close.md` (using research tools transparently)

**Rationale**: While MCP guidance exists for CoaiaPy, Miadi kits use MCP differently — for distributed orchestration and artifact access across agents, requiring dedicated guidance on transparent abstraction, multi-agent coordination, and collection management.

---

## Integration with Existing LLMS-txt

Each new document should:
- **Update existing index** in `llms.txt` to link new documents
- **Cross-reference relational graph**:
  - Orchestration Handoff Contracts ↔ Structural Tension Charts, Narrative Beats
  - Plugin Architecture ↔ RISE Framework, Kinship Hub
  - Medicine Wheel Orchestration ↔ Indigenous Research Paradigm, Deep Research Foundations
  - MCP Integration ↔ CoaiaPy MCP Config, COAIA Fuse Guidance

---

## Priority for Completion

**High Priority** (enables immediate kit adoption):
1. Plugin Architecture (Recommendation 2) — unblocks understanding how to deploy/extend kits
2. Orchestration Handoff Contracts (Recommendation 1) — unblocks understanding how agents coordinate

**Medium Priority** (foundational understanding):
3. Medicine Wheel Orchestration (Recommendation 3) — ensures relational/ceremonial grounding is preserved
4. MCP Integration (Recommendation 4) — clarifies distributed orchestration patterns

---

## Validation Checklist

Before finalizing each new document:

- [ ] Tested against actual Miadi kit code references from Context7 queries
- [ ] Includes concrete examples (file structures, JSON configs, markdown state formats)
- [ ] Links back to relevant existing LLMS-txt documents
- [ ] Covers the "why" (design principles) not just the "what" (syntax)
- [ ] Written in voice/style consistent with existing LLMS-txt (Fritz framework, ceremony-aware, relational)
- [ ] Validated by someone who has deployed/extended a Miadi kit

---

## Next Steps

1. Draft each document in order of priority
2. Use Context7 queries to extract concrete examples from actual Miadi kit implementations
3. Validate against running Miadi kit deployments if available
4. Update `llms.txt` index with new entries
5. Update `KINSHIP.md` to reflect new relational dependencies (e.g., this LLMS-txt now grounds Miadi kit deployments)
6. Commit with message: `docs: add LLMS-txt guidance for Miadi Orchestration Kit integration (upgrade/260316)`

