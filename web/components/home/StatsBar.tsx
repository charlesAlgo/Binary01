const STATS = [
  { number: "40+",  label: "Projects Delivered" },
  { number: "98%",  label: "Client Satisfaction" },
  { number: "4 hr", label: "Avg. Response Time" },
  { number: "30d",  label: "Post-Launch Support" },
];

export default function StatsBar() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-cream)",
        paddingBlock: "clamp(2.5rem, 5vw, 3.5rem)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="section-wrapper">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
          className="grid-cols-2 sm:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "1.25rem 1rem",
                borderRight: i < STATS.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <span
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #0088DB 0%, #06b6d4 50%, #38b2f5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
