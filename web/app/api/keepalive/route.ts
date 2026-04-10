import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STREAMLIT_APPS = [
  "https://binary01-gzhhs5ykmbvbdbc8qfb5di.streamlit.app",
  "https://binary01-4uhsyappv2a3epfj9hn6699.streamlit.app",
  "https://binary01-3fzxd8bzwu7app5keervpor.streamlit.app",
];

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  // Accept calls from Vercel cron (CRON_SECRET) or external ping services (PING_SECRET).
  // Fail hard if neither secret is configured — misconfiguration must be visible.
  const cronSecret = process.env.CRON_SECRET;
  const pingSecret = process.env.PING_SECRET;

  if (!cronSecret && !pingSecret) {
    console.error("[keepalive] FATAL: neither CRON_SECRET nor PING_SECRET is configured");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const isVercelCron = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const isExternalPing = pingSecret && authHeader === `Bearer ${pingSecret}`;

  if (!isVercelCron && !isExternalPing) {
    console.warn("[keepalive] Unauthorized call — bad or missing Authorization header");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const caller = isVercelCron ? "vercel-cron" : "external-ping";

  const results = await Promise.allSettled(
    STREAMLIT_APPS.map((url) =>
      fetch(url, { method: "GET", signal: AbortSignal.timeout(20000) })
        .then((res) => ({ url, status: res.status, ok: res.ok }))
        .catch((err) => ({ url, status: 0, ok: false, error: String(err) }))
    )
  );

  const summary = results.map((r) => (r.status === "fulfilled" ? r.value : r.reason));
  const failed = summary.filter((r) => !r.ok);

  if (failed.length > 0) {
    console.error("[keepalive] Some apps failed to respond:", JSON.stringify(failed));
  } else {
    console.log("[keepalive] All apps responded OK");
  }

  console.log("[keepalive]", { caller, ts: new Date().toISOString(), summary });

  return NextResponse.json({ caller, pinged: summary, ts: new Date().toISOString() });
}
