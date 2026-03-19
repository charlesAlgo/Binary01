"""
DataLife — Luxe & Thread Boutique Retail Analytics Dashboard.
Landing page: headline KPIs, dataset overview, and navigation guide.
"""

import streamlit as st
import pandas as pd
from pathlib import Path

st.set_page_config(
    page_title="DataLife — Luxe & Thread Analytics",
    layout="wide",
    page_icon="📊",
    initial_sidebar_state="expanded",
)

import sys
sys.path.insert(0, str(Path(__file__).parent))
from utils.charts import inject_css, kpi_card_html, kpi_row, insight_box, page_header

inject_css()

DATA_PATH = Path(__file__).parent.parent / "data" / "cleaned" / "fashion_boutique_cleaned.csv"

@st.cache_data
def load_data() -> pd.DataFrame:
    df = pd.read_csv(DATA_PATH, parse_dates=["purchase_date"])
    for col in ["is_returned","is_marked_down","has_rating","is_out_of_stock","is_dead_inventory"]:
        if col in df.columns:
            df[col] = df[col].astype(bool)
    return df

df = load_data()

# ── Sidebar ───────────────────────────────────────────────────────────────────

st.sidebar.markdown("""
<div style="padding:8px 0 16px">
  <div style="font-size:1.25rem;font-weight:800;color:#F1F5F9;letter-spacing:-0.02em">
    DataLife
  </div>
  <div style="font-size:0.72rem;color:#94A3B8;font-weight:600;text-transform:uppercase;letter-spacing:0.08em">
    Retail Analytics
  </div>
</div>
""", unsafe_allow_html=True)

st.sidebar.markdown("---")
st.sidebar.markdown("**Luxe & Thread Boutique**")
st.sidebar.markdown("""
Navigate to any view using the pages above.

Each view has its own sidebar filters that update all charts dynamically.
""")
st.sidebar.markdown("---")
st.sidebar.caption("Powered by DataLife AI")

# ── Hero ──────────────────────────────────────────────────────────────────────

page_header(
    title="Luxe & Thread Boutique — Retail Analytics",
    description=(
        "One year of retail transaction data (Aug 2024 – Aug 2025) across 8 brands and 6 categories. "
        "Explore revenue performance, pricing strategy, return drivers, and inventory health "
        "using the six analytical views in the sidebar."
    ),
    badge="DataLife · Fashion Analytics",
    icon="📊",
)

# ── KPI row ───────────────────────────────────────────────────────────────────

total_revenue   = df["current_price"].sum()
markdown_losses = df["revenue_lost"].sum()
return_rate     = df["is_returned"].mean() * 100
rated           = df[df["has_rating"]]
avg_rating      = rated["customer_rating"].mean() if len(rated) > 0 else 0.0
dead_inv        = df["is_dead_inventory"].sum()

kpi_row(
    kpi_card_html("Total Revenue", f"${total_revenue:,.2f}", icon="💰",
        sub="Sum of current_price after markdowns",
        accent="#7C3AED", icon_bg="#EDE9FE"),
    kpi_card_html("Lost to Markdowns", f"${markdown_losses:,.2f}", icon="📉",
        sub="Revenue surrendered through discounts",
        accent="#EF4444", icon_bg="#FEF2F2"),
    kpi_card_html("Return Rate", f"{return_rate:.1f}%", icon="🔄",
        sub="Store benchmark: 14.7%",
        accent="#F59E0B", icon_bg="#FFFBEB"),
    kpi_card_html("Avg Customer Rating", f"{avg_rating:.2f} / 5.0", icon="⭐",
        sub=f"Based on {len(rated):,} rated items",
        accent="#14B8A6", icon_bg="#F0FDFA"),
)

st.divider()

# ── Key findings ──────────────────────────────────────────────────────────────

st.markdown("### Key Findings at a Glance")
st.markdown('<p class="dl-section-intro">The most important signals from this dataset — each is explored in depth in the dedicated views.</p>', unsafe_allow_html=True)

col_a, col_b = st.columns(2)

