import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

const SERVICES = [
  {
    href: "/services/data-analysis",
    title: "Data Analysis",
    count: "Turn raw data → clear dashboards",
    description: "KPI reports, interactive dashboards, and automated data pipelines that give your team clarity every morning.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-8"/>
      </svg>
    ),
  },
  {
    href: "/services/augmented-analytics",
    title: "Augmented Analytics",
    count: "AI-assisted business intelligence",
    description: "Automated insights, anomaly detection, and natural-language querying layered on top of your existing data stack.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v3h3"/>
      </svg>
    ),
  },
  {
    href: "/services/ml-applications",
    title: "ML Applications",
    count: "Custom models → production APIs",
    description: "End-to-end machine learning: data prep, model training, evaluation, and deployment as a scalable REST API.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    href: "/services/llm-bots",
    title: "LLM Bots",
    count: "GPT-4 / Claude powered assistants",
    description: "Custom AI chatbots and automation pipelines trained on your docs, data, and business logic — fully integrated.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
              What I offer
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: 0 }}>
              Browse services by type
            </h2>
            <p style={{ marginTop: "0.5rem", fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
              Inspired by 40+ completed projects across industries.
            </p>
          </div>
          <Link href="/services" className="text-sm font-semibold text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-accent)] transition-colors whitespace-nowrap" style={{ fontFamily: "var(--font-body)" }}>
            All Services →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.25rem" }}>
          {SERVICES.map((s) => <ServiceCard key={s.href} {...s} />)}
        </div>
      </div>
    </section>
  );
}
