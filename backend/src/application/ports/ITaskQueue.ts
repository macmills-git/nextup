import type { TaskKind, TaskRecord, TaskStatus } from "@domain/value-objects/TaskStatus";

export interface EnqueueOptions {
  taskId?: string;              // idempotency key
  delayMs?: number;
  attempts?: number;
}

export interface ITaskQueue {
  enqueue<TInput>(kind: TaskKind, input: TInput, opts?: EnqueueOptions): Promise<string>;
  getStatus(taskId: string): Promise<TaskRecord | null>;
  updateStatus(
    taskId: string,
    patch: Partial<Pick<TaskRecord, "status" | "result" | "error" | "attempts">>,
  ): Promise<void>;
}

export type { TaskStatus, TaskKind, TaskRecord };
