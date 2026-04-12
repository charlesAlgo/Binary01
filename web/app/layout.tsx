import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const BASE_URL = "https://data-life.tech";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Business Automation Agency — DataLife | n8n & AI Systems",
    template: "%s | DataLife",
  },
  description:
    "DataLife automates your entire business — from lead generation to closed deal. We build end-to-end automation systems using n8n, OpenClaw, and AI. Slack notifications, CRM automations, and outreach pipelines. Ontario-based, worldwide.",

  keywords: [
    "business automation agency",
    "n8n automation agency",
    "lead generation automation",
    "CRM automation systems",
    "sales pipeline automation",
    "business process automation Canada",
    "workflow automation freelancer Ontario",
    "AI automation systems builder",
    "Slack notification automation",
    "automated outreach systems",
    "DataLife",
    "Charles Shalua",
    "OpenClaw automation",
    "n8n workflow builder Canada",
    "end-to-end business automation",
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
    title: "Business Automation Agency — DataLife | n8n & AI Systems",
    description:
      "DataLife automates your entire business — from lead generation to closed deal. n8n, OpenClaw, AI bots, and notification systems. Ontario-based, worldwide.",
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
    title: "Business Automation Agency — DataLife | n8n & AI Systems",
    description:
      "DataLife automates your entire business — from lead generation to closed deal. n8n, OpenClaw, AI bots, and notification systems. Ontario-based, worldwide.",
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
        "Business automation agency specialising in end-to-end automation systems — from lead generation to closed deal. Using n8n, OpenClaw, and AI.",
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
        "https://github.com/charlesAlgo",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inject theme before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
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
