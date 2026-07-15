import { Queue, Worker, QueueEvents, type Processor } from "bullmq";
import { ulid } from "ulid";
import { redis } from "@infrastructure/cache/RedisCache";
import { env } from "@config/env";
import type { ITaskQueue, EnqueueOptions } from "@application/ports/ITaskQueue";
import type { TaskKind, TaskRecord } from "@domain/value-objects/TaskStatus";
import { TaskRepo } from "@infrastructure/db/TaskRepo";
import { logger } from "@infrastructure/telemetry/logger";

const QUEUE = "nested.ai";
const connection = { connection: redis };

export class BullMQTaskQueue implements ITaskQueue {
  private readonly queue = new Queue(QUEUE, connection);
  private readonly events = new QueueEvents(QUEUE, connection);
  constructor(private readonly repo = new TaskRepo()) {}

  async enqueue<TInput>(kind: TaskKind, input: TInput, opts: EnqueueOptions = {}): Promise<string> {
    const taskId = opts.taskId ?? ulid();
    await this.repo.insert({ id: taskId, kind, input });
    await this.queue.add(
      kind,
      { taskId, kind, input },
      {
        jobId: taskId,                                          // idempotency
        delay: opts.delayMs,
        attempts: opts.attempts ?? env.RETRY_MAX_ATTEMPTS,
        backoff: { type: "exponential", delay: env.RETRY_BASE_MS },
        removeOnComplete: { age: 3600, count: 1000 },
        removeOnFail: { age: 86_400 },
      },
    );
    logger.info({ taskId, kind }, "task.enqueued");
    return taskId;
  }

  getStatus(taskId: string): Promise<TaskRecord | null> {
    return this.repo.find(taskId);
  }

  async updateStatus(taskId: string, patch: Parameters<ITaskQueue["updateStatus"]>[1]): Promise<void> {
    await this.repo.patch(taskId, patch);
  }
}

export function makeWorker(processor: Processor) {
  return new Worker(QUEUE, processor, {
    ...connection,
    concurrency: 4,
    lockDuration: 60_000,
  });
}

export { QUEUE };
