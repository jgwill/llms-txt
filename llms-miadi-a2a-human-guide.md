# Miadi A2A — Developer Guide

> How to set up, extend, and debug the Agent-to-Agent coordination layer in the Miadi platform.

**Version**: 1.1.0 (v2 contract layer)
**Last Updated**: 2026-06-03
**Companion**: `llms-miadi-a2a-llm-guide.md` (for AI agents)
**Spec**: `rispecs/a2a/06-hawk-inspired-next-gen.spec.md`

---

## Overview

A2A is the coordination plane every Miadi agent — narrative agents, planners, evaluators, storage modules, your own — uses to exchange typed messages. 

| Layer | Job | Code path |
| --- | --- | --- |
| **v2 contracts**  | Wrap every message in a typed envelope keyed by a HAWK interface (I₁–I₁₆). | `lib/a2a-v2/*`, `app/api/a2a/v2/*`, `@miadi/a2a-contracts` |

**Miadi A2A is contract-driven.** It provides compile-time payload safety and a stable contract that any agent runtime can target. Every message is a `TypedEnvelope<I, Payload>` flowing through standardized interfaces.

When to point an LLM at the companion guide: any session where an AI agent needs to send / receive messages or coordinate with another module.

---

## Setup

### Prerequisites
- Node.js 18+ (tested on 22)
- Upstash Redis configured in `.env`:
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
- Dev server: `pnpm dev` (port 3335)

### Verify it works

```bash
# v2 layer end-to-end (round-trips a real typed envelope through the coordination plane)
curl -s http://localhost:3335/api/a2a/v2/health | jq

# Offline verification (no server needed, exercises contracts + transport directly)
set -a && source .env && set +a && node scripts/verify-a2a-v2.mjs
```

Expected: 4 contract checks + 3 live round-trip checks all pass.

---

## Architecture

```
                                ┌─────────────────────────────────────────┐
                                │     @miadi/a2a-contracts (npm)          │
                                │     16 typed interfaces · envelope      │
                                └─────────────────────────────────────────┘
                                              ▲       ▲
                                              │       │
                  ┌───────────────────────────┘       └──────────────────────┐
                  │                                                          │
        ┌─────────────────┐        POST /api/a2a/v2/send            ┌─────────────────┐
        │   any module    │ ─────────────────────────────────────→  │  coordinator    │
        │  (engine, etc)  │                                          │ lib/a2a-v2/*    │
        └─────────────────┘                                          └────────┬────────┘
                  ▲              GET /api/a2a/v2/inbox                       │
                  │ ─────────────────────────────────────                    │
                  │                                                          ▼
                  │                                                ┌──────────────────┐
                  │                                                │  Redis Transport │
                  └────────────────────────────────────────────────│    Substrate     │
                                                                   └──────────────────┘
```

Tracing: every send/ack/drain hits `lib/tracer.ts` → `TRACE_LOG_PATH` (default `/src/logs.miadi.log`).

### File map

| File                                     | Purpose                                                |
| ---------------------------------------- | ------------------------------------------------------ |
| `packages/a2a-contracts/`                | The 16 typed interfaces + envelope (npm-published).    |
| `packages/episodic-memory-schema/`       | Session-output schema (npm-published, pairs with A2A). |
| `lib/a2a-v2/coordinator.ts`              | Typed send / inbox / reply / ack.                      |
| `lib/a2a-v2/module.ts`                   | Base class for long-running modules.                   |
| `lib/a2a-v2/index.ts`                    | Public surface.                                        |
| `app/api/a2a/v2/send/route.ts`           | POST — send typed envelope.                            |
| `app/api/a2a/v2/inbox/route.ts`          | GET inbox / POST ack.                                  |
| `app/api/a2a/v2/health/route.ts`         | GET — end-to-end round-trip health.                    |
| `scripts/verify-a2a-v2.mjs`              | Standalone verification (no dev server required).      |

---

## v2 API quick reference

### Send a typed envelope

```bash
curl -X POST http://localhost:3335/api/a2a/v2/send \
  -H 'Content-Type: application/json' \
  -d '{
    "iface":   "I3",
    "from":    { "moduleId": "workflow.engine",  "layer": "workflow" },
    "to":      { "moduleId": "workflow.planner", "layer": "workflow" },
    "payload": {
      "workflowId": "wf-001",
      "longTermGoal": "Write Aen prologue",
      "endingCondition": "outline-approved",
      "currentState": {}
    },
    "opts": { "sessionId": "sw-2026-05-28-001" }
  }'
```

### Read an inbox (optionally narrowed to one interface)

```bash
curl "http://localhost:3335/api/a2a/v2/inbox?moduleId=workflow.planner&layer=workflow"
curl "http://localhost:3335/api/a2a/v2/inbox?moduleId=workflow.planner&layer=workflow&iface=I3"
```

### Ack an envelope

```bash
curl -X POST http://localhost:3335/api/a2a/v2/inbox \
  -H 'Content-Type: application/json' \
  -d '{ "moduleId": "workflow.planner", "layer": "workflow", "messageId": "msg-…" }'
```

### Health (real round-trip)

