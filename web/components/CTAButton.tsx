import Link from "next/link";

interface CTAButtonProps {
  label: string;
  href: string;
  variant?: "filled" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  external?: boolean;
}

const sizeClass = {
  sm: "px-4 py-1.5 text-[0.8125rem]",
  md: "px-[22px] py-2.5 text-sm",
  lg: "px-7 py-[13px] text-base",
};

const variantClass = {
  filled: "bg-[var(--color-accent)] text-white border-2 border-transparent hover:bg-[var(--color-accent-hover)] hover:-translate-y-px hover:shadow-[0_8px_30px_var(--color-accent-glow)]",
  ghost:  "bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-light)] hover:bg-[var(--color-accent-subtle)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-px",
  white:  "bg-white text-[#09090b] border-2 border-transparent hover:bg-[#f0f4f8] hover:-translate-y-px",
};

export default function CTAButton({ label, href, variant = "filled", size = "md", external = false }: CTAButtonProps) {
  const className = `inline-flex items-center justify-center gap-1.5 rounded-[980px] font-semibold transition-all duration-200 no-underline ${sizeClass[size]} ${variantClass[variant]}`;
  const style = { fontFamily: "var(--font-body)" };

  const arrow = external && (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H6.5M11.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {label}{arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {label}
    </Link>
  );
}
