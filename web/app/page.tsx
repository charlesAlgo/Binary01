import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import ServiceCard from "@/components/ServiceCard";
import StatCard from "@/components/StatCard";
import TechBadge from "@/components/TechBadge";
import ProcessStep from "@/components/ProcessStep";
import Link from "next/link";

const PROCESS_STEPS = [
  { title: "Discovery Call",    description: "We talk through your data, goals, and what success looks like for you." },
  { title: "Proposal & Scope",  description: "You receive a clear scope, timeline, and fixed-price quote within 24 hours." },
  { title: "Build & Iterate",   description: "I build in sprints and share progress updates. You stay in the loop." },
  { title: "Deliver & Support", description: "Handover with full documentation. Optional retainer for ongoing support." },
];

const SERVICES = [
  {
    href: "/services/data-analysis",
    title: "Data Analysis",
    count: "Transform raw data → actionable insight",
    description: "Dashboards, KPI reports, and data pipelines that give your team clarity every morning.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-8"/></svg>,
  },
  {
    href: "/services/augmented-analytics",
    title: "Augmented Analytics",
    count: "AI-assisted business intelligence",
    description: "Automated insights, anomaly detection, and natural-language querying layered on top of your existing data.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>,
  },
  {
    href: "/services/ml-applications",
    title: "ML Applications",
    count: "Custom models → production APIs",
    description: "End-to-end machine learning: data prep, model training, evaluation, and deployment as a REST API.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
  },
  {
    href: "/services/llm-bots",
    title: "LLM Bots",
    count: "GPT-4 / Claude powered assistants",
    description: "Custom AI chatbots and automation pipelines trained on your docs, data, and business logic.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
];

export default function ComponentShowcase() {
  return (
    <>
      {/* ── Hero (dark green) ── */}
      <section className="dot-grid" style={{ backgroundColor: "var(--color-hero)", paddingTop: "8rem", paddingBottom: "6rem" }}>
        <div className="section-wrapper">
          <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)", marginBottom: "1rem" }}>
            AI-Powered Freelancing
          </p>
          <h1 style={{ color: "#fff", maxWidth: "14ch", marginBottom: "1.5rem" }}>
            Data &amp; AI Services For Your Business
          </h1>
          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.125rem", maxWidth: "44ch", marginBottom: "2.5rem", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
            From messy spreadsheets to production ML pipelines — Charles Shalua covers the full stack so you ship results, not slide decks.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <CTAButton label="Get a Quote" href="/contact" variant="filled" size="lg" />
            <CTAButton label="View Portfolio" href="/portfolio" variant="white" size="lg" />
          </div>

          {/* Popular tags */}
          <div style={{ marginTop: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.8125rem", color: "var(--color-text-hero-muted)", fontFamily: "var(--font-body)", marginRight: "4px" }}>Popular:</span>
            {["Python", "Dashboards", "LLM Bots", "ML APIs", "Supabase"].map((tag) => (
              <span key={tag} style={{ padding: "4px 12px", borderRadius: "999px", border: "1px solid var(--color-border-hero)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", cursor: "pointer" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "5rem" }}>
        <div className="section-wrapper">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <SectionHeader
              align="left"
              title="Browse services by type"
              description="Get some inspiration from 40+ completed projects"
            />
            <Link href="/services" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-secondary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
              All Services →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {SERVICES.map((s) => <ServiceCard key={s.href} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "4rem" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1.25rem", maxWidth: "700px", marginInline: "auto" }}>
            <StatCard number="40+"  label="Projects Delivered"  sublabel="across 3 continents" />
            <StatCard number="98%"  label="Client Satisfaction" sublabel="on Upwork & Fiverr" />
            <StatCard number="4 hr" label="Avg. Response Time"  sublabel="weekdays" />
            <StatCard number="3+"   label="Years Experience"    sublabel="in AI & data" />
          </div>
        </div>
      </section>

      {/* ── How we work (split) ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBottom: "5rem" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            {/* Left placeholder image */}
            <div style={{ borderRadius: "16px", backgroundColor: "var(--color-hero)", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>[ Profile photo here ]</span>
            </div>
            {/* Right content */}
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "2rem" }}>
                A straightforward process, start to finish
              </h2>
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={i} number={i + 1} title={step.title} description={step.description} isLast={i === PROCESS_STEPS.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "5rem" }}>
        <div className="section-wrapper">
          <SectionHeader title="Tech stack I work with" description="Production-grade tools — not just demos." />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center", marginTop: "2.5rem" }}>
            {["Python", "Next.js", "PostgreSQL", "LangChain", "ChromaDB", "Pandas", "scikit-learn", "Vercel", "Supabase", "Tailwind CSS", "FastAPI", "Docker"].map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ backgroundColor: "var(--color-hero)", paddingBlock: "4.5rem" }}>
        <div className="section-wrapper" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Need something done?</h2>
          <p style={{ color: "var(--color-text-hero-muted)", fontFamily: "var(--font-body)", marginBottom: "2rem", marginInline: "auto" }}>
            Most projects kick off within 48 hours. Let's talk scope.
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
