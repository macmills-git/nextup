import "dotenv/config";
import { z } from "zod";

const Schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(8080),
  LOG_LEVEL: z.string().default("info"),

  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  OPENROUTER_API_KEY: z.string().optional(),
  OPENROUTER_BASE_URL: z.string().url().default("https://openrouter.ai/api/v1"),
  OPENROUTER_MODEL: z.string().default("google/gemini-2.5-flash"),

  RATE_LIMIT_MAX: z.coerce.number().default(120),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60_000),

  CIRCUIT_BREAKER_TIMEOUT_MS: z.coerce.number().default(15_000),
  CIRCUIT_BREAKER_ERROR_THRESHOLD: z.coerce.number().default(50),
  CIRCUIT_BREAKER_RESET_MS: z.coerce.number().default(30_000),
  RETRY_MAX_ATTEMPTS: z.coerce.number().default(4),
  RETRY_BASE_MS: z.coerce.number().default(250),

  OTEL_SERVICE_NAME: z.string().default("nested-backend"),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().optional(),
});

export type Env = z.infer<typeof Schema>;
export const env: Env = Schema.parse(process.env);
export const hasOpenRouter = Boolean(env.OPENROUTER_API_KEY);
