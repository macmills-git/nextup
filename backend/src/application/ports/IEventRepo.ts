import type { EventEntity } from "@domain/entities/Event";
import type { VendorEntity } from "@domain/entities/Vendor";

export interface IEventRepo {
  findById(id: string): Promise<EventEntity | null>;
  list(ownerId: string, limit?: number): Promise<EventEntity[]>;
  create(input: Omit<EventEntity, "id" | "createdAt">): Promise<EventEntity>;
}

export interface IVendorRepo {
  findById(id: string): Promise<VendorEntity | null>;
  listByIds(ids: string[]): Promise<VendorEntity[]>;
  search(category: string | null, limit: number): Promise<VendorEntity[]>;
}
