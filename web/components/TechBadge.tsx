import { ReactNode } from "react";

interface TechBadgeProps {
  label: string;
  icon?: ReactNode;
}

export default function TechBadge({ label, icon }: TechBadgeProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 10px", borderRadius: "6px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)", fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
      {icon && <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>{icon}</span>}
      {label}
    </span>
  );
}
