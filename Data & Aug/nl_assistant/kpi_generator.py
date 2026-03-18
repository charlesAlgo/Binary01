"""
KPI Summary Generator — Fashion Boutique Retail Analytics
==========================================================
Computes KPI aggregations from the cleaned dataset and produces
plain-English weekly / monthly reports suitable for non-technical
store managers.

The generator works in two modes:
  1. Rule-based (no LLM) — structured Markdown from computed metrics.
     Always available; used as a fallback and for testing.
  2. LLM-enhanced (Groq / Llama 3.3 70B) — passes computed metrics to
     the LLM to produce a narrative summary. Requires GROQ_API_KEY.

Usage:
    from nl_assistant.kpi_generator import generate_weekly_kpi, generate_monthly_kpi

    df = pd.read_csv("data/cleaned/fashion_boutique_cleaned.csv")
    report = generate_weekly_kpi(df)          # rule-based
    report = generate_weekly_kpi(df, use_llm=True)  # LLM-enhanced
"""

from __future__ import annotations

import os
from datetime import datetime
from pathlib import Path
from typing import Any

import pandas as pd

# ─── Metric computation ───────────────────────────────────────────────────────

def compute_kpis(df: pd.DataFrame) -> dict[str, Any]:
    """
    Compute all key performance indicators from the cleaned DataFrame.

    Returns a flat dict of scalar / small-list values suitable for both
    templating and passing to an LLM as structured context.
    """
    rated = df[df["has_rating"].astype(bool)]

    # Revenue
    total_revenue      = df["current_price"].sum()
    total_markdown_loss = df["revenue_lost"].sum()
    avg_transaction    = df["current_price"].mean()
    markdown_rate      = df["is_marked_down"].astype(bool).mean() * 100

    # Returns
    return_rate = df["is_returned"].astype(bool).mean() * 100
    return_count = df["is_returned"].astype(bool).sum()
    top_return_reason = (
        df[df["is_returned"].astype(bool) & df["return_reason"].notna()]
        ["return_reason"].value_counts().idxmax()
        if df["is_returned"].astype(bool).sum() > 0 else "N/A"
    )

    # Ratings
    avg_rating = rated["customer_rating"].mean() if len(rated) > 0 else None
    unrated_pct = (~df["has_rating"].astype(bool)).mean() * 100

    # By category
    cat_rev = (
        df.groupby("category", observed=True)["current_price"]
        .sum().sort_values(ascending=False)
    )
    top_category    = cat_rev.index[0]
    bottom_category = cat_rev.index[-1]

    # By brand
    brand_rev = (
        df.groupby("brand", observed=True)["current_price"]
        .sum().sort_values(ascending=False)
    )
    top_brand = brand_rev.index[0]

    brand_returns = (
        df.groupby("brand", observed=True)["is_returned"]
        .apply(lambda x: x.astype(bool).mean() * 100)
        .sort_values(ascending=False)
    )
    worst_return_brand = brand_returns.index[0]
    worst_return_rate  = brand_returns.iloc[0]

    brand_ratings = (
        rated.groupby("brand", observed=True)["customer_rating"]
        .mean().sort_values()
    )
    lowest_rated_brand = brand_ratings.index[0]
    lowest_brand_rating = brand_ratings.iloc[0]

    # Inventory
    dead_inventory_count = df["is_dead_inventory"].astype(bool).sum()
    out_of_stock_count   = df["is_out_of_stock"].astype(bool).sum()
    avg_stock            = df["stock_quantity"].mean()

    # Date context
    date_skew_pct = (df["month"] == "2025-08").mean() * 100 if "month" in df.columns else 0

    return {
        "report_date":           datetime.now().strftime("%B %d, %Y"),
        "total_revenue":         round(total_revenue, 2),
        "total_markdown_loss":   round(total_markdown_loss, 2),
        "avg_transaction":       round(avg_transaction, 2),
        "markdown_rate_pct":     round(markdown_rate, 1),
        "return_rate_pct":       round(return_rate, 1),
        "return_count":          int(return_count),
        "top_return_reason":     top_return_reason,
        "avg_rating":            round(avg_rating, 2) if avg_rating else None,
        "unrated_pct":           round(unrated_pct, 1),
        "top_category":          top_category,
        "bottom_category":       bottom_category,
        "top_brand":             top_brand,
        "worst_return_brand":    worst_return_brand,
        "worst_return_rate_pct": round(worst_return_rate, 1),
        "lowest_rated_brand":    lowest_rated_brand,
        "lowest_brand_rating":   round(lowest_brand_rating, 2),
        "dead_inventory_count":  int(dead_inventory_count),
        "out_of_stock_count":    int(out_of_stock_count),
        "avg_stock_level":       round(avg_stock, 1),
        "date_skew_pct":         round(date_skew_pct, 1),
        "total_records":         len(df),
        "cat_revenue":           cat_rev.round(2).to_dict(),
        "brand_revenue":         brand_rev.round(2).to_dict(),
    }


