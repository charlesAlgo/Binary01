"""
AI Analytics Assistant — Luxe & Thread Boutique
================================================
Streamlit chat interface wrapping the NL query engine.
"""

from __future__ import annotations

import json
import sys
import uuid
from pathlib import Path

import pandas as pd
import streamlit as st

# ── Path setup — works whether run from repo root or nl_assistant/ ─────────────
_NL_DIR = Path(__file__).resolve().parent
_ROOT   = _NL_DIR.parent
sys.path.insert(0, str(_ROOT))

from dashboard.utils.charts import (  # noqa: E402
    apply_datalife_theme,
    inject_css,
    insight_box,
    page_header,
)
from nl_assistant.query_engine import run_query  # noqa: E402

# ─── Page config ───────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="AI Analytics Assistant — Luxe & Thread",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded",
)
inject_css()

# ─── Premium white-base CSS ────────────────────────────────────────────────────
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* ── Pure white base ────────────────────────────────────────────────────────── */
.stApp,
.main,
section.main > div.block-container {
    background-color: #FFFFFF !important;
}

/* ── Main content padding ───────────────────────────────────────────────────── */
.main .block-container {
    padding-top: 1.5rem !important;
    padding-bottom: 4rem !important;
    max-width: 960px !important;
}

/* ── Welcome hero (light) ───────────────────────────────────────────────────── */
.dl-chat-hero {
    background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 60%, #F0FAFB 100%);
    border: 1px solid #DDD6FE;
    border-radius: 20px;
    padding: 36px 40px 32px;
    margin-bottom: 28px;
    text-align: center;
    position: relative;
    overflow: hidden;
}
.dl-chat-hero::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%);
    pointer-events: none;
}
.dl-chat-hero::after {
    content: '';
    position: absolute;
    bottom: -50px; left: -30px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%);
    pointer-events: none;
}
.dl-chat-hero-icon {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, #7C3AED, #A78BFA);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem;
    margin: 0 auto 16px;
    box-shadow: 0 4px 20px rgba(124,58,237,0.28);
}
.dl-chat-hero h2 {
    font-size: 1.5rem !important;
    font-weight: 800 !important;
    color: #18181B !important;
    letter-spacing: -0.025em;
    margin: 0 0 8px !important;
    position: relative; z-index: 1;
}
.dl-chat-hero p {
    font-size: 0.9rem;
    color: #71717A !important;
    margin: 0;
    line-height: 1.65;
    position: relative; z-index: 1;
}
.dl-chat-hero .dl-chat-tags {
    display: flex; justify-content: center;
    flex-wrap: wrap; gap: 8px;
    margin-top: 16px;
    position: relative; z-index: 1;
}
.dl-chat-tag {
    background: #FFFFFF;
    border: 1px solid #DDD6FE;
    border-radius: 20px;
    padding: 4px 14px;
    font-size: 0.72rem;
    font-weight: 700;
    color: #7C3AED;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

/* ── Suggested query grid ───────────────────────────────────────────────────── */
.dl-suggest-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 0 0 28px;
}
.dl-suggest-card {
    background: #FFFFFF;
    border: 1.5px solid #E4E4E7;
    border-radius: 14px;
    padding: 16px 18px;
    cursor: pointer;
    transition: all 0.18s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    display: flex;
    align-items: flex-start;
    gap: 12px;
}
.dl-suggest-card:hover {
    border-color: #A78BFA;
    box-shadow: 0 4px 20px rgba(124,58,237,0.14);
    transform: translateY(-2px);
    background: #FAFAFF;
}
.dl-suggest-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    background: #F5F3FF;
    border-radius: 10px;
    display: flex; align-items: center;
    justify-content: center; font-size: 1rem;
}
.dl-suggest-label {
    font-size: 0.62rem; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: #7C3AED; margin-bottom: 4px;
}
.dl-suggest-text {
    font-size: 0.85rem; color: #27272A;
    font-weight: 500; line-height: 1.5; margin: 0;
}

/* ── Suggest button override (hidden — we use HTML cards) ─────────────────── */
div[data-testid="stButton"] > button[kind="secondary"] {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    color: transparent !important;
    font-size: 0 !important;
    height: 0 !important;
    min-height: 0 !important;
}

/* ── Chat messages ──────────────────────────────────────────────────────────── */
[data-testid="stChatMessage"] {
    border-radius: 16px !important;
    margin-bottom: 8px !important;
    padding: 14px 20px !important;
    border: none !important;
    box-shadow: none !important;
}
/* User bubble */
[data-testid="stChatMessage"]:has([data-testid="stChatMessageAvatarUser"]) {
    background: #F5F3FF !important;
    border: 1px solid #DDD6FE !important;
}
/* Assistant bubble */
[data-testid="stChatMessage"]:has([data-testid="stChatMessageAvatarAssistant"]) {
    background: #FFFFFF !important;
    border: 1px solid #F0F0F0 !important;
    box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
}

