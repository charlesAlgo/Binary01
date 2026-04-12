import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services — DataLife Automation Agency",
  description:
    "DataLife builds end-to-end business automation systems — lead generation, nurture sequences, CRM automations, notifications, and AI-powered workflows using n8n and OpenClaw.",
  alternates: { canonical: "https://data-life.tech/services" },
};

const AUTOMATION_STAGES = [
  {
    num: "1",
    href: "/services/data-analysis",
    title: "Lead Generation Automation",
    tagline: "Stop prospecting manually. Your pipeline fills itself.",
    description: "We build automated lead capture systems that pull prospects from ads, forms, and web activity — enrich them with company and contact data — and push them directly into your CRM with a Slack alert. No manual data entry. No leads left in an inbox.",
    accent: "#38BDF8",
    tools: ["n8n", "OpenClaw", "Webhooks"],
    features: [
      "Form → CRM auto-entry (under 60 seconds)",
      "Lead enrichment (company, title, LinkedIn)",
      "Instant Slack + email alert to sales owner",
      "Duplicate detection and deduplication",
      "Source tagging (ads, organic, referral)",
      "Webhook trigger from any landing page",
    ],
    phases: [
      {
        name: "Map Your Sources",
        desc: "We identify every place a lead can enter your business — contact forms, ad platforms, referral links, event sign-ups — and document what data you capture versus what you need. You end the session knowing exactly where leads are falling through the cracks.",
      },
      {
        name: "Build the Pipeline",
        desc: "We wire every source into a single n8n workflow that enriches the lead data, creates the CRM record, and fires your Slack/email alert — all within 60 seconds of the lead landing. No Zapier subscriptions. No brittle integrations.",
      },
      {
        name: "Test, Monitor & Hand Over",
        desc: "We run live test submissions through every entry point, verify the CRM entries and alerts are firing correctly, and document the full workflow so your team can maintain it. 30-day monitoring included — we fix anything that breaks.",
      },
    ],
  },
  {
    num: "2",
    href: "/services/augmented-analytics",
    title: "Nurture & Outreach Automation",
    tagline: "Every lead gets followed up. Every time. Automatically.",
    description: "We build behaviour-triggered outreach sequences that follow up with prospects based on what they do — opened an email, visited your pricing page, booked a call, went cold for 14 days. No manual chasing. No leads going cold because someone forgot.",
    accent: "#14B8A6",
    tools: ["n8n", "OpenClaw", "Email"],
    features: [
      "Behaviour-triggered email sequences",
      "Multi-channel: email + SMS + LinkedIn",
      "Re-engagement flows for cold leads",
      "Meeting booked → auto confirmation + prep",
      "Unsubscribe and bounce handling",
      "Personalisation tokens from CRM data",
    ],
    phases: [
      {
        name: "Sequence Design",
        desc: "We map your prospect journey from first touch to booked meeting — identifying the key trigger events, the right message for each stage, and the fallback steps when a lead goes quiet. You approve the flow before any automation is built.",
      },
      {
        name: "Build & Personalise",
        desc: "We build the sequences in n8n and OpenClaw — triggered by CRM stage changes, email opens, page visits, or time delays. Every message pulls personalisation tokens from your CRM so it reads like a one-to-one email, not a broadcast.",
      },
      {
        name: "Track & Optimise",
        desc: "We set up reply detection so sequences stop automatically when a prospect responds. Open rates, click rates, and conversion by step are tracked in a simple dashboard. After 30 days we review the data and tune underperforming steps.",
      },
    ],
  },
  {
    num: "3",
    href: "/services/ml-applications",
    title: "CRM & Close Automation",
    tagline: "Move deals through your pipeline on autopilot.",
    description: "We automate the CRM workflows that your sales team does manually — stage updates, proposal sends, follow-up reminders, contract triggers, and deal-closed handoffs. Deals move faster. Nothing gets stuck waiting on a human to remember.",
    accent: "#10B981",
    tools: ["n8n", "OpenClaw", "CRM APIs"],
    features: [
      "Auto-advance deals on trigger events",
      "Proposal send + follow-up sequence",
      "Contract signed → onboarding trigger",
      "Deal-closed → invoice + Slack celebration",
      "Stale deal alerts (no activity > N days)",
      "Pipeline health dashboard + weekly digest",
    ],
    phases: [
      {
        name: "Pipeline Mapping",
        desc: "We audit your current CRM setup — stages, fields, deal flow, and the manual tasks your team does at each step. We identify every repetitive action that a workflow can replace and every stuck point where deals slow down unnecessarily.",
      },
      {
        name: "Stage Automation",
        desc: "We build n8n workflows that trigger on CRM stage changes — sending proposals, scheduling follow-ups, notifying team members, and moving deals forward automatically when conditions are met. Your pipeline runs itself between human touches.",
      },
      {
        name: "Close & Handoff",
        desc: "When a deal closes, the system fires: invoice created, welcome email sent, onboarding task list opened, Slack message to the team. Everything that used to take 30 minutes of admin after every win happens in under 60 seconds, automatically.",
      },
    ],
  },
  {
    num: "4",
    href: "/services/llm-bots",
    title: "Notifications & Alerts",
    tagline: "Your whole team stays in sync — instantly.",
    description: "We build notification systems that alert your team the moment something important happens — new lead, deal closed, payment received, support ticket opened, inventory low, anomaly detected. The right person knows about every important event in real time.",
    accent: "#8B5CF6",
    tools: ["n8n", "Slack", "SMS", "Email"],
    features: [
      "Slack alerts for every key business event",
      "Email digests (daily, weekly, on-trigger)",
      "SMS alerts for urgent events",
      "Multi-recipient routing by event type",
      "Escalation chains (if not acknowledged)",
      "AI-generated alert summaries",
    ],
    phases: [
      {
        name: "Event Identification",
        desc: "We run a structured workshop to map every business event that your team currently finds out about too late — or not at all. New lead, payment overdue, 5-star review, inventory threshold, support spike. We prioritise by urgency and business impact.",
      },
      {
        name: "Channel & Routing Setup",
        desc: "We build the notification workflows in n8n — routing each event type to the right channel (Slack DM, channel, email, or SMS) and the right people. Urgent events get escalation logic. High-volume events get digest format. Every alert has context, not just a ping.",
      },
      {
        name: "Monitor & Tune",
        desc: "After go-live, we monitor alert volume and relevance for 30 days. Alerts that generate noise get tuned or consolidated. Missed events get added. The goal is a notification system your team trusts and acts on — not one they mute.",
      },
    ],
  },
];

