"""
Anomaly Detector — Fashion Boutique Retail Analytics
=====================================================
Implements RULE 1–10 from anomaly_detection_rules.md.

Each rule returns a structured alert dict (or None if not triggered).
The public function `run_all_rules(df)` returns:
  - alerts  : list[dict]  — JSON-serialisable alert objects
  - summary : str         — human-readable Markdown report

Usage:
    import pandas as pd
    from nl_assistant.anomaly_detector import run_all_rules

    df = pd.read_csv("data/cleaned/fashion_boutique_cleaned.csv")
    alerts, summary = run_all_rules(df)
"""

from __future__ import annotations

import json
from typing import Any

import numpy as np
import pandas as pd

# ─── Thresholds (derived from the dataset — update if data changes) ───────────

OVERALL_RETURN_RATE    = 0.147   # 14.7%
RULE1_BRAND_THRESHOLD  = 0.191   # 1.3× overall  → 19.1%
RULE2_CAT_THRESHOLD    = 0.176   # 1.2× overall  → 17.6%
RULE3_RATING_THRESHOLD = 2.8
RULE5_STOCK_MIN        = 35
RULE5_MARKDOWN_MIN     = 25.0
RULE7_MIN_RECORDS      = 30      # months with fewer records = "insufficient data"
RULE7_DROP_PCT         = 0.20    # 20% month-over-month revenue drop
RULE8_CONCENTRATION    = 0.30    # 30% of total markdown losses
RULE9_SIZE_PCT         = 0.25    # 25% of category returns due to size
RULE10_LUXURY_PRICE    = 150.0
RULE10_RATING_MAX      = 2.0

SEVERITY_HIGH   = "HIGH"
SEVERITY_MEDIUM = "MEDIUM"
SEVERITY_LOW    = "LOW"


# ─── Alert builder ────────────────────────────────────────────────────────────

def _alert(
    rule_id: str,
    severity: str,
    title: str,
    description: str,
    affected_count: int,
    data: dict[str, Any],
    recommendation: str,
) -> dict[str, Any]:
    """Build a standardised alert dict."""
    return {
        "rule_id": rule_id,
        "severity": severity,
        "title": title,
        "description": description,
        "affected_count": affected_count,
        "data": data,
        "recommendation": recommendation,
    }


# ─── Individual rules ─────────────────────────────────────────────────────────

def rule1_high_brand_return_rate(df: pd.DataFrame) -> list[dict]:
    """
    RULE 1 — HIGH: Brand return rate > 1.3× store average (>19.1%).
    Currently triggered: Ann Taylor (19.8%).
    """
    alerts = []
    brand_stats = (
        df.groupby("brand", observed=True)
          .agg(total=("is_returned", "count"), returned=("is_returned", "sum"))
          .assign(rate=lambda x: x["returned"] / x["total"])
    )
    triggered = brand_stats[brand_stats["rate"] > RULE1_BRAND_THRESHOLD]

    for brand, row in triggered.iterrows():
        rate_pct    = row["rate"] * 100
        multiplier  = round(row["rate"] / OVERALL_RETURN_RATE, 2)
        top_reasons = (
            df[(df["brand"] == brand) & df["is_returned"] & df["return_reason"].notna()]
            ["return_reason"].value_counts().head(3).index.tolist()
        )
        alerts.append(_alert(
            rule_id       = "RULE_1",
            severity      = SEVERITY_HIGH,
            title         = f"High Return Rate: {brand}",
            description   = (
                f"{brand} return rate is {rate_pct:.1f}%, which is {multiplier}× "
                f"the store average of {OVERALL_RETURN_RATE*100:.1f}%. "
                f"Top return reasons: {', '.join(top_reasons)}."
            ),
            affected_count = int(row["returned"]),
            data = {
                "brand": brand,
                "return_rate": round(rate_pct, 1),
                "store_average": round(OVERALL_RETURN_RATE * 100, 1),
                "multiplier": multiplier,
                "top_reasons": top_reasons,
            },
            recommendation = (
                f"Review {brand} product quality, sizing consistency, and supplier "
                "descriptions. Consider a quality audit of the top return-reason SKUs."
            ),
        ))
    return alerts


