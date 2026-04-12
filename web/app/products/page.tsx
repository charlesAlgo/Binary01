import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products & Packages — DataLife Automation Agency",
  description:
    "Fixed-price automation systems from DataLife. Automation Starter from $500. Full Pipeline System from $2,000. Agency OS from $3,000+. Clear scope, clear price, clear delivery.",
  alternates: { canonical: "https://data-life.tech/products" },
};

const PACKAGES = [
  {
    name: "Automation Starter",
    desc: "One complete end-to-end workflow: lead capture → CRM entry → Slack alert → automated follow-up. The fastest way to see what automation does for your business.",
    price: "$500",
    delivery: "7 days",
    accent: "#38BDF8",
    popular: false,
    includes: [
      "One source → CRM integration",
      "Instant Slack + email alert",
      "Automated follow-up sequence (3-step)",
      "Workflow documentation",
    ],
  },
  {
    name: "Full Pipeline System",
    desc: "Complete lead-to-close automation covering capture, enrichment, outreach sequences, CRM stage workflows, deal-close triggers, and a live pipeline dashboard.",
    price: "$2,000",
    delivery: "14 days",
    accent: "#0088DB",
    popular: true,
    includes: [
      "Multi-source lead capture + enrichment",
      "Outreach sequence (email + Slack)",
      "CRM stage automations + deal-close flow",
      "Notification system (Slack + email)",
      "Pipeline health dashboard",
      "30-day monitoring + support",
    ],
  },
  {
    name: "Agency OS",
    desc: "Full business operating system: automation pipeline + AI chatbot + data dashboard + client reporting — everything running on autopilot using n8n and OpenClaw.",
    price: "$3,000+",
    delivery: "21 days",
    accent: "#8B5CF6",
    popular: false,
    includes: [
      "Everything in Full Pipeline System",
      "AI chatbot (RAG, lead qualification)",
      "Data dashboard + automated reports",
      "Client-facing reporting automation",
      "n8n + OpenClaw full setup",
      "60-day monitoring + support",
    ],
  },
];

const INDIVIDUAL_PRODUCTS = [
  {
    stage: "Lead Generation",
    accent: "#38BDF8",
    items: [
      { name: "Lead Capture Workflow", desc: "Form/ad → CRM entry + Slack alert in under 60 seconds.", price: "$400", delivery: "2 days" },
      { name: "Lead Enrichment Pipeline", desc: "Automatically add company, title, and LinkedIn data to every new CRM record.", price: "$500", delivery: "3 days" },
      { name: "Multi-Source Aggregator", desc: "Pull leads from ads, forms, and web events into one unified CRM view.", price: "$700", delivery: "4 days" },
      { name: "Duplicate Detection", desc: "Automatically detect and merge duplicate leads before they clog your CRM.", price: "$300", delivery: "2 days" },
    ],
  },
  {
    stage: "Nurture & Outreach",
    accent: "#14B8A6",
    items: [
      { name: "Email Sequence Automation", desc: "3–5 step behaviour-triggered email sequence with personalisation tokens.", price: "$500", delivery: "3 days" },
      { name: "Re-Engagement Flow", desc: "Automatically reach out to leads that have gone quiet for 14+ days.", price: "$400", delivery: "3 days" },
      { name: "Meeting Booked Automation", desc: "Booking confirmed → prep email → reminder → post-call follow-up, all automatic.", price: "$400", delivery: "2 days" },
      { name: "Multi-Channel Outreach", desc: "Coordinated email + LinkedIn + SMS sequence built in OpenClaw.", price: "$900", delivery: "6 days" },
    ],
  },
  {
    stage: "CRM & Close",
    accent: "#10B981",
    items: [
      { name: "CRM Stage Automations", desc: "Auto-advance deals and trigger actions when conditions are met in your CRM.", price: "$600", delivery: "3 days" },
      { name: "Proposal + Follow-Up Flow", desc: "Proposal sent → 3-step follow-up sequence → reminder alert if no reply.", price: "$500", delivery: "3 days" },
      { name: "Deal-Close Trigger", desc: "Contract signed → invoice created → welcome email → onboarding task list.", price: "$500", delivery: "3 days" },
      { name: "Stale Deal Alert", desc: "Alert sales owner when a deal hasn't moved in N days with context summary.", price: "$300", delivery: "2 days" },
    ],
  },
  {
    stage: "Notifications & Alerts",
    accent: "#8B5CF6",
    items: [
      { name: "Slack Alert System", desc: "Route the right business events to the right Slack channels and DMs.", price: "$400", delivery: "2 days" },
      { name: "Daily/Weekly Digest", desc: "Automated business summary delivered to your inbox or Slack every morning.", price: "$400", delivery: "2 days" },
      { name: "SMS Urgent Alerts", desc: "Critical events (payment failed, system error, high-value lead) via SMS.", price: "$400", delivery: "2 days" },
      { name: "Escalation Chain", desc: "Alert goes unacknowledged → auto-escalate to manager → log the miss.", price: "$500", delivery: "3 days" },
    ],
  },
  {
    stage: "Data & AI (Add-ons)",
    accent: "#F59E0B",
    items: [
      { name: "Pipeline Dashboard", desc: "Live dashboard showing lead volume, conversion rate, deal velocity, and revenue.", price: "$600", delivery: "4 days" },
      { name: "AI Lead Scoring", desc: "ML model that scores inbound leads by conversion likelihood automatically.", price: "$1,200", delivery: "8 days" },
      { name: "AI Chatbot (RAG)", desc: "Chatbot trained on your docs and FAQs — qualifies leads and answers questions 24/7.", price: "$1,200", delivery: "7 days" },
      { name: "Custom ML Model", desc: "Churn prediction, spend forecast, or demand model deployed as an API.", price: "$2,500+", delivery: "14 days" },
    ],
  },
];

