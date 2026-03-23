import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo — E-Commerce Customer Spending Predictor",
  description:
    "Interactive ML application predicting yearly customer spend from behavioural data. OLS Linear Regression · R²=97.8% · RMSE=$10.48 · Built with scikit-learn + FastAPI.",
};

const DEMO_HOST = "https://binary01-4uhsyappv2a3epfj9hn6699.streamlit.app";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Warm up the connection to Streamlit before the iframe renders */}
      <link rel="preconnect" href={DEMO_HOST} />
      <link rel="dns-prefetch" href={DEMO_HOST} />
      {children}
    </>
  );
}
