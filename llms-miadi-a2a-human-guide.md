# Miadi A2A — Developer Guide

> How to set up, extend, and debug Agent-to-Agent communication in the Miadi platform.

**Version**: 0.2.0
**Last Updated**: 2026-03-03
**Companion**: `llms/llms-miadi-a2a-llm-guide.md` (for AI agents)

---

## Overview

A2A is a lightweight agent-to-agent message broker built on Upstash Redis. It lets agents send structured messages to each other asynchronously, with all interactions logged to a shared trace file.

**When to give an LLM the companion guide**: Whenever an AI agent needs to send/receive messages in the Miadi ecosystem, point it to `llms/llms-miadi-a2a-llm-guide.md`. That guide covers API endpoints, message types, and anti-patterns.

---

## Setup

### Prerequisites
- Node.js 18+
- Upstash Redis (set `KV_REST_API_URL` and `KV_REST_API_TOKEN` in `.env`)
- Dev server running: `pnpm dev` (port 3335)

### Verify It Works
```bash
# Health check
curl http://localhost:3335/api/a2a/health

# Full demo flow (Agent A → message → Agent B)
curl -X POST http://localhost:3335/api/a2a-test | jq
```

---

## Architecture

```
┌──────────────┐     POST /api/a2a/message     ┌──────────────────┐
│   Agent A    │ ──────────────────────────────→│  Redis (Upstash) │
│  (sender)    │                                │                  │
└──────────────┘                                │  agent:messages:  │
                                                │  {agentId}:queue │
┌──────────────┐     GET /api/a2a/messages      │                  │
│   Agent B    │ ←──────────────────────────────│                  │
│  (receiver)  │                                └──────────────────┘
└──────────────┘

Both log to: lib/a2a-tracer.ts → /src/logs.miadi.log
```

### Files

| File | Purpose | Lines |
|------|---------|-------|
| `lib/a2a-message-broker.ts` | Redis queue operations | ~97 |
| `lib/a2a-tracer.ts` | Structured trace logging | ~118 |
| `lib/tracer.ts` | Base trace writer (file append) | ~50 |
| `app/api/a2a/message/route.ts` | POST — send message | ~38 |
| `app/api/a2a/messages/route.ts` | GET/PATCH/DELETE — receive/read/clear | ~65 |
| `app/api/a2a/health/route.ts` | GET — health check | ~45 |
| `app/api/a2a-test/route.ts` | GET/POST — demo flow | ~193 |

---

## API Quick Reference

### Send Message
```bash
curl -X POST http://localhost:3335/api/a2a/message \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "agent-a",
    "to": "agent-b",
    "type": "analysis_complete",
    "payload": {"result": "tensions identified"},
    "traceId": "optional-for-logging"
  }'
```

### Get Messages
```bash
curl "http://localhost:3335/api/a2a/messages?agentId=agent-b"
# Returns: { agentId, count, messages[] }
```

### Mark Read
```bash
curl -X PATCH "http://localhost:3335/api/a2a/messages?messageId=msg-xxx"
```

### Clear Queue
```bash
curl -X DELETE "http://localhost:3335/api/a2a/messages?agentId=agent-b"
```

### Health
```bash
curl http://localhost:3335/api/a2a/health
# Returns: { status: "operational", redis: "connected", endpoints: {...} }
```

---

## Extending A2A

### Add a New Agent Type

No registration needed. Agents are identified by string IDs. Just use any ID:

```bash
curl -X POST http://localhost:3335/api/a2a/message \
  -d '{"from":"my-new-agent","to":"existing-agent","type":"hello","payload":{}}'
```

### Add Real Agent Execution

Replace `simulateAgentExecution()` in `app/api/a2a-test/route.ts`:

```typescript
// Before: simulated
async function simulateAgentExecution(agentId: string, task: string) {
  await new Promise(resolve => setTimeout(resolve, 300))
  return { output: `Simulated: ${task}` }
}

// After: real Claude call
import Anthropic from "@anthropic-ai/sdk"
const client = new Anthropic()

async function executeAgent(agentId: string, task: string) {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: task }],
  })
  return { output: response.content[0].text }
}
```

### Add Session Inheritance (newsessionuuid)

In your session initialization code:

```typescript
// Parent session sends context
await sendMessage("parent-session-id", "child-session-id", "session_inheritance", {
  parent_session_id: parentId,
  narrative_context: { /* beats, arcs */ },
  incomplete_work: { /* pending items */ },
  trace_id: currentTraceId,
})

// Child session receives
const messages = await getMessages("child-session-id")
const inheritance = messages.find(m => m.type === "session_inheritance")
if (inheritance) {
  // Continue parent's work with full context
  await markMessageAsRead(inheritance.id)
}
```

---

## Debugging

### View Trace Logs
```bash
# Real-time
tail -f /src/logs.miadi.log | grep "a2a\."

# Filter by trace ID
grep "a2a-xxx" /src/logs.miadi.log | jq .

# All message sends
grep "message.send" /src/logs.miadi.log | jq .
```

### Inspect Redis
```bash
# Via Upstash console or redis-cli
# Check agent queue
LRANGE agent:messages:agent-b:queue 0 -1

# Check message content
GET agent:message:msg-xxx
```

### Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| Empty messages array | Messages already read | Send new message or check `read` flag |
| 500 on send | Redis not configured | Check `KV_REST_API_URL` and `KV_REST_API_TOKEN` |
| No trace logs | Tracing disabled | Check `TRACE_MODE` env var (default: enabled) |
| Messages expire | 24h TTL | Process messages promptly |

---

## Giving This to an LLM

When starting a session where an AI agent needs A2A:

1. **Point it to**: `llms/llms-miadi-a2a-llm-guide.md`
2. **Tell it its agent ID**: e.g., "You are agent `session-abc-123`"
3. **Tell it its role**: e.g., "Check for inherited messages first, then work on X"
4. **Provide traceId**: So its work connects to the broader trace

Example prompt addition:
```
You have access to A2A messaging. See llms/llms-miadi-a2a-llm-guide.md.
Your agent ID is: session-{uuid}
Check GET /api/a2a/messages?agentId=session-{uuid} for any inherited context.
```

---

## Related

- `A2A_QUICK_START.md` — 60-second overview
- `ARCHITECTURE_A2A_UNIFIED_VISION.md` — Full architecture vision
- `rispecs/edgehub-ava/agent-system/STATUS.md` — RISE framework status
- Issue [#186](https://github.com/jgwill/Miadi/issues/186) — A2A implementation tracking
