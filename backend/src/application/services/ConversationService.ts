import type { IAIProvider, AIMessage } from "@application/ports/IAIProvider";
import type { ICache } from "@application/ports/ICache";

/** Streaming conversational surface — transient session state lives in Redis. */
export class ConversationService {
  constructor(private readonly ai: IAIProvider, private readonly cache: ICache) {}

  private key(sessionId: string) {
    return `conv:${sessionId}`;
  }

  async loadHistory(sessionId: string): Promise<AIMessage[]> {
    return (await this.cache.get<AIMessage[]>(this.key(sessionId))) ?? [];
  }

  async saveHistory(sessionId: string, messages: AIMessage[]) {
    // Keep last 20 turns; 1h TTL — session-scoped, not durable storage.
    await this.cache.set(this.key(sessionId), messages.slice(-20), 60 * 60);
  }

  /** Async iterator yielding token chunks. Presentation layer wraps in SSE. */
  async *stream(sessionId: string, userPrompt: string): AsyncIterable<string> {
    const history = await this.loadHistory(sessionId);
    const messages: AIMessage[] = [
      { role: "system", content: "You are Nested's event operations copilot." },
      ...history,
      { role: "user", content: userPrompt },
    ];

    let full = "";
    for await (const chunk of this.ai.stream(messages, { correlationId: sessionId })) {
      full += chunk;
      yield chunk;
    }
    await this.saveHistory(sessionId, [
      ...messages,
      { role: "assistant", content: full },
    ]);
  }
}
