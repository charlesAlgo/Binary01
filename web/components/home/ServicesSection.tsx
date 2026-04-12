"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ── Stage data ──────────────────────────────────────────────── */
const STAGES = [
  {
    num: "1",
    title: "Lead Generation",
    tagline: "Stop prospecting manually. Your pipeline fills itself.",
    href: "/services",
    accent: "#38BDF8",
    detail:
      "Automated lead capture, enrichment, and CRM entry — running 24/7 without your team lifting a finger. Every form submission triggers a full pipeline in under 60 seconds.",
    stat: "< 60s",
    statLabel: "lead → CRM",
  },
  {
    num: "2",
    title: "Nurture & Outreach",
    tagline: "Every lead gets followed up. Every time. Automatically.",
    href: "/services",
    accent: "#14B8A6",
    detail:
      "Personalised sequences triggered by behaviour. No manual chasing, no leads going cold overnight. Sequences pause the moment a prospect replies.",
    stat: "0",
    statLabel: "manual follow-ups",
  },
  {
    num: "3",
    title: "Close & Convert",
    tagline: "Move deals through your pipeline on autopilot.",
    href: "/services",
    accent: "#10B981",
    detail:
      "CRM stage automations, proposal triggers, and deal-flow workflows push deals forward without constant manual nudging. When a deal closes, the system takes over.",
    stat: "30s",
    statLabel: "close → invoice",
  },
  {
    num: "4",
    title: "Notify & Scale",
    tagline: "Your whole team stays in sync — instantly.",
    href: "/services",
    accent: "#8B5CF6",
    detail:
      "Slack, email, and SMS alerts for every business event that matters — new lead, closed deal, missed follow-up, low stock. The right person knows in real time.",
    stat: "24/7",
    statLabel: "live notifications",
  },
];

