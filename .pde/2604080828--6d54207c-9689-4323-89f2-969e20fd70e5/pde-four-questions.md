# Four Questions — Structural Thinking Analysis

> Source PDE: [create] → [ceremony pipeline that ingests voice notes, transcribes, decomposes intention, classifies fragments, and routes them into the user's ecology]

## Information Questions
- [from ambiguity: "How exactly 'ecology' accepts fragments (APIs, git issues, local files, QMD collections) is unspecified"] Which concrete destination endpoints/formats must be supported (example: GitHub issues: repo/org, Todoist project ID, local path for notes, QMD collection name) and provide one example payload for each?
- [from ambiguity: "Classification approach is unspecified ('not sure how the classification works yet')"] Provide 10 labeled example transcripts (short text + correct label) showing edge cases between reflection/task/issue/seed.

## Clarification Questions
- [from intent: "classify — fragments -> categories {reflection, task, issue, seed}"] For this taxonomy, give precise definitions and decision rules (e.g., actionability, owner, deadline, required metadata) that distinguish each category.
- [from vision: "Clarify role of qmd vs other routing approaches"] What does "qmd" refer to here (QMD routing DSL, a specific tool/service, or a file/collection format), and which protocol/format does it expect?

## Implication Questions
- [from assumption: "Whisper will be used/available for transcription (user assumption)"] You seem to imply Whisper is acceptable operationally — does that require on-device/offline capability, GPU access, or cloud-hosted transcription and what privacy/retention constraints follow from that?
- [from assumption: "qmd may be useful for routing (user assumption)"] Implied: qmd will be treated as the canonical routing layer that connectors adapt to — is that correct, or must connectors support multiple routing adapters (qmd + simple rule-engine)?

## Discrepancy Questions
- [from vision: "Clarify role of qmd vs other routing approaches" ] vs [from action: "Evaluate qmd for routing vs alternative rule engine and choose integration approach (depends on: Implement classifier)"] Vision asks for early clarification of qmd while Action defers qmd evaluation until after classifier implementation — which comes first and how should early design proceed without blocking classifier work?

## Structural Picture Summary
The picture shows a clear end-to-end goal but key dependencies are underspecified: destinations, taxonomy rules, and tool constraints (Whisper/qmd). Resolve tension by first specifying concrete endpoints and taxonomy examples (so connectors and tests can be implemented), then run a short eval of transcription/routing options against those concrete examples.