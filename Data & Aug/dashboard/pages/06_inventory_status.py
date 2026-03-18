"""
DataLife — Inventory Status Dashboard Page.

Analyses stock levels, out-of-stock risk, markdown exposure, and surfaces a
per-category stock health summary table.
Filters: Category multiselect, Stock threshold slider.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))
from utils.charts import apply_datalife_theme, inject_css, kpi_card, DATALIFE_COLORS, page_header, insight_box, section_intro

st.set_page_config(page_title="Inventory Status — DataLife", layout="wide", page_icon="📦")
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
stock_threshold = st.sidebar.slider(
    "Low Stock Threshold (units)", min_value=0, max_value=50, value=10, step=1,
    help="Items with stock_quantity ≤ this value are flagged as low stock in the KPIs.",
)

filtered = df.copy()
if selected_categories:
    filtered = filtered[filtered["category"].isin(selected_categories)]

# ── Hero ──────────────────────────────────────────────────────────────────────

page_header(
    title="Inventory Status",
    description=(
        "Stock health analysis across all categories. "
        "Out-of-stock items represent lost sales opportunities — especially critical in high-revenue categories. "
        "Overstock items represent tied-up capital. "
        "This view helps you understand where inventory is balanced, where it's dangerously thin, "
        "and where discounting is being used to clear excess stock."
    ),
    badge="Inventory Intelligence",
    icon="📦",
)

st.markdown(f"Showing **{len(filtered):,}** of {len(df):,} transactions.")

if filtered.empty:
    st.warning("No data matches the selected filters. Please adjust the sidebar.")
    st.stop()

# ── KPIs ──────────────────────────────────────────────────────────────────────

total_items = len(filtered)
out_of_stock = int(filtered["is_out_of_stock"].sum())
avg_stock = filtered["stock_quantity"].mean()
low_stock_count = int((filtered["stock_quantity"] <= stock_threshold).sum())

section_intro(
    "Inventory Health at a Glance",
    "Out of stock is the most urgent signal — those are live sales being lost right now to competitors. "
    "Low stock items are the next watch category — they may become out of stock before the next restock cycle. "
    "Average stock level gives a baseline for whether inventory is broadly adequate or systemically thin."
)

kpi1, kpi2, kpi3, kpi4 = st.columns(4)
with kpi1:
    st.metric(**kpi_card("Total Items", f"{total_items:,}",
        help="Count of all transactions in the current filter selection."))
with kpi2:
    st.metric(**kpi_card("Out of Stock", f"{out_of_stock:,}",
        help="Items where is_out_of_stock = True. These represent active lost-sale events."))
with kpi3:
    st.metric(**kpi_card("Avg Stock Level", f"{avg_stock:.1f} units",
        help="Mean stock_quantity across all filtered items."))
with kpi4:
    st.metric(**kpi_card(f"Low Stock (≤ {stock_threshold} units)", f"{low_stock_count:,}",
        help=f"Items at or below your {stock_threshold}-unit threshold. Adjust the slider to explore different risk levels."))

if out_of_stock > 0:
    oos_by_cat = (
        filtered[filtered["is_out_of_stock"] == True]
        .groupby("category").size().sort_values(ascending=False)
    )
    top_oos_cat = oos_by_cat.index[0] if not oos_by_cat.empty else "N/A"
    top_oos_count = int(oos_by_cat.iloc[0]) if not oos_by_cat.empty else 0
    insight_box(
        f"<strong>{out_of_stock} items are currently out of stock</strong>. "
        f"{top_oos_cat} has the most ({top_oos_count} items) — "
        "this is a high-revenue category, meaning every out-of-stock day is a meaningful lost-sales opportunity. "
        "Restock decisions should be prioritised by revenue impact, not just unit count.",
        kind="red",
    )

st.divider()

# ── Stock distribution | OOS by category ─────────────────────────────────────

section_intro(
    "Stock Level Distribution & Out-of-Stock Breakdown",
    "The histogram shows how stock quantities are distributed. "
    "A left-skewed distribution (most items clustered near 0) signals systemic understocking. "
    "A right-skewed distribution (many items with high stock) may indicate overbuying. "
    "The OOS bar chart shows which categories have the most active stockouts — "
    "these should be your immediate reorder priorities."
)

col1, col2 = st.columns(2)

with col1:
    fig = px.histogram(filtered, x="stock_quantity", nbins=30,
        title="Stock Level Distribution",
        labels={"stock_quantity": "Stock Quantity (units)", "count": "Items"},
        color_discrete_sequence=[DATALIFE_COLORS[0]], height=350)
    fig.add_vline(x=stock_threshold, line_dash="dash", line_color="#F59E0B",
        annotation_text=f"Low stock: {stock_threshold} units", annotation_position="top right",
        annotation_font=dict(color="#B45309", size=11))
    apply_datalife_theme(fig)
    st.plotly_chart(fig, use_container_width=True)

with col2:
    oos = (
        filtered[filtered["is_out_of_stock"] == True]
        .groupby("category").size().reset_index(name="oos_count")
        .sort_values("oos_count", ascending=False)
    )
    if not oos.empty:
        fig2 = px.bar(oos, x="category", y="oos_count",
            title="Out of Stock Items by Category",
            labels={"oos_count": "Out of Stock Items", "category": "Category"},
            color_discrete_sequence=["#EF4444"], height=350)
        apply_datalife_theme(fig2)
        st.plotly_chart(fig2, use_container_width=True)
    else:
        st.success("No out-of-stock items in the current filter selection.")

st.divider()

# ── Stock quantity vs Markdown % scatter ─────────────────────────────────────

section_intro(
    "Stock vs Markdown: Spotting Overstock Under Pressure",
    "This scatter plot reveals the relationship between how much stock exists and how heavily it's being discounted. "
    "Items in the top-right quadrant (high stock, high markdown) are overstock under pricing pressure — "
    "the business is trying to clear excess inventory through discounts. "
    "Items in the bottom-left (low stock, low markdown) are your healthy performers. "
    "Items in the top-left (low stock, high markdown) are the most complex signal: "
    "why is a scarce item being discounted? This may indicate a quality or demand problem."
)

fig3 = px.scatter(filtered, x="stock_quantity", y="markdown_percentage", color="category",
    title="Stock Quantity vs Markdown % by Category",
    labels={"stock_quantity": "Stock Quantity (units)", "markdown_percentage": "Markdown (%)", "category": "Category"},
    color_discrete_sequence=DATALIFE_COLORS, opacity=0.65, height=450,
    hover_data=["brand", "current_price", "is_out_of_stock"])
fig3.add_vline(x=10, line_dash="dash", line_color="#EF4444",
    annotation_text="Low stock (10 units)", annotation_position="top right",
    annotation_font=dict(color="#EF4444", size=11))
fig3.add_hline(y=25, line_dash="dot", line_color="#F59E0B",
    annotation_text="Markdown 25%", annotation_position="bottom right",
    annotation_font=dict(color="#B45309", size=11))
apply_datalife_theme(fig3)
st.plotly_chart(fig3, use_container_width=True)

# Count items in the overstock-under-pressure quadrant
overstock_pressure = filtered[(filtered["stock_quantity"] > 10) & (filtered["markdown_percentage"] > 25)]
if len(overstock_pressure) > 0:
    top_cats_op = overstock_pressure["category"].value_counts().head(2).index.tolist()
    insight_box(
        f"<strong>{len(overstock_pressure)} items have high stock AND high markdown (>10 units, >25% off)</strong> — "
        f"concentrated in {', '.join(top_cats_op)}. "
        "These are overstock items being cleared through discounting. "
        "If this pattern is recurring season-over-season, it signals a buying strategy problem: "
        "too many units ordered relative to actual demand.",
        kind="amber",
    )

st.divider()

# ── Stock status summary table ────────────────────────────────────────────────

section_intro(
    "Stock Health Summary by Category",
    "This table gives a complete picture of inventory health at the category level. "
    "Sort by 'Out of Stock' to prioritise reorder urgency. "
    "Sort by 'High Markdown Items' to see where excess inventory is being cleared. "
    "Categories with both high OOS and high markdown items in different SKUs "
    "indicate a distribution problem — wrong items were bought in the wrong quantities."
)

summary = (
    filtered.groupby("category")
    .agg(Items=("product_id", "count"), Out_of_Stock=("is_out_of_stock", "sum"), Avg_Stock=("stock_quantity", "mean"))
    .reset_index()
)
high_md = (
    filtered[filtered["markdown_percentage"] > 30]
    .groupby("category").size().reset_index(name="High_Markdown_Items")
)
summary = summary.merge(high_md, on="category", how="left").fillna(0)
summary["Avg_Stock"] = summary["Avg_Stock"].round(1)
summary["High_Markdown_Items"] = summary["High_Markdown_Items"].astype(int)
summary["Out_of_Stock"] = summary["Out_of_Stock"].astype(int)
summary = summary.rename(columns={
    "category": "Category",
    "Out_of_Stock": "Out of Stock",
    "Avg_Stock": "Avg Stock (units)",
    "High_Markdown_Items": "High Markdown Items (>30%)",
})
st.dataframe(summary.sort_values("Out of Stock", ascending=False), use_container_width=True, height=320)