def rule2_high_category_return_rate(df: pd.DataFrame) -> list[dict]:
    """
    RULE 2 — MEDIUM: Category return rate > 1.2× store average (>17.6%).
    Currently not triggered (Outerwear at 16.2% is the closest).
    """
    alerts = []
    cat_stats = (
        df.groupby("category", observed=True)
          .agg(total=("is_returned", "count"), returned=("is_returned", "sum"))
          .assign(rate=lambda x: x["returned"] / x["total"])
    )
    triggered = cat_stats[cat_stats["rate"] > RULE2_CAT_THRESHOLD]

    for cat, row in triggered.iterrows():
        rate_pct = row["rate"] * 100
        alerts.append(_alert(
            rule_id       = "RULE_2",
            severity      = SEVERITY_MEDIUM,
            title         = f"Elevated Return Rate: {cat}",
            description   = (
                f"{cat} return rate is {rate_pct:.1f}%, exceeding the warning threshold "
                f"of {RULE2_CAT_THRESHOLD*100:.1f}% ({1.2:.1f}× the store average)."
            ),
            affected_count = int(row["returned"]),
            data = {
                "category": cat,
                "return_rate": round(rate_pct, 1),
                "threshold": round(RULE2_CAT_THRESHOLD * 100, 1),
            },
            recommendation = (
                f"Monitor {cat} returns closely. Investigate top brands driving returns "
                "in this category and consider adding size/fit guides."
            ),
        ))
    return alerts


def rule3_low_brand_rating(df: pd.DataFrame) -> list[dict]:
    """
    RULE 3 — MEDIUM: Brand average rating < 2.8.
    Currently triggered: Mango (2.78).
    """
    alerts = []
    rated = df[df["has_rating"]]
    brand_ratings = (
        rated.groupby("brand", observed=True)
             .agg(avg_rating=("customer_rating", "mean"), count=("customer_rating", "count"))
    )
    triggered = brand_ratings[brand_ratings["avg_rating"] < RULE3_RATING_THRESHOLD]

    for brand, row in triggered.iterrows():
        # Lowest rated categories for this brand
        cat_ratings = (
            rated[rated["brand"] == brand]
            .groupby("category", observed=True)["customer_rating"].mean()
            .sort_values().head(3)
        )
        worst_cats = [f"{cat} ({avg:.2f})" for cat, avg in cat_ratings.items()]
        alerts.append(_alert(
            rule_id       = "RULE_3",
            severity      = SEVERITY_MEDIUM,
            title         = f"Low Customer Rating: {brand}",
            description   = (
                f"{brand} average rating is {row['avg_rating']:.2f}/5.0, below the "
                f"{RULE3_RATING_THRESHOLD} threshold. "
                f"Lowest-rated categories: {', '.join(worst_cats)}. "
                f"Based on {int(row['count'])} rated products."
            ),
            affected_count = int(row["count"]),
            data = {
                "brand": brand,
                "avg_rating": round(row["avg_rating"], 2),
                "threshold": RULE3_RATING_THRESHOLD,
                "worst_categories": worst_cats,
                "rated_count": int(row["count"]),
            },
            recommendation = (
                f"Conduct a customer feedback review for {brand}. "
                "Consider requesting product quality improvements from the supplier "
                "or reducing {brand} SKU count in underperforming categories."
            ),
        ))
    return alerts


