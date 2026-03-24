import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const STREAMLIT_APPS = [
  "https://binary01-gzhhs5ykmbvbdbc8qfb5di.streamlit.app",
  "https://binary01-4uhsyappv2a3epfj9hn6699.streamlit.app",
  "https://binary01-3fzxd8bzwu7app5keervpor.streamlit.app",
];

export async function GET(request: Request) {
  // Only allow calls from Vercel cron (has authorization header) or internally
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await Promise.allSettled(
    STREAMLIT_APPS.map((url) =>
      fetch(url, { method: "GET", signal: AbortSignal.timeout(15000) })
        .then((res) => ({ url, status: res.status, ok: res.ok }))
        .catch((err) => ({ url, status: 0, ok: false, error: String(err) }))
    )
  );

  const summary = results.map((r) => (r.status === "fulfilled" ? r.value : r.reason));
  console.log("[keepalive]", summary);

  return NextResponse.json({ pinged: summary, ts: new Date().toISOString() });
}
