/**
 * Redis Client for caching and session management
 * Uses Upstash Redis for serverless compatibility
 * Includes error handling and retry logic
 */

import { Redis } from '@upstash/redis';

if (!process.env.REDIS_URL || !process.env.REDIS_TOKEN) {
  throw new Error('REDIS_URL and REDIS_TOKEN must be defined');
}

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
  retry: {
    retries: 3,
    backoff: (retryCount) => Math.min(1000 * 2 ** retryCount, 10000),
  },
});

// Cache utilities with error handling
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!key || typeof key !== 'string') {
        console.error('Invalid cache key:', key);
        return null;
      }
      const data = await redis.get(key);
      return data as T | null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },

  async set(
    key: string,
    value: unknown,
    ttl: number = 3600
  ): Promise<boolean> {
    try {
      if (!key || typeof key !== 'string') {
        console.error('Invalid cache key:', key);
        return false;
      }
      if (ttl < 0 || ttl > 86400 * 30) {
        console.error('Invalid TTL:', ttl);
        return false;
      }
      await redis.set(key, value, { ex: ttl });
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  },

  async del(key: string): Promise<boolean> {
    try {
      if (!key || typeof key !== 'string') {
        console.error('Invalid cache key:', key);
        return false;
      }
      await redis.del(key);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  },

  async invalidatePattern(pattern: string): Promise<boolean> {
    try {
      if (!pattern || typeof pattern !== 'string') {
        console.error('Invalid pattern:', pattern);
        return false;
      }
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return true;
    } catch (error) {
      console.error('Cache invalidate error:', error);
      return false;
    }
  },

  async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  },
};
