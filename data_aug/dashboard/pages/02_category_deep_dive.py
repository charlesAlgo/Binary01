"""
DataLife — Category Deep Dive dashboard page.
Per-category revenue, return rates, markdown percentages, ratings, and rating distribution.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.charts import apply_datalife_theme, inject_css, DATALIFE_COLORS, page_header, insight_box, section_intro

st.set_page_config(page_title="Category Deep Dive — DataLife", layout="wide", page_icon="🔍")
inject_css()

DATA_PATH = Path(__file__).parent.parent.parent / "data" / "cleaned" / "fashion_boutique_cleaned.csv"
OVERALL_RETURN_RATE = 14.7

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
all_categories = sorted(df["category"].dropna().unique().tolist())
selected_categories = st.sidebar.multiselect("Category", all_categories, default=all_categories)
all_brands = sorted(df["brand"].dropna().unique().tolist())
selected_brands = st.sidebar.multiselect("Brand", all_brands, default=all_brands)
all_seasons = sorted(df["season"].dropna().unique().tolist())
selected_seasons = st.sidebar.multiselect("Season", all_seasons, default=all_seasons)

filtered = df.copy()
if selected_categories: filtered = filtered[filtered["category"].isin(selected_categories)]
if selected_brands:     filtered = filtered[filtered["brand"].isin(selected_brands)]
if selected_seasons:    filtered = filtered[filtered["season"].isin(selected_seasons)]

# ── Hero ──────────────────────────────────────────────────────────────────────

page_header(
    title="Category Deep Dive",
    description=(
        "A detailed breakdown of performance across the six product categories: "
        "Accessories, Bottoms, Dresses, Outerwear, Shoes, and Tops. "
        "Use this view to identify which categories are revenue leaders, which have quality issues, "
        "and which are over-discounted relative to their customer satisfaction scores."
    ),
    badge="Category Analysis",
    icon="🔍",
)

st.markdown(f"Showing **{len(filtered):,}** of {len(df):,} transactions.")

if filtered.empty:
    st.warning("No data matches the selected filters.")
    st.stop()

# ── Revenue | Return rate ─────────────────────────────────────────────────────

section_intro(
    "Revenue & Returns",
    "Revenue tells you where the money comes from. Return rate tells you where trust breaks down. "
    "Red bars exceed the 14.7% store average — a warning signal that needs investigation."
)

col1, col2 = st.columns(2)

with col1:
    rev = filtered.groupby("category")["current_price"].sum().reset_index().sort_values("current_price", ascending=True)
    fig = px.bar(rev, x="current_price", y="category", orientation="h",
        title="Total Revenue by Category",
        labels={"current_price": "Revenue ($)", "category": ""},
        color_discrete_sequence=[DATALIFE_COLORS[0]])
    apply_datalife_theme(fig, height=350)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    rr = filtered.groupby("category")["is_returned"].mean().mul(100).reset_index().rename(columns={"is_returned":"return_rate"}).sort_values("return_rate", ascending=False)
    rr["color"] = rr["return_rate"].apply(lambda v: "#EF4444" if v > OVERALL_RETURN_RATE else DATALIFE_COLORS[2])
    fig2 = px.bar(rr, x="category", y="return_rate",
        title=f"Return Rate by Category (store avg: {OVERALL_RETURN_RATE}%)",
        labels={"return_rate": "Return Rate (%)", "category": ""},
        color="color", color_discrete_map="identity")
    fig2.add_hline(y=OVERALL_RETURN_RATE, line_dash="dot", line_color="#94A3B8",
        annotation_text=f"Avg {OVERALL_RETURN_RATE}%", annotation_position="top right",
        annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig2, height=350)
    fig2.update_layout(showlegend=False)
    st.plotly_chart(fig2, use_container_width=True)

worst_rr = rr.iloc[0]
insight_box(
    f"<strong>{worst_rr['category']} has the highest return rate at {worst_rr['return_rate']:.1f}%</strong>. "
    "Use the Returns Analysis page to drill into which brands and sizes within this category "
    "are driving returns.",
    kind="amber" if worst_rr["return_rate"] > OVERALL_RETURN_RATE else "green",
)

st.divider()

# ── Markdown % | Avg rating ───────────────────────────────────────────────────

section_intro(
    "Discounting vs Satisfaction",
    "These two charts reveal whether categories are discounted because of poor quality or "
    "for strategic reasons. A category with high markdown AND low rating is a problem — "
    "you're giving it away and customers still aren't satisfied. "
    "A high-rated category with heavy discounting is leaving money on the table."
)

col3, col4 = st.columns(2)

with col3:
    md = filtered.groupby("category")["markdown_percentage"].mean().reset_index().sort_values("markdown_percentage", ascending=False)
    fig3 = px.bar(md, x="category", y="markdown_percentage",
        title="Avg Markdown % by Category",
        labels={"markdown_percentage": "Avg Markdown (%)", "category": ""},
        color_discrete_sequence=[DATALIFE_COLORS[4]])
    fig3.add_hline(y=filtered["markdown_percentage"].mean(), line_dash="dot", line_color="#94A3B8",
        annotation_text=f"Overall avg {filtered['markdown_percentage'].mean():.1f}%",
        annotation_position="top right", annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig3, height=350)
    st.plotly_chart(fig3, use_container_width=True)

with col4:
    rated = filtered[filtered["has_rating"]]
    if not rated.empty:
        rat = rated.groupby("category")["customer_rating"].mean().reset_index().sort_values("customer_rating", ascending=False)
        rat["color"] = rat["customer_rating"].apply(lambda v: "#EF4444" if v < 2.8 else DATALIFE_COLORS[2])
        fig4 = px.bar(rat, x="category", y="customer_rating",
            title=f"Avg Customer Rating by Category (n={len(rated):,} rated items)",
            labels={"customer_rating": "Avg Rating (/ 5.0)", "category": ""},
            color="color", color_discrete_map="identity")
        fig4.add_hline(y=2.8, line_dash="dot", line_color="#94A3B8",
            annotation_text="Watch threshold 2.8", annotation_position="bottom right",
            annotation_font=dict(color="#94A3B8", size=11))
        fig4.update_layout(yaxis_range=[0, 5], showlegend=False)
        apply_datalife_theme(fig4, height=350)
        st.plotly_chart(fig4, use_container_width=True)
    else:
        st.warning("No rated items in the current filter selection.")

# Find category with high markdown AND low rating
if not rated.empty:
    merged = md.merge(rat, on="category")
    danger = merged[(merged["markdown_percentage"] > merged["markdown_percentage"].mean()) & (merged["customer_rating"] < 3.0)]
    if not danger.empty:
        cats = ", ".join(danger["category"].tolist())
        insight_box(
            f"<strong>Watch: {cats}</strong> — above-average markdown AND below-average rating. "
            "These categories may be discounted to move stock that customers already find unsatisfying. "
            "Consider product selection review before re-ordering.",
            kind="red",
        )

st.divider()

# ── Rating distribution box plot ─────────────────────────────────────────────

section_intro(
    "Rating Distribution",
    "A box plot shows the spread of customer ratings within each category — not just the average. "
    "A wide box means inconsistent quality. A box sitting low on the scale means broadly poor satisfaction. "
    "Whiskers extending to 1.0 indicate some deeply dissatisfied customers."
)

if not rated.empty:
    fig5 = px.box(rated, x="category", y="customer_rating", color="category",
        title=f"Rating Distribution by Category (n={len(rated):,} rated items only)",
        labels={"customer_rating": "Customer Rating (1–5)", "category": "Category"},
        color_discrete_sequence=DATALIFE_COLORS)
    fig5.add_hline(y=2.99, line_dash="dot", line_color="#94A3B8",
        annotation_text="Dataset avg 2.99", annotation_position="top right",
        annotation_font=dict(color="#94A3B8", size=11))
    apply_datalife_theme(fig5, height=420)
    st.plotly_chart(fig5, use_container_width=True)
    insight_box(
        "<strong>How to read this:</strong> The box covers the middle 50% of ratings (IQR). "
        "The line inside is the median. Dots outside the whiskers are outlier reviews. "
        "A category with a low median AND a wide IQR has both bad average quality and high inconsistency — double trouble.",
        kind="blue",
    )
else:
    st.warning("No rated items available for the current filter selection.")
