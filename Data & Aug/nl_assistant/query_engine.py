"""
NL Query Engine — Fashion Boutique Retail Analytics
====================================================
Translates natural-language questions into Pandas operations via Groq
(Llama 3.3 70B), executes the generated code safely with RestrictedPython,
and returns structured results with optional Plotly charts.

Usage:
    from nl_assistant.query_engine import run_query

    result = run_query("What were our top 5 selling brands?")
    print(result["explanation"])
    if result["chart"]:
        result["chart"].show()
"""

from __future__ import annotations

import csv
import json
import os
import re
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, TypedDict

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# ─── Paths ─────────────────────────────────────────────────────────────────────

_ROOT        = Path(__file__).resolve().parent.parent
_DATA_PATH   = _ROOT / "data" / "cleaned" / "fashion_boutique_cleaned.parquet"
_PROMPT_PATH = Path(__file__).resolve().parent / "prompts" / "system_prompt.md"
_LOG_DIR     = Path(__file__).resolve().parent / "logs"
_LOG_PATH    = _LOG_DIR / "query_log.csv"

# ─── Load data once at module level ───────────────────────────────────────────

def _load_dataframe() -> pd.DataFrame:
    df = pd.read_parquet(_DATA_PATH)
    for col in ("is_returned", "has_rating", "is_dead_inventory",
                "is_out_of_stock", "is_marked_down"):
        if col in df.columns:
            df[col] = df[col].astype(bool)
    if "purchase_date" in df.columns:
        df["purchase_date"] = pd.to_datetime(df["purchase_date"])
    return df


df = _load_dataframe()

# ─── System prompt ─────────────────────────────────────────────────────────────

def _load_system_prompt() -> str:
    """Read system_prompt.md and extract the first fenced code block."""
    text = _PROMPT_PATH.read_text(encoding="utf-8")
    match = re.search(r"```\n(.*?)```", text, re.DOTALL)
    return match.group(1).strip() if match else text


SYSTEM_PROMPT = _load_system_prompt()

# ─── Return type ───────────────────────────────────────────────────────────────

class QueryResult(TypedDict):
    explanation: str
    result: pd.DataFrame | str | None
    chart: go.Figure | None
    error: str | None

# ─── Logging ───────────────────────────────────────────────────────────────────

