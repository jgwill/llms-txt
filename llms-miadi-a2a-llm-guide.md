# Miadi A2A — LLM Agent Guide

> How to use Agent-to-Agent communication when operating as an AI agent within the Miadi platform.

**Version**: 0.2.0
**Last Updated**: 2026-03-03
**Companion**: `llms/llms-miadi-a2a-human-guide.md` (for developers)

---

## What A2A Is

A2A (Agent-to-Agent) is a Redis-backed message queue that lets agents communicate asynchronously. Each agent has an inbox (Redis list). Messages are JSON objects with metadata (from, to, type, payload). All interactions are traced via a shared `traceId`.

**You use A2A when:**
- You need to hand off work to another agent
- You receive context from a parent session (newsessionuuid pattern)
- You want your work to be traceable across session boundaries

---

## API Endpoints

### Send a Message

```
POST /api/a2a/message
Content-Type: application/json

{
  "from": "your-agent-id",
  "to": "recipient-agent-id",
  "type": "analysis_complete",
  "payload": { "result": "...", "recommendations": [...] },
  "traceId": "optional-trace-id"
}
```

**Response**: `{ "success": true, "message": { "id": "msg-xxx", ... } }`

### Receive Messages

```
GET /api/a2a/messages?agentId=your-agent-id
```

**Response**: `{ "agentId": "...", "count": N, "messages": [...] }`

Only returns **unread** messages. After processing, mark as read:

```
PATCH /api/a2a/messages?messageId=msg-xxx
```

### Check System Health

```
GET /api/a2a/health
```

---

## Message Types

| Type | When to Use |
|------|-------------|
| `analysis_complete` | After finishing analysis work |
| `session_inheritance` | Parent→child session handoff |
| `flow_result` | Flowise flow completed |
| `reflection_complete` | After reflection/validation phase |
| `greeting` | Initial contact between agents |

You may define custom types. Keep them lowercase_snake_case.

---

## TypeScript Usage (if running in-process)

```typescript
import { sendMessage, getMessages, markMessageAsRead } from "@/lib/a2a-message-broker"
import { initializeTrace, logAgentStart, logAgentComplete,
         logMessageSend, logMessageReceive, logTraceComplete } from "@/lib/a2a-tracer"

// Full workflow
const traceId = `a2a-${crypto.randomUUID()}`
initializeTrace(traceId, "my-agent")

logAgentStart(traceId, "my-agent", "analysis", "Analyze beat tensions")
const result = await doWork()
logAgentComplete(traceId, "my-agent", result)

const msg = await sendMessage("my-agent", "next-agent", "analysis_complete", result)
logMessageSend(traceId, "my-agent", "next-agent", "analysis_complete", result)
```

---

## Session Inheritance Pattern

When you are a child session spawned by newsessionuuid:

1. **Check for inherited messages**: `GET /api/a2a/messages?agentId={your-session-id}`
2. **Process any `session_inheritance` messages** — these contain parent's narrative context
3. **Continue the trace**: Use the parent's `traceId` from the message payload
4. **Mark as read** after processing

---

## Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|------|
| Send messages with no `type` | Always specify a meaningful message type |
| Store large payloads (>10KB) in messages | Store large data in Redis, send key in payload |
| Forget to mark messages as read | Always call PATCH after processing |
| Use messages for real-time chat | A2A is async queue, not chat — use for handoffs |
| Ignore traceId | Include traceId for observability |

---

## Redis Key Schema

```
agent:message:{messageId}        → Full message object (24h TTL)
agent:messages:{agentId}:queue   → List of message IDs (LPUSH/LRANGE)
```

---

## Trace Log Format

All traces written to `TRACE_LOG_PATH` (default: `/src/logs.miadi.log`):

```json
{"ts":"2026-03-03T18:30:00Z","label":"a2a.{traceId}.agent.start","data":{"agentId":"...","task":"..."}}
{"ts":"2026-03-03T18:30:01Z","label":"a2a.{traceId}.message.send","data":{"from":"...","to":"..."}}
```

Filter: `grep "a2a.{traceId}" /src/logs.miadi.log`

---

## Quick Reference

| Need | Endpoint/Function |
|------|------------------|
| Send message | `POST /api/a2a/message` or `sendMessage()` |
| Get messages | `GET /api/a2a/messages?agentId=X` or `getMessages()` |
| Mark read | `PATCH /api/a2a/messages?messageId=X` or `markMessageAsRead()` |
| Clear queue | `DELETE /api/a2a/messages?agentId=X` or `clearMessages()` |
| Health check | `GET /api/a2a/health` |
| Demo flow | `POST /api/a2a-test` |

---

## Related Files

- `A2A_QUICK_START.md` — Practical quickstart
- `ARCHITECTURE_A2A_UNIFIED_VISION.md` — Architecture vision
- `llms/llms-miadi-a2a-human-guide.md` — Developer companion guide
- `rispecs/edgehub-ava/agent-system/STATUS.md` — RISE framework status
