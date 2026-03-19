import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://data-life.tech";

const PORTFOLIO_SLUGS = [
  "logistics-dashboard",
  "nutriflow-bot",
  "churn-prediction",
  "sales-forecasting",
  "hr-analytics",
  "fashion-boutique-dashboard",
  "nl-analytics-assistant",
  "ecommerce-spending-predictor",
  "document-bot",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const portfolioEntries: MetadataRoute.Sitemap = PORTFOLIO_SLUGS.map((slug) => ({
    url: `${BASE_URL}/portfolio/${slug}`,
    lastModified: new Date("2026-03-19"),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL,                                          lastModified: new Date("2026-03-19"), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/about`,                              lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`,                           lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/data-analysis`,             lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/augmented-analytics`,       lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/ml-applications`,           lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/llm-bots`,                  lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`,                          lastModified: new Date("2026-03-19"), changeFrequency: "weekly",  priority: 0.85 },
    { url: `${BASE_URL}/contact`,                            lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/book`,                               lastModified: new Date("2026-03-19"), changeFrequency: "monthly", priority: 0.9 },
    ...portfolioEntries,
  ];
}
