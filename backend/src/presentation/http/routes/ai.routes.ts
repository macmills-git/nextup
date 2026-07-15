import type { FastifyInstance } from "fastify";
import { EventBriefRequest, VendorMatchRequest, StreamQuery, VendorEmbedRequest } from "@application/dto/schemas";
import type { Container } from "../../../container";

export function aiRoutes(app: FastifyInstance, container: Container) {
  // ── Async: brief synthesis ────────────────────────────────────────────
  app.post("/v1/events/:id/brief", async (req, reply) => {
    const parsed = EventBriefRequest.parse({ ...(req.body as object), eventId: (req.params as any).id });
    const taskId = await container.eventBrief.enqueue(parsed);
    return reply.code(202).send({ taskId, poll: `/v1/tasks/${taskId}` });
  });

  // ── Async: vendor semantic match ──────────────────────────────────────
  app.post("/v1/vendors/match", async (req, reply) => {
    const parsed = VendorMatchRequest.parse(req.body);
    const taskId = await container.vendorMatch.enqueue(parsed);
    return reply.code(202).send({ taskId, poll: `/v1/tasks/${taskId}` });
  });

  // ── Sync: upsert vendor embedding (cheap; keeps index warm) ───────────
  app.post("/v1/vendors/embed", async (req) => {
    const parsed = VendorEmbedRequest.parse(req.body);
    await container.vendorMatch.upsertEmbedding(parsed.vendorId, parsed.text);
    return { ok: true };
  });

  // ── SSE: streaming conversational AI ──────────────────────────────────
  app.get("/v1/ai/stream", async (req, reply) => {
    const { prompt, correlationId } = StreamQuery.parse(req.query);
    reply.raw.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const sessionId = correlationId ?? (req as any).correlationId;
    const send = (event: string, data: unknown) =>
      reply.raw.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

    const heartbeat = setInterval(() => reply.raw.write(": ping\n\n"), 15_000);
    req.raw.on("close", () => clearInterval(heartbeat));

    try {
      send("start", { sessionId });
      for await (const chunk of container.conversation.stream(sessionId, prompt)) {
        send("token", { chunk });
      }
      send("done", { sessionId });
    } catch (err) {
      send("error", { message: (err as Error).message });
    } finally {
      clearInterval(heartbeat);
      reply.raw.end();
    }
  });
}
