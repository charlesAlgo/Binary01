import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writing — DataLife",
  description:
    "Insights, frameworks, and plain-English guides on AI, data analysis, and business automation from DataLife founder Charles Shalua.",
  alternates: { canonical: "https://data-life.tech/writing" },
};

const ARTICLES = [
  {
    slug: "ai-small-business-compete-enterprise",
    category: "AI + BUSINESS",
    date: "Apr 2026",
    title: "How AI Is Helping Small Businesses Compete With Enterprise — Without the Enterprise Budget",
    excerpt: "Enterprise teams have had access to data science departments and custom ML models for a decade. Now the same capabilities are available to a 5-person team for a fraction of the cost. Here's what's actually changed, what's still hype, and where the real ROI is.",
    readTime: "6 min read",
    accent: "#38BDF8",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "data-problem-fix-30-days",
    category: "DATA ANALYSIS",
    date: "Mar 2026",
    title: "Your Business Has a Data Problem. Here's How to Fix It in 30 Days.",
    excerpt: "Most small businesses don't have a data shortage — they have a data chaos problem. Multiple tools, multiple sources, no single source of truth. This framework shows you how to go from spreadsheet chaos to a clean, usable data foundation in one month.",
    readTime: "8 min read",
    accent: "#10B981",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
  },
  {
    slug: "roi-of-automation",
    category: "AUTOMATION",
    date: "Mar 2026",
    title: "The ROI of Automation: Why Every Manual Process Is Costing You More Than You Think",
    excerpt: "Manual processes don't just cost time — they cost focus, accuracy, and the compounding opportunity cost of what your team could have been doing instead. Here's how to calculate the true cost of a manual process, and the business case for automating it.",
    readTime: "7 min read",
    accent: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80&auto=format&fit=crop",
  },
];

export default function WritingPage() {
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
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", left: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,136,219,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative" }}>
          <div className="section-label" style={{ marginBottom: "1.25rem" }}>
            <span className="section-label-dash" />
            <span>WRITING</span>
          </div>

          <h1 style={{ color: "var(--color-text-hero)", marginBottom: "1.25rem", lineHeight: 1.1, maxWidth: "22ch" }}>
            Insights, frameworks, and things that work.
          </h1>

          <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", maxWidth: "50ch", lineHeight: 1.75, fontFamily: "var(--font-body)" }}>
            Plain-English writing on AI, data analysis, and automation — for business owners who want to understand what&rsquo;s actually useful and what&rsquo;s still hype.
          </p>
        </div>
      </section>

      {/* ── Articles ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "780px" }}>
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/writing/${article.slug}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  className="forte-card"
                  style={{ borderTopColor: article.accent, overflow: "hidden", cursor: "pointer" }}
                >
                  {/* Cover image */}
                  <div style={{ position: "relative", width: "100%", height: "200px" }}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 780px) 100vw, 780px"
                    />
                  </div>

                  <div style={{ padding: "2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
                      <span style={{ padding: "3px 10px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "0.07em", backgroundColor: `${article.accent}18`, color: article.accent, border: `1px solid ${article.accent}30` }}>
                        {article.category}
                      </span>
                      <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                        {article.date}
                      </span>
                      <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                        · {article.readTime}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2.5vw, 1.375rem)", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.875rem", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                      {article.title}
                    </h2>

                    <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0", lineHeight: 1.7 }}>
                      {article.excerpt}
                    </p>

                    <div style={{ marginTop: "1.25rem", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.875rem", fontWeight: 600, color: article.accent, fontFamily: "var(--font-body)" }}>
                      Read article →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
