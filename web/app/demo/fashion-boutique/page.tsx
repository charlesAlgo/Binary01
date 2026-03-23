"use client";

import Link from "next/link";
import { useState, useRef } from "react";

const DEMO_URL = "https://binary01-gzhhs5ykmbvbdbc8qfb5di.streamlit.app";

export default function FashionBoutiqueDemoPage() {
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleWake() {
    if (iframeRef.current) {
      iframeRef.current.src = `${DEMO_URL}?embed=true&_t=${Date.now()}`;
    }
    window.open(DEMO_URL, "_blank", "noopener,noreferrer");
  }

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
            href="/portfolio/fashion-boutique-dashboard"
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
            Retail Analytics Dashboard
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

      {/* Iframe + wake-up overlay */}
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        {!loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#0F172A",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.25rem",
              padding: "2rem",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "3px solid rgba(62,189,122,0.2)",
                borderTopColor: "var(--color-accent)",
                animation: "spin 0.9s linear infinite",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

            <h2
              style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                margin: 0,
                fontSize: "1.25rem",
              }}
            >
              Loading demo…
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontFamily: "var(--font-body)",
                maxWidth: "38ch",
                lineHeight: 1.7,
                margin: 0,
                fontSize: "0.9rem",
              }}
            >
              The app may be asleep on Streamlit Community Cloud. If it doesn&apos;t load in a few seconds, click below to wake it up.
            </p>
            <button
              onClick={handleWake}
              style={{
                padding: "9px 22px",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#0F172A",
                backgroundColor: "var(--color-accent)",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              Wake up app
            </button>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={`${DEMO_URL}?embed=true`}
          title="Fashion Boutique Retail Analytics Dashboard"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="fullscreen"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
