import Hero          from "@/components/home/Hero";
import ServicesSection from "@/components/home/ServicesSection";
import SocialProof   from "@/components/home/SocialProof";
import FeaturedWork  from "@/components/home/FeaturedWork";
import HowWeWork     from "@/components/home/HowWeWork";
import TechStack     from "@/components/home/TechStack";
import CTAStrip      from "@/components/home/CTAStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <SocialProof />
      <FeaturedWork />
      <HowWeWork />
      <TechStack />
      <CTAStrip />
    </>
  );
}
