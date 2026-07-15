export interface EventEntity {
  id: string;
  ownerId: string;
  title: string;
  startsAt: Date | null;
  venue: string | null;
  guestCount: number | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
}
