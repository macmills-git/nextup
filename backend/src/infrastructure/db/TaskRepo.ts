import { pool } from "./pool";
import type { TaskRecord, TaskKind, TaskStatus } from "@domain/value-objects/TaskStatus";

export class TaskRepo {
  async insert(rec: Pick<TaskRecord, "id" | "kind" | "input">): Promise<void> {
    await pool.query(
      `INSERT INTO tasks (id, kind, status, input) VALUES ($1,$2,'pending',$3)
       ON CONFLICT (id) DO NOTHING`,
      [rec.id, rec.kind, rec.input],
    );
  }
  async find(id: string): Promise<TaskRecord | null> {
    const { rows } = await pool.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
    if (!rows[0]) return null;
    const r = rows[0];
    return {
      id: r.id, kind: r.kind as TaskKind, status: r.status as TaskStatus,
      input: r.input, result: r.result, error: r.error,
      attempts: r.attempts, createdAt: r.created_at, updatedAt: r.updated_at,
    };
  }
  async patch(id: string, patch: Partial<Pick<TaskRecord, "status" | "result" | "error" | "attempts">>): Promise<void> {
    await pool.query(
      `UPDATE tasks SET
         status = COALESCE($2, status),
         result = COALESCE($3, result),
         error  = COALESCE($4, error),
         attempts = COALESCE($5, attempts),
         updated_at = now()
       WHERE id = $1`,
      [id, patch.status ?? null, patch.result ?? null, patch.error ?? null, patch.attempts ?? null],
    );
  }
}
