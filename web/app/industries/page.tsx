import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries We Serve — DataLife",
  description:
    "DataLife builds data systems, ML models, and AI tools for E-Commerce, Healthcare, Real Estate, Marketing Agencies, Finance, and Logistics. Plain-English results, not jargon.",
  alternates: { canonical: "https://data-life.tech/industries" },
};

const INDUSTRIES = [
  {
    name: "E-Commerce & Retail",
    accent: "#38BDF8",
    icon: "🛒",
    useCases: [
      "Sales by SKU dashboard — know what's selling and what's collecting dust",
      "Customer lifetime value model — find your best buyers before they churn",
      "Inventory demand forecast — stop over-ordering and stop running out",
      "Abandoned cart automation — alert your team the moment a big order drops off",
    ],
  },
  {
    name: "Healthcare & Clinics",
    accent: "#10B981",
    icon: "🏥",
    useCases: [
      "Appointment volume & no-show dashboard — spot patterns before they cost you",
      "No-show prediction model — send reminders to the patients most likely to miss",
      "Revenue per service report — see which services are actually profitable",
      "Automated recall campaign — re-engage patients due for follow-ups automatically",
    ],
  },
  {
    name: "Real Estate",
    accent: "#8B5CF6",
    icon: "🏡",
    useCases: [
      "Listing performance dashboard — compare views, leads, and days-on-market",
      "Lead quality scoring model — focus agent time on the most likely buyers",
      "AI chatbot for property inquiries — answer listing questions 24/7",
      "Pipeline-to-close analytics — see where deals stall and fix it",
    ],
  },
  {
    name: "Marketing Agencies",
    accent: "#F59E0B",
    icon: "📊",
    useCases: [
      "Unified cross-channel report — Google Ads, Meta, and email in one view",
      "Campaign ROI dashboard — show clients what's working, in plain numbers",
      "Automated weekly performance digest — Slack or email, every Monday morning",
      "AI assistant trained on your reports — answer client questions instantly",
    ],
  },
  {
    name: "Finance & Fintech",
    accent: "#14B8A6",
    icon: "💳",
    useCases: [
      "Portfolio performance dashboard — track assets, returns, and risk in one place",
      "Payment default prediction model — flag at-risk accounts before they miss",
      "Automated receivables aging report — know who owes what, every morning",
      "NL query interface on your P&L — ask your data like you ask Google",
    ],
  },
  {
    name: "Logistics & Supply Chain",
    accent: "#0088DB",
    icon: "🚚",
    useCases: [
      "On-time delivery dashboard — track routes, carriers, and exceptions live",
      "Delivery time prediction model — give customers accurate ETAs before they ask",
      "3 ERPs → 1 clean source of truth — stop reconciling spreadsheets manually",
      "Slack alert for shipment anomalies — know about problems before clients do",
    ],
  },
];

export default function IndustriesPage() {
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
            <span>INDUSTRIES</span>
          </div>

          <h1 style={{ color: "var(--color-text-hero)", marginBottom: "1.25rem", lineHeight: 1.1, maxWidth: "22ch", marginInline: "auto" }}>
            Built around how your business actually works
          </h1>

          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", maxWidth: "52ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginInline: "auto" }}>
            Every industry has its own data problems, its own rhythms, and its own definition of &ldquo;useful.&rdquo; Here&rsquo;s how DataLife shows up for yours.
          </p>
        </div>
      </section>

      {/* ── Industry Cards ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1.5rem" }}>
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.name}
                className="forte-card"
                style={{ borderTopColor: industry.accent, padding: "2rem" }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.875rem", lineHeight: 1 }}>{industry.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 1.25rem", letterSpacing: "-0.02em" }}>
                  {industry.name}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {industry.useCases.map((uc) => (
                    <li key={uc} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: industry.accent, flexShrink: 0, marginTop: "7px" }} />
                      <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                        {uc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Don't see your industry card */}
          <div
            style={{
              marginTop: "1.5rem",
              borderRadius: "12px",
              border: "1px dashed rgba(0,136,219,0.35)",
              backgroundColor: "rgba(0,136,219,0.04)",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.75rem" }}>
              Don&rsquo;t see your industry?
            </h3>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.5rem", maxWidth: "44ch", marginInline: "auto", lineHeight: 1.7 }}>
              If your business generates data and you&rsquo;re making decisions without it, there&rsquo;s likely a high-ROI project here. Let&rsquo;s find it together.
            </p>
            <Link
              href="/book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "11px 24px",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "var(--color-accent)",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
                transition: "background-color 0.2s",
              }}
            >
              Book a Free Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