const SECONDARY_SERVICES = [
  {
    href: "/services/data-analysis",
    title: "Data Analysis & Dashboards",
    desc: "Clean pipelines, Power BI dashboards, and automated reports that update themselves.",
    accent: "#38BDF8",
    icon: "📊",
  },
  {
    href: "/services/augmented-analytics",
    title: "Augmented Analytics",
    desc: "Natural language queries and AI-generated insights on top of your existing BI stack.",
    accent: "#14B8A6",
    icon: "🔍",
  },
  {
    href: "/services/ml-applications",
    title: "ML Applications",
    desc: "Churn prediction, demand forecasting, and spend modelling — deployed as production APIs.",
    accent: "#10B981",
    icon: "🤖",
  },
  {
    href: "/services/llm-bots",
    title: "AI Chatbots & RAG",
    desc: "RAG-powered bots trained on your documents for lead qualification and support.",
    accent: "#8B5CF6",
    icon: "💬",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          backgroundColor: "var(--color-hero)",
          paddingTop: "clamp(5rem, 12vw, 8rem)",
          paddingBottom: "clamp(4rem, 8vw, 6rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,136,219,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
            <span className="section-label-dash" />
            <span>SERVICES</span>
          </div>

          <h1 style={{ color: "var(--color-text-hero)", marginBottom: "1.25rem", lineHeight: 1.1, maxWidth: "22ch", marginInline: "auto" }}>
            We automate your entire business pipeline.
          </h1>

          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", maxWidth: "54ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginInline: "auto", marginBottom: "1.5rem" }}>
            Four automation systems — built end-to-end using n8n, OpenClaw, and AI — covering every stage from first lead to closed deal and beyond.
          </p>

          {/* Tool badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.625rem", flexWrap: "wrap" }}>
            {["n8n", "OpenClaw", "Slack Alerts", "Webhooks", "AI Agents"].map((tool) => (
              <span key={tool} style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "0.8125rem", fontWeight: 500, fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.65)", border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)" }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Primary: Automation Systems ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">

          <div style={{ marginBottom: "2.5rem" }}>
            <div className="section-label" style={{ marginBottom: "0.875rem" }}>
              <span className="section-label-dash" />
              <span>AUTOMATION SYSTEMS</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              The four systems every business needs.
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {AUTOMATION_STAGES.map((stage) => (
              <div
                key={stage.num}
                className="forte-card"
                style={{ borderTopColor: stage.accent, padding: "clamp(1.5rem, 4vw, 2.5rem)" }}
              >
                {/* Top: description + features */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginBottom: "2rem" }} className="lg:grid-cols-[1.6fr_1fr]">

                  {/* Left */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                      <div
                        className="stage-badge"
                        style={{ backgroundColor: `${stage.accent}18`, color: stage.accent, border: `1px solid ${stage.accent}35` }}
                      >
                        {stage.num}
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: stage.accent, fontFamily: "var(--font-body)" }}>
                        Stage {stage.num}
                      </span>
                      {/* Tool badges */}
                      <div style={{ display: "flex", gap: "6px", marginLeft: "4px" }}>
                        {stage.tools.map((t) => (
                          <span key={t} style={{ padding: "2px 8px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-body)", backgroundColor: `${stage.accent}15`, color: stage.accent, border: `1px solid ${stage.accent}30` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>
                      {stage.title}
                    </h2>

                    <p style={{ fontSize: "1rem", fontStyle: "italic", color: stage.accent, fontFamily: "var(--font-body)", margin: "0 0 1rem" }}>
                      &ldquo;{stage.tagline}&rdquo;
                    </p>

                    <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.5rem", lineHeight: 1.75, maxWidth: "58ch" }}>
                      {stage.description}
                    </p>

                    <Link
                      href={stage.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 22px",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: "#fff",
                        backgroundColor: "var(--color-accent)",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontFamily: "var(--font-body)",
                        transition: "opacity 0.15s",
                      }}
                    >
                      Get a Quote →
                    </Link>
                  </div>

                  {/* Right — features */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 0.5rem" }}>
                      What&rsquo;s included
                    </p>
                    {stage.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                          <circle cx="10" cy="10" r="9" stroke={stage.accent} strokeWidth="1.5" />
                          <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke={stage.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase strip */}
                <div style={{ borderTop: `1px solid ${stage.accent}25`, paddingTop: "1.75rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.25rem" }}>
                    How it works — 3 phases
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1px", backgroundColor: `${stage.accent}20`, borderRadius: "10px", overflow: "hidden", border: `1px solid ${stage.accent}20` }}>
                    {stage.phases.map((phase, i) => (
                      <div key={phase.name} style={{ backgroundColor: "var(--color-bg-primary)", padding: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.875rem" }}>
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: `${stage.accent}18`, border: `1px solid ${stage.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: stage.accent, fontFamily: "var(--font-display)" }}>{i + 1}</span>
                          </div>
                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-0.01em" }}>
                            {phase.name}
                          </h4>
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.7 }}>
                          {phase.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Secondary: Data & AI ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="section-label" style={{ marginBottom: "0.875rem" }}>
              <span className="section-label-dash" />
              <span>DATA &amp; AI SERVICES</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: "0 0 0.75rem" }}>
              We also build the intelligence layer.
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "56ch", lineHeight: 1.7 }}>
              Automation tells your systems what to do. Data and AI tell you what to automate next — and predict what&rsquo;s coming before it arrives.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
            {SECONDARY_SERVICES.map((s) => (
              <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
                <div
                  className="forte-card"
                  style={{ borderTopColor: s.accent, padding: "1.75rem", height: "100%" }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem", lineHeight: 1 }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.625rem", letterSpacing: "-0.02em" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1rem", lineHeight: 1.65 }}>
                    {s.desc}
                  </p>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: s.accent, fontFamily: "var(--font-body)" }}>
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--color-hero)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,136,219,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-hero)", marginBottom: "1rem" }}>
            Ready to automate your pipeline?
          </h2>
          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "48ch", marginInline: "auto", marginBottom: "2rem", lineHeight: 1.7 }}>
            Book a free 30-minute automation audit. We&rsquo;ll identify your highest-ROI workflow and give you a fixed-price quote before you leave the call.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              Book a Free Automation Audit
            </Link>
            <Link href="/products" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
