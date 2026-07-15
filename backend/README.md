# Nested Platform — Backend Service

Production-grade Node.js/TypeScript backend for the Nested event management & vendor marketplace platform. Standalone service; deploy independently from the Vite frontend.

## Architectural Paradigms

| Concern | Implementation |
| --- | --- |
| Async workload decoupling | BullMQ job queue + dedicated worker process. Heavy AI actions return `202 Accepted` + `taskId`. |
| Job status polling | Idempotent `GET /v1/tasks/:id` returns `{ status: pending \| processing \| completed \| failed, result?, error? }`. |
| Streaming AI | `GET /v1/ai/stream` — Server-Sent Events, chunk-by-chunk, minimizes TTFT. |
| Persistence | PostgreSQL (transactional CRUD) + Redis (session/cache) + pgvector (semantic search). |
| Ingress protection | Global rate limiter (token bucket, Redis-backed), Zod schema validation, Helmet, prompt-injection sanitizer. |
| Fault tolerance | Circuit breaker + exponential backoff around every outbound AI call. |
| Observability | Pino structured logs, OpenTelemetry tracing hooks, token/latency metrics per request. |
| Structure | Clean Architecture — `domain` → `application` (ports) → `infrastructure` (adapters) → `presentation` (HTTP). |

## Directory Layout

```
backend/
├── docker-compose.yml         # api + worker + postgres(pgvector) + redis
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.example
├── migrations/
│   └── 0001_init.sql          # tables + pgvector extension
└── src/
    ├── main.ts                # HTTP API entrypoint
    ├── worker.ts              # Job worker entrypoint
    ├── container.ts           # DI composition root
    ├── config/env.ts          # Zod-validated env schema
    ├── domain/                # Entities & value objects (framework-free)
    │   ├── entities/
    │   └── value-objects/
    ├── application/           # Use cases & ports
    │   ├── ports/             # IAIProvider, ITaskQueue, IVectorStore, ICache, IEventRepo
    │   ├── services/          # EventBriefService, VendorMatchService, ConversationService
    │   └── dto/schemas.ts     # Zod request/response contracts
    ├── infrastructure/        # Adapters (swappable)
    │   ├── ai/                # OpenRouterAdapter + MockAIAdapter
    │   ├── queue/             # BullMQ adapter
    │   ├── cache/             # Redis
    │   ├── vector/            # pgvector adapter
    │   ├── db/                # pg pool + repositories
    │   ├── resilience/        # CircuitBreaker, retry, rateLimiter
    │   └── telemetry/         # logger, tracing
    ├── presentation/http/
    │   ├── server.ts
    │   ├── middleware/
    │   └── routes/            # health, events, vendors, ai, tasks
    └── workers/processors/    # eventBrief, vendorMatch
```

## Running

```bash
cp .env.example .env
docker compose up --build
```

- API: `http://localhost:8080`
- Health: `GET /health` / `GET /ready`
- Worker: separate container, same image, different command.

The service boots even without `OPENROUTER_API_KEY` — the `MockAIAdapter` is auto-selected so you can exercise the queue, worker, SSE, and polling flows end-to-end.

## Key Endpoints

| Method | Path | Behavior |
| --- | --- | --- |
| `POST` | `/v1/events/:id/brief` | Enqueue AI brief synthesis → `202 { taskId }` |
| `POST` | `/v1/vendors/match` | Enqueue vendor semantic match → `202 { taskId }` |
| `GET`  | `/v1/tasks/:id` | Idempotent polling; returns state machine snapshot |
| `GET`  | `/v1/ai/stream` | SSE stream of model tokens (`?prompt=...`) |
| `POST` | `/v1/vendors/embed` | Upsert a vendor's embedding into pgvector |

## AI Provider

`OPENROUTER_API_KEY` in `.env` activates the OpenRouter adapter (`https://openrouter.ai/api/v1`). Absent → `MockAIAdapter` (deterministic, streams synthetic tokens). Circuit breaker + exponential backoff wrap both.
