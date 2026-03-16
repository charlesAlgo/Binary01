**WEBSITE**

**REQUIREMENTS**

*Brand Identity • Design System • Page Specs • User Flows*

*Wireframes • Component Inventory • Technical Architecture*

Charles Shalua \| AI-Powered Freelancing Firm \| March 2026

**1. BRAND IDENTITY & CREATIVE DIRECTION**

+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **DESIGN PHILOSOPHY**                                                                                                                                                                                                                                                                                                                                        |
|                                                                                                                                                                                                                                                                                                                                                              |
| Light, clean, trustworthy. The site should feel like a premium professional studio --- airy whites, soft blues, and crisp typography that say we know what we are doing. Light backgrounds with blue accents signal clarity and reliability. Generous whitespace and precise spacing signal sophistication. The site must feel polished but never cluttered. |
+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**1.1 Brand Personality**

  ----------------------------- -----------------------------------------------------------------------------------------------------------------------
  **Trait**                     **How It Shows on the Site**

  **Technical depth**           Data visualizations in the hero. Code snippets in case studies. The chatbot itself as a live demo of capability.

  **Approachable expert**       Clear language, no jargon walls. Service pages explain the problem before the solution. Pricing ranges shown upfront.

  **Builder, not consultant**   Case studies show code, dashboards, and real metrics --- not slide decks. We ship things.

  **Modern but grounded**       Clean, light aesthetic says technical credibility. Centennial College credential and real testimonials say trust me."
  ----------------------------- -----------------------------------------------------------------------------------------------------------------------

**1.2 Color System**

The website uses a light theme with a soft blue palette. Clean whites and sky blues as the foundation, with strategic blue accents for CTAs and interactive elements. All color combinations meet WCAG AA contrast standards.

  -------------------- ------------- ------------------------------------------------------------------------------------------
  **Token**            **Hex**       **Usage**

  **bg-primary**       #FFFFFF       Main background. Pure white. Clean canvas for all content.

  **bg-secondary**     #F0F7FF       Card backgrounds, feature sections, alternating stripes. Whisper of blue tint.

  **bg-tertiary**      #DBEAFE       Hover states, active elements, badges, tags. Light blue that feels interactive.

  **accent-blue**      #2563EB       Primary CTA buttons, links, active states. Strong blue. The main action color.

  **accent-sky**       #38BDF8       Secondary accent. Lighter blue for highlights, progress indicators, decorative elements.

  **accent-teal**      #14B8A6       Success states, chatbot indicator, data viz accent. Clean teal for variety.

  **text-primary**     #0F172A       Headings and primary body text. Near-black slate. Not pure black (softer on eyes).

  **text-secondary**   #64748B       Descriptions, meta info, supporting text. Medium gray with enough contrast on white.

  **border-default**   #E2E8F0       Card borders, dividers, separator lines. Soft blue-gray. Visible but gentle.
  -------------------- ------------- ------------------------------------------------------------------------------------------

**1.3 Typography**

  ----------------------- -------------------------------- ----------------------------------------------------------------------------------------------------
  **Element**             **Font / Size**                  **Details**

  **Display / H1**        Satoshi Bold, 56--72px           Hero headlines only. Tight letter-spacing (-0.02em). Line height 1.1. Commanding without shouting.

  **H2 Section titles**   Satoshi Semibold, 36--44px       Section headers on each page. Same tight tracking. Creates visual rhythm down the page.

  **H3 Subsections**      Satoshi Medium, 24--28px         Service card titles, case study headers. Still feels weighty but subordinate to H2.

  **Body text**           General Sans Regular, 16--18px   All paragraph text. Line height 1.7 for readability on light backgrounds. Max width 680px.

  **Labels / Meta**       General Sans Medium, 12--14px    Uppercase tracking (+0.08em) for labels, tags, navigation items. Subtle structure.

  **Code / Technical**    JetBrains Mono, 14--15px         Code snippets in case studies, tech stack badges, API examples. Signals technical credibility.
  ----------------------- -------------------------------- ----------------------------------------------------------------------------------------------------

