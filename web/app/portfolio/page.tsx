import type { Metadata } from "next";
import CTAButton from "@/components/CTAButton";
import PortfolioFilter, { Project } from "@/components/PortfolioFilter";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Real results from real clients — case studies across Data Analysis, ML Applications, LLM Bots, and Augmented Analytics.",
};

const PROJECTS: Project[] = [
  {
    slug: "logistics-dashboard",
    tag: "Data Analysis",
    title: "Real-Time Logistics Dashboard",
    client: "LogiTrack Ltd",
    metric: "94% reduction in manual reporting time",
    accent: "#3EBD7A",
    bg: "#f0faf5",
  },
  {
    slug: "nutriflow-bot",
    tag: "LLM Bot",
    title: "AI Customer Support Bot",
    client: "NutriFlow App",
    metric: "70% of queries handled automatically",
    accent: "#3B82F6",
    bg: "#eff6ff",
  },
  {
    slug: "churn-prediction",
    tag: "ML Application",
    title: "Churn Prediction API",
    client: "FinBridge Capital",
    metric: "87% recall — deployed in 2 weeks",
    accent: "#8B5CF6",
    bg: "#f5f3ff",
  },
  {
    slug: "sales-forecasting",
    tag: "Augmented Analytics",
    title: "Sales Forecasting Engine",
    client: "RetailEdge Co.",
    metric: "23% improvement in forecast accuracy",
    accent: "#F59E0B",
    bg: "#fffbeb",
  },
  {
    slug: "hr-analytics",
    tag: "Data Analysis",
    title: "HR Analytics Dashboard",
    client: "TalentBridge Inc.",
    metric: "Reduced hiring cycle by 31%",
    accent: "#3EBD7A",
    bg: "#f0faf5",
  },
  {
    slug: "document-bot",
    tag: "LLM Bot",
    title: "Internal Document Q&A Bot",
    client: "LegalEdge Partners",
    metric: "60% faster document retrieval",
    accent: "#3B82F6",
    bg: "#eff6ff",
  },
];

const STATS = [
  { number: "40+", label: "Projects delivered" },
  { number: "100%", label: "On-time delivery" },
  { number: "4.9★", label: "Average client rating" },
];

export default function PortfolioPage() {
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
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div className="section-wrapper" style={{ position: "relative" }}>
          {/* Label pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "5px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(62,189,122,0.35)",
              backgroundColor: "rgba(62,189,122,0.08)",
              marginBottom: "1.5rem",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              Case Studies
            </span>
          </div>

          <h1
            style={{
              color: "#fff",
              marginBottom: "1.25rem",
              lineHeight: 1.08,
              maxWidth: "18ch",
            }}
          >
            Work That Speaks for Itself
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "1.0625rem",
              maxWidth: "48ch",
              lineHeight: 1.75,
              fontFamily: "var(--font-body)",
              marginBottom: "2.75rem",
            }}
          >
            Real projects, real clients, real results. Browse case studies
            across data analysis, machine learning, AI bots, and analytics
            engineering.
          </p>

          {/* Inline stats */}
          <div
            style={{
              display: "flex",
              gap: "clamp(1.5rem, 5vw, 3.5rem)",
              flexWrap: "wrap",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 0 2px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.number}
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-body)",
                    margin: 0,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}
        >
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "48px" }}
          >
            <path
              d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* ── 2. Filter + Grid ── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingBlock: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <div className="section-wrapper">
          <PortfolioFilter projects={PROJECTS} />
        </div>
      </section>

      {/* ── 3. CTA Strip ── */}
      <section
        style={{
          backgroundColor: "var(--color-hero)",
          paddingBlock: "clamp(4rem, 8vw, 5.5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(62,189,122,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="section-wrapper"
          style={{ position: "relative", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Have a project in mind?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "1.0625rem",
              fontFamily: "var(--font-body)",
              maxWidth: "44ch",
              marginInline: "auto",
              marginBottom: "2.25rem",
              lineHeight: 1.7,
            }}
          >
            Let&apos;s build your next case study together. Describe your
            challenge and I&apos;ll respond with a clear scope within 24 hours.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.875rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <CTAButton
              label="Get a Free Quote"
              href="/contact"
              variant="filled"
              size="lg"
            />
            <CTAButton
              label="Book a Discovery Call"
              href="/book"
              variant="white"
              size="lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