def rule4_dead_inventory(df: pd.DataFrame) -> list[dict]:
    """
    RULE 4 — HIGH: Dead inventory — markdown > 30% AND rating < 2.5.
    Expected: 118 items.
    """
    dead = df[df["is_dead_inventory"]]
    if dead.empty:
        return []

    top_cats = dead["category"].value_counts().head(3)
    cat_summary = [f"{cat} ({n})" for cat, n in top_cats.items()]
    revenue_tied = dead["current_price"].sum()

    return [_alert(
        rule_id       = "RULE_4",
        severity      = SEVERITY_HIGH,
        title         = f"Dead Inventory: {len(dead)} Items Identified",
        description   = (
            f"{len(dead)} items identified as potential dead inventory "
            f"(markdown > 30% + rating < 2.5). "
            f"Top categories: {', '.join(cat_summary)}. "
            f"Estimated revenue tied up: ${revenue_tied:,.2f}."
        ),
        affected_count = len(dead),
        data = {
            "count": len(dead),
            "top_categories": cat_summary,
            "revenue_tied_up": round(revenue_tied, 2),
            "product_ids": dead["product_id"].tolist()[:20],  # first 20
        },
        recommendation = (
            "Consider liquidating or discontinuing these items. "
            "Run a flash sale at 50–70% off to clear stock, or remove from catalogue "
            "to protect brand perception. Review supplier contracts for quality issues."
        ),
    )]


def rule5_overstock_high_markdown(df: pd.DataFrame) -> list[dict]:
    """
    RULE 5 — MEDIUM: stock_quantity > 35 AND markdown_percentage > 25%.
    Items that won't sell even with heavy discounting.
    """
    flagged = df[
        (df["stock_quantity"] > RULE5_STOCK_MIN) &
        (df["markdown_percentage"] > RULE5_MARKDOWN_MIN)
    ]
    if flagged.empty:
        return []

    top_cats = flagged["category"].value_counts().head(3)
    cat_summary = [f"{cat} ({n})" for cat, n in top_cats.items()]

    return [_alert(
        rule_id       = "RULE_5",
        severity      = SEVERITY_MEDIUM,
        title         = f"Overstock with Heavy Discounting: {len(flagged)} Items",
        description   = (
            f"{len(flagged)} items have high stock (>{RULE5_STOCK_MIN} units) "
            f"despite heavy discounting (>{RULE5_MARKDOWN_MIN}%). "
            f"These products are not moving even at a discount. "
            f"Top categories: {', '.join(cat_summary)}."
        ),
        affected_count = len(flagged),
        data = {
            "count": len(flagged),
            "stock_threshold": RULE5_STOCK_MIN,
            "markdown_threshold": RULE5_MARKDOWN_MIN,
            "top_categories": cat_summary,
        },
        recommendation = (
            "Consider aggressive clearance pricing, bundling with higher-performing items, "
            "or returning stock to supplier if contract allows. "
            "Review initial purchasing decisions for these SKUs."
        ),
    )]


def rule6_out_of_stock(df: pd.DataFrame) -> list[dict]:
    """
    RULE 6 — LOW: Items with stock_quantity == 0.
    Expected: 43 items.
    """
    oos = df[df["is_out_of_stock"]]
    if oos.empty:
        return []

    breakdown = oos["category"].value_counts().to_dict()
    breakdown_str = ", ".join(f"{cat}: {n}" for cat, n in breakdown.items())

    return [_alert(
        rule_id       = "RULE_6",
        severity      = SEVERITY_LOW,
        title         = f"Out of Stock: {len(oos)} Items",
        description   = (
            f"{len(oos)} items are currently out of stock. "
            f"By category: {breakdown_str}."
        ),
        affected_count = len(oos),
        data = {
            "count": len(oos),
            "by_category": breakdown,
            "product_ids": oos["product_id"].tolist(),
        },
        recommendation = (
            "Review reorder priority, especially for top-revenue categories "
            "(Outerwear, Shoes). Cross-reference with sales velocity before reordering "
            "low-rated SKUs."
        ),
    )]


