# Four Questions — Structural Thinking Analysis

> Source PDE: [implement] → [miadi-code MCP PDE server Redis-backed storage and web endpoints (app/api/pde, app/pde)]

## Information Questions
- [from ambiguity: "Decide TTLs, persistence (RDB/AOF), and backup strategy for Redis [70%] _(implicit)_"] What concrete RPO/RTO targets and acceptable data-loss windows must the storage meet (e.g., seconds/minutes/hours), and which persistence mode (RDB, AOF, hybrid) is required to meet them?
- [from ambiguity: "Confirm which .pde/ elements must be preserved (metadata, attachments, versions) [85%]"] Please list the exact fields, attachment types, and version-history semantics to preserve (per-file immutable history vs. single latest + changelog), with examples.
- [from assumption: "There may be existing .pde files to migrate, but location/volume is unknown"] How many existing .pde items, total disk size, and their filesystem paths/locations are expected (approx counts and sizes)?

## Clarification Questions
- [from intent: "review — miaco .pde/ folder convention/spec to ensure storage format alignment _(explicit)_"] Which authoritative miaco .pde/ spec or representative example files should be mirrored exactly (provide file paths or a single canonical example)?
- [from intent: "decide — whether Redis replaces filesystem or supplements it (single source-of-truth policy) _(implicit)_"] Define "single source-of-truth" here: does "replace" mean the filesystem is removed, made read-only as an archive, or retained as an operational replica?
- [from action: "Design Redis keyspace and serialization (JSON, hashes, sets for indexing) [90%]"] When saying "sets for indexing," what query patterns must be supported (e.g., list by id, author, tag, full-text search), and which fields require secondary indexes versus ephemeral lookup?

## Implication Questions
- [from action: "Plan rollback strategy if migration causes issues (keep filesystem copy until validated) [85%] _(implicit)_"] It implies a staged migration where filesystem remains writable/authoritative during validation — is the intended flow: (a) write to filesystem and Redis in parallel, (b) validate reads from Redis, then (c) flip authoritative writes to Redis? If not, what exact staged sequence is implied?
- [from analysis: "Design Redis keyspace and serialization (JSON, hashes, sets for indexing) [90%]"] This implies Redis will serve not just key/value retrieval but index-backed queries; is the assumption that Redis alone must satisfy all search/listing requirements (no external search engine), or is an additional index/search layer acceptable?
- [from secondary intent: "migrate — existing .pde files (if any) into Redis or create sync layer _(implicit)_"] The plan implies a migration or ongoing sync is required; is the expectation an immediate one-time migration, or a long-term sync (bi-directional or write-through) strategy?

## Discrepancy Questions
- [from intent: "Clarify desired outcome: Redis as primary store or cache/augmenting filesystem [80%]"] vs [from analysis: "Decide TTLs, persistence (RDB/AOF), and backup strategy for Redis [70%] _(implicit)_"] One side treats Redis as a durable primary store; the other treats TTL/persistence concerns like a cache — how should Redis be treated operationally: durable primary (no TTLs for core data) or ephemeral cache (TTL-driven), and what trade-off is acceptable?
- [from action: "Expose app/api/pde endpoints (CRUD, list, search) backed by Redis [90%]"] vs [from ambiguity: "Design Redis keyspace and serialization (JSON, hashes, sets for indexing) [90%]"] CRUD+search APIs imply flexible query capabilities, but the proposed Redis primitives (JSON/hashes/sets) limit complex queries — how will complex search requirements (filters, sort, pagination, full-text) be reconciled with a Redis-only design?
- [from west: "Plan rollback strategy... (keep filesystem copy until validated) [85%] _(implicit)_"] vs [from secondary intent: "decide — whether Redis replaces filesystem or supplements it (single source-of-truth policy) _(implicit)_"] One action retains filesystem as temporary fallback; another decision could remove it — how will rollback and long-term SOT be reconciled if the decision is to irreversibly deprecate filesystem storage?

## Structural Picture Summary
The picture shows a clear tension between moving to Redis as either a durable single source-of-truth or an ephemeral/cache layer, with open questions about persistence, indexing, and migration scope. Resolution needs a short decision: (1) finalize SOT policy (replace vs supplement), (2) declare persistence/RPO requirements, and (3) map required query patterns so the Redis schema and migration plan align.