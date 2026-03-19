const TESTIMONIALS = [
  {
    name: "Marcus T.",
    role: "Head of Operations, LogiTrack Ltd",
    avatar: "MT",
    rating: 5,
    text: "Charles built us a real-time logistics dashboard that replaced 3 manual reports. Delivered in 8 days. The attention to detail was exceptional.",
  },
  {
    name: "Priya S.",
    role: "Founder, NutriFlow App",
    avatar: "PS",
    rating: 5,
    text: "The LLM bot Charles built handles 70% of our customer queries automatically. Setup was smooth and he documented everything clearly.",
  },
  {
    name: "James O.",
    role: "Data Lead, FinBridge Capital",
    avatar: "JO",
    rating: 5,
    text: "Hired for an ML churn model. Charles didn't just hand over code — he explained every decision and set up monitoring. Will hire again.",
  },
];

const PLATFORMS = [
  { name: "Upwork", score: "Top Rated", icon: "⭐" },
  { name: "Fiverr",  score: "Level 2", icon: "🎯" },
  { name: "GitHub",  score: "Active",   icon: "💻" },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
            Client feedback
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: "0 0 0.75rem" }}>
            Trusted by builders worldwide
          </h2>
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {PLATFORMS.map((p) => (
              <span key={p.name} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                <span>{p.icon}</span>
                <strong style={{ color: "var(--color-text-primary)" }}>{p.name}</strong> · {p.score}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "1.25rem" }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "1.75rem", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Stars n={t.rating} />
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "var(--color-text-primary)", fontFamily: "var(--font-body)", margin: 0, fontStyle: "italic" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "auto" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "var(--color-hero)", color: "#fff", fontSize: "0.75rem", fontWeight: 700, fontFamily: "var(--font-display)", flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-body)", margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
