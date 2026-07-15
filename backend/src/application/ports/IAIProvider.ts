export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AICompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  correlationId?: string;
}

export interface AITokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AICompletionResult {
  content: string;
  usage: AITokenUsage;
  model: string;
}

/** Port for downstream AI inference gateway. Adapters: OpenRouter, Mock. */
export interface IAIProvider {
  complete(messages: AIMessage[], opts?: AICompletionOptions): Promise<AICompletionResult>;
  stream(messages: AIMessage[], opts?: AICompletionOptions): AsyncIterable<string>;
  embed(input: string | string[]): Promise<number[][]>;
}
