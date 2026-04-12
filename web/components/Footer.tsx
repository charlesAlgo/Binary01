import Link from "next/link";

const SERVICES = [
  { label: "Data Analysis",       href: "/services/data-analysis" },
  { label: "Augmented Analytics", href: "/services/augmented-analytics" },
  { label: "ML Applications",     href: "/services/ml-applications" },
  { label: "LLM Bots",            href: "/services/llm-bots" },
];

const COMPANY = [
  { label: "About",       href: "/about" },
  { label: "Portfolio",   href: "/portfolio" },
  { label: "Book a Call", href: "/book" },
  { label: "Contact",     href: "/contact" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/charlesshalua",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: "GitHub",
    href: "https://github.com/charlesAlgo",
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-primary)] text-white" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="section-wrapper py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block no-underline" style={{ lineHeight: 1.2 }}>
              <span className="block text-xl font-extrabold text-white" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
                Data<span className="text-[var(--color-accent)]">Life</span>
              </span>
              <span className="block text-[0.6rem] font-medium text-[rgba(255,255,255,0.38)] uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-body)" }}>
                by Charles Shalua · Founder &amp; Co-Engineer
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[rgba(255,255,255,0.50)] max-w-[26ch]" style={{ fontFamily: "var(--font-body)" }}>
              AI-powered data &amp; ML solutions — real results, not slide decks. Est. 2023.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)] no-underline transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[rgba(255,255,255,0.35)]" style={{ fontFamily: "var(--font-body)" }}>
              Services
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-[rgba(255,255,255,0.6)] no-underline transition-colors hover:text-white" style={{ fontFamily: "var(--font-body)" }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[rgba(255,255,255,0.35)]" style={{ fontFamily: "var(--font-body)" }}>
              Company
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-sm text-[rgba(255,255,255,0.6)] no-underline transition-colors hover:text-white" style={{ fontFamily: "var(--font-body)" }}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-[rgba(255,255,255,0.35)]" style={{ fontFamily: "var(--font-body)" }}>
              Get in Touch
            </p>
            <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
              <li>
                <a href="mailto:charlesshalua01@gmail.com" className="text-sm text-[rgba(255,255,255,0.6)] no-underline transition-colors hover:text-white" style={{ fontFamily: "var(--font-body)" }}>
                  charlesshalua01@gmail.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[rgba(255,255,255,0.6)] no-underline transition-colors hover:text-white" style={{ fontFamily: "var(--font-body)" }}>
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-sm text-[rgba(255,255,255,0.6)] no-underline transition-colors hover:text-white" style={{ fontFamily: "var(--font-body)" }}>
                  Book a Discovery Call
                </Link>
              </li>
            </ul>
            <div className="mt-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(255,255,255,0.1)] px-3 py-1 text-xs text-[rgba(255,255,255,0.55)]" style={{ fontFamily: "var(--font-body)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                Available for projects
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-[rgba(255,255,255,0.08)] pt-6">
          <p className="text-xs text-[rgba(255,255,255,0.3)] m-0" style={{ fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} DataLife · Charles Shalua, Founder &amp; Co-Engineer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
