import Link from "next/link";

const PACKAGES = [
  {
    name: "Automation Starter",
    desc: "One end-to-end workflow: lead capture → CRM entry → Slack alert → automated follow-up. Done in a week.",
    price: "$500",
    delivery: "7 days",
    accent: "#38BDF8",
    popular: false,
  },
  {
    name: "Full Pipeline System",
    desc: "Complete lead-to-close automation: capture, enrich, sequence, CRM stages, notifications, and reporting dashboard.",
    price: "$2,000",
    delivery: "14 days",
    accent: "#0088DB",
    popular: true,
  },
  {
    name: "Agency OS",
    desc: "Full business operating system: automation pipeline + AI chatbot + data dashboard + client reporting — everything running on autopilot.",
    price: "$3,000+",
    delivery: "21 days",
    accent: "#8B5CF6",
    popular: false,
  },
];

export default function FeaturedWork() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div className="section-label" style={{ marginBottom: "0.875rem" }}>
            <span className="section-label-dash" />
            <span>MOST POPULAR</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              Automation packages
            </h2>
            <Link
              href="/products"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-accent)", textDecoration: "none", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}
            >
              All packages →
            </Link>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
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

              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
                {pkg.name}
              </h3>

              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.5rem", lineHeight: 1.65 }}>
                {pkg.desc}
              </p>

              <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--color-accent-teal)", letterSpacing: "-0.03em" }}>
                  {pkg.price}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                  {pkg.delivery}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
