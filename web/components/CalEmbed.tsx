"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalEmbedProps {
  calLink: string;
  prefillEmail?: string;
  prefillName?: string;
  prefillNotes?: string;
  prefillDate?: string; // "YYYY-MM-DD"
}

export default function CalEmbed({
  calLink,
  prefillEmail,
  prefillName,
  prefillNotes,
  prefillDate,
}: CalEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#183D30" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        minHeight: "480px",
      }}
      config={{
        layout: "month_view",
        ...(prefillEmail ? { email: prefillEmail } : {}),
        ...(prefillName ? { name: prefillName } : {}),
        ...(prefillNotes ? { notes: prefillNotes } : {}),
        ...(prefillDate ? { date: prefillDate } : {}),
      }}
    />
  );
}
