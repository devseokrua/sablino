import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let bookingRateLimit: Ratelimit | null = null;

export function getBookingRateLimit(): Ratelimit {
  if (bookingRateLimit) {
    return bookingRateLimit;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error('Missing Upstash Redis environment variables');
  }

  const redis = new Redis({ url, token });

  bookingRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 m'),
    prefix: 'booking-form',
    analytics: true,
  });

  return bookingRateLimit;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ip = forwardedFor.split(',')[0]?.trim();
    if (ip) {
      return ip;
    }
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}
