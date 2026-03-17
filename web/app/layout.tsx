import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DataLife — AI & Data Solutions by Charles Shalua",
    template: "%s | DataLife",
  },
  description:
    "DataLife delivers Data Analysis, Augmented Analytics, ML Applications, and LLM Bots. Founded by Charles Shalua — Founder & Co-Engineer. Est. 2023.",
  keywords: [
    "DataLife",
    "data analysis",
    "machine learning",
    "LLM bots",
    "augmented analytics",
    "AI firm",
    "Charles Shalua",
    "AI engineer",
  ],
  authors: [{ name: "Charles Shalua" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DataLife",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
