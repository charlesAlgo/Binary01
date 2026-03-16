"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";
import NeuralNetBg from "@/components/ui/neural-net-bg";
import { ArrowRight } from "lucide-react";

const SEQUENCE = [
  { text: "Hi, how are you?",             duration: 1800 },
  { text: "We are DataLife.",             duration: 1800 },
  { text: "We live with data every day.", duration: 1800 },
  { text: "Welcome.",                     duration: 1400 },
];
const TOTAL = SEQUENCE.reduce((a, s) => a + s.duration, 0) + 400;

const TRACK_W = 300;
const THUMB_W = 56;
const MAX_DRAG = TRACK_W - THUMB_W - 8;

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<"landing" | "sequence" | "done">("landing");
  const [activeIndex, setActiveIndex] = useState(0);

  const x = useMotionValue(0);
  const progress = useTransform(x, [0, MAX_DRAG], [0, 1]);
  const trackBg   = useTransform(progress, [0, 1], ["rgba(62,189,122,0.10)", "rgba(62,189,122,0.38)"]);
  const thumbRot  = useTransform(x, [0, MAX_DRAG], [0, 360]);
  const labelOp   = useTransform(progress, [0, 0.5], [1, 0]);

  function handleDragEnd() {
    if (x.get() >= MAX_DRAG * 0.85) {
      setStage("sequence");
    } else {
      x.set(0);
    }
  }

  useEffect(() => {
    if (stage !== "sequence") return;
    let elapsed = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    SEQUENCE.forEach((s, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), elapsed));
      elapsed += s.duration;
    });
    timers.push(setTimeout(() => setStage("done"), elapsed));
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  useEffect(() => {
    if (stage === "done") onComplete();
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[9999] overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Aurora gradient base — warm milk white ── */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "#F4F1E8",
              backgroundImage: [
                "radial-gradient(ellipse 90% 65% at 15% 8%,   rgba(62,189,122,0.20) 0%, transparent 58%)",
                "radial-gradient(ellipse 75% 55% at 85% 82%,  rgba(20,184,166,0.14) 0%, transparent 52%)",
                "radial-gradient(ellipse 65% 50% at 60% 20%,  rgba(134,198,100,0.12) 0%, transparent 55%)",
                "radial-gradient(ellipse 80% 60% at 30% 75%,  rgba(180,230,180,0.22) 0%, transparent 60%)",
                "radial-gradient(ellipse 50% 40% at 90% 10%,  rgba(100,210,160,0.10) 0%, transparent 50%)",
              ].join(", "),
              backgroundSize: "160% 160%, 140% 140%, 130% 130%, 120% 120%, 110% 110%",
              animation: "aurora-move 22s ease-in-out infinite",
            }}
          />

          {/* ── Neural network canvas ── */}
          <NeuralNetBg className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* ── Vignette — warm edges ── */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 35%, rgba(200,190,160,0.45) 100%)",
            }}
          />

          {/* ── Glass noise texture ── */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          {/* ── Logo ── */}
          <motion.div
            className="absolute top-8 left-8 flex items-center gap-3"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm"
              style={{
                background: "linear-gradient(135deg, #3EBD7A 0%, #14B8A6 100%)",
                boxShadow: "0 0 24px rgba(62,189,122,0.45)",
              }}
            >
              DL
            </div>
            <span style={{ color: "rgba(15,40,25,0.5)", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.12em" }}>
              DataLife · ESC 2023
            </span>
          </motion.div>

          {/* ── STAGE: landing ── */}
          <AnimatePresence mode="wait">
            {stage === "landing" && (
              <motion.div
                key="landing"
                className="absolute inset-0 flex flex-col items-center justify-center px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -32, filter: "blur(14px)" }}
                transition={{ duration: 0.65 }}
              >
                <motion.div
                  className="text-center max-w-3xl"
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Status badge */}
                  <div
                    className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full"
                    style={{
                      background: "rgba(62,189,122,0.10)",
                      border: "1px solid rgba(62,189,122,0.30)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: "#3EBD7A", boxShadow: "0 0 8px #3EBD7A", animation: "pulse 2s infinite" }}
                    />
                    <span style={{ color: "#2a9e62", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
                      AI &amp; Data Services · Est. 2026
                    </span>
                  </div>

                  {/* Headline */}
                  <h1
                    style={{
                      fontSize: "clamp(3.2rem, 8.5vw, 7rem)",
                      fontWeight: 900,
                      lineHeight: 0.96,
                      letterSpacing: "-0.04em",
                      marginBottom: "1.6rem",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <span style={{ color: "#0f172a" }}>Turn your </span>
                    <span
                      style={{
                        background: "linear-gradient(135deg, #3EBD7A 20%, #14B8A6 80%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      data
                    </span>
                    <br />
                    <span style={{ color: "#1e293b" }}>into decisions.</span>
                  </h1>

                  <p
                    style={{
                      color: "rgba(15,23,42,0.45)",
                      fontSize: "1.05rem",
                      lineHeight: 1.75,
                      fontFamily: "var(--font-body)",
                      maxWidth: "40ch",
                      margin: "0 auto 3.5rem",
                    }}
                  >
                    Full-stack AI &amp; analytics solutions. Real results, not slide decks.
                  </p>

                  {/* Slide button */}
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      className="relative flex items-center rounded-full select-none"
                      style={{
                        width: TRACK_W,
                        height: THUMB_W + 8,
                        padding: "4px",
                        background: trackBg,
                        border: "1px solid rgba(62,189,122,0.28)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
                      }}
                    >
                      <motion.span
                        style={{ opacity: labelOp }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <span style={{ color: "rgba(15,23,42,0.35)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", paddingLeft: "3.5rem" }}>
                          slide to connect →
                        </span>
                      </motion.span>

                      <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: MAX_DRAG }}
                        dragElastic={0.04}
                        dragMomentum={false}
                        onDragEnd={handleDragEnd}
                        style={{
                          x,
                          rotate: thumbRot,
                          width: THUMB_W,
                          height: THUMB_W,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #3EBD7A 0%, #14B8A6 100%)",
                          boxShadow: "0 4px 24px rgba(62,189,122,0.55), 0 0 0 1px rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "grab",
                          flexShrink: 0,
                          zIndex: 2,
                        }}
                        whileTap={{ cursor: "grabbing", scale: 0.93 }}
                      >
                        <ArrowRight size={22} color="white" strokeWidth={2.5} />
                      </motion.div>
                    </motion.div>

                    <span style={{ color: "rgba(15,23,42,0.28)", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                      drag right to enter
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ── STAGE: sequence ── */}
            {stage === "sequence" && (
              <motion.div
                key="sequence"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55 }}
              >
                <AnimatePresence mode="wait">
                  {SEQUENCE.map((step, i) =>
                    i === activeIndex ? (
                      <motion.div
                        key={step.text}
                        className="text-center px-6"
                        initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                        animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                        exit={{   opacity: 0, y: -22, filter: "blur(8px)" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {i === 0 && (
                          <TextShimmer
                            duration={1.3}
                            spread={3}
                            className="text-3xl md:text-4xl font-semibold tracking-tight [--base-color:#4ade80] [--base-gradient-color:#d1fae5] dark:[--base-color:#4ade80] dark:[--base-gradient-color:#d1fae5]"
                          >
                            {step.text}
                          </TextShimmer>
                        )}

                        {i === 1 && (
                          <h2
                            style={{
                              fontSize: "clamp(3rem, 10vw, 7.5rem)",
                              fontWeight: 900,
                              letterSpacing: "-0.045em",
                              lineHeight: 0.95,
                              fontFamily: "var(--font-display)",
                            }}
                          >
                            <span style={{ color: "rgba(255,255,255,0.88)" }}>We are </span>
                            <span
                              style={{
                                background: "linear-gradient(135deg, #3EBD7A 0%, #14B8A6 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                filter: "drop-shadow(0 0 32px rgba(62,189,122,0.6))",
                              }}
                            >
                              DataLife.
                            </span>
                          </h2>
                        )}

                        {i === 2 && (
                          <p
                            style={{
                              fontSize: "clamp(1.5rem, 4.5vw, 2.8rem)",
                              fontWeight: 300,
                              letterSpacing: "-0.02em",
                              lineHeight: 1.35,
                              fontFamily: "var(--font-display)",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            We live with{" "}
                            <span
                              style={{
                                color: "#3EBD7A",
                                fontWeight: 700,
                                filter: "drop-shadow(0 0 14px rgba(62,189,122,0.7))",
                              }}
                            >
                              data
                            </span>{" "}
                            every day.
                          </p>
                        )}

                        {i === 3 && (
                          <div className="flex flex-col items-center gap-5">
                            <h2
                              style={{
                                fontSize: "clamp(5rem, 15vw, 11rem)",
                                fontWeight: 900,
                                letterSpacing: "-0.055em",
                                color: "#ffffff",
                                lineHeight: 0.88,
                                fontFamily: "var(--font-display)",
                                filter: "drop-shadow(0 0 60px rgba(62,189,122,0.25))",
                              }}
                            >
                              Welcome.
                            </h2>
                            <motion.div
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.45, duration: 0.5 }}
                            >
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: "#3EBD7A", boxShadow: "0 0 12px #3EBD7A" }}
                              />
                              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                                Entering experience
                              </span>
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          {stage === "sequence" && (
            <motion.div
              className="absolute bottom-0 left-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, #3EBD7A, #14B8A6)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: TOTAL / 1000, ease: "linear" }}
            />
          )}

          {/* Skip */}
          <motion.button
            className="absolute bottom-7 right-7 text-xs tracking-widest uppercase transition-colors"
            style={{ color: "rgba(15,23,42,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={onComplete}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(15,23,42,0.55)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(15,23,42,0.25)")}
          >
            Skip →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
