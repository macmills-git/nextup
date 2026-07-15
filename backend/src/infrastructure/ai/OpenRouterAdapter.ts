import { env } from "@config/env";
import type {
  IAIProvider, AIMessage, AICompletionOptions, AICompletionResult,
} from "@application/ports/IAIProvider";
import { retry } from "@infrastructure/resilience/retry";
import { makeBreaker } from "@infrastructure/resilience/CircuitBreaker";
import { logger } from "@infrastructure/telemetry/logger";

interface ORChoice { message?: { content?: string }; delta?: { content?: string } }
interface ORResponse {
  choices: ORChoice[];
  model: string;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

export class OpenRouterAdapter implements IAIProvider {
  private readonly headers: Record<string, string>;

  private readonly completeBreakered: (payload: unknown) => Promise<ORResponse>;
  private readonly embedBreakered: (payload: unknown) => Promise<{ data: { embedding: number[] }[] }>;

  constructor() {
    this.headers = {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://nested.app",
      "X-Title": "Nested Platform",
    };
    this.completeBreakered = makeBreaker("openrouter.complete", (p) => this.raw("/chat/completions", p));
    this.embedBreakered = makeBreaker("openrouter.embed", (p) => this.raw("/embeddings", p));
  }

  private async raw<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${env.OPENROUTER_BASE_URL}${path}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = new Error(`OpenRouter ${path} ${res.status}: ${await res.text()}`) as Error & { status: number };
      err.status = res.status;
      throw err;
    }
    return res.json() as Promise<T>;
  }

  async complete(messages: AIMessage[], opts: AICompletionOptions = {}): Promise<AICompletionResult> {
    const model = opts.model ?? env.OPENROUTER_MODEL;
    const payload = { model, messages, temperature: opts.temperature ?? 0.4, max_tokens: opts.maxTokens ?? 1024 };
    const res = await retry(() => this.completeBreakered(payload), { label: `openrouter.complete:${model}` });
    const usage = res.usage ?? { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
    logger.info({ correlationId: opts.correlationId, model: res.model, usage }, "ai.completion");
    return {
      content: res.choices[0]?.message?.content ?? "",
      model: res.model,
      usage: {
        promptTokens: usage.prompt_tokens,
        completionTokens: usage.completion_tokens,
        totalTokens: usage.total_tokens,
      },
    };
  }

  async *stream(messages: AIMessage[], opts: AICompletionOptions = {}): AsyncIterable<string> {
    const model = opts.model ?? env.OPENROUTER_MODEL;
    const res = await fetch(`${env.OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ model, messages, stream: true, temperature: opts.temperature ?? 0.4 }),
    });
    if (!res.ok || !res.body) throw new Error(`OpenRouter stream ${res.status}`);
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const parts = buf.split("\n");
      buf = parts.pop() ?? "";
      for (const line of parts) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          const json = JSON.parse(data) as ORResponse;
          const delta = json.choices[0]?.delta?.content;
          if (delta) yield delta;
        } catch { /* ignore keep-alives */ }
      }
    }
  }

  async embed(input: string | string[]): Promise<number[][]> {
    const res = await retry(
      () => this.embedBreakered({ model: "openai/text-embedding-3-small", input }),
      { label: "openrouter.embed" },
    );
    return res.data.map((d) => d.embedding);
  }
}
