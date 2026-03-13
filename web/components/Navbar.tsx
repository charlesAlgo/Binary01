"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Data Analysis", href: "/services/data-analysis" },
      { label: "Augmented Analytics", href: "/services/augmented-analytics" },
      { label: "ML Applications", href: "/services/ml-applications" },
      { label: "LLM Bots", href: "/services/llm-bots" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Book a Call", href: "/book" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[var(--shadow-nav)]"
          : "bg-transparent"
      }`}
    >
      <div className="section-wrapper flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-text-primary hover:text-accent-blue transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Charles<span className="text-accent-blue">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-bg-tertiary"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M2 4L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {servicesOpen && (
                  <div
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-border-default bg-white p-1.5 shadow-[var(--shadow-card-hover)]"
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-bg-tertiary"
                style={{ fontFamily: "var(--font-body)" }}
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
            className="inline-flex items-center gap-2 rounded-lg bg-accent-blue px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:-translate-y-px hover:shadow-md"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-bg-tertiary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-text-primary transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border-default bg-white/95 backdrop-blur-md px-4 pb-4 pt-2">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label}>
                <p
                  className="px-2 pt-3 pb-1 text-xs font-semibold uppercase tracking-widest text-text-secondary"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {link.label}
                </p>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-bg-secondary hover:text-text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="mt-3 pt-3 border-t border-border-default">
            <Link
              href="/contact"
              className="block w-full rounded-lg bg-accent-blue px-4 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
