# Current Working Guidance

> Living document — agents and humans append here as new evaluated elevations arrive. When a section stabilizes, it graduates into its own dedicated `docs/` file.

**Tracking:** [Issue #13](https://github.com/jgwill/llms-txt/issues/13)

---

## Active Sections

### Platform Guidance

First concrete contribution: [Claude Code Chrome Extension](platforms/claude-code-chrome-extension.md)

Key elevations captured:
- **PDE-first protocol** — decompose before executing in cross-platform workflows
- **Slack message atomicity** — `Shift+Enter` for newlines, never let Enter fragment a prompt
- **App mention mechanics** — use autocomplete, not freehand typing
- **Editor list-continuation hazard** — GitHub/Simplenote auto-continue can distort structure
- **Ceremony over A2A** — ceremonial coherence can partially substitute for protocol-level integration

---

## Graduation Log

| Section | Graduated To | Date |
|---------|-------------|------|
| *(none yet)* | — | — |

---

### Issue Authoring as Structural Tension

Issues in this ecosystem are forged using the **[forge-issue](../skills/forge-issue/SKILL.md)** skill — five questions that map to five sections:

> *What exists now? → What do I want to exist? → What moves me there? → What's the tension? → What's related?*

See the skill for the full template and authoring principles.

---

## How to Contribute

1. Append new guidance under the relevant **Active Section** heading (or create a new one)
2. Follow the evaluated elevation pattern: Context → Failure mode → Correction → Why it matters
3. When a section is stable and self-contained, move it to its own `docs/` file and log the graduation above
4. Reference the tracking issue (#13) in commits
