import Link from "next/link";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  count?: string;
}

export default function ServiceCard({ icon, title, description, href, count }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-white p-6 no-underline shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[var(--color-bg-tag)] text-[var(--color-hero)]">
        {icon}
      </div>

      <div>
        {count && (
          <p className="mb-1 text-xs text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-body)", margin: "0 0 4px" }}>
            {count}
          </p>
        )}
        <h3 className="mb-1.5 text-[1.0625rem] font-semibold tracking-tight text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-display)", margin: "0 0 6px" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-body)", margin: 0, maxWidth: "none" }}>
          {description}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-1 text-[0.8125rem] font-semibold text-[var(--color-accent)]" style={{ fontFamily: "var(--font-body)" }}>
        Learn more
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
