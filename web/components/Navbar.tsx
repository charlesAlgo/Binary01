"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

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
  { label: "Portfolio", href: "/portfolio" },
  { label: "About",     href: "/about" },
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
      <div
        className="section-wrapper"
        style={{ display: "flex", height: "68px", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
      >

        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
            Data<span style={{ color: "var(--color-accent)" }}>Life</span>
          </span>
        </Link>

        {/* ── Desktop Nav (centre) — NO inline display, Tailwind controls visibility ── */}
        <nav
          className="hidden lg:flex items-center"
          style={{ gap: "0.25rem", flex: 1, justifyContent: "center" }}
        >
          {NAV_LINKS.map((link) =>
            link.children ? (
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
                    padding: "8px 16px",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: servicesOpen ? "#fff" : "rgba(255,255,255,0.70)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "8px",
                    fontFamily: "var(--font-body)",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {link.label}
                  <svg
                    width="11" height="11" viewBox="0 0 12 12" fill="none"
                    style={{ transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
                  >
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: servicesOpen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-8px)",
                    width: "290px",
                    borderRadius: "14px",
                    border: "1px solid rgba(62,189,122,0.20)",
                    backgroundColor: "#183D30",
                    padding: "8px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2)",
                    opacity: servicesOpen ? 1 : 0,
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
                      onClick={() => setServicesOpen(false)}
                    >
                      <div
                        style={{
                          width: "28px", height: "28px", borderRadius: "7px",
                          backgroundColor: "rgba(62,189,122,0.15)",
                          border: "1px solid rgba(62,189,122,0.25)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: "1px",
                        }}
                      >
                        <div style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#3EBD7A" }} />
                      </div>
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
                  padding: "8px 16px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.70)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* ── Desktop CTAs — NO inline display, Tailwind controls visibility ── */}
        <div
          className="hidden lg:flex items-center"
          style={{ gap: "10px", flexShrink: 0 }}
        >
          {/* Ghost — Book a Call */}
          <Link
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.28)",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.2s, color 0.2s, background-color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(62,189,122,0.65)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = "rgba(62,189,122,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <rect x="1.5" y="3" width="13" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Book a Call
          </Link>

          {/* Filled — Get a Quote */}
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 20px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "var(--color-accent)",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              transition: "background-color 0.2s, transform 0.15s",
              whiteSpace: "nowrap",
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

        {/* ── Hamburger — shows on everything below lg ── */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile / Tablet Menu ── */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.10)",
            backgroundColor: "rgba(18,50,38,0.98)",
            backdropFilter: "blur(16px)",
            padding: "16px 20px 28px",
          }}
        >
          {/* Services group */}
          <div style={{ marginBottom: "4px" }}>
            <p style={{
              padding: "8px 10px 6px",
              margin: 0,
              fontSize: "0.68rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "var(--font-body)",
            }}>
              Services
            </p>
            {NAV_LINKS[0].children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 10px",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.80)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(62,189,122,0.08)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3EBD7A", flexShrink: 0 }} />
                {child.label}
              </Link>
            ))}
          </div>

          {/* Portfolio + About */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "8px", marginBottom: "4px" }}>
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href!}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 10px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.80)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="1.5" y="3" width="13" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Book a Call
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                padding: "13px",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#fff",
                backgroundColor: "var(--color-accent)",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "var(--font-body)",
              }}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
