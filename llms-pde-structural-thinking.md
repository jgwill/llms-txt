# PDE → Structural Thinking: From Decomposition to Inquiry

> When PDE surfaces ambiguities at EAST (vision), the Four Questions transform them into structured inquiry at SOUTH (analysis/planning). This guidance establishes that bridge — the practice of turning decomposed intentions into questions that advance understanding before action begins.

**Version**: 0.1
**Document ID**: llms-pde-structural-thinking-v0.1
**Last Updated**: 2025-07-14
**Content Source**: Derived from practical integration of `llms-pde.txt` and `llms-st-four-questions.md` in miaco CLI.

---

## 1. The Bridge

PDE decomposes a complex prompt into intents, ambiguities, and an action stack mapped to Four Directions. But decomposition alone is not enough — the ambiguities it surfaces are raw material, not yet inquiry.

Structural Thinking's Four Questions (`llms-st-four-questions.md`) provide the discipline to transform that raw material:

| PDE Output | Question Type | What It Produces |
|------------|--------------|------------------|
| Vague intents (low confidence) | **Information** | Specific details that make the picture concrete |
| Terms used without definition | **Clarification** | The speaker's specific meaning — answer should not change the existing picture |
| Hedging language ("I assume", "probably") | **Implication** | What is implied but not stated — verified with the speaker |
| Contradictory intents or conflicting assumptions | **Discrepancy** | Where underlying structure may need to change |

## 2. The Flow

```
EAST (PDE Decompose)
  │
  ├── ambiguities[]
  ├── secondary intents (implicit, low confidence)
  ├── assumptions[]
  │
  ▼
EAST→SOUTH Bridge (Four Questions Generation)
  │
  ├── Information questions   ← from vague picture areas
  ├── Clarification questions ← from undefined terms
  ├── Implication questions   ← from hedging/implicit intents
  ├── Discrepancy questions   ← from contradictions
  │
  ▼
SOUTH (Planning with enriched understanding)
```

## 3. Practice

### Input: A PDE decomposition (`.pde/<timestamp>--<uuid>/pde-<uuid>.md`)

The Four Questions generator reads the decomposition and applies Step 2 (Picture What Is Said) to build a mental picture from the intents, then Step 3 (Ask Questions) to generate questions **only from that picture** — not from external frameworks.

### Output: `pde-four-questions.md` alongside the PDE files

```markdown
## Information Questions
- [from ambiguity: "score metric unclear"] What specific metric does "score" refer to — context7 benchmark, CI coverage, or something else?

## Clarification Questions  
- [from intent: "enhance structural thinking"] When you say "structural thinking" in this context, do you mean the Robert Fritz methodology specifically, or the broader practice of decomposition?

## Implication Questions
- [from assumption: "miadi storage may differ"] You seem to assume miadi and miaco share the same .pde/ folder convention — is that verified, or is alignment needed?

## Discrepancy Questions
- [from conflicting intents] The decomposition asks for both "no full implementation" and "concrete prototypes" — which takes priority for this session?
```

### Critical Discipline

Questions arise **only from the PDE picture** — not from external models, not from "what we think should be asked." If the PDE decomposition is clear on a point, no question is needed there. If it is vague, that vagueness itself motivates the question.

## 4. Relation to Inquiry Routing

When enriched with knowledge base search (e.g., `qmd search` on decomposed facets), the Four Questions operate on a richer picture. The inquiry-decompose step discovers relevant content that the original prompt couldn't find alone. The Four Questions then work with discovered knowledge, not just the user's original words.

---

## Related

- [llms-pde.txt](llms-pde.txt) — Prompt Decomposition Engine (the EAST practice)
- [llms-st-four-questions.md](llms-st-four-questions.md) — The Four Question Types (the inquiry discipline)
- [llms-structural-thinking.txt](llms-structural-thinking.txt) — Parent structural thinking framework
- [llms-ceremony-pipeline.md](llms-ceremony-pipeline.md) — The 8-phase pipeline (PDE is Phase 3)
- [llms-inquiry-routing.md](llms-inquiry-routing.md) — Routing from PDE to inquiry
