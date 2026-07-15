import type { FastifyInstance } from "fastify";
import { ulid } from "ulid";

/** Injects a correlationId so client, HTTP, queue, and worker logs join up. */
export function registerCorrelation(app: FastifyInstance) {
  app.addHook("onRequest", async (req, reply) => {
    const cid = (req.headers["x-correlation-id"] as string) || ulid();
    (req as unknown as { correlationId: string }).correlationId = cid;
    reply.header("x-correlation-id", cid);
  });
}
