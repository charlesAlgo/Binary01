import type { ReactNode } from "react";
import Image from "next/image";

function OpenAIIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function SlackIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.123 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.123a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  );
}

function OpenClawIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-5z" fill={color} fillOpacity="0.9" />
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Platform = {
  name: string;
  icon: ReactNode;
  accent: string;
};

function CdnIcon({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} width={18} height={18} unoptimized style={{ display: "block" }} />;
}

const PLATFORMS: Platform[] = [
  {
    name: "n8n",
    icon: <CdnIcon src="https://cdn.simpleicons.org/n8n/FF6D5A" alt="n8n" />,
    accent: "#FF6D5A",
  },
  {
    name: "OpenAI",
    icon: <OpenAIIcon color="#ffffff" />,
    accent: "#ffffff",
  },
  {
    name: "Claude",
    icon: <CdnIcon src="https://cdn.simpleicons.org/anthropic/D97757" alt="Claude" />,
    accent: "#D97757",
  },
  {
    name: "OpenClaw",
    icon: <OpenClawIcon color="#0088DB" />,
    accent: "#0088DB",
  },
  {
    name: "Slack",
    icon: <SlackIcon color="#E01E5A" />,
    accent: "#E01E5A",
  },
  {
    name: "Make",
    icon: <CdnIcon src="https://cdn.simpleicons.org/make/9B59B6" alt="Make" />,
    accent: "#9B59B6",
  },
  {
    name: "Zapier",
    icon: <CdnIcon src="https://cdn.simpleicons.org/zapier/FF4A00" alt="Zapier" />,
    accent: "#FF4A00",
  },
  {
    name: "HubSpot",
    icon: <CdnIcon src="https://cdn.simpleicons.org/hubspot/FF7A59" alt="HubSpot" />,
    accent: "#FF7A59",
  },
];

function PlatformCard({ name, icon, accent }: Platform) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        borderRadius: "999px",
        border: `1px solid ${accent}28`,
        backgroundColor: `${accent}10`,
        marginInline: "0.625rem",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.8)",
          letterSpacing: "0.01em",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function PlatformRibbon() {
  const items = [...PLATFORMS, ...PLATFORMS];

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg-primary)",
        borderTop: "1px solid rgba(0,136,219,0.08)",
        borderBottom: "1px solid rgba(0,136,219,0.08)",
        paddingBlock: "1.125rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, var(--color-bg-primary) 0%, transparent 8%, transparent 92%, var(--color-bg-primary) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        className="animate-marquee"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {items.map((p, i) => (
          <PlatformCard key={`${p.name}-${i}`} {...p} />
        ))}
      </div>
    </div>
  );
}
