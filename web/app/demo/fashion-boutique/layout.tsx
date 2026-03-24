import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo — Fashion Boutique Retail Analytics Dashboard",
  description:
    "Interactive 6-page Streamlit analytics dashboard built for Luxe & Thread Boutique. Explore revenue, markdowns, returns, and inventory live.",
};

const DEMO_HOST = "https://binary01-gzhhs5ykmbvbdbc8qfb5di.streamlit.app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href={DEMO_HOST} />
      <link rel="dns-prefetch" href={DEMO_HOST} />
      {children}
    </>
  );
}
