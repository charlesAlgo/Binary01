import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";
import QuoteConfirmationEmail from "@/components/emails/QuoteConfirmationEmail";

/* ─── Simple in-memory rate limiter (per IP, max 3 requests / 10 min) ──── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

interface QuoteRequestBody {
  name: string;
  email: string;
  company?: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { name, email, company, service, description, budget, timeline } =
    body as QuoteRequestBody;

  // --- Validation ---
  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Field 'name' is required." },
      { status: 422 }
    );
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json(
      { success: false, error: "A valid 'email' address is required." },
      { status: 422 }
    );
  }

  if (!service || typeof service !== "string" || service.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Field 'service' is required." },
      { status: 422 }
    );
  }

  if (!description || typeof description !== "string" || description.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Field 'description' is required." },
      { status: 422 }
    );
  }

  const lead = {
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() ?? null,
    service: service.trim(),
    description: description.trim(),
    budget: budget?.trim() ?? null,
    timeline: timeline?.trim() ?? null,
    source: "quote_form",
  };

  // Step 1: Insert into Supabase `leads` table
  const { error: dbError } = await supabaseAdmin.from("leads").insert(lead);
  if (dbError) {
    console.error("[/api/quote] Supabase insert error:", dbError.message);
    return NextResponse.json(
      { success: false, error: "Failed to save your request. Please try again." },
      { status: 500 }
    );
  }

  // Step 2: Send confirmation email via Resend (fire-and-forget)
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
      from: "Charles Shalua <no-reply@datalife.dev>",
      to: lead.email,
      subject: "Got your quote request — I'll respond within 24 hours",
      react: QuoteConfirmationEmail({ name: lead.name, service: lead.service }),
    }).catch((err) => console.error("[/api/quote] Resend error:", err));
  }

  // Step 3: Slack notification (fire-and-forget — don't block the response)
  if (process.env.SLACK_WEBHOOK_URL) {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `*New quote request!* 🚀`,
          `*Name:* ${lead.name}`,
          `*Email:* ${lead.email}`,
          `*Company:* ${lead.company ?? "—"}`,
          `*Service:* ${lead.service}`,
          `*Budget:* ${lead.budget ?? "—"}`,
          `*Timeline:* ${lead.timeline ?? "—"}`,
          `*Description:* ${lead.description}`,
        ].join("\n"),
      }),
    }).catch((err) => console.error("[/api/quote] Slack notify error:", err));
  }

  return NextResponse.json(
    {
      success: true,
      message: "Quote request received. Charles will respond within 24 hours.",
    },
    { status: 200 }
  );
}
