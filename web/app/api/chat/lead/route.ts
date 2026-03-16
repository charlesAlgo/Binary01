import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

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
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, projectType, budget, urgency, recommendedService, fullTranscript } =
    body as ChatLeadRequestBody;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json({ success: false, error: "Field 'name' is required." }, { status: 422 });
  }
  if (!projectType || typeof projectType !== "string" || projectType.trim() === "") {
    return NextResponse.json({ success: false, error: "Field 'projectType' is required." }, { status: 422 });
  }

  // Insert into Supabase `leads` table
  const { error: dbError } = await supabaseAdmin.from("leads").insert({
    name: name.trim(),
    email: "",               // chatbot leads may not have email yet
    service: projectType.trim(),
    source: "chatbot",
    project_type: projectType.trim(),
    budget: budget?.trim() ?? null,
    urgency: urgency?.trim() ?? null,
    recommended_service: recommendedService?.trim() ?? null,
    full_transcript: fullTranscript ?? null,
  });

  if (dbError) {
    console.error("[/api/chat/lead] Supabase insert error:", dbError.message);
    return NextResponse.json({ success: false, error: "Failed to save lead." }, { status: 500 });
  }

  // Slack notification (fire-and-forget)
  if (process.env.SLACK_WEBHOOK_URL) {
    fetch(process.env.SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: [
          `*New chatbot lead!* 🤖`,
          `*Name:* ${name.trim()}`,
          `*Project:* ${projectType.trim()}`,
          `*Budget:* ${budget ?? "—"}`,
          `*Urgency:* ${urgency ?? "—"}`,
          `*Recommended service:* ${recommendedService ?? "—"}`,
        ].join("\n"),
      }),
    }).catch((err) => console.error("[/api/chat/lead] Slack error:", err));
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
