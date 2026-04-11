/**
 * Shared rate-limiting utilities for API routes.
 *
 * IP extraction: prefers `x-real-ip` (set by Vercel's edge, not forgeable by
 * clients) over `x-forwarded-for` (first value is client-supplied and can be
 * spoofed). Falls back to "unknown" for non-Vercel environments.
 *
 * Rate limiter: in-memory, per-serverless-instance. Resets on cold start —
 * acceptable for a low-traffic portfolio site. To harden further, swap the
 * Map for a Vercel KV / Upstash Redis store in isRateLimited below.
 */

/**
 * Returns the best available client IP for the incoming request.
 * Use this instead of reading x-forwarded-for directly in route handlers.
 */
export function getClientIp(
  request: { headers: { get(name: string): string | null } }
): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

/**
 * Creates an independent rate-limiter for one route.
 * Call at module level (outside the handler) so the Map survives across
 * requests within the same serverless instance.
 *
 * @param limit     Max requests allowed in the window.
 * @param windowMs  Window length in milliseconds.
 * @returns isRateLimited(ip) — returns true when the caller should be blocked.
 */
export function makeRateLimiter(
  limit: number,
  windowMs: number
): (ip: string) => boolean {
  const map = new Map<string, { count: number; resetAt: number }>();

  return function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = map.get(ip);
    if (!entry || now > entry.resetAt) {
      map.set(ip, { count: 1, resetAt: now + windowMs });
      return false;
    }
    if (entry.count >= limit) return true;
    entry.count++;
    return false;
  };
}
