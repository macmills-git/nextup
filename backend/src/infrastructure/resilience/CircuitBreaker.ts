import CircuitBreaker from "opossum";
import { env } from "@config/env";
import { logger } from "@infrastructure/telemetry/logger";

export function makeBreaker<A extends unknown[], R>(
  name: string,
  fn: (...args: A) => Promise<R>,
): (...args: A) => Promise<R> {
  const breaker = new CircuitBreaker(fn, {
    timeout: env.CIRCUIT_BREAKER_TIMEOUT_MS,
    errorThresholdPercentage: env.CIRCUIT_BREAKER_ERROR_THRESHOLD,
    resetTimeout: env.CIRCUIT_BREAKER_RESET_MS,
    name,
  });
  breaker.on("open", () => logger.warn({ breaker: name }, "circuit.open"));
  breaker.on("halfOpen", () => logger.info({ breaker: name }, "circuit.halfOpen"));
  breaker.on("close", () => logger.info({ breaker: name }, "circuit.close"));
  breaker.on("reject", () => logger.warn({ breaker: name }, "circuit.reject"));
  return (...args: A) => breaker.fire(...args) as Promise<R>;
}
