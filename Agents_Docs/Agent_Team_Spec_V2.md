**AGENT TEAM**

**SPECIFICATION V2**

*15 Agents • Agile Framework • MCP Servers • Pre/Post Hooks*

*Skills • Tools • Communication Flow • Website Project Plan*

Charles Shalua \| AI-Powered Freelancing Firm \| March 2026

**1. FIRM OVERVIEW & AGILE FRAMEWORK**

The firm operates on Upwork, Fiverr, and our website (the storefront). We follow Agile with 1-week sprints. Every project is broken into sprints, each sprint has a planning session, daily standups (automated by Secretary Agent), a review, and a retrospective.

**1.1 Service Lines**

  ------------------------- ------------------------------------------------------------------ --------------------------------------------------------------------
  **Service**               **Client Gets**                                                    **Deliverables**

  **Data Analysis**         Dashboards, reports, pipelines that turn raw data into decisions   Cleaned datasets, dashboards, automated reports, insight summaries

  **Augmented Analytics**   AI layers on BI tools that surface insights humans miss            NL query interfaces, anomaly detection, AI-generated KPI summaries

  **ML Applications**       Prediction, classification, recommendation engines as APIs         Models, APIs, model cards, monitoring, retraining pipelines

  **LLM Bots**              Custom chatbots, RAG systems, AI assistants for workflows          RAG pipelines, chat UIs, prompt libraries, eval reports
  ------------------------- ------------------------------------------------------------------ --------------------------------------------------------------------

**1.2 Agile Sprint Structure**

+---------------------------------------------------------------------------+--------------------------------------------------------------------------+-------------------------------------------------------------------------------+--------------------------------------------------------+--------------------------------------------------------------------------------------------+
| **SPRINT PLANNING**                                                       | **DAILY STANDUP**                                                        | **EXECUTION**                                                                 | **SPRINT REVIEW**                                      | **RETRO**                                                                                  |
|                                                                           |                                                                          |                                                                               |                                                        |                                                                                            |
| Secretary Agent briefs you on scope. Orchestrator creates sprint backlog. | Secretary Agent auto-generates daily status: done, in progress, blocked. | Agents work tasks. Observer reviews progress and suggests course corrections. | Observer gives full sprint review. You demo to client. | Observer identifies what worked, what failed, what to change. Memory Agent logs learnings. |
+---------------------------------------------------------------------------+--------------------------------------------------------------------------+-------------------------------------------------------------------------------+--------------------------------------------------------+--------------------------------------------------------------------------------------------+

**2. COMPLETE AGENT ROSTER --- 15 AGENTS**

+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **TEAM STRUCTURE**                                                                                                                                                                                                                                                                                |
|                                                                                                                                                                                                                                                                                                   |
| 9 execution agents (Orchestrator, Research, Data, ML, LLM, Frontend, Backend, QA, Docs) + 6 support agents (Prompt Rewriter, Document Manager, Memory Keeper, Security Engineer, Observer, Secretary). The Orchestrator coordinates execution agents. Support agents operate across all projects. |
+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

  -------- ----------------------- ------------- ------------------------------------------------------------------------------------------------------
  **\#**   **Agent**               **Type**      **One-Line Role**

  01       **Orchestrator**        Execution     Decomposes briefs, assigns tasks, tracks progress, enforces quality gates

  02       **Research Agent**      Execution     Investigates tech choices, APIs, algorithms, competitors before code starts

  03       **Data Agent**          Execution     Ingests, cleans, transforms, validates data and builds pipelines

  04       **ML Agent**            Execution     Trains, evaluates, optimizes ML models from baseline to production

  05       **LLM Agent**           Execution     Builds RAG pipelines, chatbots, prompt chains, and LLM integrations

  06       **Frontend Agent**      Execution     Builds websites, dashboards, chat UIs, and data visualization interfaces

  07       **Backend Agent**       Execution     Builds APIs, containers, CI/CD, infrastructure, and deployment configs

  08       **QA Agent**            Execution     Tests code, models, APIs, UI, security; last gate before your review

  09       **Docs Agent**          Execution     Writes API docs, user guides, model cards, architecture diagrams, handoff packages

  **10**   **Prompt Rewriter**     **Support**   Rewrites your raw prompts into clear, structured, context-rich instructions before sending to agents

  **11**   **Document Manager**    **Support**   Maintains all project documents: versioning, organization, retrieval, archival

  **12**   **Memory Keeper**       **Support**   Maintains long-term project memory: decisions, context, lessons learned, client preferences

  **13**   **Security Engineer**   **Support**   Audits code, configs, and infrastructure for vulnerabilities, secrets, and compliance

  **14**   **Observer**            **Support**   Reviews project direction, gives strategic suggestions, runs sprint reviews and retrospectives

  **15**   **Secretary**           **Support**   Generates project start/stop briefs, daily standups, sprint summaries for you
  -------- ----------------------- ------------- ------------------------------------------------------------------------------------------------------

  -----------------------------------------------------------------------
  **AGENT 10: PROMPT REWRITER --- Prompt Engineer**

  -----------------------------------------------------------------------

