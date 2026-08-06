import { describe, expect, it } from 'vitest';
import { RateLimiter } from '@/lib/rate-limit/rate-limiter';

describe('RateLimiter', () => {
  it('cho phep request trong gioi han', () => {
    const limiter = new RateLimiter({ limit: 3, windowMs: 60_000 });
    const now = 1_000_000;

    expect(limiter.check('ip-1', now).success).toBe(true);
    expect(limiter.check('ip-1', now + 100).success).toBe(true);
    expect(limiter.check('ip-1', now + 200).success).toBe(true);
  });

  it('chan request vuot gioi han', () => {
    const limiter = new RateLimiter({ limit: 2, windowMs: 60_000 });
    const now = 1_000_000;

    limiter.check('ip-1', now);
    limiter.check('ip-1', now + 10);
    const blocked = limiter.check('ip-1', now + 20);

    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('dem rieng cho tung key', () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 60_000 });
    const now = 1_000_000;

    expect(limiter.check('ip-1', now).success).toBe(true);
    expect(limiter.check('ip-2', now).success).toBe(true);
    expect(limiter.check('ip-1', now + 1).success).toBe(false);
  });

  it('cho phep tro lai sau khi cua so troi qua', () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 10_000 });
    const now = 1_000_000;

    expect(limiter.check('ip-1', now).success).toBe(true);
    expect(limiter.check('ip-1', now + 5_000).success).toBe(false);
    expect(limiter.check('ip-1', now + 10_001).success).toBe(true);
  });

  it('bao cao so luot con lai chinh xac', () => {
    const limiter = new RateLimiter({ limit: 3, windowMs: 60_000 });
    const now = 1_000_000;

    expect(limiter.check('ip-1', now).remaining).toBe(2);
    expect(limiter.check('ip-1', now + 1).remaining).toBe(1);
    expect(limiter.check('ip-1', now + 2).remaining).toBe(0);
  });

  it('reset xoa lich su cua mot key', () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 60_000 });
    const now = 1_000_000;

    limiter.check('ip-1', now);
    expect(limiter.check('ip-1', now + 1).success).toBe(false);

    limiter.reset('ip-1');
    expect(limiter.check('ip-1', now + 2).success).toBe(true);
  });

  it('resetAll xoa toan bo lich su', () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 60_000 });
    const now = 1_000_000;

    limiter.check('ip-1', now);
    limiter.check('ip-2', now);
    limiter.resetAll();

    expect(limiter.check('ip-1', now + 1).success).toBe(true);
    expect(limiter.check('ip-2', now + 1).success).toBe(true);
  });

  it('resetAt luon nam trong tuong lai khi bi chan', () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 30_000 });
    const now = 1_000_000;

    limiter.check('ip-1', now);
    const blocked = limiter.check('ip-1', now + 1_000);
    expect(blocked.resetAt).toBeGreaterThan(now + 1_000);
  });
});
