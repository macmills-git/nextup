import type { FastifyInstance } from "fastify";
import rateLimit from "@fastify/rate-limit";
import { redis } from "@infrastructure/cache/RedisCache";
import { env } from "@config/env";

/** Distributed token bucket keyed by IP + route class. Redis-backed. */
export async function registerRateLimit(app: FastifyInstance) {
  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW_MS,
    redis,
    keyGenerator: (req) => `${req.ip}:${req.routeOptions.url ?? req.url}`,
    errorResponseBuilder: (_req, ctx) => ({
      error: "RateLimited",
      message: "Too many requests, please retry later.",
      retryAfterMs: ctx.ttl,
    }),
  });
}
