import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import SectionHeader from "@/components/SectionHeader";
import TechBadge from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "About Charles Shalua",
  description:
    "Builder, analyst, and AI engineer. Charles Shalua helps businesses turn data and AI into real competitive advantages — not slide decks.",
};

const STACK = [
  { category: "Data & Analytics", tools: ["Python", "Pandas", "SQL", "Power BI", "Tableau", "dbt"] },
  { category: "Machine Learning",  tools: ["scikit-learn", "XGBoost", "PyTorch", "MLflow", "FastAPI"] },
  { category: "AI & LLMs",        tools: ["LangChain", "OpenAI API", "Anthropic API", "ChromaDB", "Pinecone"] },
  { category: "Infrastructure",   tools: ["Next.js", "Supabase", "PostgreSQL", "Docker", "Vercel"] },
];

const CREDENTIALS = [
  { icon: "🎓", title: "Applied AI", subtitle: "Centennial College, Ontario" },
  { icon: "⭐", title: "Top Rated", subtitle: "Upwork Freelancer Platform" },
  { icon: "💻", title: "40+ Projects", subtitle: "Across 15+ Industries" },
  { icon: "🌍", title: "Global Clients", subtitle: "US, UK, Africa, Canada" },
];

const VALUES = [
  {
    title: "Ship, don't pitch",
    description: "I deliver working code and dashboards, not decks. You can see and use what I build from day one.",
  },
  {
    title: "Clarity over complexity",
    description: "Every output comes with plain-English documentation. If you can't explain it to your team, it isn't done.",
  },
  {
    title: "Your data, your ownership",
    description: "You own 100% of the code and data from day one. No lock-in, no strings attached — it's yours.",
  },
];

export default function AboutPage() {
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
        {/* Radial glow */}
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "var(--font-body)" }} className="hover:text-white">Home</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>About</span>
          </nav>

          {/* Label pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.08)", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>About Charles</span>
          </div>

          <h1 style={{ color: "#fff", marginBottom: "1.25rem", lineHeight: 1.08, maxWidth: "18ch" }}>
            Builder. Analyst. AI Engineer.
          </h1>

          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", maxWidth: "48ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginBottom: "2rem" }}>
            I help businesses turn data and AI into real competitive advantages — not slide decks.
          </p>

          {/* Inline badges */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {["📍 Ontario, Canada", "🎓 Centennial College — Applied AI"].map((badge) => (
              <span
                key={badge}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ── 2. Story ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "start" }}>

            {/* Left — profile card */}
            <div
              style={{
                borderRadius: "20px",
                backgroundColor: "var(--color-hero)",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1rem",
                boxShadow: "0 8px 32px rgba(24,61,48,0.18)",
                position: "sticky",
                top: "6rem",
              }}
            >
              {/* Avatar circle */}
              <div style={{ width: "96px", height: "96px", borderRadius: "50%", backgroundColor: "rgba(62,189,122,0.15)", border: "2px solid rgba(62,189,122,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>CS</span>
              </div>

              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Charles Shalua</p>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", margin: 0 }}>AI & Data Engineer</p>
              </div>

              {/* Available badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.10)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "inline-block", boxShadow: "0 0 0 3px rgba(62,189,122,0.25)" }} />
                <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>Available for projects</span>
              </div>

              <div style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Location", value: "Ontario, Canada" },
                  { label: "Education", value: "Centennial College" },
                  { label: "Experience", value: "40+ Projects" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>{item.label}</span>
                    <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — story text */}
            <div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>My story</p>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "1.75rem" }}>
                From curiosity to craft
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "62ch" }}>
                  I got into data out of frustration. Early in my career I kept watching teams make expensive decisions based on gut feel while sitting on gigabytes of untouched data. I taught myself Python and SQL on weekends, built a few internal dashboards, and never looked back. That was the moment I realised clarity is a competitive advantage — and most organisations are a few good pipelines away from it.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "62ch" }}>
                  Over the following years I expanded from data analysis into machine learning, shipping production models for clients across retail, finance, healthcare, and logistics. Now I&apos;m finishing the Applied AI program at Centennial College in Ontario, where I&apos;m deepening my work in large language models and agentic systems. I&apos;m proud to hold Upwork&apos;s Top Rated badge and to have delivered 40+ projects across 15+ industries — but what I care about most is whether the work actually gets used.
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "62ch" }}>
                  Today I run a one-person AI and data firm. I work directly with founders, product managers, and analytics leads to build full-stack solutions — from raw ETL pipelines to deployed LLM bots. No account managers. No hand-offs. You talk to the person who writes the code.
                </p>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <CTAButton label="Work With Me" href="/contact" variant="filled" size="md" />
                <CTAButton label="View Portfolio" href="/portfolio" variant="ghost" size="md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Credentials ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem" }}>
            <SectionHeader
              label="Recognition"
              title="Credentials & Recognition"
              description="A track record built project by project, client by client."
              align="center"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {CREDENTIALS.map((c) => (
              <div
                key={c.title}
                style={{ borderRadius: "16px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "2rem", textAlign: "center", boxShadow: "var(--shadow-card)", transition: "box-shadow 0.2s, transform 0.2s" }}
                className="hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
              >
                <div style={{ fontSize: "2.25rem", marginBottom: "0.75rem" }}>{c.icon}</div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px", letterSpacing: "-0.01em" }}>{c.title}</p>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0 }}>{c.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Values ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem" }}>
            <SectionHeader
              label="Principles"
              title="How I work"
              description="Three commitments I make to every client, on every project."
              align="center"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                style={{ borderRadius: "16px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "2rem", boxShadow: "var(--shadow-card)", transition: "box-shadow 0.2s, transform 0.2s" }}
                className="hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--color-hero)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.625rem", letterSpacing: "-0.02em" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.7 }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Tech Stack ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem" }}>
            <SectionHeader
              label="Tools & technologies"
              title="Tech stack I work with"
              description="Production-grade tools across every layer — from raw data to deployed application."
              align="center"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {STACK.map((group) => (
              <div key={group.category} style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "1rem" }}>
                  {group.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {group.tools.map((t) => <TechBadge key={t} label={t} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section style={{ backgroundColor: "var(--color-hero)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(62,189,122,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", marginBottom: "1rem" }}>
            Let&apos;s build something together
          </h2>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto", marginBottom: "2.25rem", lineHeight: 1.7 }}>
            Whether you have a clear brief or just a messy dataset and a goal — I&apos;m happy to talk through what&apos;s possible.
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
