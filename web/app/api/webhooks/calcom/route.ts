import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";
import BookingConfirmationEmail from "@/components/emails/BookingConfirmationEmail";
import type { CalcomPayload, CalcomWebhookBody } from "@/types/calcom";

// Prevent Next.js from statically analysing / pre-rendering this route at build time.
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Hard guard — refuse to operate without the secret configured
  if (!process.env.CALCOM_WEBHOOK_SECRET) {
    console.error("[/api/webhooks/calcom] CALCOM_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported media type." }, { status: 415 });
  }

  const signature = request.headers.get("x-cal-signature-256");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing x-cal-signature-256 header." },
      { status: 401 }
    );
  }

  // Read raw body for HMAC verification
  const rawBody = await request.text();

  // Verify HMAC-SHA256 signature — always required
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

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { triggerEvent, payload } = body as CalcomWebhookBody;

  console.log("[/api/webhooks/calcom] triggerEvent:", triggerEvent);
  console.log("[/api/webhooks/calcom] payload keys:", Object.keys(payload ?? {}));
  console.log("[/api/webhooks/calcom] uid:", payload?.uid, "title:", payload?.title);

  // Acknowledge all non-BOOKING_CREATED events silently
  if (triggerEvent !== "BOOKING_CREATED") {
    console.log("[/api/webhooks/calcom] Ignoring event:", triggerEvent);
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // Validate required payload fields before attempting DB insert
  if (!payload?.uid || !payload?.title || !payload?.startTime || !payload?.endTime) {
    console.error("[/api/webhooks/calcom] Malformed payload — missing required fields:", payload);
    return NextResponse.json({ error: "Malformed payload." }, { status: 400 });
  }

  const attendee = payload?.attendees?.[0];

  // Step 1: Insert into Supabase `bookings` table
  const { error: dbError } = await supabaseAdmin.from("bookings").insert({
    uid: payload.uid,
    title: payload.title,
    start_time: payload.startTime,
    end_time: payload.endTime,
    attendee_name: attendee?.name ?? null,
    attendee_email: attendee?.email ? attendee.email.toLowerCase() : null,
  });

  if (dbError) {
    if (dbError.code !== "23505") {
      // 23505 = unique_violation (Cal.com retry of already-recorded booking — safe to ignore)
      console.error("[/api/webhooks/calcom] Supabase insert error:", dbError.message);
      return NextResponse.json({ error: "Database error." }, { status: 500 });
    }
    console.warn("[/api/webhooks/calcom] Duplicate booking uid — ignoring:", dbError.message);
  }

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const notifications: Promise<unknown>[] = [];

  // Step 2: Slack notification
  if (process.env.SLACK_WEBHOOK_URL) {
    notifications.push(
      fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: [
            `*New booking!* 📅`,
            `*Event:* ${esc(payload.title)}`,
            `*With:* ${esc(attendee?.name ?? "Unknown")} (${esc(attendee?.email ?? "—")})`,
            `*Starts:* ${esc(payload.startTime)}`,
            `*Ends:* ${esc(payload.endTime)}`,
          ].join("\n"),
        }),
      }).catch((err) => console.error("[/api/webhooks/calcom] Slack error:", err))
    );
  }

  // Step 3: Send emails via Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 3a. Confirmation to the attendee
    if (attendee?.email) {
      notifications.push(
        resend.emails.send({
          from: "Charles Shalua <no-reply@data-life.tech>",
          to: attendee.email,
          subject: `Confirmed: ${payload.title}`,
          react: BookingConfirmationEmail({ payload }),
        }).catch((err) => console.error("[/api/webhooks/calcom] Resend client email error:", err))
      );
    }

    // 3b. Admin notification to Charles
    const adminEmail = process.env.ADMIN_EMAIL ?? process.env.RESEND_FROM_EMAIL;
    if (adminEmail) {
      notifications.push(
        resend.emails.send({
          from: "DataLife Notifications <no-reply@data-life.tech>",
          to: adminEmail,
          subject: `New booking: ${payload.title}`,
          text: [
            `New booking received via Cal.com`,
            ``,
            `Event:   ${payload.title}`,
            `Name:    ${attendee?.name ?? "—"}`,
            `Email:   ${attendee?.email ?? "—"}`,
            `Start:   ${payload.startTime}`,
            `End:     ${payload.endTime}`,
          ].join("\n"),
        }).catch((err) => console.error("[/api/webhooks/calcom] Resend admin email error:", err))
      );
    }
  }

  await Promise.all(notifications);

  return NextResponse.json({ received: true }, { status: 200 });
}
