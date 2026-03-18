# Case Study: Augmented Analytics — AI Natural Language Assistant

**Project type:** Augmented Analytics / LLM-Powered Data Assistant
**Client:** Luxe & Thread Boutique (mid-market fashion retailer)
**Deliverable:** Conversational AI analytics assistant + automated anomaly & KPI reports
**Timeline:** 2 weeks (built on top of Project 1 dataset)

---

## Problem

Even with a dashboard (Project 1), store managers couldn't get answers to ad-hoc questions without developer help. "Which Zara products had the highest markdown loss in Fall?" requires writing a pandas query — something non-technical managers can't do. Additionally, no automated system existed to proactively surface anomalies or compile weekly KPIs, meaning issues like rising return rates went unnoticed for weeks.

---

## Dataset

Same 2,176-record cleaned Parquet file from Project 1 — no additional data collection required. The augmented analytics layer sits entirely on top of the existing ETL output.

---

## Approach

1. **Anomaly detection engine** — 10 rule-based checks that scan the dataset and generate structured alerts (HIGH/MEDIUM/LOW severity) with recommendations
2. **KPI generator** — computes ~20 KPIs and produces formatted Markdown reports for store managers; optional LLM-enhanced narrative via Groq
3. **NL query engine** — converts plain-English questions into pandas code via Llama 3.3 70B, executes code safely with RestrictedPython, returns structured results + charts
4. **Chat interface** — Streamlit app with conversation history, suggested queries, and a live anomaly sidebar

---

## Architecture

```
nl_assistant/
├── app.py                   # Streamlit chat interface
├── query_engine.py          # NL → pandas → result (Groq + RestrictedPython)
├── anomaly_detector.py      # 10-rule anomaly detection engine
├── kpi_generator.py         # KPI computation + Markdown report generation
├── prompts/
│   └── system_prompt.md     # LLM system prompt (dataset schema + safety rules)
└── logs/
    └── query_log.csv        # Timestamped query log (session_id, success, error)

reports/
├── anomaly_alerts.json      # Structured anomaly output
├── anomaly_report.md        # Human-readable anomaly report
├── kpi_sample_week1.md      # Weekly KPI summary (Week 1)
├── kpi_sample_week2.md      # Weekly KPI summary (Week 2)
└── kpi_sample_week3.md      # Weekly KPI summary (Week 3)
```

**Query flow:** User question → LLM (Llama 3.3 70B via Groq) → JSON `{code, explanation, chart_type}` → RestrictedPython execution → DataFrame/string result + optional Plotly chart → Streamlit display

---

## NL Query Engine Design

The query engine is the core innovation of this project. It:

1. Loads the cleaned Parquet file **once at module level** to avoid re-reading on every query
2. Reads the system prompt from `prompts/system_prompt.md` — a detailed schema description with safety rules and response format instructions
3. Calls **Groq's llama-3.3-70b-versatile** model with `response_format: json_object` to guarantee structured output
4. Parses the JSON response to extract generated pandas code, explanation text, chart type, and chart config
5. Executes the code inside a **RestrictedPython** sandbox — only `pandas` and `numpy` are accessible; `os`, `sys`, `open`, `eval`, `exec`, and all network calls are blocked
6. Builds an optional **Plotly chart** from the DataFrame result based on `chart_type` and `chart_config`
7. Logs every query to `logs/query_log.csv` with timestamp, session ID, success flag, and error message

**Graceful degradation:** If `GROQ_API_KEY` is not set, the engine returns a clear error rather than crashing. If RestrictedPython is unavailable, the engine falls back to plain `exec` with a stripped `__builtins__` dict.

---

## Anomaly Detection

10 automated rules scan the dataset for business-critical issues:

| Rule | What It Detects |
|------|----------------|
| High return rate by brand | Brand return rate > 1.3× store average |
| Seasonal return spike | Category return rate > 20% in any single season |
| Low customer rating by brand | Brand average rating < 2.8 |
| Dead inventory | Markdown > 30% AND rating < 2.5 |
| Overstock with discounting | Stock > 35 units AND markdown > 25% |
| Out of stock | stock_quantity == 0 |
| Revenue drop | Month-over-month revenue drop > 20% |
| Price-to-rating mismatch | Premium items ($100–150) with rating < 2.5 |
| Size issues driving returns | Size-related return reasons > 25% of brand returns |
| Luxury + critical rating | Items > $150 with rating < 2.0 |

Alerts are output as structured JSON (`anomaly_alerts.json`) — severity-ranked and surfaced live in the assistant's sidebar.

---

## Key Findings

- **9 HIGH-severity anomalies** detected automatically — including Ann Taylor's 19.8% return rate, 118 dead inventory items ($5,762 tied up), and multiple month-over-month revenue drops exceeding 24%
- **70 luxury items** (>$150) rated below 2.0 — identified as brand perception risk
- **Mango** flagged with below-threshold average rating of 2.78, with Outerwear (2.41) as worst category
- Natural-language queries answered correctly across 5 test question types: aggregations, filters, multi-condition lookups, comparisons, and string result formatting

---

## Sample Queries the Assistant Can Answer

- *"What were our top 5 selling brands last quarter?"* → bar chart
- *"Show me return rates for Outerwear by brand"* → bar chart
- *"Which products have both high markdowns and low ratings?"* → table
- *"How much revenue did we lose to markdowns on Shoes?"* → string result
- *"Compare summer vs. winter revenue for Dresses"* → grouped bar chart
- *"What percentage of Ann Taylor products were returned?"* → string result

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| LLM | Llama 3.3 70B via Groq API |
| Code execution | RestrictedPython (sandboxed pandas/numpy) |
| Chat interface | Streamlit 1.32+ |
| Charts | Plotly Express |
| Data | pandas, pyarrow (Parquet) |
| Logging | CSV (append-only query log) |
| Design system | Shared DataLife CSS from Project 1 |

---

## Results & Metrics

- **Plain-English → chart in <3 seconds** (Groq inference is fast; Llama 3.3 70B typical latency ~1.5s)
- **10 anomaly rules** covering returns, ratings, inventory, revenue, and pricing
- **3 automated KPI reports** generated with zero manual effort
- **100% sandboxed execution** — LLM-generated code cannot access the filesystem, environment, or network
- **Complete audit trail** — every query logged with session ID, timestamp, and success status
- Zero regressions on Project 1 ETL tests after Project 2 was built on top

---

*Built by Charles Shalua · DataLife AI Analytics*
