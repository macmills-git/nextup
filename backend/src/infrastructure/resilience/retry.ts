import { env } from "@config/env";
import { logger } from "@infrastructure/telemetry/logger";

export interface RetryOptions {
  maxAttempts?: number;
  baseMs?: number;
  isRetryable?: (err: unknown) => boolean;
  label?: string;
}

/** Full-jitter exponential backoff — AWS Architecture Blog reference impl. */
export async function retry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const max = opts.maxAttempts ?? env.RETRY_MAX_ATTEMPTS;
  const base = opts.baseMs ?? env.RETRY_BASE_MS;
  const label = opts.label ?? "op";
  const isRetryable = opts.isRetryable ?? defaultRetryable;

  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt++;
      if (attempt >= max || !isRetryable(err)) throw err;
      const cap = base * 2 ** attempt;
      const sleep = Math.floor(Math.random() * cap);
      logger.warn({ label, attempt, sleep, err: (err as Error).message }, "retry.backoff");
      await new Promise((r) => setTimeout(r, sleep));
    }
  }
}

function defaultRetryable(err: unknown): boolean {
  const e = err as { code?: string; status?: number };
  if (e?.status && e.status >= 500) return true;
  if (e?.status === 429) return true;
  if (["ECONNRESET", "ETIMEDOUT", "EAI_AGAIN"].includes(e?.code ?? "")) return true;
  return false;
}
