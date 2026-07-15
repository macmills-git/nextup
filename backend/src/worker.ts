import type { Job } from "bullmq";
import { buildContainer } from "./container";
import { makeWorker } from "@infrastructure/queue/BullMQAdapter";
import { makeEventBriefProcessor } from "./workers/processors/eventBrief.processor";
import { makeVendorMatchProcessor } from "./workers/processors/vendorMatch.processor";
import { logger } from "@infrastructure/telemetry/logger";

async function bootstrap() {
  const container = buildContainer();
  const eventBrief = makeEventBriefProcessor(container);
  const vendorMatch = makeVendorMatchProcessor(container);

  const worker = makeWorker(async (job: Job) => {
    switch (job.name) {
      case "event_brief":  return eventBrief(job as any);
      case "vendor_match": return vendorMatch(job as any);
      default:             throw new Error(`Unknown job kind: ${job.name}`);
    }
  });

  worker.on("completed", (job) => logger.info({ jobId: job.id, name: job.name }, "worker.completed"));
  worker.on("failed", (job, err) => logger.error({ jobId: job?.id, name: job?.name, err }, "worker.failed"));

  const shutdown = async (signal: string) => {
    logger.info({ signal }, "worker.shutdown");
    await worker.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  logger.info("worker.listening");
}

bootstrap().catch((err) => {
  logger.fatal({ err }, "worker.bootstrap.failed");
  process.exit(1);
});
