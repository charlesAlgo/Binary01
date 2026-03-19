import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Hire a Freelance AI Engineer — Get a Free Quote",
  description:
    "Tell Charles about your project and get a fixed-price quote within 24 hours. Data analysis, ML applications, LLM bots, and augmented analytics. No obligation.",
  keywords: [
    "hire freelance data analyst",
    "hire ML developer",
    "AI engineer for hire",
    "get data analysis quote",
    "freelance AI project quote",
    "hire LLM developer",
  ],
  openGraph: {
    title: "Hire a Freelance AI Engineer — Get a Free Quote | DataLife",
    description:
      "Get a fixed-price quote within 24 hours for data analysis, ML, LLM bots, or analytics projects. No obligation.",
    url: "https://data-life.tech/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire a Freelance AI Engineer — Get a Free Quote | DataLife",
    description:
      "Fixed-price quote within 24 hours for your data or AI project. No obligation.",
  },
  alternates: { canonical: "https://data-life.tech/contact" },
};

const INFO_CARDS = [
  { icon: "⚡", title: "Response within 24 hours", subtitle: "Weekdays — usually faster" },
  { icon: "📅", title: "Currently available", subtitle: "Open for new projects" },
  { icon: "⭐", title: "Top Rated on Upwork", subtitle: "5-star track record" },
  { icon: "💬", title: "Free discovery call", subtitle: "30 min, no commitment" },
];

const FAQS = [
  {
    q: "How do you price projects?",
    a: "Fixed-price per project, scoped upfront. No hourly billing surprises — you know the total cost before any work starts.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, always. Your data, business logic, and project details stay completely confidential.",
  },
  {
    q: "Who owns the code?",
    a: "You do. Full IP transfer on final payment. No lock-in, no proprietary frameworks you can't control.",
  },
  {
    q: "What if I need changes after delivery?",
    a: "30 days of free bug fixes are included in every project. Feature changes or scope extensions are quoted separately.",
  },
];

export default function ContactPage() {
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
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "var(--font-body)" }} className="hover:text-white">Home</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>Contact</span>
          </nav>

          {/* Label pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.08)", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>Get in touch</span>
          </div>

          <h1 style={{ color: "#fff", marginBottom: "1.25rem", lineHeight: 1.08, maxWidth: "14ch" }}>
            Let&apos;s Talk
          </h1>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", maxWidth: "48ch", lineHeight: 1.75, fontFamily: "var(--font-body)" }}>
            Tell me about your project and I&apos;ll send a fixed-price quote within 24 hours.
          </p>
        </div>

        {/* Wave divider */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ── 2. Form + Info ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]" style={{ gap: "clamp(2rem, 6vw, 5rem)", alignItems: "start" }}>

            {/* Left — form */}
            <div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>Send a brief</p>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "1.75rem" }}>
                Tell me about your project
              </h2>
              <ContactForm />
            </div>

            {/* Right — info cards */}
            <div className="lg:sticky lg:top-24" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.25rem" }}>Good to know</p>
              {INFO_CARDS.map((card) => (
                <div
                  key={card.title}
                  style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "1.25rem 1.5rem", display: "flex", alignItems: "flex-start", gap: "1rem", boxShadow: "var(--shadow-card)" }}
                >
                  <span style={{ fontSize: "1.5rem", flexShrink: 0, lineHeight: 1 }}>{card.icon}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px" }}>{card.title}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-secondary)", margin: 0 }}>{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FAQ ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>Common questions</p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: "0 auto", maxWidth: "28ch" }}>
              Frequently asked questions
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: "1.25rem", maxWidth: "880px", marginInline: "auto" }}>
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "1.75rem", boxShadow: "var(--shadow-card)" }}
              >
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.625rem", letterSpacing: "-0.01em" }}>
                  {faq.q}
                </p>
                <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
