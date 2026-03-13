import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

/**
 * POST /api/chat
 *
 * Receives a chat message from the ChatWidget and returns a reply.
 *
 * Real implementation will:
 *   1. Use LangChain to retrieve relevant context from ChromaDB (CHROMA_URL)
 *      seeded with service descriptions, FAQ, and pricing from /data/knowledge-base/.
 *   2. Stream the response via the Vercel AI SDK using ANTHROPIC_API_KEY or
 *      OPENAI_API_KEY with a system prompt that restricts the bot to on-topic
 *      responses. Prompt injection attempts return a safe generic reply.
 *   3. Log the full conversation turn to the Supabase `chat_logs` table.
 *
 * Environment variables required (real implementation):
 *   - CHROMA_URL
 *   - ANTHROPIC_API_KEY  (or OPENAI_API_KEY)
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 */

interface ChatRequestBody {
  message: string;
  sessionId?: string;
}

const MAX_MESSAGE_LENGTH = 1000;

/** Simple keyword-based stub responses used until the LangChain/RAG pipeline is wired up. */
function getStubReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("price") || lower.includes("cost") || lower.includes("budget")) {
    return (
      "Great question! Pricing depends on the scope and complexity of your project. " +
      "Data Analysis projects typically start at $500, ML Applications from $1,500, " +
      "and LLM Bots from $2,000. I recommend booking a free discovery call so Charles " +
      "can give you an accurate quote — visit /book to schedule."
    );
  }

  if (lower.includes("book") || lower.includes("call") || lower.includes("meeting")) {
    return (
      "You can book a free 30-minute discovery call directly on the calendar at /book. " +
      "Charles is available Monday–Friday and will come prepared with ideas for your project."
    );
  }

  if (
    lower.includes("portfolio") ||
    lower.includes("work") ||
    lower.includes("project") ||
    lower.includes("case study")
  ) {
    return (
      "Charles has delivered projects across Data Analysis, Augmented Analytics, ML Applications, " +
      "and LLM Bots. Head to /portfolio to browse featured case studies with real client results."
    );
  }

  return (
    "Hi! I'm Charles's AI assistant. I can help you learn about our services " +
    "(Data Analysis, Augmented Analytics, ML Applications, LLM Bots), discuss your project, " +
    "or help you book a call. What are you looking to build?"
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { message, sessionId } = body as ChatRequestBody;

  // --- Validation ---
  if (!message || typeof message !== "string" || message.trim() === "") {
    return NextResponse.json(
      { error: "Field 'message' is required." },
      { status: 422 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: `Message must not exceed ${MAX_MESSAGE_LENGTH} characters.` },
      { status: 422 }
    );
  }

  // Resolve or generate a session ID so the client can maintain conversation context.
  const resolvedSessionId =
    typeof sessionId === "string" && sessionId.trim() !== ""
      ? sessionId.trim()
      : randomUUID();

  console.log("[/api/chat] Message received:", {
    sessionId: resolvedSessionId,
    messageLength: message.trim().length,
    receivedAt: new Date().toISOString(),
  });

  // --- REAL IMPLEMENTATION (TODO) ---
  // Step 1: Retrieve RAG context from ChromaDB
  // const chromaClient = new ChromaClient({ path: process.env.CHROMA_URL });
  // const collection = await chromaClient.getCollection({ name: "knowledge_base" });
  // const results = await collection.query({ queryTexts: [message], nResults: 4 });

  // Step 2: Stream response via Vercel AI SDK
  // const { stream } = await streamText({
  //   model: anthropic("claude-3-5-sonnet-20241022"),
  //   system: SYSTEM_PROMPT,
  //   messages: [{ role: "user", content: message }],
  //   context: results.documents,
  // });
  // return stream.toDataStreamResponse();

  // Step 3: Log conversation turn to Supabase `chat_logs`
  // await supabase.from("chat_logs").insert({ session_id: resolvedSessionId, role: "user", content: message });

  // --- STUB: keyword-matched response ---
  const reply = getStubReply(message.trim());

  return NextResponse.json(
    { reply, sessionId: resolvedSessionId },
    { status: 200 }
  );
}
