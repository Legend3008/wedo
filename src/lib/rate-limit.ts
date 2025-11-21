/**
 * Rate Limiting Middleware
 * Protects server actions from abuse
 */

import { redis } from '@/lib/redis';

interface RateLimitOptions {
  interval: number; // Time window in seconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

export async function rateLimit(
  identifier: string,
  options: RateLimitOptions = {
    interval: 60,
    uniqueTokenPerInterval: 10,
  }
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const key = `rate-limit:${identifier}`;
  const now = Date.now();
  const window = Math.floor(now / (options.interval * 1000));
  const windowKey = `${key}:${window}`;

  try {
    const count = await redis.incr(windowKey);

    // Set expiry on first request
    if (count === 1) {
      await redis.expire(windowKey, options.interval);
    }

    const remaining = Math.max(0, options.uniqueTokenPerInterval - count);
    const reset = (window + 1) * options.interval;

    return {
      success: count <= options.uniqueTokenPerInterval,
      limit: options.uniqueTokenPerInterval,
      remaining,
      reset,
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Fail open - allow request on error
    return {
      success: true,
      limit: options.uniqueTokenPerInterval,
      remaining: options.uniqueTokenPerInterval,
      reset: now + options.interval,
    };
  }
}

// Helper for getting client IP
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
  return ip.trim();
}

// Helper for API route protection
export async function withRateLimit<T>(
  identifier: string,
  handler: () => Promise<T>,
  options?: RateLimitOptions
): Promise<T> {
  const { success, remaining, reset } = await rateLimit(identifier, options);

  if (!success) {
    throw new Error(
      `Rate limit exceeded. Try again in ${Math.ceil((reset * 1000 - Date.now()) / 1000)} seconds.`
    );
  }

  return await handler();
}