# ─── Rule-based report templates ─────────────────────────────────────────────

def _fmt_currency(val: float) -> str:
    return f"${val:,.2f}"


def _fmt_pct(val: float) -> str:
    return f"{val:.1f}%"


def generate_weekly_kpi(
    df: pd.DataFrame,
    use_llm: bool = False,
    period_label: str = "This Week",
) -> str:
    """
    Generate a weekly KPI summary report.

    Parameters
    ----------
    df : pd.DataFrame
        Cleaned dataset.
    use_llm : bool
        If True and GROQ_API_KEY is set, pass metrics to Llama 3.3 70B
        for a narrative summary. Falls back to rule-based if API key absent.
    period_label : str
        Label for the reporting period, e.g. "Week of March 18, 2026".

    Returns
    -------
    str
        Formatted Markdown report.
    """
    kpis = compute_kpis(df)

    if use_llm:
        llm_report = _generate_with_llm(kpis, period="weekly")
        if llm_report:
            return llm_report

    return _weekly_template(kpis, period_label)


def generate_monthly_kpi(
    df: pd.DataFrame,
    use_llm: bool = False,
    period_label: str = "This Month",
) -> str:
    """
    Generate a full monthly KPI report with category breakdown and recommendations.

    Parameters
    ----------
    df : pd.DataFrame
        Cleaned dataset.
    use_llm : bool
        If True and GROQ_API_KEY is set, use LLM for narrative. Falls back otherwise.
    period_label : str
        Label for the reporting period.

    Returns
    -------
    str
        Formatted Markdown report.
    """
    kpis = compute_kpis(df)

    if use_llm:
        llm_report = _generate_with_llm(kpis, period="monthly")
        if llm_report:
            return llm_report

    return _monthly_template(kpis, period_label)


# ─── Templates ────────────────────────────────────────────────────────────────

