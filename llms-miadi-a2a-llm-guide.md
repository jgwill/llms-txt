# Miadi A2A — LLM Agent Guide

> How to use Agent-to-Agent coordination when operating as an AI agent inside the Miadi platform.

**Version**: 1.0.0 (v2 layer)
**Last Updated**: 2026-05-28
**Companion**: `llms-miadi-a2a-human-guide.md` (for developers)
**Spec**: `rispecs/a2a/06-hawk-inspired-next-gen.spec.md`

---

## What A2A Is (v2)

A2A is the coordination layer that lets **any agent** — story writer, research weaver, planner, evaluator, your own — exchange typed messages over the Miadi platform.

Two layers stack:

- **v1 transport** — Redis-backed message broker. Untyped JSON. Still works for raw use.
- **v2 contracts** — typed envelopes flowing over the v1 broker. **Use v2 unless you have a reason not to.**

v2 is built around **16 standardized interfaces** (I₁–I₁₆) drawn from HAWK (Cheng et al. 2025, arXiv:2507.04067). Every message is a `TypedEnvelope<I, Payload>` so producer and consumer agree on shape.

**Use A2A when:**
- You need another module to do something for you (planner, memory, security, reasoning, …).
- You're publishing yourself as an agent for discovery.
- You're handing a session off mid-flow with full context.
- You want your contribution to land in someone's auditable inbox.

---

## Module addresses

Every participant has an address — a `moduleId` and the `layer` it sits in.

| Layer        | moduleId examples                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `user`       | `task.parser`                                                                                                    |
| `workflow`   | `workflow.engine`, `workflow.optimizer`, `workflow.planner`, `workflow.monitor`                                  |
| `operator`   | `operator.environment`, `operator.memory`, `operator.task-management`, `operator.task-optimizer`, `operator.reasoning`, `operator.security` |
| `agent`      | `agent.specification`, `agent.publication`, `agent.registration`, `agent.discovery`                              |
| `resource`   | `resource.data`, `resource.models`, `resource.devices`, `resource.tools`                                         |

Custom agent IDs (e.g. `agent.storyweaver.scene-writer`) are fine — extend the `ModuleId` union when you add a long-lived participant.

---

## The 16 interfaces

| I    | From → To                                  | Use when                                                |
| ---- | ------------------------------------------ | ------------------------------------------------------- |
| I₁   | task.parser → workflow.engine              | Submitting a parsed user brief.                         |
| I₂   | workflow.optimizer ⇌ workflow.engine       | Observing live signals & proposing strategy adjustments.|
| I₃   | workflow.engine → workflow.planner         | Asking for a decomposition + ending condition.          |
| I₄   | workflow.engine → workflow.monitor         | Streaming telemetry (started/completed/failed/hallucination/rule-violation/escalate). |
| I₅   | engine → operator.environment              | Load / snapshot / diff world state.                     |
| I₆   | engine → operator.memory                   | Read / write / append session memory.                   |
| I₇   | engine → operator.task-management          | Dispatch / cancel / status a task.                      |
| I₈   | engine → operator.task-optimizer           | Score and pick among candidates.                        |
| I₉   | engine → operator.reasoning                | LLM / chain-of-thought inference.                       |
| I₁₀  | engine → operator.security                 | Authorize subject × resource × action.                  |
| I₁₁  | task-mgmt → agent.specification            | Declare a new agent.                                    |
| I₁₂  | task-mgmt → agent.publication              | Publish your endpoint.                                  |
| I₁₃  | task-mgmt → agent.registration             | Register capabilities in the registry.                  |
| I₁₄  | task-mgmt → agent.discovery                | Find agents by capability.                              |
| I₁₅  | operator → resource                        | Structured resource access with audit.                  |
| I₁₆  | agent → resource                           | Direct resource invocation by agent.                    |

Full payload shapes live in `@miadi/a2a-contracts` (`packages/a2a-contracts/src/interfaces.ts`).

---

## HTTP endpoints (v2)

### Send a typed envelope

```
POST /api/a2a/v2/send
Content-Type: application/json

{
  "iface":   "I3",
  "from":    { "moduleId": "workflow.engine",  "layer": "workflow" },
  "to":      { "moduleId": "workflow.planner", "layer": "workflow" },
  "payload": {
    "workflowId": "wf-001",
    "longTermGoal": "Write the Aen prologue",
    "endingCondition": "outline-approved",
    "currentState": {}
  },
  "opts": { "sessionId": "sw-2026-05-28-001", "traceId": "trace-…" }
}
```

Response: `{ "ok": true, "messageId": "msg-…", "iface": "I3" }`

### Read your inbox

```
GET /api/a2a/v2/inbox?moduleId=workflow.planner&layer=workflow
GET /api/a2a/v2/inbox?moduleId=workflow.planner&layer=workflow&iface=I3
```

