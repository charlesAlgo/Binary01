"""
DataLife — Returns Analysis Dashboard Page.

Investigates return drivers across reason, brand, category, season, and size.
Includes KPI cards, bar charts, and a brand × category heatmap.
Filters: Category, Brand, Return Reason multiselects.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.charts import apply_datalife_theme, inject_css, kpi_card, DATALIFE_COLORS, page_header, insight_box, section_intro

st.set_page_config(page_title="Returns Analysis — DataLife", layout="wide", page_icon="🔄")
inject_css()

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "cleaned" / "fashion_boutique_cleaned.csv"

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
all_categories = sorted(df["category"].dropna().unique().tolist())
selected_categories = st.sidebar.multiselect("Category", options=all_categories, default=all_categories)
all_brands = sorted(df["brand"].dropna().unique().tolist())
selected_brands = st.sidebar.multiselect("Brand", options=all_brands, default=all_brands)
all_reasons = sorted(df["return_reason"].dropna().unique().tolist())
selected_reasons = st.sidebar.multiselect(
    "Return Reason", options=all_reasons, default=all_reasons,
    help="Filters the return-reason chart only. KPIs and heatmaps use the full filtered dataset.",
)

filtered = df.copy()
if selected_categories: filtered = filtered[filtered["category"].isin(selected_categories)]
if selected_brands:     filtered = filtered[filtered["brand"].isin(selected_brands)]

returns_all = filtered[filtered["is_returned"] == True].copy()
if selected_reasons:
    returns_filtered = returns_all[returns_all["return_reason"].isin(selected_reasons)]
else:
    returns_filtered = returns_all.copy()

# ── Hero ──────────────────────────────────────────────────────────────────────

page_header(
    title="Returns Analysis",
    description=(
        "A deep dive into what's driving the 14.7% return rate. "
        "Returns are expensive — they consume logistics cost, restocking time, and customer goodwill. "
        "This view breaks down returns by reason, brand, category, season, and size "
        "so you can distinguish between fixable operational issues and deeper product quality problems."
    ),
    badge="Return Intelligence",
    icon="🔄",
)

st.markdown(f"Showing **{len(filtered):,}** of {len(df):,} transactions.")

if filtered.empty:
    st.warning("No data matches the selected filters. Please adjust the sidebar.")
    st.stop()

# ── KPIs ──────────────────────────────────────────────────────────────────────

total_returns = int(filtered["is_returned"].sum())
return_rate = filtered["is_returned"].mean() * 100
revenue_lost_returns = filtered.loc[filtered["is_returned"] == True, "current_price"].sum()
top_reason = returns_all["return_reason"].value_counts().idxmax() if not returns_all.empty else "N/A"

section_intro(
    "Returns at a Glance",
    "Return rate is the primary health metric here. Revenue lost to returns measures the commercial impact — "
    "these are items sold, then taken back, representing a complete revenue reversal plus logistics cost. "
    "The top return reason tells you where to start your investigation."
)

kpi1, kpi2, kpi3, kpi4 = st.columns(4)
with kpi1:
    st.metric(**kpi_card("Total Returns", f"{total_returns:,}",
        help="Count of transactions where is_returned = True in the current filter."))
with kpi2:
    st.metric(**kpi_card("Return Rate", f"{return_rate:.1f}%",
        help="Store benchmark is 14.7%. Above this threshold warrants investigation."))
with kpi3:
    st.metric(**kpi_card("Revenue Lost to Returns", f"${revenue_lost_returns:,.2f}",
        help="Sum of current_price for all returned items — the full revenue reversal."))
with kpi4:
    st.metric(**kpi_card("Top Return Reason", top_reason,
        help="The single most common reason customers gave for returning items."))

st.divider()

# ── Return reasons | Return rate by brand ────────────────────────────────────

section_intro(
    "What's Driving Returns?",
    "The return reason chart reveals whether problems are operational or structural. "
    "'Changed Mind' is the most fixable — better product photos and descriptions reduce it. "
    "'Size Issue' points to a sizing guide problem — a size chart update can cut this significantly. "
    "'Wrong Item' is a fulfillment error — warehouse or packaging process issue, not a product problem. "
    "'Defective' is the most serious — it means the product itself is failing, requiring supplier action."
)

col1, col2 = st.columns(2)

with col1:
    if not returns_filtered.empty:
        reason_counts = returns_filtered["return_reason"].value_counts().reset_index()
        reason_counts.columns = ["reason", "count"]
        fig = px.bar(reason_counts, x="reason", y="count",
            title="Return Count by Reason",
            labels={"reason": "Return Reason", "count": "Number of Returns"},
            color_discrete_sequence=[DATALIFE_COLORS[5]], height=350)
        apply_datalife_theme(fig)
        st.plotly_chart(fig, use_container_width=True)
    else:
        st.warning("No returns match the selected return reason filter.")

with col2:
    OVERALL_RETURN_RATE = 14.7
    rr = (
        filtered.groupby("brand")["is_returned"].mean().mul(100).reset_index()
        .rename(columns={"is_returned": "return_rate"})
        .sort_values("return_rate", ascending=True)
    )
    rr["color"] = rr["return_rate"].apply(lambda v: "#EF4444" if v > OVERALL_RETURN_RATE else DATALIFE_COLORS[0])
    fig2 = px.bar(rr, x="return_rate", y="brand", orientation="h",
        title=f"Return Rate by Brand (avg: {OVERALL_RETURN_RATE}%)",
        labels={"return_rate": "Return Rate (%)", "brand": "Brand"},
        color="color", color_discrete_map="identity", height=350)
    fig2.add_vline(x=OVERALL_RETURN_RATE, line_dash="dash", line_color="#94A3B8",
        annotation_text=f"Avg {OVERALL_RETURN_RATE}%", annotation_position="top right",
        annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig2)
    fig2.update_layout(showlegend=False)
    st.plotly_chart(fig2, use_container_width=True)

# Dynamic insight: top reason interpretation
if top_reason == "Changed Mind":
    insight_box(
        "<strong>'Changed Mind' leads returns</strong> — this is the most addressable return reason. "
        "It typically signals a gap between customer expectations set by product listings "
        "and the actual product experience. Better photos, more detailed descriptions, and customer reviews "
        "are proven interventions.",
        kind="amber",
    )
elif top_reason == "Size Issue":
    insight_box(
        "<strong>'Size Issue' leads returns</strong> — an immediately actionable finding. "
        "Adding or improving a size guide, including model measurements and garment measurements, "
        "typically reduces size-related returns by 20–40% within one season.",
        kind="amber",
    )
elif top_reason == "Defective":
    insight_box(
        "<strong>'Defective' leads returns</strong> — this requires urgent supplier engagement. "
        "Defective returns are the most damaging to brand trust and cannot be fixed by marketing. "
        "Identify which brands and categories have the most defective returns from the heatmap below.",
        kind="red",
    )
else:
    insight_box(
        f"<strong>'{top_reason}' is the leading return reason.</strong> "
        "Use the heatmap at the bottom of this page to identify which brand-category combinations "
        "are contributing most heavily to this pattern.",
        kind="blue",
    )

st.divider()

# ── Return rate by category | by season ──────────────────────────────────────

section_intro(
    "Returns by Category & Season",
    "Category return rates reveal whether the problem is product-type specific. "
    "High return rates in Shoes or Dresses often correlate with fit issues; "
    "high rates in Accessories may suggest quality perception gaps. "
    "Season return rates help identify whether certain collections underperform "
    "relative to customer expectations set by seasonal campaigns."
)

col3, col4 = st.columns(2)

with col3:
    rr_cat = (
        filtered.groupby("category")["is_returned"].mean().mul(100).reset_index()
        .rename(columns={"is_returned": "return_rate"})
        .sort_values("return_rate", ascending=False)
    )
    rr_cat["color"] = rr_cat["return_rate"].apply(lambda v: "#EF4444" if v > 14.7 else DATALIFE_COLORS[2])
    fig3 = px.bar(rr_cat, x="category", y="return_rate",
        title="Return Rate by Category",
        labels={"return_rate": "Return Rate (%)", "category": "Category"},
        color="color", color_discrete_map="identity", height=350)
    fig3.add_hline(y=14.7, line_dash="dot", line_color="#94A3B8",
        annotation_text="Store avg 14.7%", annotation_position="top right",
        annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig3)
    fig3.update_layout(showlegend=False)
    st.plotly_chart(fig3, use_container_width=True)

with col4:
    rr_sea = (
        filtered.groupby("season")["is_returned"].mean().mul(100).reset_index()
        .rename(columns={"is_returned": "return_rate"})
        .sort_values("return_rate", ascending=False)
    )
    fig4 = px.bar(rr_sea, x="season", y="return_rate",
        title="Return Rate by Season",
        labels={"return_rate": "Return Rate (%)", "season": "Season"},
        color_discrete_sequence=[DATALIFE_COLORS[3]], height=350)
    fig4.add_hline(y=14.7, line_dash="dot", line_color="#94A3B8",
        annotation_text="Store avg 14.7%", annotation_position="top right",
        annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig4)
    st.plotly_chart(fig4, use_container_width=True)

st.divider()

# ── Return rate by size ───────────────────────────────────────────────────────

section_intro(
    "Returns by Size",
    "Size return rates identify which specific sizes are most problematic. "
    "If XS and XL have the highest return rates, it suggests the size range extremes are cut inconsistently. "
    "If all sizes return at similar rates, the problem is likely not sizing — look at product quality instead. "
    "'One Size' and 'Unknown' categories are excluded from this analysis."
)

size_df = filtered[~filtered["size"].isin(["One Size", "Unknown"])]
if not size_df.empty:
    rr_size = (
        size_df.groupby("size")["is_returned"].mean().mul(100).reset_index()
        .rename(columns={"is_returned": "return_rate"})
        .sort_values("return_rate", ascending=False)
    )
    fig5 = px.bar(rr_size, x="size", y="return_rate",
        title="Return Rate by Size (excludes 'One Size' and 'Unknown')",
        labels={"return_rate": "Return Rate (%)", "size": "Size"},
        color_discrete_sequence=[DATALIFE_COLORS[4]], height=400)
    fig5.add_hline(y=14.7, line_dash="dot", line_color="#94A3B8",
        annotation_text="Store avg 14.7%", annotation_position="top right",
        annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig5)
    st.plotly_chart(fig5, use_container_width=True)
else:
    st.warning("No size data available after excluding 'One Size' and 'Unknown'.")

st.divider()

# ── Brand × Category returns heatmap ─────────────────────────────────────────

section_intro(
    "Returns Heatmap: Brand × Category",
    "This heatmap shows the return count for each brand-category combination. "
    "A dark cell means many returns from that specific brand in that category — "
    "it's the most precise diagnostic tool on this page. "
    "Use it to answer: is the problem brand-wide, or is it specific to one category that brand offers?"
)

if not returns_all.empty:
    pivot = (
        returns_all.groupby(["brand", "category"]).size().reset_index(name="count")
        .pivot(index="brand", columns="category", values="count").fillna(0)
    )
    fig6 = go.Figure(data=go.Heatmap(
        z=pivot.values,
        x=pivot.columns.tolist(),
        y=pivot.index.tolist(),
        colorscale=[[0, "#F0F7FF"], [1, "#EF4444"]],
        text=pivot.values.astype(int),
        texttemplate="%{text}",
        hovertemplate="Brand: %{y}<br>Category: %{x}<br>Returns: %{z}<extra></extra>",
        showscale=True,
    ))
    fig6.update_layout(
        title="Return Count: Brand × Category",
        xaxis_title="Category",
        yaxis_title="Brand",
        height=max(400, len(pivot) * 40 + 120),
    )
    apply_datalife_theme(fig6)
    st.plotly_chart(fig6, use_container_width=True)
    insight_box(
        "<strong>How to use this heatmap:</strong> Find the darkest cells — those brand-category pairs have the highest absolute return counts. "
        "Cross-reference with the Brand Performance page to see if those brands also have low ratings in that category. "
        "Convergence of high returns + low rating = a procurement or supplier relationship that needs review.",
        kind="blue",
    )
else:
    st.warning("No returns found in the current filter selection.")
