import Link from "next/link";

const PROJECTS = [
  {
    tag: "Data Analysis",
    title: "Real-Time Logistics Dashboard",
    client: "LogiTrack Ltd",
    problem: "Manual Excel reports taking 4 hours daily across 3 teams.",
    result: "Automated dashboard reduced reporting time by 94%. Live in 8 days.",
    accent: "#3EBD7A",
    bg: "#f0faf5",
    slug: "logistic-dashboard",
  },
  {
    tag: "LLM Bot",
    title: "AI Customer Support Bot",
    client: "NutriFlow App",
    problem: "Support team overwhelmed — 300+ repetitive queries per week.",
    result: "Bot handles 70% of queries automatically. CSAT improved by 18pts.",
    accent: "#3B82F6",
    bg: "#eff6ff",
    slug: "nutriflow-bot",
  },
  {
    tag: "ML Application",
    title: "Churn Prediction API",
    client: "FinBridge Capital",
    problem: "No early warning system for at-risk customers. Reactive strategy.",
    result: "87% recall on churn prediction. Deployed as REST API in 2 weeks.",
    accent: "#8B5CF6",
    bg: "#f5f3ff",
    slug: "churn-prediction",
  },
];

export default function FeaturedWork() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
              Recent work
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: 0 }}>
              Featured projects
            </h2>
          </div>
          <Link href="/portfolio" className="text-sm font-semibold text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-accent)] transition-colors whitespace-nowrap" style={{ fontFamily: "var(--font-body)" }}>
            View all work →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio/${p.slug}`}
              className="group no-underline"
              style={{ display: "flex", flexDirection: "column", borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "#fff", overflow: "hidden", boxShadow: "var(--shadow-card)", transition: "all 0.2s" }}
            >
              {/* Image placeholder with accent colour */}
              <div style={{ height: "160px", backgroundColor: p.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "16px", backgroundColor: p.accent, opacity: 0.15 }} />
                <div style={{ position: "absolute", width: "40px", height: "40px", borderRadius: "10px", backgroundColor: p.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-8"/>
                  </svg>
                </div>
                <span style={{ position: "absolute", top: "12px", left: "12px", padding: "3px 10px", borderRadius: "999px", backgroundColor: p.accent, fontSize: "0.7rem", fontWeight: 600, color: "#fff", fontFamily: "var(--font-body)" }}>
                  {p.tag}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                <div>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 4px" }}>{p.client}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-0.01em" }}>{p.title}</h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", flexShrink: 0, paddingTop: "1px" }}>Problem</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.55 }}>{p.problem}</p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: p.accent, fontFamily: "var(--font-body)", flexShrink: 0, paddingTop: "1px" }}>Result</span>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-text-primary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.55, fontWeight: 500 }}>{p.result}</p>
                  </div>
                </div>

                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8125rem", fontWeight: 600, color: p.accent, fontFamily: "var(--font-body)" }}>
                  View case study
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
