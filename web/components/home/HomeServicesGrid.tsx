import Link from "next/link";

const SERVICES = [
  {
    num: "1",
    accent: "#38BDF8",
    title: "Lead Generation Automation",
    tagline: "Stop prospecting manually. Your pipeline fills itself.",
    description: "Automated lead capture from any source — ads, forms, web activity — enriched and pushed into your CRM with a Slack alert in under 60 seconds. No manual entry ever.",
    href: "/services",
  },
  {
    num: "2",
    accent: "#14B8A6",
    title: "Nurture & Outreach Automation",
    tagline: "Every lead gets followed up. Every time. Automatically.",
    description: "Behaviour-triggered sequences that follow up with prospects based on what they do — across email, SMS, and LinkedIn. No manual chasing, no leads going cold.",
    href: "/services",
  },
  {
    num: "3",
    accent: "#10B981",
    title: "Close & Convert",
    tagline: "Move deals through your pipeline on autopilot.",
    description: "CRM stage automations, proposal triggers, and deal-close workflows push deals forward without constant nudging. When a deal closes, the next steps run themselves.",
    href: "/services",
  },
  {
    num: "4",
    accent: "#8B5CF6",
    title: "Notify & Scale",
    tagline: "See what's working. Stop doing it by hand.",
    description: "Real-time Slack alerts, daily digests, and escalation chains so the right person always knows what's happening — without checking dashboards or waiting for reports.",
    href: "/services",
  },
];

export default function HomeServicesGrid() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">

        <div style={{ marginBottom: "2.5rem" }}>
          <div className="section-label" style={{ marginBottom: "0.875rem" }}>
            <span className="section-label-dash" />
            <span>SERVICES</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              Four systems. One end-to-end pipeline.
            </h2>
            <Link href="/services" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-accent)", textDecoration: "none", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
              Explore all services →
            </Link>
          </div>
        </div>

        <div className="flush-grid">
          {SERVICES.map((s) => (
            <Link key={s.num} href={s.href} className="flush-card" style={{ textDecoration: "none", padding: "2rem", backgroundColor: "var(--color-surface)", display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Numbered badge */}
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: s.accent, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#000" }}>{s.num}</span>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", fontStyle: "italic", color: s.accent, fontFamily: "var(--font-body)", margin: "0 0 0.75rem", fontWeight: 500 }}>
                  {s.tagline}
                </p>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.65, maxWidth: "none" }}>
                  {s.description}
                </p>
              </div>

              <div style={{ marginTop: "auto", fontSize: "0.8125rem", fontWeight: 600, color: s.accent, fontFamily: "var(--font-body)" }}>
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
