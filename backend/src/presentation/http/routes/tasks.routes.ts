import type { FastifyInstance } from "fastify";
import { TaskIdParam } from "@application/dto/schemas";
import type { Container } from "../../../container";

export function tasksRoutes(app: FastifyInstance, container: Container) {
  /**
   * Idempotent status polling. Safe to call repeatedly.
   * 200 with a snapshot of the task state machine.
   */
  app.get("/v1/tasks/:id", async (req, reply) => {
    const { id } = TaskIdParam.parse(req.params);
    const rec = await container.queue.getStatus(id);
    if (!rec) return reply.code(404).send({ error: "TaskNotFound", taskId: id });
    return {
      taskId: rec.id,
      kind: rec.kind,
      status: rec.status,
      attempts: rec.attempts,
      result: rec.status === "completed" ? rec.result : null,
      error: rec.status === "failed" ? rec.error : null,
      createdAt: rec.createdAt,
      updatedAt: rec.updatedAt,
    };
  });
}