**ROLE**

Sits between you and the Orchestrator. Every raw instruction you write passes through this agent first. It rewrites your prompt to be clear, structured, complete, and optimized for the receiving agent --- adding missing context, specifying output format, and removing ambiguity.

**SKILLS**

> **• Prompt structuring** --- convert vague instructions into structured, role-based prompts with clear deliverables
>
> **• Context injection** --- pull relevant project context from Memory Keeper and attach to prompt
>
> **• Ambiguity detection** --- flag unclear requirements and add clarifying constraints
>
> **• Agent-aware formatting** --- tailor prompt style to the receiving agent (code-focused for Backend, data-focused for Data Agent, etc.)
>
> **• Output specification** --- add explicit format, length, and quality requirements to every prompt

**TOOLS**

  ----------------------------- -------------------------------------------------------------------
  **Custom prompt templates**   per-agent and per-service-line prompt structures

  **Memory Keeper API**         read project context, client preferences, past decisions

  **LiteLLM**                   use a fast model (Claude Haiku / GPT-4o-mini) for rewriting speed
  ----------------------------- -------------------------------------------------------------------

**PRE-HOOKS (Before Agent Starts)**

> 1\. Receive raw prompt from you (typed in natural language, can be messy)
>
> 2\. Fetch current project context from Memory Keeper (client name, tech stack, sprint goals)
>
> 3\. Identify the target agent(s) that will receive the rewritten prompt
>
> 4\. Load the prompt template for that agent type

**POST-HOOKS (After Agent Completes)**

> 1\. Show you the rewritten prompt for approval before sending (optional --- can auto-send for routine tasks)
>
> 2\. Log the original and rewritten prompts to Document Manager for audit trail
>
> 3\. Forward approved prompt to Orchestrator for task assignment
>
> 4\. Track prompt quality: did the receiving agent ask for clarification? If yes, improve template.

**MCP SERVERS**

  ---------------------- --------------------------------------------------------------
  **None required**      operates on internal prompt templates and Memory Keeper data

  ---------------------- --------------------------------------------------------------

  -----------------------------------------------------------------------
  **AGENT 11: DOCUMENT MANAGER --- Documentation Controller**

  -----------------------------------------------------------------------

**ROLE**

Owns the file system of every project. Maintains version control for all documents, organizes files into a standard structure, handles document retrieval, and ensures nothing gets lost between sprints.

**SKILLS**

> **• Version control** --- track all document versions with timestamps and change descriptions
>
> **• File organization** --- enforce standard directory structure across all projects
>
> **• Document retrieval** --- find and serve any document instantly when any agent or you requests it
>
> **• Archival** --- move completed project documents to long-term storage with proper indexing
>
> **• Template management** --- maintain reusable templates for proposals, reports, model cards, handoff packages
>
> **• Conflict resolution** --- detect when two agents modify the same document and merge changes

