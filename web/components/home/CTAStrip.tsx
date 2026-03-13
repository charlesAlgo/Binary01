import CTAButton from "@/components/CTAButton";

const STEPS = [
  { icon: "📋", title: "Post a project", description: "Fill in a short brief with your goals, data, and timeline." },
  { icon: "🤝", title: "Get matched",    description: "Receive a clear proposal and fixed-price quote within 24 hours." },
  { icon: "💳", title: "Pay safely",     description: "Milestone-based payments — only pay when you're satisfied." },
  { icon: "🚀", title: "We ship it",     description: "Delivered with documentation, a handover call, and 30-day support." },
];

export default function CTAStrip() {
  return (
    <section style={{ backgroundColor: "var(--color-hero)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ color: "#fff", marginBottom: "0.875rem" }}>Need something done?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto" }}>
            Most projects kick off within 48 hours. Let&rsquo;s talk scope.
          </p>
        </div>

        {/* 4-step horizontal */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0", marginBottom: "3.5rem", position: "relative" }}>
          {/* Connecting line */}
          <div aria-hidden="true" style={{ position: "absolute", top: "28px", left: "10%", right: "10%", height: "1px", background: "rgba(255,255,255,0.08)", display: "none" }} className="hidden md:block" />
          {STEPS.map((step, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "1.5rem 1rem", gap: "0.75rem", position: "relative" }}>
              {/* Icon circle */}
              <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.375rem", flexShrink: 0 }}>
                {step.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "#fff", margin: 0 }}>{step.title}</h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.6 }}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton label="Get a Free Quote"       href="/contact" variant="filled" size="lg" />
          <CTAButton label="Book a Discovery Call"  href="/book"    variant="white"  size="lg" />
        </div>
      </div>
    </section>
  );
}
