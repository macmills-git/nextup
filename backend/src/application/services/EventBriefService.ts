import type { IAIProvider } from "@application/ports/IAIProvider";
import type { IEventRepo } from "@application/ports/IEventRepo";
import type { ITaskQueue } from "@application/ports/ITaskQueue";
import type { EventBriefRequest } from "@application/dto/schemas";
import { logger } from "@infrastructure/telemetry/logger";

export class EventBriefService {
  constructor(
    private readonly events: IEventRepo,
    private readonly ai: IAIProvider,
    private readonly queue: ITaskQueue,
  ) {}

  /** Fast path — API controller. Returns a taskId; heavy work runs in worker. */
  async enqueue(req: EventBriefRequest): Promise<string> {
    const event = await this.events.findById(req.eventId);
    if (!event) throw new NotFoundError(`Event ${req.eventId} not found`);
    return this.queue.enqueue("event_brief", req);
  }

  /** Worker path — runs inside the job processor. */
  async execute(req: EventBriefRequest) {
    const event = await this.events.findById(req.eventId);
    if (!event) throw new NotFoundError(`Event ${req.eventId} not found`);

    const messages = [
      {
        role: "system" as const,
        content:
          "You are an event-planning strategist. Produce a concise, structured brief with sections: Objective, Audience, Program, Risks, KPIs.",
      },
      {
        role: "user" as const,
        content: JSON.stringify({
          event: {
            title: event.title,
            venue: event.venue,
            guestCount: event.guestCount,
            startsAt: event.startsAt,
          },
          focus: req.focus ?? [],
          notes: req.notes ?? "",
        }),
      },
    ];

    const started = Date.now();
    const result = await this.ai.complete(messages, { correlationId: req.eventId });
    logger.info(
      { eventId: req.eventId, ms: Date.now() - started, usage: result.usage, model: result.model },
      "event_brief.completed",
    );
    return { brief: result.content, usage: result.usage, model: result.model };
  }
}

export class NotFoundError extends Error {
  readonly code = "NOT_FOUND";
}
