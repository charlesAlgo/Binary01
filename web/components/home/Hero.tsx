"use client";

import { useEffect, useRef } from "react";
import CTAButton from "@/components/CTAButton";
import Link from "next/link";

const POPULAR_TAGS = ["Python", "Dashboards", "LLM Bots", "ML APIs", "Supabase", "Data Pipelines"];

const STATS = [
  { number: "40+",  label: "Projects Delivered" },
  { number: "98%",  label: "Client Satisfaction" },
  { number: "4 hr", label: "Avg. Response Time" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Gentle animated particle grid */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width  / 36);
      const rows = Math.ceil(canvas.height / 36);
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * 36;
          const y = r * 36;
          const wave = Math.sin(t * 0.4 + c * 0.5 + r * 0.5) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.04 + wave * 0.06})`;
          ctx.fill();
        }
      }
      t += 0.015;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "var(--color-hero)",
        paddingTop: "clamp(7rem, 14vw, 10rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        overflow: "hidden",
      }}
    >
      {/* Animated dot grid */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Soft radial glow */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="section-wrapper" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 5rem)", alignItems: "center" }}>

          {/* Left — copy */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.08)", marginBottom: "1.5rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "inline-block", boxShadow: "0 0 0 3px rgba(62,189,122,0.25)" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>
                Available for new projects
              </span>
            </div>

            <h1 style={{ color: "#fff", maxWidth: "13ch", marginBottom: "1.5rem", lineHeight: 1.08 }}>
              AI & Data Services For Your Business
            </h1>

            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.125rem", maxWidth: "42ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginBottom: "2.5rem" }}>
              From messy spreadsheets to production ML pipelines — I cover the full stack so you ship results, not slide decks.
            </p>

            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <CTAButton label="Get a Free Quote" href="/contact" variant="filled" size="lg" />
              <CTAButton label="View Portfolio"   href="/portfolio" variant="white" size="lg" />
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", marginRight: "2px" }}>
                Popular:
              </span>
              {POPULAR_TAGS.map((tag) => (
                <Link
                  key={tag}
                  href={`/services`}
                  style={{ padding: "4px 13px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", textDecoration: "none", transition: "all 0.2s" }}
                  className="hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — stats card stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Main card */}
            <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: "2rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", fontFamily: "var(--font-body)", marginBottom: "1rem" }}>
                What I deliver
              </p>
              {[
                { icon: "📊", label: "Data Analysis & BI Dashboards" },
                { icon: "🤖", label: "Custom ML Models & APIs" },
                { icon: "💬", label: "LLM Bots & AI Automation" },
                { icon: "🔍", label: "Augmented Analytics" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "1.125rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}>{item.label}</span>
                  <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "rgba(62,189,122,0.15)", color: "var(--color-accent)" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M8 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", padding: "1rem", textAlign: "center" }}>
                  <p style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "-0.03em", margin: "0 0 2px" }}>{s.number}</p>
                  <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.4 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
          <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
}