def _weekly_template(k: dict[str, Any], period: str) -> str:
    """Rule-based weekly summary — plain English for store managers."""
    rating_line = (
        f"**Customer Rating:** {k['avg_rating']:.2f} / 5.0 "
        f"*(based on {100 - k['unrated_pct']:.0f}% of items)*"
        if k["avg_rating"] else
        "**Customer Rating:** No ratings available"
    )

    dead_line = ""
    if k["dead_inventory_count"] > 0:
        dead_line = (
            f"\n> ⚠️ **Action needed:** {k['dead_inventory_count']} items are flagged as "
            f"dead inventory (heavy markdown + poor ratings). Consider liquidating."
        )

    return f"""# Weekly KPI Summary — Luxe & Thread Boutique
**Period:** {period} | **Generated:** {k['report_date']}

---

## Headline Numbers

| Metric | Value |
|--------|-------|
| 💰 Total Revenue | **{_fmt_currency(k['total_revenue'])}** |
| 📉 Revenue Lost to Markdowns | {_fmt_currency(k['total_markdown_loss'])} |
| 🔄 Return Rate | {_fmt_pct(k['return_rate_pct'])} ({k['return_count']} items returned) |
| ⭐ Avg Customer Rating | {f"{k['avg_rating']:.2f} / 5.0" if k['avg_rating'] else 'N/A'} |
| 🏷️ Items with Markdown | {_fmt_pct(k['markdown_rate_pct'])} of catalogue |

---

## Top Performers

- **Best category by revenue:** {k['top_category']} ({_fmt_currency(k['cat_revenue'][k['top_category']])})
- **Top brand by revenue:** {k['top_brand']} ({_fmt_currency(k['brand_revenue'][k['top_brand']])})
- **Average transaction value:** {_fmt_currency(k['avg_transaction'])}

## Watch List

- **Highest return rate brand:** {k['worst_return_brand']} at {_fmt_pct(k['worst_return_rate_pct'])} *(store avg: 14.7%)*
- **Top return reason:** {k['top_return_reason']}
- **Lowest rated brand:** {k['lowest_rated_brand']} ({k['lowest_brand_rating']:.2f} / 5.0)
- **Out of stock items:** {k['out_of_stock_count']} products need reordering
{dead_line}

---

*This report covers {k['total_records']:,} transactions in the dataset.*
*Note: {k['date_skew_pct']:.0f}% of records are from August 2025 — historical trend comparisons have limited statistical power.*
"""


def _monthly_template(k: dict[str, Any], period: str) -> str:
    """Rule-based monthly report with full category breakdown."""
    # Category revenue table
    cat_rows = "\n".join(
        f"| {cat} | {_fmt_currency(rev)} | "
        f"{rev/k['total_revenue']*100:.1f}% |"
        for cat, rev in sorted(k["cat_revenue"].items(), key=lambda x: -x[1])
    )

    # Brand revenue table (top 5)
    brand_rows = "\n".join(
        f"| {brand} | {_fmt_currency(rev)} |"
        for brand, rev in list(k["brand_revenue"].items())[:5]
    )

    rating_note = (
        f"{k['avg_rating']:.2f}/5.0 (from {100-k['unrated_pct']:.0f}% of rated items)"
        if k["avg_rating"] else "No ratings available"
    )

    return f"""# Monthly Performance Report — Luxe & Thread Boutique
**Period:** {period} | **Generated:** {k['report_date']}

---

## Executive Summary

Luxe & Thread generated **{_fmt_currency(k['total_revenue'])}** in total revenue across {k['total_records']:,} transactions this period.
The average transaction value was **{_fmt_currency(k['avg_transaction'])}**.

**{_fmt_currency(k['total_markdown_loss'])}** was lost to markdowns ({k['markdown_rate_pct']:.0f}% of items were discounted).
The overall return rate stands at **{_fmt_pct(k['return_rate_pct'])}**, with "{k['top_return_reason']}" as the most common reason.

---

## Revenue by Category

| Category | Revenue | % of Total |
|----------|---------|------------|
{cat_rows}

**Best performer:** {k['top_category']} | **Needs attention:** {k['bottom_category']}

---

## Top 5 Brands by Revenue

| Brand | Revenue |
|-------|---------|
{brand_rows}

---

## Customer Satisfaction

- **Average rating:** {rating_note}
- **Lowest rated brand:** {k['lowest_rated_brand']} at {k['lowest_brand_rating']:.2f}/5.0 — *investigate product quality*
- **{k['unrated_pct']:.0f}%** of items have no rating — consider prompting customers for feedback

---

## Inventory & Operations

| Issue | Count | Action |
|-------|-------|--------|
| Out of stock items | {k['out_of_stock_count']} | Reorder priority review |
| Dead inventory (high markdown + low rating) | {k['dead_inventory_count']} | Consider liquidation |

---

## Recommendations for Next Period

1. **Address {k['worst_return_brand']} returns** — {_fmt_pct(k['worst_return_rate_pct'])} return rate is significantly above the {_fmt_pct(14.7)} store average. Review product quality and sizing.
2. **Restock {k['out_of_stock_count']} out-of-stock items** — prioritise top-revenue categories first.
3. **Clear {k['dead_inventory_count']} dead inventory items** — these are tying up cash and dragging average ratings down.
4. **Investigate "{k['top_return_reason']}" returns** — the top return reason signals a systemic issue to address.

---

*⚠️ Data note: {k['date_skew_pct']:.0f}% of records fall in August 2025. Monthly comparisons should be interpreted with caution.*
"""


