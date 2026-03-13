import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import SectionHeader from "@/components/SectionHeader";
import ProcessStep from "@/components/ProcessStep";
import TechBadge from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "Augmented Analytics Services",
  description:
    "Natural language queries, anomaly detection, predictive alerts, and AI-driven summaries. Make your data talk back with augmented analytics.",
};

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Natural Language Queries",
    description: "Ask your data questions in plain English — no SQL required. Powered by LangChain and OpenAI so non-technical users get instant answers.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Anomaly Detection",
    description: "Statistical and ML-based models that surface unexpected spikes, drops, or outliers the moment they appear — before they become problems.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Predictive Alerts",
    description: "Set thresholds on forecasted metrics and receive Slack or email notifications before KPIs breach — not after.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    title: "AI-Driven Summaries",
    description: "Auto-generated weekly or daily narrative summaries of your key metrics — written in plain English, ready to paste into your board report.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Self-Serve Analytics",
    description: "Embed a conversational analytics layer into your existing BI tool so every team member can explore data without waiting for a report.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    title: "Real-Time Monitoring",
    description: "Live dashboards connected to streaming or near-real-time data sources so your team always sees the current state of the business.",
  },
];

const STEPS = [
  {
    title: "BI Audit",
    description: "I review your current BI stack, data sources, and user workflows — identifying exactly where AI can add the most value.",
  },
  {
    title: "AI Layer Design",
    description: "We design the natural language interface, anomaly detection logic, and alert rules together. You approve the architecture before a line of code is written.",
  },
  {
    title: "Integration Build",
    description: "The AI layer is built and integrated into your existing dashboards and data warehouse — no rip-and-replace of current tooling.",
  },
  {
    title: "Testing & Rollout",
    description: "User-acceptance testing with your team, training session, and a phased rollout so adoption is smooth and confident.",
  },
];

const DELIVERABLES = [
  "NLP query interface on your BI tool",
  "Anomaly detection model + alert config",
  "Automated weekly narrative reports",
  "Predictive alert pipeline (Slack / email)",
  "User training guide",
  "30-day monitoring & support",
];

const TECH = ["Python", "LangChain", "OpenAI API", "Power BI", "Metabase", "PostgreSQL", "Supabase"];

const PLANS = [
  {
    name: "Starter",
    price: "$500 – $900",
    description: "Add a single AI feature to your existing BI setup.",
    features: [
      "Natural language query layer",
      "1 dashboard integration",
      "Basic anomaly alerts",
      "Written setup guide",
      "1 revision round",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$1,500 – $3,000",
    description: "A full augmented analytics layer across your team's tools.",
    features: [
      "NL queries + predictive alerts",
      "Up to 5 dashboard integrations",
      "AI-driven weekly summaries",
      "Anomaly detection with tuning",
      "Team training + handover call",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Organisation-wide AI analytics with ongoing support.",
    features: [
      "Unlimited integrations",
      "Custom LLM fine-tuning",
      "Real-time streaming data support",
      "Dedicated Slack channel",
      "Monthly maintenance retainer",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

export default function AugmentedAnalyticsPage() {
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
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "var(--font-body)" }} className="hover:text-white">Home</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <Link href="/services" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "var(--font-body)" }} className="hover:text-white">Services</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>Augmented Analytics</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.08)", marginBottom: "1.5rem" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>Augmented Analytics</span>
              </div>

              <h1 style={{ color: "#fff", marginBottom: "1.25rem", lineHeight: 1.08, maxWidth: "14ch" }}>
                Make Your Data Talk Back
              </h1>

              <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", maxWidth: "44ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginBottom: "2.25rem" }}>
                I layer AI on top of your existing BI stack — adding natural language queries, anomaly detection, and predictive alerts without replacing what you already have.
              </p>

              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <CTAButton label="Get a Quote" href="/contact" variant="filled" size="lg" />
                <CTAButton label="See Case Studies" href="/portfolio" variant="white" size="lg" />
              </div>
            </div>

            {/* Right — feature highlights card */}
            <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: "1.75rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
                What you get
              </p>
              {[
                "Ask your data questions in plain English",
                "Catch anomalies before they become crises",
                "Predictive alerts before KPIs breach",
                "Weekly AI-written narrative summaries",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "rgba(62,189,122,0.15)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ── 2. What's Included ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem" }}>
            <SectionHeader
              label="What's included"
              title="AI capabilities layered on your existing stack"
              description="No rip-and-replace. I integrate intelligence into the tools you already use so your team gets smarter answers with zero retraining."
              align="left"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "1.5rem", boxShadow: "var(--shadow-card)", transition: "box-shadow 0.2s, transform 0.2s" }}
                className="hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "var(--color-bg-tag)", color: "var(--color-hero)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.65 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How It Works ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
                How it works
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "2.5rem" }}>
                From BI audit to live AI layer
              </h2>

              {STEPS.map((step, i) => (
                <ProcessStep
                  key={i}
                  number={i + 1}
                  title={step.title}
                  description={step.description}
                  isLast={i === STEPS.length - 1}
                />
              ))}
            </div>

            <div>
              <div style={{ borderRadius: "16px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "2rem", boxShadow: "var(--shadow-card)" }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-primary)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
                  What you get
                </p>
                {DELIVERABLES.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: "1px solid var(--color-border)" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--color-bg-tag)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: "0.9375rem", color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}>{d}</span>
                  </div>
                ))}
                <div style={{ marginTop: "1.75rem" }}>
                  <CTAButton label="Get a Free Quote" href="/contact" variant="filled" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Tech Stack ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "2.5rem" }}>
            <SectionHeader
              label="Tech stack"
              title="Tools I use for Augmented Analytics"
              description="LLM-powered interfaces built on robust data infrastructure — designed to integrate, not replace."
              align="left"
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            {TECH.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Pricing ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <SectionHeader
              label="Pricing"
              title="Transparent, fixed-price plans"
              description="No hourly surprises. Choose a plan or get a custom quote tailored to your stack."
              align="center"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.25rem", alignItems: "stretch" }}>
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                style={{
                  borderRadius: "16px",
                  border: plan.highlight ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                  backgroundColor: plan.highlight ? "var(--color-hero)" : "#fff",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: plan.highlight ? "0 8px 32px rgba(24,61,48,0.18)" : "var(--shadow-card)",
                  position: "relative",
                }}
              >
                {plan.highlight && (
                  <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", padding: "3px 14px", borderRadius: "999px", backgroundColor: "var(--color-accent)", fontSize: "0.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: plan.highlight ? "var(--color-accent)" : "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
                  {plan.name}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.875rem", fontWeight: 700, color: plan.highlight ? "#fff" : "var(--color-text-primary)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                  {plan.price}
                </p>
                <p style={{ fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "1.5rem", lineHeight: 1.55 }}>
                  {plan.description}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: plan.highlight ? "rgba(62,189,122,0.18)" : "var(--color-bg-tag)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, marginTop: "2px" }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.8)" : "var(--color-text-primary)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton label={plan.cta} href="/contact" variant={plan.highlight ? "filled" : "ghost"} size="md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section style={{ backgroundColor: "var(--color-hero)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(62,189,122,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", marginBottom: "1rem" }}>
            Ready to get started?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto", marginBottom: "2.25rem", lineHeight: 1.7 }}>
            Describe your current BI setup and I&apos;ll show you exactly where AI can add the most value.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton label="Get a Free Quote" href="/contact" variant="filled" size="lg" />
            <CTAButton label="Book a Discovery Call" href="/book" variant="white" size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
