import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const ARTICLES: Record<string, {
  category: string;
  date: string;
  title: string;
  readTime: string;
  accent: string;
  image: string;
  body: string[];
}> = {
  "ai-small-business-compete-enterprise": {
    category: "AI + BUSINESS",
    date: "Apr 2026",
    title: "How AI Is Helping Small Businesses Compete With Enterprise — Without the Enterprise Budget",
    readTime: "6 min read",
    accent: "#38BDF8",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format&fit=crop",
    body: [
      "Ten years ago, if you wanted a machine learning model or a real-time analytics dashboard, you needed a data science team, a six-figure software budget, and an enterprise vendor contract. Today, a five-person company can get the same output for a few thousand dollars and have it running in two weeks. That shift is real — and most small businesses are barely aware it happened.",
      "The tools that changed the game are not the headline AI products. It's not ChatGPT, and it's not Copilot. The real unlocks are the underlying infrastructure: open-source ML libraries, cloud-hosted vector databases, low-cost LLM APIs, and no-code-adjacent deployment tools. Together, they collapsed the build cost of custom AI systems by 90% in the last three years.",
      "Here's what this actually means in practice. An e-commerce company used to need a full-time data analyst to produce inventory reports. Now a $500 dashboard connected to Shopify does it automatically. A SaaS company used to need a machine learning engineer to build churn prediction. Now a $1,500 scikit-learn model, trained on their own CRM data, runs weekly and flags at-risk accounts before they cancel.",
      "The pattern repeating across every industry: the labour cost of building is collapsing. The value of the output is not. A churn model that saves two enterprise accounts per quarter delivers the same value whether it cost $100,000 to build or $1,500. The ROI math has fundamentally changed.",
      "What hasn't changed is the need for someone who understands both the business problem and the technical tooling. The gap between 'we have data' and 'we have actionable insight' is still a skills gap, not a tools gap. The tools exist — the expertise to configure them correctly for your specific situation is still the scarce resource.",
      "The practical advice: don't try to build a data team. Don't try to learn machine learning yourself. Find a specialist who has done your exact problem before, scope a small first project, and measure the output before committing to anything larger. The entry cost is low enough that a proof-of-concept is almost always worth running before a full engagement.",
      "The businesses winning with AI right now are not the ones who adopted it earliest. They're the ones who adopted it most practically — solving one specific, expensive problem, measuring the result, and expanding from there. That process is available to every business with data and a clear problem to solve.",
    ],
  },
  "data-problem-fix-30-days": {
    category: "DATA ANALYSIS",
    date: "Mar 2026",
    title: "Your Business Has a Data Problem. Here's How to Fix It in 30 Days.",
    readTime: "8 min read",
    accent: "#10B981",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
    body: [
      "Most small businesses don't have a data shortage. They have data everywhere — in Shopify, in their CRM, in Google Analytics, in five different spreadsheets that different people update at different times. The problem is that none of it talks to each other, and nobody trusts any of it.",
      "This is the data chaos problem. It's not glamorous, and it doesn't make headlines, but it is the single most common reason businesses make bad decisions despite having plenty of data. The solution is not more data — it's a clean, connected, trusted source of truth.",
      "Here is a 30-day framework that has worked for every client I've applied it to, regardless of industry or company size.",
      "Week 1: Audit. List every tool in your business that generates data. Shopify, QuickBooks, HubSpot, Mailchimp, your scheduling software, your spreadsheets. For each tool, write down: what data it holds, who owns it, how often it's updated, and whether you trust the numbers. Don't try to fix anything yet — just map the landscape. By the end of week one you should have a clear picture of your data sources, your data gaps, and where the conflicts are.",
      "Week 2: Pick one problem. Out of all the questions your business needs data to answer, pick the single most expensive unanswered one. Not the most interesting — the most expensive. Usually this is something like: which products are actually profitable, which customers are going to churn, or which marketing channel is actually driving revenue. Build a data pipeline that answers only that question, from only the sources that feed it.",
      "Week 3: Build a single dashboard. Take the clean data from week two and put it into one dashboard. Not twelve dashboards — one. It should have five to eight metrics maximum, and every number on it should be trusted by the person who makes decisions from it. This is the single most impactful artefact you can build for a business. A trusted, used dashboard is worth more than a perfect data warehouse that nobody opens.",
      "Week 4: Automate the refresh. Whatever manual work was required to update the dashboard — eliminate it. Connect the pipeline directly to the source data. Set up a scheduled refresh. Send the dashboard to the relevant person every Monday morning via Slack or email. The goal is that the right person sees the right number without doing any work to get it.",
      "Thirty days from now, you will have one trusted number for one important question, updating automatically, delivered to the decision-maker without manual effort. That is not a small thing. That is the foundation every data project should be built on.",
    ],
  },
  "roi-of-automation": {
    category: "AUTOMATION",
    date: "Mar 2026",
    title: "The ROI of Automation: Why Every Manual Process Is Costing You More Than You Think",
    readTime: "7 min read",
    accent: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80&auto=format&fit=crop",
    body: [
      "When businesses calculate the cost of a manual process, they almost always undercount. They count the time — 2 hours per week, 40 hours per month — and convert it to an hourly rate. That's a start, but it misses the three costs that often exceed the time cost by a factor of ten.",
      "The first hidden cost is errors. Manual processes introduce errors at a predictable rate — roughly 1% for simple, routine tasks, and much higher for complex or high-volume ones. An error in an invoice means chasing a payment. An error in a customer record means a bad experience. An error in a report means a bad decision. Errors are expensive in ways that don't show up in a time-tracking spreadsheet.",
      "The second hidden cost is latency. When a process is manual, it only runs when a human runs it. A lead form submission sits in an inbox for hours before someone logs it in the CRM. A new booking doesn't get confirmed until someone checks their email. A low-stock alert doesn't fire until someone manually checks inventory. In the time between the trigger and the action, things happen — leads go cold, customers get frustrated, stockouts occur. The cost of latency is real even when it's invisible.",
      "The third hidden cost is focus. Manual processes don't just consume time — they consume cognitive load. Every manual process is a recurring interruption to whatever higher-value work the person doing it should be doing. That opportunity cost compounds across every hour spent on avoidable administration.",
      "Here is a simple way to calculate the true cost of a manual process. Take the time cost per month and multiply by the person's fully-loaded hourly rate. Then add an error cost — for most manual processes, 10-15% of the time cost is a reasonable estimate. Then add a latency cost — how much would reducing the average delay from 4 hours to 4 seconds be worth? Even a conservative estimate usually lands at 2-3x the raw time cost.",
      "Now for the ROI case. Most basic automations cost $300-$600 to build, take 2-3 days to deploy, and eliminate the process entirely thereafter. A process that was costing $400/month in fully-loaded cost pays back a $600 automation in 45 days. After that, it's pure savings — compounding every month indefinitely.",
      "The question is not whether automation has ROI. The question is which process to automate first. The answer is always the one your team touches most often, makes errors in most frequently, and resents doing most strongly. That combination usually points to the highest-ROI automation in your business — and it is almost always faster, cheaper, and less disruptive to build than the team expects.",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} — DataLife`,
    description: article.body[0].slice(0, 160),
    alternates: { canonical: `https://data-life.tech/writing/${slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          backgroundColor: "var(--color-hero)",
          paddingTop: "clamp(5rem, 12vw, 8rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="section-wrapper" style={{ position: "relative", maxWidth: "780px" }}>
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <Link href="/writing" style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>Writing</Link>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8125rem" }}>›</span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)" }}>Article</span>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
            <span style={{ padding: "4px 12px", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.07em", backgroundColor: `${article.accent}18`, color: article.accent, border: `1px solid ${article.accent}30`, fontFamily: "var(--font-body)" }}>
              {article.category}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.50)", fontFamily: "var(--font-body)" }}>
              {article.date} · {article.readTime}
            </span>
          </div>

          <h1 style={{ color: "var(--color-text-hero)", lineHeight: 1.15, marginBottom: "0" }}>
            {article.title}
          </h1>
        </div>
      </section>

      {/* ── Cover Image ── */}
      <div style={{ width: "100%", maxHeight: "420px", overflow: "hidden", position: "relative", height: "420px" }}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          style={{ objectFit: "cover" }}
          sizes="100vw"
        />
      </div>

      {/* ── Body ── */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", paddingBlock: "clamp(3rem, 6vw, 5rem)" }}>
        <div className="section-wrapper" style={{ maxWidth: "780px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.85,
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  margin: 0,
                  maxWidth: "none",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--color-border)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(0,136,219,0.15)", border: "2px solid rgba(0,136,219,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>CS</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px" }}>Charles Shalua</p>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-body)", margin: 0 }}>Founder, DataLife · AI & Data Engineer</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--color-bg-cream)", paddingBlock: "clamp(4rem, 8vw, 5.5rem)" }}>
        <div className="section-wrapper" style={{ textAlign: "center", maxWidth: "640px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)", marginBottom: "1rem" }}>
            Want to apply this to your business?
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1.0625rem", fontFamily: "var(--font-body)", marginBottom: "2rem", lineHeight: 1.7, maxWidth: "none" }}>
            Book a free 30-minute call and we&rsquo;ll find the highest-ROI starting point for your specific situation.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/book" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 600, color: "#fff", backgroundColor: "var(--color-accent)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              Book a Free Call
            </Link>
            <Link href="/writing" style={{ display: "inline-flex", alignItems: "center", padding: "13px 28px", fontSize: "1rem", fontWeight: 500, color: "var(--color-text-secondary)", backgroundColor: "transparent", border: "1px solid var(--color-border)", borderRadius: "8px", textDecoration: "none", fontFamily: "var(--font-body)" }}>
              ← More Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
