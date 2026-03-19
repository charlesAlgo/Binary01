"""
DataLife — Executive Summary dashboard page.
KPIs, monthly revenue trend, category/season breakdown, revenue vs markdown comparison.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.charts import apply_datalife_theme, inject_css, kpi_card_html, kpi_row, DATALIFE_COLORS, page_header, insight_box, section_intro

st.set_page_config(page_title="Executive Summary — DataLife", layout="wide", page_icon="📈")
inject_css()

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "cleaned" / "fashion_boutique_cleaned.csv"

@st.cache_data
def load_data() -> pd.DataFrame:
    df = pd.read_csv(DATA_PATH, parse_dates=["purchase_date"])
    for col in ["is_returned","is_marked_down","has_rating","is_out_of_stock","is_dead_inventory"]:
        if col in df.columns:
            df[col] = df[col].astype(bool)
    return df

df = load_data()

# ── Sidebar filters ───────────────────────────────────────────────────────────

st.sidebar.header("Filters")
all_seasons = sorted(df["season"].dropna().unique().tolist())
selected_seasons = st.sidebar.multiselect("Season", options=all_seasons, default=all_seasons)

df["_ym"] = df["purchase_date"].dt.to_period("M")
month_labels = sorted([str(m) for m in df["_ym"].dropna().unique()])
if len(month_labels) >= 2:
    start_idx, end_idx = st.sidebar.select_slider("Date Range", options=month_labels, value=(month_labels[0], month_labels[-1]))
else:
    start_idx = end_idx = month_labels[0] if month_labels else None

filtered = df.copy()
if selected_seasons:
    filtered = filtered[filtered["season"].isin(selected_seasons)]
if start_idx and end_idx:
    filtered = filtered[(filtered["_ym"].astype(str) >= start_idx) & (filtered["_ym"].astype(str) <= end_idx)]

# ── Hero ──────────────────────────────────────────────────────────────────────

page_header(
    title="Executive Summary",
    description=(
        "A high-level view of business performance — total revenue, markdown costs, return rates, "
        "and customer satisfaction. Use this page to quickly assess overall health and identify "
        "which categories and seasons are driving (or dragging) the business."
    ),
    badge="Revenue & Performance",
    icon="📈",
)

st.markdown(f"Showing **{len(filtered):,}** of {len(df):,} transactions after filters.")

if filtered.empty:
    st.warning("No data matches the selected filters. Please adjust the sidebar.")
    st.stop()

# ── KPI row ───────────────────────────────────────────────────────────────────

total_revenue = filtered["current_price"].sum()
revenue_lost  = filtered["revenue_lost"].sum()
return_rate   = filtered["is_returned"].mean() * 100
rated         = filtered[filtered["has_rating"]]
avg_rating    = rated["customer_rating"].mean() if len(rated) > 0 else 0.0
markdown_pct = filtered["is_marked_down"].mean() * 100

section_intro("Key Metrics", "These four numbers tell the headline story. Revenue is what you earned; markdown losses is what you gave away. A return rate above 14.7% is the watch threshold.")

kpi_row(
    kpi_card_html("Total Revenue", f"${total_revenue:,.2f}", icon="💰",
        sub="Sum of current_price · filtered view",
        accent="#7C3AED", icon_bg="#EDE9FE"),
    kpi_card_html("Lost to Markdowns", f"${revenue_lost:,.2f}", icon="📉",
        sub="Original vs final price gap",
        accent="#EF4444", icon_bg="#FEF2F2"),
    kpi_card_html("Return Rate", f"{return_rate:.1f}%", icon="🔄",
        sub="Benchmark: 14.7% store average",
        delta=f"{return_rate - 14.7:+.1f}% vs avg",
        delta_type="neg" if return_rate > 14.7 else "pos",
        accent="#F59E0B", icon_bg="#FFFBEB"),
    kpi_card_html(f"Avg Rating · {len(rated):,} items", f"{avg_rating:.2f} / 5.0", icon="⭐",
        sub="16.6% of items have no rating",
        accent="#14B8A6", icon_bg="#F0FDFA"),
)

st.divider()

# ── Monthly trend ─────────────────────────────────────────────────────────────

section_intro(
    "Revenue Over Time",
    "Monthly revenue shows how sales have evolved across the year. The spike in August 2025 is a "
    "data concentration artefact — 75.7% of all records fall in that single month. "
    "Focus on the shape of the curve for pre-August months to infer seasonal patterns."
)

monthly = (
    filtered.groupby(filtered["purchase_date"].dt.to_period("M"))["current_price"]
    .sum().reset_index()
)
monthly.columns = ["month", "revenue"]
monthly["month_str"] = monthly["month"].astype(str)
monthly = monthly.sort_values("month_str")

fig_trend = px.line(monthly, x="month_str", y="revenue", markers=True,
    title="Monthly Revenue Trend",
    labels={"month_str": "Month", "revenue": "Revenue ($)"},
    color_discrete_sequence=[DATALIFE_COLORS[0]])
fig_trend.update_traces(line=dict(width=2.5), marker=dict(size=7))
fig_trend.add_annotation(
    text="⚠️ Aug 2025 = 75.7% of all records — data skew, not a true spike",
    xref="paper", yref="paper", x=0.01, y=0.95, showarrow=False,
    font=dict(size=11, color="#B45309"), bgcolor="#FFFBEB",
    bordercolor="#F59E0B", borderwidth=1, borderpad=6,
)
apply_datalife_theme(fig_trend)
st.plotly_chart(fig_trend, use_container_width=True)

insight_box(
    "<strong>What to look for:</strong> Months with consistently lower revenue (e.g. Oct 2024 −26%, "
    "May 2025 −33%) represent genuine demand dips worth investigating — are they seasonal, "
    "supply-driven, or caused by reduced assortment?",
    kind="blue",
)

st.divider()

# ── Category revenue | Season revenue ────────────────────────────────────────

section_intro(
    "Revenue Breakdown",
    "Which categories and seasons generate the most value? "
    "Outerwear leads at $48,673 (26.2%) despite being a specialised category — "
    "its high average price ($145) more than compensates for fewer units. "
    "Accessories, while the most numerous items, generate the least revenue per item ($43 avg)."
)

cat_rev = filtered.groupby("category")["current_price"].sum().reset_index().sort_values("current_price", ascending=True)
season_rev = filtered.groupby("season")["current_price"].sum().reset_index().sort_values("current_price", ascending=False)

col1, col2 = st.columns(2)
with col1:
    fig_cat = px.bar(cat_rev, x="current_price", y="category", orientation="h",
        title="Revenue by Category",
        labels={"current_price": "Revenue ($)", "category": ""},
        color_discrete_sequence=[DATALIFE_COLORS[0]])
    apply_datalife_theme(fig_cat, height=350)
    st.plotly_chart(fig_cat, use_container_width=True)

with col2:
    fig_season = px.bar(season_rev, x="season", y="current_price",
        title="Revenue by Season",
        labels={"current_price": "Revenue ($)", "season": "Season"},
        color="season",
        color_discrete_sequence=DATALIFE_COLORS)
    apply_datalife_theme(fig_season, height=350)
    fig_season.update_layout(showlegend=False)
    st.plotly_chart(fig_season, use_container_width=True)

st.divider()

# ── Revenue vs Markdown loss ──────────────────────────────────────────────────

section_intro(
    "Revenue vs Markdown Losses by Category",
    "For every dollar earned, some was surrendered through discounting. "
    "This chart shows both bars side by side — the gap between them is the markdown cost. "
    "Shoes loses the most ($6,208) despite having the second-highest revenue. "
    "Accessories has the highest proportion of items marked down (164 items) yet the lowest absolute loss."
)

grp = filtered.groupby("category").agg(revenue=("current_price","sum"), markdown_loss=("revenue_lost","sum")).reset_index().sort_values("revenue", ascending=False)

fig_grp = go.Figure()
fig_grp.add_trace(go.Bar(name="Revenue Earned", x=grp["category"], y=grp["revenue"], marker_color=DATALIFE_COLORS[0], marker_line_width=0))
fig_grp.add_trace(go.Bar(name="Lost to Markdowns", x=grp["category"], y=grp["markdown_loss"], marker_color="#EF4444", marker_line_width=0))
fig_grp.update_layout(barmode="group", title="Revenue vs Markdown Loss by Category", xaxis_title="", yaxis_title="Amount ($)")
apply_datalife_theme(fig_grp)
st.plotly_chart(fig_grp, use_container_width=True)

top_loss_cat = grp.loc[grp["markdown_loss"].idxmax(), "category"]
top_loss_amt = grp["markdown_loss"].max()
loss_pct     = top_loss_amt / grp["revenue"].loc[grp["markdown_loss"].idxmax()] * 100
insight_box(
    f"<strong>{top_loss_cat} loses the most to markdowns</strong> — ${top_loss_amt:,.0f} "
    f"({loss_pct:.1f}% of its own revenue). Review whether discounts in this category are driving "
    "volume or simply eroding margin without improving sell-through.",
    kind="amber",
)
