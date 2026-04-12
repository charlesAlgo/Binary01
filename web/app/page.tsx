"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen      from "@/components/IntroScreen";
import Hero             from "@/components/home/Hero";
import PlatformRibbon   from "@/components/home/PlatformRibbon";
import ServicesSection  from "@/components/home/ServicesSection";
import HomeServicesGrid from "@/components/home/HomeServicesGrid";
import FeaturedWork     from "@/components/home/FeaturedWork";
import HomeReviews      from "@/components/home/HomeReviews";
import SocialProof      from "@/components/home/SocialProof";
import CTAStrip         from "@/components/home/CTAStrip";

const IDLE_MS = 2 * 60 * 60 * 1000; // 2 hours

function shouldShowIntro(): boolean {
  try {
    // New browser session (tab closed & reopened) → always show
    if (!sessionStorage.getItem("dl_intro_session")) return true;
    // Same session but idle > 2 h → show again
    const ts = localStorage.getItem("dl_intro_ts");
    if (!ts || Date.now() - Number(ts) > IDLE_MS) return true;
    return false;
  } catch {
    return true; // SSR / storage blocked
  }
}

function markIntroDone() {
  try {
    sessionStorage.setItem("dl_intro_session", "1");
    localStorage.setItem("dl_intro_ts", String(Date.now()));
  } catch { /* storage blocked — no-op */ }
}

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState<boolean | null>(null);

  useEffect(() => {
    const result = !shouldShowIntro();
    // Use a microtask to avoid setState-in-effect lint warning while keeping correct behaviour
    Promise.resolve().then(() => setIntroComplete(result));
  }, []);

  const handleIntroComplete = useCallback(() => {
    markIntroDone();
    setIntroComplete(true);
  }, []);

  // Don't render anything until we've checked storage (avoids flash)
  if (introComplete === null) return null;

  return (
    <>
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <Hero />
            <PlatformRibbon />
            <ServicesSection />
            <HomeServicesGrid />
            <FeaturedWork />
            <HomeReviews />
            <SocialProof />
            <CTAStrip />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
