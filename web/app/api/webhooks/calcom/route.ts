import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhooks/calcom
 *
 * Receives booking webhook events from Cal.com.
 * Only BOOKING_CREATED events are acted on; all other trigger events return
 * 200 silently so Cal.com does not retry them.
 *
 * Real implementation will:
 *   1. Verify the HMAC-SHA256 signature in the `x-cal-signature-256` header
 *      against the raw request body using CALCOM_WEBHOOK_SECRET.
 *   2. Insert the booking into the Supabase `bookings` table using
 *      SUPABASE_SERVICE_ROLE_KEY.
 *   3. Post a Slack notification to SLACK_WEBHOOK_URL with meeting details.
 *   4. Send a confirmation email to the attendee via Resend (RESEND_API_KEY)
 *      including the meeting time, video link, and prep instructions.
 *
 * Environment variables required (real implementation):
 *   - CALCOM_WEBHOOK_SECRET
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - SLACK_WEBHOOK_URL
 *   - RESEND_API_KEY
 */

interface CalcomAttendee {
  name: string;
  email: string;
}

interface CalcomPayload {
  uid: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: CalcomAttendee[];
}

interface CalcomWebhookBody {
  triggerEvent: string;
  payload: CalcomPayload;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // --- Signature header check (stub: presence only) ---
  // Real implementation: compute HMAC-SHA256 of raw body with CALCOM_WEBHOOK_SECRET
  // and compare to this header value using a timing-safe comparison.
  const signature = request.headers.get("x-cal-signature-256");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing x-cal-signature-256 header." },
      { status: 401 }
    );
  }

  // --- REAL IMPLEMENTATION — HMAC verification (TODO) ---
  // const rawBody = await request.text();
  // const expectedSig = crypto
  //   .createHmac("sha256", process.env.CALCOM_WEBHOOK_SECRET!)
  //   .update(rawBody)
  //   .digest("hex");
  // if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
  //   return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  // }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { triggerEvent, payload } = body as CalcomWebhookBody;

  // Acknowledge all non-BOOKING_CREATED events silently so Cal.com does not retry.
  if (triggerEvent !== "BOOKING_CREATED") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // --- Log booking details ---
  console.log("[/api/webhooks/calcom] BOOKING_CREATED received:", {
    uid: payload?.uid,
    title: payload?.title,
    startTime: payload?.startTime,
    endTime: payload?.endTime,
    attendees: payload?.attendees ?? [],
    receivedAt: new Date().toISOString(),
  });

  // --- REAL IMPLEMENTATION (TODO) ---
  // Step 1: Verify HMAC signature (see above)

  // Step 2: Insert into Supabase `bookings` table
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!
  // );
  // await supabase.from("bookings").insert({
  //   uid: payload.uid,
  //   title: payload.title,
  //   start_time: payload.startTime,
  //   end_time: payload.endTime,
  //   attendee_name: payload.attendees[0]?.name,
  //   attendee_email: payload.attendees[0]?.email,
  // });

  // Step 3: Send Slack notification
  // await fetch(process.env.SLACK_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     text: `*New booking!* ${payload.title}\nWith: ${payload.attendees[0]?.name} (${payload.attendees[0]?.email})\nStarts: ${payload.startTime}`,
  //   }),
  // });

  // Step 4: Send confirmation email via Resend
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Charles Shalua <no-reply@charlesshalua.com>",
  //   to: payload.attendees[0]?.email,
  //   subject: `Booking confirmed: ${payload.title}`,
  //   react: BookingConfirmationEmail({ payload }),
  // });

  return NextResponse.json({ received: true }, { status: 200 });
}
