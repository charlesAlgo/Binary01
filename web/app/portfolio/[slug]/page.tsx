import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import TechBadge from "@/components/TechBadge";

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */
interface ResultMetric {
  number: string;
  label: string;
}

interface CaseStudy {
  slug: string;
  tag: string;
  tagAccent: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  heroMetric: string;
  challenge: string;
  solution: string;
  results: ResultMetric[];
  tech: string[];
  testimonialQuote: string;
  testimonialName: string;
  testimonialRole: string;
  testimonialInitials: string;
  demoHref?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "logistics-dashboard",
    tag: "Data Analysis",
    tagAccent: "#3EBD7A",
    title: "Real-Time Logistics Dashboard",
    client: "LogiTrack Ltd",
    industry: "Supply Chain & Logistics",
    duration: "3 weeks",
    heroMetric: "94% reduction in manual reporting time",
    challenge:
      "LogiTrack's operations team was spending 15+ hours per week manually pulling shipment data from three different ERPs, formatting it in Excel, and emailing static PDFs to stakeholders. Data was always at least 48 hours stale, decisions were being made on outdated information, and analysts were burning out on rote copy-paste work.",
    solution:
      "I built a live Power BI dashboard connected directly to LogiTrack's PostgreSQL warehouse via an incremental dbt pipeline that refreshes every 30 minutes. A Python-based data quality layer flags anomalies (late shipments, missing carrier codes) before they reach the dashboard, and a scheduled Resend email digest delivers a one-page summary to leadership every morning at 7 AM — no manual intervention required.",
    results: [
      { number: "94%", label: "Reduction in manual reporting hours" },
      { number: "30 min", label: "Data refresh cadence (was 48 hrs)" },
      { number: "15 hrs/wk", label: "Analyst time reclaimed" },
      { number: "3 ERPs", label: "Unified into a single source of truth" },
    ],
    tech: ["Python", "dbt", "PostgreSQL", "Power BI", "Supabase", "Pandas"],
    testimonialQuote:
      "Charles delivered exactly what he promised — on time and with zero drama. Our dashboard has become the single most-used tool in the ops team. I can't imagine going back to the spreadsheet nightmare we had before.",
    testimonialName: "Marcus Osei",
    testimonialRole: "Head of Operations, LogiTrack Ltd",
    testimonialInitials: "MO",
  },
  {
    slug: "nutriflow-bot",
    tag: "LLM Bot",
    tagAccent: "#3B82F6",
    title: "AI Customer Support Bot",
    client: "NutriFlow App",
    industry: "Health & Nutrition SaaS",
    duration: "4 weeks",
    heroMetric: "70% of support queries handled automatically",
    challenge:
      "NutriFlow's customer success team was drowning in repetitive support tickets — subscription billing questions, meal plan FAQs, and app navigation issues made up over 70% of all incoming messages. Response times had ballooned to 18 hours and churn was climbing. Hiring more agents wasn't an option with their runway.",
    solution:
      "I designed and deployed a RAG-based support bot powered by GPT-4o-mini, grounded in NutriFlow's help centre articles and subscription policy docs loaded into ChromaDB. The bot handles tier-1 queries autonomously, escalates to a human when confidence is below threshold, and logs every session to Supabase for ongoing fine-tuning. A Slack webhook notifies the support lead whenever the bot escalates.",
    results: [
      { number: "70%", label: "Queries resolved without human touch" },
      { number: "2 min", label: "Average first response time (was 18 hrs)" },
      { number: "41%", label: "Reduction in support ticket volume" },
      { number: "4.6/5", label: "User satisfaction score post-launch" },
    ],
    tech: [
      "LangChain",
      "GPT-4o-mini",
      "ChromaDB",
      "Supabase",
      "Vercel AI SDK",
      "Next.js",
    ],
    testimonialQuote:
      "We went from drowning in tickets to handling the majority of queries on autopilot within days of launch. The bot is eerily good — users often don't realise they're not talking to a human.",
    testimonialName: "Anika Mensah",
    testimonialRole: "CEO, NutriFlow App",
    testimonialInitials: "AM",
  },
  {
    slug: "churn-prediction",
    tag: "ML Application",
    tagAccent: "#8B5CF6",
    title: "Churn Prediction API",
    client: "FinBridge Capital",
    industry: "Fintech & Lending",
    duration: "2 weeks",
    heroMetric: "87% recall on at-risk accounts — deployed in 2 weeks",
    challenge:
      "FinBridge was losing high-value lending clients without warning. Their account managers had no early-signal system — they only found out a client was leaving after the fact. Retention campaigns were reactive and expensive. The data existed (transaction history, login frequency, support interactions) but no one had modelled it.",
    solution:
      "I engineered a gradient-boosted churn model (XGBoost) trained on 24 months of client behaviour data. Feature engineering focused on recency-frequency-monetary signals plus rolling averages of product usage. The model was wrapped in a FastAPI endpoint deployed on Railway, returning a churn probability score for each client every 24 hours. Scores above 0.65 trigger an automated Slack alert to the assigned account manager.",
    results: [
      { number: "87%", label: "Recall on true churn cases" },
      { number: "0.81", label: "AUC-ROC score on held-out test set" },
      { number: "2 wks", label: "From kickoff to production deployment" },
      { number: "3×", label: "Improvement in retention campaign ROI" },
    ],
    tech: [
      "Python",
      "XGBoost",
      "Scikit-learn",
      "FastAPI",
      "Railway",
      "Pandas",
      "PostgreSQL",
    ],
    testimonialQuote:
      "We had the data sitting there for years. Charles turned it into a live warning system in two weeks flat. Our account managers now have the heads-up they need to actually save the relationship.",
    testimonialName: "James Frimpong",
    testimonialRole: "Chief Risk Officer, FinBridge Capital",
    testimonialInitials: "JF",
  },
  {
    slug: "sales-forecasting",
    tag: "Augmented Analytics",
    tagAccent: "#F59E0B",
    title: "Sales Forecasting Engine",
    client: "RetailEdge Co.",
    industry: "Retail & E-commerce",
    duration: "5 weeks",
    heroMetric: "23% improvement in 12-week forecast accuracy",
    challenge:
      "RetailEdge's merchandising team was relying on a single spreadsheet with a manually tuned seasonality factor to plan stock for 200+ SKUs. Forecast errors were causing both overstock (tied-up capital) and stockouts (lost sales). The finance team had no confidence in the numbers and demanded a rebuild before the peak trading season.",
    solution:
      "I built a Prophet-based time-series forecasting engine with automatic seasonality decomposition, holiday effects for 12 markets, and a Bayesian uncertainty band that gives the team a confidence interval — not just a point estimate. The engine runs in a scheduled Python job, writes results to Supabase, and surfaces the forecasts in an augmented Power BI report that highlights SKUs with high uncertainty so buyers know where to focus attention.",
    results: [
      { number: "23%", label: "Improvement in 12-week MAPE" },
      { number: "200+", label: "SKUs forecasted automatically" },
      { number: "18%", label: "Reduction in overstock carrying cost" },
      { number: "12", label: "Markets with localised holiday calendars" },
    ],
    tech: [
      "Python",
      "Prophet",
      "Pandas",
      "Supabase",
      "Power BI",
      "dbt",
      "Railway",
    ],
    testimonialQuote:
      "Our buyers finally trust the forecast. The confidence intervals were the key — they tell us not just what to expect but where the risk is. We went into peak season with 23% better accuracy and it showed in our margins.",
    testimonialName: "Sophie Darko",
    testimonialRole: "Head of Merchandising, RetailEdge Co.",
    testimonialInitials: "SD",
  },
  {
    slug: "hr-analytics",
    tag: "Data Analysis",
    tagAccent: "#3EBD7A",
    title: "HR Analytics Dashboard",
    client: "TalentBridge Inc.",
    industry: "HR & Talent Acquisition",
    duration: "3 weeks",
    heroMetric: "Hiring cycle reduced by 31%",
    challenge:
      "TalentBridge's talent acquisition team was managing 120+ open roles across 6 departments with no unified view. Time-to-hire, offer acceptance rates, and pipeline conversion were tracked in separate spreadsheets by different recruiters. Leadership had no real-time visibility and could not identify where candidates were dropping off.",
    solution:
      "I consolidated six spreadsheet sources into a normalised PostgreSQL schema via a Python ingestion layer, then built a role-level Tableau dashboard with drill-down from department → role → candidate stage. Key views include: stage conversion funnel, time-in-stage heatmap, and a recruiter performance scoreboard. Automated weekly PDF snapshots are emailed to the CHRO every Monday.",
    results: [
      { number: "31%", label: "Reduction in average hiring cycle length" },
      { number: "6", label: "Data sources unified into one schema" },
      { number: "120+", label: "Open roles tracked in real time" },
      { number: "22%", label: "Improvement in offer acceptance rate" },
    ],
    tech: [
      "Python",
      "PostgreSQL",
      "Tableau",
      "Pandas",
      "Supabase",
      "Resend",
      "dbt",
    ],
    testimonialQuote:
      "What used to take our team a full afternoon to pull together for the monthly board report now takes 30 seconds. The stage conversion funnel alone helped us identify and fix a bottleneck that was costing us great candidates.",
    testimonialName: "Priya Nkemdirim",
    testimonialRole: "CHRO, TalentBridge Inc.",
    testimonialInitials: "PN",
  },
  {
    slug: "fashion-boutique-dashboard",
    tag: "Data Analysis",
    tagAccent: "#3EBD7A",
    title: "Fashion Boutique Retail Analytics Dashboard",
    client: "Luxe & Thread Boutique",
    industry: "Retail & Fashion",
    duration: "2 weeks",
    heroMetric: "118 dead inventory SKUs surfaced — $5,762 in capital recovered",
    challenge:
      "A mid-market fashion boutique was making inventory and pricing decisions based on intuition. Managers had no visibility into which brands were driving returns, which product categories were underperforming, or how much revenue was being lost to markdowns. Without a structured view of their 2,176-record transaction dataset, dead inventory accumulated and pricing decisions were reactive rather than strategic.",
    solution:
      "I built an ETL pipeline (Python + pandas) that cleaned the raw CSV, engineered 8 derived KPIs (revenue_lost, price_band, rating_band, is_dead_inventory, etc.), and exported to Parquet for fast loading. On top of the clean data I delivered a 6-page Streamlit dashboard — Executive Summary, Category Deep Dive, Brand Performance, Markdown & Pricing, Returns Analysis, and Inventory Status — each page answering a specific decision managers actually face. A reusable Plotly/Streamlit design system ensures visual consistency across all chart types.",
    results: [
      { number: "118", label: "Dead inventory SKUs identified (>30% markdown + low rating)" },
      { number: "$5,762", label: "Capital tied up in dead stock — surfaced for clearance" },
      { number: "$25,460", label: "Revenue lost to markdowns quantified across catalogue" },
      { number: "<2s", label: "Dashboard load time on cleaned Parquet file" },
    ],
    tech: ["Python", "pandas", "Streamlit", "Plotly", "Parquet", "pytest", "numpy"],
    testimonialQuote:
      "We finally have a single place to see what's moving, what's dying, and where our markdowns are eating into margin. The dead inventory view alone paid for the project in the first week.",
    testimonialName: "Store Manager",
    testimonialRole: "Luxe & Thread Boutique",
    testimonialInitials: "LT",
    demoHref: "/demo/fashion-boutique",
  },
  {
    slug: "nl-analytics-assistant",
    tag: "Augmented Analytics",
    tagAccent: "#F59E0B",
    title: "AI Natural Language Analytics Assistant",
    client: "Luxe & Thread Boutique",
    industry: "Retail & Fashion",
    duration: "2 weeks",
    heroMetric: "Plain-English → chart in under 3 seconds",
    challenge:
      "Even with a dashboard (Project 1), store managers couldn't get answers to ad-hoc questions without developer help. 'Which Zara products had the highest markdown loss in Fall?' requires writing a pandas query — something non-technical managers can't do. Additionally, no automated system existed to proactively surface anomalies or compile weekly KPIs, meaning issues like rising return rates went unnoticed for weeks.",
    solution:
      "I built a conversational AI assistant powered by Llama 3.3 70B (Groq). The NL query engine converts plain-English questions into pandas code via structured JSON output, then executes the code inside a RestrictedPython sandbox — only pandas and numpy are accessible; file system, network, and eval are fully blocked. A 10-rule anomaly detection engine runs automatically and surfaces HIGH/MEDIUM/LOW severity alerts live in the chat sidebar. A KPI generator computes ~20 metrics and produces formatted weekly Markdown reports for store managers.",
    results: [
      { number: "<3s", label: "Plain-English question → Plotly chart" },
      { number: "10", label: "Automated anomaly rules (returns, ratings, inventory, revenue)" },
      { number: "9", label: "HIGH-severity anomalies detected automatically on first run" },
      { number: "100%", label: "LLM-generated code sandboxed — zero filesystem/network access" },
    ],
    tech: ["Llama 3.3 70B", "Groq API", "RestrictedPython", "Streamlit", "Plotly", "pandas", "Python"],
    testimonialQuote:
      "I can just ask it 'which brands had returns above 15% last month' and it shows me a chart instantly. I don't need to wait for a developer anymore — the data answers me directly.",
    testimonialName: "Operations Lead",
    testimonialRole: "Luxe & Thread Boutique",
    testimonialInitials: "LT",
    demoHref: "/demo/nl-assistant",
  },
  {
    slug: "ecommerce-spending-predictor",
    tag: "ML Application",
    tagAccent: "#8B5CF6",
    title: "E-Commerce Customer Spending Predictor",
    client: "NovaBuy E-Commerce",
    industry: "Retail & E-Commerce",
    duration: "2 weeks",
    heroMetric: "R²=97.8% · predicts within $10.48 of actual yearly spend",
    challenge:
      "NovaBuy had 500 customers and no way to predict how much any individual would spend in the next year. Marketing budgets were allocated equally across all customers — high-value long-term members received the same spend as brand-new signups. Without a spending model, the team couldn't prioritise retention campaigns, personalise offers, or identify which behavioural signals actually drove revenue.",
    solution:
      "I built a full ML pipeline in scikit-learn: four regression models (OLS, Ridge, Lasso, ElasticNet) trained with GridSearchCV hyperparameter tuning and 5-fold cross-validation. A performance threshold gate (R²≥0.95, RMSE≤$15) ensures only production-quality models are deployed. Feature analysis revealed that mobile app engagement and membership length are the dominant revenue drivers — website time adds near-zero predictive value (coefficient $0.31, confirmed by Lasso zeroing it out). The model is served via a FastAPI endpoint and visualised in an interactive Streamlit dashboard with live sliders, batch CSV upload, and a confidence interval on every prediction.",
    results: [
      { number: "97.8%", label: "R² score on held-out test set" },
      { number: "$10.48", label: "RMSE — average prediction error" },
      { number: "1.79%", label: "MAPE — mean absolute % error" },
      { number: "4", label: "Models compared, best selected automatically" },
    ],
    tech: [
      "Python",
      "scikit-learn",
      "FastAPI",
      "Streamlit",
      "pandas",
      "NumPy",
      "joblib",
      "pytest",
    ],
    testimonialQuote:
      "The model immediately showed us what we suspected but couldn't prove — app engagement drives revenue, the website doesn't. We redirected our dev budget to mobile features within a week of seeing the coefficients.",
    testimonialName: "Growth Lead",
    testimonialRole: "NovaBuy E-Commerce",
    testimonialInitials: "NB",
    demoHref: "/demo/ml-predictor",
  },
  {
    slug: "document-bot",
    tag: "LLM Bot",
    tagAccent: "#3B82F6",
    title: "Internal Document Q&A Bot",
    client: "LegalEdge Partners",
    industry: "Legal Services",
    duration: "3 weeks",
    heroMetric: "60% faster document retrieval for the legal team",
    challenge:
      "LegalEdge's associates were spending 2–3 hours per day searching through a 15,000-document repository of contracts, precedents, and compliance policies. Keyword search was unreliable — a clause could be phrased dozens of different ways. Senior partners were frustrated that associates were billing clients for search time rather than analysis.",
    solution:
      "I built a private RAG system using LangChain and ChromaDB, ingesting all 15,000 documents with chunk-level metadata tagging (document type, date, jurisdiction). Associates query the bot in plain English — it retrieves the top-5 relevant passages with source citations, and drafts a structured summary. The system runs entirely on LegalEdge's private cloud with no data leaving their environment, satisfying their data security policy.",
    results: [
      { number: "60%", label: "Faster average document retrieval time" },
      { number: "15K", label: "Documents indexed with metadata" },
      { number: "2.5 hrs", label: "Associate time saved daily per lawyer" },
      { number: "0", label: "Documents leave the private environment" },
    ],
    tech: [
      "LangChain",
      "ChromaDB",
      "GPT-4o",
      "Python",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
    ],
    testimonialQuote:
      "The bot handles document research with a precision our keyword search never could. Associates are billing for analysis, not for searching. It paid for itself within the first billing cycle.",
    testimonialName: "Richard Asante",
    testimonialRole: "Managing Partner, LegalEdge Partners",
    testimonialInitials: "RA",
  },
];

