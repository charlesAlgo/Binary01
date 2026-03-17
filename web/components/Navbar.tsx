"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Data Analysis":       "Dashboards, pipelines & automated reports",
  "Augmented Analytics": "AI-powered insights on top of your BI",
  "ML Applications":     "Prediction & classification models, deployed",
  "LLM Bots":            "RAG pipelines, chatbots & LLM integrations",
};

const NAV_LINKS = [
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Data Analysis",        href: "/services/data-analysis" },
      { label: "Augmented Analytics",  href: "/services/augmented-analytics" },
      { label: "ML Applications",      href: "/services/ml-applications" },
      { label: "LLM Bots",             href: "/services/llm-bots" },
    ],
  },
  { label: "Portfolio",   href: "/portfolio" },
  { label: "About",       href: "/about" },
  { label: "Book a Call", href: "/book" },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimeout                    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleServicesEnter() {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServicesOpen(true);
  }

  function handleServicesLeave() {
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: scrolled ? "rgba(24,61,48,0.97)" : "var(--color-hero)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border-hero)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div className="section-wrapper" style={{ display: "flex", height: "68px", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
            Data<span style={{ color: "var(--color-accent)" }}>Life</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="hidden md:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              /* Whole wrapper handles hover — no gap-triggered close */
              <div
                key={link.label}
                style={{ position: "relative" }}
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "8px 14px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: servicesOpen ? "#fff" : "var(--color-text-hero-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "8px",
                    fontFamily: "var(--font-body)",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 12 12"
                    fill="none"
                    style={{ transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown — always in DOM, toggled via opacity + pointer-events */}
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    width: "280px",
                    borderRadius: "14px",
                    border: "1px solid rgba(62,189,122,0.20)",
                    backgroundColor: "#183D30",
                    padding: "8px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)",
                    opacity: servicesOpen ? 1 : 0,
                    transform: servicesOpen ? "translateY(0)" : "translateY(-8px)",
                    pointerEvents: servicesOpen ? "auto" : "none",
                    transition: "opacity 0.18s ease, transform 0.18s ease",
                  }}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(62,189,122,0.10)")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      {/* Icon dot */}
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "7px",
                          backgroundColor: "rgba(62,189,122,0.15)",
                          border: "1px solid rgba(62,189,122,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#3EBD7A" }} />
                      </div>

                      {/* Text */}
                      <div>
                        <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 600, color: "#fff", fontFamily: "var(--font-body)", lineHeight: 1.3 }}>
                          {child.label}
                        </p>
                        <p style={{ margin: "2px 0 0", fontSize: "0.775rem", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
                          {SERVICE_DESCRIPTIONS[child.label]}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "8px 14px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--color-text-hero-muted)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-text-hero-muted)")}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 20px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "var(--color-accent)",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              transition: "background-color 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-accent-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-accent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get a Quote
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                height: "2px",
                width: "22px",
                backgroundColor: "#fff",
                borderRadius: "2px",
                transition: "all 0.2s",
                transform:
                  i === 0 && menuOpen ? "translateY(7px) rotate(45deg)"
                  : i === 2 && menuOpen ? "translateY(-7px) rotate(-45deg)"
                  : "none",
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ borderTop: "1px solid var(--color-border-hero)", backgroundColor: "var(--color-hero)", padding: "12px 20px 20px" }}>
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p style={{ padding: "10px 8px 4px", fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-text-hero-muted)", fontFamily: "var(--font-body)" }}>
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link key={child.href} href={child.href} onClick={() => setMenuOpen(false)}
                    style={{ display: "block", padding: "9px 12px", fontSize: "0.875rem", color: "rgba(255,255,255,0.75)", textDecoration: "none", borderRadius: "8px", fontFamily: "var(--font-body)" }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 12px", fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.75)", textDecoration: "none", borderRadius: "8px", fontFamily: "var(--font-body)" }}
              >
                {link.label}
              </Link>
            )
          )}
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--color-border-hero)" }}>
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              style={{ display: "block", textAlign: "center", padding: "11px", fontSize: "0.875rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
