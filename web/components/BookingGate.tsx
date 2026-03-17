"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CalEmbed from "@/components/CalEmbed";

type Step = "email" | "checking-email" | "form" | "ready";
type SlotsState = "idle" | "loading" | "done" | "error";

interface BookedSlot { start: string; end: string; }

// Generate every 30-min slot from 9 AM to 5 PM in the user's local timezone
function generateDaySlots(dateStr: string): Date[] {
  const slots: Date[] = [];
  for (let h = 9; h < 17; h++) {
    for (let m = 0; m < 60; m += 30) {
      const d = new Date(`${dateStr}T00:00:00`); // midnight local
      d.setHours(h, m, 0, 0);
      slots.push(d);
    }
  }
  return slots; // 16 slots: 9:00 AM … 4:30 PM
}

// A generated slot is booked if it overlaps any confirmed booking
function isSlotBooked(slot: Date, bookedSlots: BookedSlot[]): boolean {
  const slotMs    = slot.getTime();
  const slotEndMs = slotMs + 30 * 60 * 1000;
  return bookedSlots.some(({ start, end }) => {
    const bStart = new Date(start).getTime();
    const bEnd   = end ? new Date(end).getTime() : bStart + 30 * 60 * 1000;
    return slotMs < bEnd && slotEndMs > bStart;
  });
}

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

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-body)",
  marginBottom: "0.4rem",
};

// Format a UTC ISO string to a local time label, e.g. "9:00 AM"
function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Minimum bookable date = tomorrow (in local timezone, not UTC)
function localDateStr(d: Date): string {
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, "0");
  const dd   = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return localDateStr(d);
}
function maxDate() {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return localDateStr(d);
}

// Return true if a YYYY-MM-DD string falls on a weekend (local timezone)
function isWeekend(dateStr: string): boolean {
  const day = new Date(`${dateStr}T12:00:00`).getDay(); // noon avoids DST edge cases
  return day === 0 || day === 6;
}

