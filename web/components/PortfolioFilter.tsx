"use client";

import { useState } from "react";
import Link from "next/link";

export interface Project {
  slug: string;
  tag: string;
  title: string;
  client: string;
  metric: string;
  accent: string;
  bg: string;
}

const FILTERS = [
  "All",
  "Data Analysis",
  "ML Application",
  "LLM Bot",
  "Augmented Analytics",
] as const;

type Filter = (typeof FILTERS)[number];

interface PortfolioFilterProps {
  projects: Project[];
}

export default function PortfolioFilter({ projects }: PortfolioFilterProps) {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.tag === active);

  return (
    <>
      {/* Filter pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "2.5rem",
        }}
        role="group"
        aria-label="Filter case studies by category"
      >
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              aria-pressed={isActive}
              style={{
                padding: "7px 18px",
                borderRadius: "999px",
                border: isActive
                  ? "1.5px solid var(--color-accent)"
                  : "1.5px solid var(--color-border)",
                backgroundColor: isActive ? "var(--color-bg-tag)" : "#fff",
                color: isActive
                  ? "var(--color-accent)"
                  : "var(--color-text-secondary)",
                fontSize: "0.875rem",
                fontWeight: isActive ? 600 : 400,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "1.5rem",
        }}
      >
        {filtered.map((project) => (
          <article
            key={project.slug}
            style={{
              borderRadius: "16px",
              border: "1px solid var(--color-border)",
              backgroundColor: "#fff",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              transition: "box-shadow 0.2s, transform 0.2s",
              display: "flex",
              flexDirection: "column",
            }}
            className="hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
          >
            {/* Coloured top area */}
            <div
              style={{
                backgroundColor: project.bg,
                padding: "1.75rem 1.75rem 1.5rem",
                borderBottom: "1px solid var(--color-border)",
                position: "relative",
              }}
            >
              {/* Tag badge */}
              <span
                style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-body)",
                  backgroundColor: project.accent + "18",
                  color: project.accent,
                  border: `1px solid ${project.accent}30`,
                  marginBottom: "1rem",
                }}
              >
                {project.tag}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.0625rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  margin: "0 0 0.375rem",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </h3>

              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                }}
              >
                {project.client}
              </p>
            </div>

            {/* Card body */}
            <div
              style={{
                padding: "1.25rem 1.75rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                gap: "1rem",
              }}
            >
              {/* Metric */}
              <p
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                  lineHeight: 1.45,
                }}
              >
                {project.metric}
              </p>

              {/* Link */}
              <Link
                href={`/portfolio/${project.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                  marginTop: "auto",
                  transition: "color 0.15s",
                }}
                className="hover:text-[var(--color-accent)]"
              >
                View Case Study
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  style={{ transition: "transform 0.15s" }}
                >
                  <path
                    d="M2 7H12M12 7L8 3M12 7L8 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-body)",
            padding: "3rem 0",
          }}
        >
          No case studies found for this filter.
        </p>
      )}
    </>
  );
}
