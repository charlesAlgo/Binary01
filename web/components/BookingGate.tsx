"use client";

import { useState, useRef } from "react";
import CalEmbed from "@/components/CalEmbed";

type Step = "email" | "checking" | "blocked" | "ready";

export default function BookingGate({ calLink }: { calLink: string }) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email.");
      return;
    }
    setError("");
    setStep("checking");

    try {
      const res = await fetch("/api/book/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        setStep("ready");
        return;
      }

      const data = await res.json().catch(() => ({}));
      const msg =
        typeof data?.error === "string"
          ? data.error
          : res.status === 429
          ? "Too many attempts. Please wait a few minutes and try again."
          : "Something went wrong. Please try again.";

      setError(msg);
      setStep("email");
      setTimeout(() => inputRef.current?.focus(), 50);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStep("email");
    }
  }

  if (step === "ready") {
    return (
      <div>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-secondary)",
            fontFamily: "var(--font-body)",
            marginBottom: "1rem",
            padding: "10px 14px",
            borderRadius: "8px",
            backgroundColor: "var(--color-bg-secondary, #F0F7FF)",
            border: "1px solid var(--color-border)",
          }}
        >
          Booking as <strong>{email}</strong>
        </p>
        <CalEmbed calLink={calLink} prefillEmail={email} />
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-primary)",
        padding: "2rem",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          color: "var(--color-hero)",
          fontFamily: "var(--font-body)",
          marginBottom: "0.75rem",
        }}
      >
        Enter your email to continue
      </p>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-body)",
          marginBottom: "1.5rem",
          lineHeight: 1.6,
        }}
      >
        We limit one active booking per email to keep slots available for everyone.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label
          htmlFor="booking-email"
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-body)",
            marginBottom: "0.5rem",
          }}
        >
          Email address
        </label>
        <input
          ref={inputRef}
          id="booking-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={step === "checking"}
          placeholder="you@company.com"
          style={{
            width: "100%",
            padding: "0.625rem 0.875rem",
            borderRadius: "8px",
            border: `1.5px solid ${error ? "#EF4444" : "var(--color-border)"}`,
            fontSize: "0.9375rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-text-primary)",
            backgroundColor: "#fff",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent, #3EBD7A)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = error
              ? "#EF4444"
              : "var(--color-border)")
          }
        />

        {error && (
          <p
            role="alert"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              color: "#EF4444",
              fontFamily: "var(--font-body)",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={step === "checking"}
          style={{
            marginTop: "1.25rem",
            width: "100%",
            padding: "0.75rem 1.25rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor:
              step === "checking" ? "#9CA3AF" : "var(--color-accent, #3EBD7A)",
            color: "#fff",
            fontSize: "0.9375rem",
            fontWeight: 600,
            fontFamily: "var(--font-body)",
            cursor: step === "checking" ? "not-allowed" : "pointer",
            transition: "background-color 0.15s",
          }}
        >
          {step === "checking" ? "Checking…" : "Continue to booking →"}
        </button>
      </form>
    </div>
  );
}