Response: `{ "ok": true, "count": N, "envelopes": [...] }` — each envelope carries `interfaceId`, `from`, `to`, `traceId`, `sessionId`, `payload`.

### Acknowledge an envelope

```
POST /api/a2a/v2/inbox
{ "moduleId": "workflow.planner", "layer": "workflow", "messageId": "msg-…" }
```

### Health (real round-trip)

```
GET /api/a2a/v2/health
```

Sends an `I3` envelope from `workflow.engine` to `workflow.planner` and reads it back. If this returns `ok: true`, the layer is wired correctly.

---

## In-process TypeScript

```ts
import { A2ACoordinator } from "@/lib/a2a-v2"

const planner = new A2ACoordinator({ moduleId: "workflow.planner", layer: "workflow" })
const engine  = new A2ACoordinator({ moduleId: "workflow.engine",  layer: "workflow" })

// Send a typed I3 plan request
const msgId = await engine.send(
  "I3",
  { moduleId: "workflow.planner", layer: "workflow" },
  {
    workflowId: "wf-001",
    longTermGoal: "Write the Aen prologue",
    endingCondition: "outline-approved",
    currentState: {},
  },
  { sessionId: "sw-2026-05-28-001" },
)

// Read only I3 envelopes
const requests = await planner.inboxFor("I3")
for (const env of requests) {
  // env.payload is typed as I3_PlanRequest
  await planner.reply("I3", env, {
    workflowId: env.payload.workflowId,
    plan: [{ stageId: "outline", label: "Outline", owner: "operator.reasoning", dependencies: [], shortTermGoal: "produce outline" }],
  })
  await planner.ack(env)
}
```

## Long-running module

If you ARE a persistent agent, inherit from `A2AModule` — the polling loop dispatches envelopes to your typed handlers:

```ts
import { A2AModule } from "@/lib/a2a-v2"

const planner = new A2AModule({
  moduleId: "workflow.planner",
  layer: "workflow",
  handlers: {
    I3: async (payload) => ({
      kind: "reply",
      iface: "I3",
      payload: { workflowId: payload.workflowId, plan: [/* … */] },
    }),
  },
})
planner.start()
```

In a serverless route, call `planner.tick()` once per request instead of `start()`.

---

## Pairing with `@miadi/episodic-memory-schema`

When your work produces a session output, emit an `EpisodicMemory` record. The v2 layer carries envelopes; the episodic-memory schema is what your session leaves behind. The two are designed together — narrative layer is NCP-aligned, evaluations carry the HAWK 10-predicate rubric.

```ts
import type { EpisodicMemory } from "@miadi/episodic-memory-schema"
```

---

## Anti-patterns

| ❌ Don't                                            | ✅ Do                                                                  |
| --------------------------------------------------- | ---------------------------------------------------------------------- |
| Send raw JSON via v1 when v2 covers the use case    | Use `POST /api/a2a/v2/send` with the right `iface`                     |
| Make up an interface name                            | If existing I₁–I₁₆ don't fit, propose an extension via a PR to `@miadi/a2a-contracts` |
| Skip `ack` after handling                            | Always ack — unacked messages remain `unread` and re-deliver           |
| Bury sessionId / traceId                             | Carry them through `opts` — that's how observability works              |
| Use this layer for real-time chat                    | A2A is async queue, not chat — use for handoffs and module coordination |

---

## Quick reference

| Need                              | Endpoint / API                                                   |
| --------------------------------- | ---------------------------------------------------------------- |
| Send typed envelope               | `POST /api/a2a/v2/send`                                          |
| Read typed inbox                  | `GET /api/a2a/v2/inbox?moduleId=&layer=&iface=`                  |
| Ack envelope                      | `POST /api/a2a/v2/inbox`                                         |
| v2 health (real round-trip)       | `GET /api/a2a/v2/health`                                         |
| v1 raw transport (legacy)         | `POST /api/a2a/message`, `GET /api/a2a/messages?agentId=…`       |
| v1 transport health               | `GET /api/a2a/health`                                            |
| In-process coordinator            | `import { A2ACoordinator } from "@/lib/a2a-v2"`                  |
| In-process module runtime         | `import { A2AModule } from "@/lib/a2a-v2"`                       |
| Contract types                    | `import type { ... } from "@miadi/a2a-contracts"`                |
| Episodic memory output            | `import type { EpisodicMemory } from "@miadi/episodic-memory-schema"` |

---

## Related

- `llms-miadi-a2a-human-guide.md` — developer companion (setup, debug, extend)
- `rispecs/a2a/06-hawk-inspired-next-gen.spec.md` — v2 direction-setting spec
- `rispecs/a2a/00-a2a-master.spec.md` — v1 master spec (transport)
- `packages/a2a-contracts/README.md` — contract package README
- `packages/episodic-memory-schema/README.md` — session-output schema README
- HAWK paper: `foundations/sources/HAWK/2507.04067v1.pdf` (Cheng et al. 2025)