def rule7_monthly_revenue_drop(df: pd.DataFrame) -> list[dict]:
    """
    RULE 7 — HIGH (when triggered): Monthly revenue drops > 20% vs prior month.
    Only applied to months with > 30 records. Months below threshold = flagged as
    'insufficient data'.
    """
    alerts = []
    monthly = (
        df.groupby("month")
          .agg(revenue=("current_price", "sum"), count=("product_id", "count"))
          .sort_index()
    )

    valid = monthly[monthly["count"] >= RULE7_MIN_RECORDS]
    if len(valid) < 2:
        # Not enough valid months to compare
        alerts.append(_alert(
            rule_id       = "RULE_7",
            severity      = SEVERITY_LOW,
            title         = "Revenue Trend: Insufficient Monthly Data",
            description   = (
                f"Only {len(valid)} month(s) have ≥{RULE7_MIN_RECORDS} transactions. "
                "Month-over-month revenue trend analysis cannot be computed reliably. "
                f"Date skew: {(df['month'] == '2025-08').mean()*100:.1f}% of all records "
                "fall in August 2025."
            ),
            affected_count = 0,
            data = {
                "valid_months": valid.index.tolist(),
                "all_months": monthly.index.tolist(),
                "min_records_threshold": RULE7_MIN_RECORDS,
            },
            recommendation = (
                "Collect data from at least 3 months with comparable record counts "
                "before applying month-over-month revenue analysis."
            ),
        ))
        return alerts

    prev_rev = None
    prev_month = None
    for month, row in valid.iterrows():
        if prev_rev is not None:
            drop = (prev_rev - row["revenue"]) / prev_rev
            if drop > RULE7_DROP_PCT:
                alerts.append(_alert(
                    rule_id       = "RULE_7",
                    severity      = SEVERITY_HIGH,
                    title         = f"Revenue Drop: {month} vs {prev_month}",
                    description   = (
                        f"Revenue in {month} dropped {drop*100:.1f}% vs {prev_month} "
                        f"(${row['revenue']:,.2f} vs ${prev_rev:,.2f}). "
                        f"Based on {int(row['count'])} transactions in {month}."
                    ),
                    affected_count = int(row["count"]),
                    data = {
                        "month": month,
                        "prev_month": prev_month,
                        "revenue": round(row["revenue"], 2),
                        "prev_revenue": round(prev_rev, 2),
                        "drop_pct": round(drop * 100, 1),
                    },
                    recommendation = (
                        f"Investigate external factors (seasonality, supply issues, "
                        f"competitor activity) driving the revenue drop in {month}. "
                        "Cross-reference with return rates and stock levels for that period."
                    ),
                ))
        prev_rev   = row["revenue"]
        prev_month = month

    return alerts


def rule8_markdown_concentration(df: pd.DataFrame) -> list[dict]:
    """
    RULE 8 — LOW: A single category accounts for > 30% of total markdown losses.
    Currently not triggered (Shoes at 24.4% is highest).
    """
    alerts = []
    total_loss = df["revenue_lost"].sum()
    if total_loss == 0:
        return []

    cat_loss = df.groupby("category", observed=True)["revenue_lost"].sum()
    threshold_amt = total_loss * RULE8_CONCENTRATION

    for cat, loss in cat_loss.items():
        pct = loss / total_loss
        if pct > RULE8_CONCENTRATION:
            alerts.append(_alert(
                rule_id       = "RULE_8",
                severity      = SEVERITY_LOW,
                title         = f"Markdown Concentration: {cat}",
                description   = (
                    f"{cat} accounts for {pct*100:.1f}% of all markdown losses "
                    f"(${loss:,.2f} of ${total_loss:,.2f} total)."
                ),
                affected_count = int((df["category"] == cat).sum()),
                data = {
                    "category": cat,
                    "markdown_loss": round(loss, 2),
                    "total_loss": round(total_loss, 2),
                    "percentage": round(pct * 100, 1),
                    "threshold_amount": round(threshold_amt, 2),
                },
                recommendation = (
                    f"Review pricing strategy for {cat}. "
                    "Consider reducing initial markdowns and testing price elasticity "
                    "to find the optimal discount level."
                ),
            ))
    return alerts


