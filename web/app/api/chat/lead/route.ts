import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

/* ─── Rate limiter (per IP, max 5 submissions / 10 min) ────────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
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

interface ChatLeadRequestBody {
  name: string;
  projectType: string;
  budget?: string;
  urgency?: string;
  recommendedService?: string;
  fullTranscript?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, error: "Too many requests. Please wait a few minutes." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, projectType, budget, urgency, recommendedService, fullTranscript } =
    body as ChatLeadRequestBody;

  const clean = (s: string) => s.replace(/\x00/g, "").trim();

  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json({ success: false, error: "Field 'name' is required." }, { status: 422 });
  }
  if (name.length > 100) {
    return NextResponse.json({ success: false, error: "Name must not exceed 100 characters." }, { status: 422 });
  }
  if (!projectType || typeof projectType !== "string" || projectType.trim() === "") {
    return NextResponse.json({ success: false, error: "Field 'projectType' is required." }, { status: 422 });
  }
  if (projectType.length > 200) {
    return NextResponse.json({ success: false, error: "projectType must not exceed 200 characters." }, { status: 422 });
  }
  if (budget && budget.length > 50) {
    return NextResponse.json({ success: false, error: "Budget must not exceed 50 characters." }, { status: 422 });
  }
  if (urgency && urgency.length > 50) {
    return NextResponse.json({ success: false, error: "Urgency must not exceed 50 characters." }, { status: 422 });
  }
  if (recommendedService && recommendedService.length > 100) {
    return NextResponse.json({ success: false, error: "recommendedService must not exceed 100 characters." }, { status: 422 });
  }
  if (fullTranscript && fullTranscript.length > 50000) {
    return NextResponse.json({ success: false, error: "Transcript too large." }, { status: 422 });
  }

  // Insert into Supabase `leads` table
  const { error: dbError } = await supabaseAdmin.from("leads").insert({
    name: clean(name),
    email: null,             // chatbot leads may not have email yet
    service: clean(projectType),
    source: "chatbot",
    project_type: clean(projectType),
    budget: budget ? clean(budget) : null,
    urgency: urgency ? clean(urgency) : null,
    recommended_service: recommendedService ? clean(recommendedService) : null,
    full_transcript: fullTranscript ? fullTranscript.replace(/\x00/g, "") : null,
  });

  if (dbError) {
    console.error("[/api/chat/lead] Supabase insert error:", dbError.message);
    return NextResponse.json({ success: false, error: "Failed to save lead." }, { status: 500 });
  }

  // Slack notification (fire-and-forget)
  // Escape < > & to prevent mrkdwn / block-kit injection from user-controlled strings
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  if (process.env.SLACK_WEBHOOK_URL) {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `*New chatbot lead!* 🤖`,
          `*Name:* ${esc(clean(name))}`,
          `*Project:* ${esc(clean(projectType))}`,
          `*Budget:* ${budget ? esc(clean(budget)) : "—"}`,
          `*Urgency:* ${urgency ? esc(clean(urgency)) : "—"}`,
          `*Recommended service:* ${recommendedService ? esc(clean(recommendedService)) : "—"}`,
        ].join("\n"),
      }),
    }).catch((err) => console.error("[/api/chat/lead] Slack error:", err));
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
