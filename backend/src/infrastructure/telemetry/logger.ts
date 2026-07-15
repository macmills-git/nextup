import pino from "pino";
import { env } from "@config/env";

export const logger = pino({
  level: env.LOG_LEVEL,
  base: { service: env.OTEL_SERVICE_NAME, env: env.NODE_ENV },
  transport:
    env.NODE_ENV === "development"
      ? { target: "pino-pretty", options: { colorize: true, singleLine: true } }
      : undefined,
});
