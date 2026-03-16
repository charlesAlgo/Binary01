import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";
import BookingConfirmationEmail from "@/components/emails/BookingConfirmationEmail";

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
  const signature = request.headers.get("x-cal-signature-256");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing x-cal-signature-256 header." },
      { status: 401 }
    );
  }

  // Read raw body for HMAC verification
  const rawBody = await request.text();

  // Verify HMAC-SHA256 signature
  if (process.env.CALCOM_WEBHOOK_SECRET) {
    const expectedSig = crypto
      .createHmac("sha256", process.env.CALCOM_WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    }
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { triggerEvent, payload } = body as CalcomWebhookBody;

  // Acknowledge all non-BOOKING_CREATED events silently
  if (triggerEvent !== "BOOKING_CREATED") {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const attendee = payload?.attendees?.[0];

  // Step 1: Insert into Supabase `bookings` table
  const { error: dbError } = await supabaseAdmin.from("bookings").insert({
    uid: payload.uid,
    title: payload.title,
    start_time: payload.startTime,
    end_time: payload.endTime,
    attendee_name: attendee?.name ?? null,
    attendee_email: attendee?.email ?? null,
  });

  if (dbError) {
    console.error("[/api/webhooks/calcom] Supabase insert error:", dbError.message);
  }

  // Step 2: Slack notification (fire-and-forget)
  if (process.env.SLACK_WEBHOOK_URL) {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `*New booking!* 📅`,
          `*Event:* ${payload.title}`,
          `*With:* ${attendee?.name ?? "Unknown"} (${attendee?.email ?? "—"})`,
          `*Starts:* ${payload.startTime}`,
          `*Ends:* ${payload.endTime}`,
        ].join("\n"),
      }),
    }).catch((err) => console.error("[/api/webhooks/calcom] Slack error:", err));
  }

  // Step 3: Send confirmation email via Resend (fire-and-forget)
  if (process.env.RESEND_API_KEY && attendee?.email) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
      from: "Charles Shalua <no-reply@datalife.dev>",
      to: attendee.email,
      subject: `Confirmed: ${payload.title}`,
      react: BookingConfirmationEmail({ payload }),
    }).catch((err) => console.error("[/api/webhooks/calcom] Resend error:", err));
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
