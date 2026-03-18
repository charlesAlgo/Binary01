"""
DataLife — Shared chart utilities and styling for the Luxe & Thread Analytics Dashboard.

Provides:
  - DATALIFE_COLORS      : Brand color sequence for charts
  - apply_datalife_theme : Consistent Plotly figure styling
  - inject_css           : Full DataLife CSS system (cards, callouts, headers, badges)
  - page_header          : Gradient hero banner for each page
  - insight_box          : Colored insight/alert callout cards
  - section_intro        : Grey explanatory text under section headings
  - kpi_card             : st.metric() kwargs helper
"""

import streamlit as st
import plotly.graph_objects as go

# ─── Color palette ────────────────────────────────────────────────────────────

DATALIFE_COLORS = [
    "#2563EB",  # accent-blue
    "#38BDF8",  # accent-sky
    "#14B8A6",  # accent-teal
    "#8B5CF6",  # violet
    "#F59E0B",  # amber
    "#EF4444",  # red
    "#EC4899",  # pink
    "#6B7280",  # slate-gray
]

# ─── CSS injection ────────────────────────────────────────────────────────────

def inject_css() -> None:
    """Inject the full DataLife CSS design system into the Streamlit app.

    Covers typography, KPI cards, insight callouts, section labels, badges,
    data tables, and page hero banners.
    """
    st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    /* ── Base typography ─────────────────────────────────────── */
    html, body, [class*="css"], .stApp {
        font-family: 'Inter', sans-serif !important;
    }
    h1 { font-weight: 800 !important; color: #0F172A !important; letter-spacing: -0.02em; }
    h2 { font-weight: 700 !important; color: #0F172A !important; letter-spacing: -0.01em; }
    h3 { font-weight: 600 !important; color: #2563EB !important; }
    p  { color: #334155; line-height: 1.7; }

    /* ── Metric cards ────────────────────────────────────────── */
    [data-testid="stMetric"] {
        background: #F8FAFF;
        border: 1px solid #DBEAFE;
        border-radius: 12px;
        padding: 18px 20px !important;
        box-shadow: 0 1px 3px rgba(37,99,235,0.06);
        transition: box-shadow 0.2s;
    }
    [data-testid="stMetric"]:hover {
        box-shadow: 0 4px 16px rgba(37,99,235,0.12);
    }
    [data-testid="stMetricLabel"]  { color: #64748B !important; font-size: 0.8rem !important; font-weight: 600 !important; text-transform: uppercase; letter-spacing: 0.06em; }
    [data-testid="stMetricValue"]  { color: #0F172A !important; font-weight: 800 !important; font-size: 1.65rem !important; }
    [data-testid="stMetricDelta"]  { font-size: 0.85rem !important; font-weight: 600 !important; }

    /* ── Sidebar ─────────────────────────────────────────────── */
    section[data-testid="stSidebar"] {
        background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%) !important;
        border-right: 1px solid #334155;
    }
    section[data-testid="stSidebar"] * { color: #CBD5E1 !important; }
    section[data-testid="stSidebar"] h1,
    section[data-testid="stSidebar"] h2,
    section[data-testid="stSidebar"] h3 { color: #F1F5F9 !important; }
    section[data-testid="stSidebar"] .stSelectbox label,
    section[data-testid="stSidebar"] .stMultiSelect label,
    section[data-testid="stSidebar"] .stSlider label { color: #94A3B8 !important; font-size: 0.78rem !important; text-transform: uppercase; letter-spacing: 0.07em; font-weight: 600 !important; }

    /* ── Dividers ────────────────────────────────────────────── */
    hr { border-color: #E2E8F0 !important; margin: 1.5rem 0 !important; }

    /* ── DataFrames / tables ─────────────────────────────────── */
    .stDataFrame { border: 1px solid #E2E8F0 !important; border-radius: 10px !important; overflow: hidden; }

    /* ── Page hero banner ────────────────────────────────────── */
    .dl-page-hero {
        background: linear-gradient(135deg, #1E3A5F 0%, #2563EB 55%, #38BDF8 100%);
        border-radius: 16px;
        padding: 32px 36px;
        margin-bottom: 28px;
        color: white;
        position: relative;
        overflow: hidden;
    }
    .dl-page-hero::before {
        content: '';
        position: absolute;
        top: -40%;
        right: -5%;
        width: 320px;
        height: 320px;
        border-radius: 50%;
        background: rgba(255,255,255,0.06);
    }
    .dl-page-hero::after {
        content: '';
        position: absolute;
        bottom: -50%;
        right: 12%;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: rgba(255,255,255,0.04);
    }
    .dl-page-hero h1 {
        color: white !important;
        font-size: 1.85rem !important;
        margin: 0 0 8px 0;
        position: relative;
        z-index: 1;
    }
    .dl-page-hero p {
        color: rgba(255,255,255,0.82) !important;
        font-size: 0.95rem;
        margin: 0;
        max-width: 680px;
        position: relative;
        z-index: 1;
        line-height: 1.6;
    }
    .dl-page-hero .dl-badge {
        display: inline-block;
        background: rgba(255,255,255,0.18);
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 20px;
        padding: 3px 12px;
        font-size: 0.75rem;
        font-weight: 600;
        color: white !important;
        margin-bottom: 12px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        position: relative;
        z-index: 1;
    }

    /* ── Insight callout cards ───────────────────────────────── */
    .dl-insight {
        border-radius: 10px;
        padding: 14px 18px;
        margin: 12px 0;
        border-left: 4px solid;
        font-size: 0.9rem;
        line-height: 1.6;
    }
    .dl-insight-blue   { background: #EFF6FF; border-color: #2563EB; color: #1E3A5F !important; }
    .dl-insight-green  { background: #F0FDF4; border-color: #22C55E; color: #14532D !important; }
    .dl-insight-amber  { background: #FFFBEB; border-color: #F59E0B; color: #78350F !important; }
    .dl-insight-red    { background: #FEF2F2; border-color: #EF4444; color: #7F1D1D !important; }
    .dl-insight strong { font-weight: 700; }

    /* ── Section label / intro ───────────────────────────────── */
    .dl-section-label {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #2563EB;
        margin-bottom: 4px;
    }
    .dl-section-intro {
        color: #64748B !important;
        font-size: 0.875rem;
        line-height: 1.65;
        margin-bottom: 12px;
        max-width: 820px;
    }

    /* ── Stat highlight chips ────────────────────────────────── */
    .dl-chip {
        display: inline-block;
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        border-radius: 6px;
        padding: 2px 10px;
        font-size: 0.8rem;
        font-weight: 600;
        color: #1D4ED8;
        margin: 2px 3px 2px 0;
    }
    .dl-chip-red    { background: #FEF2F2; border-color: #FECACA; color: #DC2626; }
    .dl-chip-green  { background: #F0FDF4; border-color: #BBF7D0; color: #15803D; }
    .dl-chip-amber  { background: #FFFBEB; border-color: #FDE68A; color: #B45309; }

    /* ── Plotly chart wrapper ─────────────────────────────────── */
    .js-plotly-plot { border-radius: 12px; }
    </style>
    """, unsafe_allow_html=True)


# ─── Page hero banner ─────────────────────────────────────────────────────────

def page_header(
    title: str,
    description: str,
    badge: str = "DataLife Analytics",
    icon: str = "",
) -> None:
    """Render a full-width gradient hero banner at the top of a dashboard page.

    Args:
        title       : Main heading text.
        description : Sub-heading description of the page's purpose.
        badge       : Small pill label shown above the title.
        icon        : Optional emoji shown before the title.
    """
    title_with_icon = f"{icon} {title}".strip()
    st.markdown(f"""
    <div class="dl-page-hero">
        <div class="dl-badge">{badge}</div>
        <h1>{title_with_icon}</h1>
        <p>{description}</p>
    </div>
    """, unsafe_allow_html=True)


# ─── Insight callout ──────────────────────────────────────────────────────────

def insight_box(text: str, kind: str = "blue") -> None:
    """Render a colour-coded insight callout card.

    Args:
        text : HTML-safe string. Use <strong> for emphasis.
        kind : One of 'blue' (info), 'green' (positive),
               'amber' (caution), 'red' (alert).
    """
    css_class = f"dl-insight dl-insight-{kind}"
    st.markdown(f'<div class="{css_class}">{text}</div>', unsafe_allow_html=True)


# ─── Section intro ────────────────────────────────────────────────────────────

def section_intro(label: str, text: str) -> None:
    """Render a section label chip and explanatory grey paragraph.

    Args:
        label : Short uppercase label, e.g. "Revenue Breakdown".
        text  : One-to-two sentence explanation shown in muted grey.
    """
    st.markdown(f'<p class="dl-section-label">{label}</p>', unsafe_allow_html=True)
    st.markdown(f'<p class="dl-section-intro">{text}</p>', unsafe_allow_html=True)


# ─── Plotly theme ─────────────────────────────────────────────────────────────

def apply_datalife_theme(fig: go.Figure, height: int = 400) -> go.Figure:
    """Apply the DataLife visual identity to a Plotly figure.

    Args:
        fig    : A Plotly Figure object to style.
        height : Chart height in pixels (default 400).

    Returns:
        The same figure with layout updates applied.
    """
    fig.update_layout(
        height=height,
        paper_bgcolor="#FFFFFF",
        plot_bgcolor="#FFFFFF",
        font=dict(family="Inter, sans-serif", color="#0F172A", size=12),
        title_font=dict(family="Inter, sans-serif", color="#0F172A", size=15, weight="bold"),
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="left",
            x=0,
            font=dict(size=11),
            bgcolor="rgba(0,0,0,0)",
        ),
        xaxis=dict(
            gridcolor="#F1F5F9",
            linecolor="#E2E8F0",
            tickfont=dict(color="#64748B", size=11),
            title_font=dict(color="#64748B", size=12),
        ),
        yaxis=dict(
            gridcolor="#F1F5F9",
            linecolor="#E2E8F0",
            tickfont=dict(color="#64748B", size=11),
            title_font=dict(color="#64748B", size=12),
        ),
        margin=dict(l=40, r=24, t=56, b=40),
        hoverlabel=dict(
            bgcolor="white",
            bordercolor="#E2E8F0",
            font=dict(family="Inter", size=12, color="#0F172A"),
        ),
    )
    return fig


# ─── KPI card helper ──────────────────────────────────────────────────────────

def kpi_card(
    label: str,
    value: str,
    delta: str | None = None,
    delta_color: str = "normal",
    help: str | None = None,
) -> dict:
    """Build keyword-argument dict for st.metric().

    Args:
        label       : Metric label shown above the value.
        value       : Formatted value string.
        delta       : Optional delta string shown below the value.
        delta_color : 'normal', 'inverse', or 'off'.
        help        : Optional tooltip text.

    Returns:
        Dict with keys accepted by st.metric.
    """
    kwargs: dict = {"label": label, "value": value}
    if delta is not None:
        kwargs["delta"] = delta
        kwargs["delta_color"] = delta_color
    if help is not None:
        kwargs["help"] = help
    return kwargs
