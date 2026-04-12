const RESULTS = [
  {
    metric: "15 hrs",
    label: "saved per week",
    context: "Logistics team eliminated manual reporting",
    accent: "#38BDF8",
  },
  {
    metric: "3 min",
    label: "to generate reports",
    context: "Was 3 hours — automated with n8n pipeline",
    accent: "#14B8A6",
  },
  {
    metric: "24 / 7",
    label: "lead qualification",
    context: "AI chatbot qualifies and routes leads overnight",
    accent: "#10B981",
  },
  {
    metric: "$5,762",
    label: "inventory recovered",
    context: "118 dead SKUs surfaced by automated audit",
    accent: "#8B5CF6",
  },
  {
    metric: "< 60s",
    label: "new lead → CRM",
    context: "Form submit to Slack alert and CRM entry",
    accent: "#F59E0B",
  },
  {
    metric: "0",
    label: "manual follow-ups",
    context: "Outreach sequences run on trigger, not memory",
    accent: "#0088DB",
  },
  {
    metric: "45 days",
    label: "average payback period",
    context: "Most automations recover their cost within 6 weeks",
    accent: "#10B981",
  },
  {
    metric: "2 wks",
    label: "average delivery time",
    context: "Full pipeline system scoped, built, and handed over",
    accent: "#38BDF8",
  },
];

export default function SocialProof() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">

        {/* Header */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "0.875rem" }}>
            <span className="section-label-dash" />
            <span>REAL RESULTS</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: "0 auto", maxWidth: "30ch" }}>
            What automation actually delivers.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
          {RESULTS.map((r) => (
            <div
              key={r.metric + r.label}
              className="forte-card"
              style={{ borderTopColor: r.accent, padding: "1.75rem" }}
            >
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, color: r.accent, letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {r.metric}
                </span>
                <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-body)", marginTop: "2px" }}>
                  {r.label}
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.6 }}>
                {r.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