**TOOLS**

  ------------------------------- ------------------------------------------------------
  **Git**                         version control for all project documents and code

  **GitHub API**                  repository management, branch operations, PR merging

  **Notion API**                  client-facing document management

  **Pandoc**                      document format conversion (markdown, PDF, DOCX)

  **S3 / Google Cloud Storage**   long-term document archival
  ------------------------------- ------------------------------------------------------

**PRE-HOOKS (Before Agent Starts)**

> 1\. When a new project starts: create standard directory structure from template
>
> 2\. Register all document types expected for this service line (e.g., ML project needs model card, API docs, etc.)
>
> 3\. Set up Git repo with branching strategy (main, develop, feature branches per agent)
>
> 4\. Create document checklist that tracks completeness throughout the project

**POST-HOOKS (After Agent Completes)**

> 1\. After each sprint: verify all expected documents are present and up-to-date
>
> 2\. Run link checker on all documentation (no broken references)
>
> 3\. Generate document inventory report for Secretary Agent's sprint summary
>
> 4\. On project completion: bundle all docs into final delivery package and archive

**MCP SERVERS**

  ---------------------- -----------------------------------------------------
  **GitHub MCP**         repo management, file operations, PR management

  **Google Drive MCP**   client-shared document storage and collaboration

  **Markdownify MCP**    convert various formats to markdown for consistency
  ---------------------- -----------------------------------------------------

  -----------------------------------------------------------------------
  **AGENT 12: MEMORY KEEPER --- Context & Knowledge Manager**

  -----------------------------------------------------------------------

**ROLE**

Maintains long-term memory across all projects. Stores decisions, client preferences, technical choices, lessons learned, and reusable patterns. Any agent can query this agent to recall past context. Prevents repeated mistakes and reinventing solutions.

**SKILLS**

> **• Context storage** --- store structured records: decisions (what, why, when, who), client preferences, tech choices
>
> **• Semantic retrieval** --- answer natural-language queries like "what database did we use for the last e-commerce project?"
>
> **• Pattern recognition** --- identify reusable patterns across projects (similar client types, repeated tech stacks)
>
> **• Lesson logging** --- capture retrospective learnings and attach them to searchable tags
>
> **• Client profiling** --- maintain a living profile per client: preferences, communication style, budget patterns
>
> **• Knowledge graph** --- build relationships between projects, technologies, clients, and outcomes

**TOOLS**

  -------------------------------------- ---------------------------------------------------------------------
  **ChromaDB / Pinecone**                vector store for semantic search across memories

  **PostgreSQL**                         structured storage for decisions, client profiles, project metadata

  **LangChain memory modules**           conversation and entity memory for within-project context

  **Embedding model (OpenAI / local)**   encode memories for retrieval
  -------------------------------------- ---------------------------------------------------------------------

**PRE-HOOKS (Before Agent Starts)**

> 1\. At project start: load all relevant memories (same client? same service line? similar problem?)
>
> 2\. Provide Prompt Rewriter with context so prompts are enriched with past learnings
>
> 3\. Surface any past decisions that might conflict with current project requirements
>
> 4\. Load client profile if returning client (preferences, past feedback, budget history)

**POST-HOOKS (After Agent Completes)**

> 1\. After each sprint: extract and store key decisions, blockers encountered, solutions found
>
> 2\. After retrospective: log lessons learned with tags (tech, process, client-management)
>
> 3\. After project completion: update client profile with outcome, satisfaction, and notes
>
> 4\. Prune stale memories (outdated tech decisions older than 12 months get flagged for review)

