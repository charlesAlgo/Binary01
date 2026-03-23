import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo — AI Natural Language Analytics Assistant",
  description:
    "Ask plain-English questions about retail data and get instant charts powered by Llama 3.3 70B. Built for Luxe & Thread Boutique.",
};

const DEMO_HOST = "https://binary01-3fzxd8bzwu7app5keervpor.streamlit.app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href={DEMO_HOST} />
      <link rel="dns-prefetch" href={DEMO_HOST} />
      {children}
    </>
  );
}