with col_a:
    insight_box(
        "<strong>Outerwear leads revenue at $48,672 (26.2% of total)</strong> — but Shoes lose "
        "the most to markdowns ($6,208). Explore the trade-offs in <em>Markdown & Pricing</em>.",
        kind="blue",
    )
    insight_box(
        "<strong>Ann Taylor has a 19.8% return rate</strong> — 1.35× the store average of 14.7%. "
        "The top reason is 'Changed Mind', followed by 'Wrong Item'. See <em>Brand Performance</em>.",
        kind="red",
    )
    insight_box(
        "<strong>118 items are flagged as dead inventory</strong> — markdown above 30% AND rating "
        "below 2.5. $5,762 in revenue is tied up in these slow-moving SKUs. See <em>Markdown & Pricing</em>.",
        kind="amber",
    )

with col_b:
    insight_box(
        "<strong>40.3% of items were discounted</strong>, with an average markdown of 30.1% when "
        "applied. This suggests a reactive pricing strategy rather than strategic seasonal discounting.",
        kind="amber",
    )
    insight_box(
        "<strong>Mango averages 2.78/5.0</strong> — the lowest brand rating, below the 2.8 watch "
        "threshold. Outerwear and Accessories are its weakest categories. See <em>Category Deep Dive</em>.",
        kind="amber",
    )
    insight_box(
        "<strong>43 items are out of stock</strong>, led by Bottoms and Shoes (10 each). "
        "These are high-revenue categories — stockouts mean lost sales. See <em>Inventory Status</em>.",
        kind="green",
    )

st.divider()

# ── Data overview + navigation ────────────────────────────────────────────────

col_left, col_right = st.columns([1, 1])

with col_left:
    st.markdown("### Dataset Overview")
    st.markdown('<p class="dl-section-intro">The raw dataset covers 12 months of product transaction records, cleaned and enriched with 10 derived analytical columns by the DataLife ETL pipeline.</p>', unsafe_allow_html=True)

    kpi_row(
        kpi_card_html("Records", f"{len(df):,}", icon="🗂️",
            sub="Total transactions", accent="#7C3AED", icon_bg="#EDE9FE"),
        kpi_card_html("Brands", f"{df['brand'].nunique()}", icon="🏷️",
            sub="Unique brands tracked", accent="#EC4899", icon_bg="#FDF2F8"),
        kpi_card_html("Categories", f"{df['category'].nunique()}", icon="📁",
            sub="Product categories", accent="#14B8A6", icon_bg="#F0FDFA"),
        cols=4,
    )
    kpi_row(
        kpi_card_html("Marked Down", f"{df['is_marked_down'].sum():,}", icon="🏷️",
            sub="Items with active discount", accent="#F59E0B", icon_bg="#FFFBEB"),
        kpi_card_html("Out of Stock", f"{df['is_out_of_stock'].sum()}", icon="📦",
            sub="Items currently OOS", accent="#EF4444", icon_bg="#FEF2F2"),
        kpi_card_html("Dead Inventory", f"{dead_inv}", icon="⚠️",
            sub=">30% markdown + rating <2.5", accent="#EF4444", icon_bg="#FEF2F2"),
        cols=4,
    )

    st.markdown("")
    insight_box(
        "⚠️ <strong>Data skew note:</strong> 75.7% of records (1,647 of 2,176) are dated "
        "August 2025. Monthly trend comparisons have limited statistical power for all "
        "other months (~42 records each). This caveat is surfaced on every time-based chart.",
        kind="amber",
    )

with col_right:
    st.markdown("### Dashboard Views")
    st.markdown('<p class="dl-section-intro">Six analytical lenses into the same dataset. Use the sidebar to navigate.</p>', unsafe_allow_html=True)

    st.markdown("""
| View | What It Answers |
|------|----------------|
| 📈 **Executive Summary** | Revenue trends, top categories, markdown impact |
| 🔍 **Category Deep Dive** | Per-category revenue, returns, ratings, discounts |
| 🏷️ **Brand Performance** | Brand comparison, return rates, return reason heatmap |
| 💸 **Markdown & Pricing** | Discount distribution, dead inventory, price vs rating |
| 🔄 **Returns Analysis** | Return drivers by reason, size, season, brand |
| 📦 **Inventory Status** | Stock levels, out-of-stock risk, overstock patterns |
""")

st.divider()
st.caption("Built by **DataLife** · Streamlit + Plotly · ETL pipeline: Pandas + PyArrow")
