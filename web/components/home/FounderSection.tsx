"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ButtonWithIcon from "@/components/ui/button-with-icon";

const STATS = [
  { number: "40+",  label: "Projects" },
  { number: "98%",  label: "Satisfaction" },
  { number: "15+",  label: "Industries" },
  { number: "4",    label: "Countries" },
];

const SKILLS = [
  "Python", "SQL", "Power BI", "LangChain",
  "PyTorch", "Next.js", "Supabase", "OpenAI API",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function FounderSection() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-cream)", /* #0f0f13 */
        paddingBlock: "clamp(5rem, 10vw, 8rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div aria-hidden style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,136,219,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,136,219,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div className="section-wrapper" style={{ position: "relative" }}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="founder-grid grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[clamp(2.5rem,6vw,6rem)] items-center"
        >
          {/* ── Left: Profile card ── */}
          <motion.div variants={fadeUp}>
            <div
              style={{
                borderRadius: "24px",
                background: "linear-gradient(145deg, #141418 0%, #0f0f13 100%)",
                padding: "2.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1.25rem",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Card shimmer line */}
              <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,136,219,0.5), transparent)" }} />

              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(0,136,219,0.25) 0%, rgba(6,182,212,0.15) 100%)",
                    border: "2px solid rgba(0,136,219,0.40)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 32px rgba(0,136,219,0.20)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>CS</span>
                </div>
                {/* Availability ring */}
                <span
                  style={{
                    position: "absolute", bottom: 4, right: 4,
                    width: "18px", height: "18px", borderRadius: "50%",
                    backgroundColor: "var(--color-accent)",
                    border: "3px solid #0f0f13",
                    boxShadow: "0 0 8px rgba(0,136,219,0.6)",
                  }}
                />
              </div>

              {/* Name & title */}
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 800, color: "#fff", margin: "0 0 5px", letterSpacing: "-0.025em" }}>
                  Charles Shalua
                </p>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.52)", fontFamily: "var(--font-body)", margin: 0 }}>
                  Founder · AI &amp; Data Engineer
                </p>
              </div>

              {/* Badge */}
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
                <span
                  style={{
                    fontSize: "0.72rem", fontWeight: 600, color: "var(--color-accent)",
                    padding: "4px 12px", borderRadius: "999px",
                    backgroundColor: "rgba(0,136,219,0.12)",
                    border: "1px solid rgba(0,136,219,0.25)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  40+ Projects Delivered
                </span>
              </div>

              {/* Details */}
              <div style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Location",   value: "Ontario, Canada" },
                  { label: "Education",  value: "Centennial College — Applied AI" },
                  { label: "Founded",    value: "DataLife · ESC 2023" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.72)", fontFamily: "var(--font-body)", fontWeight: 500, textAlign: "right" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA inside card */}
              <Link
                href="/about"
                style={{
                  display: "block", width: "100%",
                  padding: "11px 0", borderRadius: "12px", textAlign: "center",
                  background: "rgba(0,136,219,0.10)",
                  border: "1px solid rgba(0,136,219,0.25)",
                  fontSize: "0.85rem", fontWeight: 600,
                  color: "var(--color-accent)", fontFamily: "var(--font-body)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,136,219,0.20)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,136,219,0.10)")}
              >
                View Full Profile →
              </Link>
            </div>
          </motion.div>

          {/* ── Right: Story & stats ── */}
          <div>
            <motion.div variants={fadeUp} style={{ marginBottom: "1.25rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 14px", borderRadius: "980px", border: "1px solid rgba(0,136,219,0.25)", background: "rgba(0,136,219,0.08)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>
                Meet the Founder
              </div>
            </motion.div>

            <motion.h2 variants={fadeUp} style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "1.5rem", lineHeight: 1.08 }}>
              The person behind<br />
              <span style={{ background: "linear-gradient(135deg, #0088DB 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                the code
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "1rem", maxWidth: "58ch" }}>
              I got into data out of frustration — watching teams make expensive decisions on gut feel while sitting on gigabytes of untouched data. I taught myself Python and SQL, built a few internal dashboards, and never looked back.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "2rem", maxWidth: "58ch" }}>
              Today I run <strong style={{ color: "var(--color-text-primary)" }}>DataLife</strong> — delivering full-stack AI &amp; data solutions directly to founders and product teams. No account managers. No hand-offs. You talk to the person who writes the code.
            </motion.p>

            {/* Stats grid — 2×2 on mobile, 4 columns from sm up */}
            <motion.div
              variants={fadeUp}
              className="founder-stats grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderRadius: "14px",
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-surface)",
                    padding: "1.1rem 0.75rem",
                    textAlign: "center",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-text-primary)", fontFamily: "var(--font-display)", letterSpacing: "-0.04em", margin: "0 0 3px" }}>{s.number}</p>
                  <p style={{ fontSize: "0.7rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.25rem" }}>
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: "0.78rem", fontFamily: "var(--font-mono)",
                    padding: "5px 12px", borderRadius: "8px",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(0,136,219,0.18)",
                    fontWeight: 500,
                  }}
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <ButtonWithIcon label="Read About Me" href="/about" />
              <Link
                href="/book"
                style={{
                  fontSize: "0.9rem", fontWeight: 600, color: "var(--color-text-secondary)",
                  textDecoration: "none", fontFamily: "var(--font-body)",
                  display: "flex", alignItems: "center", gap: "5px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                Book a Discovery Call →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
