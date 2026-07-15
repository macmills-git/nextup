import { z } from "zod";

/** Reject obvious prompt-injection markers. Sanitization, not authorization. */
const injectionGuard = (s: string) =>
  !/(?:ignore\s+previous|system\s*:\s*you\s+are|\[\[\s*system\s*\]\])/i.test(s);

export const PromptString = z
  .string()
  .trim()
  .min(1)
  .max(8_000)
  .refine(injectionGuard, "Prompt contains disallowed control instructions.");

export const EventBriefRequest = z.object({
  eventId: z.string().uuid(),
  focus: z.array(z.string().min(1).max(80)).max(10).optional(),
  notes: PromptString.optional(),
});
export type EventBriefRequest = z.infer<typeof EventBriefRequest>;

export const VendorMatchRequest = z.object({
  eventId: z.string().uuid(),
  category: z.string().min(1).max(80).optional(),
  brief: PromptString,
  topK: z.number().int().min(1).max(50).default(10),
});
export type VendorMatchRequest = z.infer<typeof VendorMatchRequest>;

export const VendorEmbedRequest = z.object({
  vendorId: z.string().uuid(),
  text: PromptString,
});

export const StreamQuery = z.object({
  prompt: PromptString,
  correlationId: z.string().min(1).max(64).optional(),
});

export const TaskIdParam = z.object({ id: z.string().min(8).max(64) });
