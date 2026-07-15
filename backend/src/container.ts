/**
 * Composition root. Wires ports → adapters exactly once.
 * Swap adapters here to change infrastructure without touching services.
 */
import { hasOpenRouter } from "@config/env";
import { logger } from "@infrastructure/telemetry/logger";

import { RedisCache } from "@infrastructure/cache/RedisCache";
import { EventRepo, VendorRepo } from "@infrastructure/db/EventRepo";
import { BullMQTaskQueue } from "@infrastructure/queue/BullMQAdapter";
import { PgVectorStore } from "@infrastructure/vector/PgVectorAdapter";
import { OpenRouterAdapter } from "@infrastructure/ai/OpenRouterAdapter";
import { MockAIAdapter } from "@infrastructure/ai/MockAIAdapter";

import { EventBriefService } from "@application/services/EventBriefService";
import { VendorMatchService } from "@application/services/VendorMatchService";
import { ConversationService } from "@application/services/ConversationService";
import type { IAIProvider } from "@application/ports/IAIProvider";

export interface Container {
  ai: IAIProvider;
  queue: BullMQTaskQueue;
  cache: RedisCache;
  vectors: PgVectorStore;
  events: EventRepo;
  vendors: VendorRepo;
  eventBrief: EventBriefService;
  vendorMatch: VendorMatchService;
  conversation: ConversationService;
}

export function buildContainer(): Container {
  const ai: IAIProvider = hasOpenRouter ? new OpenRouterAdapter() : new MockAIAdapter();
  logger.info({ provider: hasOpenRouter ? "openrouter" : "mock" }, "ai.provider.selected");

  const cache = new RedisCache();
  const queue = new BullMQTaskQueue();
  const vectors = new PgVectorStore();
  const events = new EventRepo();
  const vendors = new VendorRepo();

  const eventBrief = new EventBriefService(events, ai, queue);
  const vendorMatch = new VendorMatchService(ai, vectors, vendors, queue);
  const conversation = new ConversationService(ai, cache);

  return { ai, queue, cache, vectors, events, vendors, eventBrief, vendorMatch, conversation };
}
