import type { Job } from "bullmq";
import type { Container } from "../../container";
import type { VendorMatchRequest } from "@application/dto/schemas";
import { logger } from "@infrastructure/telemetry/logger";

export function makeVendorMatchProcessor(container: Container) {
  return async (job: Job<{ taskId: string; input: VendorMatchRequest }>) => {
    const { taskId, input } = job.data;
    await container.queue.updateStatus(taskId, { status: "processing", attempts: job.attemptsMade + 1 });
    try {
      const result = await container.vendorMatch.execute(input);
      await container.queue.updateStatus(taskId, { status: "completed", result });
      return result;
    } catch (err) {
      logger.error({ taskId, err }, "worker.vendor_match.failed");
      await container.queue.updateStatus(taskId, {
        status: "failed",
        error: { message: (err as Error).message },
      });
      throw err;
    }
  };
}
