import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Charles Shalua — AI-Powered Freelancing",
    template: "%s | Charles Shalua",
  },
  description:
    "Data Analysis, Augmented Analytics, ML Applications, and LLM Bots. Hire Charles Shalua for your next data or AI project.",
  keywords: [
    "data analysis",
    "machine learning",
    "LLM bots",
    "augmented analytics",
    "AI freelancer",
    "Charles Shalua",
  ],
  authors: [{ name: "Charles Shalua" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Charles Shalua",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="antialiased">
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
