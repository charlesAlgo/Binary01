import Link from "next/link";

const SERVICES = [
  { label: "Data Analysis", href: "/services/data-analysis" },
  { label: "Augmented Analytics", href: "/services/augmented-analytics" },
  { label: "ML Applications", href: "/services/ml-applications" },
  { label: "LLM Bots", href: "/services/llm-bots" },
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Book a Call", href: "/book" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/charlesshalua",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/charlesshalua",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Upwork",
    href: "https://upwork.com/freelancers/charlesshalua",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-border-default"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div className="section-wrapper py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block font-bold text-xl tracking-tight text-text-primary hover:text-accent-blue transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Charles<span className="text-accent-blue">.</span>
            </Link>
            <p
              className="mt-3 text-sm leading-relaxed text-text-secondary max-w-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              AI-powered data &amp; ML solutions for businesses that want real
              results — not slide decks.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default bg-white text-text-secondary transition-all duration-200 hover:border-accent-blue hover:text-accent-blue hover:shadow-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-primary"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Services
            </p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-primary"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-primary"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Get in Touch
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@charlesshalua.com"
                  className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  hello@charlesshalua.com
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-sm text-text-secondary hover:text-accent-blue transition-colors"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Book a Discovery Call
                </Link>
              </li>
            </ul>
            <div className="mt-5">
              <span
                className="inline-flex items-center gap-1.5 rounded-full border border-border-default bg-white px-3 py-1 text-xs font-medium text-text-secondary"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                Available for projects
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border-default pt-6 sm:flex-row">
          <p
            className="text-xs text-text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} Charles Shalua. All rights reserved.
          </p>
          <p
            className="text-xs text-text-secondary"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