/* ─────────────────────────────────────────────────────────────
   generateStaticParams
───────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

/* ─────────────────────────────────────────────────────────────
   generateMetadata
───────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return { title: "Not Found" };

  const description = `${cs.heroMetric} — A ${cs.tag} case study for ${cs.client} in the ${cs.industry} industry. By Charles Shalua, DataLife.`;
  const url = `https://data-life.tech/portfolio/${cs.slug}`;

  return {
    title: cs.title,
    description,
    keywords: [
      cs.tag,
      cs.industry,
      "case study",
      "freelance AI project",
      "DataLife",
      "Charles Shalua",
    ],
    openGraph: {
      title: `${cs.title} | DataLife Case Study`,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.title} | DataLife Case Study`,
      description,
    },
    alternates: { canonical: url },
  };
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        style={{
          backgroundColor: "var(--color-hero)",
          paddingTop: "clamp(4rem, 10vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 6rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div className="section-wrapper" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              marginBottom: "1.75rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
              className="hover:text-white"
            >
              Home
            </Link>
            <span
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.8125rem",
              }}
            >
              ›
            </span>
            <Link
              href="/portfolio"
              style={{
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
              className="hover:text-white"
            >
              Portfolio
            </Link>
            <span
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.8125rem",
              }}
            >
              ›
            </span>
            <span
              style={{
                fontSize: "0.8125rem",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-body)",
              }}
            >
              {cs.title}
            </span>
          </nav>

          {/* Tag pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "4px 13px",
              borderRadius: "999px",
              border: `1px solid ${cs.tagAccent}50`,
              backgroundColor: `${cs.tagAccent}15`,
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: cs.tagAccent,
                fontFamily: "var(--font-body)",
              }}
            >
              {cs.tag}
            </span>
          </div>

          <h1
            style={{
              color: "#fff",
              marginBottom: "1.5rem",
              lineHeight: 1.08,
              maxWidth: "20ch",
            }}
          >
            {cs.title}
          </h1>

          {/* Client / Industry / Duration chips */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            {[
              { label: "Client", value: cs.client },
              { label: "Industry", value: cs.industry },
              { label: "Duration", value: cs.duration },
            ].map((chip) => (
              <div
                key={chip.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.40)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {chip.label}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {chip.value}
                </span>
              </div>
            ))}
          </div>

          {/* Big metric + optional demo button */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <div
              style={{
                display: "inline-block",
                padding: "1rem 1.75rem",
                borderRadius: "12px",
                border: "1px solid rgba(62,189,122,0.30)",
                backgroundColor: "rgba(62,189,122,0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "4px",
                }}
              >
                Key Result
              </p>
              <p
                style={{
                  fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                  fontWeight: 700,
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {cs.heroMetric}
              </p>
            </div>

            {cs.demoHref && (
              <Link
                href={cs.demoHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "0.875rem 1.5rem",
                  borderRadius: "10px",
                  backgroundColor: "var(--color-accent)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8C3 5.24 5.24 3 8 3s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M6.5 6.5l3 1.5-3 1.5V6.5z" fill="currentColor"/>
                </svg>
                Try Live Demo
              </Link>
            )}
          </div>
        </div>

        {/* Wave divider */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}
        >
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "48px" }}
          >
            <path
              d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ── 2. Challenge & Solution ── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingBlock: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <div className="section-wrapper">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            {/* Challenge */}
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "0.875rem",
                }}
              >
                The Challenge
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                What needed solving
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                {cs.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                  marginBottom: "0.875rem",
                }}
              >
                The Solution
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1.25rem",
                  letterSpacing: "-0.02em",
                }}
              >
                How we solved it
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                {cs.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Results ── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-cream)",
          paddingBlock: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <div className="section-wrapper">
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-body)",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Results
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
              textAlign: "center",
              marginBottom: "3rem",
              letterSpacing: "-0.02em",
            }}
          >
            The numbers tell the story
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {cs.results.map((r) => (
              <div
                key={r.label}
                style={{
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#fff",
                  padding: "2rem 1.75rem",
                  textAlign: "center",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 5vw, 2.75rem)",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    margin: "0 0 0.5rem",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {r.number}
                </p>
                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-body)",
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Tech Stack ── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingBlock: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <div className="section-wrapper">
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-body)",
              marginBottom: "0.5rem",
            }}
          >
            Tech Stack
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
              marginBottom: "1.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Tools used on this project
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            {cs.tech.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Testimonial ── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-cream)",
          paddingBlock: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <div className="section-wrapper">
          <div
            style={{
              maxWidth: "680px",
              marginInline: "auto",
              textAlign: "center",
            }}
          >
            {/* Quote mark */}
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "5rem",
                lineHeight: 1,
                color: "var(--color-accent)",
                opacity: 0.25,
                marginBottom: "-1rem",
              }}
            >
              &ldquo;
            </div>

            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                fontWeight: 500,
                color: "var(--color-text-primary)",
                lineHeight: 1.6,
                letterSpacing: "-0.015em",
                margin: "0 0 2rem",
                fontStyle: "normal",
              }}
            >
              &ldquo;{cs.testimonialQuote}&rdquo;
            </blockquote>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.875rem",
              }}
            >
              {/* Avatar initials */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-hero)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  letterSpacing: "0.02em",
                }}
                aria-hidden="true"
              >
                {cs.testimonialInitials}
              </div>

              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: "var(--color-text-primary)",
                    margin: 0,
                  }}
                >
                  {cs.testimonialName}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--color-text-secondary)",
                    margin: 0,
                  }}
                >
                  {cs.testimonialRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section
        style={{
          backgroundColor: "var(--color-hero)",
          paddingBlock: "clamp(4rem, 8vw, 5.5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(62,189,122,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="section-wrapper"
          style={{ position: "relative", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Ready for results like these?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "1.0625rem",
              fontFamily: "var(--font-body)",
              maxWidth: "44ch",
              marginInline: "auto",
              marginBottom: "2.25rem",
              lineHeight: 1.7,
            }}
          >
            Tell me about your project and I&apos;ll come back with a clear
            scope and quote within 24 hours.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.875rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <CTAButton
              label="Get a Free Quote"
              href="/contact"
              variant="filled"
              size="lg"
            />
            <CTAButton
              label="View All Case Studies"
              href="/portfolio"
              variant="white"
              size="lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