/* ── Chat input bar ──────────────────────────────────────────────────────────── */
[data-testid="stChatInput"] {
    border-radius: 16px !important;
    border: 2px solid #E4E4E7 !important;
    background: #FFFFFF !important;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06) !important;
    transition: border-color 0.2s, box-shadow 0.2s !important;
}
[data-testid="stChatInput"]:focus-within {
    border-color: #7C3AED !important;
    box-shadow: 0 2px 20px rgba(124,58,237,0.15) !important;
}
[data-testid="stChatInputTextArea"] {
    color: #18181B !important;
    font-size: 0.925rem !important;
}
[data-testid="stChatInputTextArea"]::placeholder {
    color: #A1A1AA !important;
}

/* ── Sidebar alert cards ──────────────────────────────────────────────────── */
.dl-alert {
    border-radius: 10px; padding: 10px 13px;
    margin-bottom: 8px; font-size: 0.82rem;
    line-height: 1.55; display: flex;
    align-items: flex-start; gap: 9px;
}
.dl-alert-HIGH   { background: rgba(239,68,68,0.12);  border: 1px solid rgba(239,68,68,0.28);  color: #FCA5A5 !important; }
.dl-alert-MEDIUM { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.28); color: #FCD34D !important; }
.dl-alert-LOW    { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.28); color: #6EE7B7 !important; }
.dl-alert-icon   { font-size: 0.9rem; flex-shrink: 0; margin-top: 1px; }
.dl-alert-title  { font-weight: 700; font-size: 0.82rem; }
.dl-alert-desc   { font-size: 0.78rem; opacity: 0.85; margin-top: 3px; line-height: 1.45; }
.dl-alert-rec    { font-size: 0.74rem; opacity: 0.7; margin-top: 4px; font-style: italic; }

/* ── Sidebar KPI snapshot ─────────────────────────────────────────────────── */
section[data-testid="stSidebar"] .stMarkdown code {
    background: rgba(124,58,237,0.2) !important;
    color: #C4B5FD !important;
    border-radius: 4px; padding: 1px 5px;
    font-size: 0.75rem;
}
section[data-testid="stSidebar"] .stMarkdown table {
    width: 100%; border-collapse: collapse; font-size: 0.78rem;
}
section[data-testid="stSidebar"] .stMarkdown td,
section[data-testid="stSidebar"] .stMarkdown th {
    padding: 4px 6px; border-bottom: 1px solid rgba(124,58,237,0.15) !important;
    color: #A78BFA !important;
}

/* ── Clear button ─────────────────────────────────────────────────────────── */
.danger-btn > button {
    background: rgba(239,68,68,0.08) !important;
    border: 1px solid rgba(239,68,68,0.28) !important;
    color: #FCA5A5 !important;
    border-radius: 10px !important;
    font-weight: 600 !important;
    font-size: 0.8rem !important;
    transition: all 0.15s !important;
}
.danger-btn > button:hover {
    background: rgba(239,68,68,0.18) !important;
    border-color: rgba(239,68,68,0.5) !important;
    color: #FEE2E2 !important;
}

/* ── Chat area divider ────────────────────────────────────────────────────── */
.dl-chat-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 24px 0 20px;
}
.dl-chat-divider-line {
    flex: 1; height: 1px; background: #F0F0F0;
}
.dl-chat-divider-label {
    font-size: 0.68rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.12em;
    color: #A1A1AA;
}

/* ── Spinner text ─────────────────────────────────────────────────────────── */
[data-testid="stSpinner"] p {
    color: #71717A !important;
    font-size: 0.875rem !important;
}

