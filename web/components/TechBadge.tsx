import { ReactNode } from "react";

interface TechBadgeProps {
  label: string;
  icon?: ReactNode;
}

export default function TechBadge({ label, icon }: TechBadgeProps) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 10px", borderRadius: "6px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-tag)", fontSize: "0.8125rem", color: "var(--color-text-primary)", fontFamily: "var(--font-mono)" }}>
      {icon && <span style={{ color: "var(--color-hero)", flexShrink: 0 }}>{icon}</span>}
      {label}
    </span>
  );
}
