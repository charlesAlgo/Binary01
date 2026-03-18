"""
DataLife — Markdown & Pricing Dashboard Page.

Analyses markdown depth, revenue losses, the relationship between markdowns
and customer ratings, and surfaces dead inventory items.
Filters: Category multiselect, Markdown threshold slider.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.charts import apply_datalife_theme, inject_css, kpi_card, DATALIFE_COLORS, page_header, insight_box, section_intro

st.set_page_config(page_title="Markdown & Pricing — DataLife", layout="wide", page_icon="💸")
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
markdown_threshold = st.sidebar.slider(
    "Markdown Threshold (%)", min_value=0, max_value=60, value=30, step=1,
    help="Reference line on scatter plot; dead inventory is flagged above 30% markdown AND rating below 2.5.",
)

filtered = df.copy()
if selected_categories:
    filtered = filtered[filtered["category"].isin(selected_categories)]

# ── Hero ──────────────────────────────────────────────────────────────────────

page_header(
    title="Markdown & Pricing",
    description=(
        "An in-depth look at discounting behaviour across the store. "
        "How deep are markdowns? Which categories are losing the most revenue to discounts? "
        "Is there a relationship between discounting and customer satisfaction? "
        "And which items are so heavily discounted and poorly rated that they qualify as dead inventory?"
    ),
    badge="Pricing Strategy",
    icon="💸",
)

st.markdown(f"Showing **{len(filtered):,}** of {len(df):,} transactions.")

if filtered.empty:
    st.warning("No data matches the selected filters. Please adjust the sidebar.")
    st.stop()

# ── KPIs ──────────────────────────────────────────────────────────────────────

dead = filtered[filtered["is_dead_inventory"] == True]
dead_count = len(dead)
dead_revenue_tied = dead["current_price"].sum()
marked_down = filtered["is_marked_down"].sum()
total_revenue_lost = filtered["revenue_lost"].sum()

section_intro(
    "Pricing Health at a Glance",
    "Dead inventory is the most severe pricing problem: items with markdown above 30% AND customer rating below 2.5. "
    "These items are being discounted to move stock that customers already find unsatisfying. "
    "The revenue tied up in them represents capital that could be redeployed into better-performing SKUs."
)

kpi1, kpi2, kpi3, kpi4 = st.columns(4)
with kpi1:
    st.metric(**kpi_card("Dead Inventory Items", f"{dead_count:,}",
        help="Items with markdown > 30% AND rating < 2.5. These are being discounted despite poor customer satisfaction."))
with kpi2:
    st.metric(**kpi_card("Revenue Tied in Dead Inv.", f"${dead_revenue_tied:,.2f}",
        help="Total current_price value of all dead inventory items."))
with kpi3:
    st.metric(**kpi_card("Marked Down Items", f"{marked_down:,}",
        help=f"{marked_down / len(filtered) * 100:.1f}% of filtered transactions have a markdown applied."))
with kpi4:
    st.metric(**kpi_card("Total Markdown Loss", f"${total_revenue_lost:,.2f}",
        help="Sum of (original_price - current_price) across all marked-down items."))

if dead_count > 0:
    insight_box(
        f"<strong>{dead_count} items qualify as dead inventory</strong>, locking up ${dead_revenue_tied:,.0f} in slow-moving stock. "
        "Scroll to the Dead Inventory table below to see which specific items these are — "
        "prioritise clearance or discontinuation for the highest-markdown rows first.",
        kind="red",
    )

st.divider()

# ── Markdown distribution | Revenue lost by category ─────────────────────────

section_intro(
    "Markdown Distribution & Revenue Loss",
    "The histogram shows where markdowns cluster — a spike at 0% means most items sell at full price; "
    "a spread across 20–50% suggests reactive discounting. "
    "The bar chart shows the absolute dollar loss per category — "
    "this is the real cost of the discounting strategy, not just a percentage."
)

col1, col2 = st.columns(2)

with col1:
    fig = px.histogram(filtered, x="markdown_percentage", nbins=30,
        title="Markdown % Distribution",
        labels={"markdown_percentage": "Markdown (%)", "count": "Items"},
        color_discrete_sequence=[DATALIFE_COLORS[0]], height=350)
    fig.add_vline(x=markdown_threshold, line_dash="dash", line_color="#F59E0B",
        annotation_text=f"Threshold: {markdown_threshold}%", annotation_position="top right",
        annotation_font=dict(color="#B45309", size=11))
    apply_datalife_theme(fig)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    loss = (
        filtered.groupby("category")["revenue_lost"].sum().reset_index()
        .sort_values("revenue_lost", ascending=False)
    )
    fig2 = px.bar(loss, x="category", y="revenue_lost",
        title="Revenue Lost to Markdowns by Category",
        labels={"revenue_lost": "Revenue Lost ($)", "category": "Category"},
        color_discrete_sequence=[DATALIFE_COLORS[5]], height=350)
    apply_datalife_theme(fig2)
    st.plotly_chart(fig2, use_container_width=True)

top_loss_cat = loss.iloc[0]["category"] if not loss.empty else "N/A"
top_loss_amt = loss.iloc[0]["revenue_lost"] if not loss.empty else 0
insight_box(
    f"<strong>{top_loss_cat} loses the most to markdowns (${top_loss_amt:,.0f})</strong>. "
    "Check whether those discounts are strategic (seasonal, end-of-line) or reactive (slow sell-through, poor ratings). "
    "If the category's ratings are also low, discounting isn't fixing the root problem.",
    kind="amber",
)

st.divider()

# ── Markdown % vs Customer Rating scatter ─────────────────────────────────────

section_intro(
    "Markdown vs Customer Rating",
    "This scatter plot reveals whether discounting correlates with product quality. "
    "Items in the top-left quadrant (low markdown, high rating) are your stars — full-price products customers love. "
    "Items in the bottom-right quadrant (high markdown, low rating) are the dead inventory zone. "
    "A healthy store should have most dots in the top-left. "
    "Use the sidebar slider to move the vertical reference line and explore different markdown thresholds."
)

rated = filtered[filtered["has_rating"] == True]
if not rated.empty:
    fig3 = px.scatter(rated, x="markdown_percentage", y="customer_rating", color="category",
        title=f"Markdown % vs Customer Rating (rated items, n={len(rated):,})",
        labels={"markdown_percentage": "Markdown (%)", "customer_rating": "Customer Rating", "category": "Category"},
        color_discrete_sequence=DATALIFE_COLORS, opacity=0.65, height=450,
        hover_data=["brand", "original_price", "current_price"])
    fig3.add_vline(x=markdown_threshold, line_dash="dash", line_color="#64748B",
        annotation_text=f"Markdown threshold: {markdown_threshold}%",
        annotation_position="top right")
    fig3.add_hline(y=2.5, line_dash="dot", line_color="#EF4444",
        annotation_text="Rating 2.5 — dead inventory zone",
        annotation_position="bottom right",
        annotation_font=dict(color="#EF4444", size=11))
    apply_datalife_theme(fig3)
    st.plotly_chart(fig3, use_container_width=True)
    insight_box(
        "<strong>How to read this scatter:</strong> Each dot is one transaction. "
        "The red horizontal line at 2.5 is the quality floor for dead inventory classification. "
        "The dashed vertical line is your adjustable markdown threshold (use the sidebar). "
        "Dots below both lines and to the right of the threshold are the most problematic — "
        "deeply discounted AND poorly rated.",
        kind="blue",
    )
else:
    st.warning("No rated items available for the current filter selection.")

st.divider()

# ── Dead inventory table ───────────────────────────────────────────────────────

section_intro(
    "Dead Inventory Detail",
    f"These {dead_count} items meet the dead inventory criteria: markdown percentage above 30% AND customer rating below 2.5. "
    "Sorted by markdown depth descending — the most heavily discounted items appear first. "
    "These are candidates for clearance pricing, bundle deals, or discontinuation before the next buying cycle."
)

if dead.empty:
    st.info("No dead inventory items in the current filter selection.")
else:
    dead_display = (
        dead[["product_id", "category", "brand", "original_price", "current_price",
              "markdown_percentage", "customer_rating", "stock_quantity"]]
        .sort_values("markdown_percentage", ascending=False)
        .copy()
    )
    dead_display["original_price"] = dead_display["original_price"].map("${:,.2f}".format)
    dead_display["current_price"] = dead_display["current_price"].map("${:,.2f}".format)
    dead_display["markdown_percentage"] = dead_display["markdown_percentage"].map("{:.1f}%".format)
    dead_display["customer_rating"] = dead_display["customer_rating"].apply(
        lambda v: f"{v:.1f}" if pd.notna(v) else "N/A"
    )
    st.dataframe(dead_display, use_container_width=True, height=400)
