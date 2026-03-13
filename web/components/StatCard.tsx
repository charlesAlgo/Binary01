interface StatCardProps {
  number: string;
  label: string;
  sublabel?: string;
}

export default function StatCard({ number, label, sublabel }: StatCardProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "2rem 1.5rem", borderRadius: "12px", border: "1px solid var(--color-border)", backgroundColor: "#fff", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-hero)", lineHeight: 1 }}>
        {number}
      </span>
      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-body)" }}>
        {label}
      </span>
      {sublabel && (
        <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
          {sublabel}
        </span>
      )}
    </div>
  );
}
