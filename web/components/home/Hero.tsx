"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import Link from "next/link";

const STATS = [
  { number: "40+",  label: "Projects Delivered" },
  { number: "98%",  label: "Client Satisfaction" },
  { number: "4 hr", label: "Avg. Response Time" },
  { number: "30d",  label: "Post-Launch Support" },
];

const SERVICES_LIST = [
  { label: "Data Analysis & BI Dashboards",  metric: "94% faster reporting" },
  { label: "Custom ML Models & APIs",         metric: "87% avg. accuracy" },
  { label: "LLM Bots & AI Automation",        metric: "70% query automation" },
  { label: "Augmented Analytics",             metric: "Real-time insights" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
          const wave = Math.sin(t * 0.4 + c * 0.5 + r * 0.5) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(c * 36, r * 36, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.03 + wave * 0.05})`;
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
        paddingBottom: "clamp(5rem, 10vw, 7rem)",
        overflow: "hidden",
      }}
    >
      {/* Animated dot grid */}
      <canvas ref={canvasRef} aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Radial glows */}
      <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-8%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.13) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-15%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="section-wrapper" style={{ position: "relative" }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 5rem)", alignItems: "center" }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* ── Left: copy ── */}
          <div>
            {/* Available badge */}
            <motion.div variants={item} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 16px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.09)", marginBottom: "1.75rem" }}>
              <span className="pulse-ring" style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "inline-block" }} />
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-accent)", fontFamily: "var(--font-body)", letterSpacing: "0.01em" }}>
                Available for new projects · March 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item} style={{ color: "#fff", maxWidth: "14ch", marginBottom: "1.5rem", lineHeight: 1.06, fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)" }}>
              AI & Data{" "}
              <span className="gradient-text">Services</span>{" "}
              That Move the Needle
            </motion.h1>

            <motion.p variants={item} style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.125rem", maxWidth: "44ch", lineHeight: 1.78, fontFamily: "var(--font-body)", marginBottom: "2.25rem" }}>
              From messy spreadsheets to production ML pipelines — Charles delivers full-stack AI solutions so your team ships results, not slide decks.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.75rem" }}>
              <CTAButton label="Get a Free Quote"      href="/contact"   variant="filled" size="lg" />
              <CTAButton label="View Portfolio"        href="/portfolio" variant="white"  size="lg" />
            </motion.div>

            {/* Trust micro-row */}
            <motion.div variants={item} style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center" }}>
              {[
                { badge: "⭐ Top Rated", sub: "Upwork" },
                { badge: "🎯 Level 2",  sub: "Fiverr" },
                { badge: "📚 Applied AI", sub: "Centennial College" },
              ].map((b) => (
                <div key={b.badge} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>{b.badge}</span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}>· {b.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: cards ── */}
          <motion.div variants={item} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Deliverables card */}
            <div className="glass-card" style={{ borderRadius: "18px", padding: "1.75rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
                What I deliver
              </p>
              {SERVICES_LIST.map((svc, i) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.45, ease: "easeOut" }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "11px 0", borderBottom: i < SERVICES_LIST.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "inline-block", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.82)", fontFamily: "var(--font-body)" }}>{svc.label}</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-accent)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap", flexShrink: 0, padding: "2px 8px", borderRadius: "999px", backgroundColor: "rgba(62,189,122,0.12)", border: "1px solid rgba(62,189,122,0.2)" }}>
                    {svc.metric}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.625rem" }}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.07, duration: 0.4 }}
                  className="glass-card"
                  style={{ borderRadius: "12px", padding: "1rem 0.75rem", textAlign: "center" }}
                >
                  <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", fontFamily: "var(--font-display)", letterSpacing: "-0.04em", margin: "0 0 3px" }}>{s.number}</p>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.42)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.35 }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "56px" }}>
          <path d="M0 56 C360 0 1080 0 1440 56 L1440 56 L0 56Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
}
