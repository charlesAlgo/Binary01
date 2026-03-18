"use client";

import { useState, useRef } from "react";
import CalEmbed from "@/components/CalEmbed";

type Step = "email" | "checking-email" | "ready";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 0.875rem",
  borderRadius: "8px",
  border: "1.5px solid var(--color-border)",
  fontSize: "0.9375rem",
  fontFamily: "var(--font-body)",
  color: "var(--color-text-primary)",
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

export default function BookingGate({ calLink }: { calLink: string }) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setEmailError("Please enter your email."); return; }
    setEmailError("");
    setStep("checking-email");

    try {
      const res = await fetch("/api/book/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) { setStep("ready"); return; }

      const data = await res.json().catch(() => ({}));
      const msg =
        typeof data?.error === "string"
          ? data.error
          : res.status === 429
          ? "Too many attempts. Please wait a few minutes and try again."
          : "Something went wrong. Please try again.";

      setEmailError(msg);
      setStep("email");
      setTimeout(() => emailRef.current?.focus(), 50);
    } catch {
      setEmailError("Network error. Please check your connection and try again.");
      setStep("email");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ─── Email gate ─────────────────────────────────────────── */}
      {(step === "email" || step === "checking-email") && (
        <div style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "1.75rem", boxShadow: "var(--shadow-card)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "0.375rem" }}>
            Quick check
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            One active booking per email keeps slots open for everyone.
          </p>

          <form onSubmit={handleEmailSubmit} noValidate style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <input
                ref={emailRef}
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={step === "checking-email"}
                placeholder="you@company.com"
                aria-label="Email address"
                style={{ ...inputStyle, borderColor: emailError ? "#EF4444" : "var(--color-border)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3EBD7A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = emailError ? "#EF4444" : "var(--color-border)")}
              />
              {emailError && (
                <p role="alert" style={{ fontSize: "0.8125rem", color: "#EF4444", fontFamily: "var(--font-body)", margin: 0 }}>
                  {emailError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={step === "checking-email"}
              style={{ flexShrink: 0, padding: "0.65rem 1.25rem", borderRadius: "8px", border: "none", backgroundColor: step === "checking-email" ? "#9CA3AF" : "#3EBD7A", color: "#fff", fontSize: "0.9375rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: step === "checking-email" ? "not-allowed" : "pointer", transition: "background-color 0.15s", whiteSpace: "nowrap" }}
            >
              {step === "checking-email" ? "Checking…" : "Continue →"}
            </button>
          </form>
        </div>
      )}

      {/* ─── Cal.com embed (always mounted so it pre-loads) ────── */}
      <div style={{ position: "relative" }}>
        {/* Blur overlay — hidden once email is verified */}
        {step !== "ready" && (
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, zIndex: 10, borderRadius: "14px", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", backgroundColor: "rgba(255,255,255,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "not-allowed", pointerEvents: "all" }}
          >
            <span style={{ fontSize: "1.75rem" }}>🔒</span>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-body)", margin: 0, textAlign: "center", padding: "0 1rem" }}>
              Enter your email above to unlock the calendar
            </p>
          </div>
        )}
        <CalEmbed calLink={calLink} />
      </div>
    </div>
  );
}
