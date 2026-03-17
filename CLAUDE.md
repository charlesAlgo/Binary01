# CLAUDE.md

Guidance for Claude Code agents working in this repository. Read this fully before writing any code.

---

## Project Overview

**DataLife** — Charles Shalua's AI-powered freelancing firm website. Public storefront for Data Analysis, Augmented Analytics, ML Applications, and LLM Bots. Attracts clients from Upwork, Fiverr, and organic search.

**Owner:** Charles Shalua | **Stack root:** `web/` | **Git root:** `C:/Users/user`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + Shadcn/UI |
| Fonts | Satoshi · General Sans · JetBrains Mono — `next/font`, self-hosted via fontshare.com |
| Animations | Framer Motion |
| Booking | Cal.com (`@calcom/embed-react` + webhooks) |
| Chatbot | Vercel AI SDK + `@ai-sdk/groq` (Llama 3.3 70B) — LangChain/ChromaDB installed, not yet active |
| Database | Supabase (PostgreSQL) |
| Email | Resend + React Email templates |
| Analytics | Plausible or Vercel Analytics |
| Hosting | Vercel (Hobby) |
| Notifications | Slack incoming webhooks |

---

## Development Commands

```bash
npm run dev        # http://localhost:3000
npm run build
npm run lint
npm run type-check # tsc --noEmit
```

All env vars in `web/.env.local` (never commit). See `web/.env.example` for the full required list. Chatbot key is `GROQ_API_KEY` — not OpenAI/Anthropic.

---

## Site Architecture

### Pages
| Route | Purpose |
|-------|---------|
| `/` | Home — hero, services, social proof, featured work, CTA |
| `/services/[slug]` | data-analysis · augmented-analytics · ml-applications · llm-bots |
| `/portfolio` | Filterable case study grid |
| `/portfolio/[slug]` | Case study detail |
| `/book` | Cal.com inline embed |
| `/contact` | Quote request form |
| `/about` | About Charles, credentials, tech stack |

### API Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/quote` | POST | Quote form → Supabase leads + Slack + Resend |
| `/api/chat` | POST | Groq chatbot — single-turn, logs to chat_logs |
| `/api/chat/lead` | POST | Save qualified chatbot lead → Supabase + Slack |
| `/api/webhooks/calcom` | POST | BOOKING_CREATED → HMAC verify → Supabase + Slack + Resend |

### Shared Types
All Cal.com payload types live in `web/types/calcom.ts`. Import from there — never redefine inline.

---

## Security Rules — MANDATORY

**Every engineer must follow these. Violations will be caught in QA and cost a full fix cycle.**

### 1. Rate limiting on every POST route
All public API routes must have an in-memory rate limiter at the top of the handler. Pattern:
```ts
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function isRateLimited(ip: string, limit: number, windowMs: number): boolean { ... }
```
Limits by route: `/api/quote` → 3/10min · `/api/chat` → 20/10min · `/api/chat/lead` → 5/10min.

### 2. Webhook secrets must fail hard
Never wrap HMAC verification in `if (process.env.SECRET)`. If the secret is not configured, return 500 immediately:
```ts
if (!process.env.CALCOM_WEBHOOK_SECRET) {
  return NextResponse.json({ error: "Server misconfiguration." }, { status: 500 });
}
```
Silently skipping verification = unauthenticated endpoint.

### 3. Validate and sanitize all string inputs
Every string field from a request body must:
- Be checked for type (`typeof x !== "string"`)
- Have a length cap enforced before use
- Have null bytes stripped: `s.replace(/\x00/g, "").trim()`

Field length caps: `name` ≤ 100 · `email` ≤ 254 · `description` ≤ 2000 · `company/budget/timeline` ≤ 100 · `fullTranscript` ≤ 50000.

### 4. Enum fields must use an allowlist
Any field with a fixed set of values (e.g. `service`) must be validated against an explicit array:
```ts
const ALLOWED = ["data-analysis", "augmented-analytics", "ml-applications", "llm-bots", "other"];
if (!ALLOWED.includes(service.trim())) return 422;
```

### 5. Escape all user strings going to Slack
Every user-controlled value interpolated into a Slack message must be escaped:
```ts
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
```
Unescaped strings allow mrkdwn/block-kit injection.

### 6. Nullable DB columns must match what the API actually inserts
If the API cannot guarantee a value (e.g. chatbot leads have no email), the schema column must be nullable. Never insert `""` to satisfy a `NOT NULL` constraint — insert `null` and make the column `text` (not `text not null`).

### 7. Validate webhook payload fields before DB insert
Before inserting a Cal.com webhook payload, null-check all required fields (`uid`, `title`, `startTime`, `endTime`). A malformed payload must return 400, not cause a silent DB error.

### 8. Return 500 on DB insert failure for webhooks
Cal.com retries on 5xx. If a booking insert fails, return 500 (not 200) so the delivery is retried. Exception: `dbError.code === "23505"` (duplicate uid) is safe to ignore.

