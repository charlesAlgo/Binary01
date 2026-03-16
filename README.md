# Charles Shalua — AI-Powered Freelancing Firm Website

Professional storefront for an AI freelancing firm offering Data Analysis, Augmented Analytics, ML Applications, and LLM Bots.

## Services

| Service | What Clients Get |
|---------|----------------|
| **Data Analysis** | Dashboards, pipelines, automated reports, insight summaries |
| **Augmented Analytics** | NL query interfaces, anomaly detection, AI-generated KPI summaries |
| **ML Applications** | Prediction/classification/recommendation engines as APIs |
| **LLM Bots** | RAG pipelines, chatbots, prompt chains, LLM integrations |

## Tech Stack

- **Framework:** Next.js 15 (App Router) — deployed on Vercel
- **Styling:** Tailwind CSS v4 + Shadcn/UI
- **Database:** Supabase (PostgreSQL)
- **Booking:** Cal.com inline embed + webhooks
- **Email:** Resend
- **Chatbot:** Vercel AI SDK + LangChain + ChromaDB
- **Analytics:** Plausible / Vercel Analytics
- **Notifications:** Slack webhooks

## Getting Started

```bash
npm install
cp .env.example .env.local  # fill in your keys
npm run dev
```

## Pages

- `/` — Home
- `/services/[slug]` — 4 service detail pages
- `/portfolio` — Filterable case studies
- `/book` — Cal.com discovery call booking
- `/contact` — Quote request form
- `/about` — About Charles

## Environment Variables

See `.env.example` for all required variables. Keys needed: Supabase, Resend, Slack webhook, Cal.com webhook secret, OpenAI/Anthropic (chatbot), ChromaDB.

## Deployment

Push to `main` → Vercel auto-deploys. Feature branches get preview URLs automatically.
