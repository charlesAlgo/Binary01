import type { Metadata } from "next";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-hero)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
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
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ textAlign: "center", position: "relative" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            marginBottom: "1rem",
          }}
        >
          ERROR 404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.04em",
            margin: "0 0 1rem",
            lineHeight: 1,
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "rgba(255,255,255,0.55)",
            fontFamily: "var(--font-body)",
            maxWidth: "36ch",
            marginInline: "auto",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          This page doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton label="Go Home" href="/" variant="filled" size="lg" />
          <CTAButton label="View Portfolio" href="/portfolio" variant="white" size="lg" />
        </div>
      </div>
    </section>
  );
}
