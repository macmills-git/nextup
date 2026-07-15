export interface VectorMatch {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export interface IVectorStore {
  upsert(id: string, embedding: number[], metadata?: Record<string, unknown>): Promise<void>;
  search(embedding: number[], k: number, filter?: Record<string, unknown>): Promise<VectorMatch[]>;
}
