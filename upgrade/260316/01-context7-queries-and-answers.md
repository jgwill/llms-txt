# Context7 Queries: Miadi Orchestration Kit Analysis
**Date**: 2026-06-13  
**Query Target**: `/jgwill/miadi-orchestration-kit/`  
**Purpose**: Identify LLMS-txt guidance gaps for Miadi platform integration

---

## Query 1: Core Architectural Principles and Design Patterns

**Question**: What are the core architectural principles and design patterns of the Miadi orchestration kit?

**Answer from Context7**:

The Miadi Orchestration Kit follows a specialized plugin architecture designed for Copilot integration. Key findings:

- **Structure**: The kit uses a modular plugin directory pattern with agents and skills separated into distinct folders
- **Core Plugin Types**: 
  - Miadi Storyweaver Orchestration Kit (narrative creation)
  - STCKin Orchestration Kit (codebase analysis and synthesis)
  - Miadi Adversarial Review Kit (critique and validation)
  - Miadi Orchestration Architect (kit iteration and adaptation)
  
- **Agent-Skill Coordination**: Agents steward distinct workflow phases, passing responsibility through handoff documentation in markdown (State.md, Review output formats)

- **Reusability Principle**: Kit assets are designed to be reusable across future Copilot waves, reducing prompt friction through documented patterns

- **Plugin Manifest Structure**: Each kit requires:
  - `.github/plugin/plugin.json` (plugin metadata)
  - `README.md` (launching instructions)
  - `agents/` directory (agent definitions)
  - `skills/` directory (skill implementations)

---

## Query 2: Structural Tension and Creative Workflows

**Question**: How does the orchestration kit handle structural tension and creative workflows?

**Answer from Context7**:

The kit deeply integrates Robert Fritz's structural tension framework as a core design pattern:

- **State Management**: Every workflow stage maintains explicit structural tension documentation:
  - Desired Outcome (vision)
  - Current Reality (actual state)
  - Natural Progression (next moves)

- **Handoff Contracts**: Agents pass work through clearly defined State.md files capturing:
  - Active stage (brief → bible → research → outline → draft → review → revise → line-edit → export → closed)
  - Accepted artifacts (with status and timestamp)
  - Pending artifacts (with next action)
  - Route decisions (continue | revise | pause | ask-human | closed)
  - Blockers and pause conditions

- **Quality Gates**: Review agents use structural assessment to evaluate whether artifacts advance, partially advance, or oscillate relative to desired outcome

- **Creative Intent Preservation**: The kit maintains creative vision through:
  - Creative Brief Intake (extracting intent)
  - Story Bible maintenance (world/character/research continuity)
  - Continuity Keeper (tracking voice, themes, relationships)
  - Cultural Protocol Steward (consent-aware review)

- **Example**: Storyweaver Orchestration Architect explicitly documents tension between "clear, supervised workflow" (desired) and "blurred work across story, Chronicle, research, voice elements" (current reality), with progression through marked handoffs in durable markdown

---

## Query 3: Configuration and Deployment Best Practices

**Question**: What are the best practices for configuring and deploying the Miadi orchestration platform?

**Answer from Context7**:

Deployment and configuration follow a layered plugin + workspace directory approach:

- **Copilot Launch Composition**:
  ```bash
  copilot \
    --plugin-dir /path/to/miadi-orchestration-kit/copilot/miadi-orchestration-kit-hermes \
    --plugin-dir /path/to/stckin-orchestration-kit \
    --plugin-dir /path/to/miadi-adversarial-review-kit \
    --add-dir <active-miadi-worktree> \
    --add-dir <active-pde-folder> \
    --add-dir /path/to/miadi-orchestration-kit
  ```

- **Plugin-First Approach**: All agents and skills are delivered as Copilot plugins, not Python packages

- **High-Reasoning Models**: COAIA agent orchestration uses:
  - Model: `claude-opus-4.6` (or higher)
  - Reasoning effort: `xhigh` or higher
  - Launch flags: `--yolo --no-ask-user`

- **Session Artifact Folder Pattern**: 
  - Creates timestamped working directories (e.g., `implementation-session-<YYYYMMDDHHMM>`)
  - Maintains EXECUTION_LOG.md for progress tracking
  - Artifacts organized by wave (SOUTH Lane A, etc.)

- **Security & Staging**: Plugins remain in `miadi-orchestration-kit` unless explicitly required to be in upstream repos (Miadi itself)

