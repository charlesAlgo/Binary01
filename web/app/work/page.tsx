import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Work & Live Projects — DataLife",
  description:
    "Real data systems built by DataLife. Fashion boutique inventory recovery, NL analytics assistant, and e-commerce spend predictor — all live and measurable.",
  alternates: { canonical: "https://data-life.tech/work" },
};

export default function WorkPage() {
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
            <span>WORK</span>
          </div>

          <h1 style={{ color: "var(--color-text-hero)", marginBottom: "1.25rem", lineHeight: 1.1, maxWidth: "18ch", marginInline: "auto" }}>
            Real systems. Measurable results.
          </h1>

          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", maxWidth: "50ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginInline: "auto" }}>
            Every project below is live, deployed, and delivering value to a real business. Not mockups — working systems you can interact with.
          </p>
        </div>
      </section>

      {/* ── Featured Project ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div className="section-label" style={{ marginBottom: "1.5rem" }}>
            <span className="section-label-dash" />
            <span>FEATURED</span>
          </div>

          {/* Full-width featured card */}
          <div
            className="forte-card"
            style={{ borderTopColor: "#38BDF8", padding: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: "1.5rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "start" }}>
              <div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  {["Data Analysis", "Power BI", "Python", "Streamlit"].map((tag) => (
                    <span
                      key={tag}
                      style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 500, fontFamily: "var(--font-body)", backgroundColor: "rgba(56,189,248,0.12)", color: "#38BDF8", border: "1px solid rgba(56,189,248,0.25)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.875rem", letterSpacing: "-0.02em" }}>
                  Fashion Boutique Retail Dashboard
                </h2>

                <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.25rem", maxWidth: "62ch", lineHeight: 1.75 }}>
                  The boutique owner had no visibility into which products were actually selling versus sitting on shelves. We built a live Power BI dashboard connected to their Shopify store and automated inventory reports — surfacing dead stock automatically so buying decisions became data-driven.
                </p>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(56,189,248,0.10)",
                    border: "1px solid rgba(56,189,248,0.25)",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span style={{ fontSize: "1.125rem" }}>💰</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#38BDF8" }}>
                    118 dead inventory SKUs surfaced — $5,762 recovered
                  </span>
                </div>

                <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                  <Link
                    href="/demo/fashion-boutique"
                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", fontSize: "0.9375rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}
                  >
                    View Live Demo →
                  </Link>
                  <Link
                    href="/portfolio/fashion-boutique-retail-dashboard"
                    style={{ display: "inline-flex", alignItems: "center", padding: "10px 20px", fontSize: "0.9375rem", fontWeight: 500, color: "var(--color-text-secondary)", backgroundColor: "transparent", border: "1px solid var(--color-border)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}
                  >
                    Case Study
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Client Work Cards ── */}
          <div className="section-label" style={{ marginBottom: "1.5rem", marginTop: "2rem" }}>
            <span className="section-label-dash" />
            <span>CLIENT WORK</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))", gap: "1.5rem" }}>

            {/* NL Analytics Assistant */}
            <div className="forte-card" style={{ borderTopColor: "#14B8A6", padding: "2rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {["Augmented Analytics", "LangChain", "Python", "Streamlit"].map((tag) => (
                  <span key={tag} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 500, fontFamily: "var(--font-body)", backgroundColor: "rgba(20,184,166,0.10)", color: "#14B8A6", border: "1px solid rgba(20,184,166,0.20)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
                AI Natural Language Analytics Assistant
              </h3>

              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.25rem", lineHeight: 1.7 }}>
                Ask your data a question in plain English. Get a chart back in under 3 seconds. No SQL, no analyst handoff — works directly on your connected data source.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderRadius: "8px", backgroundColor: "rgba(20,184,166,0.08)", border: "1px solid rgba(20,184,166,0.20)", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 700, color: "#14B8A6" }}>
                  Plain-English → chart in under 3 seconds
                </span>
              </div>

              <Link
                href="/demo/nl-assistant"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", fontSize: "0.875rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}
              >
                Try Live Demo →
              </Link>
            </div>

            {/* ML Spend Predictor */}
            <div className="forte-card" style={{ borderTopColor: "#10B981", padding: "2rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {["ML Application", "scikit-learn", "Python", "Streamlit"].map((tag) => (
                  <span key={tag} style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 500, fontFamily: "var(--font-body)", backgroundColor: "rgba(16,185,129,0.10)", color: "#10B981", border: "1px solid rgba(16,185,129,0.20)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.75rem", letterSpacing: "-0.02em" }}>
                E-Commerce Customer Spending Predictor
              </h3>

              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.25rem", lineHeight: 1.7 }}>
                Predicts a customer&rsquo;s annual spend from early purchase behaviour. Helps e-commerce teams prioritise high-value segments before they&rsquo;re obvious — and before competitors win them.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderRadius: "8px", backgroundColor: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.20)", marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 700, color: "#10B981" }}>
                  R²=97.8% · predicts within $10.48 of actual yearly spend
                </span>
              </div>

              <Link
                href="/demo/ml-predictor"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", fontSize: "0.875rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}
              >
                Try Live Demo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)" }}>
        <div className="section-wrapper" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "1rem" }}>
            Want results like these for your business?
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto", marginBottom: "2rem", lineHeight: 1.7 }}>
            Every project started with a conversation. Let&rsquo;s find out what&rsquo;s possible with your data.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              Book a Free Call
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 500, color: "var(--color-text-secondary)", backgroundColor: "transparent", border: "1px solid var(--color-border)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
