import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";
import QuoteConfirmationEmail from "@/components/emails/QuoteConfirmationEmail";

// Prevent Next.js from statically analysing / pre-rendering this route at build time.
export const dynamic = "force-dynamic";

/* ─── IP rate limiter — generous limit, bot/flood protection only ──────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const WINDOW_MS  = 10 * 60 * 1000;

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

/* ─── Email-based brief limit — max 5 submissions per email ────────────── */
const BRIEF_LIMIT = 5;

async function hasExceededBriefLimit(email: string): Promise<boolean> {
  const { count, error } = await supabaseAdmin
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("email", email.toLowerCase())
    .eq("source", "quote_form");
  if (error) return false; // fail open — don't block on DB error
  return (count ?? 0) >= BRIEF_LIMIT;
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

  // --- Validation & sanitization ---
  const clean = (s: string) => s.replace(/\x00/g, "").trim();
  const ALLOWED_SERVICES = ["data-analysis", "augmented-analytics", "ml-applications", "llm-bots", "other"];

  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Field 'name' is required." },
      { status: 422 }
    );
  }
  if (name.length > 100) {
    return NextResponse.json({ success: false, error: "Name must not exceed 100 characters." }, { status: 422 });
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json(
      { success: false, error: "A valid 'email' address is required." },
      { status: 422 }
    );
  }
  if (email.length > 254) {
    return NextResponse.json({ success: false, error: "Email must not exceed 254 characters." }, { status: 422 });
  }

  if (await hasExceededBriefLimit(email.trim())) {
    return NextResponse.json(
      { success: false, error: "You've already submitted 5 project briefs. Please wait for a response or contact us directly." },
      { status: 429 }
    );
  }

  if (!service || typeof service !== "string" || !ALLOWED_SERVICES.includes(service.trim())) {
    return NextResponse.json(
      { success: false, error: `Service must be one of: ${ALLOWED_SERVICES.join(", ")}.` },
      { status: 422 }
    );
  }

  if (!description || typeof description !== "string" || description.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Field 'description' is required." },
      { status: 422 }
    );
  }
  if (description.length > 2000) {
    return NextResponse.json({ success: false, error: "Description must not exceed 2000 characters." }, { status: 422 });
  }

  if (company && company.length > 100) {
    return NextResponse.json({ success: false, error: "Company must not exceed 100 characters." }, { status: 422 });
  }
  if (budget && budget.length > 50) {
    return NextResponse.json({ success: false, error: "Budget must not exceed 50 characters." }, { status: 422 });
  }
  if (timeline && timeline.length > 50) {
    return NextResponse.json({ success: false, error: "Timeline must not exceed 50 characters." }, { status: 422 });
  }

  const lead = {
    name: clean(name),
    email: clean(email),
    company: company ? clean(company) : null,
    service: clean(service),
    description: clean(description),
    budget: budget ? clean(budget) : null,
    timeline: timeline ? clean(timeline) : null,
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
      from: "Charles Shalua <no-reply@data-life.tech>",
      to: lead.email,
      subject: "Got your quote request — I'll respond within 24 hours",
      react: QuoteConfirmationEmail({ name: lead.name, service: lead.service }),
    }).catch((err) => console.error("[/api/quote] Resend error:", err));
  }

  // Step 3: Slack notification (fire-and-forget — don't block the response)
  // Escape < > & to prevent mrkdwn / block-kit injection from user-controlled strings
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (process.env.SLACK_WEBHOOK_URL) {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `*New quote request!* 🚀`,
          `*Name:* ${esc(lead.name)}`,
          `*Email:* ${esc(lead.email)}`,
          `*Company:* ${lead.company ? esc(lead.company) : "—"}`,
          `*Service:* ${esc(lead.service)}`,
          `*Budget:* ${lead.budget ? esc(lead.budget) : "—"}`,
          `*Timeline:* ${lead.timeline ? esc(lead.timeline) : "—"}`,
          `*Description:* ${esc(lead.description)}`,
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
