"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Deterministic highlight — avoids Math.random() hydration mismatch.
// Highlights today + days whose number is divisible by 7 (visual "booked" slots).
function isDayHighlighted(day: number, today: number): boolean {
  return day === today || day % 7 === 0;
}

const CalendarDay: React.FC<{
  day: number | string;
  isHeader?: boolean;
  isToday?: boolean;
  isHighlighted?: boolean;
}> = ({ day, isHeader, isToday, isHighlighted }) => {
  const bg = isToday
    ? "bg-[#3EBD7A] text-white shadow-[0_0_12px_rgba(62,189,122,0.5)]"
    : isHighlighted
    ? "bg-[#183D30] text-white"
    : "text-[#6B7280]";

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${
        isHeader ? "" : "rounded-xl"
      } ${isHeader ? "" : bg}`}
    >
      <span className={`font-medium ${isHeader ? "text-xs text-[#9CA3AF]" : "text-sm"}`}>
        {day}
      </span>
    </div>
  );
};

interface CalendarWidgetProps {
  calLink?: string;
}

export function CalendarWidget({ calLink = "charlesshalua/discovery-call" }: CalendarWidgetProps) {
  const now          = new Date();
  const currentMonth = now.toLocaleString("default", { month: "long" });
  const currentYear  = now.getFullYear();
  const today        = now.getDate();
  const firstDayOfWeek = new Date(currentYear, now.getMonth(), 1).getDay();
  const daysInMonth    = new Date(currentYear, now.getMonth() + 1, 0).getDate();

  const bookingLink = `https://cal.com/${calLink}`;

  const renderDays = () => {
    const cells: React.ReactNode[] = [
      // Header row
      ...DAY_NAMES.map((d) => (
        <CalendarDay key={`h-${d}`} day={d} isHeader />
      )),
      // Empty leading cells
      ...Array.from({ length: firstDayOfWeek }, (_, i) => (
        <div key={`e-${i}`} className="col-span-1 row-span-1 h-8 w-8" />
      )),
      // Date cells
      ...Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        return (
          <CalendarDay
            key={`d-${day}`}
            day={day}
            isToday={day === today}
            isHighlighted={isDayHighlighted(day, today)}
          />
        );
      }),
    ];
    return cells;
  };

  return (
    <BentoCard linkTo={bookingLink}>
      <div className="grid h-full gap-5">
        {/* Text + CTA */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-[#111827] md:text-2xl" style={{ letterSpacing: "-0.02em" }}>
            Ready to turn your data into decisions?
          </h2>
          <p className="mb-1 text-sm text-[#6B7280]">
            Book a free 30-minute discovery call — no pitch, no commitment.
          </p>
          <Button
            className="mt-4 rounded-xl bg-[#3EBD7A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#30A868]"
          >
            Book Now →
          </Button>
        </div>

        {/* Calendar grid */}
        <div>
          <div className="w-full rounded-[20px] border border-[#E5E7EB] p-2 transition-colors duration-150 group-hover:border-[#3EBD7A]">
            <div
              className="h-full rounded-2xl border border-[#E5E7EB]/60 p-3"
              style={{ boxShadow: "0px 2px 1.5px 0px rgba(165,174,184,0.32) inset" }}
            >
              {/* Month header */}
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-[#111827]">
                  {currentMonth}, {currentYear}
                </p>
                <span className="h-1 w-1 rounded-full bg-[#3EBD7A]" />
                <p className="text-xs text-[#6B7280]">30 min call</p>
              </div>

              {/* Day grid */}
              <div className="mt-4 grid grid-cols-7 gap-1.5 px-2">
                {renderDays()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── BentoCard ─────────────────────────────────────────────── */

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  showHoverGradient?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  className = "",
  showHoverGradient = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-colors duration-200 hover:border-[#3EBD7A]/40 hover:bg-[rgba(62,189,122,0.03)] ${className}`}
    >
      {/* Arrow icon — appears on hover */}
      {linkTo && (
        <div className="absolute bottom-4 right-5 z-10 flex h-10 w-10 rotate-6 items-center justify-center rounded-full bg-[#183D30] opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:translate-y-[-6px] group-hover:rotate-0 group-hover:opacity-100">
          <svg className="h-5 w-5 text-white" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 15.25V6.75H8.75" />
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 7L6.75 17.25" />
          </svg>
        </div>
      )}

      {/* Hover gradient overlay */}
      {showHoverGradient && (
        <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-tl from-[rgba(62,189,122,0.12)] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}

      {children}
    </div>
  );

  if (!linkTo) return cardContent;

  return linkTo.startsWith("/") ? (
    <Link href={linkTo} className="block">
      {cardContent}
    </Link>
  ) : (
    <a href={linkTo} target="_blank" rel="noopener noreferrer" className="block">
      {cardContent}
    </a>
  );
}
