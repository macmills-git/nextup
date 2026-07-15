import type { IVectorStore, VectorMatch } from "@application/ports/IVectorStore";
import { pool } from "@infrastructure/db/pool";

/** Vendor semantic index backed by pgvector (HNSW, cosine). */
export class PgVectorStore implements IVectorStore {
  async upsert(id: string, embedding: number[]): Promise<void> {
    await pool.query(
      `INSERT INTO vendor_embeddings (vendor_id, embedding)
       VALUES ($1, $2::vector)
       ON CONFLICT (vendor_id) DO UPDATE SET embedding = EXCLUDED.embedding, updated_at = now()`,
      [id, toVectorLiteral(embedding)],
    );
  }

  async search(embedding: number[], k: number): Promise<VectorMatch[]> {
    const { rows } = await pool.query(
      `SELECT vendor_id AS id, 1 - (embedding <=> $1::vector) AS score
       FROM vendor_embeddings
       ORDER BY embedding <=> $1::vector
       LIMIT $2`,
      [toVectorLiteral(embedding), k],
    );
    return rows.map((r) => ({ id: r.id, score: Number(r.score) }));
  }
}

function toVectorLiteral(v: number[]): string {
  return `[${v.join(",")}]`;
}
