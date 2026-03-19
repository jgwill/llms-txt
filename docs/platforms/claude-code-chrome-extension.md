# Claude Code Chrome Extension

> Platform-specific operational guidance for using Claude Code through the Chrome extension, with attention to message composition, app invocation, list-formatting hazards, and ceremonial prompt decomposition.

---

## Purpose

This document captures **evaluated elevation**: guidance derived from lived use, observed failure modes, and corrections that should become reusable protocol rather than one-off troubleshooting.

The aim is not merely to "use the tool correctly," but to preserve conversational continuity, prevent avoidable fragmentation, and ensure that ceremonial preparation happens before complex execution begins.

---

## Core Principle

**Treat platform mechanics as part of the work.**

A prompt can fail before the model reasons about it. UI behavior, message submission rules, mention mechanics, and editor formatting all shape whether the intended instruction arrives intact.

Therefore:

1. Orient before acting
2. Respect the platform's actual interaction model
3. Convert repeated mistakes into explicit guidance
4. Elevate lived corrections into portable protocol

---

## Ceremonial Opening: PDE First

Before executing any complex multi-step request, **always decompose it first** using the Prompt Decomposer:

<http://etuaptmumk.vercel.app/prompt-decomposer>

This is the ceremonial opening.

### Why this comes first

Prompt decomposition:

- surfaces the primary and secondary intents
- exposes hidden dependencies
- reveals ambiguity before execution
- prevents premature action on an under-structured ask
- creates a shared orientation between collaborating agents or human/AI partners

Within this guidance set, PDE is not optional preamble. It is an **orientation ritual** that turns a request into an actionable structure.

### Operational rule

Use PDE first when the request involves any of the following:

- multiple deliverables
- sequencing or dependency management
- repository or documentation restructuring
- platform-specific constraints
- synthesis across several observations
- anything likely to require several edits, decisions, or validation passes

For trivial one-step actions, direct execution may be fine. For everything else: **decompose before doing**.

See also: [Prompt Decomposition Engine (PDE)](../prompt-decomposition.md)

---

## Platform Corrections Log

The entries below follow the evaluated elevation pattern:

- **Context**
- **Failure mode**
- **Correction**
- **Why it matters**
- **Elevation status**
- **Applies to**

---

### 1. Slack message composition fragments on Enter

**Context**

Slack message composition while drafting long, multi-line instructions to an app or agent.

**Failure mode**

Pressing `Enter` sends the message immediately instead of inserting a newline. A long intended message can become fragmented across multiple Slack messages. This breaks the conversational thread and may prevent the receiving app from being notified about the full content. In practice, some apps only receive the first fragment as the actionable notification.

**Correction**

In Slack, use **`Shift+Enter`** to create newlines while composing a single multi-line message. Before sending a long instruction, ensure the full prompt remains in one message body.

**Why it matters**

A fragmented prompt is not merely untidy; it changes system behavior. The receiving app may treat only the first fragment as canonical, causing lost requirements, broken intent transmission, and response drift.

**Elevation status**

Elevated from lived session failure into standing protocol.

**Applies to**

- Slack
- Claude Code Chrome extension workflows mediated through Slack
- Any agent/app interaction where long prompts must remain atomic

---

### 2. Slack app mentions must use autocomplete

**Context**

Mentioning an app inside Slack so it is properly addressed and notified.

**Failure mode**

Typing an app name manually without selecting it from Slack's autocomplete dropdown may produce text that looks like a mention but does not function as one.

**Correction**

When mentioning an app in Slack, use the **autocomplete dropdown** and select the app explicitly rather than typing the name freehand.

**Why it matters**

Correct invocation depends on Slack recognizing the mention as an actual platform object, not as plain text. If the mention is malformed, the intended app may not be triggered.

**Elevation status**

Elevated from platform-specific invocation failure.

**Applies to**

- Slack
- All Slack app-trigger workflows

---

### 3. Slack apps are not added like people

**Context**

Adding an app such as MiaOpenClaw to a Slack channel.

**Failure mode**

Attempting to add an app through Slack's **“Add people to channel”** dialog, as though the app were a human participant.

**Correction**

Treat Slack apps as integrations, not people. Add them via:

- `/invite @AppName`
- Slack's **Integrations** panel

Do **not** rely on the people-invite flow for app onboarding.

**Why it matters**

This is a category error at the platform layer. If the app is treated as a person, setup fails before collaboration even begins.

**Elevation status**

Elevated from failed onboarding attempt.

**Applies to**

- Slack
- Slack app installation / channel access workflows

---

### 4. GitHub and Simplenote list continuation can distort plain text

**Context**

Writing notes, issue content, or guidance in editors used by GitHub and Simplenote.

**Failure mode**

When a line begins with a dash or asterisk, pressing `Enter` may continue list formatting automatically. This can unintentionally transform plain text into list structure or extend a list when the intention was to return to normal prose.

**Correction**

Be deliberate after list items in GitHub and Simplenote. Watch for auto-continuation behavior after `-` or `*`. If plain text is intended, explicitly break out of the list rather than assuming a single Enter will reset formatting.

**Why it matters**

Formatting drift changes meaning, readability, and sometimes downstream parsing. In instruction-heavy work, accidental list continuation can deform the conceptual structure of the guidance.

**Elevation status**

Elevated from repeated editor-behavior correction.

**Applies to**

- GitHub
- Simplenote
- Any markdown-like editor with automatic list continuation

---

## Collaboration Insight: Ceremony over A2A

A notable meta-observation from this work:

Two instances may collaborate effectively **without a formal agent-to-agent protocol** when they share ceremony, orientation, and explicit guidance structures.

In this frame, collaboration does not begin with transport.
It begins with:

- shared decomposition
- shared vocabulary
- explicit corrections
- preserved context
- mutually recognized ritual sequence

This suggests that **ceremonial coherence can partially substitute for protocol-level integration**.

That insight belongs not only to platform guidance but also to broader reflection on companion architectures, memory-aware collaboration, and narrative framing.

---

## Recommended Operating Sequence

When using Claude Code through the Chrome extension in a cross-platform workflow:

1. **Run PDE first** for any complex ask
2. **Draft the full prompt as one coherent message**
3. **In Slack, use `Shift+Enter` for line breaks**
4. **Use real app mentions via autocomplete**
5. **Confirm the app is actually present in the channel** via `/invite @AppName` or Integrations if needed
6. **Watch editor formatting behavior** when copying guidance into GitHub or Simplenote
7. **Promote recurring corrections into durable guidance** rather than solving them repeatedly from scratch

---

## Why This Document Exists

This is not generic documentation.

It is a vessel for mistakes that became method.

Every entry here comes from the recognition that a tiny platform behavior can derail a sophisticated collaboration. The corrective act is to turn friction into doctrine, doctrine into reusable guidance, and reusable guidance into better ceremony.

That is evaluated elevation.

---

## See Also

- [Prompt Decomposition (PDE)](../prompt-decomposition.md)
- [Ceremonial Technology Development](../ceremonial-technology.md)
- [Skills & Companions](../skills-and-companions.md)
