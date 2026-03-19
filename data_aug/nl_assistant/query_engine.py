"""
NL Query Engine — Fashion Boutique Retail Analytics
====================================================
Translates natural-language questions into Pandas operations via Groq
(Llama 3.3 70B), executes the generated code safely with RestrictedPython,
and returns structured results with optional Plotly charts.

Improvements over v1:
  • Multi-turn conversation history (last 4 Q&A pairs passed to LLM)
  • Auto-retry with LLM error-correction loop (up to 3 attempts)
  • AST-based static code validator — catches bad code before execution
  • In-memory query cache — identical questions skip the API call
"""

from __future__ import annotations

import ast
import csv
import hashlib
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

# ─── In-memory cache ───────────────────────────────────────────────────────────

_CACHE: dict[str, QueryResult] = {}


def _cache_key(question: str, history: list[dict]) -> str:
    """MD5 key over the question + last 4 turns of history."""
    history_str = "|".join(
        f"{m['role']}:{m['content'][:80]}" for m in history
    )
    raw = f"{question.strip().lower()}||{history_str}"
    return hashlib.md5(raw.encode()).hexdigest()

# ─── Static code validator ─────────────────────────────────────────────────────

_BANNED_NAMES = {
    "os", "sys", "open", "eval", "exec", "__import__",
    "requests", "urllib", "subprocess", "importlib", "socket",
    "builtins", "globals", "locals", "vars", "dir",
}


def _validate_code(code: str) -> str | None:
    """
    AST-based static analysis of LLM-generated code.
    Returns an error string if the code is unsafe or malformed, else None.
    """
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return f"Syntax error: {e}"

    for node in ast.walk(tree):
        if isinstance(node, ast.Name) and node.id in _BANNED_NAMES:
            return f"Unsafe identifier: `{node.id}`"
        if isinstance(node, ast.Attribute) and node.attr in _BANNED_NAMES:
            return f"Unsafe attribute: `{node.attr}`"
        if isinstance(node, (ast.Import, ast.ImportFrom)):
            return "Import statements are not permitted in generated code"

    # Must assign to `result`
    assigned = {
        n.targets[0].id
        for n in ast.walk(tree)
        if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Name)
    }
    if "result" not in assigned:
        return "Code must assign a value to a variable named `result`"

    return None

# ─── Logging ───────────────────────────────────────────────────────────────────

