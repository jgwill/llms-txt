# Storytelling (WillWrite)

> AI-powered narrative generation — transforming prompts into complete, multi-chapter stories through advancing patterns, grounded in Creative Orientation and Indigenous ceremonial technology.

---

## What Is Storytelling?

Storytelling (also known as WillWrite or SpecForge) is a Python package that empowers users to **manifest complete, coherent narratives from a single creative prompt**. It orchestrates a multi-stage generation pipeline using LangGraph state machines, multiple LLM providers, knowledge integration (RAG), and persistent sessions that survive interruptions.

What distinguishes it from other text generation tools:

- **Creative Orientation** — built on Robert Fritz's structural dynamics, not problem-solving
- **Ceremonial Integration** — Indigenous five-phase methodology via the IAIP bridge
- **Session Persistence** — PHOENIX_WEAVE checkpoint/resume across any interruption
- **Knowledge-Aware** — RAG from local files, web content, and CoAiAPy datasets
- **LLM-Agnostic** — URI-based provider system (Google, Ollama, OpenRouter, custom endpoints)

| Resource | URL |
|----------|-----|
| **llms.txt** | [storytelling.jgwill.com/llms.txt](https://storytelling.jgwill.com/llms.txt) |
| **llms-full.txt** | [storytelling.jgwill.com/llms-full.txt](https://storytelling.jgwill.com/llms-full.txt) |
| **Source** | [github.com/jgwill/storytelling](https://github.com/jgwill/storytelling) |
| **Specifications** | [rispecs/](https://github.com/jgwill/storytelling/tree/main/rispecs) |

---

## Generation Pipeline

The story generation pipeline follows four Creative Advancement Scenarios:

| Scenario | Phase | What Happens |
|----------|-------|-------------|
| **1. Story Foundation** | Prompt → Elements → Outline | Extract meta-instructions, generate characters/plot/theme, create chapter structure |
| **2. Chapter Crafting** | Chapter × Scene × Layer | 4 scenes per chapter, 4 layers per scene (plot → character → dialogue → integration) |
| **3. Polish & Finalize** | Edit → Scrub → Translate → Metadata | Holistic consistency, artifact removal, optional translation, title/summary/tags |
| **4. Knowledge Augmentation** | RAG at outline + chapter stages | Inject relevant context from markdown files, web, and CoAiAPy datasets |

Each stage is a checkpoint — sessions can be resumed from any point.

---

### Architecture Diagrams

The [README.md](https://github.com/jgwill/storytelling) at [storytelling.jgwill.com](https://storytelling.jgwill.com) includes three Mermaid architecture diagrams:

1. **Story Generation Pipeline** — full LangGraph node graph with STC phases (Germination / Assimilation / Completion)
2. **STC State Machine** — pipeline stages as creative phase state transitions; reveals oscillation risk in the chapter revision loop
3. **NarrativeAware Enrichment Loop** — Three-Universe Analysis → Emotional Scoring → Gap Identification → Enrichment cycle

Plus the **Wâpano (NARINTEL:EAST)** envisioned architecture — the Four Directions multi-agent system that begins the structural decolonization of this package.

---



| Component | Purpose |
|-----------|---------|
| **Story Graph** (`graph.py`) | LangGraph state machine orchestrating the full pipeline |
| **Session Manager** (`session_manager.py`) | PHOENIX_WEAVE persistence with checkpoint/resume |
| **LLM Providers** (`llm_providers.py`) | URI-based multi-provider abstraction; different models per stage |
| **RAG** (`rag.py`) | Enhanced multi-source knowledge retrieval (FAISS + web + CoAiAPy) |
| **IAIP Bridge** (`iaip_bridge.py`) | Five-phase ceremonial methodology for story generation |
| **MCP Server** (`storytelling_mcp/`) | Model Context Protocol for LLM agent orchestration |

### Tiered Dependencies

| Tier | Size | Includes |
|------|------|----------|
| Core | ~50MB | Full generation, LangGraph, LangChain, Pydantic |
| +RAG | +3-5GB | Sentence-transformers, FAISS, document processing |
| +Specialized | Variable | Provider SDKs, GPU, cloud integrations |

---

## Relationship to This Portfolio

Storytelling is a primary **Ceremonial Technology application** — a concrete manifestation of the frameworks documented across this portfolio:

| Framework | How Storytelling Embodies It |
|-----------|------------------------------|
| [Creative Orientation](creative-orientation.md) | All specifications use creation language; narratives are advanced into being |
| [Structural Tension](structural-tension.md) | Specs use Structural Tension Blocks; generation holds tension through delayed resolution |
| [RISE Framework](rise-framework.md) | rispecs/ are RISE-generated blueprints |
| [Narrative Craft](narrative-craft.md) | The package generates the narratives that beats then document |
| [Ceremonial Technology](ceremonial-technology.md) | IAIP bridge implements five ceremonial phases |
| [Indigenous Research Paradigm](indigenous-research-paradigm.md) | Two-Eyed Seeing balances Western AI with Indigenous wisdom |
| [Performance Truth](performance-truth.md) | Critic/revision loops embody the MMOT process |

The IAIP bridge maps story generation to five Indigenous ceremonial phases:

1. **Miigwechiwendam** — Sacred space and intention setting
2. **Nindokendaan** — Two-eyed research and knowledge gathering
3. **Ningwaab** — Knowledge integration through relational synthesis
4. **Nindoodam** — Creative expression within ceremonial container
5. **Migwech** — Ceremonial closing, reflection, and wisdom capture

---

## RISE Specifications

The `rispecs/` directory contains complete implementation-agnostic specifications:

| Spec | Focus |
|------|-------|
| ApplicationLogic | Story generation pipeline and graph orchestration |
| Session_Management_Architecture | PHOENIX_WEAVE checkpoint/resume |
| RAG_Implementation_Specification | Knowledge base integration |
| LLM_Provider_Specification | URI-based multi-provider abstraction |
| IAIP_Integration_Specification | Indigenous ceremonial framework |
| Narrative_Intelligence_Integration | Character arcs, emotional beats, thematic continuity |
| Tiered_Package_Architecture | Progressive dependency tiers |

All governed by the [Creative Orientation Operating Guide](https://github.com/jgwill/storytelling/blob/main/rispecs/Creative_Orientation_Operating_Guide.md) and [Terms of Agreement](https://github.com/jgwill/storytelling/blob/main/rispecs/Terms_of_Agreement.md).

---

## Key Sources

- [llms.txt](https://storytelling.jgwill.com/llms.txt) — compact index for LLM consumption
- [llms-full.txt](https://storytelling.jgwill.com/llms-full.txt) — expanded index with detailed summaries
- [Source repository](https://github.com/jgwill/storytelling)
- [Creative Orientation](../llms-creative-orientation.txt) — foundational framework
- [RISE Framework](../llms-rise-framework.txt) — specification methodology
- [Narrative Beats](../llms-narrative-beats.txt) — story documentation
- [Structural Tension Charts](../llms-structural-tension-charts.txt) — advancement methodology
