import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data Analysis, Augmented Analytics, ML Applications, and LLM Bots — AI-powered services from DataLife. Real results, not slide decks.",
};

const SERVICES = [
  {
    href: "/services/data-analysis",
    title: "Data Analysis",
    description:
      "Custom dashboards, automated reporting pipelines, SQL optimisation, and stakeholder-ready exports. Turn raw data into clear decisions.",
    count: "Most popular",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
    ),
  },
  {
    href: "/services/augmented-analytics",
    title: "Augmented Analytics",
    description:
      "AI-assisted data prep, automated insight generation, and natural-language query layers that put self-service analytics in every team member's hands.",
    count: "",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    href: "/services/ml-applications",
    title: "ML Applications",
    description:
      "Production-ready prediction models — churn, demand forecasting, anomaly detection — wrapped in clean APIs your team can call from day one.",
    count: "",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9.5 2a2.5 2.5 0 0 1 0 5H7a2.5 2.5 0 0 0 0 5h1a2.5 2.5 0 0 1 0 5" />
        <path d="M14.5 2a2.5 2.5 0 0 0 0 5H17a2.5 2.5 0 0 1 0 5h-1a2.5 2.5 0 0 0 0 5" />
      </svg>
    ),
  },
  {
    href: "/services/llm-bots",
    title: "LLM Bots",
    description:
      "RAG-powered chatbots grounded in your own documents — for customer support, internal Q&A, or lead qualification — with full data privacy control.",
    count: "",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const WHY = [
  {
    title: "Fixed-price scopes",
    description:
      "Every engagement starts with a written scope and a fixed price. No hourly billing surprises.",
  },
  {
    title: "Production-ready delivery",
    description:
      "Code is documented, tested, and handed over with a 30-day bug-fix guarantee.",
  },
  {
    title: "Async-first collaboration",
    description:
      "Weekly check-ins over Loom + Slack. You stay informed without sitting in meetings.",
  },
  {
    title: "Full IP ownership",
    description:
      "Everything built for you is yours — source code, models, dashboards. No licence lock-in.",
  },
];

export default function ServicesPage() {
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

        <div
          className="section-wrapper"
          style={{ position: "relative", textAlign: "center" }}
        >
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
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              What I offer
            </span>
          </div>

          <h1
            style={{
              color: "#fff",
              marginBottom: "1.25rem",
              lineHeight: 1.08,
              maxWidth: "20ch",
              marginInline: "auto",
            }}
          >
            Services
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "1.0625rem",
              maxWidth: "50ch",
              lineHeight: 1.75,
              fontFamily: "var(--font-body)",
              marginInline: "auto",
            }}
          >
            Four focused disciplines — each delivering production-ready
            solutions with clear outcomes and fixed-price scopes.
          </p>
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

      {/* ── 2. Service Cards ── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingBlock: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <div className="section-wrapper">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.href}
                href={s.href}
                title={s.title}
                description={s.description}
                icon={s.icon}
                count={s.count || undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Why work with me ── */}
      <section
        style={{
          backgroundColor: "var(--color-bg-cream)",
          paddingBlock: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                marginBottom: "0.625rem",
              }}
            >
              How I work
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                marginBottom: "0.875rem",
              }}
            >
              Built for independent teams and growing startups
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                maxWidth: "52ch",
                marginInline: "auto",
              }}
            >
              Every engagement is scoped, priced, and delivered with the same
              principles — no matter the project size.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {WHY.map((w, i) => (
              <div
                key={w.title}
                style={{
                  borderRadius: "14px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#fff",
                  padding: "1.5rem",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "var(--color-bg-tag)",
                    color: "var(--color-hero)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    marginBottom: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    margin: "0 0 6px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {w.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-body)",
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA Strip ── */}
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
            Not sure which service you need?
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
            Book a free 30-minute discovery call and I&apos;ll recommend the
            right approach for your specific data challenge.
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
              label="Book a Discovery Call"
              href="/book"
              variant="filled"
              size="lg"
            />
            <CTAButton
              label="View Case Studies"
              href="/portfolio"
              variant="white"
              size="lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
