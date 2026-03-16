"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextShimmer } from "@/components/ui/text-shimmer";

const SEQUENCE = [
  { text: "Hi, how are you?",               delay: 0,    duration: 1600 },
  { text: "We are Datalife.",                delay: 1800, duration: 1800 },
  { text: "We live with data every day.",    delay: 3800, duration: 1800 },
  { text: "Welcome.",                        delay: 5800, duration: 1400 },
];

const TOTAL_DURATION = 7800; // ms before intro exits

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    SEQUENCE.forEach((step, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), step.delay));
    });

    timers.push(setTimeout(onComplete, TOTAL_DURATION));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0D1F17] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glow top-right */}
      <div
        aria-hidden="true"
        className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(62,189,122,0.18) 0%, transparent 65%)" }}
      />
      {/* Ambient glow bottom-left */}
      <div
        aria-hidden="true"
        className="absolute bottom-[-20%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)" }}
      />

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#3EBD7A]"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: TOTAL_DURATION / 1000, ease: "linear" }}
      />

      {/* Logo mark */}
      <motion.div
        className="absolute top-8 left-8 flex items-center gap-2"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="w-7 h-7 rounded-lg bg-[#3EBD7A] flex items-center justify-center">
          <span className="text-white font-bold text-xs">DL</span>
        </div>
        <span className="text-white/60 text-sm font-medium tracking-wide">Datalife</span>
      </motion.div>

      {/* Text sequence */}
      <div className="relative text-center px-6">
        <AnimatePresence mode="wait">
          {SEQUENCE.map((step, i) =>
            i === activeIndex ? (
              <motion.div
                key={step.text}
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                exit={{   opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-4"
              >
                {i === 0 && (
                  <TextShimmer
                    duration={1.6}
                    spread={3}
                    className="text-2xl md:text-3xl font-medium tracking-wide [--base-color:#4ade80] [--base-gradient-color:#bbf7d0]"
                  >
                    {step.text}
                  </TextShimmer>
                )}

                {i === 1 && (
                  <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">
                    We are{" "}
                    <span
                      style={{
                        background: "linear-gradient(135deg, #3EBD7A 0%, #14B8A6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Datalife.
                    </span>
                  </h1>
                )}

                {i === 2 && (
                  <p className="text-xl md:text-2xl text-white/70 font-light max-w-xl leading-relaxed">
                    We live with{" "}
                    <span className="text-[#3EBD7A] font-semibold">data</span>
                    {" "}every day.
                  </p>
                )}

                {i === 3 && (
                  <div className="flex flex-col items-center gap-3">
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">
                      Welcome.
                    </h2>
                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      <span
                        className="w-2 h-2 rounded-full bg-[#3EBD7A] inline-block"
                        style={{ boxShadow: "0 0 8px #3EBD7A" }}
                      />
                      <span className="text-white/50 text-sm tracking-widest uppercase font-medium">
                        Entering experience
                      </span>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Skip button */}
      <motion.button
        className="absolute bottom-8 right-8 text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={onComplete}
      >
        Skip →
      </motion.button>
    </motion.div>
  );
}
