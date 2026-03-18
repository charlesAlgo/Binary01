




**PROJECT BRIEF**
**Fashion Boutique Retail Analytics**
Projects 1 & 2: Data Analysis Dashboard + Augmented Analytics
Prepared for: Agent Execution Team
Client: Charles Shalua | DataLife AI Freelancing Firm
Date: March 2026 | Domain: Retail Fashion


# Table of Contents

# 1. Executive Summary
This brief covers two portfolio projects built from a single retail fashion dataset (2,176 transactions from a multi-brand fashion boutique). Both projects demonstrate DataLife's ability to turn raw retail data into actionable business intelligence.


# 2. Data Profile
The dataset represents 12 months of transaction records (August 2024 – August 2025) from a mid-market fashion boutique carrying 8 brands across 6 product categories.

## 2.1 Dataset Overview

## 2.2 Column Definitions

## 2.3 Data Quality Issues to Address
491 null values in size column (402 are Accessories which legitimately have no size — 89 are data entry gaps in other categories)
362 null values in customer_rating (16.6% of records — need strategy: drop, impute, or flag)
Date distribution is heavily skewed: 1,647 of 2,176 records (75.7%) fall on August 2025 alone — remaining months average ~42 records each
43 items show stock_quantity = 0 (out of stock) — these need flagging for inventory analysis
118 items have both high markdown (>30%) AND low rating (<2.5) — potential dead inventory signal

## 2.4 Key Data Distributions
### Revenue by Category

### Return Rate by Brand

### Revenue Lost to Markdowns by Category

# 3. Project 1: Fashion Boutique Sales Dashboard
## 3.1 Fictional Client Scenario
Client: Luxe & Thread Boutique, a mid-market fashion retailer operating 3 physical stores and an online shop. They carry 8 brands across 6 categories and have been tracking sales in spreadsheets for the past year. They want to understand which products, brands, and seasons drive revenue and where they are losing money to markdowns and returns. They have no existing BI tools.

## 3.2 Business Problems to Solve
**The dashboard must answer these specific business questions:**

### Revenue & Sales Performance
What is total revenue by month, and what is the trend over 12 months?
Which categories generate the most revenue? Which are underperforming?
Which brands are the top revenue drivers vs. bottom performers?
How does seasonal demand shift across categories? (Spring/Summer vs. Fall/Winter)
What is the average transaction value by category and brand?

### Markdown & Pricing Analysis
How much revenue is lost to markdowns per category and brand?
What is the average markdown percentage by category? Which categories are over-discounted?
Are markdowns correlated with low customer ratings? (i.e., are we discounting because product quality is poor?)
Which specific products have both high markdowns AND low ratings? (dead inventory candidates)
What would revenue look like if markdown rates were reduced by 10%? (scenario modeling)

### Returns Analysis
What is the return rate by category, brand, season, and size?
What are the top return reasons? How do they differ by category?
Which brand has the worst return rate and why? (Ann Taylor at 19.8% needs investigation)
What is the financial impact of returns? (revenue lost to returned items)
Are certain sizes returned more than others? (sizing issue signal)

### Inventory & Stock
Which items are out of stock? What categories/brands are most affected?
What is the average stock level by category? Are we overstocking low-performers?
Is there a correlation between stock levels and markdown percentage? (overstocked = over-discounted?)

### Customer Satisfaction
What is the average customer rating by brand, category, and season?
Which brands have the highest and lowest satisfaction?
Is there a relationship between price point and customer rating?
Are returned items rated lower than non-returned items?

## 3.3 Required Dashboard Views
The dashboard must include these specific views/pages:


## 3.4 Deliverables Checklist

## 3.5 Technical Requirements

# 4. Project 2: Fashion Boutique NL Analytics Assistant
## 4.1 Fictional Client Scenario (Continuation)
Same client: Luxe & Thread Boutique. After receiving the dashboard (Project 1), the client wants their team to be able to ask questions about the data in plain English without needing to understand charts or filters. They also want automatic alerts when something unusual happens in the data, and weekly AI-generated KPI summaries they can share with their store managers.

