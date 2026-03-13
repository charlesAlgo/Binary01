interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  titleAction?: React.ReactNode;
}

export default function SectionHeader({ label, title, description, align = "center", titleAction }: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div style={{ maxWidth: "600px", marginInline: centered ? "auto" : undefined, textAlign: centered ? "center" : "left" }}>
      {label && (
        <p style={{ marginBottom: "0.625rem", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 10px" }}>
          {label}
        </p>
      )}
      <div style={{ display: "flex", alignItems: centered ? "center" : "flex-start", justifyContent: centered ? "center" : "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: 0 }}>
          {title}
        </h2>
        {titleAction}
      </div>
      {description && (
        <p style={{ marginTop: "0.75rem", fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginInline: centered ? "auto" : undefined, maxWidth: "52ch" }}>
          {description}
        </p>
      )}
    </div>
  );
}
