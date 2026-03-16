# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

This is the **Charles Shalua AI-Powered Freelancing Firm** website — the public storefront for a freelancing business offering Data Analysis, Augmented Analytics, ML Applications, and LLM Bots. The site attracts clients from Upwork, Fiverr, and organic search.

**Owner:** Charles Shalua
**Date:** March 2026

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 + Shadcn/UI |
| Fonts | Satoshi (display) · General Sans (body) · JetBrains Mono (code) — all via `next/font`, self-hosted from fontshare.com |
| Animations | Framer Motion |
| Booking | Cal.com (`@calcom/embed-react` + webhooks) |
| Chatbot | Vercel AI SDK + LangChain + ChromaDB |
| Database | Supabase (PostgreSQL) |
| Email | Resend (React Email templates) |
| Analytics | Plausible or Vercel Analytics |
| Hosting | Vercel (Hobby) |
| Notifications | Slack incoming webhooks |

---

## Development Commands

```bash
npm run dev        # Start local dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server locally
npm run lint       # ESLint check
npm run type-check # TypeScript check (tsc --noEmit)
```

Environment variables go in `.env.local` (never committed). Required vars:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `SLACK_WEBHOOK_URL`
- `CALCOM_WEBHOOK_SECRET`
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` (for chatbot)
- `CHROMA_URL` (ChromaDB instance)

---

## Site Architecture

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, service cards, social proof, featured work, how-we-work, CTA |
| `/services/data-analysis` | Data Analysis service page |
| `/services/augmented-analytics` | Augmented Analytics service page |
| `/services/ml-applications` | ML Applications service page |
| `/services/llm-bots` | LLM Bots service page |
| `/portfolio` | Filterable case study grid |
| `/portfolio/[slug]` | Full case study detail page |
| `/book` | Cal.com inline booking embed |
| `/contact` | Quote request form |
| `/about` | About Charles, credentials, tech stack |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/quote` | POST | Quote form → Supabase + Slack + Resend email |
| `/api/chat` | POST | Chatbot messages → Vercel AI SDK streaming + LangChain RAG |
| `/api/chat/lead` | POST | Save qualified chatbot lead → Supabase + Slack |
| `/api/webhooks/calcom` | POST | Cal.com booking → verify signature → Supabase + Slack |

---

## Design System

### Colors (CSS tokens)

```
bg-primary:     #FFFFFF  — main background
bg-secondary:   #F0F7FF  — card/section backgrounds
bg-tertiary:    #DBEAFE  — hover states, badges
accent-blue:    #2563EB  — primary CTAs, links, active states
accent-sky:     #38BDF8  — highlights, decorative
accent-teal:    #14B8A6  — success, chatbot indicator, data viz
text-primary:   #0F172A  — headings, body
text-secondary: #64748B  — descriptions, meta
border-default: #E2E8F0  — card borders, dividers
```

### Typography

- **H1/Display:** Satoshi Bold, 56–72px, letter-spacing -0.02em
- **H2:** Satoshi Semibold, 36–44px
- **H3:** Satoshi Medium, 24–28px
- **Body:** General Sans Regular, 16–18px, line-height 1.7
- **Labels/Meta:** General Sans Medium, 12–14px, uppercase, tracking +0.08em
- **Code:** JetBrains Mono, 14–15px

### Key Components (in `components/`)

| Component | Props | Notes |
|-----------|-------|-------|
| `ServiceCard` | icon, title, description, href | Hover: lift -4px, border glow |
| `CaseStudyCard` | image, title, client, problem, result, tag | Hover: image scale 1.02 |
| `CTAButton` | label, href, variant (`filled`\|`ghost`) | Filled: accent-blue; Ghost: transparent + blue border |
| `Navbar` | links, cta | Transparent → white/90+blur on scroll |
| `SectionHeader` | label, title, description | Centered, label uppercase accent-blue |
| `TechBadge` | icon, label | bg-tertiary, JetBrains Mono |
| `StatCard` | number, label | Used in social proof |
| `ProcessStep` | number, title, description | Connected by dashed line |
| `ChatWidget` | isOpen, onToggle | Fixed bottom-right, pulse animation when closed |
| `Footer` | links, socials | bg-secondary, 4-column desktop |