def rule9_size_return_concentration(df: pd.DataFrame) -> list[dict]:
    """
    RULE 9 — MEDIUM: 'Size Issue' returns for a category > 25% of that category's returns.
    """
    alerts = []
    returned = df[df["is_returned"] & df["return_reason"].notna()]
    if returned.empty:
        return []

    for cat in df["category"].cat.categories if hasattr(df["category"], "cat") else df["category"].unique():
        cat_returns = returned[returned["category"] == cat]
        if len(cat_returns) == 0:
            continue
        size_returns = (cat_returns["return_reason"] == "Size Issue").sum()
        pct = size_returns / len(cat_returns)
        if pct > RULE9_SIZE_PCT:
            alerts.append(_alert(
                rule_id       = "RULE_9",
                severity      = SEVERITY_MEDIUM,
                title         = f"Sizing Issue Concentration: {cat}",
                description   = (
                    f"{pct*100:.1f}% of returns in {cat} are due to sizing issues "
                    f"({size_returns} of {len(cat_returns)} returned items)."
                ),
                affected_count = int(size_returns),
                data = {
                    "category": cat,
                    "size_return_count": int(size_returns),
                    "total_category_returns": len(cat_returns),
                    "percentage": round(pct * 100, 1),
                },
                recommendation = (
                    f"Add detailed size guides and fit notes for {cat} products. "
                    "Consider adding a size comparison chart or customer size reviews "
                    "to product pages."
                ),
            ))
    return alerts


def rule10_luxury_low_rating(df: pd.DataFrame) -> list[dict]:
    """
    RULE 10 — HIGH: Products in the 'Luxury' price band (>$150) with rating < 2.0.
    """
    luxury_poor = df[
        (df["original_price"] > RULE10_LUXURY_PRICE) &
        df["has_rating"] &
        (df["customer_rating"] < RULE10_RATING_MAX)
    ]
    if luxury_poor.empty:
        return []

    top_products = (
        luxury_poor[["product_id", "brand", "category", "original_price", "customer_rating"]]
        .sort_values("customer_rating")
        .head(10)
        .to_dict(orient="records")
    )

    return [_alert(
        rule_id       = "RULE_10",
        severity      = SEVERITY_HIGH,
        title         = f"Luxury Items with Critical Ratings: {len(luxury_poor)} Products",
        description   = (
            f"{len(luxury_poor)} luxury-priced items (>${RULE10_LUXURY_PRICE:.0f}) "
            f"have ratings below {RULE10_RATING_MAX}. "
            f"These represent a brand perception risk for the boutique."
        ),
        affected_count = len(luxury_poor),
        data = {
            "count": len(luxury_poor),
            "price_threshold": RULE10_LUXURY_PRICE,
            "rating_threshold": RULE10_RATING_MAX,
            "worst_products": top_products,
        },
        recommendation = (
            "Urgently review luxury items with sub-2.0 ratings. "
            "Consider removing them from the catalogue or addressing quality issues "
            "with the supplier. Poor luxury ratings disproportionately damage brand trust."
        ),
    )]


# ─── Run all rules ────────────────────────────────────────────────────────────

RULES = [
    rule1_high_brand_return_rate,
    rule2_high_category_return_rate,
    rule3_low_brand_rating,
    rule4_dead_inventory,
    rule5_overstock_high_markdown,
    rule6_out_of_stock,
    rule7_monthly_revenue_drop,
    rule8_markdown_concentration,
    rule9_size_return_concentration,
    rule10_luxury_low_rating,
]


