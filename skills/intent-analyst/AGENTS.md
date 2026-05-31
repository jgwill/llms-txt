# AGENTS.md - Intent Analyst Skill

## Purpose

This folder is the portable llms-txt guidance for the Intent Analyst role:
strategy-aware PDE reading before execution.

It exists so agents can understand the role without depending on one local
workspace checkout.

## Parity Relationship

Canonical guidance:

- `/workspace/repos/jgwill/llms-txt/llms-pde.txt`
- `/workspace/repos/jgwill/llms-txt/docs/prompt-decomposition.md`
- `/workspace/repos/jgwill/llms-txt/skills/intent-analyst/SKILL.md`

Local operational peer:

- `/home/mia/.openclaw/workspace/skills/miaco-decompose-pde-basic/`
- `/home/mia/.openclaw/workspace/skills/miaco-decompose-pde-basic/AGENTS.md`

The llms-txt skill should define the transferable role, strategy language, and
MCP boundary. The workspace skill should carry exact local commands, workdir
defaults, and session conventions.

## Accountability

When any of these change, check both sides:

- `miaco decompose run --help`
- supported strategies: `standard`, `iterative-refinement`, `adversarial-consensus`
- parent/child PDE flags and child-kind semantics
- mcp-pde support for strategy-aware decomposition
- issue references used in commits and follow-up work

## Related Issues

- `jgwill/llms-txt#37` - Intent Analyst skill examples
- `jgwill/llms-txt#38` - PDE strategy guidance and mcp-pde parity
- `miadisabelle/workspace-openclaw#101` - workspace skill upgrade lane
- `jgwill/mcp-pde` - MCP-standard decomposition lineage