---

## AI Chatbot Architecture

The chatbot (`ChatWidget`) is a floating lead-qualification assistant:

1. **Frontend:** `ChatWidget` component uses the Vercel AI SDK `useChat` hook to stream responses from `/api/chat`.
2. **Backend (`/api/chat`):** LangChain retrieves relevant context from ChromaDB (service descriptions, FAQ, pricing), then streams a response.
3. **Lead capture:** After qualifying, the bot calls `/api/chat/lead` to save `{ name, project_type, has_data, current_tools, urgency, budget, recommended_service, full_transcript }` to Supabase and fires a Slack notification.
4. **Guardrails:** The system prompt restricts the bot to on-topic (our services) responses. Prompt injection attempts get a safe generic reply.

ChromaDB is seeded with content from `/data/knowledge-base/` (service descriptions, pricing, FAQ in markdown).

---

## Cal.com Booking Integration

- Page: `/book` — two-column layout, `@calcom/embed-react` inline embed on right (60% width).
- On `BOOKING_CREATED`, Cal.com POSTs to `/api/webhooks/calcom`.
- Handler: verifies HMAC signature → saves to Supabase `bookings` table → Slack notification.
- Booking confirmation email sent by Resend with meeting time, video link, and prep instructions.

---

## Supabase Schema (key tables)

```sql
leads         -- from quote form and chatbot
bookings      -- from Cal.com webhook
chat_logs     -- full chatbot transcripts
```

Row-level security is enabled. All inserts via service role key in server-only API routes.

---

## Performance & Quality Targets

- Lighthouse Performance > 90, Accessibility > 90, SEO > 95
- FCP < 1.2s, CLS < 0.1, initial page weight < 500KB
- All images via `next/image`, max 200KB after compression
- Respect `prefers-reduced-motion` for all animations
- WCAG AA contrast on all text/background pairs

---

## Responsive Breakpoints

| Breakpoint | Width | Notes |
|-----------|-------|-------|
| Mobile | < 640px | Single column, hamburger nav, hero 36px |
| Tablet | 640–1024px | 2-col service grid, links visible |
| Desktop | 1024–1280px | Full layout, 2x2 services, 3-col portfolio |
| Wide | > 1280px | Max-width 1200px centered, hero 72px |

---

## MCP Servers

Three MCP servers are configured in `.mcp.json` and available in Claude Code:

| Server | Package | Purpose |
|--------|---------|---------|
| `21st-magic` | `@21st-dev/magic` | AI-powered UI component generation — generates production-ready React/Tailwind components on demand |
| `nano-banana` | `nano-banana-mcp` | Gemini-powered code generation and analysis assistant |
| `stitch` | `stitch-mcp` | Google Cloud integration — Firebase, Cloud Storage, GCP services (project: `portfolio-project-490121`) |

These are project-scoped MCPs (`.mcp.json` at repo root). Restart Claude Code after any changes to `.mcp.json`.

---

## Agent Team (for context)

This project is built and maintained using a 15-agent Agile team. The workflow is:

**You → Prompt Rewriter → Orchestrator → [Execution Agents] → Security Engineer → QA → Docs Agent → Observer → Secretary → You**

Execution agents: Orchestrator, Research, Data, ML, LLM, Frontend, Backend, QA, Docs
Support agents: Prompt Rewriter, Document Manager, Memory Keeper, Security Engineer, Observer, Secretary

Sprints are 1 week. Security Engineer gates every deployment (blocks on critical/high vulnerabilities). QA must pass before any merge to main.
