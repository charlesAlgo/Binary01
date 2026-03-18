import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string): boolean {
  const limit = 30;
  const windowMs = 10 * 60 * 1000;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 422 });
  }

  // Reject semantically invalid dates (e.g. 2026-13-45 passes the regex but is not a real date)
  if (isNaN(new Date(date + "T00:00:00").getTime())) {
    return NextResponse.json({ error: "Invalid date." }, { status: 422 });
  }

  // Accept client-provided UTC boundaries so the query covers the user's local day,
  // not just the UTC calendar day (fixes double-booking risk for non-UTC timezones).
  const rawStart = searchParams.get("startUtc");
  const rawEnd   = searchParams.get("endUtc");
  const isValidISO = (s: string) => !isNaN(new Date(s).getTime());

  const dayStart = rawStart && isValidISO(rawStart) ? rawStart : `${date}T00:00:00.000Z`;
  const dayEnd   = rawEnd   && isValidISO(rawEnd)   ? rawEnd   : `${date}T23:59:59.999Z`;

  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("start_time, end_time")
    .gte("start_time", dayStart)
    .lte("start_time", dayEnd);

  if (error) {
    console.error("[/api/book/slots] Supabase error:", error.message);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }

  const bookedSlots = (data ?? []).map((b) => ({
    start: b.start_time,
    end: b.end_time,
  }));

  return NextResponse.json({ date, bookedSlots }, { status: 200 });
}
