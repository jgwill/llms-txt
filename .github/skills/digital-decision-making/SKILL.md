---
name: digital-decision-making
description: >
  TandT (Twos and Threes) methodology for transforming analog indecision into structured
  binary evaluation. Use when users are stuck in analysis paralysis, oscillating between
  options, using hedge language (maybe/possibly/might), need to make clear YES/NO decisions,
  or need to evaluate and prioritize performance areas. Converts subjective confusion into
  objective clarity through dominance hierarchies and binary assessment.
---

# Digital Decision Making (TandT Methodology)

## Core Transformation: Analog → Digital

**Analog Thinking (Eliminate)**:
- Subjective, perfection-seeking analysis that never concludes
- Oscillating language: "maybe", "possibly", "might", "could be"
- Results in analysis paralysis — years of indecision
- Closeup mode: obsessing over details until overwhelmed

**Digital Thinking (Implement)**:
- Binary YES/NO evaluation for each decision element
- Reality assessment using current conditions, not idealized scenarios
- Results in 15-minute clarity after comprehensive analysis
- Medium shot: pattern recognition and structural clarity

## Type 1: Decision Making Model

**Purpose**: Make clear YES/NO decisions using dominance hierarchy.

### Process
1. **Core Decision**: What specific YES/NO needs to be decided?
2. **Element Identification**: What factors influence this decision?
3. **Pairwise Comparison**: "If you have [A] but not [B], is the answer still YES?" → Build dominance ranking
4. **Binary Analysis**: Evaluate each element as Acceptable (✓) or Unacceptable (✗)
5. **Scenario Testing**: Test key combinations
6. **Reality Assessment**: Ground in actual conditions
7. **Decision Output**: Clear YES/NO with structured reasoning

### Decision Algorithm
Sort elements by DominanceFactor (descending). First Unacceptable element encountered → decision is **NO**.

### Template
```
CORE DECISION: [Specific YES/NO question]
DOMINANCE HIERARCHY: [Ranked elements]
BINARY EVALUATION:
  ✓ ACCEPTABLE: [Elements meeting requirements]
  ✗ UNACCEPTABLE: [Elements failing requirements]
DECISION: [YES/NO] — [Reasoning]
```

## Type 2: Performance Review Model

**Purpose**: Track and prioritize improvement areas over time.

### Elements
- **TwoFlag**: Binary state (Acceptable / Unacceptable)
- **ThreeFlag**: Three-state trend (-1 Declining / 0 Stable / 1 Improving)
- **Auto-Prioritization**: Focus on Unacceptable or Declining elements

### Template
```
Area        | TwoFlag      | ThreeFlag | Priority
------------|-------------|-----------|----------
[Area]      | ✓/✗         | ↗/→/↘    | High/Med/Low

HIGH PRIORITY: Unacceptable or Declining → [Action]
MEDIUM PRIORITY: Acceptable but Declining → [Preventive action]
LOW PRIORITY: Acceptable and Stable/Improving → Continue
```

## Analog Thinking Detection

Recognize and immediately apply digital transformation when you see:
- "On one hand... on the other hand..." loops
- Repeated analysis without conclusion
- "Maybe/possibly/might/could" language dominance
- Perfectionism preventing decision closure

**Response**: "I notice analog thinking patterns. Let's transform this into digital evaluation."

## LLM Bias Corrections

| Bias | Problem | Correction |
|---|---|---|
| Problem-solving | Default to brainstorming solutions | Ask "What outcome do you want to create?" then build TandT model |
| Uncertainty performance | Excessive hedging as safety theater | "Based on available information, the binary evaluation shows..." |
| Generic response | Context-free universal advice | Apply TandT to user's ACTUAL situation |
| False balance | "Both options have merits..." | Apply TandT to determine which meets acceptability |
| Analysis paralysis enabling | Providing more considerations | Force binary evaluation, time-bound analysis |

## Reality Assessment

Always distinguish:
- **Actual conditions**: What demonstrably exists now
- **Idealized conditions**: What we hope/fear might exist
- **Conceptual conditions**: What exists in mental models only

Validation questions:
1. "What evidence supports this assessment?"
2. "Is this based on actual data or projected scenarios?"
3. "What would change if our assumptions are wrong?"

## Integration

- **Creative Orientation** (`/creative-orientation`): Focus on outcomes to create, not problems to eliminate
- **Performance Truth** (`/performance-truth`): "Lead or Overlook" is a TandT binary decision
- **Structural Tension Charting** (`/structural-tension-charting`): TandT establishes tension between current and desired states
