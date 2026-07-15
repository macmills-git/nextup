import type { IEventRepo, IVendorRepo } from "@application/ports/IEventRepo";
import type { EventEntity } from "@domain/entities/Event";
import type { VendorEntity } from "@domain/entities/Vendor";
import { pool } from "./pool";

export class EventRepo implements IEventRepo {
  async findById(id: string): Promise<EventEntity | null> {
    const { rows } = await pool.query(
      `SELECT id, owner_id, title, starts_at, venue, guest_count, metadata, created_at
       FROM events WHERE id = $1`,
      [id],
    );
    return rows[0] ? mapEvent(rows[0]) : null;
  }
  async list(ownerId: string, limit = 25): Promise<EventEntity[]> {
    const { rows } = await pool.query(
      `SELECT id, owner_id, title, starts_at, venue, guest_count, metadata, created_at
       FROM events WHERE owner_id = $1 ORDER BY created_at DESC LIMIT $2`,
      [ownerId, limit],
    );
    return rows.map(mapEvent);
  }
  async create(input: Omit<EventEntity, "id" | "createdAt">): Promise<EventEntity> {
    const { rows } = await pool.query(
      `INSERT INTO events (owner_id, title, starts_at, venue, guest_count, metadata)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [input.ownerId, input.title, input.startsAt, input.venue, input.guestCount, input.metadata],
    );
    return mapEvent(rows[0]);
  }
}

export class VendorRepo implements IVendorRepo {
  async findById(id: string): Promise<VendorEntity | null> {
    const { rows } = await pool.query(`SELECT * FROM vendors WHERE id = $1`, [id]);
    return rows[0] ? mapVendor(rows[0]) : null;
  }
  async listByIds(ids: string[]): Promise<VendorEntity[]> {
    if (ids.length === 0) return [];
    const { rows } = await pool.query(`SELECT * FROM vendors WHERE id = ANY($1::uuid[])`, [ids]);
    return rows.map(mapVendor);
  }
  async search(category: string | null, limit: number): Promise<VendorEntity[]> {
    const { rows } = await pool.query(
      category
        ? `SELECT * FROM vendors WHERE category = $1 ORDER BY created_at DESC LIMIT $2`
        : `SELECT * FROM vendors ORDER BY created_at DESC LIMIT $1`,
      category ? [category, limit] : [limit],
    );
    return rows.map(mapVendor);
  }
}

function mapEvent(r: any): EventEntity {
  return {
    id: r.id, ownerId: r.owner_id, title: r.title,
    startsAt: r.starts_at, venue: r.venue, guestCount: r.guest_count,
    metadata: r.metadata ?? {}, createdAt: r.created_at,
  };
}
function mapVendor(r: any): VendorEntity {
  return {
    id: r.id, ownerId: r.owner_id, name: r.name, category: r.category,
    description: r.description, metadata: r.metadata ?? {}, createdAt: r.created_at,
  };
}