# ─── LLM-enhanced generation ──────────────────────────────────────────────────

def _generate_with_llm(kpis: dict[str, Any], period: str) -> str | None:
    """
    Call Groq (Llama 3.3 70B) to generate a narrative report from the computed KPIs.
    Returns None if GROQ_API_KEY is not set or the call fails.
    """
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return None

    try:
        from groq import Groq  # type: ignore
    except ImportError:
        return None

    # Summarise cat/brand revenue as compact string (avoid token bloat)
    cat_summary = "; ".join(
        f"{cat}: ${rev:,.0f}"
        for cat, rev in sorted(kpis["cat_revenue"].items(), key=lambda x: -x[1])
    )
    brand_summary = "; ".join(
        f"{b}: ${r:,.0f}"
        for b, r in list(kpis["brand_revenue"].items())[:5]
    )

    prompt = f"""You are writing a {period} performance report for the manager of Luxe & Thread Boutique,
a mid-market fashion retailer. Write in plain English — no jargon. Be specific with numbers.
Tone: professional but friendly, like a trusted business advisor.

Use exactly this data (do not invent numbers):
- Total revenue: ${kpis['total_revenue']:,.2f}
- Markdown losses: ${kpis['total_markdown_loss']:,.2f} ({kpis['markdown_rate_pct']:.1f}% of items discounted)
- Return rate: {kpis['return_rate_pct']:.1f}% ({kpis['return_count']} items), top reason: {kpis['top_return_reason']}
- Avg customer rating: {kpis['avg_rating']:.2f}/5.0 if available (else say unavailable)
- Top category: {kpis['top_category']} (${kpis['cat_revenue'][kpis['top_category']]:,.2f})
- Worst return brand: {kpis['worst_return_brand']} ({kpis['worst_return_rate_pct']:.1f}% return rate)
- Dead inventory: {kpis['dead_inventory_count']} items
- Out of stock: {kpis['out_of_stock_count']} items
- Category revenue breakdown: {cat_summary}
- Top 5 brands: {brand_summary}

Structure your report with these sections:
1. Headline summary (2-3 sentences)
2. What's working (2-3 bullet points)
3. What needs attention (2-3 bullet points)
4. Recommended actions (numbered list, 3-4 items)

End with: "Report generated by DataLife AI Analytics."
"""

    try:
        client = Groq(api_key=api_key)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=800,
            temperature=0.4,
        )
        return response.choices[0].message.content
    except Exception:
        return None


# ─── CLI ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    from pathlib import Path

    root = Path(__file__).resolve().parent.parent
    csv  = root / "data" / "cleaned" / "fashion_boutique_cleaned.csv"
    df   = pd.read_csv(csv)
    df["is_returned"]       = df["is_returned"].astype(bool)
    df["has_rating"]        = df["has_rating"].astype(bool)
    df["is_dead_inventory"] = df["is_dead_inventory"].astype(bool)
    df["is_out_of_stock"]   = df["is_out_of_stock"].astype(bool)

    weekly  = generate_weekly_kpi(df,  period_label="March 2026 (Sample)")
    monthly = generate_monthly_kpi(df, period_label="March 2026 (Full Dataset)")

    out = root / "reports"
    out.mkdir(exist_ok=True)

    (out / "kpi_sample_week1.md").write_text(weekly,  encoding="utf-8")
    (out / "kpi_sample_month1.md").write_text(monthly, encoding="utf-8")

    print(weekly)
    print("\n" + "="*60 + "\n")
    print(monthly[:500] + "...")
    print(f"\nSaved to {out}")