**MCP SERVERS**

  ---------------------- ------------------------------------------------
  **PostgreSQL MCP**     structured memory storage and retrieval

  ---------------------- ------------------------------------------------

  -----------------------------------------------------------------------
  **AGENT 13: SECURITY ENGINEER --- Security & Compliance Auditor**

  -----------------------------------------------------------------------

**ROLE**

Audits all code, configurations, infrastructure, and data handling for security vulnerabilities. Scans for exposed secrets, dependency vulnerabilities, insecure configurations, and compliance issues. Runs before every deployment.

**SKILLS**

> **• Code security scanning** --- static analysis for SQL injection, XSS, command injection, insecure deserialization
>
> **• Secret detection** --- scan repos for accidentally committed API keys, passwords, tokens
>
> **• Dependency auditing** --- check for known vulnerabilities in all project dependencies
>
> **• Infrastructure security** --- review Docker configs, cloud permissions, network exposure
>
> **• Data privacy** --- verify PII handling, encryption at rest/transit, GDPR/PIPEDA compliance basics
>
> **• Penetration testing basics** --- automated endpoint testing for common attack vectors

**TOOLS**

  ----------------------------- -------------------------------------------------
  **Bandit**                    Python security scanner (static analysis)

  **Gitleaks / TruffleHog**     secret detection in Git repositories

  **npm audit / pip-audit**     dependency vulnerability scanning

  **OWASP ZAP (lightweight)**   automated web application security testing

  **Trivy**                     container and filesystem vulnerability scanning

  **Checkov**                   infrastructure-as-code security scanning
  ----------------------------- -------------------------------------------------

**PRE-HOOKS (Before Agent Starts)**

> 1\. Load security checklist for the project type (web app, API, ML model, data pipeline)
>
> 2\. Scan all environment files and configs for hardcoded secrets before any deployment
>
> 3\. Verify .gitignore includes all sensitive file patterns (.env, credentials, keys)
>
> 4\. Check that all API endpoints require authentication (no accidental public endpoints)

**POST-HOOKS (After Agent Completes)**

> 1\. Generate security audit report: critical/high/medium/low vulnerability counts
>
> 2\. Block deployment if any critical or high vulnerabilities are found (hard gate)
>
> 3\. File security tickets in GitHub Issues for medium/low issues (assigned to Backend Agent)
>
> 4\. Log audit results to Document Manager for compliance records
>
> 5\. Notify Orchestrator: deploy-approved or deploy-blocked with details

**MCP SERVERS**

  ---------------------- --------------------------------------------------------------------
  **GitHub MCP**         scan repos, file security issues, review PRs for security concerns

  **Docker MCP**         inspect container configurations for security misconfigurations
  ---------------------- --------------------------------------------------------------------

  -----------------------------------------------------------------------
  **AGENT 14: OBSERVER --- Strategic Reviewer & Sprint Coach**

  -----------------------------------------------------------------------

**ROLE**

Watches the entire project from above. Reviews agent outputs for strategic alignment (not just correctness). Runs sprint reviews and retrospectives. Suggests course corrections: "this approach will cause problems in 2 sprints" or "the client asked for X but we're building Y."

**SKILLS**

> **• Strategic review** --- assess whether work aligns with client goals, not just technical specs
>
> **• Risk identification** --- spot potential issues before they become blockers (scope creep, tech debt, timeline risk)
>
> **• Quality assessment** --- evaluate outputs beyond pass/fail: is the code maintainable? Is the UX intuitive?
>
> **• Sprint facilitation** --- run structured sprint reviews and retrospectives with actionable takeaways
>
> **• Trade-off analysis** --- when two valid approaches exist, lay out pros/cons and recommend one
>
> **• Client alignment check** --- continuously verify that what we're building matches what the client expects

**TOOLS**

  -------------------------- ----------------------------------------------------------------
  **Project state reader**   read-only access to Orchestrator's shared project state

  **Memory Keeper API**      access past project patterns and lessons to inform suggestions

  **LLM (Claude / GPT-4)**   analyze code and outputs for strategic issues, not just bugs
  -------------------------- ----------------------------------------------------------------

