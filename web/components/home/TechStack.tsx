import TechBadge from "@/components/TechBadge";

const STACK = [
  { category: "Data & Analytics", tools: ["Python", "Pandas", "SQL", "Power BI", "Tableau", "dbt"] },
  { category: "Machine Learning",  tools: ["scikit-learn", "XGBoost", "PyTorch", "MLflow", "FastAPI"] },
  { category: "AI & LLMs",        tools: ["LangChain", "OpenAI API", "Anthropic API", "ChromaDB", "Pinecone"] },
  { category: "Infrastructure",   tools: ["Next.js", "Supabase", "PostgreSQL", "Docker", "Vercel"] },
];

export default function TechStack() {
  return (
    <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(4rem, 8vw, 6rem)" }}>
      <div className="section-wrapper">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "0.5rem" }}>
            Tools & technologies
          </p>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", margin: "0 0 0.75rem" }}>
            Tech stack I work with
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", maxWidth: "44ch", marginInline: "auto" }}>
            Production-grade tools across every layer — from raw data to deployed application.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          {STACK.map((group) => (
            <div key={group.category} style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "#fff", padding: "1.5rem", boxShadow: "var(--shadow-card)" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "1rem" }}>
                {group.category}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {group.tools.map((t) => <TechBadge key={t} label={t} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