- **Replayability**: Launch recipes documented with explicit plugin paths and add-dir surfaces enable reproducible orchestration sessions

---

## Query 4: External System Integration (MCP, Langfuse, Tools)

**Question**: How does the kit integrate with external systems like MCP, Langfuse, and other tools?

**Answer from Context7**:

The kit follows a transparent, contract-based integration pattern:

- **MCP (Model Context Protocol) Integration**:
  - Remote QMD (Query MD) server for distributed artifact access
  - Two transport modes:
    1. **stdio**: Single agent session (direct command invocation)
    2. **HTTP daemon**: Multi-agent shared access (proxied through port 8182)
  - Configuration in `mcpServers` JSON, transparently injected into Copilot sessions
  - Tool surface includes: `qmd-remote:query`, `qmd-remote:get`, `qmd-remote:multi_get`, `qmd-remote:status`

- **MCP Server Registration Example** (stdio):
  ```json
  {
    "mcpServers": {
      "qmd-remote": {
        "command": "qmd",
        "args": ["mcp-remote", "--host", "mia@eury"],
        "env": {
          "QMD_REMOTE_COLLECTIONS": "wikis-md,GUILLAUME-md,iaip-artefacts-md,miadi-md,llms-txt,mia-code-rispecs-md",
          "QMD_REMOTE_LIMIT": "8"
        }
      }
    }
  }
  ```

- **HTTP Daemon Pattern** (multi-agent):
  - Start: `qmd mcp-remote --host mia@eury --http --port 8182 --daemon`
  - Config: `{ "mcpServers": { "qmd-remote": { "url": "http://localhost:8182/mcp" } } }`

- **Langfuse & Observability**: Inferred from CoaiaPy ecosystem, but not explicitly detailed in orchestration-kit docs

- **Tool Abstraction**: Kit enforces "proxy transparency" — agents interact with MCP tools as if local, regardless of remote/local implementation

- **External Service Handling**: The kit does NOT implement direct connectors for Discord, OpenClaw runtime, arXiv, GitHub code-search, etc. Instead, uses contracts and source ledgers with defined mitigations

---

## Query 5: Ceremony and Relational Paradigm in the Kit

**Question**: What ceremony and relational paradigm approaches are embedded in the orchestration kit?

**Answer from Context7**:

The kit grounds itself in relational and ceremonial frameworks:

- **Medicine Wheel Foundation**:
  - Serves as the "relation source" for ceremonial and relational orchestration
  - Miadi orchestration plugins declare:
    - Which Medicine Wheel surfaces they consume
    - Which writes they perform
    - Which communities and boundaries they affect
    - How source claims and ceremony state are preserved in ledgers

- **Consent-Aware Review**:
  - Cultural Protocol Steward agent validates consent and attribution
  - Avoids claiming cultural validation; instead supports:
    - Consent-aware review
    - Source attribution
    - Refusal/deferral for requests exceeding permissions

- **Story Intent Accommodation**:
  - Supports non-fiction narrative, memoir-like material, game lore, and **ceremonial storytelling workflows**
  - Not tied to generic "storytelling" package

- **Narrative Stewardship**:
  - Creative Brief Archaeologist (extracts author intent)
  - Narrative Research Weaver (research as cultural context)
  - Continuity Keeper (maintains voice, theme, relationship continuity)
  - Export Steward (final closure and artifact packaging)

- **Ledger-Based Accountability**:
  - Source ledger integration (from deep-research-foundations paradigm)
  - State handoff documentation captures responsible agent, timestamp, decision rationale
  - Blockers explicitly surface consent/permission boundaries

- **Foundational Grounding**: Kit architecture is grounded in five foundation documents synthesizing peer-reviewed research, verified patterns, practitioner ethnography, and existing ecosystem work

---

## Key Findings Summary

1. **Plugin-First Architecture**: Everything is Copilot plugins, enabling reusable, reproducible orchestration
2. **Structural Tension as First-Class Citizen**: Fritz's framework embedded in every workflow stage
3. **Transparent Tool Integration**: MCP, external services abstracted through contracts, not implementations
4. **Relational & Ceremonial**: Medicine Wheel, consent-aware review, cultural protocol stewardship integral to design
5. **Ledger-Based Accountability**: Source claims, handoffs, state tracked in durable markdown for human+agent readability
6. **Replayable Sessions**: High-reasoning models + explicit launch recipes + timestamped artifact folders