def _log_query(
    session_id: str,
    question: str,
    success: bool,
    error: str | None,
    attempts: int = 1,
) -> None:
    _LOG_DIR.mkdir(parents=True, exist_ok=True)
    write_header = not _LOG_PATH.exists()
    with _LOG_PATH.open("a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if write_header:
            writer.writerow(["timestamp", "session_id", "question", "success", "attempts", "error"])
        writer.writerow([
            datetime.now().isoformat(),
            session_id,
            question,
            success,
            attempts,
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
    """
    Execute LLM-generated pandas code in a restricted namespace.
    Returns (result_value, error_message).
    """
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
        namespace = {**_ALLOWED_BUILTINS, "pd": pd, "np": np, "df": df, "__builtins__": {}}
        try:
            exec(code, namespace)  # noqa: S102
            return namespace.get("result"), None
        except Exception as e:
            return None, str(e)

# ─── Chart builder ─────────────────────────────────────────────────────────────

_COLORS = [
    "#7C3AED", "#EC4899", "#14B8A6", "#F59E0B",
    "#3B82F6", "#10B981", "#EF4444", "#8B5CF6",
]


def _build_chart(result: pd.DataFrame, chart_type: str, chart_config: dict) -> go.Figure | None:
    if chart_type in ("none", "table", ""):
        return None

    x     = chart_config.get("x")
    y     = chart_config.get("y")
    title = chart_config.get("title", "")

    try:
        if chart_type == "bar":
            fig = px.bar(result, x=x, y=y, title=title, color_discrete_sequence=_COLORS)
        elif chart_type == "line":
            fig = px.line(result, x=x, y=y, title=title, color_discrete_sequence=_COLORS)
        elif chart_type == "pie":
            fig = px.pie(result, names=x, values=y, title=title, color_discrete_sequence=_COLORS)
        elif chart_type == "scatter":
            fig = px.scatter(result, x=x, y=y, title=title, color_discrete_sequence=_COLORS)
        else:
            return None

        fig.update_layout(
            paper_bgcolor="#FFFFFF", plot_bgcolor="#FAFAFA",
            font=dict(family="Inter, sans-serif", color="#3F3F46", size=12),
            title_font=dict(family="Inter, sans-serif", color="#18181B", size=14),
            margin=dict(l=44, r=28, t=60, b=44), bargap=0.28,
            xaxis=dict(gridcolor="#F4F4F5", linecolor="#E4E4E7", zeroline=False,
                       tickfont=dict(color="#71717A", size=11),
                       title_font=dict(color="#71717A", size=12)),
            yaxis=dict(gridcolor="#F4F4F5", linecolor="rgba(0,0,0,0)", zeroline=False,
                       tickfont=dict(color="#71717A", size=11),
                       title_font=dict(color="#71717A", size=12)),
            hoverlabel=dict(bgcolor="#FFFFFF", bordercolor="#E4E4E7",
                            font=dict(family="Inter", size=12, color="#18181B")),
        )
        fig.update_traces(selector=dict(type="bar"), marker_line_width=0, marker_cornerradius=4)
        return fig
    except Exception:
        return None

# ─── Groq call helper ──────────────────────────────────────────────────────────

def _groq_call(client: Any, messages: list[dict], max_tokens: int = 1024) -> dict:
    """Single Groq call → parsed JSON dict. Raises on any failure."""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        max_tokens=max_tokens,
        temperature=0.1,
        response_format={"type": "json_object"},
    )
    return json.loads(response.choices[0].message.content)

# ─── Main public function ──────────────────────────────────────────────────────

def run_query(
    question: str,
    session_id: str | None = None,
    conversation_history: list[dict] | None = None,
) -> QueryResult:
    """
    Translate a natural-language question into pandas code, execute it safely,
    and return a structured result with an optional Plotly chart.

    Parameters
    ----------
    question             : Natural-language analytics question.
    session_id           : Optional ID for grouping queries in the log CSV.
    conversation_history : List of {"role": ..., "content": ...} dicts from
                           previous turns. Last 8 items (4 Q&A pairs) are used.
    """
    if session_id is None:
        session_id = str(uuid.uuid4())

    history = (conversation_history or [])[-8:]

    # ── Cache check ──────────────────────────────────────────────────────────
    cache_k = _cache_key(question, history)
    if cache_k in _CACHE:
        return _CACHE[cache_k]

    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        _log_query(session_id, question, False, "GROQ_API_KEY not set")
        return QueryResult(
            explanation="The analytics engine is not configured (missing GROQ_API_KEY).",
            result=None, chart=None, error="GROQ_API_KEY not set",
        )

    # ── Build messages with conversation history ─────────────────────────────
    messages: list[dict] = [
        {"role": "system", "content": SYSTEM_PROMPT},
        *history,
        {"role": "user", "content": question},
    ]

    # ── Initial Groq call ────────────────────────────────────────────────────
    try:
        from groq import Groq  # type: ignore
        client = Groq(api_key=api_key)
        parsed = _groq_call(client, messages)
    except Exception as e:
        err = f"LLM call failed: {e}"
        _log_query(session_id, question, False, err)
        return QueryResult(
            explanation="Could not reach the AI service. Please try again in a moment.",
            result=None, chart=None, error=err,
        )

    # ── Clarification request ────────────────────────────────────────────────
    if "clarification" in parsed:
        _log_query(session_id, question, True, None)
        return QueryResult(
            explanation=parsed["clarification"],
            result=None, chart=None, error=None,
        )

    code        = parsed.get("code", "")
    explanation = parsed.get("explanation", "")
    chart_type  = parsed.get("chart_type", "none")
    chart_cfg   = parsed.get("chart_config", {})

    if not code:
        err = "LLM returned empty code block"
        _log_query(session_id, question, False, err)
        return QueryResult(
            explanation=explanation or "The AI could not generate code for this question.",
            result=None, chart=None, error=err,
        )

    # ── Static validation ────────────────────────────────────────────────────
    validation_err = _validate_code(code)
    if validation_err:
        # Ask LLM to fix invalid code before even trying to execute
        try:
            fix_msgs = messages + [
                {"role": "assistant", "content": json.dumps(parsed)},
                {"role": "user", "content":
                    f"Your code failed static validation: {validation_err}\n"
                    "Fix it and return corrected JSON only."},
            ]
            parsed = _groq_call(client, fix_msgs)
            code        = parsed.get("code", code)
            explanation = parsed.get("explanation", explanation)
            chart_type  = parsed.get("chart_type", chart_type)
            chart_cfg   = parsed.get("chart_config", chart_cfg)
        except Exception:
            pass  # fall through to execution; RestrictedPython will catch it

    # ── Execute with auto-retry loop (up to 3 attempts) ──────────────────────
    result_val  = None
    exec_error  = None
    attempts    = 0

    for attempt in range(3):
        attempts = attempt + 1
        result_val, exec_error = _execute_code(code)

        if not exec_error:
            break

        if attempt < 2:
            # Send the runtime error back to the LLM for correction
            try:
                fix_msgs = messages + [
                    {"role": "assistant", "content": json.dumps(parsed)},
                    {"role": "user", "content":
                        f"Attempt {attempt + 1} failed with this runtime error:\n"
                        f"  {exec_error}\n\n"
                        "Fix the code. Return only a corrected JSON object."},
                ]
                fixed = _groq_call(client, fix_msgs, max_tokens=1024)
                new_code = fixed.get("code", "")
                if new_code and new_code != code:
                    code        = new_code
                    explanation = fixed.get("explanation", explanation)
                    chart_type  = fixed.get("chart_type", chart_type)
                    chart_cfg   = fixed.get("chart_config", chart_cfg)
                    parsed      = fixed
                else:
                    break  # LLM returned same code — no point retrying
            except Exception:
                break

    if exec_error:
        _log_query(session_id, question, False, exec_error, attempts)
        return QueryResult(
            explanation=explanation,
            result=None, chart=None, error=exec_error,
        )

    # ── Build chart ──────────────────────────────────────────────────────────
    chart = None
    if isinstance(result_val, pd.DataFrame) and chart_type not in ("none", "table", ""):
        chart = _build_chart(result_val, chart_type, chart_cfg)

    qr = QueryResult(
        explanation=explanation,
        result=result_val,
        chart=chart,
        error=None,
    )

    _log_query(session_id, question, True, None, attempts)
    _CACHE[cache_k] = qr
    return qr
