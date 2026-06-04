# Medicine Wheel & Abundance Intelligence Research

> The Medicine Wheel Developer Suite — eighteen scoped `@medicine-wheel/*` npm packages encoding Indigenous relational ontology as first-class code structures, positioned within the Abundant Intelligences research program and Two-Eyed AI framework.

---

## The Medicine Wheel Developer Suite

The suite provides a layered architecture for relational AI, bridging the Engineer-world's precision with the Ceremony-world's relational accountability.

| Layer | Primary Package | Role |
|-------|-----------------|------|
| **Foundational** | `@medicine-wheel/ontology-core` | Platform nucleus: types, RDF vocabulary, Wilson alignment, OCAP tracking. |
| **Epistemic** | `@medicine-wheel/importance-unit` | The fundamental unit of knowledge: carries weight and source dimensions. |
| **Ceremonial** | `@medicine-wheel/ceremony-protocol` | Handles state transitions and path-based governance enforcement. |
| **Narrative** | `@medicine-wheel/narrative-engine` | Story sequencing and 4-act structure bound to ceremonial timing. |
| **Reasoning** | `@medicine-wheel/prompt-decomposition` | PDE intent exploration as EAST practice. |
| **Query** | `@medicine-wheel/relational-query` | Traverse kinship webs with OCAP-compliant discovery. |
| **Coordination** | `@medicine-wheel/fire-keeper` | Active relational-alignment agent and governance firewall. |
| **Application** | `@medicine-wheel/app` | Unified CLI (`mw`) and Server (`mwsrv`) for research orchestration. |
| **Server** | `@medicine-wheel/mcp` | Agent-facing surface (64 tools) composing the full suite. |

### Platform Nucleus

The `@medicine-wheel/ontology-core` package defines a foundational ontological layer where **relations are first-class beings** with ceremony context and obligations. Every other package imports from this core — making it a genuine platform nucleus, not a bag of utilities.

The suite encompasses eighteen packages describing specialized "shapes" of intelligence: from foundational data structures and persistence (`data-store`, `storage-provider`) to high-level governance (`community-review`, `consent-lifecycle`) and presentation (`graph-viz`, `ui-components`).

---

## Human Interface: mw & mwsrv CLI

The `@medicine-wheel/app` package provides the primary human-facing interfaces for the platform.

### mw — Medicine Wheel CLI
The `mw` tool allows researchers to manage the relational research lifecycle directly from the command line.

- **Ceremony**: `mw ceremony open <intention>` / `mw ceremony close <id>`
- **Research**: `mw cycle create <question>` / `mw beat create <dir> <title>`
- **Relational**: `mw node create` / `mw edge create` / `mw web <id>`
- **Validation**: `mw validate wilson` / `mw validate ocap`

### mwsrv — Medicine Wheel Server
The `mwsrv` tool launches the platform's Next.js application, which serves as the data hub and collaborative interface.

- **Local Development**: `mwsrv` starts the server on port 3940.
- **Docker Deployment**: `mwsrv --docker` runs the full stack in a containerized environment with persistent volume mapping to `.mw/store`.
- **Backend Selection**: Supports switching between `jsonl` and `postgres` storage providers via environment variables.

---

## Alignment with Abundant Intelligences

The [Abundant Intelligences program](https://www.indigenous-ai.net/abundant-intelligences), affiliated with the Indigenous AI initiative, proposes reconceptualizing AI based on Indigenous Knowledge Systems. The program is optimized for **abundance rather than scarcity** — contrasting sharply with the efficiency-maximization framing dominant in mainstream AI.

### Where This Portfolio Fits

- The Medicine Wheel Developer Suite operationalizes Abundant Intelligences principles as code
- The article "Indigenous AI and Efficient LLMs" positions this work within funded, multi-institutional research (Haudenosaunee Pod, Ka Hawai'i Pae 'āina Pod, etc.)
- Deep-Thinking Ratio research connects to Indigenous epistemologies of abundance, relationality, and territorial specificity

---

## Two-Eyed AI

A dual-view approach where:

| Eye | Focus | Technical Manifestation |
|-----|-------|------------------------|
| **Algorithmic** | Efficiency, Deep-Thinking Ratio, Think-n early halting | Token-level metrics, energy optimization |
| **Indigenous** | Wilson alignment, OCAP, relational governance | `computeWilsonAlignment`, `auditOcapCompliance`, `relationalCompleteness` |

The `ontology-core` package makes both views computable in the same space — Wilson alignment scores and OCAP flags alongside conventional AI metrics.

---

## LangChain and LangGraph Integration

### LangChain: Sequential Ceremonial Workflows

- **RelationalNodeRetriever** — surfaces nodes constrained by direction, ceremony context, OCAP
- **NarrativeBeatPlanner** — generates next steps using Structural Tension Charts and Narrative Beats

### LangGraph: Four Directions Multi-Agent System

| Direction | Agent | Function |
|-----------|-------|----------|
| 🌅 East | Inquiry | Bias detection, Nitshkees Thinking, structural tension detection |
| 🔥 South | Planning | OCAP flags, ceremony-protocol, consent workflows |
| 🌊 West | Practice | Data gathering, field notes, transcripts, experiential work |
| ❄️ North | Reflection | Narrative beats, ceremony logs, Wilson alignment summaries |

Graph-level governance ensures sacred knowledge edges require ceremony logs and IKSL compliance.

---

## Gaps Being Addressed

1. **Stack → Platform** — narrating the developer workflow through the full suite
2. **Community Workflows** — consent wizards, research-paradigm templates, steward documentation
3. **Relational Dashboards** — Wilson alignment over time, OCAP compliance rates, structural tension visualization
4. **Edge Deployment** — minimal stacks for Raspberry Pi / Jetson Nano with solar-friendly behavior
5. **Polysynthetic Language Adapters** — morphological analyzers integrated into narrative and ceremony layers

---

## Key Sources

- [llms-inquiry-medicine-wheel-abundance-intelligence-research](../llms-inquiry-medicine-wheel-abundance-intelligence-research--d971fc13-64ee-41ab-8fcd-bb5900197ab8.md) — full research document
- [llms-medicine-wheel-packages.txt](../llms-medicine-wheel-packages.txt) — package reference (llms-txt format)
- [KINSHIP.md](../KINSHIP.md) — relational charter
- Related repos: `jgwill/medicine-wheel`, `avadisabelle/ava-langchainjs`, `avadisabelle/ava-langgraphjs`
