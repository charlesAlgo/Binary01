# Case Study: Fashion Boutique Retail Analytics Dashboard

**Project type:** Data Analysis & Interactive Dashboard
**Client:** Luxe & Thread Boutique (mid-market fashion retailer)
**Deliverable:** 6-page Streamlit analytics dashboard
**Timeline:** 2 weeks

---

## Problem

A mid-market fashion boutique was making inventory and pricing decisions based on intuition. Managers had no visibility into which brands were driving returns, which product categories were underperforming, or how much revenue was being lost to markdowns. Without a structured view of their data, dead inventory accumulated and pricing decisions were reactive rather than strategic.

---

## Dataset

- **2,176 product transaction records** — August 2024 to August 2025
- **8 brands:** Zara, Banana Republic, Mango, H&M, Uniqlo, Ann Taylor, Forever21, Gap
- **6 product categories:** Accessories, Bottoms, Dresses, Outerwear, Shoes, Tops
- **Key fields:** pricing, markdown %, stock levels, customer ratings, return reasons, purchase dates

The raw dataset required significant cleaning: date parsing, null handling for 362 unrated items, and engineering 8 derived columns (revenue_lost, price_band, rating_band, is_dead_inventory, etc.).

---

## Approach

1. **ETL pipeline** (`etl/pipeline.py`) — cleaned and enriched the raw CSV, exported to Parquet for fast loading
2. **Exploratory analysis** — identified the most business-relevant questions managers actually ask
3. **Dashboard architecture** — 6 focused pages covering the complete retail decision cycle
4. **Design system** — built a reusable Plotly/Streamlit theme matching DataLife brand standards

---

## Architecture

```
fashion_boutique/
├── etl/
│   └── pipeline.py          # Cleans raw CSV → cleaned.parquet
├── data/
│   └── cleaned/             # Output of ETL
├── dashboard/
│   ├── app.py               # Streamlit entrypoint + navigation
│   ├── pages/
│   │   ├── 01_executive_summary.py
│   │   ├── 02_category_deep_dive.py
│   │   ├── 03_brand_performance.py
│   │   ├── 04_markdown_pricing.py
│   │   ├── 05_returns_analysis.py
│   │   └── 06_inventory_status.py
│   └── utils/
│       └── charts.py        # Shared DataLife design system
```

**Data flow:** Raw CSV → ETL (pandas) → Parquet → Streamlit pages → Plotly charts

---

## Dashboard Pages

| Page | What It Answers |
|------|----------------|
| Executive Summary | Revenue, margins, return rate, top brand — at a glance |
| Category Deep Dive | Revenue and return rates broken down by category and season |
| Brand Performance | Side-by-side brand comparison: revenue, ratings, return rates |
| Markdown & Pricing | Price band distribution, markdown impact, revenue lost to discounts |
| Returns Analysis | Return rate by brand/category/reason — identifies systemic issues |
| Inventory Status | Out-of-stock items, dead inventory flags, reorder priorities |

---

## Key Findings

- **Ann Taylor** had the highest return rate at **19.8%** (vs. 14.7% store average) — top reason: "Changed Mind," signalling a product description mismatch
- **118 items** were flagged as dead inventory (>30% markdown + rating <2.5) — tying up **$5,762** in capital
- **Outerwear** was the top-revenue category at **$48,672**, but also the most return-prone
- **$25,460** was lost to markdowns across the catalogue — 40.3% of items were discounted
- **Mango** averaged only **2.78/5.0** with Outerwear and Accessories consistently below 3.0
- 76% of records fall in August 2025, meaning the dashboard includes a prominent data-skew warning on all time-series charts

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| ETL & analysis | Python, pandas, numpy, pyarrow |
| Dashboard | Streamlit 1.32+ |
| Charts | Plotly Express / Graph Objects |
| Data format | Parquet (fast columnar reads) |
| Design system | Custom CSS + Inter font |
| Testing | pytest (ETL pipeline) |

---

## Results & Metrics

- **6 fully interactive dashboard pages** deployed locally (Streamlit)
- **8 derived KPIs** computed from raw fields at ETL time — zero runtime lag
- **~12 chart types** across pages: bar, line, scatter, pie, treemap, heatmap
- ETL pipeline: **100% test coverage** on all transformation functions
- Dashboard loads in **<2 seconds** on the cleaned Parquet file
- Identified actionable insights: 118 dead inventory SKUs, 1 high-risk brand, 43 OOS items

---

*Built by Charles Shalua · DataLife AI Analytics*