export default function ProductsPage() {
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
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", left: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,136,219,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
            <span className="section-label-dash" />
            <span>PRODUCTS</span>
          </div>

          <h1 style={{ color: "var(--color-text-hero)", marginBottom: "1.25rem", lineHeight: 1.1, maxWidth: "22ch", marginInline: "auto" }}>
            Fixed price. Clear scope. Delivered in days.
          </h1>

          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", maxWidth: "52ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginInline: "auto" }}>
            Every automation system is scoped upfront, built on n8n and OpenClaw, and handed over with documentation. No hourly billing, no surprises.
          </p>
        </div>
      </section>

      {/* ── Complete Packages ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="section-label" style={{ marginBottom: "0.75rem" }}>
              <span className="section-label-dash" />
              <span>COMPLETE SYSTEMS</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              Start fast with a full system
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.5rem" }}>
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className="forte-card"
                style={{ borderTopColor: pkg.accent, padding: "2rem", position: "relative" }}
              >
                {pkg.popular && (
                  <div style={{ position: "absolute", top: "-1px", right: "1.25rem", padding: "4px 12px", backgroundColor: pkg.accent, borderBottomLeftRadius: "6px", borderBottomRightRadius: "6px", fontSize: "0.7rem", fontWeight: 700, color: "#000", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Most Popular
                  </div>
                )}

                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.875rem", letterSpacing: "-0.02em" }}>
                  {pkg.name}
                </h3>

                <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.25rem", lineHeight: 1.7 }}>
                  {pkg.desc}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {pkg.includes.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                      <span style={{ color: pkg.accent, flexShrink: 0, fontSize: "0.875rem", marginTop: "1px" }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "1.25rem" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, color: "var(--color-accent-teal)", letterSpacing: "-0.03em" }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                    Delivered in <strong style={{ color: "var(--color-text-primary)" }}>{pkg.delivery}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Individual Products ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label" style={{ marginBottom: "0.75rem" }}>
              <span className="section-label-dash" />
              <span>INDIVIDUAL AUTOMATIONS</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: "0 0 0.75rem" }}>
              Pick exactly what you need
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "50ch", lineHeight: 1.7 }}>
              Not every business needs the full stack. Start with one automation, see the result, and expand from there.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {INDIVIDUAL_PRODUCTS.map((stage) => (
              <div key={stage.stage}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: stage.accent, flexShrink: 0 }} />
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-0.01em" }}>
                    {stage.stage}
                  </h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1rem" }}>
                  {stage.items.map((item) => (
                    <div key={item.name} className="forte-card" style={{ borderTopColor: stage.accent, padding: "1.5rem" }}>
                      <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.5rem", letterSpacing: "-0.01em" }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.25rem", lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-accent-teal)" }}>
                          {item.price}
                        </span>
                        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                          {item.delivery}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--color-hero)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,136,219,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-hero)", marginBottom: "1rem" }}>
            Not sure which system to start with?
          </h2>
          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto", marginBottom: "2rem", lineHeight: 1.7 }}>
            Book a free automation audit and we&rsquo;ll identify the highest-ROI workflow in your business — and quote it on the call.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              Book a Free Audit Call
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              Send a Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
