import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Reviews — DataLife",
  description:
    "What clients say about working with DataLife. Real feedback from e-commerce owners, clinic managers, SaaS founders, and logistics teams.",
  alternates: { canonical: "https://data-life.tech/reviews" },
};

const REVIEWS = [
  {
    name: "Sarah M.",
    role: "E-Commerce Owner",
    company: "Boutique Online Store",
    stars: 5,
    text: "The dashboard Charles built saved us 15 hours a week on reporting. I used to spend Sunday pulling numbers from three different platforms — now I open one dashboard on Monday morning and everything is there. It paid for itself in the first month.",
    accent: "#38BDF8",
  },
  {
    name: "James T.",
    role: "Marketing Director",
    company: "Digital Agency",
    stars: 5,
    text: "We finally understand which campaigns actually drive revenue. Charles built a unified reporting layer across our Google Ads, Meta, and email data — all in one view. Our client presentations went from 'we think this is working' to 'here's exactly what drove results and why.'",
    accent: "#0088DB",
  },
  {
    name: "Dr. Amara O.",
    role: "Clinic Manager",
    company: "Multi-Location Medical Practice",
    stars: 5,
    text: "The patient tracking dashboard transformed how we run our clinics. We can now see appointment volume, no-show patterns, and revenue per service in real time. We identified a scheduling gap that was costing us 8 appointments per week — and fixed it within days.",
    accent: "#10B981",
  },
  {
    name: "Kevin R.",
    role: "SaaS Founder",
    company: "B2B Software Startup",
    stars: 5,
    text: "The churn prediction model caught at-risk accounts 3–4 weeks before they actually cancelled. Our success team used that time to intervene. We saved two enterprise accounts in the first 60 days — well worth the investment. Charles also documented everything clearly so our internal team could maintain it.",
    accent: "#8B5CF6",
  },
  {
    name: "Linda K.",
    role: "Logistics Manager",
    company: "Regional Supply Chain Company",
    stars: 5,
    text: "Automated reports that used to take 3 hours now run in 3 minutes. Charles connected all three of our ERPs into a single live dashboard. My team spends their time fixing problems, not finding them. The ROI calculation wasn't even close — we recovered the project cost in 6 weeks.",
    accent: "#14B8A6",
  },
  {
    name: "Michael B.",
    role: "Real Estate Agent",
    company: "Independent Property Sales",
    stars: 5,
    text: "The AI chatbot qualifies leads for me 24/7. It answers property questions, collects contact details, and flags serious buyers automatically — all while I sleep. I went from losing leads after hours to converting them. Best investment I've made in my business this year.",
    accent: "#F59E0B",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#F59E0B" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
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
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
            <span className="section-label-dash" />
            <span>REVIEWS</span>
          </div>

          <h1 style={{ color: "var(--color-text-hero)", marginBottom: "1.25rem", lineHeight: 1.1, maxWidth: "18ch", marginInline: "auto" }}>
            What clients say.
          </h1>

          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", maxWidth: "48ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginInline: "auto" }}>
            Real feedback from founders, managers, and operators who turned their data problems into competitive advantages.
          </p>

          {/* Aggregate rating */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginTop: "2rem", padding: "12px 24px", borderRadius: "999px", border: "1px solid rgba(245,158,11,0.30)", backgroundColor: "rgba(245,158,11,0.06)" }}>
            <StarRating count={5} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "var(--color-text-hero)" }}>5.0</span>
            <span style={{ fontSize: "0.875rem", color: "var(--color-text-hero-muted)", fontFamily: "var(--font-body)" }}>· 40+ satisfied clients</span>
          </div>
        </div>
      </section>

      {/* ── Review Cards ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))", gap: "1.5rem" }}>
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="forte-card"
                style={{ borderTopColor: review.accent, padding: "2rem" }}
              >
                <StarRating count={review.stars} />

                <blockquote style={{ margin: "1.25rem 0", padding: 0, borderLeft: "none" }}>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.75, margin: 0, fontStyle: "normal" }}>
                    &ldquo;{review.text}&rdquo;
                  </p>
                </blockquote>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid var(--color-border)", paddingTop: "1.25rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: `${review.accent}20`, border: `1px solid ${review.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.875rem", fontWeight: 700, color: review.accent }}>
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px" }}>
                      {review.name}
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0 }}>
                      {review.role} · {review.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)" }}>
        <div className="section-wrapper" style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "1rem" }}>
            Ready to be the next success story?
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto", marginBottom: "2rem", lineHeight: 1.7 }}>
            Book a free discovery call and let&rsquo;s figure out what your data can do for your business.
          </p>
          <a
            href="/book"
            style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}
          >
            Book a Free Call
          </a>
        </div>
      </section>
    </>
  );
}