**1.4 Visual Effects & Motion**

  ------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Effect**                     **Implementation**

  **Soft gradient hero**         Gentle animated gradient behind hero text. Light blue (#DBEAFE) to white (#FFFFFF) to soft sky (#BAE6FD), 12s cycle. Creates a living sky feel without distraction. CSS radial-gradient + animation.

  **Geometric grid pattern**     Ultra-faint dot grid or thin line grid (opacity 0.04--0.06) on the white background. Adds subtle texture and technical feel. SVG pattern as CSS background-image. Visible on scroll.

  **Scroll-triggered reveals**   Sections fade-in + translate-y(16px) as they enter viewport. Staggered delays on child elements (50ms intervals). Use Intersection Observer. Respect prefers-reduced-motion.

  **Card hover states**          Service and portfolio cards lift on hover (translate-y -4px) with soft shadow expansion (box-shadow: 0 8px 30px rgba(37,99,235,0.08)). Border transitions to accent-blue. 200ms ease.

  **Chatbot pulse indicator**    Floating chatbot button has a gentle pulse (scale 1 to 1.05, shadow expands) on a 3s loop. Accent blue with white icon. Stops pulsing when chat is open.

  **Floating shapes**            Optional: 2--3 abstract soft-edged blue blobs floating slowly in the hero background (opacity 0.05--0.10). Creates an organic, living feel. CSS blur + animation. Remove if it slows performance.
  ------------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**2. PAGE-BY-PAGE SPECIFICATIONS**

  -----------------------------------------------------------------------
  **HOME PAGE**

  -----------------------------------------------------------------------

The home page is the most important page. A visitor decides in 3--5 seconds whether to stay or leave. Every section must earn its place.

**Wireframe Layout (top to bottom):**

  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Navbar (sticky)**   Logo (left). Nav links: Services, Portfolio, About, Contact. CTA button: "Book a Call" (accent blue, pill shape). White bg with bottom border on scroll. Transparent at top of page. Height: 64px.

  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Hero section**    Full-width, min-height 80vh. Soft gradient background (white to light blue). Large headline (Satoshi Bold 64px): "We Build AI Systems That Actually Ship." Subhead (General Sans 20px, text-secondary): "Data analysis, ML models, LLM bots --- built by an AI-powered team, reviewed by a human." Two CTAs: "Book a Discovery Call" (filled blue) + "See Our Work" (ghost outline). Below CTAs: floating animated badge showing "4 active projects this month" or similar social proof.

  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Services grid**   4 cards in a 2x2 grid (stacked on mobile). Each card: icon (simple SVG), service name, one-line description, "Learn more →" link. Cards have white background, light blue-gray border (border-default), hover lift effect. This is the most scanned section --- keep it tight.

  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Social proof bar**   Horizontal row of trust signals: "Centennial College AI Program" badge, tech stack logos (Python, PyTorch, LangChain, Next.js, etc.), project count stat. Low-key, one line, muted colors. Establishes credibility without bragging.

  ---------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Featured work**   2--3 portfolio cards showing best case studies. Each card: white bg with soft shadow, project title, one-line problem/solution, result metric ("40% faster reporting"), service tag badge. Links to full case study. Horizontal scroll on mobile.

  ------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **How we work**     3-step horizontal strip: (1) Discovery call, (2) We build with AI agents, (3) You get production-ready deliverables. Each step: number, title, short description. Shows we're process-oriented.

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **CTA section**     Full-width soft blue section (bg-secondary) with centered text: "Have a project in mind?" + two buttons: Book a Meeting + Request a Quote. This is the conversion anchor --- high-contrast, clear action.

  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Footer**          Logo, nav links, service links, contact info (email), social links, "© 2026 Charles Shalua". Two columns on desktop, stacked on mobile. Muted, not distracting.

  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **SERVICE PAGES (x4)**

  -----------------------------------------------------------------------

Each service page follows the same template but with content tailored to that service line. The structure persuades: Problem → Solution → Proof → Action.

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Hero**            Service name as H1 (e.g., "Machine Learning Applications"). One-paragraph description of the problem this service solves. Background: soft blue-tinted section. Subtle related illustration (geometric shapes for ML, chart motif for data analysis).

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Problem statement**   "The challenge:" section. 2--3 pain points that the target client experiences. Written in their language, not ours. Example: "Your team spends 20 hours a week building reports that nobody reads."

  ----------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Our approach**    3--4 step process. Numbered, with icons. Shows how we solve the problem. Example: "1. Data audit → 2. Pipeline design → 3. Dashboard build → 4. Training & handoff."

  ------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Deliverables**    Bento grid of what the client receives. Each item: icon + name + one-line description. Examples: "Interactive dashboard", "Automated data pipeline", "Technical documentation."

  ------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Timeline & pricing**   Timeline range ("Typically 2--4 weeks"). Pricing range ("Starting from \$3,000"). Be transparent --- this filters out bad-fit leads and builds trust. A "Get a custom quote" CTA button.

  ------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- ---------------------------------------------------------------------------------------------------------------------
  **CTA**             Bottom CTA: "Ready to start?" with Book a Meeting + Request a Quote buttons. Same pattern as home page CTA section.

  ------------------- ---------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **PORTFOLIO / CASE STUDIES**

  -----------------------------------------------------------------------

  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Filter bar**      Horizontal filter chips: All, Data Analysis, Augmented Analytics, ML Applications, LLM Bots. Active chip gets accent-blue bg. Filters the card grid below without page reload.

  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ---------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Case study cards**   Grid of cards (3 columns desktop, 1 mobile). Each card: preview image/screenshot (light bg), project title, client type (anonymized: "E-commerce company"), one-line problem, one-line solution, result metric, service tag badge. Clicking opens the full case study.

  ---------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Full case study page**   Hero with project title + result metric. Sections: The Challenge, Our Approach (with technical detail), The Solution (screenshots, code snippets, architecture diagrams), Results (metrics with before/after), Tech Stack Used (badges). CTA at bottom: "Have a similar problem?"

  -------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **BOOK A MEETING**

  -----------------------------------------------------------------------

  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Page layout**     Two-column layout on desktop. Left column (40%): headline "Let's Talk About Your Project", short paragraph explaining the 30-min discovery call, what to expect (we'll discuss your needs, timeline, and whether we're a good fit). Right column (60%): Cal.com inline embed taking full height.

  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Cal.com embed**   Use \@calcom/embed-react for the inline calendar component. Event type: "Discovery Call" (30 min). Fields: name, email, service interest (dropdown), brief project description (textarea). Custom CSS to match site light blue theme. Mobile: stacks vertically, embed goes full-width.

  ------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Booking confirmation**   After booking: Cal.com shows confirmation. Our webhook fires: saves to Supabase leads table, sends Slack notification to you, sends confirmation email to the booker via Resend. Email includes: meeting time, Zoom/Google Meet link, what to prepare.

  -------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Trust elements**   Below the embed (or in the left column): "No commitment. No sales pitch. Just a conversation about your project." Plus a small testimonial quote from a past client.

  -------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **CONTACT / QUOTE REQUEST**

  -----------------------------------------------------------------------

**Form fields:**

  ------------------------ ----------------- ------------------------------------------------------------------------------------------------------------------------------
  **Field**                **Type**          **Details**

  Full name                text input        Required. Placeholder: "Your name"

  Email                    email input       Required. Validated. Placeholder: "you@company.com"

  Service interest         select dropdown   Options: Data Analysis, Augmented Analytics, ML Applications, LLM Bots, Not Sure Yet

  Project description      textarea          Required. Min 50 chars. Placeholder: "Tell us about your project, what problem you're trying to solve, and any constraints."

  Current data situation   select dropdown   Options: We have clean data ready, We have data but it needs work, We need help collecting data, Not sure

  Budget range             select dropdown   Options: Under \$3K, \$3K--\$10K, \$10K--\$25K, \$25K+, Let's discuss

  Timeline                 select dropdown   Options: ASAP, Within 1 month, 1--3 months, Flexible
  ------------------------ ----------------- ------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **AI INTAKE CHATBOT**

  -----------------------------------------------------------------------

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------
  **Trigger**         Floating button, bottom-right corner, 56px circle, teal bg with pulse animation. Icon: chat bubble SVG. Click opens the chat panel.

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------

  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Chat panel**      400px wide, 520px tall on desktop. Slides up from bottom-right. White bg with soft shadow and rounded corners and subtle border. Header bar: "AI Assistant" + minimize button. Messages area: scrollable. Input bar: text input + send button.

  ------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Conversation flow**   Bot initiates: "Hi! I can help you figure out if we're a good fit. What kind of project are you thinking about?" Then asks structured questions: (1) Project type (data/ML/LLM/analytics), (2) Do you have data?, (3) Current tools you use, (4) Timeline urgency, (5) Budget range. After qualifying: "Thanks! Based on what you've told me, \[service recommendation\]. Want to book a meeting or get a quote?"

  ----------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Data capture**    After the conversation, bot pushes a structured JSON object to Supabase: { name, project_type, has_data, current_tools, urgency, budget, recommended_service, full_transcript }. Also triggers a Slack notification with a summary.

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **RAG knowledge base**   Bot has RAG access over our service descriptions, pricing info, and FAQ. Can answer questions like "How long does an ML project take?" or "What's included in data analysis?" without hallucinating.

  ------------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Guardrails**      Bot stays on-topic (our services only). Off-topic questions get: "I'm focused on helping with AI and data projects. For other questions, please email us." Prompt injection attempts get a generic safe response.

  ------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**3. COMPONENT INVENTORY**

Every reusable UI component the Frontend Agent needs to build, with exact specs.

  -----------------------------------------------------------------------
  **ServiceCard**

  -----------------------------------------------------------------------

  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       icon, title, description, href

  **Spec**        White bg, 1px border (border-default: #E2E8F0), rounded-xl, soft shadow (0 2px 12px rgba(0,0,0,0.04)), p-6. Icon (24px SVG), H3 title (Satoshi Medium 20px), description (General Sans 14px, text-secondary), "Learn more →" link. Hover: lift -4px, border glow.
  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **CaseStudyCard**

  -----------------------------------------------------------------------

  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       image, title, client, problem, result, tag

  **Spec**        White bg, rounded-xl, overflow hidden, soft shadow. Image top (aspect 16:9, light overlay). Content: tag badge (pill, accent-blue bg), title (20px bold), client type (14px muted), result metric (18px, accent-teal). Hover: image scale 1.02.
  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **CTAButton (filled)**

  -----------------------------------------------------------------------

  --------------- -------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       label, href, variant

  **Spec**        bg accent-blue, text white, rounded-full, px-6 py-3, font-medium 15px. Hover: brightness 110%. Active: scale 0.98. Disabled: opacity 0.5.
  --------------- -------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **CTAButton (ghost)**

  -----------------------------------------------------------------------

  --------------- --------------------------------------------------------------------------------------------------------------
  **Props**       label, href, variant

  **Spec**        bg transparent, 1px border accent-blue, text accent-blue, rounded-full, px-6 py-3. Hover: bg accent-blue/10.
  --------------- --------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Navbar**

  -----------------------------------------------------------------------

  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       links, cta

  **Spec**        Sticky top, h-16, bg transparent initially, white/90 + backdrop-blur-lg + border-bottom border-default on scroll. Logo left, links center (desktop) or hamburger menu (mobile), CTA button right. Z-index 50.
  --------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **SectionHeader**

  -----------------------------------------------------------------------

  --------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       label, title, description

  **Spec**        Centered layout. Label: uppercase, 13px, accent-blue, tracking +0.08em. Title: Satoshi Bold 40px, max-w-2xl. Description: General Sans 18px, text-secondary, max-w-xl. Spacing: label mb-3, title mb-4, desc mb-0.
  --------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **TechBadge**

  -----------------------------------------------------------------------

  --------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       icon, label

  **Spec**        Inline-flex, bg bg-tertiary (#DBEAFE), rounded-md, px-3 py-1.5, gap-2. Icon (16px), label (JetBrains Mono 13px, text-secondary). Used in tech stack sections and case studies.
  --------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **StatCard**

  -----------------------------------------------------------------------

  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       number, label

  **Spec**        White bg, rounded-xl, 1px border border-default, p-6 text-center. Soft shadow. Number: Satoshi Bold 40px, text-primary. Label: General Sans 14px, text-secondary. Used in social proof section.
  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **ProcessStep**

  -----------------------------------------------------------------------

  --------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       number, title, description

  **Spec**        Horizontal flex (vertical on mobile). Number: 48px circle, bg accent-blue/10, text accent-blue, Satoshi Bold 20px. Title: 18px bold. Description: 14px, text-secondary. Connected by dashed line between steps.
  --------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **ChatWidget**

  -----------------------------------------------------------------------

  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       isOpen, onToggle

  **Spec**        Fixed bottom-right, z-50. Closed: 56px circle, accent-blue (#2563EB), pulse animation. Open: 400x520px panel, white bg, rounded-2xl, shadow-2xl. Header: 48px, "AI Assistant" + close btn. Messages: scrollable area. Input: fixed bottom, text input + send btn.
  --------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **Footer**

  -----------------------------------------------------------------------

  --------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Props**       links, socials

  **Spec**        bg-secondary (#F0F7FF), border-t border-default. 4 columns: logo+tagline, services links, company links, contact. Bottom bar: copyright + social icons. py-16, max-w-6xl mx-auto.
  --------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4. TECHNICAL ARCHITECTURE**

  --------------------- ----------------------------------------------------------------- -------------------------------------------------------------------------------------------------
  **Layer**             **Technology**                                                    **Justification**

  **Framework**         Next.js 15 (App Router)                                           SSR for SEO, API routes for forms/webhooks, Vercel-native deployment

  **Styling**           Tailwind CSS v4 + Shadcn/UI                                       Utility-first CSS, light/dark mode support, accessible components out of the box

  **Fonts**             Satoshi (display) + General Sans (body) + JetBrains Mono (code)   All from fontshare.com (free, commercial use). Self-hosted via next/font for performance.

  **Animations**        Framer Motion                                                     Page transitions, scroll-triggered reveals, staggered children. Tree-shakeable.

  **Booking**           Cal.com (embed + webhooks)                                        Free tier, React embed, Google Calendar sync, webhook on BOOKING_CREATED

  **Chatbot backend**   Vercel AI SDK + LangChain + ChromaDB                              Streaming responses, RAG over service docs, structured output for lead qualification

  **Database**          Supabase (PostgreSQL)                                             Leads table, quote requests, chat logs, booking logs. Row-level security. Free tier.

  **Email**             Resend                                                            Booking confirmations, quote request notifications. 100 emails/day free. React email templates.

  **Analytics**         Plausible or Vercel Analytics                                     Privacy-friendly, no cookie banner. Track page views, top sources, conversion events.

  **Hosting**           Vercel (Hobby plan)                                               Zero-config deploy from GitHub. Preview URLs per PR. CDN, SSL, custom domain. Free.

  **Notifications**     Slack incoming webhooks                                           Instant alert on: new booking, new quote request, chatbot lead qualification.
  --------------------- ----------------------------------------------------------------- -------------------------------------------------------------------------------------------------

**4.1 API Routes (Next.js)**

  ---------------------- ------------- ---------------------------------------------------------------------------------------------------
  **Route**              **Method**    **Purpose**

  /api/quote             **POST**      Receives quote form submission. Validates, saves to Supabase, sends Slack + email notification.

  /api/chat              **POST**      Handles chatbot messages. Streams AI response via Vercel AI SDK. RAG retrieval from ChromaDB.

  /api/chat/lead         **POST**      Saves qualified lead from chatbot. Structured JSON to Supabase. Triggers Slack notification.

  /api/webhooks/calcom   **POST**      Cal.com booking webhook. Verifies signature, saves booking to Supabase, sends Slack notification.
  ---------------------- ------------- ---------------------------------------------------------------------------------------------------

**5. RESPONSIVE DESIGN**

  ---------------- ---------------- ----------------------------------------------------------------------------------------------------------------
  **Breakpoint**   **Width**        **Key Changes**

  **Mobile**       \< 640px         Single column. Hamburger nav. Stacked service cards. Full-width forms. Chat widget 100% width. Hero text 36px.

  **Tablet**       640--1024px      2-column service grid. Booking page still stacked. Chat widget 360px. Navbar shows links (no hamburger).

  **Desktop**      1024--1280px     Full layout. 2x2 service grid. Side-by-side booking page. 3-column portfolio. Chat widget 400px.

  **Wide**         \> 1280px        Max-width container (1200px). Centered. Extra whitespace on sides. Hero text 72px. Generous spacing.
  ---------------- ---------------- ----------------------------------------------------------------------------------------------------------------

**6. SEO & PERFORMANCE TARGETS**

  -------------------------- ----------------------- --------------------------------------------------------------------------------------------------------
  **Metric**                 **Target**              **How**

  Lighthouse Performance     **\> 90**               Static generation for content pages, dynamic imports for chatbot, optimized images via next/image

  Lighthouse Accessibility   **\> 90**               WCAG AA contrast ratios, semantic HTML, ARIA labels, keyboard navigation, focus indicators

  Lighthouse SEO             **\> 95**               Meta titles/descriptions per page, Open Graph tags, sitemap.xml, robots.txt, structured data (JSON-LD)

  First Contentful Paint     **\< 1.2s**             Font preloading, critical CSS inline, above-the-fold SSR

  Cumulative Layout Shift    **\< 0.1**              Explicit image dimensions, font-display: swap, no layout-shifting ads or embeds

  Total page weight          **\< 500KB initial**    Code splitting, lazy-loaded below-fold sections, compressed assets, no unused JS
  -------------------------- ----------------------- --------------------------------------------------------------------------------------------------------

**7. ACCEPTANCE CRITERIA**

The website is done when ALL of the following are true:

  ------- ---------------------------------------------------------------------------------------------------
  **1**   All 7 page types are live: Home, 4 Service pages, Portfolio, Book a Meeting, Contact/Quote, About

  ------- ---------------------------------------------------------------------------------------------------

  ------- ------------------------------------------------------------------------------------------------------------------------------------------
  **2**   Cal.com booking flow works end-to-end: select slot → fill form → confirmation → appears in Google Calendar → Slack notification received

  ------- ------------------------------------------------------------------------------------------------------------------------------------------

  ------- -------------------------------------------------------------------------------------------------------------------------------------------------
  **3**   Quote request form submits correctly: data appears in Supabase leads table + Slack notification received + confirmation email sent to submitter

  ------- -------------------------------------------------------------------------------------------------------------------------------------------------

  ------- ------------------------------------------------------------------------------------------------------------------------------
  **4**   AI chatbot qualifies a lead through a full conversation and pushes structured data to Supabase + triggers Slack notification

  ------- ------------------------------------------------------------------------------------------------------------------------------

  ------- -----------------------------------------------------------------------------------
  **5**   Lighthouse scores: Performance \> 90, Accessibility \> 90, SEO \> 95 on all pages

  ------- -----------------------------------------------------------------------------------

  ------- ---------------------------------------------------------------------------------------------------
  **6**   Mobile responsive: all pages render correctly on iPhone SE, iPhone 14, iPad, and a 1920px desktop

  ------- ---------------------------------------------------------------------------------------------------

  ------- ------------------------------------------------------------------------------------------
  **7**   Cross-browser: tested on Chrome, Firefox, and Safari with no visual or functional issues

  ------- ------------------------------------------------------------------------------------------

  ------- --------------------------------------------------------------------------------------------------------------------------------------------
  **8**   Security: no exposed environment variables, all API routes validate input, chatbot has prompt injection guardrails, dependency audit clean

  ------- --------------------------------------------------------------------------------------------------------------------------------------------

  ------- -----------------------------------------------------------------------------------
  **9**   All images optimized via next/image. No image larger than 200KB after compression

  ------- -----------------------------------------------------------------------------------

  -------- ------------------------------------------------------------------------------------------------
  **10**   Analytics tracking: Plausible or Vercel Analytics installed and reporting page views correctly

  -------- ------------------------------------------------------------------------------------------------

  -------- -----------------------------------------------------------------------------------------------------------
  **11**   2--3 case studies populated (can be mock/template data initially) with proper formatting and service tags

  -------- -----------------------------------------------------------------------------------------------------------

  -------- -------------------------------------------------------------------------------------------------------
  **12**   Site deployed to production domain on Vercel with SSL, custom domain configured, preview URLs working

  -------- -------------------------------------------------------------------------------------------------------
