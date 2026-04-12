"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";

const TOOLS = ["n8n", "OpenClaw", "Webhooks", "AI Agents", "Slack Alerts"];

const PHRASES = [
  "We build automation systems that close deals while you sleep.",
  "From first lead to paid invoice — fully automated.",
  "Replace manual work with AI-powered workflows.",
  "One system. Zero dropped leads. Maximum revenue.",
  "Your business on autopilot — built in days, not months.",
];

function PhraseTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        height: "1.6em",
        overflow: "hidden",
        position: "relative",
        marginBottom: "1.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "block",
            fontSize: "0.9375rem",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            color: "rgba(0,136,219,0.9)",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {PHRASES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "transparent",
        paddingTop: "clamp(7rem, 14vw, 10rem)",
        paddingBottom: "clamp(5rem, 10vw, 7rem)",
        overflow: "hidden",
      }}
    >
      <SparklesCore
        id="hero-sparkles"
        background="transparent"
        minSize={0.4}
        maxSize={1.2}
        particleDensity={70}
        particleColor="#0088DB"
        speed={1.1}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-8%", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,136,219,0.12) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-15%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="section-wrapper" style={{ position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="section-label"
            style={{ justifyContent: "center", marginBottom: "1rem" }}
          >
            <span className="section-label-dash" />
            <span>AUTOMATION AGENCY &amp; SYSTEMS BUILDER</span>
          </motion.div>

          {/* Phrase ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            style={{ width: "100%" }}
          >
            <PhraseTicker />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "#fff",
              maxWidth: "15ch",
              marginBottom: "1.5rem",
              lineHeight: 1.06,
              fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
              margin: "0 auto 1.5rem",
              letterSpacing: "-0.03em",
            }}
          >
            We automate your business{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0088DB 0%, #06b6d4 50%, #38b2f5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              end to end.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1.125rem",
              maxWidth: "560px",
              lineHeight: 1.78,
              fontFamily: "var(--font-body)",
              marginBottom: "2.25rem",
              marginInline: "auto",
            }}
          >
            From first lead to closed deal — DataLife builds the automation systems that run your pipeline, follow up with prospects, notify your team, and close more business. Without hiring more people.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.5rem", justifyContent: "center" }}
          >
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
                transition: "background-color 0.2s, transform 0.15s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent-hover)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book a Free Automation Audit
            </Link>
            <Link
              href="/work"
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
                transition: "border-color 0.2s, background-color 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "rgba(0,136,219,0.55)"; e.currentTarget.style.backgroundColor = "rgba(0,136,219,0.06)"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              See What We&rsquo;ve Built
            </Link>
          </motion.div>

          {/* Tools strip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
          >
            <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
              Powered by
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "999px",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.65)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
