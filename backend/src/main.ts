import { buildContainer } from "./container";
import { startServer } from "@presentation/http/server";
import { logger } from "@infrastructure/telemetry/logger";

async function bootstrap() {
  const container = buildContainer();
  const app = await startServer(container);

  const shutdown = async (signal: string) => {
    logger.info({ signal }, "http.shutdown");
    await app.close();
    process.exit(0);
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

bootstrap().catch((err) => {
  logger.fatal({ err }, "bootstrap.failed");
  process.exit(1);
});