def _log_query(
    session_id: str,
    question: str,
    success: bool,
    error: str | None,
) -> None:
    _LOG_DIR.mkdir(parents=True, exist_ok=True)
    write_header = not _LOG_PATH.exists()
    with _LOG_PATH.open("a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if write_header:
            writer.writerow(["timestamp", "session_id", "question", "success", "error"])
        writer.writerow([
            datetime.now().isoformat(),
            session_id,
            question,
            success,
            error or "",
        ])

# ─── Safe code execution ───────────────────────────────────────────────────────

_ALLOWED_BUILTINS: dict[str, Any] = {
    "len": len, "range": range, "list": list, "dict": dict, "set": set,
    "tuple": tuple, "str": str, "int": int, "float": float, "bool": bool,
    "round": round, "min": min, "max": max, "sum": sum, "abs": abs,
    "sorted": sorted, "enumerate": enumerate, "zip": zip, "map": map,
    "filter": filter, "isinstance": isinstance, "type": type,
    "print": print, "None": None, "True": True, "False": False,
}


def _execute_code(code: str) -> tuple[Any, str | None]:
    """Execute LLM-generated pandas code in a restricted namespace.

    Returns (result_value, error_message). result_value is whatever value
    the code stores in a variable named ``result``.
    """
    # Attempt RestrictedPython first; fall back to plain exec with tight globals.
    try:
        from RestrictedPython import compile_restricted, safe_globals  # type: ignore
        from RestrictedPython.Guards import safe_builtins  # type: ignore

        try:
            compiled = compile_restricted(code, filename="<query>", mode="exec")
        except SyntaxError as e:
            return None, f"Syntax error in generated code: {e}"

        namespace: dict[str, Any] = {
            **safe_globals,
            "__builtins__": {**safe_builtins, **_ALLOWED_BUILTINS},
            "_getiter_": iter,
            "_getattr_": getattr,
            "_write_": lambda x: x,
            "_inplacevar_": lambda op, x, y: x,
            "pd": pd,
            "np": np,
            "df": df,
        }
        try:
            exec(compiled, namespace)  # noqa: S102
            return namespace.get("result"), None
        except Exception as e:
            return None, str(e)

    except ImportError:
        # RestrictedPython not available — fall back to plain exec with limited globals
        namespace = {**_ALLOWED_BUILTINS, "pd": pd, "np": np, "df": df, "__builtins__": {}}
        try:
            exec(code, namespace)  # noqa: S102
            return namespace.get("result"), None
        except Exception as e:
            return None, str(e)

# ─── Chart builder ─────────────────────────────────────────────────────────────

_COLORS = [
    "#2563EB", "#38BDF8", "#14B8A6", "#8B5CF6",
    "#F59E0B", "#EF4444", "#EC4899", "#6B7280",
]


def _build_chart(
    result: pd.DataFrame,
    chart_type: str,
    chart_config: dict,
) -> go.Figure | None:
    """Build a Plotly figure from a DataFrame result and chart metadata."""
    if chart_type in ("none", "table", ""):
        return None

    x     = chart_config.get("x")
    y     = chart_config.get("y")
    title = chart_config.get("title", "")

    try:
        if chart_type == "bar":
            fig = px.bar(result, x=x, y=y, title=title,
                         color_discrete_sequence=_COLORS)
        elif chart_type == "line":
            fig = px.line(result, x=x, y=y, title=title,
                          color_discrete_sequence=_COLORS)
        elif chart_type == "pie":
            fig = px.pie(result, names=x, values=y, title=title,
                         color_discrete_sequence=_COLORS)
        elif chart_type == "scatter":
            fig = px.scatter(result, x=x, y=y, title=title,
                             color_discrete_sequence=_COLORS)
        else:
            return None

        fig.update_layout(
            paper_bgcolor="#FFFFFF",
            plot_bgcolor="#FFFFFF",
            font=dict(family="Inter, sans-serif", color="#0F172A", size=12),
            title_font=dict(family="Inter, sans-serif", color="#0F172A", size=15),
            margin=dict(l=40, r=24, t=56, b=40),
            xaxis=dict(gridcolor="#F1F5F9", linecolor="#E2E8F0",
                       tickfont=dict(color="#64748B", size=11)),
            yaxis=dict(gridcolor="#F1F5F9", linecolor="#E2E8F0",
                       tickfont=dict(color="#64748B", size=11)),
        )
        return fig
    except Exception:
        return None

# ─── Main public function ──────────────────────────────────────────────────────

def run_query(question: str, session_id: str | None = None) -> QueryResult:
    """
    Translate a natural-language question into pandas code, execute it safely,
    and return a structured result with an optional Plotly chart.

    Parameters
    ----------
    question   : Natural-language analytics question in plain English.
    session_id : Optional ID for grouping queries in the log CSV.

    Returns
    -------
    QueryResult with keys:
        explanation : str   — What the analysis found (or a clarifying question).
        result      : DataFrame | str | None — The computed answer.
        chart       : Figure | None          — Plotly chart if appropriate.
        error       : str | None             — Error message if something went wrong.
    """
    if session_id is None:
        session_id = str(uuid.uuid4())

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        _log_query(session_id, question, False, "GROQ_API_KEY not set")
        return QueryResult(
            explanation="The analytics engine is not configured (missing GROQ_API_KEY).",
            result=None,
            chart=None,
            error="GROQ_API_KEY not set",
        )

    # ── Call Groq ────────────────────────────────────────────────────────────
    try:
        from groq import Groq  # type: ignore
        client = Groq(api_key=api_key)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user",   "content": question},
            ],
            max_tokens=1024,
            temperature=0.1,
            response_format={"type": "json_object"},
        )
        raw = response.choices[0].message.content
    except Exception as e:
        err = f"LLM call failed: {e}"
        _log_query(session_id, question, False, err)
        return QueryResult(
            explanation="Could not reach the AI service. Please try again in a moment.",
            result=None,
            chart=None,
            error=err,
        )

    # ── Parse JSON response ──────────────────────────────────────────────────
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError as e:
        err = f"JSON parse error: {e}"
        _log_query(session_id, question, False, err)
        return QueryResult(
            explanation="The AI returned an unexpected response format. Please rephrase.",
            result=None,
            chart=None,
            error=err,
        )

    # Clarification request
    if "clarification" in parsed:
        _log_query(session_id, question, True, None)
        return QueryResult(
            explanation=parsed["clarification"],
            result=None,
            chart=None,
            error=None,
        )

    code         = parsed.get("code", "")
    explanation  = parsed.get("explanation", "")
    chart_type   = parsed.get("chart_type", "none")
    chart_config = parsed.get("chart_config", {})

    if not code:
        err = "LLM returned empty code block"
        _log_query(session_id, question, False, err)
        return QueryResult(
            explanation=explanation or "The AI could not generate code for this question.",
            result=None,
            chart=None,
            error=err,
        )

    # ── Execute ──────────────────────────────────────────────────────────────
    result_val, exec_error = _execute_code(code)

    if exec_error:
        _log_query(session_id, question, False, exec_error)
        return QueryResult(
            explanation=explanation,
            result=None,
            chart=None,
            error=exec_error,
        )

    # ── Build chart ──────────────────────────────────────────────────────────
    chart = None
    if isinstance(result_val, pd.DataFrame) and chart_type not in ("none", "table", ""):
        chart = _build_chart(result_val, chart_type, chart_config)

    _log_query(session_id, question, True, None)
    return QueryResult(
        explanation=explanation,
        result=result_val,
        chart=chart,
        error=None,
    )