**PRE-HOOKS (Before Agent Starts)**

> 1\. At sprint start: review sprint goals against client requirements (are we building the right thing?)
>
> 2\. Flag any tasks that seem misaligned with project objectives
>
> 3\. Load relevant past project retrospective learnings from Memory Keeper
>
> 4\. Set review checkpoints: what should be reviewed mid-sprint vs. end-of-sprint

**POST-HOOKS (After Agent Completes)**

> 1\. After each agent completes work: generate strategic review (not QA --- that's QA Agent's job)
>
> 2\. After sprint: run full sprint review with scores on: velocity, quality, alignment, risk level
>
> 3\. Run retrospective: what worked, what didn't, what to change, with specific action items
>
> 4\. Generate improvement suggestions for the next sprint
>
> 5\. Send review report to Secretary Agent for your executive summary

**MCP SERVERS**

  ---------------------- -----------------------------------------------------
  **No dedicated MCP**   reads from existing project state and agent outputs

  ---------------------- -----------------------------------------------------

  -----------------------------------------------------------------------
  **AGENT 15: SECRETARY --- Executive Briefer**

  -----------------------------------------------------------------------

**ROLE**

Your personal briefing agent. Generates concise project start briefs, daily standups, sprint summaries, and project completion reports. You never have to dig through agent outputs --- Secretary gives you a 2-minute read every morning.

**SKILLS**

> **• Start brief generation** --- when a project kicks off: summarize scope, timeline, risks, team assignments in one page
>
> **• Daily standup** --- auto-generate: what was done yesterday, what's planned today, what's blocked
>
> **• Sprint summary** --- at sprint end: progress vs. plan, key decisions made, risks, client-facing status
>
> **• Stop brief generation** --- when a project completes: final summary, deliverables list, lessons learned, next steps
>
> **• Client communication drafts** --- draft status update emails for clients based on current project state
>
> **• Calendar awareness** --- track deadlines, upcoming milestones, scheduled meetings (via Cal.com integration)

**TOOLS**

  ------------------------------- ---------------------------------------------------------------
  **Orchestrator state reader**   read current project status, task completion, blockers

  **Observer reports**            read sprint reviews and retrospective summaries

  **Document Manager**            access document inventory and completeness status

  **Google Calendar API**         read upcoming meetings and deadlines

  **Resend / SendGrid API**       send formatted status emails to you and optionally to clients
  ------------------------------- ---------------------------------------------------------------

**PRE-HOOKS (Before Agent Starts)**

> 1\. At scheduled brief time (e.g., 8am daily): pull all project states from Orchestrator
>
> 2\. Pull yesterday's activity logs from all agents
>
> 3\. Pull upcoming deadlines and meetings from calendar
>
> 4\. Check Observer's latest review for any flags or concerns

**POST-HOOKS (After Agent Completes)**

> 1\. Format brief into a clean, scannable document (short paragraphs, bullet points, color-coded status)
>
> 2\. Deliver brief to you via Slack/Discord notification or email
>
> 3\. Log brief to Document Manager for project history
>
> 4\. If any items are flagged as "critical," send an immediate alert (not just the daily brief)

**MCP SERVERS**

  ------------------------- --------------------------------------------------------------
  **Google Calendar MCP**   read meetings, deadlines, booking confirmations from Cal.com

  **Gmail MCP**             send and read project-related emails

  **Slack MCP**             deliver briefs and alerts to your Slack workspace
  ------------------------- --------------------------------------------------------------

