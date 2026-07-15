export interface VendorEntity {
  id: string;
  ownerId: string | null;
  name: string;
  category: string;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
}