export default function BookingGate({ calLink }: { calLink: string }) {
  // ── Step 1 state ──
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  // ── Step 2 state ──
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(""); // ISO string
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // ── Slots state ──
  const [slotsState, setSlotsState] = useState<SlotsState>("idle");
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [slotsError, setSlotsError] = useState("");

  // Fetch booked slots for the chosen date; generate the full grid client-side.
  // We pass the local-timezone UTC boundaries so the server queries the right range.
  const fetchSlots = useCallback(async (d: string) => {
    if (!d) return;
    setSlotsState("loading");
    setBookedSlots([]);
    setSelectedSlot("");
    setSlotsError("");
    try {
      const localMidnight  = new Date(`${d}T00:00:00`);
      const localEndOfDay  = new Date(`${d}T23:59:59`);
      const params = new URLSearchParams({
        date:     d,
        startUtc: localMidnight.toISOString(),
        endUtc:   localEndOfDay.toISOString(),
      });
      const res = await fetch(`/api/book/slots?${params}`);
      const json = await res.json();
      if (!res.ok) {
        setSlotsError(json?.error ?? "Could not load availability. Please try again.");
        setSlotsState("error");
        return;
      }
      setBookedSlots(json.bookedSlots ?? []);
      setSlotsState("done");
    } catch {
      setSlotsError("Network error. Please check your connection.");
      setSlotsState("error");
    }
  }, []);

  useEffect(() => {
    if (date) fetchSlots(date);
    else { setSlotsState("idle"); setBookedSlots([]); setSelectedSlot(""); }
  }, [date, fetchSlots]);

  // ── Step 1 — email gate ──
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

      if (res.ok) { setStep("form"); return; }

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

  // ── Step 2 — booking details ──
  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Please enter your name.";
    if (!date) errors.date = "Please select a date.";
    if (!selectedSlot) errors.slot = "Please select an available time slot.";
    if (!description.trim()) errors.description = "Please briefly describe what you'd like to discuss.";
    if (description.trim().length > 1000) errors.description = "Please keep your description under 1000 characters.";

    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    setStep("ready");
  }

  const selectedTimeLabel = selectedSlot ? formatTime(selectedSlot) : "";
  const calNotes = `Preferred time slot: ${date} at ${selectedTimeLabel}\n\nTopics to discuss:\n${description.trim()}`;

  // ── Render ──
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ─── Step 1: Email ─────────────────────────────────────── */}
      {(step === "email" || step === "checking-email") && (
        <div style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "1.75rem", boxShadow: "var(--shadow-card)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "0.375rem" }}>
            Step 1 of 2 — Verify your email
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

      {/* ─── Step 2: Booking details ────────────────────────────── */}
      {step === "form" && (
        <div style={{ borderRadius: "14px", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", padding: "1.75rem", boxShadow: "var(--shadow-card)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-hero)", fontFamily: "var(--font-body)", marginBottom: "0.25rem" }}>
            Step 2 of 2 — Booking details
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
            Choose a date to see real-time availability, then tell Charles what you&apos;d like to cover.
          </p>

          <form onSubmit={handleFormSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Name */}
            <div>
              <label htmlFor="booking-name" style={labelStyle}>Your name</label>
              <input
                id="booking-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                style={{ ...inputStyle, borderColor: formErrors.name ? "#EF4444" : "var(--color-border)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3EBD7A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = formErrors.name ? "#EF4444" : "var(--color-border)")}
              />
              {formErrors.name && <p role="alert" style={{ margin: "0.3rem 0 0", fontSize: "0.8125rem", color: "#EF4444", fontFamily: "var(--font-body)" }}>{formErrors.name}</p>}
            </div>

            {/* Date picker */}
            <div>
              <label htmlFor="booking-date" style={labelStyle}>Preferred date</label>
              <input
                id="booking-date"
                type="date"
                value={date}
                min={minDate()}
                max={maxDate()}
                onChange={(e) => {
                  const val = e.target.value;
                  setDate(val);
                  // Clear slot error when a new date is selected
                  if (formErrors.date) setFormErrors((prev) => ({ ...prev, date: "" }));
                }}
                style={{ ...inputStyle, borderColor: formErrors.date ? "#EF4444" : "var(--color-border)", colorScheme: "light" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3EBD7A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = formErrors.date ? "#EF4444" : "var(--color-border)")}
              />
              {formErrors.date && <p role="alert" style={{ margin: "0.3rem 0 0", fontSize: "0.8125rem", color: "#EF4444", fontFamily: "var(--font-body)" }}>{formErrors.date}</p>}
              {date && isWeekend(date) && (
                <p style={{ margin: "0.375rem 0 0", fontSize: "0.8125rem", color: "#D97706", fontFamily: "var(--font-body)" }}>
                  ⚠ Weekends are unavailable — please choose a weekday.
                </p>
              )}
            </div>

            {/* Time slot grid — live from Supabase bookings */}
            {date && !isWeekend(date) && (
              <div>
                <p style={{ ...labelStyle, marginBottom: "0.625rem" }}>
                  Available time slots
                  {slotsState === "loading" && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "var(--color-text-secondary)", fontWeight: 400 }}>
                      Loading…
                    </span>
                  )}
                </p>

                {/* Loading skeleton */}
                {slotsState === "loading" && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: "0.5rem" }}>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        style={{ height: "36px", borderRadius: "8px", backgroundColor: "#F3F4F6", animation: "pulse 1.5s ease-in-out infinite" }}
                      />
                    ))}
                  </div>
                )}

                {/* Error */}
                {slotsState === "error" && (
                  <div style={{ padding: "0.875rem 1rem", borderRadius: "8px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", fontSize: "0.875rem", color: "#991B1B", fontFamily: "var(--font-body)" }}>
                    {slotsError}{" "}
                    <button
                      type="button"
                      onClick={() => fetchSlots(date)}
                      style={{ background: "none", border: "none", color: "#3EBD7A", fontFamily: "var(--font-body)", fontSize: "0.875rem", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Slot grid */}
                {slotsState === "done" && (() => {
                  const daySlots = generateDaySlots(date);
                  return (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: "0.5rem" }}>
                      {daySlots.map((slot) => {
                        const iso        = slot.toISOString();
                        const booked     = isSlotBooked(slot, bookedSlots);
                        const isSelected = selectedSlot === iso;
                        return (
                          <button
                            key={iso}
                            type="button"
                            disabled={booked}
                            onClick={() => !booked && setSelectedSlot(iso)}
                            title={booked ? "Already booked" : "Click to select"}
                            style={{
                              padding: "0.5rem 0.25rem",
                              borderRadius: "8px",
                              border: isSelected
                                ? "2px solid #3EBD7A"
                                : booked
                                ? "1.5px solid #E5E7EB"
                                : "1.5px solid var(--color-border)",
                              backgroundColor: isSelected
                                ? "rgba(62,189,122,0.1)"
                                : booked
                                ? "#F3F4F6"
                                : "#fff",
                              color: isSelected
                                ? "#1a6e45"
                                : booked
                                ? "#9CA3AF"
                                : "var(--color-text-primary)",
                              fontSize: "0.8125rem",
                              fontWeight: isSelected ? 600 : 400,
                              fontFamily: "var(--font-body)",
                              cursor: booked ? "not-allowed" : "pointer",
                              transition: "all 0.15s",
                              textAlign: "center",
                              textDecoration: booked ? "line-through" : "none",
                            }}
                            onMouseOver={(e) => {
                              if (!isSelected && !booked) {
                                e.currentTarget.style.borderColor = "#3EBD7A";
                                e.currentTarget.style.backgroundColor = "rgba(62,189,122,0.05)";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (!isSelected && !booked) {
                                e.currentTarget.style.borderColor = "var(--color-border)";
                                e.currentTarget.style.backgroundColor = "#fff";
                              }
                            }}
                          >
                            {formatTime(iso)}
                            {booked && (
                              <span style={{ display: "block", fontSize: "0.625rem", marginTop: "2px", color: "#EF4444" }}>Booked</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}

                {formErrors.slot && (
                  <p role="alert" style={{ margin: "0.4rem 0 0", fontSize: "0.8125rem", color: "#EF4444", fontFamily: "var(--font-body)" }}>
                    {formErrors.slot}
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <label htmlFor="booking-description" style={labelStyle}>What would you like to discuss?</label>
              <textarea
                id="booking-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. We have 2 years of sales data in spreadsheets and need a dashboard + forecast model for next quarter..."
                rows={4}
                maxLength={1000}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "100px",
                  lineHeight: 1.6,
                  borderColor: formErrors.description ? "#EF4444" : "var(--color-border)",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#3EBD7A")}
                onBlur={(e) => (e.currentTarget.style.borderColor = formErrors.description ? "#EF4444" : "var(--color-border)")}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
                {formErrors.description
                  ? <p role="alert" style={{ margin: 0, fontSize: "0.8125rem", color: "#EF4444", fontFamily: "var(--font-body)" }}>{formErrors.description}</p>
                  : <span />
                }
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
                  {description.length}/1000
                </span>
              </div>
            </div>

            {/* Email reminder */}
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)" }}>
              Booking as <strong>{email}</strong> —{" "}
              <button
                type="button"
                onClick={() => { setStep("email"); setFormErrors({}); setDate(""); setSelectedSlot(""); setSlotsState("idle"); setBookedSlots([]); }}
                style={{ background: "none", border: "none", padding: 0, color: "#3EBD7A", fontFamily: "var(--font-body)", fontSize: "0.8125rem", cursor: "pointer", textDecoration: "underline" }}
              >
                change
              </button>
            </p>

            <button
              type="submit"
              style={{ padding: "0.75rem 1.25rem", borderRadius: "10px", border: "none", backgroundColor: "#3EBD7A", color: "#fff", fontSize: "0.9375rem", fontWeight: 600, fontFamily: "var(--font-body)", cursor: "pointer", transition: "background-color 0.15s" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#30A868")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3EBD7A")}
            >
              Confirm &amp; pick a slot →
            </button>
          </form>
        </div>
      )}

      {/* ─── Step 3: Cal.com embed ──────────────────────────────── */}
      {step === "ready" && (
        <div>
          <div style={{ marginBottom: "0.875rem", padding: "10px 14px", borderRadius: "10px", backgroundColor: "rgba(62,189,122,0.08)", border: "1px solid rgba(62,189,122,0.3)", fontSize: "0.875rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", display: "flex", flexWrap: "wrap", gap: "0.5rem 1.25rem" }}>
            <span>✓ <strong>{name}</strong></span>
            <span>📧 {email}</span>
            <span>📅 {new Date(date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at {selectedTimeLabel}</span>
          </div>
          <CalEmbed
            calLink={calLink}
            prefillEmail={email}
            prefillName={name}
            prefillNotes={calNotes}
            prefillDate={date}
          />
        </div>
      )}

      {/* ─── Blurred calendar preview (steps 1 & 2) ─────────────── */}
      {step !== "ready" && (
        <div style={{ position: "relative" }}>
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, zIndex: 10, borderRadius: "14px", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", backgroundColor: "rgba(255,255,255,0.55)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", cursor: "not-allowed", pointerEvents: "all" }}
          >
            <span style={{ fontSize: "1.75rem" }}>🔒</span>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", fontFamily: "var(--font-body)", margin: 0, textAlign: "center", padding: "0 1rem" }}>
              {step === "email" || step === "checking-email"
                ? "Verify your email above to continue"
                : "Complete your details above to unlock the calendar"}
            </p>
          </div>
          {/* inert prevents keyboard focus entering the hidden embed */}
          <div inert aria-hidden="true">
            <CalEmbed calLink={calLink} />
          </div>
        </div>
      )}
    </div>
  );
}
