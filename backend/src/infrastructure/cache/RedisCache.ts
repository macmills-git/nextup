import Redis from "ioredis";
import { env } from "@config/env";
import type { ICache } from "@application/ports/ICache";

export const redis = new Redis(env.REDIS_URL, { maxRetriesPerRequest: null });

export class RedisCache implements ICache {
  constructor(private readonly client: Redis = redis) {}

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.client.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const payload = JSON.stringify(value);
    if (ttlSeconds) await this.client.set(key, payload, "EX", ttlSeconds);
    else await this.client.set(key, payload);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async incrWithTTL(key: string, ttlSeconds: number): Promise<number> {
    const pipe = this.client.multi().incr(key).expire(key, ttlSeconds);
    const res = await pipe.exec();
    return Number(res?.[0]?.[1] ?? 0);
  }
}
