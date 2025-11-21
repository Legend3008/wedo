/**
 * Redis Client for caching and session management
 * Uses Upstash Redis for serverless compatibility
 */

import { Redis } from '@upstash/redis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not defined');
}

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN || '',
});

// Cache utilities
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data as T | null;
  },

  async set(key: string, value: unknown, ttl: number = 3600): Promise<void> {
    await redis.set(key, value, { ex: ttl });
  },

  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },
};