```bash
curl http://localhost:3335/api/a2a/v2/health | jq
```

---

## Extending A2A

### Add a long-running module

Modules inherit from `A2AModule` and register typed handlers. The runtime loop polls inbox and dispatches per interface.

```ts
import { A2AModule } from "@/lib/a2a-v2"

const memory = new A2AModule({
  moduleId: "operator.memory",
  layer: "operator",
  handlers: {
    I6: async (payload) => {
      if (payload.op === "read")  return { kind: "reply", iface: "I6", payload: { workflowId: payload.workflowId, key: payload.key, value: store.get(payload.key) } }
      if (payload.op === "write") { store.set(payload.key, payload.value); return { kind: "reply", iface: "I6", payload: { workflowId: payload.workflowId, key: payload.key } } }
      return { kind: "ignore" }
    },
  },
  pollIntervalMs: 250,
  onError: (err, env) => console.error("memory handler threw", env.messageId, err),
})

memory.start()
```

In serverless / Next.js route handlers, call `memory.tick()` once per request instead of `start()`.

### Add a new interface

If a coordination need doesn't fit I₁–I₁₆ cleanly, open a PR to `@miadi/a2a-contracts`:

1. Add the `Request` / `Response` types to `src/interfaces.ts`.
2. Append the pair to `InterfacePayloads`.
3. Bump minor version, build, publish.
4. Update the table in this guide and in the LLM guide.

### Add session inheritance

```ts
import { A2ACoordinator } from "@/lib/a2a-v2"
import type { I6_MemoryRequest } from "@miadi/a2a-contracts"

const parent = new A2ACoordinator({ moduleId: "workflow.engine", layer: "workflow" })

// Stash parent context in the memory module
const req: I6_MemoryRequest = {
  workflowId: parentWorkflowId,
  stageId: "session-inheritance",
  op: "write",
  key: `session:${childSessionId}:inheritance`,
  value: { parentSessionId, narrativeContext, traceId },
}
await parent.send("I6", { moduleId: "operator.memory", layer: "operator" }, req, { sessionId: childSessionId })

// Child later reads it via the same I6 contract
```

---

## Debugging

### Tail trace logs

```bash
# All v2 traffic
tail -f /src/logs.miadi.log | grep "a2a\.v2"

# Specific trace
grep "trace-xyz" /src/logs.miadi.log | jq .

# All sends
grep "a2a.v2.send" /src/logs.miadi.log | jq .
```

### Inspect Redis directly

```bash
# An agent's inbox (list of messageIds)
redis-cli -u $KV_REST_API_URL LRANGE agent:messages:workflow.planner:queue 0 -1

# A specific message
redis-cli -u $KV_REST_API_URL GET agent:message:msg-xxx
```

### Common issues

| Symptom                               | Cause                                                 | Fix                                                                  |
| ------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `inboxFor(...)` empty                 | Wrong moduleId / layer, OR consumer already acked     | Confirm address; re-send if test                                     |
| 500 from `/api/a2a/v2/send`           | Env vars missing                                       | `set -a && source .env && set +a`                                    |
| Type-check fails on `@miadi/...`       | tsconfig path mapping missing                          | `tsconfig.json` has `paths['@miadi/a2a-contracts']` → packages/      |
| `ERR_MODULE_NOT_FOUND` in Node script | Compiled imports lack `.js`                            | Use v0.1.1+ of the packages (source uses `.js` suffix)               |

---

## Giving this to an LLM

When starting a session where an AI agent needs A2A:

1. **Point it at**: `llms/llms-miadi-a2a-llm-guide.md`
2. **Tell it its module address**: e.g. *"Your moduleId is `agent.storyweaver.scene-writer`, layer `agent`."*
3. **Tell it which interface(s) it serves**: e.g. *"Handle I₁₆ from the resource layer."*
4. **Provide a sessionId / traceId**: so its work shows up in the right trace.

Example prompt addition:

```
You have access to the Miadi A2A coordination layer.
See llms/llms-miadi-a2a-llm-guide.md for the full reference.
Your module address: { moduleId: "agent.storyweaver.scene-writer", layer: "agent" }
You receive I7 dispatches and respond with output that the engine will route to the line editor.
Use POST /api/a2a/v2/send and GET /api/a2a/v2/inbox.
sessionId: sw-2026-05-28-001
```

---

## Provenance

- HAWK paper: `foundations/sources/HAWK/2507.04067v1.pdf` (Cheng et al. 2025, arXiv:2507.04067). Registered in `foundations/source-ledger.yaml` as `mas.cheng-2025-hawk`.
- Companion published packages: `@miadi/a2a-contracts`, `@miadi/episodic-memory-schema` (npm, MIT).
- v2 direction-setting spec: `rispecs/a2a/06-hawk-inspired-next-gen.spec.md`.

---

## Related

- `llms-miadi-a2a-llm-guide.md` — the LLM-facing reference.
- `packages/a2a-contracts/README.md` — contract package README.
- `packages/episodic-memory-schema/README.md` — session-output schema README.
- `app/docs/miadi-agent/storyweaver/` — narrative use-case wired against the schema.
