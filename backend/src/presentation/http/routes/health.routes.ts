import type { FastifyInstance } from "fastify";
import { pool } from "@infrastructure/db/pool";
import { redis } from "@infrastructure/cache/RedisCache";

export function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ status: "ok" }));
  app.get("/ready", async (_req, reply) => {
    try {
      await pool.query("SELECT 1");
      await redis.ping();
      return { status: "ready" };
    } catch (err) {
      return reply.code(503).send({ status: "degraded", error: (err as Error).message });
    }
  });
}
