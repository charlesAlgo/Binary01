import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DataLife — AI & Data Solutions by Charles Shalua";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#183D30",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background accent circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(62,189,122,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Header — logo + tagline */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "rgba(62,189,122,0.18)",
              border: "1.5px solid rgba(62,189,122,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#3EBD7A",
              letterSpacing: "-0.04em",
            }}
          >
            DL
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.03em" }}>
            DataLife
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "rgba(62,189,122,0.1)",
              border: "1px solid rgba(62,189,122,0.3)",
              borderRadius: 999,
              padding: "6px 18px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#3EBD7A",
              }}
            />
            <span style={{ fontSize: 15, fontWeight: 600, color: "#3EBD7A", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Available for Projects
            </span>
          </div>

          <div
            style={{
              fontSize: 62,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 800,
            }}
          >
            AI & Data Solutions
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.60)",
              lineHeight: 1.5,
              maxWidth: 680,
            }}
          >
            Data Analysis · ML Applications · LLM Bots · Augmented Analytics
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "rgba(62,189,122,0.15)",
                border: "1.5px solid rgba(62,189,122,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              CS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>Charles Shalua</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.50)" }}>Founder & Co-Engineer · Ontario, Canada</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {["40+ Projects", "Top Rated", "Fixed Price"].map((badge) => (
              <div
                key={badge}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
