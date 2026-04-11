import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getClientIp, makeRateLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const STREAMLIT_APPS = [
  "https://binary01-gzhhs5ykmbvbdbc8qfb5di.streamlit.app",
  "https://binary01-4uhsyappv2a3epfj9hn6699.streamlit.app",
  "https://binary01-3fzxd8bzwu7app5keervpor.streamlit.app",
];

// K-1: Rate limit brute-force attempts against the Bearer token.
const isRateLimited = makeRateLimiter(10, 10 * 60 * 1000);

// K-3: Constant-time comparison to prevent timing-based secret leakage.
function safeEqual(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf8");
    const bufB = Buffer.from(b, "utf8");
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  // K-2: CRON_SECRET is mandatory — its absence means misconfiguration, not fallback.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("[keepalive] FATAL: CRON_SECRET is not configured");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const pingSecret = process.env.PING_SECRET;
  const authHeader = request.headers.get("authorization") ?? "";

  const isVercelCron = safeEqual(authHeader, `Bearer ${cronSecret}`);
  const isExternalPing = !!pingSecret && safeEqual(authHeader, `Bearer ${pingSecret}`);

  if (!isVercelCron && !isExternalPing) {
    console.warn("[keepalive] Unauthorized call — bad or missing Authorization header");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const caller = isVercelCron ? "vercel-cron" : "external-ping";

  const results = await Promise.allSettled(
    STREAMLIT_APPS.map((url) =>
      fetch(url, { method: "GET", signal: AbortSignal.timeout(20000) })
        .then((res) => ({ ok: res.ok, status: res.status }))
        .catch(() => ({ ok: false, status: 0 }))
    )
  );

  // K-4: Strip URLs from response — return only ok/status per app.
  const summary = results.map((r) => (r.status === "fulfilled" ? r.value : { ok: false, status: 0 }));
  const failed = summary.filter((r) => !r.ok);

  if (failed.length > 0) {
    console.error("[keepalive] Some apps failed to respond:", JSON.stringify(failed));
  } else {
    console.log("[keepalive] All apps responded OK");
  }

  console.log("[keepalive]", { caller, ts: new Date().toISOString(), summary });

  return NextResponse.json({ caller, pinged: summary, ts: new Date().toISOString() });
}
