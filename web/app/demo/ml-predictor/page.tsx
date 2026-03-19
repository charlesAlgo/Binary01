import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Live Demo — E-Commerce Customer Spending Predictor",
  description:
    "Interactive ML application predicting yearly customer spend from behavioural data. OLS Linear Regression · R²=97.8% · RMSE=$10.48 · Built with scikit-learn + FastAPI.",
};

const DEMO_URL = "https://binary01-4uhsyappv2a3epfj9hn6699.streamlit.app";

export default function MlPredictorDemoPage() {
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
          borderBottom: "1px solid rgba(62,189,122,0.20)",
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
            href="/portfolio/ecommerce-spending-predictor"
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
            E-Commerce Spending Predictor
          </span>
          <span
            style={{
              padding: "2px 9px",
              borderRadius: "999px",
              fontSize: "0.68rem",
              fontWeight: 700,
              backgroundColor: "rgba(62,189,122,0.15)",
              color: "var(--color-accent)",
              border: "1px solid rgba(62,189,122,0.28)",
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

      {/* Streamlit iframe */}
      <iframe
        src={`${DEMO_URL}?embed=true`}
        title="E-Commerce Customer Spending Predictor"
        style={{ flex: 1, border: "none", width: "100%", display: "block", minHeight: 0 }}
        allow="fullscreen"
      />
    </div>
  );
}
