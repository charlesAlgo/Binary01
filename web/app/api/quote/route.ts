import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/quote
 *
 * Receives a contact/quote form submission from the /contact page.
 *
 * Real implementation will:
 *   1. Insert a row into the Supabase `leads` table using SUPABASE_SERVICE_ROLE_KEY.
 *   2. POST a Slack notification to SLACK_WEBHOOK_URL with the lead summary.
 *   3. Send a confirmation email to the client via Resend using RESEND_API_KEY.
 *
 * Environment variables required (real implementation):
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SLACK_WEBHOOK_URL
 *   - RESEND_API_KEY
 */

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

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return NextResponse.json(
      { success: false, error: "Field 'description' is required." },
      { status: 422 }
    );
  }

  // --- STUB: Log received data ---
  console.log("[/api/quote] Quote request received:", {
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() ?? null,
    service: service.trim(),
    description: description.trim(),
    budget: budget?.trim() ?? null,
    timeline: timeline?.trim() ?? null,
    receivedAt: new Date().toISOString(),
  });

  // --- REAL IMPLEMENTATION (TODO) ---
  // Step 1: Insert into Supabase `leads` table
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!
  // );
  // await supabase.from("leads").insert({ name, email, company, service, description, budget, timeline, source: "quote_form" });

  // Step 2: Send Slack notification
  // await fetch(process.env.SLACK_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ text: `New quote request from ${name} (${email}) — Service: ${service}` }),
  // });

  // Step 3: Send confirmation email via Resend
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "Charles Shalua <no-reply@charlesshalua.com>",
  //   to: email,
  //   subject: "We received your quote request",
  //   react: QuoteConfirmationEmail({ name, service }),
  // });

  return NextResponse.json(
    {
      success: true,
      message: "Quote request received. Charles will respond within 24 hours.",
    },
    { status: 200 }
  );
}
