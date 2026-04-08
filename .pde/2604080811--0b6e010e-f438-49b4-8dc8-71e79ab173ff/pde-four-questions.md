# Four Questions — Structural Thinking Analysis

> Source PDE: [integrate] → [structural thinking four questions into PDE decompositions]

## Information Questions
- [from ambiguity: "'Exact phrasing and canonical list of the 'structural thinking four questions' is not provided'"] What is the exact canonical wording (4 items) to embed—provide the verbatim text to be used in templates?
- [from ambiguity: "'Format and storage of PDE decompositions/templates is unspecified (file format, template engine, location)'"] Where exactly do PDE templates live (repo path) and what file format/template engine should be edited?
- [from ambiguity: "'What counts as 'actionable inquiry' (required fields like owner, due date, next step) is not defined'"] What minimal fields and data types constitute an "actionable inquiry" (required vs optional)?
- [from Context Requirements: "Files Needed ... PDE templates (e.g., .pde templates or PDE_TEMPLATES.md)"] Which existing decomposition examples and template files should be used as authoritative inputs for authoring changes?
- [from Expected Outputs: "pde-four-questions-checklist.md"] What exact filename(s) and repository location should generated artifacts live in?
- [from Action Stack: "Run a pilot with practitioners, collect feedback and measure gating effectiveness"] What measurable success criteria and sample size/timebox define a successful pilot?

## Clarification Questions
- [from action: "Clarify the desired outcome: convert every ambiguity into a named inquiry task before SOUTH"] In this context, does "convert every ambiguity" mean every flagged ambiguity (automated) or every human-noted ambiguous phrase (manual)?
- [from assumption: "A SOUTH planning phase exists and is a distinct gating phase in the PDE workflow"] Confirm whether SOUTH is a formal, enforced gating stage in the current workflow or a conceptual phase to be created.
- [from ambiguity: "'What counts as 'actionable inquiry' ... is not defined'"] Does "owner" mean a specific individual (GitHub handle) or a role/team (e.g., "PDE-practitioner")?
- [from tools: "optional PDE engine or script for pre-SOUTH validation"] Is pre-SOUTH validation intended to be an automated hook (script/CI) or a human checklist step?

## Implication Questions
- [from Secondary Intents: "pilot — run a pilot on live PDE decompositions and collect practitioner feedback _(implicit)_"] It implies a pilot will proceed without additional gating or policy approval; is it intended that the pilot run immediately on live decompositions, or must formal approval/stakeholder sign-off occur first?
- [from assumption: "The 'structural thinking four questions' are a known, reusable set (but exact phrasing may need confirmation)"] It implies consensus exists about adopting an external canonical phrasing; should the team accept an external canonical source, or must we craft a repo-specific phrasing through consensus?
- [from South: "Design prompts that reliably surface missing assumptions, stakeholders, and unknowns"] It implies prompts can "reliably" surface assumptions automatically; is full automation expected, or is the goal semi-automated prompts that require practitioner judgment?

## Discrepancy Questions
- [from action: "Clarify the desired outcome: convert every ambiguity into a named inquiry task before SOUTH"] vs [from Action Stack: "Run a pilot ... collect feedback, iterate, then merge changes"] Strict pre-SOUTH gating (no planning until all ambiguities are named) conflicts with piloting iterative changes—should gating be absolute for production workflows while pilot runs use an exception path, or how should strict gating coexist with iterative piloting?
- [from West: "Define acceptance criteria that mark an ambiguity as 'actionable inquiry' (owner, question, next step)"] vs [from ambiguity: "'What counts as 'actionable inquiry' ... is not defined'"] The plan both requires and lacks a definition—who has authority to set the acceptance criteria (product owners, PDE maintainers, or a working group) and what process resolves that definitional gap?

## Structural Picture Summary
The PDE envisions a strict upstream gate that turns every ambiguity into a named, owned inquiry before SOUTH, but key operational details are missing: canonical phrasing, template locations, precise "actionable inquiry" fields, and whether validation is automated. Resolution moves toward first agreeing canonical wording and deterministic acceptance criteria, then mapping those into templates and a short controlled pilot to validate the gate.