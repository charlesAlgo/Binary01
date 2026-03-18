"use client";

interface CalEmbedProps {
  calLink: string;
}

export default function CalEmbed({ calLink }: CalEmbedProps) {
  const src = `https://cal.com/${calLink}?embed=true`;

  return (
    <iframe
      src={src}
      style={{
        width: "100%",
        height: "700px",
        border: "none",
        borderRadius: "14px",
        display: "block",
      }}
      title="Book a discovery call"
      loading="lazy"
    />
  );
}