def run_all_rules(df: pd.DataFrame) -> tuple[list[dict], str]:
    """
    Run all 10 anomaly detection rules against the cleaned DataFrame.

    Parameters
    ----------
    df : pd.DataFrame
        Cleaned dataset output from the ETL pipeline.

    Returns
    -------
    alerts : list[dict]
        JSON-serialisable list of triggered alert objects.
    summary : str
        Human-readable Markdown summary report.
    """
    all_alerts: list[dict] = []
    for rule_fn in RULES:
        try:
            result = rule_fn(df)
            all_alerts.extend(result)
        except Exception as exc:  # pragma: no cover
            all_alerts.append({
                "rule_id": rule_fn.__name__,
                "severity": "ERROR",
                "title": f"Rule execution error: {rule_fn.__name__}",
                "description": str(exc),
                "affected_count": 0,
                "data": {},
                "recommendation": "Check rule implementation.",
            })

    summary = _build_markdown_summary(all_alerts)
    return all_alerts, summary


def _build_markdown_summary(alerts: list[dict]) -> str:
    """Render triggered alerts as a Markdown report."""
    high   = [a for a in alerts if a["severity"] == SEVERITY_HIGH]
    medium = [a for a in alerts if a["severity"] == SEVERITY_MEDIUM]
    low    = [a for a in alerts if a["severity"] == SEVERITY_LOW]

    lines = [
        "# Anomaly Detection Report — Luxe & Thread Boutique",
        "",
        f"**Total alerts triggered:** {len(alerts)}  "
        f"| 🔴 HIGH: {len(high)}  "
        f"| 🟡 MEDIUM: {len(medium)}  "
        f"| 🔵 LOW: {len(low)}",
        "",
        "---",
        "",
    ]

    severity_order = [
        (SEVERITY_HIGH,   "🔴 HIGH Priority Alerts"),
        (SEVERITY_MEDIUM, "🟡 MEDIUM Priority Alerts"),
        (SEVERITY_LOW,    "🔵 LOW Priority Alerts (Informational)"),
    ]

    for sev, heading in severity_order:
        group = [a for a in alerts if a["severity"] == sev]
        if not group:
            continue
        lines.append(f"## {heading}")
        lines.append("")
        for a in group:
            lines.append(f"### {a['title']}")
            lines.append(f"**Rule:** `{a['rule_id']}` | **Affected items:** {a['affected_count']}")
            lines.append("")
            lines.append(a["description"])
            lines.append("")
            lines.append(f"> **Recommendation:** {a['recommendation']}")
            lines.append("")
            lines.append("---")
            lines.append("")

    if not alerts:
        lines.append("✅ No anomalies detected. All metrics within normal thresholds.")

    return "\n".join(lines)


def save_json_report(alerts: list[dict], path: str = "reports/anomaly_alerts.json") -> None:
    """Save alerts to a JSON file."""
    from pathlib import Path
    out = Path(path)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(alerts, indent=2, default=str), encoding="utf-8")


# ─── CLI entry point ──────────────────────────────────────────────────────────

if __name__ == "__main__":
    import sys
    from pathlib import Path

    root = Path(__file__).resolve().parent.parent
    csv_path = root / "data" / "cleaned" / "fashion_boutique_cleaned.csv"

    if not csv_path.exists():
        print(f"Cleaned data not found at {csv_path}. Run the ETL pipeline first.", file=sys.stderr)
        sys.exit(1)

    df = pd.read_csv(csv_path)
    # Restore bool columns that CSV read as object
    df["is_returned"]       = df["is_returned"].astype(bool)
    df["has_rating"]        = df["has_rating"].astype(bool)
    df["is_dead_inventory"] = df["is_dead_inventory"].astype(bool)
    df["is_out_of_stock"]   = df["is_out_of_stock"].astype(bool)

    # Restore categoricals
    df["category"] = df["category"].astype("category")
    df["brand"]    = df["brand"].astype("category")

    alerts, summary = run_all_rules(df)

    print(summary)
    print(f"\n{'='*60}")
    print(f"JSON alerts: {len(alerts)} total")

    json_path = root / "reports" / "anomaly_alerts.json"
    save_json_report(alerts, str(json_path))
    print(f"Saved to {json_path}")

    md_path = root / "reports" / "anomaly_report.md"
    md_path.write_text(summary, encoding="utf-8")
    print(f"Saved to {md_path}")
