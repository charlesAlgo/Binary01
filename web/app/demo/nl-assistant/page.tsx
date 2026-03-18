import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Demo — AI Natural Language Analytics Assistant",
  description:
    "Ask plain-English questions about retail data and get instant charts powered by Llama 3.3 70B. Built for Luxe & Thread Boutique.",
};

const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_NL_URL;

export default function NLAssistantDemoPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100svh - 68px)",
        overflow: "hidden",
      }}
    >
      {/* Slim info bar */}
      <div
        style={{
          backgroundColor: "var(--color-hero)",
          borderBottom: "1px solid rgba(245,158,11,0.20)",
          padding: "8px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <Link
            href="/portfolio/nl-analytics-assistant"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.50)",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
            className="hover:text-white transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Case Study
          </Link>
          <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.75rem" }}>·</span>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", fontFamily: "var(--font-body)" }}>
            AI Analytics Assistant
          </span>
          <span
            style={{
              padding: "2px 9px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              fontWeight: 700,
              backgroundColor: "rgba(245,158,11,0.15)",
              color: "#F59E0B",
              border: "1px solid rgba(245,158,11,0.28)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Live Demo
          </span>
        </div>

        <Link
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "5px 14px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#fff",
            backgroundColor: "var(--color-accent)",
            borderRadius: "7px",
            textDecoration: "none",
            fontFamily: "var(--font-body)",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Get a Quote
        </Link>
      </div>

      {/* Streamlit iframe — fills remaining height */}
      {DEMO_URL ? (
        <iframe
          src={`${DEMO_URL}?embed=true`}
          title="AI Natural Language Analytics Assistant"
          style={{ flex: 1, border: "none", width: "100%", display: "block", minHeight: 0 }}
          allow="fullscreen"
        />
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0F172A",
            gap: "1.25rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "3rem" }}>🤖</span>
          <h2 style={{ color: "#fff", fontFamily: "var(--font-display)", margin: 0 }}>
            Demo coming soon
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-body)",
              maxWidth: "38ch",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            The live AI assistant is being deployed to Streamlit Community Cloud. Read the full case study in the meantime.
          </p>
          <Link
            href="/portfolio/nl-analytics-assistant"
            style={{
              padding: "10px 22px",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "var(--color-accent)",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
            }}
          >
            View Case Study
          </Link>
        </div>
      )}
    </div>
  );
}
