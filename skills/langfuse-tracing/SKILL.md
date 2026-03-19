---
name: langfuse-tracing
description: >
  Best practices for creating rich, observable, and structurally sound Langfuse traces for
  the Agentic Flywheel MCP. Use when creating traces, structuring observations, nesting
  hierarchical trace data, applying agent-specific glyphs, or debugging trace issues.
  Ensures AI contributions are valuable, legible, and machine-readable.
---

# Langfuse Tracing Best Practices

## Naming Conventions

- **Trace name**: 8-16 chars of context (repo, issue, mission) + 12-24 chars of what's traced + agent discretion. Start with 1-4 meaningful glyphs.
- **Observation name**: `[yyMMddHHmm]-<1-2 glyphs>-<title>`
- Names must be meaningful — another agent reading just the title should know what it's about.

## Root Trace Structure

| Field | Purpose |
|---|---|
| `name` | Descriptive summary with leading glyph (e.g., `🧠 Gemini Contribution: ...`) |
| `input_data` | Primary input that initiated the process (prompt, problem statement) |
| `output_data` | Final summative output (result, summary, resolved state) |
| `sessionId` | Groups related traces across interactions |
| `userId` | Identifies initiating human/system |
| `metadata` | Context ABOUT the trace: project, phase, branch, generator, related entities |

**Never hardcode trace_id** — let the system generate it via `util.gen_trace_id()`.

## Observation Types

- **SPAN**: Duration-based grouping container
- **EVENT**: Discrete single action
- **GENERATION**: LLM output

Each observation requires:
- **`name`**: Primary glyph (type/status) + secondary glyph (agent role) — e.g., `📝🧠 Code Review`
- **`input_data`**: MANDATORY — source data that initiated this step
- **`output_data`**: Result/artifact. Can be null for grouping steps.
- **`level`**: DEFAULT, INFO, WARNING, ERROR

## Nesting with Hierarchy

Use `parentObservationId` to create navigable data-flow lineage:

```
Trace Root
├── Phase 1 (SPAN)
│   ├── Sub-Phase 1.a (SPAN)
│   │   ├── Step 1.a.i (EVENT)
│   │   └── Step 1.a.ii (GENERATION)
│   └── Sub-Phase 1.b (EVENT)
└── Phase 2 (SPAN)
```

**Parallel perspectives** (multiple agents on same input) share the same parent:
```
Input Analysis
├── 🧠 Mia's Structural View
├── 🌸 Miette's Emotional View
└── 🎨 Ava8's Visual Echo
```

Think of nesting as **SPAN Events** — when many observations occur within a timeframe, group them in a SPAN with clear Input/Output.

## Agent Glyphs Reference

| Agent | Glyph | Example Name |
|---|---|---|
| Architect Review | 🧠 | `🧠✨ Architectural Review` |
| API Documenter | 📝 | `📝📜 API Documentation` |
| Backend Architect | ⚙️ | `⚙️🏗️ Backend Design` |
| Debugger | 🐞 | `🐞🔍 Debugging Session` |
| Mermaid Expert | 🎨 | `🎨🌊 Diagram Generation` |
| Prompt Engineer | 👨‍💻 | `👨‍💻💡 Prompt Refinement` |
| DevOps | 🛠️ | `🛠️🚨 DevOps Troubleshooting` |
| Data Scientist | 📊 | `📊🔬 Data Analysis` |

## The 20-Second Rule

After creating a trace and observations, **wait at least 20 seconds** before retrieval via session-based view. Direct retrieval via `trace_id` is not subject to this delay.

## Anti-Patterns

| Anti-Pattern | Problem |
|---|---|
| 👻 Ghost Observations | Output without input — where did it come from? |
| 👜 Overstuffed Metadata | Primary data in metadata instead of input/output fields |
| 📜 Endless Scroll | Flat list for complex task — use nesting! |
| ❄️ Snowflake IDs | Hardcoded trace_id — let system generate |
| 🔕 Silent Status | Missing level on observations |
