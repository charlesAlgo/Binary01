# Fashion Boutique Retail Analytics

Two portfolio projects built on 2,176 transaction records from Luxe & Thread Boutique.

- **Project 1 — Analytics Dashboard:** 6-page Streamlit dashboard (data analysis)
- **Project 2 — AI Analytics Assistant:** Natural-language chat interface + automated anomaly detection (augmented analytics)

---

## Setup

**Prerequisites:** Python 3.10+

```bash
cd "Data & Aug"
pip install -r requirements.txt
```

**Environment variables** (create a `.env` file or export in your shell):

```
GROQ_API_KEY=your-groq-api-key-here   # Required for Project 2 (NL Assistant)
```

---

## Project 1 — Analytics Dashboard

```bash
streamlit run dashboard/app.py
```

Opens at `http://localhost:8501`. Six pages:

| Page | Description |
|------|-------------|
| Executive Summary | Revenue, return rate, top brand at a glance |
| Category Deep Dive | Revenue and returns by category and season |
| Brand Performance | Side-by-side brand comparison |
| Markdown & Pricing | Price band distribution and markdown impact |
| Returns Analysis | Return rates by brand, category, and reason |
| Inventory Status | Out-of-stock items and dead inventory flags |

### Re-run the ETL pipeline

```bash
python etl/pipeline.py
```

Reads `data/raw/fashion_boutique_dataset.csv` → writes `data/cleaned/fashion_boutique_cleaned.parquet`.

### Run tests

```bash
pytest etl/tests/test_pipeline.py -v
```

---

## Project 2 — AI Analytics Assistant

Requires `GROQ_API_KEY` to be set.

```bash
streamlit run "nl_assistant/app.py"
```

Opens at `http://localhost:8501`.

**Features:**
- Chat with the dataset in plain English — no SQL or Python required
- Suggested queries shown on first load
- Automatic chart rendering for data questions
- Live anomaly alerts sidebar (from `reports/anomaly_alerts.json`)
- KPI snapshot sidebar (from `reports/kpi_sample_week1.md`)
- Query log written to `nl_assistant/logs/query_log.csv`

**Sample questions:**
- "What were our top 5 selling brands last quarter?"
- "Show me return rates for Outerwear by brand"
- "How much revenue did we lose to markdowns on Shoes?"
- "Which products have both high markdowns and low ratings?"

### Regenerate anomaly alerts

```bash
python nl_assistant/anomaly_detector.py
```

Writes `reports/anomaly_alerts.json` and `reports/anomaly_report.md`.

### Regenerate KPI reports

```bash
python nl_assistant/kpi_generator.py
```

Writes `reports/kpi_sample_week1.md` and `reports/kpi_sample_month1.md`.

---

## Project Structure

```
Data & Aug/
├── data/
│   ├── raw/                          # Original dataset
│   └── cleaned/                      # ETL output (Parquet + CSV)
├── etl/
│   ├── pipeline.py                   # Cleaning & feature engineering
│   └── tests/test_pipeline.py        # pytest suite
├── dashboard/
│   ├── app.py                        # Streamlit entrypoint
│   ├── pages/                        # 6 dashboard pages
│   └── utils/charts.py               # Shared DataLife design system
├── nl_assistant/
│   ├── app.py                        # AI chat interface (Streamlit)
│   ├── query_engine.py               # NL → pandas → chart (Groq + RestrictedPython)
│   ├── anomaly_detector.py           # 10-rule anomaly detection
│   ├── kpi_generator.py              # KPI computation + report generation
│   ├── prompts/system_prompt.md      # LLM system prompt
│   └── logs/query_log.csv            # Query audit log (auto-created)
├── reports/
│   ├── anomaly_alerts.json           # Structured anomaly output
│   ├── anomaly_report.md             # Human-readable anomaly report
│   └── kpi_sample_week*.md           # Weekly KPI summaries
├── case_studies/
│   ├── project1_data_analysis.md     # Portfolio writeup — Dashboard
│   └── project2_augmented_analytics.md  # Portfolio writeup — NL Assistant
└── requirements.txt
```

---

## Case Studies

Full portfolio writeups for both projects are in `case_studies/`:

- [`project1_data_analysis.md`](case_studies/project1_data_analysis.md)
- [`project2_augmented_analytics.md`](case_studies/project2_augmented_analytics.md)
