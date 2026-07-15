export type TaskStatus = "pending" | "processing" | "completed" | "failed";
export type TaskKind = "event_brief" | "vendor_match";

export interface TaskRecord<TInput = unknown, TResult = unknown> {
  id: string;
  kind: TaskKind;
  status: TaskStatus;
  input: TInput;
  result: TResult | null;
  error: { message: string; code?: string } | null;
  attempts: number;
  createdAt: Date;
  updatedAt: Date;
}
