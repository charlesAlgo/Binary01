import type { Metadata } from "next";
import Link from "next/link";
import { CalendarWidget } from "@/components/ui/calendar";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a free 30-minute discovery call with Charles Shalua. We'll talk through your project, data, and goals. No pitch, no pressure.",
};

const WHAT_WE_COVER = [
  "Your current data setup and pain points",
  "The specific problem you want solved",
  "What success looks like for your team",
  "Rough timeline and budget expectations",
];

const WHO_ITS_FOR = [
  "Founders who need to build on data fast",
  "PMs who want production-ready AI features",
  "Analytics leads with a backlog they can't clear",
];

const FAQS = [
  {
    q: "Is the call really free?",
    a: "100%. No credit card, no commitment, no pitch. It's a genuine conversation to figure out if I'm the right fit for your project.",
  },
  {
    q: "What if I don't have all the details ready?",
    a: "That's fine — I'll help you think through the scope during the call. Come with a problem, not a specification.",
  },
  {
    q: "What happens after the call?",
    a: "Within 24 hours you'll receive a written proposal with a clear scope, timeline, and fixed price. No obligation to proceed.",
  },
];

export default function BookPage() {
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
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>Book a Call</span>
          </nav>

          {/* Label pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.08)", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>Discovery call</span>
          </div>

          <h1 style={{ color: "#fff", marginBottom: "1.25rem", lineHeight: 1.08, maxWidth: "18ch" }}>
            Book a Discovery Call
          </h1>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", maxWidth: "50ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginBottom: "2rem" }}>
            Free 30-minute call. We&apos;ll talk through your project, data, and goals. No pitch, no pressure.
          </p>

          {/* Chips */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {["🕐 30 minutes", "💬 Free, no commitment"].map((chip) => (
              <span
                key={chip}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", backgroundColor: "rgba(255,255,255,0.05)", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ── 2. Two-column ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "clamp(2rem, 6vw, 5rem)", alignItems: "start" }}>

            {/* Left — what to expect */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

              {/* What we'll cover */}
              <div style={{ borderRadius: "16px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "2rem", boxShadow: "var(--shadow-card)" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
                  What we&apos;ll cover
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {WHAT_WE_COVER.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--color-bg-tag)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, marginTop: "2px" }}>✓</span>
                      <span style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What happens next */}
              <div style={{ borderRadius: "16px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "2rem", boxShadow: "var(--shadow-card)" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "0.875rem" }}>
                  What happens next
                </p>
                <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.7 }}>
                  Within 24 hours of our call you&apos;ll receive a written proposal with a clear scope, timeline, and a fixed price. No obligation to proceed.
                </p>
              </div>

              {/* Who it's for */}
              <div style={{ borderRadius: "16px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "2rem", boxShadow: "var(--shadow-card)" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
                  Who it&apos;s for
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {WHO_ITS_FOR.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ color: "var(--color-accent)", flexShrink: 0, fontSize: "1rem", lineHeight: 1.5 }}>→</span>
                      <span style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Calendar widget */}
            <div style={{ position: "sticky", top: "6rem" }}>
              <CalendarWidget
                calLink={process.env.NEXT_PUBLIC_CALCOM_LINK ?? "charlesshalua/discovery-call"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FAQ ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>Quick answers</p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: "0 auto", maxWidth: "28ch" }}>
              Questions about the call
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", maxWidth: "880px", marginInline: "auto" }}>
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

          {/* Bottom CTA nudge */}
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
              Not ready for a call? Send your brief instead.
            </p>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "10px", border: "2px solid var(--color-accent)", color: "var(--color-accent)", fontSize: "0.9375rem", fontWeight: 600, fontFamily: "var(--font-body)", textDecoration: "none", transition: "all 0.2s" }}
              className="hover:bg-[var(--color-bg-tag)] hover:-translate-y-px"
            >
              Send a project brief →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
