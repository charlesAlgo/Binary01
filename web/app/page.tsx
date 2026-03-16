"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroScreen     from "@/components/IntroScreen";
import Hero            from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import SocialProof     from "@/components/home/SocialProof";
import FeaturedWork    from "@/components/home/FeaturedWork";
import HowWeWork       from "@/components/home/HowWeWork";
import FounderSection  from "@/components/home/FounderSection";
import TechStack       from "@/components/home/TechStack";
import CTAStrip        from "@/components/home/CTAStrip";

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

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
            <ServicesSection />
            <SocialProof />
            <FeaturedWork />
            <HowWeWork />
            <FounderSection />
            <TechStack />
            <CTAStrip />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
