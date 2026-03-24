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

const BASE_URL = "https://data-life.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "AI & Data Freelancer for Hire — Charles Shalua | DataLife",
    template: "%s | DataLife",
  },
  description:
    "DataLife delivers data analysis, ML apps, and LLM bots for growth-minded businesses. Ontario-based, available worldwide. Book a free strategy call today.",

  keywords: [
    "hire freelance data analyst",
    "freelance machine learning developer",
    "AI chatbot developer for hire",
    "augmented analytics consultant",
    "data analysis consultant Canada",
    "freelance AI engineer Ontario",
    "ML application developer for hire",
    "RAG pipeline developer freelance",
    "freelance data analyst Toronto",
    "LangChain developer for hire Canada",
    "DataLife",
    "Charles Shalua",
    "freelance AI developer Ontario",
    "machine learning consultant Canada",
    "PIPEDA-compliant data analyst freelance",
  ],

  authors: [{ name: "Charles Shalua", url: BASE_URL }],
  creator: "Charles Shalua",
  publisher: "DataLife",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "DataLife",
    title: "AI & Data Freelancer for Hire — Charles Shalua | DataLife",
    description:
      "DataLife delivers data analysis, ML apps, and LLM bots for growth-minded businesses. Ontario-based, available worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DataLife — AI & Data Solutions by Charles Shalua",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI & Data Freelancer for Hire — Charles Shalua | DataLife",
    description:
      "DataLife delivers data analysis, ML apps, and LLM bots for growth-minded businesses. Ontario-based, available worldwide.",
    images: ["/og-image.png"],
    creator: "@charlesshalua",
  },

  alternates: {
    canonical: BASE_URL,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

/* ── JSON-LD structured data ─────────────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "DataLife",
      url: BASE_URL,
      description:
        "AI & Data Solutions firm specialising in Data Analysis, Augmented Analytics, ML Applications, and LLM Bots.",
      foundingDate: "2023",
      founder: { "@id": `${BASE_URL}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ontario",
        addressCountry: "CA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${BASE_URL}/contact`,
      },
      sameAs: [
        "https://www.upwork.com/freelancers/charlesshalua",
        "https://www.fiverr.com/charlesshalua",
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Charles Shalua",
      jobTitle: "Founder & AI/Data Engineer",
      url: `${BASE_URL}/about`,
      worksFor: { "@id": `${BASE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ontario",
        addressCountry: "CA",
      },
      knowsAbout: [
        "Data Analysis",
        "Machine Learning",
        "LLM Development",
        "Augmented Analytics",
        "Business Intelligence",
        "Python",
        "SQL",
      ],
      sameAs: [
        "https://www.upwork.com/freelancers/charlesshalua",
        "https://www.fiverr.com/charlesshalua",
        "https://github.com/charlesAlgo",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "DataLife",
      description:
        "Freelance AI & Data Engineering services by Charles Shalua — Ontario, Canada.",
      publisher: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "DataLife — AI & Data Solutions",
      url: BASE_URL,
      priceRange: "$$",
      areaServed: {
        "@type": "Country",
        name: "Worldwide",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "AI & Data Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Data Analysis & BI Dashboards", url: `${BASE_URL}/services/data-analysis` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Augmented Analytics", url: `${BASE_URL}/services/augmented-analytics` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "ML Applications", url: `${BASE_URL}/services/ml-applications` } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "LLM Bots & AI Assistants", url: `${BASE_URL}/services/llm-bots` } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="pt-16">{children}</div>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
