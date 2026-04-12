"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Services",   href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Products",   href: "/products" },
  { label: "Work",       href: "/work" },
  { label: "Reviews",    href: "/reviews" },
  { label: "Writing",    href: "/writing" },
  { label: "About",      href: "/about" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [theme,     setTheme]     = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as "dark" | "light") ?? "dark";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(9,9,11,0.80)",
        backdropFilter: "blur(20px) saturate(1.5)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        transition: "border-color 0.3s ease",
      }}
    >
      <div
        className="section-wrapper"
        style={{ display: "flex", height: "64px", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
      >

        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
            Data<span style={{ color: "var(--color-accent)" }}>Life</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav
          className="hidden lg:flex items-center"
          style={{ gap: "0.125rem", flex: 1, justifyContent: "center" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 12px",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                borderRadius: "6px",
                fontFamily: "var(--font-body)",
                transition: "color 0.15s, background 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop right: theme toggle + CTAs ── */}
        <div
          className="hidden lg:flex items-center"
          style={{ gap: "8px", flexShrink: 0 }}
        >
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.10)",
              cursor: "pointer",
              color: "rgba(255,255,255,0.75)",
              transition: "background 0.15s, color 0.15s",
              flexShrink: 0,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
            }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Ghost — Book a Call */}
          <Link
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 16px",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              backgroundColor: "transparent",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: "8px",
              textDecoration: "none",
              fontFamily: "var(--font-body)",
              transition: "border-color 0.2s, color 0.2s, background-color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,136,219,0.60)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = "rgba(0,136,219,0.08)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Book a Call
          </Link>

          {/* Filled — Get a Quote */}
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "7px 18px",
              fontSize: "0.8125rem",
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

        {/* ── Mobile right: theme + hamburger ── */}
        <div className="lg:hidden" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "32px", height: "32px", borderRadius: "6px",
              background: "rgba(255,255,255,0.06)", border: "none",
              cursor: "pointer", color: "rgba(255,255,255,0.75)",
            }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "6px", background: "none", border: "none",
              cursor: "pointer", color: "#fff",
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backgroundColor: "rgba(9,9,11,0.97)",
            backdropFilter: "blur(20px)",
            padding: "12px 20px 24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "16px" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 10px",
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.80)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontFamily: "var(--font-body)",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0,136,219,0.08)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.80)";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "12px", fontSize: "0.9rem", fontWeight: 500,
                color: "rgba(255,255,255,0.85)", backgroundColor: "transparent",
                border: "1px solid rgba(255,255,255,0.22)", borderRadius: "8px",
                textDecoration: "none", fontFamily: "var(--font-body)",
              }}
            >
              Book a Call
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block", textAlign: "center", padding: "12px",
                fontSize: "0.9rem", fontWeight: 600, color: "#fff",
                backgroundColor: "var(--color-accent)", borderRadius: "8px",
                textDecoration: "none", fontFamily: "var(--font-body)",
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