**3. AGENT COMMUNICATION FLOW (WITH SUPPORT AGENTS)**

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **HOW THE NEW AGENTS FIT IN**                                                                                                                                                                                                                                        |
|                                                                                                                                                                                                                                                                      |
| Prompt Rewriter sits BEFORE the Orchestrator (filters your input). Secretary sits AFTER the Orchestrator (filters output to you). Observer watches everything in parallel. Memory Keeper and Document Manager serve all agents. Security Engineer gates deployments. |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

  ------- --------------------------- ---------------------------------------------------------------------------------------------------------------------------
  **1**   **YOU → PROMPT REWRITER**   You type a raw instruction. Prompt Rewriter enriches it with context, structures it, and formats it for the target agent.

  ------- --------------------------- ---------------------------------------------------------------------------------------------------------------------------

  ------- ------------------------------------ ----------------------------------------------------------------------------------------------------
  **2**   **PROMPT REWRITER → ORCHESTRATOR**   Clean, structured prompt arrives. Orchestrator decomposes into sprint tasks and assigns to agents.

  ------- ------------------------------------ ----------------------------------------------------------------------------------------------------

  ------- ----------------------------------- -------------------------------------------------------------------------------------------
  **3**   **ORCHESTRATOR → RESEARCH AGENT**   Research investigates and returns a tech decision brief. You approve before build starts.

  ------- ----------------------------------- -------------------------------------------------------------------------------------------

  ------- ------------------------------- -----------------------------------------------------------------------------
  **4**   **ORCHESTRATOR → DATA AGENT**   Data Agent ingests, cleans, validates. Clean datasets go to shared storage.

  ------- ------------------------------- -----------------------------------------------------------------------------

  ------- ----------------------------------------------- ------------------------------------------------------------------------------------
  **5**   **ORCHESTRATOR → ML + LLM AGENTS (parallel)**   ML trains models; LLM builds RAG/chat features. Both read from Data Agent outputs.

  ------- ----------------------------------------------- ------------------------------------------------------------------------------------

  ------- -------------------------------------------------- -------------------------------------------------------------------------
  **6**   **ORCHESTRATOR → FRONTEND + BACKEND (parallel)**   Frontend builds UI; Backend integrates models/LLM into production APIs.

  ------- -------------------------------------------------- -------------------------------------------------------------------------

  ------- -------------------------------------- --------------------------------------------------------------------------------
  **7**   **ORCHESTRATOR → SECURITY ENGINEER**   Security scans all code, configs, containers. Critical vulns block deployment.

  ------- -------------------------------------- --------------------------------------------------------------------------------

  ------- ----------------------------- ----------------------------------------------------------
  **8**   **ORCHESTRATOR → QA AGENT**   QA tests everything. Pass → proceed. Fail → rework loop.

  ------- ----------------------------- ----------------------------------------------------------

  ------- ------------------------------- -----------------------------------------------------------------------------
  **9**   **ORCHESTRATOR → DOCS AGENT**   Documentation produced. Document Manager versions and organizes everything.

  ------- ------------------------------- -----------------------------------------------------------------------------

  -------- ------------------------------ -------------------------------------------------------------------------------------
  **10**   **OBSERVER → SPRINT REVIEW**   Observer reviews entire sprint: quality, alignment, risks. Generates review report.

  -------- ------------------------------ -------------------------------------------------------------------------------------

  -------- ------------------------ ------------------------------------------------------------------------------------------------------------
  **11**   **SECRETARY → YOU**      Secretary compiles everything into a concise brief: what was done, what's next, what needs your attention.

  -------- ------------------------ ------------------------------------------------------------------------------------------------------------

  -------- -------------------------- ----------------------------------------------------------------------------
  **12**   **MEMORY KEEPER → LOGS**   All decisions, learnings, and client feedback stored for future reference.

  -------- -------------------------- ----------------------------------------------------------------------------

