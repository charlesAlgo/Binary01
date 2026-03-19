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
    DATALIFE_COLORS,
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

# ─── Extra CSS (chat-specific) ─────────────────────────────────────────────────
st.markdown("""
<style>
/* ── Suggested query buttons ──────────────────────────────────────────────── */
div[data-testid="stButton"] > button.suggest-btn {
    background: #FFFFFF !important;
    border: 1px solid #DDD6FE !important;
    border-radius: 14px !important;
    padding: 18px 20px !important;
    text-align: left !important;
    font-size: 0.875rem !important;
    color: #3F3F46 !important;
    font-weight: 500 !important;
    transition: all 0.18s !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04) !important;
    line-height: 1.5 !important;
    height: auto !important;
}
div[data-testid="stButton"] > button.suggest-btn:hover {
    border-color: #7C3AED !important;
    background: #FAFAFE !important;
    box-shadow: 0 4px 16px rgba(124,58,237,0.12) !important;
    transform: translateY(-1px) !important;
    color: #5B21B6 !important;
}

/* ── Suggested-query card wrapper ──────────────────────────────────────────── */
.dl-suggest-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 16px 0 28px;
}
.dl-suggest-card {
    background: #FFFFFF;
    border: 1px solid #DDD6FE;
    border-radius: 14px;
    padding: 18px 20px;
    cursor: pointer;
    transition: all 0.18s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    display: flex;
    align-items: flex-start;
    gap: 13px;
}
.dl-suggest-card:hover {
    border-color: #7C3AED;
    box-shadow: 0 4px 16px rgba(124,58,237,0.12);
    transform: translateY(-1px);
}
.dl-suggest-icon {
    width: 36px; height: 36px; flex-shrink: 0;
    background: #EDE9FE; border-radius: 9px;
    display: flex; align-items: center;
    justify-content: center; font-size: 1.05rem;
}
.dl-suggest-text {
    font-size: 0.875rem; color: #3F3F46;
    font-weight: 500; line-height: 1.55;
}
.dl-suggest-label {
    font-size: 0.64rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.1em;
    color: #7C3AED; margin-bottom: 4px;
}

/* ── Sidebar alert cards ───────────────────────────────────────────────────── */
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

/* ── Sidebar KPI snapshot text ─────────────────────────────────────────────── */
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

/* ── Clear button (danger style) ───────────────────────────────────────────── */
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

/* ── Chat message containers ───────────────────────────────────────────────── */
[data-testid="stChatMessage"] {
    border-radius: 14px !important;
    margin-bottom: 6px !important;
    padding: 12px 18px !important;
}
[data-testid="stChatMessage"][data-testid*="user"] {
    background: #EDE9FE !important;
}
[data-testid="stChatMessage"][data-testid*="assistant"] {
    background: #FFFFFF !important;
    border: 1px solid #E4E4E7 !important;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04) !important;
}

/* ── Chat input ─────────────────────────────────────────────────────────────── */
[data-testid="stChatInput"] {
    border-radius: 14px !important;
    border: 1.5px solid #DDD6FE !important;
    background: #FFFFFF !important;
    box-shadow: 0 2px 12px rgba(124,58,237,0.08) !important;
}
[data-testid="stChatInput"]:focus-within {
    border-color: #7C3AED !important;
    box-shadow: 0 2px 16px rgba(124,58,237,0.15) !important;
}

/* ── Empty-state welcome banner ────────────────────────────────────────────── */
.dl-welcome {
    background: linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #7C3AED 100%);
    border-radius: 16px; padding: 28px 32px;
    margin-bottom: 24px; text-align: center;
}
.dl-welcome h3 { color: #fff !important; font-size: 1.1rem !important; margin: 0 0 8px; }
.dl-welcome p  { color: rgba(255,255,255,0.72) !important; font-size: 0.875rem; margin: 0; }
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

# ─── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("""
    <div style="padding:6px 0 18px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
        <div style="width:36px;height:36px;border-radius:10px;background:rgba(124,58,237,0.28);
                    display:flex;align-items:center;justify-content:center;font-size:1.1rem">🤖</div>
        <div>
          <div style="font-size:1rem;font-weight:800;color:#EDE9FE;letter-spacing:-0.02em">AI Assistant</div>
          <div style="font-size:0.67rem;color:#8B7DD8;text-transform:uppercase;letter-spacing:0.1em;font-weight:700">Llama 3.3 · 70B</div>
        </div>
      </div>
      <p style="font-size:0.78rem;color:#A78BFA;line-height:1.55;margin:10px 0 0">
        Ask plain-English questions about the Luxe & Thread Boutique sales dataset.
        Charts, tables, and insights — no SQL required.
      </p>
    </div>
    """, unsafe_allow_html=True)

    st.divider()

    # ── Live anomaly alerts ──────────────────────────────────────────────────
    st.markdown('<p style="font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:#A78BFA;margin-bottom:10px">⚠️ Live Alerts</p>', unsafe_allow_html=True)

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
        st.markdown('<p style="font-size:0.78rem;color:#8B7DD8;font-style:italic">No alert data found.</p>', unsafe_allow_html=True)

    st.divider()

    # ── Latest KPI summary ───────────────────────────────────────────────────
    st.markdown('<p style="font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:#A78BFA;margin-bottom:10px">📊 KPI Snapshot</p>', unsafe_allow_html=True)
    if _KPI_FILE.exists():
        kpi_text = _KPI_FILE.read_text(encoding="utf-8")
        if "## Headline Numbers" in kpi_text:
            section = kpi_text.split("## Headline Numbers")[1].split("---")[0].strip()
            st.markdown(section)
        else:
            st.markdown(kpi_text[:600])
    else:
        st.markdown('<p style="font-size:0.78rem;color:#8B7DD8;font-style:italic">KPI report not yet generated.</p>', unsafe_allow_html=True)

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
    ("📊", "Revenue", "What were our top 5 selling brands last quarter?"),
    ("🔄", "Returns", "Show me return rates for Outerwear by brand"),
    ("💸", "Markdowns", "Which products have both high markdowns and low ratings?"),
    ("👟", "Category", "How much revenue did we lose to markdowns on Shoes?"),
]

if not st.session_state.messages:
    st.markdown("""
    <div class="dl-welcome">
      <h3>Ask anything about your retail data</h3>
      <p>Try one of these questions below, or type your own in the chat box at the bottom.</p>
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns(2)
    for i, (icon, label, q) in enumerate(SUGGESTED_QUERIES):
        col = col1 if i % 2 == 0 else col2
        with col:
            st.markdown(f"""
            <div style="background:#fff;border:1px solid #DDD6FE;border-radius:14px;
                        padding:16px 18px;margin-bottom:2px;
                        box-shadow:0 1px 4px rgba(0,0,0,0.04)">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
                <div style="width:32px;height:32px;border-radius:8px;background:#EDE9FE;
                            display:flex;align-items:center;justify-content:center;
                            font-size:0.95rem;flex-shrink:0">{icon}</div>
                <span style="font-size:0.65rem;font-weight:800;text-transform:uppercase;
                             letter-spacing:0.1em;color:#7C3AED">{label}</span>
              </div>
              <p style="font-size:0.85rem;color:#3F3F46;font-weight:500;
                        line-height:1.5;margin:0">{q}</p>
            </div>
            """, unsafe_allow_html=True)
            if st.button(f"Ask →", key=f"suggest_{i}", use_container_width=True):
                st.session_state.messages.append({"role": "user", "content": q,
                                                  "result": None, "chart": None, "error": None})
                st.rerun()

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

# ─── Chat input ─────────────────────────────────────────────────────────────────
if prompt := st.chat_input("Ask a question about your sales data…"):
    st.session_state.messages.append({"role": "user", "content": prompt,
                                      "result": None, "chart": None, "error": None})
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