/* ── Scrollbar ────────────────────────────────────────────────────────────── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: #FAFAFA; }
::-webkit-scrollbar-thumb { background: #DDD6FE; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #7C3AED; }

/* ── DataFrames ───────────────────────────────────────────────────────────── */
.stDataFrame {
    border: 1px solid #E4E4E7!important;
    border-radius: 12px !important;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04) !important;
}
</style>
""", unsafe_allow_html=True)

# ─── Paths ─────────────────────────────────────────────────────────────────────
_REPORTS     = _ROOT / "reports"
_ALERTS_FILE = _REPORTS / "anomaly_alerts.json"
_KPI_FILE    = _REPORTS / "kpi_sample_week1.md"

# ─── Session state ─────────────────────────────────────────────────────────────
if "session_id" not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())
if "messages" not in st.session_state:
    st.session_state.messages = []
if "pending_query" not in st.session_state:
    st.session_state.pending_query = None

# ─── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("""
    <div style="padding:6px 0 18px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="width:38px;height:38px;border-radius:11px;
                    background:linear-gradient(135deg,#7C3AED,#A78BFA);
                    display:flex;align-items:center;justify-content:center;font-size:1.1rem;
                    box-shadow:0 4px 14px rgba(124,58,237,0.35)">🤖</div>
        <div>
          <div style="font-size:1rem;font-weight:800;color:#EDE9FE;letter-spacing:-0.02em">
            AI Assistant
          </div>
          <div style="font-size:0.65rem;color:#7C3AED;background:rgba(124,58,237,0.2);
                      border-radius:4px;padding:1px 7px;display:inline-block;
                      text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-top:2px">
            Llama 3.3 · 70B
          </div>
        </div>
      </div>
      <p style="font-size:0.78rem;color:#A78BFA;line-height:1.6;margin:10px 0 0">
        Ask plain-English questions about the Luxe &amp; Thread Boutique dataset.
        Charts, tables, and insights — no SQL required.
      </p>
    </div>
    """, unsafe_allow_html=True)

    st.divider()

    # ── Live anomaly alerts ──────────────────────────────────────────────────
    st.markdown(
        '<p style="font-size:0.67rem;font-weight:800;text-transform:uppercase;'
        'letter-spacing:0.12em;color:#8B7DD8;margin-bottom:10px">⚠️ Live Alerts</p>',
        unsafe_allow_html=True,
    )

    if _ALERTS_FILE.exists():
        alerts: list[dict] = json.loads(_ALERTS_FILE.read_text(encoding="utf-8"))
        severity_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
        alerts_sorted = sorted(alerts, key=lambda a: severity_order.get(a["severity"], 9))
        severity_icons = {"HIGH": "🔴", "MEDIUM": "🟡", "LOW": "🟢"}
        for alert in alerts_sorted:
            sev  = alert["severity"]
            icon = severity_icons.get(sev, "⚪")
            st.markdown(f"""
            <div class="dl-alert dl-alert-{sev}">
              <span class="dl-alert-icon">{icon}</span>
              <div>
                <div class="dl-alert-title">{alert['title']}</div>
                <div class="dl-alert-desc">{alert['affected_count']} affected &nbsp;·&nbsp; {sev}</div>
                <div class="dl-alert-desc">{alert['description']}</div>
                <div class="dl-alert-rec">{alert['recommendation']}</div>
              </div>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.markdown(
            '<p style="font-size:0.78rem;color:#8B7DD8;font-style:italic">No alert data found.</p>',
            unsafe_allow_html=True,
        )

    st.divider()

    # ── Latest KPI summary ───────────────────────────────────────────────────
    st.markdown(
        '<p style="font-size:0.67rem;font-weight:800;text-transform:uppercase;'
        'letter-spacing:0.12em;color:#8B7DD8;margin-bottom:10px">📊 KPI Snapshot</p>',
        unsafe_allow_html=True,
    )
    if _KPI_FILE.exists():
        kpi_text = _KPI_FILE.read_text(encoding="utf-8")
        if "## Headline Numbers" in kpi_text:
            section = kpi_text.split("## Headline Numbers")[1].split("---")[0].strip()
            st.markdown(section)
        else:
            st.markdown(kpi_text[:600])
    else:
        st.markdown(
            '<p style="font-size:0.78rem;color:#8B7DD8;font-style:italic">KPI report not yet generated.</p>',
            unsafe_allow_html=True,
        )

    st.divider()

    st.markdown('<div class="danger-btn">', unsafe_allow_html=True)
    if st.button("🗑️ Clear conversation", use_container_width=True):
        st.session_state.messages = []
        st.session_state.session_id = str(uuid.uuid4())
        st.rerun()
    st.markdown("</div>", unsafe_allow_html=True)

# ─── Main area ─────────────────────────────────────────────────────────────────
page_header(
    title="AI Analytics Assistant",
    description=(
        "Ask plain-English questions about the Luxe & Thread Boutique dataset. "
        "Get instant charts, ranked tables, and business insights — no SQL or Python required."
    ),
    badge="Augmented Analytics · Project 2",
    icon="🤖",
)

# ─── Suggested queries (shown only when chat is empty) ─────────────────────────
SUGGESTED_QUERIES = [
    ("📊", "Revenue",   "What were our top 5 selling brands last quarter?"),
    ("🔄", "Returns",   "Show me return rates for Outerwear by brand"),
    ("💸", "Markdowns", "Which products have both high markdowns and low ratings?"),
    ("👟", "Category",  "How much revenue did we lose to markdowns on Shoes?"),
]

if not st.session_state.messages:
    # Welcome hero
    st.markdown("""
    <div class="dl-chat-hero">
      <div class="dl-chat-hero-icon">🤖</div>
      <h2>Ask anything about your retail data</h2>
      <p>
        I can analyse revenue, returns, markdowns, inventory, and brand performance.<br>
        Just type a question below, or pick one of the suggestions.
      </p>
      <div class="dl-chat-tags">
        <span class="dl-chat-tag">Revenue</span>
        <span class="dl-chat-tag">Returns</span>
        <span class="dl-chat-tag">Markdowns</span>
        <span class="dl-chat-tag">Inventory</span>
        <span class="dl-chat-tag">Brand Performance</span>
      </div>
    </div>
    """, unsafe_allow_html=True)

    # Suggested query cards — HTML preview + invisible Streamlit button overlay
    col1, col2 = st.columns(2)
    for i, (icon, label, q) in enumerate(SUGGESTED_QUERIES):
        col = col1 if i % 2 == 0 else col2
        with col:
            st.markdown(f"""
            <div class="dl-suggest-card">
              <div class="dl-suggest-icon">{icon}</div>
              <div>
                <div class="dl-suggest-label">{label}</div>
                <p class="dl-suggest-text">{q}</p>
              </div>
            </div>
            """, unsafe_allow_html=True)
            if st.button(f"Ask →", key=f"suggest_{i}", use_container_width=True):
                st.session_state.pending_query = q
                st.rerun()

    # Divider before chat input
    st.markdown("""
    <div class="dl-chat-divider">
      <div class="dl-chat-divider-line"></div>
      <span class="dl-chat-divider-label">or type your own question</span>
      <div class="dl-chat-divider-line"></div>
    </div>
    """, unsafe_allow_html=True)

# ─── Render chat history ────────────────────────────────────────────────────────
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])
        if msg["role"] == "assistant":
            error  = msg.get("error")
            chart  = msg.get("chart")
            result = msg.get("result")
            if error:
                insight_box(
                    "<strong>Something went wrong:</strong> I couldn't complete that analysis. "
                    "Try rephrasing your question.",
                    kind="red",
                )
            elif chart is not None:
                st.plotly_chart(apply_datalife_theme(chart), use_container_width=True)
            elif result is not None:
                if isinstance(result, pd.DataFrame):
                    st.dataframe(result, use_container_width=True)
                else:
                    insight_box(str(result), kind="blue")