**4. FIRST PROJECT: THE FIRM WEBSITE**

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **PROJECT BRIEF (As Prompt Rewriter Would Structure It)**                                                                                                                                                                                                                                                                                                                                                                  |
|                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Build a professional website for our AI freelancing firm. The site is our storefront --- it attracts clients from Upwork, Fiverr, and organic search. It must showcase 4 service lines, display case studies, include a meeting booking page (Cal.com), a quote request form, and an AI intake chatbot that qualifies leads. The site itself must demonstrate our capabilities. Simple, fast, credible. Ship in 2 sprints. |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

**4.1 Pages & Features**

  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Page**              **Features**

  **Home**              Hero with value prop + CTA, 4 service cards, social proof section (testimonials/stats), recent work preview, trust signals (Centennial College, tech stack logos)

  **Services (x4)**     One page per service. Problem → Our Approach → Deliverables → Timeline → Pricing Range → CTA (book a meeting or request quote). Each demonstrates domain expertise.

  **Portfolio**         Case study cards: client type, problem, solution, measurable results. Filterable by service line. Start with 2--3 mock case studies; replace with real ones after first clients.

  **Book a Meeting**    Cal.com embedded inline calendar. Visitor selects a 30-min discovery call slot. Fields: name, email, service interest, brief project description. Confirmation email auto-sent. Syncs to your Google Calendar.

  **Contact / Quote**   Structured form: name, email, service line (dropdown), project description, data situation, budget range, timeline. Submissions trigger notification to you via email + Slack.

  **About**             Your story, Centennial College credential, skills, tech stack showcase, mission. Team section placeholder for future hires.

  **AI Intake Bot**     Floating chat widget on all pages. Qualifies leads: project type, data availability, current tools, urgency, budget. Pushes structured lead data to Supabase + email notification.
  --------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4.2 Sprint Plan (Agile --- 2 Sprints of 1 Week Each)**

  -----------------------------------------------------------------------
  **SPRINT 1: Core Site + Structure (Days 1--7)**

  -----------------------------------------------------------------------

  ----------------------- ---------------------------------------------------------------------------------------------------------------- --------------
  **Agent**               **Task**                                                                                                         **Day**

  **Secretary**           Generate project start brief: scope, timeline, agent assignments, risks, acceptance criteria                     **Day 1**

  **Prompt Rewriter**     Rewrite website brief into structured tasks per agent with full context                                          **Day 1**

  **Research Agent**      Analyze 10 competitor AI firm websites. Recommend layout patterns, trust signals, CTA placement, and copy tone   **Day 1**

  **Observer**            Review Research output for strategic alignment. Flag if recommendations miss our positioning                     **Day 1**

  **Frontend Agent**      Build site structure: Home, 4 Service pages, Portfolio, About, Contact form. Responsive + SEO-ready              **Day 2--5**

  **Backend Agent**       Set up Vercel project, contact form API (Resend), Supabase for leads, analytics (Plausible)                      **Day 3--5**

  **Document Manager**    Set up project repo, directory structure, track all assets and content files                                     **Day 2**

  **Security Engineer**   Review initial deployment config: env vars, CORS, CSP headers, no exposed secrets                                **Day 5**

  **QA Agent**            Lighthouse audit, mobile testing, form submission testing, cross-browser check                                   **Day 6**

  **Observer**            Sprint 1 review: Is the site on track? Does it represent us well? Course corrections?                            **Day 7**

  **Secretary**           Sprint 1 summary: what shipped, what carries over, blockers, client readiness status                             **Day 7**
  ----------------------- ---------------------------------------------------------------------------------------------------------------- --------------

  -----------------------------------------------------------------------
  **SPRINT 2: Booking Page + AI Bot + Polish (Days 8--14)**

  -----------------------------------------------------------------------

  ----------------------- ---------------------------------------------------------------------------------------------------------------------- ----------------
  **Agent**               **Task**                                                                                                               **Day**

  **Secretary**           Sprint 2 start brief: carryover items, sprint goals, key risks                                                         **Day 8**

  **Frontend Agent**      Build Book a Meeting page: Cal.com inline embed, custom styling, mobile-optimized. Add to navbar.                      **Day 8--9**

  **LLM Agent**           Build AI intake chatbot: RAG over our service descriptions, lead qualification flow, structured output to Supabase     **Day 8--11**

  **Frontend Agent**      Integrate chatbot as floating widget on all pages. Polish all pages: animations, transitions, copy refinement          **Day 10--11**

  **Backend Agent**       Cal.com webhook integration (new booking → Slack notification + Supabase log). Chatbot API endpoint.                   **Day 9--11**

  **Docs Agent**          Write all site copy: service descriptions, About page, case study templates. SEO meta descriptions per page.           **Day 9--11**

  **Security Engineer**   Full security audit: chatbot prompt injection tests, form validation, dependency scan, SSL verification                **Day 12**

  **QA Agent**            Full site test: booking flow, chatbot edge cases, form submissions, Lighthouse \> 90, a11y check                       **Day 12--13**

  **Memory Keeper**       Log all tech decisions, design choices, and content patterns for reuse on client projects                              **Day 13**

  **Observer**            Final project review: does the site make us look credible? Would you hire us? Specific improvement suggestions.        **Day 13**

  **Secretary**           Project stop brief: what shipped, final metrics (Lighthouse scores, pages live), next steps (Upwork/Fiverr profiles)   **Day 14**
  ----------------------- ---------------------------------------------------------------------------------------------------------------------- ----------------

