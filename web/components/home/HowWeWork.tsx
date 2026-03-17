import ProcessStep from "@/components/ProcessStep";
import CTAButton from "@/components/CTAButton";

const STEPS = [
  {
    title: "Discovery Call",
    description: "We talk through your data, goals, and what success looks like. Free, 30 minutes, no pressure.",
  },
  {
    title: "Proposal & Scope",
    description: "You receive a clear scope, timeline, and fixed-price quote within 24 hours. No vague estimates.",
  },
  {
    title: "Build & Iterate",
    description: "I build in weekly sprints and share progress updates. You can review and give feedback any time.",
  },
  {
    title: "Deliver & Support",
    description: "Full handover with documentation, a walkthrough call, and 30 days of free bug-fix support.",
  },
];

const WHY_ME = [
  { icon: "✓", label: "Fixed-price quotes — no surprise invoices" },
  { icon: "✓", label: "You own 100% of the code and data" },
  { icon: "✓", label: "Production-grade work, not just prototypes" },
  { icon: "✓", label: "Centennial College — Applied AI credential" },
];

export default function HowWeWork() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(2.5rem,6vw,5rem)] items-start">

          {/* Left — visual */}
          <div>
            {/* Profile placeholder */}
            <div style={{ borderRadius: "20px", backgroundColor: "var(--color-hero)", aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.25rem", position: "relative", overflow: "hidden" }}>
              {/* bg pattern */}
              <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <span style={{ fontSize: "2rem" }}>👨‍💻</span>
              </div>
              <div style={{ textAlign: "center", position: "relative" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Charles Shalua</p>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", margin: 0 }}>AI & Data Freelancer</p>
              </div>
              {/* Available badge */}
              <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", backgroundColor: "rgba(62,189,122,0.15)", border: "1px solid rgba(62,189,122,0.3)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "inline-block" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--color-accent)", fontFamily: "var(--font-body)", fontWeight: 500 }}>Available now</span>
              </div>
            </div>

            {/* Why me checklist */}
            <div style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
              <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-body)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Why work with me
              </p>
              {WHY_ME.map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "8px 0", borderBottom: "1px solid var(--color-border)" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--color-bg-tag)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--color-text-primary)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — steps */}
          <div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
              How it works
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "2.5rem" }}>
              A straightforward process, start to finish
            </h2>

            {STEPS.map((step, i) => (
              <ProcessStep
                key={i}
                number={i + 1}
                title={step.title}
                description={step.description}
                isLast={i === STEPS.length - 1}
              />
            ))}

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
              <CTAButton label="Book a Discovery Call" href="/book"    variant="filled" size="md" />
              <CTAButton label="View Pricing"          href="/contact" variant="ghost"  size="md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
