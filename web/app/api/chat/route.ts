import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";
import { supabaseAdmin } from "@/lib/supabase";

// Prevent Next.js from statically analysing / pre-rendering this route at build time.
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are the AI assistant for DataLife, an AI and data engineering firm founded by Charles Shalua (Ontario, Canada).

Your job: Help website visitors understand DataLife's services, answer questions about working with Charles, and qualify leads.

## Services & Pricing
- **Data Analysis & BI Dashboards** — Dashboards (Power BI/Tableau), automated reports, pipelines. Starts at $500.
- **Augmented Analytics** — AI on top of BI: NL query interfaces, anomaly detection, AI-generated KPI summaries. Starts at $1,500.
- **ML Applications** — Prediction, classification, recommendation models deployed as APIs. Starts at $2,000.
- **LLM Bots** — RAG pipelines, custom chatbots, prompt chains, LLM integrations. Starts at $2,000.

## Key Facts
- 40+ projects across 15+ industries
- Top Rated on Upwork · Level 2 on Fiverr
- Centennial College — Applied AI program
- Fixed-price quotes — no surprises
- Client owns 100% of code and data on delivery
- NDAs available
- Response within 4 hours · Project kickoff within 48 hours of scoping

## How to Get Started
- Free 30-min discovery call → /book
- Send a project brief → /contact
- Browse case studies → /portfolio

## Rules
- Keep replies concise: 2–4 sentences max
- Only answer questions about DataLife, Charles's services, or how to get started
- If the visitor shares their project, identify which service fits and suggest booking a call
- If asked something off-topic, reply: "I'm here to help with DataLife services. What are you building?"
- Never invent pricing, timelines, or capabilities not listed above
- If someone seems ready to proceed, always end with a CTA to /book or /contact`;

const MAX_MESSAGE_LENGTH = 1000;

/* ─── Prompt injection detection ───────────────────────────────────────── */
const INJECTION_PATTERNS = [
  /ignore (all |previous |above |prior )?(instructions|prompts|rules|context)/i,
  /you are now|pretend (you are|to be)|act as (if|though|a )/i,
  /\bsystem prompt\b/i,
  /\bjailbreak\b/i,
  /forget (everything|all|what)/i,
  /new (role|persona|instructions|directive)/i,
  /\[system\]|\[assistant\]|\[user\]/i,
  /print (your|the) (instructions|prompt|system)/i,
  /disregard (all |previous |above )?(instructions|context|rules)/i,
];

function containsPromptInjection(message: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(message));
}

/* ─── Rate limiter (per IP, max 20 messages / 10 min) ──────────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
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

/** Keyword-based fallback used when GROQ_API_KEY is not configured. */
function getKeywordReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("price") || lower.includes("cost") || lower.includes("budget")) {
    return "Pricing depends on scope. Data Analysis starts at $500, ML Applications from $2,000, and LLM Bots from $2,000. Charles always provides a fixed-price quote — book a free discovery call at /book to get an accurate number.";
  }
  if (lower.includes("book") || lower.includes("call") || lower.includes("meeting")) {
    return "You can book a free 30-minute discovery call at /book. Charles is available Monday–Friday and will come prepared with ideas for your project.";
  }
  if (lower.includes("portfolio") || lower.includes("work") || lower.includes("case study")) {
    return "Charles has delivered 40+ projects across Data Analysis, ML Applications, LLM Bots, and Augmented Analytics. Head to /portfolio to browse featured case studies.";
  }
  return "Hi! I'm Charles's AI assistant. I can help with DataLife's services, pricing, and how to get started. What are you building?";
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages. Please wait a few minutes." }, { status: 429 });
  }

  const { message, sessionId } = body as { message: string; sessionId?: string };

  if (!message || typeof message !== "string" || message.trim() === "") {
    return NextResponse.json({ error: "Field 'message' is required." }, { status: 422 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.` }, { status: 422 });
  }

  const resolvedSessionId =
    typeof sessionId === "string" && sessionId.trim() !== ""
      ? sessionId.trim()
      : randomUUID();

  const userMessage = message.replace(/\x00/g, "").trim();

  // Return a safe generic reply for prompt injection attempts — no 4xx to avoid fingerprinting
  if (containsPromptInjection(userMessage)) {
    return NextResponse.json(
      { reply: "I'm here to help with DataLife services. What are you building?", sessionId: resolvedSessionId },
      { status: 200 }
    );
  }

  let reply: string;

  // Use Groq + Llama 3.3 if API key is configured, otherwise fall back to keyword stub
  if (process.env.GROQ_API_KEY) {
    try {
      const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        system: SYSTEM_PROMPT,
        prompt: userMessage,
        maxOutputTokens: 300,
      });
      reply = text.trim();
    } catch (err) {
      console.error("[/api/chat] Groq error:", err);
      reply = getKeywordReply(userMessage);
    }
  } else {
    reply = getKeywordReply(userMessage);
  }

  // Log conversation turn to Supabase (fire-and-forget)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabaseAdmin.from("chat_logs").insert([
      { session_id: resolvedSessionId, role: "user", content: userMessage },
      { session_id: resolvedSessionId, role: "assistant", content: reply },
    ]).then(({ error }) => {
      if (error) console.error("[/api/chat] Supabase log error:", error.message);
    });
  }

  return NextResponse.json({ reply, sessionId: resolvedSessionId }, { status: 200 });
}
