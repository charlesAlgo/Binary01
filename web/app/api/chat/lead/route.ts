import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/chat/lead
 *
 * Saves a qualified lead captured by the ChatWidget after the bot has
 * gathered enough information to recommend a service.
 *
 * Real implementation will:
 *   1. Insert a row into the Supabase `leads` table (source = "chatbot") using
 *      SUPABASE_SERVICE_ROLE_KEY.
 *   2. Post a Slack notification to SLACK_WEBHOOK_URL with a concise lead
 *      summary (name, project type, budget, urgency, recommended service).
 *
 * Environment variables required (real implementation):
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - SLACK_WEBHOOK_URL
 */

interface ChatLeadRequestBody {
  name: string;
  projectType: string;
  budget?: string;
  urgency?: string;
  recommendedService?: string;
  fullTranscript?: string;
}

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

  const {
    name,
    projectType,
    budget,
    urgency,
    recommendedService,
    fullTranscript,
  } = body as ChatLeadRequestBody;

  // --- Validation ---
  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json(
      { success: false, error: "Field 'name' is required." },
      { status: 422 }
    );
  }

  if (
    !projectType ||
    typeof projectType !== "string" ||
    projectType.trim() === ""
  ) {
    return NextResponse.json(
      { success: false, error: "Field 'projectType' is required." },
      { status: 422 }
    );
  }

  // --- STUB: Log lead to console ---
  console.log("[/api/chat/lead] Qualified lead captured:", {
    name: name.trim(),
    projectType: projectType.trim(),
    budget: budget?.trim() ?? null,
    urgency: urgency?.trim() ?? null,
    recommendedService: recommendedService?.trim() ?? null,
    transcriptLength: fullTranscript?.length ?? 0,
    capturedAt: new Date().toISOString(),
  });

  // --- REAL IMPLEMENTATION (TODO) ---
  // Step 1: Insert into Supabase `leads` table
  // const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.SUPABASE_SERVICE_ROLE_KEY!
  // );
  // await supabase.from("leads").insert({
  //   name, project_type: projectType, budget, urgency,
  //   recommended_service: recommendedService,
  //   full_transcript: fullTranscript,
  //   source: "chatbot",
  // });

  // Step 2: Send Slack notification with lead summary
  // await fetch(process.env.SLACK_WEBHOOK_URL!, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     text: `*New chatbot lead!*\nName: ${name}\nProject: ${projectType}\nBudget: ${budget}\nUrgency: ${urgency}\nRecommended: ${recommendedService}`,
  //   }),
  // });

  return NextResponse.json({ success: true }, { status: 200 });
}
