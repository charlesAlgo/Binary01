import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getClientIp, makeRateLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const isRateLimited = makeRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
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
    .select("start_time")
    .eq("attendee_email", sanitized.toLowerCase())
    .gt("start_time", now)
    .limit(1);

  if (error) {
    console.error("[/api/book/check-email] Supabase error:", error.message);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }

  // E-1: Do not reveal the booking date — generic message prevents schedule enumeration.
  if (data && data.length > 0) {
    return NextResponse.json(
      {
        error: "This email already has an upcoming booking. Please cancel or reschedule it first, or use a different email.",
        hasBooking: true,
      },
      { status: 409 }
    );
  }

  return NextResponse.json({ allowed: true }, { status: 200 });
}
