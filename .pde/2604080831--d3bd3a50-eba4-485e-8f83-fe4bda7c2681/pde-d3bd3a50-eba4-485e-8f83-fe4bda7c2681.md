# Prompt Decomposition

> Engine: **copilot**

## Four Directions

### 🌅 EAST — Vision

- Make llms-pde.txt the canonical, implementation-focused reference that demonstrates structured thinking with practical examples and clear navigation [95%]
- Define acceptance criteria for context7 score = 75 (which metrics or tests must pass) [70%] _(implicit)_

### 🔥 SOUTH — Analysis

- Inventory and extract implementation patterns from miaco and miadi lineage documents [90%]
- Identify concrete examples and minimal reproducible implementations to include [88%]

### 🌊 WEST — Validation

- Run context7 scoring after edits and collect reviewer feedback to validate improvements [78%]
- Peer review PR to ensure examples are practical and cross-links are navigable [82%]

### ❄️ NORTH — Action

- Edit llms-pde.txt: add implementation guidance, examples, anchor links, and TOC; commit and open PR [95%]
- Iterate based on scoring and reviewer comments until context7 score ≥ 75 [80%] _(implicit)_

## Original Prompt

> I need to upgrade our context7 score from 30 to 75 by making the llms-pde.txt a proper reference with implementation guidance drawn from miaco and miadi lineages. The score measures structured thinking organization and right now we are weak on practical examples and navigable cross-linking.

## Primary Intent

**Action:** upgrade
**Target:** context7 score from 30 to 75
**Urgency:** session
**Confidence:** 85%

## Secondary Intents

1. **rewrite** — llms-pde.txt to be a proper reference _(explicit)_
   - depends on: gather-miaco-miadi-sources
2. **extract** — implementation guidance from miaco and miadi lineages _(explicit)_
3. **add** — practical examples and runnable/implementable patterns _(explicit)_
   - depends on: rewrite llms-pde.txt / extract miaco/miadi
4. **link** — navigable cross-linking (TOC, anchors, index) between llms-pde.txt and lineage docs _(explicit)_
   - depends on: rewrite llms-pde.txt
5. **measure** — context7 scoring after changes _(implicit)_
   - depends on: all content and linking updates applied
6. **create** — pull request and review workflow for the updates _(implicit)_
   - depends on: content changes committed

## Context Requirements

### Files Needed
- llms-pde.txt
- llms-miadi-a2a-llm-guide.md
- llms-miadi-a2a-human-guide.md
- llms-coaia-fuse-guidance.md
- llms.txt
- README.md

### Tools Required
- git
- grep
- view/edit
- editor
- context7 scoring API or CLI
- pull request workflow (gh)

### Assumptions
- miaco and miadi lineages contain usable implementation guidance
- Improving structure, examples and cross-links in llms-pde.txt will raise the context7 score
- The repo owner accepts PRs and documented changes
- A reproducible context7 scoring method (API/CLI) is available

## Expected Outputs

### Artifacts
- llms-pde_examples.md
- llms-pde_toc.md

### Updates
- llms-pde.txt
- README.md (reference/link to llms-pde.txt)

### Communications
- Create PR updating llms-pde.txt with examples and cross-links
- Open issue tracking 'Raise context7 score to 75' and link reviewers
- Add commit message and Co-authored-by trailer

## Action Stack

- [ ] Gather and inventory miaco and miadi lineage documents to extract implementation guidance
- [ ] Define acceptance criteria and measurable signals for context7 score = 75
- [ ] Draft rewrite of llms-pde.txt to structure it as a reference: TOC, sections for design + implementation, and anchors for linking (depends on: Gather and inventory miaco and miadi lineage documents to extract implementation guidance)
- [ ] Add practical examples and runnable snippets drawn from lineage sources into llms-pde.txt (and create examples file if needed) (depends on: Draft rewrite of llms-pde.txt to structure it as a reference)
- [ ] Create navigable cross-links and index entries between llms-pde.txt and lineage docs (depends on: Draft rewrite of llms-pde.txt to structure it as a reference)
- [ ] Commit changes, open PR, and request targeted reviewers from miaco/miadi lineage owners (depends on: Add practical examples and runnable snippets)
- [ ] Run context7 scoring to measure improvement and collect results (depends on: Commit changes, open PR, and request targeted reviewers from miaco/miadi lineage owners)
- [ ] Iterate on content and linking based on score output and reviewer feedback until target reached (depends on: Run context7 scoring to measure improvement and collect results)

## Ambiguity Flags

- **"What exactly are 'miaco' and 'miadi' lineage authoritative sources (file paths or external links)?"**
  - Suggestion: Provide specific file names or URLs for miaco and miadi sources to extract guidance reliably
- **"How is the context7 score computed and which submetrics determine the jump from 30 to 75?"**
  - Suggestion: Share the scoring rubric, API/CLI, or test harness used by context7 so changes can be validated programmatically
- **"Are there constraints on example code format, language, licensing, or size?"**
  - Suggestion: Specify preferred languages, license compatibility, and maximum example size or runnable format
- **"Is there a deadline or required reviewers for the PR?"**
  - Suggestion: Provide timelines and target reviewers or approvers to prioritize work
