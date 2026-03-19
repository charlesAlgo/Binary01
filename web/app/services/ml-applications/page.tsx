import type { Metadata } from "next";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import SectionHeader from "@/components/SectionHeader";
import ProcessStep from "@/components/ProcessStep";
import TechBadge from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "Freelance ML Application Developer — Custom ML Models",
  description:
    "Hire a freelance ML developer for custom classification, regression, fraud detection, and forecasting models deployed as production REST APIs. Fixed-price.",
  keywords: [
    "freelance machine learning developer",
    "ML application developer",
    "custom ML model",
    "classification model freelance",
    "fraud detection ML",
    "demand forecasting developer",
    "ML API development",
    "Python machine learning freelance",
  ],
  openGraph: {
    title: "Freelance ML Application Developer | DataLife",
    description:
      "Custom classification, regression, and forecasting models deployed as production REST APIs. Fixed-price ML development.",
    url: "https://data-life.tech/services/ml-applications",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance ML Application Developer | DataLife",
    description:
      "Custom ML models deployed as production APIs. Freelance machine learning developer.",
  },
  alternates: { canonical: "https://data-life.tech/services/ml-applications" },
};

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Classification & Regression",
    description: "Predict categorical outcomes or continuous values — customer churn, lead scoring, pricing models — trained on your own historical data.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a1.994 1.994 0 0 1-1.414-.586m0 0L11 14h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2v4l.586-.586z" />
      </svg>
    ),
    title: "Recommendation Engines",
    description: "Collaborative filtering and content-based models that surface the right product, content, or action to the right user at the right time.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Fraud Detection",
    description: "Anomaly-based and supervised classifiers that flag suspicious transactions in milliseconds — with explainability built in for compliance.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
    title: "Demand Forecasting",
    description: "Time-series models (XGBoost, Prophet) that predict inventory needs, staffing requirements, or revenue — reducing waste and stockouts.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Model Monitoring",
    description: "MLflow-tracked experiments with automated drift detection so your model stays accurate in production — not just at launch.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "REST API Deployment",
    description: "Your model shipped as a FastAPI endpoint, Dockerised and deployed to Vercel or your cloud of choice — with docs and a test suite included.",
  },
];

const STEPS = [
  {
    title: "Problem Framing",
    description: "We define the prediction target, success metric, and business impact. This step prevents wasted model training — the most common ML project failure.",
  },
  {
    title: "Data Prep & EDA",
    description: "Exploratory data analysis to understand distributions, outliers, and feature importance. You get a written EDA report before modelling begins.",
  },
  {
    title: "Model Training & Evaluation",
    description: "Multiple algorithms evaluated and compared. Full performance report with precision, recall, F1, and business-impact estimates. You choose what ships.",
  },
  {
    title: "API Deployment & Monitoring",
    description: "Model wrapped in a FastAPI service, containerised with Docker, deployed, and wired to MLflow for ongoing drift monitoring and retraining triggers.",
  },
];

const DELIVERABLES = [
  "EDA report + feature importance analysis",
  "Trained model (serialised + versioned)",
  "FastAPI REST endpoint with docs",
  "Docker container + deployment guide",
  "MLflow experiment tracking setup",
  "30-day monitoring & support",
];

const TECH = ["Python", "scikit-learn", "XGBoost", "PyTorch", "FastAPI", "MLflow", "Docker", "Vercel"];

