import Link from "next/link";

const REVIEWS = [
  {
    name: "Sarah M.",
    role: "E-Commerce Owner",
    company: "Boutique Online Store",
    stars: 5,
    text: "The dashboard Charles built saved us 15 hours a week on reporting. I used to spend Sunday pulling numbers from three different platforms — now I open one dashboard on Monday morning and everything is there. It paid for itself in the first month.",
    accent: "#38BDF8",
    initial: "S",
  },
  {
    name: "James T.",
    role: "Marketing Director",
    company: "Digital Agency",
    stars: 5,
    text: "We finally understand which campaigns actually drive revenue. Charles built a unified reporting layer across our Google Ads, Meta, and email data — all in one view. Our presentations went from 'we think this is working' to 'here's exactly what drove results and why.'",
    accent: "#0088DB",
    initial: "J",
  },
  {
    name: "Dr. Amara O.",
    role: "Clinic Manager",
    company: "Multi-Location Medical Practice",
    stars: 5,
    text: "The patient tracking dashboard transformed how we run our clinics. We identified a scheduling gap that was costing us 8 appointments per week — and fixed it within days of seeing the data.",
    accent: "#10B981",
    initial: "A",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="#F59E0B" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function HomeReviews() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">

        <div style={{ marginBottom: "2.5rem" }}>
          <div className="section-label" style={{ marginBottom: "0.875rem" }}>
            <span className="section-label-dash" />
            <span>CLIENT REVIEWS</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: 0 }}>
              What clients say.
            </h2>
            <Link href="/reviews" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-accent)", textDecoration: "none", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
              All reviews →
            </Link>
          </div>
        </div>

        {/* 3 reviews: first row full-width, second row two half-width — achieved via 2-col flush grid with first card spanning both cols */}
        <div className="flush-grid">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className="flush-card"
              style={{
                padding: "2rem",
                backgroundColor: "var(--color-surface)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                gridColumn: i === 0 ? "1 / -1" : undefined,
              }}
            >
              <Stars count={r.stars} />

              <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.75, margin: 0, flex: 1, maxWidth: "none" }}>
                &ldquo;{r.text}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "1rem", borderTop: "1px solid var(--color-border)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: `${r.accent}18`, border: `1px solid ${r.accent}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: r.accent }}>{r.initial}</span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>{r.name}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0 }}>{r.role} · {r.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
