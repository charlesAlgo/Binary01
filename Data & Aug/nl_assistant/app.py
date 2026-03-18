"""
AI Analytics Assistant — Luxe & Thread Boutique
================================================
Streamlit chat interface wrapping the NL query engine.

Run with:
    streamlit run "Data & Aug/nl_assistant/app.py"
"""

from __future__ import annotations

import json
import sys
import uuid
from pathlib import Path

import pandas as pd
import streamlit as st

# ── Path setup — works whether run from repo root or nl_assistant/ ─────────────
_NL_DIR  = Path(__file__).resolve().parent
_ROOT    = _NL_DIR.parent
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

# ─── Paths ─────────────────────────────────────────────────────────────────────
_REPORTS     = _ROOT / "reports"
_ALERTS_FILE = _REPORTS / "anomaly_alerts.json"
_KPI_FILE    = _REPORTS / "kpi_sample_week1.md"

# ─── Session state ─────────────────────────────────────────────────────────────
if "session_id" not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())
if "messages" not in st.session_state:
    # Each entry: {"role": "user"|"assistant", "content": str,
    #              "result": Any, "chart": Figure|None, "error": str|None}
    st.session_state.messages = []

# ─── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("## 🤖 AI Assistant")
    st.markdown(
        "Ask plain-English questions about the Luxe & Thread Boutique sales dataset. "
        "Powered by **Llama 3.3 70B** via Groq."
    )
    st.divider()

    # ── Live anomaly alerts ──────────────────────────────────────────────────
    st.markdown("### ⚠️ Live Alerts")
    if _ALERTS_FILE.exists():
        alerts: list[dict] = json.loads(_ALERTS_FILE.read_text(encoding="utf-8"))
        severity_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
        alerts_sorted = sorted(alerts, key=lambda a: severity_order.get(a["severity"], 9))
        for alert in alerts_sorted:
            sev   = alert["severity"]
            icon  = {"HIGH": "🔴", "MEDIUM": "🟡", "LOW": "🟢"}.get(sev, "⚪")
            with st.expander(f"{icon} {alert['title']}", expanded=(sev == "HIGH")):
                st.markdown(f"**Severity:** `{sev}`  |  **Affected:** {alert['affected_count']} items")
                st.markdown(alert["description"])
                st.caption(alert["recommendation"])
    else:
        st.info("No alert data found.")

    st.divider()

    # ── Latest KPI summary ───────────────────────────────────────────────────
    st.markdown("### 📊 KPI Snapshot")
    if _KPI_FILE.exists():
        kpi_text = _KPI_FILE.read_text(encoding="utf-8")
        if "## Headline Numbers" in kpi_text:
            section = kpi_text.split("## Headline Numbers")[1].split("---")[0].strip()
            st.markdown(section)
        else:
            st.markdown(kpi_text[:600])
    else:
        st.info("KPI report not yet generated.")

    st.divider()
    if st.button("🗑️ Clear conversation", use_container_width=True):
        st.session_state.messages = []
        st.session_state.session_id = str(uuid.uuid4())
        st.rerun()

# ─── Main area ─────────────────────────────────────────────────────────────────
page_header(
    title="AI Analytics Assistant",
    description=(
        "Ask plain-English questions about the Luxe & Thread Boutique sales dataset. "
        "Get instant analysis, charts, and business insights — no SQL or Python required."
    ),
    badge="Augmented Analytics · Project 2",
    icon="🤖",
)

# ─── Suggested queries (shown only when chat is empty) ─────────────────────────
SUGGESTED_QUERIES = [
    "What were our top 5 selling brands last quarter?",
    "Show me return rates for Outerwear by brand",
    "Which products have both high markdowns and low ratings?",
    "How much revenue did we lose to markdowns on Shoes?",
]

if not st.session_state.messages:
    st.markdown("#### Get started — click a question or type your own below:")
    col1, col2 = st.columns(2)
    for i, q in enumerate(SUGGESTED_QUERIES):
        col = col1 if i % 2 == 0 else col2
        if col.button(q, key=f"suggest_{i}", use_container_width=True):
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
    # Show user message immediately
    st.session_state.messages.append({"role": "user", "content": prompt,
                                      "result": None, "chart": None, "error": None})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Run the query and show the assistant response
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

    # Persist to session state
    st.session_state.messages.append({
        "role":        "assistant",
        "content":     explanation,
        "result":      result,
        "chart":       chart,
        "error":       error,
    })
