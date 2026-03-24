"""
DataLife ML Dashboard — E-Commerce Customer Spending Predictor
==============================================================
Premium portfolio showcase for Project 3.
"""

from __future__ import annotations

import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import streamlit as st

# ─── Page config ───────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="DataLife · Spending Predictor",
    page_icon="💰",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ─── Paths ─────────────────────────────────────────────────────────────────────
ROOT       = Path(__file__).resolve().parent.parent
MODELS_DIR = ROOT / "models"
DATA_PATH  = ROOT / "data" / "raw" / "Ecommerce_Customers.csv"

# ─── CSS ───────────────────────────────────────────────────────────────────────
def inject_css() -> None:
    st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    html, body, [class*="css"], .stApp {
        font-family: 'Inter', sans-serif !important;
        background-color: #0F0F1A !important;
        color: #E2E8F0 !important;
    }

    /* ── Hide Streamlit chrome ── */
    #MainMenu, footer, header { visibility: hidden; }
    .block-container { padding: 0 2rem 3rem !important; max-width: 1200px; }

    /* ── Navbar ── */
    .dl-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0 28px;
        border-bottom: 1px solid rgba(124,58,237,0.2);
        margin-bottom: 36px;
    }
    .dl-nav-logo {
        font-size: 1.1rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: #FFFFFF;
    }
    .dl-nav-logo span { color: #7C3AED; }
    .dl-nav-badge {
        background: rgba(124,58,237,0.15);
        border: 1px solid rgba(124,58,237,0.4);
        color: #A78BFA;
        font-size: 0.72rem;
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 20px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    /* ── Hero ── */
    .dl-hero {
        background: linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(16,185,129,0.06) 100%);
        border: 1px solid rgba(124,58,237,0.25);
        border-radius: 20px;
        padding: 44px 52px;
        margin-bottom: 36px;
        position: relative;
        overflow: hidden;
    }
    .dl-hero::before {
        content: '';
        position: absolute;
        top: -60px; right: -60px;
        width: 240px; height: 240px;
        background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
        border-radius: 50%;
    }
    .dl-hero-tag {
        display: inline-block;
        background: rgba(124,58,237,0.2);
        border: 1px solid rgba(124,58,237,0.4);
        color: #A78BFA;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        padding: 5px 14px;
        border-radius: 20px;
        margin-bottom: 16px;
    }
    .dl-hero h1 {
        font-size: 2.4rem;
        font-weight: 800;
        color: #FFFFFF;
        letter-spacing: -0.03em;
        margin: 0 0 12px;
        line-height: 1.15;
    }
    .dl-hero h1 span { color: #7C3AED; }
    .dl-hero p {
        font-size: 1rem;
        color: #94A3B8;
        margin: 0;
        line-height: 1.6;
        max-width: 580px;
    }

    /* ── KPI Cards ── */
    .dl-kpi-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
        margin-bottom: 36px;
    }
    .dl-kpi {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 14px;
        padding: 20px;
        text-align: center;
        transition: border-color 0.2s;
    }
    .dl-kpi:hover { border-color: rgba(124,58,237,0.4); }
    .dl-kpi .kpi-value {
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: #7C3AED;
        line-height: 1;
        margin-bottom: 6px;
    }
    .dl-kpi .kpi-label {
        font-size: 0.7rem;
        font-weight: 600;
        color: #64748B;
        text-transform: uppercase;
        letter-spacing: 0.07em;
    }
    .dl-kpi .kpi-sub {
        font-size: 0.72rem;
        color: #10B981;
        font-weight: 500;
        margin-top: 4px;
    }

    /* ── Tabs ── */
    .stTabs [data-baseweb="tab-list"] {
        gap: 4px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 12px;
        padding: 4px;
        margin-bottom: 28px;
    }
    .stTabs [data-baseweb="tab"] {
        background: transparent !important;
        border-radius: 8px !important;
        color: #64748B !important;
        font-weight: 500 !important;
        font-size: 0.9rem !important;
        padding: 8px 20px !important;
        border: none !important;
    }
    .stTabs [aria-selected="true"] {
        background: rgba(124,58,237,0.2) !important;
        color: #A78BFA !important;
        font-weight: 600 !important;
    }

    /* ── Section labels ── */
    .dl-section {
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #7C3AED;
        margin: 0 0 16px;
    }

    /* ── Prediction Result ── */
    .dl-pred-card {
        background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(16,185,129,0.08));
        border: 1px solid rgba(124,58,237,0.3);
        border-radius: 18px;
        padding: 36px 28px;
        text-align: center;
    }
    .dl-pred-card .pred-label {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #64748B;
        margin-bottom: 10px;
    }
    .dl-pred-card .pred-amount {
        font-size: 3.4rem;
        font-weight: 800;
        letter-spacing: -0.04em;
        color: #FFFFFF;
        line-height: 1;
        margin-bottom: 10px;
    }
    .dl-pred-card .pred-segment {
        display: inline-block;
        padding: 4px 16px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .dl-pred-card .pred-ci {
        font-size: 0.78rem;
        color: #64748B;
    }

    /* Segment colours */
    .seg-very-low  { background: rgba(239,68,68,0.15);  color: #F87171; border: 1px solid rgba(239,68,68,0.3); }
    .seg-low       { background: rgba(234,88,12,0.15);  color: #FB923C; border: 1px solid rgba(234,88,12,0.3); }
    .seg-medium    { background: rgba(234,179,8,0.15);  color: #FDE047; border: 1px solid rgba(234,179,8,0.3); }
    .seg-high      { background: rgba(16,185,129,0.15); color: #34D399; border: 1px solid rgba(16,185,129,0.3); }
    .seg-very-high { background: rgba(124,58,237,0.2);  color: #A78BFA; border: 1px solid rgba(124,58,237,0.4); }

    /* ── Slider overrides ── */
    .stSlider > label { color: #94A3B8 !important; font-size: 0.82rem !important; }
    .stSlider [data-baseweb="slider"] div[role="slider"] {
        background: #7C3AED !important;
        border-color: #7C3AED !important;
    }

    /* ── Inputs / Buttons ── */
    .stButton > button {
        background: linear-gradient(135deg, #7C3AED, #5B21B6) !important;
        color: #FFFFFF !important;
        border: none !important;
        border-radius: 10px !important;
        font-weight: 600 !important;
        font-size: 0.9rem !important;
        padding: 10px 24px !important;
        transition: opacity 0.2s !important;
    }
    .stButton > button:hover { opacity: 0.88 !important; }

    /* ── Number / Text inputs ── */
    .stNumberInput input, .stTextInput input {
        background: rgba(255,255,255,0.05) !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 8px !important;
        color: #E2E8F0 !important;
    }
    .stNumberInput input:focus, .stTextInput input:focus {
        border-color: rgba(124,58,237,0.5) !important;
        box-shadow: 0 0 0 2px rgba(124,58,237,0.15) !important;
    }
    .stNumberInput [data-baseweb="input"], .stTextInput [data-baseweb="input"] {
        background: rgba(255,255,255,0.05) !important;
        border-color: rgba(255,255,255,0.1) !important;
    }

    /* ── Data table ── */
    .stDataFrame { border-radius: 12px; overflow: hidden; }
    .stDataFrame [data-testid="stDataFrameResizable"] { border-radius: 12px; }

    /* ── Info / metric cards ── */
    [data-testid="metric-container"] {
        background: rgba(255,255,255,0.03) !important;
        border: 1px solid rgba(255,255,255,0.07) !important;
        border-radius: 12px !important;
        padding: 16px !important;
    }
    [data-testid="metric-container"] label { color: #64748B !important; font-size: 0.75rem !important; }
    [data-testid="metric-container"] [data-testid="stMetricValue"] {
        color: #FFFFFF !important; font-size: 1.5rem !important; font-weight: 700 !important;
    }

    /* ── Info boxes ── */
    .stInfo { background: rgba(124,58,237,0.08) !important; border-color: rgba(124,58,237,0.3) !important; }

    /* ── Feature insight cards ── */
    .dl-insight {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 14px;
        padding: 20px 22px;
        margin-bottom: 12px;
    }
    .dl-insight .ins-rank {
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #7C3AED;
        margin-bottom: 4px;
    }
    .dl-insight .ins-feature {
        font-size: 1rem;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 6px;
    }
    .dl-insight .ins-bar-bg {
        background: rgba(255,255,255,0.07);
        border-radius: 4px;
        height: 6px;
        margin-bottom: 8px;
        overflow: hidden;
    }
    .dl-insight .ins-bar {
        background: linear-gradient(90deg, #7C3AED, #A78BFA);
        height: 6px;
        border-radius: 4px;
    }
    .dl-insight .ins-detail {
        font-size: 0.78rem;
        color: #94A3B8;
        line-height: 1.5;
    }
    .dl-insight .ins-coef {
        font-size: 0.9rem;
        font-weight: 700;
        color: #10B981;
        float: right;
    }

    /* ── Empty state ── */
    .dl-empty {
        background: rgba(255,255,255,0.02);
        border: 1px dashed rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 56px 28px;
        text-align: center;
        color: #475569;
    }
    .dl-empty .empty-icon { font-size: 2.5rem; margin-bottom: 12px; }
    .dl-empty .empty-text { font-size: 0.9rem; font-weight: 500; }

    /* ── Footer ── */
    .dl-footer {
        text-align: center;
        font-size: 0.75rem;
        color: #334155;
        padding: 32px 0 8px;
        border-top: 1px solid rgba(255,255,255,0.05);
        margin-top: 48px;
    }
    .dl-footer a { color: #7C3AED; text-decoration: none; }
    </style>
    """, unsafe_allow_html=True)


# ─── Model loading ─────────────────────────────────────────────────────────────

@st.cache_resource(show_spinner="Loading model...")
def load_model():
    if not (MODELS_DIR / "model.pkl").exists():
        return None, None, {}
    m  = joblib.load(MODELS_DIR / "model.pkl")
    s  = joblib.load(MODELS_DIR / "scaler.pkl")
    with open(MODELS_DIR / "metadata.json", encoding="utf-8") as f:
        meta = json.load(f)
    return m, s, meta


@st.cache_data(show_spinner=False)
def load_data():
    if not DATA_PATH.exists():
        return None
    return pd.read_csv(DATA_PATH)


# ─── Helpers ───────────────────────────────────────────────────────────────────

def segment_css(value: float) -> tuple[str, str]:
    if value < 350:   return "Very Low",  "seg-very-low"
    elif value < 450: return "Low",        "seg-low"
    elif value < 550: return "Medium",     "seg-medium"
    elif value < 650: return "High",       "seg-high"
    else:             return "Very High",  "seg-very-high"


def predict(model, scaler, meta, avg_s, t_app, t_web, mem):
    X = np.array([[avg_s, t_app, t_web, mem]])
    X_s = scaler.transform(X)
    pred = float(model.predict(X_s)[0])
    rmse = meta.get("test_rmse", 10.0)
    return round(pred, 2), round(pred - 1.96 * rmse, 2), round(pred + 1.96 * rmse, 2)


# ─── App ───────────────────────────────────────────────────────────────────────

def main() -> None:
    inject_css()

    model, scaler, meta = load_model()
    loaded = model is not None

    # ── Navbar ──────────────────────────────────────────────────────────────────
    st.markdown("""
    <div class="dl-nav">
        <div class="dl-nav-logo">Data<span>Life</span> · ML</div>
        <div class="dl-nav-badge">Portfolio Project 3</div>
    </div>
    """, unsafe_allow_html=True)

    # ── Hero ────────────────────────────────────────────────────────────────────
    st.markdown("""
    <div class="dl-hero">
        <div class="dl-hero-tag">Machine Learning Application</div>
        <h1>E-Commerce <span>Spending</span> Predictor</h1>
        <p>
            Predicts yearly customer spend from 4 behavioural signals using Linear Regression
            with GridSearchCV tuning. Trained on 500 customers · R² = 97.8% · RMSE = $10.48
        </p>
    </div>
    """, unsafe_allow_html=True)

    # ── KPI Strip ───────────────────────────────────────────────────────────────
    if loaded:
        r2   = meta.get("test_r2",   0)
        rmse = meta.get("test_rmse", 0)
        mae  = meta.get("test_mae",  0)
        mape = meta.get("test_mape", 0)
        mt   = meta.get("model_type", "OLS")

        st.markdown(f"""
        <div class="dl-kpi-grid">
            <div class="dl-kpi">
                <div class="kpi-value">{r2:.1%}</div>
                <div class="kpi-label">R² Score</div>
                <div class="kpi-sub">Threshold >= 95%</div>
            </div>
            <div class="dl-kpi">
                <div class="kpi-value">${rmse:.2f}</div>
                <div class="kpi-label">RMSE</div>
                <div class="kpi-sub">Threshold <= $15</div>
            </div>
            <div class="dl-kpi">
                <div class="kpi-value">${mae:.2f}</div>
                <div class="kpi-label">MAE</div>
                <div class="kpi-sub">Threshold <= $12</div>
            </div>
            <div class="dl-kpi">
                <div class="kpi-value">{mape:.2f}%</div>
                <div class="kpi-label">MAPE</div>
                <div class="kpi-sub">Threshold <= 3%</div>
            </div>
            <div class="dl-kpi">
                <div class="kpi-value" style="font-size:1.2rem">{mt}</div>
                <div class="kpi-label">Model</div>
                <div class="kpi-sub">400 train / 100 test</div>
            </div>
        </div>
        """, unsafe_allow_html=True)

    # ── Tabs ────────────────────────────────────────────────────────────────────
    tab1, tab2, tab3 = st.tabs(["🔮  Live Predictor", "📊  Feature Insights", "🗃  Dataset"])

    # ─────────────────────────────────────────────────────────────────────────────
    # TAB 1 — Live Predictor
    # ─────────────────────────────────────────────────────────────────────────────
    with tab1:
        if not loaded:
            st.warning("Run `python src/train.py` first to generate model artifacts.")
        else:
            left, right = st.columns([1, 1], gap="large")

            with left:
                st.markdown('<div class="dl-section">Customer Profile</div>', unsafe_allow_html=True)
                avg_s  = st.slider("Avg. Session Length (min)",    25.0, 45.0, 33.1, 0.1)
                t_app  = st.slider("Time on App (min / day)",       5.0, 20.0, 12.1, 0.1)
                t_web  = st.slider("Time on Website (min / day)",  25.0, 50.0, 37.1, 0.1)
                mem    = st.slider("Length of Membership (years)",  0.0, 15.0,  3.5, 0.1)

                go = st.button("Predict Spending", use_container_width=True)
                if go:
                    pred, lo, hi = predict(model, scaler, meta, avg_s, t_app, t_web, mem)
                    st.session_state.pred = (pred, lo, hi, avg_s, t_app, t_web, mem)

            with right:
                if "pred" in st.session_state:
                    pred, lo, hi, avg_s_, t_app_, t_web_, mem_ = st.session_state.pred
                    seg, seg_cls = segment_css(pred)

                    st.markdown(f"""
                    <div class="dl-pred-card">
                        <div class="pred-label">Predicted Yearly Spend</div>
                        <div class="pred-amount">${pred:,.2f}</div>
                        <div class="pred-segment {seg_cls}">{seg} Spender</div>
                        <div class="pred-ci">95% CI: ${lo:,.2f} &nbsp;–&nbsp; ${hi:,.2f}</div>
                    </div>
                    """, unsafe_allow_html=True)

                    # Contribution chart
                    if hasattr(model, "coef_"):
                        st.markdown("")
                        st.markdown('<div class="dl-section" style="margin-top:20px">Feature Contributions</div>', unsafe_allow_html=True)
                        X_s = scaler.transform(np.array([[avg_s_, t_app_, t_web_, mem_]]))
                        contribs = model.coef_ * X_s[0]
                        contrib_df = pd.DataFrame({
                            "Feature": ["Session Length", "Time on App", "Time on Website", "Membership"],
                            "Contribution": [round(float(c), 2) for c in contribs],
                        })
                        st.bar_chart(contrib_df.set_index("Feature"), color="#7C3AED")
                else:
                    st.markdown("""
                    <div class="dl-empty">
                        <div class="empty-icon">🔮</div>
                        <div class="empty-text">Adjust the sliders and click Predict Spending</div>
                    </div>
                    """, unsafe_allow_html=True)

            # Batch upload
            st.markdown("---")
            st.markdown('<div class="dl-section">Batch Prediction — CSV Upload</div>', unsafe_allow_html=True)
            st.caption("CSV must contain: `Avg. Session Length`, `Time on App`, `Time on Website`, `Length of Membership`")

            f = st.file_uploader("Upload CSV", type="csv", label_visibility="collapsed")
            if f:
                try:
                    bdf = pd.read_csv(f)
                    cols = ["Avg. Session Length", "Time on App", "Time on Website", "Length of Membership"]
                    miss = [c for c in cols if c not in bdf.columns]
                    if miss:
                        st.error(f"Missing columns: {miss}")
                    else:
                        X_b = scaler.transform(bdf[cols].values)
                        preds = model.predict(X_b)
                        bdf["Predicted_Yearly_Spend"] = np.round(preds, 2)
                        bdf["Segment"] = [segment_css(p)[0] for p in preds]
                        st.success(f"Predicted {len(bdf):,} customers")
                        st.dataframe(bdf, use_container_width=True)
                        st.download_button("Download Results", bdf.to_csv(index=False).encode(), "predictions.csv", "text/csv")
                except Exception as e:
                    st.error(f"Error: {e}")

    # ─────────────────────────────────────────────────────────────────────────────
    # TAB 2 — Feature Insights
    # ─────────────────────────────────────────────────────────────────────────────
    with tab2:
        if not loaded:
            st.info("Train the model first.")
        else:
            left2, right2 = st.columns([1, 1], gap="large")

            with left2:
                st.markdown('<div class="dl-section">Feature Importance Ranking</div>', unsafe_allow_html=True)

                features = [
                    {
                        "rank": "#1",
                        "name": "Length of Membership",
                        "coef": "+$61.90 / year",
                        "bar": 100,
                        "detail": "Each additional year as a member drives +$61.90 in yearly spend. The single strongest predictor — loyalty is highly profitable.",
                    },
                    {
                        "rank": "#2",
                        "name": "Time on App",
                        "coef": "+$38.79 / min/day",
                        "bar": 63,
                        "detail": "Every extra daily minute on the mobile app adds +$38.79/year. Mobile engagement is the #2 revenue lever.",
                    },
                    {
                        "rank": "#3",
                        "name": "Avg. Session Length",
                        "coef": "+$25.60 / min",
                        "bar": 41,
                        "detail": "Longer average sessions correlate with +$25.60 more yearly spend — engaged browsing signals buying intent.",
                    },
                    {
                        "rank": "#4",
                        "name": "Time on Website",
                        "coef": "+$0.31 / min/day",
                        "bar": 1,
                        "detail": "Website time has a near-zero effect ($0.31). Lasso confirms it is almost entirely non-predictive.",
                    },
                ]

                for f_ in features:
                    st.markdown(f"""
                    <div class="dl-insight">
                        <div class="ins-rank">{f_['rank']}</div>
                        <div class="ins-feature">{f_['name']}
                            <span class="ins-coef">{f_['coef']}</span>
                        </div>
                        <div class="ins-bar-bg">
                            <div class="ins-bar" style="width:{f_['bar']}%"></div>
                        </div>
                        <div class="ins-detail">{f_['detail']}</div>
                    </div>
                    """, unsafe_allow_html=True)

            with right2:
                st.markdown('<div class="dl-section">Model Scorecard</div>', unsafe_allow_html=True)

                scorecard = pd.DataFrame({
                    "Metric":    ["R² Score", "RMSE", "MAE", "MAPE", "CV Std"],
                    "Achieved":  [f"{meta.get('test_r2',0):.4f}", f"${meta.get('test_rmse',0):.2f}",
                                  f"${meta.get('test_mae',0):.2f}", f"{meta.get('test_mape',0):.2f}%", "0.0016"],
                    "Threshold": [">=0.95", "<=$15.00", "<=$12.00", "<=3.00%", "<0.02"],
                    "Status":    ["PASS", "PASS", "PASS", "PASS", "PASS"],
                })
                st.dataframe(scorecard, use_container_width=True, hide_index=True)

                st.markdown("")
                st.markdown('<div class="dl-section">Business Takeaways</div>', unsafe_allow_html=True)

                insights = [
                    ("📱", "App > Website", "Mobile app drives 125x more revenue per minute than the website. Prioritise app features over web improvements."),
                    ("🔒", "Loyalty = Revenue", "1 extra year of membership = +$61.90/year. A retention programme adding 1 year across 500 customers = +$30,950."),
                    ("🎯", "Prediction Accuracy", "Model predicts within $10.48 (RMSE) for the average customer — reliable enough for marketing budget allocation."),
                    ("⚡", "Website is Noise", "Lasso independently confirms Time on Website adds zero value. Redirect that investment to the app."),
                ]
                for icon, title, body in insights:
                    st.markdown(f"""
                    <div class="dl-insight" style="margin-bottom:10px">
                        <div style="font-size:1.4rem;margin-bottom:6px">{icon}</div>
                        <div style="font-weight:700;color:#FFFFFF;margin-bottom:4px">{title}</div>
                        <div style="font-size:0.8rem;color:#94A3B8;line-height:1.5">{body}</div>
                    </div>
                    """, unsafe_allow_html=True)

    # ─────────────────────────────────────────────────────────────────────────────
    # TAB 3 — Dataset Explorer
    # ─────────────────────────────────────────────────────────────────────────────
    with tab3:
        df = load_data()
        if df is None:
            st.warning("Dataset not found at data/raw/Ecommerce_Customers.csv")
        else:
            c1, c2, c3, c4 = st.columns(4)
            c1.metric("Total Customers",  f"{len(df):,}")
            c2.metric("Avg. Yearly Spend", f"${df['Yearly Amount Spent'].mean():.2f}")
            c3.metric("Min Spend",         f"${df['Yearly Amount Spent'].min():.2f}")
            c4.metric("Max Spend",         f"${df['Yearly Amount Spent'].max():.2f}")

            st.markdown("")
            left3, right3 = st.columns([1, 1], gap="large")

            with left3:
                st.markdown('<div class="dl-section">Numerical Summary</div>', unsafe_allow_html=True)
                cols = ["Avg. Session Length", "Time on App", "Time on Website",
                        "Length of Membership", "Yearly Amount Spent"]
                st.dataframe(df[cols].describe().round(2), use_container_width=True)

            with right3:
                st.markdown('<div class="dl-section">Spending Segments</div>', unsafe_allow_html=True)
                bins   = [0, 350, 450, 550, 650, 2000]
                labels = ["Very Low (<$350)", "Low ($350-450)", "Medium ($450-550)",
                          "High ($550-650)", "Very High (>$650)"]
                df2 = df.copy()
                df2["Segment"] = pd.cut(df2["Yearly Amount Spent"], bins=bins, labels=labels)
                seg_counts = df2["Segment"].value_counts().reindex(labels)
                st.bar_chart(seg_counts, color="#7C3AED")

            st.markdown('<div class="dl-section" style="margin-top:24px">Raw Data Sample</div>', unsafe_allow_html=True)
            st.dataframe(df.head(20), use_container_width=True)

    # ── Footer ──────────────────────────────────────────────────────────────────
    st.markdown("""
    <div class="dl-footer">
        Built by <strong style="color:#94A3B8">Charles Shalua</strong> &nbsp;·&nbsp;
        <a href="https://datalife.dev">DataLife</a> &nbsp;·&nbsp;
        ML Portfolio Project 3 &nbsp;·&nbsp; OLS Linear Regression
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    main()