### 9. Prompt injection detection on all AI-facing inputs
Any user message sent to an LLM must pass through the injection detector in `app/api/chat/route.ts`. Return the safe generic reply on match — do not return 4xx (avoids fingerprinting).

### 10. Schema policies must be idempotent
All `CREATE POLICY` statements must be wrapped in a `DO $$ IF NOT EXISTS $$` block so re-running the schema file does not error. See `web/supabase/schema.sql` for the pattern.

### 11. Security headers are non-negotiable
`web/next.config.ts` defines CSP, HSTS (2yr + preload), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy for all routes. Never remove or downgrade these.

### 12. NEVER put real secrets in .env.example — ever
`.env.example` is committed to the public repo. It must contain ONLY placeholder values like `your-key-here`.
Real keys live exclusively in `web/.env.local` (gitignored) and in the Vercel dashboard environment variables.

**Hard rule:** Before touching `.env.example`, check every line. If a value looks like a real key (starts with `re_`, `gsk_`, `xai-`, `sb_secret_`, `sb_publishable_`, `https://hooks.slack.com/`, etc.) — replace it with a placeholder immediately. Do not commit, do not stage.

Violation consequence: GitHub secret scanning will block the push, keys must be rotated across all services, and a full security incident cycle is triggered.

---

## Design System

### Colors
```
bg-primary:     #FFFFFF    bg-secondary:  #F0F7FF    bg-tertiary:   #DBEAFE
accent-blue:    #2563EB    accent-sky:    #38BDF8    accent-teal:   #14B8A6
text-primary:   #0F172A    text-secondary:#64748B    border-default:#E2E8F0
```

### Typography
- **H1:** Satoshi Bold 56–72px, -0.02em · **H2:** Satoshi Semibold 36–44px · **H3:** Satoshi Medium 24–28px
- **Body:** General Sans Regular 16–18px, 1.7 line-height · **Code:** JetBrains Mono 14–15px

### Key Components (`components/`)
| Component | Notes |
|-----------|-------|
| `ServiceCard` | Hover: lift -4px, border glow |
| `CaseStudyCard` | Hover: image scale 1.02 |
| `CTAButton` | `filled` = accent-blue · `ghost` = transparent + blue border |
| `Navbar` | Transparent → white/blur on scroll |
| `ChatWidget` | Fixed bottom-right, pulse when closed |
| `CalEmbed` | Client component wrapping `@calcom/embed-react` |

---

## Chatbot Architecture

- **Frontend:** `ChatWidget` POSTs to `/api/chat` with `{ message, sessionId }`. Session ID generated client-side and persisted per conversation.
- **Backend:** `generateText` via `@ai-sdk/groq` (llama-3.3-70b-versatile). Falls back to keyword stub if `GROQ_API_KEY` is absent.
- **Logging:** Both turns (user + assistant) written to `chat_logs` table per request.
- **Lead capture:** On qualification, frontend calls `/api/chat/lead` → Supabase `leads` + Slack.
- **Guardrails:** System prompt + server-side `containsPromptInjection()` check. Injections return a safe reply.
- **Known gap:** Each Groq call is single-turn (no history passed). Multi-turn context requires fetching prior `chat_logs` by `sessionId`.

---

## Supabase Schema

```
leads      — quote_form and chatbot leads. email is nullable (chatbot leads have no email).
bookings   — Cal.com BOOKING_CREATED events. uid is UNIQUE (idempotent retries safe).
chat_logs  — Chatbot conversation turns. Indexed by session_id.
```

RLS enabled on all tables. All server routes use `supabaseAdmin` (service role key). Never use the anon key in server routes.

---

## Performance & Quality Targets

- Lighthouse: Performance > 90 · Accessibility > 90 · SEO > 95
- FCP < 1.2s · CLS < 0.1 · Page weight < 500KB
- All images via `next/image`, max 200KB compressed
- `prefers-reduced-motion` respected for all Framer Motion animations
- WCAG AA contrast on all text/background pairs

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| Mobile | < 640px | Single column, hamburger nav |
| Tablet | 640–1024px | 2-col service grid |
| Desktop | 1024–1280px | Full layout |
| Wide | > 1280px | Max-width 1200px centered |

---

## Agent Team

**Workflow:** You → Prompt Rewriter → Orchestrator → [Execution Agents] → Security Engineer → QA → Docs → Observer → Secretary → You

Security Engineer gates every deployment — blocks on CRITICAL or HIGH vulnerabilities.
QA must pass before any merge to `master`. Sprints are 1 week.

Execution agents: Orchestrator, Research, Data, ML, LLM, Frontend, Backend, QA, Docs
Support agents: Prompt Rewriter, Document Manager, Memory Keeper, Security Engineer, Observer, Secretary