## 4.2 Business Problems to Solve
**The NL assistant must handle these query types:**

### Natural Language Queries
"What were our top 5 selling brands last quarter?"
"Show me return rates for Outerwear by brand"
"Which products have both high markdowns and low ratings?"
"Compare summer vs. winter revenue for Dresses"
"What is the average customer rating for Zara products?"
"How much money did we lose to markdowns on Shoes?"
"List all out-of-stock items by category"
"What percentage of Ann Taylor products were returned?"

### Anomaly Detection
Detect categories with return rates significantly above the overall average (14.7%)
Flag brands where average rating dropped below 2.5
Identify products with markdown > 40% that still have high stock (not selling even at discount)
Alert when a category's monthly revenue drops more than 20% vs. prior month
Detect unusual spikes in specific return reasons

### Auto-Generated KPI Summaries
Weekly summary: total revenue, top 3 categories, worst-performing brand, return rate trend, markdown spend
Monthly report: full performance breakdown with recommendations
Tone: written for a non-technical store manager, not a data scientist

## 4.3 Architecture
The system has three components:


## 4.4 NL Query Engine Specification
The query engine works as follows:
User types a question in natural language
System prompt instructs the LLM to translate the question to a Pandas operation
The LLM generates Python code that runs against the cleaned DataFrame
Results are formatted as a text answer + optional Plotly chart
If the query is ambiguous, the system asks a clarifying question
All queries and results are logged for audit

System prompt must include: column definitions, sample values, business context (retail fashion boutique), and instructions to generate safe Pandas code (no file I/O, no system calls, no imports beyond pandas/numpy).

## 4.5 Deliverables Checklist

## 4.6 Technical Requirements

# 5. Acceptance Criteria
## 5.1 Project 1 Acceptance Criteria

## 5.2 Project 2 Acceptance Criteria

# 6. Expected File Structure
The agent team should produce the following directory structure:

