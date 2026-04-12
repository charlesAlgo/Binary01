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
      className="group flex flex-col gap-4 no-underline transition-all duration-250"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 12px 40px rgba(0,136,219,0.15)";
        el.style.borderColor = "rgba(0,136,219,0.2)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "";
        el.style.borderColor = "rgba(255,255,255,0.06)";
      }}
    >
      {/* Top accent bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, var(--color-accent), var(--color-accent-teal))" }} />

      {/* Icon */}
      <div style={{ width: "44px", height: "44px", borderRadius: "8px", background: "var(--color-accent-subtle)", border: "1px solid rgba(0,136,219,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-accent)" }}>
        {icon}
      </div>

      <div>
        {count && (
          <p style={{ fontSize: "0.78rem", color: "var(--color-accent-hover)", fontFamily: "var(--font-body)", margin: "0 0 4px", fontWeight: 600 }}>
            {count}
          </p>
        )}
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.0625rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "none" }}>
          {description}
        </p>
      </div>

      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "4px", fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>
        Learn more
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
