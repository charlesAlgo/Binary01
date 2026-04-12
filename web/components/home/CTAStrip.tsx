import Link from "next/link";

export default function CTAStrip() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-hero)",
        paddingBlock: "clamp(4rem, 8vw, 6rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,136,219,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
        <div className="section-label" style={{ justifyContent: "center", marginBottom: "1.25rem" }}>
          <span className="section-label-dash" />
          <span>GET STARTED</span>
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-hero)", marginBottom: "1rem", maxWidth: "24ch", marginInline: "auto" }}>
          Not sure where to start? Book a free automation audit.
        </h2>

        <p style={{ color: "var(--color-text-hero-muted)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "48ch", marginInline: "auto", marginBottom: "2.25rem", lineHeight: 1.7 }}>
          In 30 minutes we&rsquo;ll map your current workflow, identify the highest-ROI automation in your business, and give you a fixed-price quote before you leave the call.
        </p>

        <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 30px",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "var(--color-accent)",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              transition: "background-color 0.2s",
            }}
          >
            Book a Free Audit Call
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 30px",
              fontSize: "1rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            Send a Brief
          </Link>
        </div>
      </div>
    </section>
  );
}
