import Link from "next/link";
import Image from "next/image";

const PROJECTS = [
  {
    tag: "Data Analysis",
    title: "Fashion Boutique Retail Dashboard",
    client: "Luxe & Thread Boutique",
    result: "118 dead inventory SKUs surfaced · $5,762 capital recovered",
    accent: "#3EBD7A",
    image: "/demo-fashion.png",
    demoHref: "/demo/fashion-boutique",
    live: true,
  },
  {
    tag: "Augmented Analytics",
    title: "AI Natural Language Analytics Assistant",
    client: "Luxe & Thread Boutique",
    result: "Plain-English → Plotly chart in under 3 seconds",
    accent: "#F59E0B",
    image: "/demo-nl.png",
    demoHref: "/demo/nl-assistant",
    live: true,
  },
  {
    tag: "ML Application",
    title: "E-Commerce Spending Predictor",
    client: "NovaBuy E-Commerce",
    result: "R²=97.8% · predicts within $10.48 of actual yearly spend",
    accent: "#8B5CF6",
    image: "/demo-ml.png",
    demoHref: "/demo/ml-predictor",
    live: true,
  },
  {
    tag: "LLM Bot",
    title: "AI Customer Support Bot",
    client: "Coming soon",
    result: "Autonomous support bot · multi-turn memory · RAG-powered",
    accent: "#3B82F6",
    image: null,
    demoHref: null,
    live: false,
  },
];

export default function FeaturedWork() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
              Recent work
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: 0 }}>
              Featured projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-accent)] transition-colors whitespace-nowrap"
            style={{ fontFamily: "var(--font-body)" }}
          >
            View all work →
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {PROJECTS.map((p) => {
            const card = (
              <div
                className="group"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "14px",
                  border: "1px solid var(--color-border)",
                  backgroundColor: "#fff",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-card)",
                  transition: "all 0.22s",
                  cursor: p.live ? "pointer" : "default",
                  height: "100%",
                }}
              >
                {/* Screenshot or placeholder */}
                <div
                  style={{
                    height: "200px",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: p.live ? "#f8fafc" : "#f1f5f9",
                    flexShrink: 0,
                  }}
                >
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top", transition: "transform 0.35s ease" }}
                      className="group-hover:scale-[1.03]"
                    />
                  ) : (
                    /* LLM Bot coming-soon placeholder */
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "14px",
                          backgroundColor: p.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0.85,
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: p.accent, fontFamily: "var(--font-body)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Coming Soon
                      </span>
                    </div>
                  )}

                  {/* Tag badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      backgroundColor: p.accent,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      letterSpacing: "0.04em",
                      zIndex: 1,
                    }}
                  >
                    {p.tag}
                  </span>

                  {/* Live demo badge */}
                  {p.live && (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        padding: "3px 9px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(6px)",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        color: "#fff",
                        fontFamily: "var(--font-body)",
                        letterSpacing: "0.04em",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        zIndex: 1,
                      }}
                    >
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#3EBD7A", display: "inline-block" }} />
                      Live Demo
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "1.375rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.625rem", flex: 1 }}>
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 3px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                      {p.client}
                    </p>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.55 }}>
                    {p.result}
                  </p>

                  <div style={{ marginTop: "auto", paddingTop: "0.5rem", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8125rem", fontWeight: 600, color: p.live ? p.accent : "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                    {p.live ? (
                      <>
                        Try live demo
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    ) : (
                      "In development"
                    )}
                  </div>
                </div>
              </div>
            );

            return p.live && p.demoHref ? (
              <Link key={p.title} href={p.demoHref} className="no-underline" style={{ display: "flex", flexDirection: "column" }}>
                {card}
              </Link>
            ) : (
              <div key={p.title} style={{ display: "flex", flexDirection: "column" }}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
