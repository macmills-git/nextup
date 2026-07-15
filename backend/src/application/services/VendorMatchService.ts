import type { IAIProvider } from "@application/ports/IAIProvider";
import type { IVectorStore } from "@application/ports/IVectorStore";
import type { IVendorRepo } from "@application/ports/IEventRepo";
import type { ITaskQueue } from "@application/ports/ITaskQueue";
import type { VendorMatchRequest } from "@application/dto/schemas";

export class VendorMatchService {
  constructor(
    private readonly ai: IAIProvider,
    private readonly vectors: IVectorStore,
    private readonly vendors: IVendorRepo,
    private readonly queue: ITaskQueue,
  ) {}

  async enqueue(req: VendorMatchRequest): Promise<string> {
    return this.queue.enqueue("vendor_match", req);
  }

  async execute(req: VendorMatchRequest) {
    const [embedding] = await this.ai.embed(req.brief);
    const matches = await this.vectors.search(embedding, req.topK, {
      category: req.category,
    });
    const hydrated = await this.vendors.listByIds(matches.map((m) => m.id));
    return {
      matches: matches.map((m) => ({
        vendor: hydrated.find((v) => v.id === m.id) ?? null,
        score: m.score,
      })),
    };
  }

  async upsertEmbedding(vendorId: string, text: string) {
    const [embedding] = await this.ai.embed(text);
    await this.vectors.upsert(vendorId, embedding, { vendorId });
  }
}
