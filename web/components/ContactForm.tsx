"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "var(--color-text-secondary)",
  fontFamily: "var(--font-body)",
  marginBottom: "6px",
};

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  padding: "11px 14px",
  fontSize: "0.9375rem",
  fontFamily: "var(--font-body)",
  fontWeight: 400,
  color: "#f0f4f8",
  backgroundColor: "var(--color-surface)",
  outline: "none",
  transition: "border-color 0.15s",
  colorScheme: "dark",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function getBorderStyle(field: string): React.CSSProperties {
    return {
      ...inputBaseStyle,
      borderColor: focused === field ? "var(--color-accent)" : "var(--color-border)",
      boxShadow: focused === field ? "0 0 0 3px rgba(62,189,122,0.10)" : "none",
    };
  }

  if (submitted) {
    return (
      <div
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(62,189,122,0.3)",
          backgroundColor: "var(--color-bg-tag)",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✅</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 0.625rem" }}>
          Thanks! I&apos;ll be in touch within 24 hours.
        </h3>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 auto", maxWidth: "44ch", lineHeight: 1.7 }}>
          I&apos;ve received your brief. Expect a detailed response with scope, timeline, and a fixed-price quote in your inbox shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" style={labelStyle}>Name <span style={{ color: "var(--color-accent)" }}>*</span></label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={getBorderStyle("name")}
          />
        </div>
        <div>
          <label htmlFor="email" style={labelStyle}>Email <span style={{ color: "var(--color-accent)" }}>*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={getBorderStyle("email")}
          />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" style={labelStyle}>Company <span style={{ color: "var(--color-text-secondary)", fontWeight: 400 }}>(optional)</span></label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Your company name"
          value={form.company}
          onChange={handleChange}
          onFocus={() => setFocused("company")}
          onBlur={() => setFocused(null)}
          style={getBorderStyle("company")}
        />
      </div>

      {/* Service needed */}
      <div>
        <label htmlFor="service" style={labelStyle}>Service needed <span style={{ color: "var(--color-accent)" }}>*</span></label>
        <select
          id="service"
          name="service"
          required
          value={form.service}
          onChange={handleChange}
          onFocus={() => setFocused("service")}
          onBlur={() => setFocused(null)}
          style={{ ...getBorderStyle("service"), cursor: "pointer" }}
        >
          <option value="">Select a service…</option>
          <option value="data-analysis">Data Analysis</option>
          <option value="augmented-analytics">Augmented Analytics</option>
          <option value="ml-applications">ML Application</option>
          <option value="llm-bots">LLM Bot</option>
          <option value="other">Not sure</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" style={labelStyle}>Project description <span style={{ color: "var(--color-accent)" }}>*</span></label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          placeholder="Tell me about your project, data sources, and the outcome you&apos;re looking for…"
          value={form.description}
          onChange={handleChange}
          onFocus={() => setFocused("description")}
          onBlur={() => setFocused(null)}
          style={{ ...getBorderStyle("description"), resize: "vertical", minHeight: "110px" }}
        />
      </div>

      {/* Budget + Timeline row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" style={labelStyle}>Budget range <span style={{ color: "var(--color-accent)" }}>*</span></label>
          <select
            id="budget"
            name="budget"
            required
            value={form.budget}
            onChange={handleChange}
            onFocus={() => setFocused("budget")}
            onBlur={() => setFocused(null)}
            style={{ ...getBorderStyle("budget"), cursor: "pointer" }}
          >
            <option value="">Select budget…</option>
            <option value="under-500">Under $500</option>
            <option value="500-1500">$500 – $1,500</option>
            <option value="1500-5000">$1,500 – $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline" style={labelStyle}>Timeline <span style={{ color: "var(--color-accent)" }}>*</span></label>
          <select
            id="timeline"
            name="timeline"
            required
            value={form.timeline}
            onChange={handleChange}
            onFocus={() => setFocused("timeline")}
            onBlur={() => setFocused(null)}
            style={{ ...getBorderStyle("timeline"), cursor: "pointer" }}
          >
            <option value="">Select timeline…</option>
            <option value="asap">ASAP</option>
            <option value="1-month">1 month</option>
            <option value="2-3-months">2–3 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div style={{ padding: "10px 14px", borderRadius: "10px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", fontSize: "0.875rem", fontFamily: "var(--font-body)" }}>
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "13px 24px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: loading ? "var(--color-accent-hover)" : "var(--color-accent)",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.8 : 1,
          transition: "background-color 0.2s, transform 0.15s",
          marginTop: "0.25rem",
        }}
        className={loading ? "" : "hover:bg-[var(--color-accent-hover)] hover:-translate-y-px"}
      >
        {loading ? "Sending…" : "Send My Brief"}
      </button>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0, textAlign: "center" }}>
        No spam. No cold follow-ups. Just a focused quote within 24 hours.
      </p>
    </form>
  );
}
