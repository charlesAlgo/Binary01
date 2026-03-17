import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
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

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { email } = body as Record<string, unknown>;

  if (typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 422 });
  }

  const sanitized = email.replace(/\x00/g, "").trim();
  if (sanitized.length === 0 || sanitized.length > 254) {
    return NextResponse.json({ error: "Invalid email." }, { status: 422 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
    return NextResponse.json(
      { error: "Invalid email format." },
      { status: 422 }
    );
  }

  const now = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("bookings")
    .select("id, start_time")
    .eq("attendee_email", sanitized.toLowerCase())
    .gt("start_time", now)
    .limit(1);

  if (error) {
    console.error("[/api/book/check-email] Supabase error:", error.message);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }

  if (data && data.length > 0) {
    const bookingDate = new Date(data[0].start_time).toLocaleDateString(
      "en-US",
      { weekday: "long", month: "long", day: "numeric", year: "numeric" }
    );
    return NextResponse.json(
      {
        error: `This email already has a booking on ${bookingDate}. Please cancel or reschedule it first, or use a different email.`,
        hasBooking: true,
      },
      { status: 409 }
    );
  }

  return NextResponse.json({ allowed: true }, { status: 200 });
}
