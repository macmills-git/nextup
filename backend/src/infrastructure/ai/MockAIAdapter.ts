import type {
  IAIProvider, AIMessage, AICompletionOptions, AICompletionResult,
} from "@application/ports/IAIProvider";

/** Deterministic mock so the queue + worker + SSE pipeline runs without any AI key. */
export class MockAIAdapter implements IAIProvider {
  async complete(messages: AIMessage[]): Promise<AICompletionResult> {
    const last = messages[messages.length - 1]?.content ?? "";
    const content = `# Draft Brief\n\n(Mock adapter — configure OPENROUTER_API_KEY for live inference.)\n\nInput echo: ${last.slice(0, 200)}`;
    return {
      content,
      model: "mock/deterministic-v1",
      usage: { promptTokens: 42, completionTokens: 128, totalTokens: 170 },
    };
  }

  async *stream(messages: AIMessage[], _opts?: AICompletionOptions): AsyncIterable<string> {
    const seed = (messages[messages.length - 1]?.content ?? "").slice(0, 80);
    const chunks = [
      "Nested copilot online. ",
      "Working from your brief: ",
      `"${seed}". `,
      "Drafting timeline… ",
      "Reviewing vendors… ",
      "Done.",
    ];
    for (const c of chunks) {
      await new Promise((r) => setTimeout(r, 120));
      yield c;
    }
  }

  async embed(input: string | string[]): Promise<number[][]> {
    const arr = Array.isArray(input) ? input : [input];
    return arr.map((s) => deterministicVector(s, 1536));
  }
}

function deterministicVector(seed: string, dim: number): number[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const out = new Array<number>(dim);
  for (let i = 0; i < dim; i++) {
    h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
    out[i] = ((h >>> 0) / 0xffffffff) * 2 - 1;
  }
  // L2-normalize so cosine distance is well-scaled
  const norm = Math.sqrt(out.reduce((a, b) => a + b * b, 0)) || 1;
  return out.map((v) => v / norm);
}