/* ── Shared SVG primitives ───────────────────────────────────── */
function GlowDef({ id }: { id: string; color?: string }) {
  return (
    <defs>
      <filter id={id} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function SvgNode({
  cx, cy, r = 22, label, sub, accent, active, fid,
}: {
  cx: number; cy: number; r?: number; label: string; sub?: string;
  accent: string; active?: boolean; fid: string;
}) {
  return (
    <g>
      {active && (
        <>
          <circle cx={cx} cy={cy} r={r} fill={`${accent}15`}>
            <animate attributeName="r" values={`${r};${r + 10};${r}`} dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      <circle
        cx={cx} cy={cy} r={r}
        fill={active ? `${accent}22` : `${accent}10`}
        stroke={accent}
        strokeWidth={active ? 2 : 1.5}
        filter={active ? `url(#${fid})` : undefined}
      />
      <text x={cx} y={cy - (sub ? 4 : 1)} textAnchor="middle" fill={accent}
        fontSize="7.5" fontWeight="700" fontFamily="monospace">
        {label}
      </text>
      {sub && (
        <text x={cx} y={cy + 9} textAnchor="middle" fill={accent}
          fontSize="6" fontWeight="500" fontFamily="monospace" opacity="0.65">
          {sub}
        </text>
      )}
    </g>
  );
}

function SvgLine({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="4 3" />
  );
}

function Packet({ path, dur, begin, accent, fid }: {
  path: string; dur: number; begin: number; accent: string; fid: string;
}) {
  return (
    <circle r="3.5" fill={accent} filter={`url(#${fid})`}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

/* ── Stage SVG animations ────────────────────────────────────── */

/* Stage 1 — FORM → ENRICH → CRM → SLACK (linear pipeline) */
function LeadGenSVG({ accent }: { accent: string }) {
  const fid = "gf1";
  return (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <GlowDef id={fid} color={accent} />
      <SvgNode cx={30} cy={80} r={20} label="FORM" accent={accent} fid={fid} />
      <SvgNode cx={110} cy={80} r={24} label="ENRICH" accent={accent} active fid={fid} />
      <SvgNode cx={195} cy={80} r={20} label="CRM" accent={accent} fid={fid} />
      <SvgNode cx={260} cy={80} r={17} label="SLACK" accent={accent} fid={fid} />
      <SvgLine x1={50} y1={80} x2={86} y2={80} />
      <SvgLine x1={134} y1={80} x2={175} y2={80} />
      <SvgLine x1={215} y1={80} x2={243} y2={80} />
      <text x={30} y={118} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">Lead in</text>
      <text x={110} y={118} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">+Data</text>
      <text x={195} y={118} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">Saved</text>
      <text x={260} y={118} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">Alert</text>
      <Packet path="M 50 80 L 86 80" dur={1.7} begin={0}    accent={accent} fid={fid} />
      <Packet path="M 50 80 L 86 80" dur={1.7} begin={0.85} accent={accent} fid={fid} />
      <Packet path="M 134 80 L 175 80" dur={1.7} begin={0.2}  accent={accent} fid={fid} />
      <Packet path="M 134 80 L 175 80" dur={1.7} begin={1.05} accent={accent} fid={fid} />
      <Packet path="M 215 80 L 243 80" dur={1.3} begin={0.4}  accent={accent} fid={fid} />
      <Packet path="M 215 80 L 243 80" dur={1.3} begin={1.1}  accent={accent} fid={fid} />
    </svg>
  );
}

/* Stage 2 — DB → 3 SEQ lanes → REPLY / BOOK */
function NurtureSVG({ accent }: { accent: string }) {
  const fid = "gf2";
  return (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <GlowDef id={fid} color={accent} />
      <SvgNode cx={38}  cy={80} r={22} label="DB"  accent={accent} active fid={fid} />
      <SvgNode cx={130} cy={36} r={15} label="SEQ" sub="Day 1" accent={accent} fid={fid} />
      <SvgNode cx={130} cy={80} r={15} label="SEQ" sub="Day 3" accent={accent} fid={fid} />
      <SvgNode cx={130} cy={124} r={15} label="SEQ" sub="Day 7" accent={accent} fid={fid} />
      <SvgNode cx={230} cy={36}  r={14} label="OPEN"  accent={accent} fid={fid} />
      <SvgNode cx={230} cy={80}  r={14} label="REPLY" accent={accent} fid={fid} />
      <SvgNode cx={230} cy={124} r={14} label="BOOK"  accent={accent} fid={fid} />
      <line x1={60} y1={74} x2={115} y2={40}  stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={60} y1={80} x2={115} y2={80}  stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={60} y1={86} x2={115} y2={120} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="4 3" />
      <SvgLine x1={145} y1={36}  x2={216} y2={36}  />
      <SvgLine x1={145} y1={80}  x2={216} y2={80}  />
      <SvgLine x1={145} y1={124} x2={216} y2={124} />
      <Packet path="M 60 74 L 115 40"   dur={1.6} begin={0}    accent={accent} fid={fid} />
      <Packet path="M 60 80 L 115 80"   dur={1.6} begin={0.55} accent={accent} fid={fid} />
      <Packet path="M 60 86 L 115 120"  dur={1.6} begin={1.1}  accent={accent} fid={fid} />
      <Packet path="M 145 36 L 216 36"  dur={1.6} begin={0.2}  accent={accent} fid={fid} />
      <Packet path="M 145 80 L 216 80"  dur={1.6} begin={0.75} accent={accent} fid={fid} />
      <Packet path="M 145 124 L 216 124" dur={1.6} begin={1.3}  accent={accent} fid={fid} />
    </svg>
  );
}

/* Stage 3 — LEAD → PROP → SIGN → INVOICE (with auto badge) */
function CloseSVG({ accent }: { accent: string }) {
  const fid = "gf3";
  return (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <GlowDef id={fid} color={accent} />
      <SvgNode cx={28}  cy={80} r={20} label="LEAD" accent={accent} fid={fid} />
      <SvgNode cx={108} cy={80} r={22} label="PROP" sub="Sent" accent={accent} active fid={fid} />
      <SvgNode cx={192} cy={80} r={20} label="SIGN" sub="Auto" accent={accent} fid={fid} />
      <SvgNode cx={258} cy={80} r={18} label="£££"  sub="Invoice" accent={accent} fid={fid} />
      {/* Auto indicator */}
      <rect x={88} y={22} width={40} height={16} rx={8} fill={`${accent}20`} stroke={accent} strokeWidth="1" />
      <text x={108} y={33} textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace" fontWeight="700">AUTO</text>
      <line x1={108} y1={38} x2={108} y2={58} stroke={accent} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <SvgLine x1={48} y1={80} x2={86} y2={80} />
      <SvgLine x1={130} y1={80} x2={172} y2={80} />
      <SvgLine x1={212} y1={80} x2={240} y2={80} />
      <Packet path="M 48 80 L 86 80"    dur={1.9} begin={0}    accent={accent} fid={fid} />
      <Packet path="M 48 80 L 86 80"    dur={1.9} begin={0.95} accent={accent} fid={fid} />
      <Packet path="M 130 80 L 172 80"  dur={1.9} begin={0.35} accent={accent} fid={fid} />
      <Packet path="M 130 80 L 172 80"  dur={1.9} begin={1.3}  accent={accent} fid={fid} />
      <Packet path="M 212 80 L 240 80"  dur={1.4} begin={0.65} accent={accent} fid={fid} />
      <Packet path="M 212 80 L 240 80"  dur={1.4} begin={1.4}  accent={accent} fid={fid} />
    </svg>
  );
}

/* Stage 4 — EVENT → ROUTER → [SLACK / EMAIL / SMS] fan-out */
function NotifySVG({ accent }: { accent: string }) {
  const fid = "gf4";
  return (
    <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" aria-hidden="true">
      <GlowDef id={fid} color={accent} />
      <SvgNode cx={38}  cy={80} r={22} label="EVENT" accent={accent} fid={fid} />
      <SvgNode cx={120} cy={80} r={20} label="ROUTE" accent={accent} active fid={fid} />
      <SvgNode cx={218} cy={36}  r={18} label="SLACK" accent={accent} fid={fid} />
      <SvgNode cx={218} cy={80}  r={18} label="EMAIL" accent={accent} fid={fid} />
      <SvgNode cx={218} cy={124} r={18} label="SMS"   accent={accent} fid={fid} />
      <SvgLine x1={60} y1={80} x2={100} y2={80} />
      <line x1={140} y1={74} x2={200} y2={42}  stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="4 3" />
      <SvgLine x1={140} y1={80} x2={200} y2={80} />
      <line x1={140} y1={86} x2={200} y2={118} stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" strokeDasharray="4 3" />
      <Packet path="M 60 80 L 100 80"    dur={1.5} begin={0}    accent={accent} fid={fid} />
      <Packet path="M 60 80 L 100 80"    dur={1.5} begin={0.75} accent={accent} fid={fid} />
      <Packet path="M 140 74 L 200 42"   dur={1.5} begin={0.2}  accent={accent} fid={fid} />
      <Packet path="M 140 74 L 200 42"   dur={1.5} begin={1.1}  accent={accent} fid={fid} />
      <Packet path="M 140 80 L 200 80"   dur={1.5} begin={0.5}  accent={accent} fid={fid} />
      <Packet path="M 140 80 L 200 80"   dur={1.5} begin={1.35} accent={accent} fid={fid} />
      <Packet path="M 140 86 L 200 118"  dur={1.5} begin={0.8}  accent={accent} fid={fid} />
      <Packet path="M 140 86 L 200 118"  dur={1.5} begin={1.6}  accent={accent} fid={fid} />
    </svg>
  );
}

const STAGE_ANIMS = [LeadGenSVG, NurtureSVG, CloseSVG, NotifySVG];

/* ── Pipeline track bar ──────────────────────────────────────── */
function PipelineTrack({
  current, onChange,
}: {
  current: number;
  onChange: (i: number) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
      {STAGES.map((stage, i) => {
        const isActive = i === current;
        const isPast   = i < current;
        const { accent } = stage;

        return (
          <div key={stage.num} style={{ display: "flex", alignItems: "center", flex: i < STAGES.length - 1 ? 1 : 0 }}>

            {/* Stage node button */}
            <button
              onClick={() => onChange(i)}
              aria-label={`Stage ${stage.num}: ${stage.title}`}
              style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${isActive ? accent : isPast ? `${accent}50` : "rgba(255,255,255,0.12)"}`,
                backgroundColor: isActive ? `${accent}22` : isPast ? `${accent}0a` : "transparent",
                color: isActive ? accent : isPast ? `${accent}80` : "rgba(255,255,255,0.28)",
                fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
                boxShadow: isActive ? `0 0 18px ${accent}55` : "none",
                transition: "all 0.35s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)",
              }}
            >
              {isPast ? (
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : stage.num}
            </button>

            {/* Connector with flowing animation */}
            {i < STAGES.length - 1 && (
              <div
                style={{
                  flex: 1, height: 2, marginInline: "4px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  position: "relative", overflow: "hidden",
                  borderRadius: "999px",
                }}
              >
                {/* Static fill for past stages */}
                {isPast && (
                  <div style={{ position: "absolute", inset: 0, backgroundColor: accent, opacity: 0.35 }} />
                )}
                {/* Flowing glow stripe */}
                {(isActive || isPast) && (
                  <motion.div
                    style={{
                      position: "absolute", top: 0, bottom: 0,
                      width: "45%",
                      background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
                      opacity: 0.7,
                    }}
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear", repeatDelay: 0.1 }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Stage label row ─────────────────────────────────────────── */
function StageLabels({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", marginBottom: "1.75rem" }}>
      {STAGES.map((stage, i) => {
        const isActive = i === current;
        return (
          <div key={stage.num} style={{ flex: 1, textAlign: "center" }}>
            <span style={{
              fontSize: "0.7rem", fontWeight: 600, fontFamily: "var(--font-body)",
              color: isActive ? stage.accent : "rgba(255,255,255,0.22)",
              transition: "color 0.3s",
              whiteSpace: "nowrap",
            }}>
              {stage.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main slideshow ──────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export default function ServicesSection() {
  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused,    setPaused]    = useState(false);

  const goTo = useCallback((i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  }, [current]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((i) => (i + 1) % STAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((i) => (i - 1 + STAGES.length) % STAGES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [paused, goNext]);

  const stage    = STAGES[current];
  const AnimComp = STAGE_ANIMS[current];

  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">

        {/* Section header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div className="section-label" style={{ marginBottom: "0.875rem" }}>
            <span className="section-label-dash" />
            <span>AUTOMATION PIPELINE</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", letterSpacing: "-0.02em", margin: 0, maxWidth: "32ch" }}>
              From first lead to closed deal — automated.
            </h2>
            <Link
              href="/services"
              style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-accent)", textDecoration: "none", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}
            >
              All services →
            </Link>
          </div>
        </div>

        {/* Pipeline track */}
        <PipelineTrack current={current} onChange={goTo} />
        <StageLabels current={current} />

        {/* Slideshow card */}
        <div
          style={{ position: "relative", borderRadius: "14px", overflow: "hidden" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="forte-card"
                style={{
                  borderTopColor: stage.accent,
                  padding: "clamp(1.75rem, 4vw, 2.75rem)",
                  minHeight: "340px",
                  display: "grid",
                  gap: "2rem",
                  alignItems: "center",
                }}
              >
                {/* Two-col on lg: content left, SVG right */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr]" style={{ gap: "2rem", alignItems: "center" }}>

                  {/* ── Left: content ── */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                      <div
                        className="stage-badge"
                        style={{ backgroundColor: `${stage.accent}18`, color: stage.accent, border: `1px solid ${stage.accent}35` }}
                      >
                        {stage.num}
                      </div>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: stage.accent, fontFamily: "var(--font-body)" }}>
                        Stage {stage.num}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.375rem, 3vw, 2rem)", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.625rem", letterSpacing: "-0.02em" }}>
                      {stage.title}
                    </h3>

                    <p style={{ fontSize: "1rem", fontStyle: "italic", color: stage.accent, fontFamily: "var(--font-body)", margin: "0 0 1.125rem", lineHeight: 1.5 }}>
                      &ldquo;{stage.tagline}&rdquo;
                    </p>

                    <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.75rem", lineHeight: 1.75, maxWidth: "52ch" }}>
                      {stage.detail}
                    </p>

                    {/* Stat + CTA row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                      <Link
                        href={stage.href}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "6px",
                          padding: "10px 22px", fontSize: "0.9375rem", fontWeight: 600,
                          color: "#fff", backgroundColor: "var(--color-accent)",
                          borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)",
                        }}
                      >
                        Learn more →
                      </Link>
                      <div>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 800, color: stage.accent, letterSpacing: "-0.02em" }}>
                          {stage.stat}
                        </span>
                        <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginLeft: "6px" }}>
                          {stage.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ── Right: animated SVG ── */}
                  <div
                    className="hidden lg:flex"
                    style={{
                      alignItems: "center", justifyContent: "center",
                      minHeight: "220px", padding: "1rem",
                      borderRadius: "10px",
                      backgroundColor: `${stage.accent}06`,
                      border: `1px solid ${stage.accent}15`,
                    }}
                  >
                    <AnimComp accent={stage.accent} />
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "1.5rem" }}>

          {/* Prev */}
          <button
            onClick={goPrev}
            aria-label="Previous stage"
            style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer", color: "rgba(255,255,255,0.6)", transition: "all 0.2s",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dot indicators */}
          {STAGES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to stage ${i + 1}`}
              style={{
                height: 8, borderRadius: "999px", border: "none", cursor: "pointer",
                width: i === current ? 28 : 8,
                backgroundColor: i === current ? stage.accent : "rgba(255,255,255,0.18)",
                transition: "all 0.35s ease",
              }}
            />
          ))}

          {/* Next */}
          <button
            onClick={goNext}
            aria-label="Next stage"
            style={{
              width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
              cursor: "pointer", color: "rgba(255,255,255,0.6)", transition: "all 0.2s",
            }}
            onMouseOver={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)"; }}
            onMouseOut={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Auto-advance progress bar */}
        {!paused && (
          <motion.div
            key={`pb-${current}`}
            style={{ height: 2, background: stage.accent, borderRadius: "999px", marginTop: "1rem", originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: "linear" }}
          />
        )}

      </div>
    </section>
  );
}
