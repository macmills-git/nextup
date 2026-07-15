import Fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { env } from "@config/env";
import { logger } from "@infrastructure/telemetry/logger";
import { registerRateLimit } from "./middleware/rateLimit";
import { registerErrorHandler } from "./middleware/errorHandler";
import { registerCorrelation } from "./middleware/tracing";
import { healthRoutes } from "./routes/health.routes";
import { tasksRoutes } from "./routes/tasks.routes";
import { aiRoutes } from "./routes/ai.routes";
import type { Container } from "../../container";

export async function buildServer(container: Container) {
  const app = Fastify({ logger, disableRequestLogging: false, bodyLimit: 1_048_576 });

  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(cors, { origin: true, credentials: true });
  await registerRateLimit(app);
  registerCorrelation(app);
  registerErrorHandler(app);

  healthRoutes(app);
  tasksRoutes(app, container);
  aiRoutes(app, container);

  return app;
}

export async function startServer(container: Container) {
  const app = await buildServer(container);
  await app.listen({ port: env.PORT, host: "0.0.0.0" });
  logger.info({ port: env.PORT }, "http.listening");
  return app;
}