**4.3 Tech Stack for the Website**

  ------------------- -------------------------------------- ----------------------------------------------------------------------------------------
  **Layer**           **Technology**                         **Why**

  **Framework**       Next.js 15 (App Router)                SSR for SEO, API routes, Vercel-native, fast static pages

  **Styling**         Tailwind CSS + Shadcn/UI               Rapid dev, consistent design, accessible components

  **Booking**         Cal.com (embed + webhooks)             Free tier, open source, embeds inline, syncs Google Calendar, webhook on booking

  **Chatbot**         LangChain + Vercel AI SDK + ChromaDB   Proves our LLM capability to visitors, qualifies leads automatically

  **Database**        Supabase (Postgres)                    Stores leads, bookings, chatbot logs. Generous free tier.

  **Email**           Resend                                 100 emails/day free, great API, transactional emails for forms + booking confirmations

  **Analytics**       Plausible                              Privacy-friendly, no cookie banner, lightweight, visitor insights

  **Hosting**         Vercel                                 Free tier, preview deploys, CDN, zero-config SSL, domain custom

  **Notifications**   Slack webhooks                         Instant alerts when someone books, submits a quote, or chats
  ------------------- -------------------------------------- ----------------------------------------------------------------------------------------

**4.4 Cal.com Booking Integration**

The Book a Meeting page uses Cal.com's inline embed. Visitors select a time slot, fill in their details, and the booking syncs to your Google Calendar. A webhook fires on each booking, which Backend Agent routes to Supabase (lead log) and Slack (notification).

  -------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------
  **Setup Step**                   **Details**

  **1. Create Cal.com account**    Sign up at cal.com (free tier). Create a "Discovery Call" event type: 30 minutes, your availability.

  **2. Connect Google Calendar**   In Cal.com settings, connect your Google Calendar so bookings auto-appear and conflicts are avoided.

  **3. Get embed code**            Dashboard → Event Type → Share → Embed. Choose "Inline" format. Copy the React snippet or use \@calcom/embed-react.

  **4. Embed in Next.js**          Frontend Agent creates a /book page with the Cal.com inline component. Style it to match site design. Mobile-responsive.

  **5. Set up webhook**            Cal.com → Settings → Developer → Webhooks. Point to your /api/webhooks/calcom endpoint. Triggers on BOOKING_CREATED.

  **6. Backend handler**           Backend Agent builds the webhook handler: verify signature, save to Supabase (leads table), send Slack notification with booker details.
  -------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------