**fashion-boutique-analytics/**
├── data/
│   ├── raw/fashion_boutique_dataset.csv
│   ├── cleaned/fashion_boutique_cleaned.csv
│   └── cleaned/fashion_boutique_cleaned.parquet
├── etl/
│   ├── pipeline.py
│   └── tests/test_pipeline.py
├── dashboard/
│   ├── app.py                    (Streamlit dashboard — Project 1)
│   ├── pages/
│   │   ├── 01_executive_summary.py
│   │   ├── 02_category_deep_dive.py
│   │   ├── 03_brand_performance.py
│   │   ├── 04_markdown_pricing.py
│   │   ├── 05_returns_analysis.py
│   │   └── 06_inventory_status.py
│   └── utils/charts.py
├── nl_assistant/
│   ├── app.py                    (Streamlit NL interface — Project 2)
│   ├── query_engine.py
│   ├── anomaly_detector.py
│   ├── kpi_generator.py
│   ├── prompts/system_prompt.md
│   └── logs/query_log.csv
├── reports/
│   ├── insight_report.md
│   ├── kpi_sample_week1.md
│   ├── kpi_sample_week2.md
│   └── kpi_sample_week3.md
├── case_studies/
│   ├── project1_data_analysis.md
│   └── project2_augmented_analytics.md
├── docs/
│   └── data_dictionary.md
├── requirements.txt
└── README.md

# 7. Case Study Template (For Portfolio Website)
Each case study on the DataLife website must follow this exact structure. This is what the client sees.


# 8. Agent Execution Instructions
This section tells each agent exactly what to do with this brief.

## Data Agent
Read the raw CSV from data/raw/
Execute the ETL pipeline: handle nulls (section 2.3), cast types, create derived columns
Output cleaned CSV + Parquet to data/cleaned/
Write data_dictionary.md to docs/
Write unit tests for the pipeline

## Frontend Agent (Dashboard)
Build the 6-view Streamlit dashboard using the cleaned dataset
Implement all charts listed in section 3.3
Add filters per view as specified
Ensure all KPI cards show accurate aggregations
Add a consistent color scheme and professional styling

## LLM Agent (NL Assistant)
Build the query engine (section 4.4): system prompt + LangChain + Groq/OpenAI
Build anomaly detector with rules from section 4.2
Build KPI summary generator
Create the Streamlit chat interface
Generate 3 sample KPI reports
Run 20+ test queries and log results

## Docs Agent
Write the insight report (10 key findings from the data)
Write both case study writeups using the template in section 7
Write the project README

## QA Agent
Validate all acceptance criteria in section 5
Run the ETL pipeline on raw data and verify output matches expected
Test all dashboard filters and chart accuracy
Run the 20 NL test queries and verify 80%+ accuracy
Check code quality: type hints, docstrings, PEP 8

|  | Project 1 | Project 2 |
| --- | --- | --- |
| Project Name | Fashion Boutique Sales Dashboard | Fashion Boutique NL Analytics Assistant |
| Service Line | Data Analysis | Augmented Analytics |
| Deliverables | Interactive dashboard, cleaned dataset, ETL pipeline, insight report | NL query interface, anomaly detection, auto-generated KPI summaries |
| Fictional Client | Luxe & Thread Boutique | Luxe & Thread Boutique (same client, phase 2) |
| Timeline | 1 day build | 1 day build (same day as Project 1) |
| Tech Stack | Python, Pandas, Plotly/Streamlit, Jupyter | LangChain, Groq/OpenAI, Pandas, Streamlit |


| Attribute | Value |
| --- | --- |
| Total Records | 2,176 product transactions |
| Date Range | August 6, 2024 – August 6, 2025 (12 months) |
| File Formats Provided | CSV, XLSX, JSON, SQLite (.db) |
| Total Revenue (at current prices) | $186,047.12 |
| Revenue Lost to Markdowns | $25,460.82 (12.0% of original value) |
| Average Original Price | $97.20 |
| Average Current Price (after markdown) | $85.50 |
| Return Rate | 14.7% (320 items returned) |


| Column | Type | Description | Nulls |
| --- | --- | --- | --- |
| product_id | String | Unique ID (FB000001–FB002176) | 0 |
| category | String | Product category: Accessories, Bottoms, Dresses, Outerwear, Shoes, Tops | 0 |
| brand | String | 8 brands: Zara, Banana Republic, Mango, H&M, Uniqlo, Ann Taylor, Forever21, Gap | 0 |
| season | String | Spring, Summer, Fall, Winter | 0 |
| size | String | XS, S, M, L, XL, XXL (null for Accessories) | 491 |
| color | String | 11 colors including Black, White, Red, Blue, Green, etc. | 0 |
| original_price | Float | Original retail price ($15.14–$249.98) | 0 |
| markdown_percentage | Float | Discount applied (0–59.9%) | 0 |
| current_price | Float | Price after markdown | 0 |
| purchase_date | Date | Transaction date | 0 |
| stock_quantity | Integer | Remaining stock at time of record (0–50) | 0 |
| customer_rating | Float | Customer rating 1.0–5.0 | 362 |
| is_returned | Boolean | Whether item was returned | 0 |
| return_reason | String | Reason: Changed Mind, Size Issue, Quality Issue, Wrong Item, Color Mismatch, Damaged | 1856 |


| Category | Revenue | % of Total | Avg Price |
| --- | --- | --- | --- |
| Outerwear | $48,672.81 | 26.2% | $145.73 |
| Shoes | $41,152.78 | 22.1% | $110.63 |
| Dresses | $31,028.35 | 16.7% | $97.88 |
| Bottoms | $24,079.39 | 12.9% | $61.43 |
| Tops | $23,719.91 | 12.7% | $66.07 |
| Accessories | $17,393.88 | 9.3% | $43.27 |


| Brand | Return Rate | Avg Rating | Products |
| --- | --- | --- | --- |
| Ann Taylor | 19.8% | 3.09 | 257 |
| Banana Republic | 16.5% | 3.01 | 285 |
| Zara | 15.3% | 2.91 | 313 |
| Gap | 14.8% | 3.03 | 244 |
| H&M | 13.8% | 3.04 | 283 |
| Forever21 | 13.6% | 2.97 | 250 |
| Uniqlo | 12.7% | 3.11 | 260 |
| Mango | 11.3% | 2.78 | 284 |


| Category | Markdown Loss | Avg Markdown % | Items Marked Down |
| --- | --- | --- | --- |
| Shoes | $6,208.51 | 13.0% | 150 |
| Outerwear | $5,836.72 | 10.8% | 134 |
| Dresses | $4,622.81 | 13.2% | 128 |
| Bottoms | $3,555.14 | 13.2% | 158 |
| Tops | $2,927.56 | 11.0% | 144 |
| Accessories | $2,310.08 | 11.7% | 164 |


| Dashboard View | Charts/Components | Filters |
| --- | --- | --- |
| Executive Summary | KPI cards (total revenue, avg price, return rate, avg rating), monthly revenue trend line, category revenue pie chart | Date range, season |
| Category Deep Dive | Revenue by category bar chart, return rate by category, markdown % by category, rating distribution by category | Category selector, brand, season |
| Brand Performance | Brand comparison table (revenue, return rate, avg rating, markdown %), brand ranking chart, brand vs. return reason heatmap | Brand selector, category, season |
| Markdown & Pricing | Markdown distribution histogram, revenue lost to markdowns by category, scatter plot (markdown % vs. rating), dead inventory table | Markdown threshold slider, category |
| Returns Analysis | Return rate trend, return reasons breakdown (pie/bar), returns by brand/category/size, return financial impact | Category, brand, return reason |
| Inventory Status | Stock level distribution, out-of-stock alerts, overstock vs. understock by category, stock vs. markdown correlation scatter | Category, stock threshold |


| # | Deliverable | Format | Description |
| --- | --- | --- | --- |
| D1 | Cleaned Dataset | CSV + Parquet | Nulls handled, types cast, outliers flagged, derived columns added (revenue_lost, month, quarter, is_marked_down, rating_band) |
| D2 | ETL Pipeline Script | Python (.py) | Reproducible cleaning + transformation pipeline. Input: raw CSV. Output: analysis-ready dataset. Documented with docstrings. |
| D3 | Interactive Dashboard | Streamlit App | 6-view dashboard with all charts listed above. Filterable, responsive, deployable. |
| D4 | Insight Report | Markdown + PDF | Executive summary of top 10 findings with supporting data. Written for a non-technical boutique owner. |
| D5 | Data Dictionary | Markdown | All original + derived columns documented with types, descriptions, example values. |
| D6 | Case Study Writeup | Markdown | Problem → Approach → Architecture → Results → Tech Stack. Ready for portfolio page. |


| Requirement | Specification |
| --- | --- |
| Language | Python 3.11+ |
| Data Processing | Pandas, NumPy |
| Visualization | Plotly for charts, Streamlit for dashboard framework |
| Data Storage | Cleaned data in CSV + Parquet formats |
| Code Quality | Type hints, docstrings, modular functions, PEP 8 compliant |
| Testing | At least 5 unit tests for ETL pipeline (null handling, type casting, derived columns) |
| Deployment | Streamlit Cloud or local run instructions in README |
| Performance | Dashboard loads in < 3 seconds on full dataset |


| Component | Technology | Function |
| --- | --- | --- |
| NL Query Engine | LangChain + Groq (Llama 3.3 70B) or OpenAI | Translates natural language to Pandas operations, executes on cleaned dataset, returns text + chart |
| Anomaly Detector | Python (statistical rules + Z-score) | Runs against the dataset on schedule, flags anomalies, generates alert descriptions |
| KPI Report Generator | LLM (same as query engine) | Takes aggregated metrics, generates narrative summary in plain English |


| # | Deliverable | Format | Description |
| --- | --- | --- | --- |
| D1 | NL Query Interface | Streamlit App | Chat-style interface where user types questions and gets text + chart answers |
| D2 | Anomaly Detection Module | Python (.py) | Rule-based + statistical anomaly detector. Runs on the cleaned dataset, outputs flagged items with descriptions. |
| D3 | KPI Summary Generator | Python (.py) | Takes aggregated data, calls LLM, produces a formatted weekly/monthly summary in Markdown |
| D4 | Sample KPI Reports | Markdown + PDF | 3 sample auto-generated reports showing what the client would receive |
| D5 | Query Log & Evaluation | CSV | 20+ sample queries with expected vs. actual results, accuracy score |
| D6 | Case Study Writeup | Markdown | Problem → Approach → Architecture → Results → Tech Stack. Ready for portfolio page. |


| Requirement | Specification |
| --- | --- |
| Language | Python 3.11+ |
| LLM Provider | Groq (Llama 3.3 70B) primary, OpenAI fallback |
| Framework | LangChain for prompt management, Streamlit for UI |
| Data Layer | Reads from Project 1's cleaned dataset (Parquet or CSV) |
| Safety | Sandboxed code execution — LLM-generated Pandas code runs in restricted exec() with allowlist |
| Logging | All queries, generated code, and results logged to CSV |
| Testing | 20+ test queries covering all question types, measured for accuracy |
| Deployment | Streamlit Cloud or local run instructions |


| # | Criterion | Pass Condition |
| --- | --- | --- |
| AC1 | Data cleaning completeness | Zero null values in required columns. All types correctly cast. Derived columns present. |
| AC2 | Dashboard loads | All 6 views render without errors. Loads in < 3 seconds. |
| AC3 | Filter functionality | Every filter updates all charts on the current view. No stale data. |
| AC4 | Chart accuracy | Revenue totals in charts match raw data totals (±$1 rounding tolerance). |
| AC5 | Insight report quality | 10 actionable findings. Each backed by specific data. Written for non-technical reader. |
| AC6 | ETL pipeline reproducibility | Running the pipeline on the raw CSV produces identical cleaned output. |
| AC7 | Code quality | PEP 8 compliant. All functions have docstrings. Modular structure. |
| AC8 | Case study ready | Problem/Approach/Results/Tech Stack documented. Screenshots included. |


| # | Criterion | Pass Condition |
| --- | --- | --- |
| AC1 | NL query accuracy | 80%+ of 20 test queries return correct, relevant answers. |
| AC2 | Query response time | Each query responds in < 5 seconds (including LLM call). |
| AC3 | Anomaly detection | Correctly identifies all anomalies listed in section 4.2. |
| AC4 | KPI summary quality | Generated summary is factually accurate and readable by a non-technical person. |
| AC5 | Safety | LLM-generated code cannot access filesystem, network, or execute dangerous operations. |
| AC6 | Error handling | Ambiguous/unanswerable queries get a helpful response, not a crash. |
| AC7 | Logging | Every query and result is logged with timestamp and session ID. |
| AC8 | Case study ready | Problem/Approach/Results/Tech Stack documented. Demo screenshots included. |


| Section | Content | Length |
| --- | --- | --- |
| Hero Banner | Project title, service line tag, one-line result (e.g., "Identified $25K in markdown losses") | 1 line |
| The Problem | What the client struggled with. Written from their perspective. Pain-focused. | 3–4 sentences |
| Our Approach | Step-by-step methodology. What we did, in what order, and why. | 5–7 sentences |
| Architecture Diagram | Visual showing data flow: raw data → ETL → analysis → dashboard/NL interface | 1 diagram |
| Key Results | 3–5 specific, quantified outcomes with supporting numbers | Bullet list |
| Tech Stack | Logos + names of technologies used | Icon row |
| Deliverables | What the client received (dashboard, reports, pipeline, etc.) | Short list |
| Testimonial | Fictional quote from the client (clearly marked as sample project) | 2 sentences |