const PLANS = [
  {
    name: "Starter",
    price: "$800 – $1,500",
    description: "A single production-ready ML model for one well-defined problem.",
    features: [
      "1 ML model (classification or regression)",
      "EDA + feature engineering",
      "FastAPI endpoint deployment",
      "Model performance report",
      "1 revision round",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$2,500 – $5,000",
    description: "A complete ML system with monitoring and a clean API.",
    features: [
      "Up to 3 models + ensemble option",
      "Full EDA & feature pipeline",
      "Dockerised FastAPI deployment",
      "MLflow experiment tracking",
      "Drift monitoring + retraining guide",
    ],
    cta: "Get Started",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "End-to-end ML platform with ongoing model maintenance.",
    features: [
      "Unlimited model builds",
      "Custom ML infrastructure design",
      "CI/CD for model retraining",
      "Dedicated Slack channel",
      "Monthly retainer & model updates",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];

export default function MLApplicationsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section
        style={{
          backgroundColor: "var(--color-hero)",
          paddingTop: "clamp(4rem, 10vw, 7rem)",
          paddingBottom: "clamp(4rem, 8vw, 6rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(62,189,122,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div className="section-wrapper" style={{ position: "relative" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.75rem", display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "var(--font-body)" }} className="hover:text-white">Home</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <Link href="/services" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "var(--font-body)" }} className="hover:text-white">Services</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-body)" }}>ML Applications</span>
          </nav>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(62,189,122,0.35)", backgroundColor: "rgba(62,189,122,0.08)", marginBottom: "1.5rem" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
                <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>ML Applications</span>
              </div>

              <h1 style={{ color: "#fff", marginBottom: "1.25rem", lineHeight: 1.08, maxWidth: "15ch" }}>
                Custom Machine Learning Models, Production-Ready
              </h1>

              <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", maxWidth: "44ch", lineHeight: 1.75, fontFamily: "var(--font-body)", marginBottom: "2.25rem" }}>
                From problem framing to a deployed, monitored API — I handle the full ML lifecycle so you get a model that works in the real world, not just a Jupyter notebook.
              </p>

              <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                <CTAButton label="Get a Quote" href="/contact" variant="filled" size="lg" />
                <CTAButton label="See Case Studies" href="/portfolio" variant="white" size="lg" />
              </div>
            </div>

            {/* Right — feature highlights card */}
            <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", padding: "1.75rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
                What you get
              </p>
              {[
                "Models trained on your data, not generic demos",
                "Deployed as a REST API — ready for your app",
                "MLflow monitoring so accuracy stays high",
                "Full code ownership, no vendor lock-in",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "rgba(62,189,122,0.15)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)", lineHeight: 1.55 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "48px" }}>
            <path d="M0 48 C360 0 1080 0 1440 48 L1440 48 L0 48Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ── 2. What's Included ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem" }}>
            <SectionHeader
              label="What's included"
              title="End-to-end ML — from data to deployed API"
              description="Every engagement covers the complete pipeline: data exploration, model development, rigorous evaluation, and production deployment."
              align="left"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "1.5rem", boxShadow: "var(--shadow-card)", transition: "box-shadow 0.2s, transform 0.2s" }}
                className="hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "var(--color-bg-tag)", color: "var(--color-hero)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.65 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How It Works ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem, 6vw, 5rem)", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
                How it works
              </p>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "2.5rem" }}>
                From raw data to live prediction API
              </h2>

              {STEPS.map((step, i) => (
                <ProcessStep
                  key={i}
                  number={i + 1}
                  title={step.title}
                  description={step.description}
                  isLast={i === STEPS.length - 1}
                />
              ))}
            </div>

            <div>
              <div style={{ borderRadius: "16px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "2rem", boxShadow: "var(--shadow-card)" }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-text-primary)", fontFamily: "var(--font-body)", marginBottom: "1.25rem" }}>
                  What you get
                </p>
                {DELIVERABLES.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: "1px solid var(--color-border)" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "var(--color-bg-tag)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: "0.9375rem", color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}>{d}</span>
                  </div>
                ))}
                <div style={{ marginTop: "1.75rem" }}>
                  <CTAButton label="Get a Free Quote" href="/contact" variant="filled" size="md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Tech Stack ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "2.5rem" }}>
            <SectionHeader
              label="Tech stack"
              title="Tools I use for ML Applications"
              description="Battle-tested ML tooling from experimentation through to containerised production deployment."
              align="left"
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
            {TECH.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Pricing ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
        <div className="section-wrapper">
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <SectionHeader
              label="Pricing"
              title="Transparent, fixed-price plans"
              description="Scoped per project — not per hour. Every plan includes full code ownership."
              align="center"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.25rem", alignItems: "stretch" }}>
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                style={{
                  borderRadius: "16px",
                  border: plan.highlight ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                  backgroundColor: plan.highlight ? "var(--color-hero)" : "#fff",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: plan.highlight ? "0 8px 32px rgba(24,61,48,0.18)" : "var(--shadow-card)",
                  position: "relative",
                }}
              >
                {plan.highlight && (
                  <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", padding: "3px 14px", borderRadius: "999px", backgroundColor: "var(--color-accent)", fontSize: "0.75rem", fontWeight: 700, color: "#fff", fontFamily: "var(--font-body)", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: plan.highlight ? "var(--color-accent)" : "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
                  {plan.name}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.875rem", fontWeight: 700, color: plan.highlight ? "#fff" : "var(--color-text-primary)", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
                  {plan.price}
                </p>
                <p style={{ fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "1.5rem", lineHeight: 1.55 }}>
                  {plan.description}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                      <span style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: plan.highlight ? "rgba(62,189,122,0.18)" : "var(--color-bg-tag)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.65rem", fontWeight: 700, marginTop: "2px" }}>✓</span>
                      <span style={{ fontSize: "0.875rem", color: plan.highlight ? "rgba(255,255,255,0.8)" : "var(--color-text-primary)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>{feat}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton label={plan.cta} href="/contact" variant={plan.highlight ? "filled" : "ghost"} size="md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA Banner ── */}
      <section style={{ backgroundColor: "var(--color-hero)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(62,189,122,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="section-wrapper" style={{ position: "relative", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "#fff", marginBottom: "1rem" }}>
            Ready to get started?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto", marginBottom: "2.25rem", lineHeight: 1.7 }}>
            Share your dataset and business problem — I&apos;ll respond with a clear scope and timeline within 24 hours.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton label="Get a Free Quote" href="/contact" variant="filled" size="lg" />
            <CTAButton label="Book a Discovery Call" href="/book" variant="white" size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
