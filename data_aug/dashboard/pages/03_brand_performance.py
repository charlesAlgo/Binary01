"""
DataLife — Brand Performance Dashboard Page.

Compares brands by revenue, return rate, average rating, and markdown depth.
Includes a styled comparison table, bar charts, and a brand × return-reason
heatmap.
Filters: Brand, Category, Season multiselects.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.charts import apply_datalife_theme, inject_css, DATALIFE_COLORS, page_header, insight_box, section_intro

st.set_page_config(page_title="Brand Performance — DataLife", layout="wide", page_icon="🏷️")
inject_css()

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "cleaned" / "fashion_boutique_cleaned.csv"
OVERALL_RETURN_RATE = 14.7

@st.cache_data
def load_data() -> pd.DataFrame:
    df = pd.read_csv(DATA_PATH, parse_dates=["purchase_date"])
    for col in ["is_returned", "is_marked_down", "has_rating", "is_out_of_stock", "is_dead_inventory"]:
        if col in df.columns:
            df[col] = df[col].astype(bool)
    return df

df = load_data()

# ── Sidebar filters ───────────────────────────────────────────────────────────

st.sidebar.header("Filters")
all_brands = sorted(df["brand"].dropna().unique().tolist())
selected_brands = st.sidebar.multiselect("Brand", options=all_brands, default=all_brands)
all_categories = sorted(df["category"].dropna().unique().tolist())
selected_categories = st.sidebar.multiselect("Category", options=all_categories, default=all_categories)
all_seasons = sorted(df["season"].dropna().unique().tolist())
selected_seasons = st.sidebar.multiselect("Season", options=all_seasons, default=all_seasons)

filtered = df.copy()
if selected_brands:     filtered = filtered[filtered["brand"].isin(selected_brands)]
if selected_categories: filtered = filtered[filtered["category"].isin(selected_categories)]
if selected_seasons:    filtered = filtered[filtered["season"].isin(selected_seasons)]

# ── Hero ──────────────────────────────────────────────────────────────────────

page_header(
    title="Brand Performance",
    description=(
        "A head-to-head comparison of all 8 brands across revenue, return rate, "
        "customer rating, and markdown depth. Use this view to identify which brands "
        "are driving quality returns vs. which are dragging satisfaction scores — "
        "and where return problems are concentrated by reason."
    ),
    badge="Brand Analysis",
    icon="🏷️",
)

st.markdown(f"Showing **{len(filtered):,}** of {len(df):,} transactions.")

if filtered.empty:
    st.warning("No data matches the selected filters. Please adjust the sidebar.")
    st.stop()

# ── Brand comparison table ─────────────────────────────────────────────────────

section_intro(
    "Brand Scorecard",
    "Each row is a brand. Revenue ranks them by commercial impact. "
    "Return Rate tells you where trust breaks down — anything above 14.7% (the store average) is a red flag. "
    "Avg Rating (rated items only) tells you about product quality from the customer's perspective. "
    "The highest-return-rate brand is highlighted in red."
)

def build_brand_table(df_in: pd.DataFrame) -> pd.DataFrame:
    rated_df = df_in[df_in["has_rating"] == True]
    base = (
        df_in.groupby("brand")
        .agg(Items=("product_id", "count"), Revenue=("current_price", "sum"),
             return_rate_raw=("is_returned", "mean"), Avg_Markdown=("markdown_percentage", "mean"))
        .reset_index()
    )
    base["Return Rate (%)"] = (base["return_rate_raw"] * 100).round(1)
    base = base.drop(columns=["return_rate_raw"])
    ratings = (
        rated_df.groupby("brand")["customer_rating"].mean().reset_index()
        .rename(columns={"customer_rating": "Avg Rating"})
    )
    table = base.merge(ratings, on="brand", how="left")
    table["Avg Rating"] = table["Avg Rating"].round(2)
    table["Avg Markdown (%)"] = table["Avg_Markdown"].round(1)
    table = table.drop(columns=["Avg_Markdown"])
    table["Revenue"] = table["Revenue"].round(2)
    table = table.sort_values("Revenue", ascending=False).rename(columns={"brand": "Brand"})
    return table[["Brand", "Items", "Revenue", "Return Rate (%)", "Avg Rating", "Avg Markdown (%)"]]

def style_brand_table(df_t: pd.DataFrame, worst_brand: str) -> pd.io.formats.style.Styler:
    def row_highlight(row):
        if row["Brand"] == worst_brand:
            return ["background-color: #FEE2E2"] * len(row)
        return [""] * len(row)
    styled = (
        df_t.style
        .apply(row_highlight, axis=1)
        .format({"Revenue": "${:,.2f}", "Return Rate (%)": "{:.1f}%", "Avg Rating": "{:.2f}", "Avg Markdown (%)": "{:.1f}%"})
        .set_table_styles([
            {"selector": "thead th", "props": [("background-color", "#7C3AED"), ("color", "white"), ("font-weight", "600")]},
        ])
    )
    return styled

brand_table = build_brand_table(filtered)
worst_rr_brand = brand_table.loc[brand_table["Return Rate (%)"].idxmax(), "Brand"] if not brand_table.empty else None
worst_rr_val = brand_table["Return Rate (%)"].max() if not brand_table.empty else 0
lowest_rated_brand = brand_table.loc[brand_table["Avg Rating"].idxmin(), "Brand"] if not brand_table.empty else None
lowest_rated_val = brand_table["Avg Rating"].min() if not brand_table.empty else 0

if worst_rr_brand:
    st.caption(f"Row highlighted in red = highest return rate brand: **{worst_rr_brand}**")
st.dataframe(style_brand_table(brand_table, worst_rr_brand), use_container_width=True, height=400)

if worst_rr_brand and worst_rr_val > OVERALL_RETURN_RATE:
    insight_box(
        f"<strong>{worst_rr_brand} has the highest return rate at {worst_rr_val:.1f}%</strong> — "
        f"that's {worst_rr_val / OVERALL_RETURN_RATE:.2f}× the store average of {OVERALL_RETURN_RATE}%. "
        "Drill into the heatmap below to see which return reasons and categories are driving this.",
        kind="red",
    )

if lowest_rated_brand and lowest_rated_val < 2.8:
    insight_box(
        f"<strong>{lowest_rated_brand} averages {lowest_rated_val:.2f}/5.0</strong> — below the 2.8 watch threshold. "
        "Low ratings often precede rising return rates as customer dissatisfaction grows. "
        "Consider auditing product selection for this brand before re-ordering.",
        kind="amber",
    )

st.divider()

# ── Revenue | Return rate ─────────────────────────────────────────────────────

section_intro(
    "Revenue & Returns by Brand",
    "Revenue shows each brand's commercial contribution. "
    "The return rate chart uses the same 14.7% threshold as all other views — "
    "red bars signal brands that need attention. A brand can be high revenue AND high return rate, "
    "meaning it earns well but also costs in logistics, restocking, and customer dissatisfaction."
)

col1, col2 = st.columns(2)

with col1:
    rev = filtered.groupby("brand")["current_price"].sum().reset_index().sort_values("current_price", ascending=False)
    fig = px.bar(rev, x="brand", y="current_price",
        title="Revenue by Brand",
        labels={"current_price": "Revenue ($)", "brand": "Brand"},
        color_discrete_sequence=[DATALIFE_COLORS[0]], height=350)
    apply_datalife_theme(fig)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    rr = (
        filtered.groupby("brand")["is_returned"].mean().mul(100).reset_index()
        .rename(columns={"is_returned": "return_rate"})
        .sort_values("return_rate", ascending=True)
    )
    rr["color"] = rr["return_rate"].apply(lambda v: "#EF4444" if v > OVERALL_RETURN_RATE else DATALIFE_COLORS[0])
    fig2 = px.bar(rr, x="return_rate", y="brand", orientation="h",
        title=f"Return Rate by Brand (store avg: {OVERALL_RETURN_RATE}%)",
        labels={"return_rate": "Return Rate (%)", "brand": "Brand"},
        color="color", color_discrete_map="identity", height=350)
    fig2.add_vline(x=OVERALL_RETURN_RATE, line_dash="dash", line_color="#94A3B8",
        annotation_text=f"Avg {OVERALL_RETURN_RATE}%", annotation_position="top right",
        annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig2)
    fig2.update_layout(showlegend=False)
    st.plotly_chart(fig2, use_container_width=True)

st.divider()

# ── Brand × Return Reason heatmap ─────────────────────────────────────────────

section_intro(
    "Return Reason Heatmap",
    "Each cell shows how many returns a brand received for a specific reason. "
    "Darker cells = more returns. "
    "'Changed Mind' returns suggest poor product description or photos. "
    "'Size Issue' returns point to sizing guide problems. "
    "'Wrong Item' returns signal fulfillment or packaging errors — an operational fix, not a product fix. "
    "'Defective' returns indicate quality control failures at the manufacturer level."
)

returns = filtered[filtered["is_returned"] == True]
if not returns.empty:
    pivot = (
        returns.groupby(["brand", "return_reason"]).size().reset_index(name="count")
        .pivot(index="brand", columns="return_reason", values="count").fillna(0)
    )
    fig3 = go.Figure(data=go.Heatmap(
        z=pivot.values,
        x=pivot.columns.tolist(),
        y=pivot.index.tolist(),
        colorscale=[[0, "#F5F3FF"], [1, "#7C3AED"]],
        text=pivot.values.astype(int),
        texttemplate="%{text}",
        hovertemplate="Brand: %{y}<br>Reason: %{x}<br>Returns: %{z}<extra></extra>",
        showscale=True,
    ))
    fig3.update_layout(
        title="Return Count: Brand × Return Reason",
        xaxis_title="Return Reason",
        yaxis_title="Brand",
        height=max(400, len(pivot) * 40 + 120),
    )
    apply_datalife_theme(fig3)
    st.plotly_chart(fig3, use_container_width=True)

    # Identify dominant reason
    reason_totals = returns["return_reason"].value_counts()
    top_reason = reason_totals.index[0]
    top_reason_count = reason_totals.iloc[0]
    top_reason_pct = top_reason_count / len(returns) * 100
    insight_box(
        f"<strong>'{top_reason}' is the most common return reason ({top_reason_count} returns, {top_reason_pct:.1f}% of all returns).</strong> "
        "Look for which brands have the darkest cells in this column — those are the brands contributing most to this reason. "
        "Focus retention efforts there first.",
        kind="blue",
    )
else:
    st.warning("No returns found in the current filter selection.")
