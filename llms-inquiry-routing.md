# Inquiry Routing — llms-txt Reference

> Structurally tensioned questions that carry their own tension between what is known and what is needed, routed with relational accountability through appropriate channels.

**Version**: 0.1.0
**Document ID**: llms-inquiry-routing-v0.1
**Last Updated**: 2026-03-28
**Content Source**: Derived from `ava-langchain-inquiry-routing` and `ava-langgraph-inquiry-routing-engine` packages (March 2026).

---

## Purpose

Inquiry Routing transforms PDE decomposition output into **structured Inquiry objects** — questions that know where they come from, who they serve, and where they need to go. It is the bridge between decomposition (understanding intent) and resolution (finding answers).

An Inquiry is not a bare question. It is a **relationally enriched, accountable question** carrying:

- The tension it emerged from (what we know vs. what we need)
- The relational context of who asks and for what purpose
- The accountability markers of who benefits and what harm to avoid
- The ceremonial intent — what is honored through the act of asking

---

## Architecture

Two packages compose the Inquiry Routing system:

### 🔗 ava-langchain-inquiry-routing (v0.1.0)

Chain primitives — the building blocks:

| Primitive | Role |
|-----------|------|
| **InquiryGenerator** | Transforms PDE decomposition output into structured Inquiry objects |
| **InquiryRouter** | Classifies inquiries and routes them to appropriate channels |
| **RelationalEnricher** | Adds relational context, accountability, ceremonial intent, Indigenous/Western lens markers |
| **InquiryFormatter** | Formats inquiry for consumption by different backends |

### 🕸️ ava-langgraph-inquiry-routing-engine (v0.1.0)

Graph orchestration layer — the flow:

- 4-node state machine with `ceremony_hold` covenant
- Orchestrates the routing cycle: **Generate → Enrich → Route → Format**
- The `ceremony_hold` covenant ensures the enrichment step is never bypassed — a question must carry its relational weight before it can be routed

---

## The Enriched Inquiry Model

```
Inquiry {
  core_question        — the question or intent surfaced by PDE
  relational_context   — who asks, for what purpose
  accountability       — who benefits, what harm to avoid
  ceremonial_intent    — what is honored through asking
  lens_markers         — Indigenous / Western epistemological markers
  routing_metadata     — target channel, priority, format
}
```

### Lens Markers

Contributed from Mia's article-grounding work. Each inquiry carries markers indicating the epistemological lens through which it was framed — Indigenous relational knowing, Western analytical framing, or both. This is not decoration; it shapes how the inquiry is interpreted and what counts as a valid response.

---

## Routing Targets

The router classifies each inquiry and directs it to the appropriate resolution channel:

| Target | Purpose |
|--------|---------|
| **QMD-local** | Semantic search across the workspace knowledge base |
| **deep-search-academic** | Academic literature and research channels |
| **workspace-scan** | Codebase discovery and structural analysis |

The v0.1.0 router uses keyword classification. Future versions will use LLM-backed classification for richer semantic routing.

---

## Inquiry as Structural Tension

An inquiry is a **structurally tensioned question**. It inherits the creative orientation principle: the tension between current reality (what we know) and desired state (what we need to know) is the generative force that drives resolution.

This distinguishes Inquiry Routing from simple search:

- A search query is stateless — "find X"
- An inquiry carries its tension — "we know A, we need B, the distance between them matters because C, and asking honors D"

The tension is not a problem to solve. It is the **energy that makes the question alive**.

---

## The Routing Flow

```
PDE Decomposition
       │
       ▼
┌─────────────┐
│  Generate   │  InquiryGenerator: PDE output → Inquiry objects
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Enrich    │  RelationalEnricher: adds context, accountability,
│             │  ceremonial intent, lens markers
└─────┬───────┘
      │  ceremony_hold covenant — enrichment must complete
      ▼
┌─────────────┐
│    Route    │  InquiryRouter: classify → select target channel
└─────┬───────┘
      │
      ▼
┌─────────────┐
│   Format    │  InquiryFormatter: shape for backend consumption
└─────────────┘
```

---

## Key Principles

### Relational Accountability (Wilson)

Every inquiry must answer: **Who is this inquiry for? Who is affected by its resolution?** This is not metadata — it is the ethical ground the inquiry stands on. Drawn from Wilson's relational accountability framework.

### Ceremony Hold

The `ceremony_hold` covenant in the state machine ensures enrichment cannot be skipped. A bare question — stripped of relational context — is not routed. This prevents the system from collapsing into a search engine.

### Delayed Resolution

Inquiry Routing honors the delayed resolution principle. Not every inquiry needs immediate resolution. Some inquiries are meant to be held, carried, returned to. The routing metadata includes priority, and "hold" is a valid routing outcome.

---

## v0.2.0 Roadmap

- **LLM-backed classification** — replacing keyword routing with semantic classification
- **Backend execution** — inquiries trigger resolution workflows, not just routing
- **FireKeeper integration** — ceremonial inquiry patterns
- **Spiral tracking** — inquiries that return transformed carry their lineage

---

## Related

- [llms-pde.txt](llms-pde.txt) — PDE decomposition feeds InquiryGenerator
- [llms-creative-orientation.txt](llms-creative-orientation.txt) — structural tension as generative force
- [llms-kinship-hub-system.md](llms-kinship-hub-system.md) — relational accountability and kinship protocols
- [llms-structural-tension-charts.txt](llms-structural-tension-charts.txt) — tension charting methodology
- [llms-coaiapy-cli-guide.md](llms-coaiapy-cli-guide.md) — orchestration and workflow context
- [miadisabelle/workspace-openclaw#49](https://github.com/miadisabelle/workspace-openclaw/issues/49) — Ava LangStack evolution
