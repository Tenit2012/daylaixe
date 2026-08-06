/**
 * Rate limiting co ban theo thuat toan cua so truot, luu trong bo nho process.
 *
 * Pham vi ap dung: mot instance server duy nhat (du cho website ca nhan
 * luu luong nho). Khi scale nhieu instance / chay tren edge runtime, thay
 * `MemoryRateLimitStore` bang Redis hoac Upstash - interface giu nguyen.
 */

export interface RateLimitResult {
  /** `true` neu request duoc phep di tiep. */
  success: boolean;
  /** So request toi da trong cua so. */
  limit: number;
  /** So request con lai trong cua so hien tai. */
  remaining: number;
  /** Thoi diem (epoch ms) cua so hien tai het han. */
  resetAt: number;
  /** So giay nen cho truoc khi thu lai (chi co khi bi chan). */
  retryAfterSeconds: number;
}

export interface RateLimitOptions {
  /** So request toi da trong mot cua so. */
  limit: number;
  /** Do dai cua so tinh bang mili giay. */
  windowMs: number;
}

interface Bucket {
  /** Danh sach timestamp cac request trong cua so. */
  hits: number[];
}

export interface RateLimitStore {
  get(key: string): Bucket | undefined;
  set(key: string, bucket: Bucket): void;
  delete(key: string): void;
  clear(): void;
}

export class MemoryRateLimitStore implements RateLimitStore {
  private readonly buckets = new Map<string, Bucket>();

  get(key: string): Bucket | undefined {
    return this.buckets.get(key);
  }

  set(key: string, bucket: Bucket): void {
    this.buckets.set(key, bucket);
  }

  delete(key: string): void {
    this.buckets.delete(key);
  }

  clear(): void {
    this.buckets.clear();
  }

  /** Don cac bucket da het han de bo nho khong phinh vo han. */
  prune(now: number, windowMs: number): void {
    for (const [key, bucket] of this.buckets.entries()) {
      const alive = bucket.hits.filter((hit) => now - hit < windowMs);
      if (alive.length === 0) {
        this.buckets.delete(key);
      } else {
        this.buckets.set(key, { hits: alive });
      }
    }
  }
}

export class RateLimiter {
  private readonly store: MemoryRateLimitStore;
  private readonly options: RateLimitOptions;
  private lastPruneAt = 0;

  constructor(options: RateLimitOptions, store?: MemoryRateLimitStore) {
    this.options = options;
    this.store = store ?? new MemoryRateLimitStore();
  }

  /**
   * Ghi nhan mot request cho `key` (thuong la IP hoac IP + duong dan).
   * `now` co the truyen vao de test khong phu thuoc dong ho that.
   */
  check(key: string, now: number = Date.now()): RateLimitResult {
    const { limit, windowMs } = this.options;

    // Don dep dinh ky, toi da 1 lan moi cua so.
    if (now - this.lastPruneAt > windowMs) {
      this.store.prune(now, windowMs);
      this.lastPruneAt = now;
    }

    const bucket = this.store.get(key) ?? { hits: [] };
    const hits = bucket.hits.filter((hit) => now - hit < windowMs);

    const oldestHit = hits[0];
    const resetAt = oldestHit !== undefined ? oldestHit + windowMs : now + windowMs;

    if (hits.length >= limit) {
      this.store.set(key, { hits });
      return {
        success: false,
        limit,
        remaining: 0,
        resetAt,
        retryAfterSeconds: Math.max(1, Math.ceil((resetAt - now) / 1000)),
      };
    }

    hits.push(now);
    this.store.set(key, { hits });

    return {
      success: true,
      limit,
      remaining: Math.max(0, limit - hits.length),
      resetAt: hits[0] !== undefined ? hits[0] + windowMs : now + windowMs,
      retryAfterSeconds: 0,
    };
  }

  /** Xoa lich su cua mot key (dung trong test hoac sau khi dang nhap thanh cong). */
  reset(key: string): void {
    this.store.delete(key);
  }

  resetAll(): void {
    this.store.clear();
  }
}

/**
 * Cac limiter dung chung cua ung dung.
 * Luu tren `globalThis` de khong bi tao lai moi lan Next.js hot-reload.
 */
const globalForRateLimit = globalThis as unknown as {
  __leadRateLimiter?: RateLimiter;
  __loginRateLimiter?: RateLimiter;
};

/** Form dang ky: toi da 5 lan gui trong 10 phut tren moi IP. */
export const leadRateLimiter =
  globalForRateLimit.__leadRateLimiter ??
  new RateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

/** Dang nhap admin: toi da 8 lan thu trong 15 phut tren moi IP. */
export const loginRateLimiter =
  globalForRateLimit.__loginRateLimiter ??
  new RateLimiter({ limit: 8, windowMs: 15 * 60 * 1000 });

if (process.env.NODE_ENV !== 'production') {
  globalForRateLimit.__leadRateLimiter = leadRateLimiter;
  globalForRateLimit.__loginRateLimiter = loginRateLimiter;
}
