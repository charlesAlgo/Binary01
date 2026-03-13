interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function ProcessStep({ number, title, description, isLast = false }: ProcessStepProps) {
  return (
    <div style={{ display: "flex", gap: "1.25rem" }}>
      {/* Number + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40px", width: "40px", flexShrink: 0, borderRadius: "50%", backgroundColor: "var(--color-hero)", color: "#fff", fontSize: "0.875rem", fontWeight: 700, fontFamily: "var(--font-display)" }}>
          {number}
        </div>
        {!isLast && (
          <div style={{ marginTop: "6px", flexGrow: 1, width: "2px", background: "repeating-linear-gradient(to bottom, var(--color-border) 0, var(--color-border) 5px, transparent 5px, transparent 9px)", minHeight: "2rem" }} />
        )}
      </div>

      {/* Text */}
      <div style={{ paddingBottom: isLast ? 0 : "2rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 6px", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, maxWidth: "none" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