# ─── Process pending query from suggested cards ─────────────────────────────────
if st.session_state.pending_query:
    prompt = st.session_state.pending_query
    st.session_state.pending_query = None
    st.session_state.messages.append({
        "role": "user", "content": prompt,
        "result": None, "chart": None, "error": None,
    })
    with st.chat_message("user"):
        st.markdown(prompt)
    with st.chat_message("assistant"):
        with st.spinner("Analysing your data…"):
            qr = run_query(prompt, session_id=st.session_state.session_id)
        explanation = qr["explanation"]
        result      = qr["result"]
        chart       = qr["chart"]
        error       = qr["error"]
        st.markdown(explanation)
        if error:
            insight_box(
                "<strong>Something went wrong:</strong> I couldn't complete that analysis. "
                "Try rephrasing your question.",
                kind="red",
            )
        elif chart is not None:
            st.plotly_chart(apply_datalife_theme(chart), use_container_width=True)
        elif result is not None:
            if isinstance(result, pd.DataFrame):
                st.dataframe(result, use_container_width=True)
            else:
                insight_box(str(result), kind="blue")
    st.session_state.messages.append({
        "role": "assistant", "content": explanation,
        "result": result, "chart": chart, "error": error,
    })

# ─── Chat input ─────────────────────────────────────────────────────────────────
if prompt := st.chat_input("Ask a question about your sales data…"):
    st.session_state.messages.append({
        "role": "user", "content": prompt,
        "result": None, "chart": None, "error": None,
    })
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Analysing your data…"):
            qr = run_query(prompt, session_id=st.session_state.session_id)

        explanation = qr["explanation"]
        result      = qr["result"]
        chart       = qr["chart"]
        error       = qr["error"]

        st.markdown(explanation)

        if error:
            insight_box(
                "<strong>Something went wrong:</strong> I couldn't complete that analysis. "
                "Try rephrasing your question.",
                kind="red",
            )
        elif chart is not None:
            st.plotly_chart(apply_datalife_theme(chart), use_container_width=True)
        elif result is not None:
            if isinstance(result, pd.DataFrame):
                st.dataframe(result, use_container_width=True)
            else:
                insight_box(str(result), kind="blue")

    st.session_state.messages.append({
        "role":    "assistant",
        "content": explanation,
        "result":  result,
        "chart":   chart,
        "error":   error,
    })
