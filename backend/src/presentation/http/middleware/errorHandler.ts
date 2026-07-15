import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { NotFoundError } from "@application/services/EventBriefService";
import { logger } from "@infrastructure/telemetry/logger";

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler((err, req, reply) => {
    if (err instanceof ZodError) {
      return reply.code(400).send({ error: "ValidationError", issues: err.flatten() });
    }
    if (err instanceof NotFoundError) {
      return reply.code(404).send({ error: err.code, message: err.message });
    }
    const status = (err as { statusCode?: number }).statusCode ?? 500;
    logger.error({ err, path: req.url, correlationId: req.id }, "http.error");
    return reply.code(status).send({
      error: err.name ?? "InternalError",
      message: status >= 500 ? "Upstream error." : err.message,
      correlationId: req.id,
    });
  });
}
