"""
DataLife — Premium Design System v2
Fashion-forward dashboard theme: violet/purple palette, clean white cards,
warm off-white background, editorial typography.
"""

import streamlit as st
import plotly.graph_objects as go

# ─── Color palette ────────────────────────────────────────────────────────────

DATALIFE_COLORS = [
    "#7C3AED",  # violet   (primary)
    "#EC4899",  # rose     (fashion accent)
    "#14B8A6",  # teal
    "#F59E0B",  # amber/gold
    "#3B82F6",  # blue
    "#10B981",  # emerald
    "#EF4444",  # red
    "#8B5CF6",  # lavender
]

C_PRIMARY = "#7C3AED"
C_ROSE    = "#EC4899"
C_TEAL    = "#14B8A6"
C_AMBER   = "#F59E0B"
C_GREEN   = "#10B981"
C_RED     = "#EF4444"


# ─── CSS injection ────────────────────────────────────────────────────────────

def inject_css() -> None:
    st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    /* ── Global ──────────────────────────────────────────── */
    html, body, [class*="css"], .stApp {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }
    .stApp {
        background-color: #F2F2F7 !important;
    }
    .main .block-container {
        padding-top: 1.25rem !important;
        padding-bottom: 3rem !important;
        max-width: 1300px !important;
    }

    /* ── Typography ──────────────────────────────────────── */
    h1 { font-weight: 800 !important; color: #18181B !important; letter-spacing: -0.025em; font-size: 1.6rem !important; line-height: 1.2 !important; }
    h2 { font-weight: 700 !important; color: #18181B !important; letter-spacing: -0.02em; }
    h3 { font-weight: 600 !important; color: #3F3F46 !important; }
    p  { color: #52525B; line-height: 1.7; }

    /* ── Sidebar ─────────────────────────────────────────── */
    section[data-testid="stSidebar"] {
        background: linear-gradient(175deg, #1E1B4B 0%, #2D2665 45%, #1A1330 100%) !important;
        border-right: 1px solid rgba(124,58,237,0.18) !important;
    }
    section[data-testid="stSidebar"] * { color: #C4B5FD !important; }
    section[data-testid="stSidebar"] h1,
    section[data-testid="stSidebar"] h2,
    section[data-testid="stSidebar"] h3 { color: #EDE9FE !important; font-weight: 700 !important; }
    section[data-testid="stSidebar"] p { color: #A78BFA !important; }
    section[data-testid="stSidebar"] .stSelectbox label,
    section[data-testid="stSidebar"] .stMultiSelect label,
    section[data-testid="stSidebar"] .stSlider label {
        color: #8B7DD8 !important;
        font-size: 0.68rem !important;
        text-transform: uppercase !important;
        letter-spacing: 0.1em !important;
        font-weight: 700 !important;
    }
    section[data-testid="stSidebar"] hr { border-color: rgba(124,58,237,0.22) !important; }
    section[data-testid="stSidebar"] a { color: #C4B5FD !important; font-weight: 500 !important; }
    section[data-testid="stSidebar"] a:hover { color: #EDE9FE !important; }

    /* Sidebar nav page links */
    [data-testid="stSidebarNavLink"] {
        border-radius: 8px !important;
        margin: 2px 4px !important;
        transition: background 0.15s !important;
    }
    [data-testid="stSidebarNavLink"]:hover { background: rgba(124,58,237,0.18) !important; }
    [data-testid="stSidebarNavLink"][aria-current="page"] {
        background: rgba(124,58,237,0.28) !important;
        border-left: 3px solid #A78BFA !important;
    }

    /* ── Native st.metric cards ──────────────────────────── */
    [data-testid="stMetric"] {
        background: #FFFFFF;
        border: 1px solid #E4E4E7;
        border-top: 3px solid #7C3AED;
        border-radius: 14px;
        padding: 20px 22px !important;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
        transition: box-shadow 0.2s, transform 0.2s;
    }
    [data-testid="stMetric"]:hover {
        box-shadow: 0 4px 20px rgba(124,58,237,0.14), 0 1px 4px rgba(0,0,0,0.06);
        transform: translateY(-1px);
    }
    [data-testid="stMetricLabel"] {
        color: #71717A !important; font-size: 0.69rem !important;
        font-weight: 700 !important; text-transform: uppercase !important;
        letter-spacing: 0.09em !important;
    }
    [data-testid="stMetricValue"] {
        color: #18181B !important; font-weight: 800 !important;
        font-size: 1.8rem !important; letter-spacing: -0.03em !important;
    }
    [data-testid="stMetricDelta"] { font-size: 0.8rem !important; font-weight: 600 !important; }

    /* ── Hero banner ─────────────────────────────────────── */
    .dl-page-hero {
        background: linear-gradient(135deg, #1E1B4B 0%, #4C1D95 38%, #7C3AED 72%, #A78BFA 100%);
        border-radius: 18px;
        padding: 36px 42px;
        margin-bottom: 28px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(124,58,237,0.28), 0 2px 8px rgba(0,0,0,0.12);
    }
    .dl-page-hero::before {
        content: ''; position: absolute;
        top: -55%; right: -6%;
        width: 400px; height: 400px; border-radius: 50%;
        background: rgba(255,255,255,0.05); pointer-events: none;
    }
    .dl-page-hero::after {
        content: ''; position: absolute;
        bottom: -60%; right: 20%;
        width: 260px; height: 260px; border-radius: 50%;
        background: rgba(167,139,250,0.12); pointer-events: none;
    }
    .dl-page-hero h1 {
        color: #fff !important; font-size: 1.95rem !important;
        font-weight: 800 !important; margin: 0 0 10px;
        position: relative; z-index: 1;
        text-shadow: 0 2px 16px rgba(0,0,0,0.18);
        letter-spacing: -0.025em !important;
    }
    .dl-page-hero p {
        color: rgba(255,255,255,0.78) !important; font-size: 0.93rem;
        margin: 0; max-width: 700px; position: relative;
        z-index: 1; line-height: 1.68;
    }
    .dl-page-hero .dl-badge {
        display: inline-flex; align-items: center; gap: 6px;
        background: rgba(255,255,255,0.14);
        border: 1px solid rgba(255,255,255,0.22);
        border-radius: 20px; padding: 4px 14px;
        font-size: 0.68rem; font-weight: 700; color: #fff !important;
        margin-bottom: 14px; letter-spacing: 0.07em;
        text-transform: uppercase; position: relative; z-index: 1;
    }

    /* ── Custom HTML KPI cards ───────────────────────────── */
    .dl-kpi-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
        margin-bottom: 24px;
    }
    .dl-kpi-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
        margin-bottom: 24px;
    }
    .dl-kpi-card {
        background: #FFFFFF;
        border: 1px solid #E4E4E7;
        border-radius: 16px;
        padding: 22px 24px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04);
        position: relative; overflow: hidden;
        transition: box-shadow 0.2s, transform 0.2s;
    }
    .dl-kpi-card:hover {
        box-shadow: 0 6px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.06);
        transform: translateY(-2px);
    }
    .dl-kpi-card::before {
        content: ''; position: absolute;
        top: 0; left: 0; right: 0; height: 3px;
        background: var(--kpi-accent, #7C3AED);
        border-radius: 16px 16px 0 0;
    }
    .dl-kpi-icon {
        width: 42px; height: 42px; border-radius: 11px;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.1rem; margin-bottom: 16px;
        background: var(--kpi-icon-bg, #EDE9FE);
    }
    .dl-kpi-label {
        font-size: 0.68rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: 0.1em;
        color: #71717A; margin-bottom: 5px;
    }
    .dl-kpi-value {
        font-size: 1.85rem; font-weight: 800;
        color: #18181B; letter-spacing: -0.03em;
        line-height: 1; margin-bottom: 8px;
    }
    .dl-kpi-sub { font-size: 0.77rem; color: #A1A1AA; font-weight: 500; line-height: 1.4; }
    .dl-kpi-delta-pos { color: #10B981; font-weight: 700; font-size: 0.77rem; display: flex; align-items: center; gap: 3px; }
    .dl-kpi-delta-neg { color: #EF4444; font-weight: 700; font-size: 0.77rem; display: flex; align-items: center; gap: 3px; }
    .dl-kpi-delta-neu { color: #F59E0B; font-weight: 700; font-size: 0.77rem; display: flex; align-items: center; gap: 3px; }

    /* ── Insight callouts ────────────────────────────────── */
    .dl-insight {
        border-radius: 12px; padding: 13px 17px; margin: 10px 0;
        font-size: 0.875rem; line-height: 1.65;
        display: flex; gap: 11px; align-items: flex-start;
    }
    .dl-insight-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
    .dl-insight-blue  { background: #EFF6FF; border: 1px solid #BFDBFE; color: #1E40AF !important; }
    .dl-insight-green { background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46 !important; }
    .dl-insight-amber { background: #FFFBEB; border: 1px solid #FDE68A; color: #78350F !important; }
    .dl-insight-red   { background: #FEF2F2; border: 1px solid #FECACA; color: #7F1D1D !important; }
    .dl-insight strong { font-weight: 700; }
    .dl-insight p { color: inherit !important; margin: 0; }

    /* ── Section labels ──────────────────────────────────── */
    .dl-section-label {
        font-size: 0.66rem; font-weight: 800; text-transform: uppercase;
        letter-spacing: 0.12em; color: #7C3AED; margin-bottom: 2px;
    }
    .dl-section-intro {
        color: #71717A !important; font-size: 0.875rem;
        line-height: 1.65; margin-bottom: 16px; max-width: 860px;
    }

    /* ── Chips ───────────────────────────────────────────── */
    .dl-chip {
        display: inline-block; background: #EDE9FE; border: 1px solid #DDD6FE;
        border-radius: 6px; padding: 2px 10px; font-size: 0.77rem;
        font-weight: 700; color: #5B21B6; margin: 2px 3px 2px 0;
    }
    .dl-chip-red   { background: #FEF2F2; border-color: #FECACA; color: #DC2626; }
    .dl-chip-green { background: #ECFDF5; border-color: #A7F3D0; color: #059669; }
    .dl-chip-amber { background: #FFFBEB; border-color: #FDE68A; color: #B45309; }

    /* ── Chart containers ────────────────────────────────── */
    [data-testid="stPlotlyChart"] > div {
        border-radius: 14px !important;
        overflow: hidden;
    }

    /* ── DataFrames ──────────────────────────────────────── */
    .stDataFrame { border: 1px solid #E4E4E7 !important; border-radius: 12px !important; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important; }

    /* ── Dividers ────────────────────────────────────────── */
    hr { border: none !important; border-top: 1px solid #E4E4E7 !important; margin: 1.75rem 0 !important; }

    /* ── Alerts ──────────────────────────────────────────── */
    .stAlert { border-radius: 12px !important; }

    /* ── Scrollbar ───────────────────────────────────────── */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: #F2F2F7; }
    ::-webkit-scrollbar-thumb { background: #C4B5FD; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #7C3AED; }

    /* ── Caption ─────────────────────────────────────────── */
    .stCaption { color: #A1A1AA !important; font-size: 0.78rem !important; }
    </style>
    """, unsafe_allow_html=True)


# ─── Page hero ────────────────────────────────────────────────────────────────

def page_header(title: str, description: str, badge: str = "DataLife Analytics", icon: str = "") -> None:
    title_with_icon = f"{icon} {title}".strip()
    st.markdown(f"""
    <div class="dl-page-hero">
        <div class="dl-badge">{badge}</div>
        <h1>{title_with_icon}</h1>
        <p>{description}</p>
    </div>
    """, unsafe_allow_html=True)


# ─── KPI card (HTML) ──────────────────────────────────────────────────────────

def kpi_card_html(
    label: str,
    value: str,
    icon: str = "📊",
    sub: str | None = None,
    accent: str = "#7C3AED",
    icon_bg: str = "#EDE9FE",
    delta: str | None = None,
    delta_type: str = "neu",   # "pos" | "neg" | "neu"
) -> str:
    """Return an HTML string for a premium KPI card (use inside kpi_row())."""
    arrows = {"pos": "↑", "neg": "↓", "neu": "—"}
    delta_html = ""
    if delta:
        arrow = arrows.get(delta_type, "—")
        delta_html = f'<div class="dl-kpi-delta-{delta_type}">{arrow} {delta}</div>'
    sub_html = f'<div class="dl-kpi-sub">{sub}</div>' if sub else ""
    return (
        f'<div class="dl-kpi-card" style="--kpi-accent:{accent};--kpi-icon-bg:{icon_bg};">'
        f'  <div class="dl-kpi-icon" style="background:{icon_bg};">{icon}</div>'
        f'  <div class="dl-kpi-label">{label}</div>'
        f'  <div class="dl-kpi-value">{value}</div>'
        f'  {delta_html}{sub_html}'
        f'</div>'
    )


def kpi_row(*cards: str, cols: int = 4) -> None:
    """Render a responsive grid of KPI cards in a single st.markdown call."""
    cls = "dl-kpi-grid" if cols == 4 else "dl-kpi-grid-3"
    st.markdown(f'<div class="{cls}">{"".join(cards)}</div>', unsafe_allow_html=True)


# ─── Legacy kpi_card (st.metric kwargs) ──────────────────────────────────────

def kpi_card(
    label: str,
    value: str,
    delta: str | None = None,
    delta_color: str = "normal",
    help: str | None = None,
) -> dict:
    kwargs: dict = {"label": label, "value": value}
    if delta is not None:
        kwargs["delta"] = delta
        kwargs["delta_color"] = delta_color
    if help is not None:
        kwargs["help"] = help
    return kwargs


# ─── Insight callout ──────────────────────────────────────────────────────────

def insight_box(text: str, kind: str = "blue") -> None:
    icons = {"blue": "💡", "green": "✅", "amber": "⚠️", "red": "🚨"}
    icon = icons.get(kind, "💡")
    st.markdown(
        f'<div class="dl-insight dl-insight-{kind}">'
        f'<span class="dl-insight-icon">{icon}</span>'
        f'<div>{text}</div>'
        f'</div>',
        unsafe_allow_html=True,
    )


# ─── Section intro ────────────────────────────────────────────────────────────

def section_intro(label: str, text: str) -> None:
    st.markdown(
        f'<p class="dl-section-label">{label}</p>'
        f'<p class="dl-section-intro">{text}</p>',
        unsafe_allow_html=True,
    )


# ─── Plotly theme ─────────────────────────────────────────────────────────────

def apply_datalife_theme(fig: go.Figure, height: int = 420) -> go.Figure:
    fig.update_layout(
        height=height,
        paper_bgcolor="#FFFFFF",
        plot_bgcolor="#FAFAFA",
        font=dict(family="Inter, sans-serif", color="#3F3F46", size=12),
        title_font=dict(family="Inter, sans-serif", color="#18181B", size=14),
        legend=dict(
            orientation="h", yanchor="bottom", y=1.02,
            xanchor="left", x=0, font=dict(size=11),
            bgcolor="rgba(0,0,0,0)",
        ),
        xaxis=dict(
            gridcolor="#F4F4F5", linecolor="#E4E4E7", zeroline=False,
            tickfont=dict(color="#71717A", size=11),
            title_font=dict(color="#71717A", size=12),
        ),
        yaxis=dict(
            gridcolor="#F4F4F5", linecolor="rgba(0,0,0,0)", zeroline=False,
            tickfont=dict(color="#71717A", size=11),
            title_font=dict(color="#71717A", size=12),
        ),
        margin=dict(l=44, r=28, t=60, b=44),
        hoverlabel=dict(
            bgcolor="#FFFFFF", bordercolor="#E4E4E7",
            font=dict(family="Inter", size=12, color="#18181B"),
        ),
        bargap=0.28,
        bargroupgap=0.06,
    )
    fig.update_traces(
        selector=dict(type="bar"),
        marker_line_width=0,
        marker_cornerradius=4,
    )
    return fig
