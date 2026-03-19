"""
Retraining Pipeline — E-Commerce Customer Spending Prediction
=============================================================
Accepts new customer data, retrains the model, evaluates it against
performance thresholds, and only deploys if quality standards are met.

Usage:
    python src/retrain.py --data path/to/new_data.csv [--output models/]

Exit Codes:
    0  — Success: new model deployed
    1  — Data validation failed
    2  — Performance thresholds not met — old model retained
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from datetime import datetime
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.linear_model import ElasticNet, Lasso, LinearRegression, Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.preprocessing import StandardScaler

# ─── Paths ─────────────────────────────────────────────────────────────────────
ROOT       = Path(__file__).resolve().parent.parent
MODELS_DIR = ROOT / "models"
REPORTS_DIR = ROOT / "reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

# ─── Constants ─────────────────────────────────────────────────────────────────
REQUIRED_COLUMNS = [
    "Avg. Session Length",
    "Time on App",
    "Time on Website",
    "Length of Membership",
    "Yearly Amount Spent",
]
FEATURE_COLS = REQUIRED_COLUMNS[:-1]
TARGET_COL   = "Yearly Amount Spent"
RANDOM_STATE = 42
TEST_SIZE    = 0.2

THRESHOLDS = {"r2": 0.95, "rmse": 15.00, "mae": 12.00, "mape": 3.0}

# Validation bounds (matching API input bounds + target range)
BOUNDS = {
    "Avg. Session Length":   (25.0, 45.0),
    "Time on App":           (5.0,  20.0),
    "Time on Website":       (25.0, 50.0),
    "Length of Membership":  (0.0,  15.0),
    "Yearly Amount Spent":   (0.0,  2000.0),
}

MIN_ROWS = 100


# ─── Helpers ───────────────────────────────────────────────────────────────────

def mape(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    return float(np.mean(np.abs((y_true - y_pred) / y_true)) * 100)


def compute_metrics(model, X: np.ndarray, y: pd.Series) -> dict:
    y_pred = model.predict(X)
    return {
        "r2":   round(float(r2_score(y, y_pred)), 6),
        "rmse": round(float(np.sqrt(mean_squared_error(y, y_pred))), 4),
        "mae":  round(float(mean_absolute_error(y, y_pred)), 4),
        "mape": round(mape(np.array(y), y_pred), 4),
    }


def log(msg: str) -> None:
    print(f"  {msg}")


# ─── Step 1: Load & Validate ──────────────────────────────────────────────────

def load_and_validate(data_path: Path) -> pd.DataFrame:
    print("\n[Step 1] Loading and validating new data...")

    if not data_path.exists():
        print(f"[ERROR] File not found: {data_path}")
        sys.exit(1)

    try:
        df = pd.read_csv(data_path)
    except Exception as e:
        print(f"[ERROR] Could not read CSV: {e}")
        sys.exit(1)

    # Check required columns
    missing = [c for c in REQUIRED_COLUMNS if c not in df.columns]
    if missing:
        print(f"[ERROR] Missing required columns: {missing}")
        sys.exit(1)
    log(f"All {len(REQUIRED_COLUMNS)} required columns present — OK")

    # Minimum row count
    if len(df) < MIN_ROWS:
        print(f"[ERROR] Minimum {MIN_ROWS} rows required, got {len(df)}")
        sys.exit(1)
    log(f"Row count: {len(df)} (>= {MIN_ROWS}) — OK")

    # No nulls
    null_counts = df[REQUIRED_COLUMNS].isnull().sum()
    if null_counts.sum() > 0:
        print(f"[ERROR] Null values found:\n{null_counts[null_counts > 0]}")
        sys.exit(1)
    log("No null values — OK")

    # All values numeric
    for col in REQUIRED_COLUMNS:
        if not pd.api.types.is_numeric_dtype(df[col]):
            print(f"[ERROR] Column '{col}' is not numeric (dtype: {df[col].dtype})")
            sys.exit(1)
    log("All columns are numeric — OK")

    # Reasonable ranges
    out_of_range = []
    for col, (lo, hi) in BOUNDS.items():
        bad = df[(df[col] < lo) | (df[col] > hi)]
        if len(bad) > 0:
            out_of_range.append(f"  {col}: {len(bad)} rows outside [{lo}, {hi}]")
    if out_of_range:
        print("[ERROR] Out-of-range values detected:")
        for msg in out_of_range:
            print(msg)
        sys.exit(1)
    log("All values within expected ranges — OK")

    log(f"Validation passed — {len(df)} rows, {df.shape[1]} columns")
    return df[REQUIRED_COLUMNS]


# ─── Step 2: Load Current Metadata ───────────────────────────────────────────

def load_current_metadata() -> dict:
    print("\n[Step 2] Loading current model metadata...")
    meta_path = MODELS_DIR / "metadata.json"
    if not meta_path.exists():
        print("[ERROR] No existing model found at models/metadata.json. Run train.py first.")
        sys.exit(1)

    with open(meta_path, encoding="utf-8") as f:
        metadata = json.load(f)

    log(f"Current model : {metadata.get('model_type', 'Unknown')}")
    log(f"  R²          : {metadata.get('test_r2', 0):.6f}")
    log(f"  RMSE        : ${metadata.get('test_rmse', 0):.4f}")
    log(f"  MAE         : ${metadata.get('test_mae', 0):.4f}")
    log(f"  MAPE        : {metadata.get('test_mape', 0):.4f}%")
    log(f"  Trained on  : {metadata.get('train_date', 'unknown')}")
    return metadata


# ─── Step 3: Train New Model ──────────────────────────────────────────────────

def train_new_model(df: pd.DataFrame, model_type: str) -> tuple:
    print(f"\n[Step 3] Training new {model_type} model...")

    X = df[FEATURE_COLS].copy()
    y = df[TARGET_COL].copy()
    log(f"Target range: ${y.min():.2f} – ${y.max():.2f}, mean: ${y.mean():.2f}")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE
    )
    log(f"Split: {len(X_train)} train / {len(X_test)} test (80/20, random_state=42)")

    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s  = scaler.transform(X_test)
    log("Fitted StandardScaler on train only — no data leakage")

    # Train matching model type
    if model_type == "OLS" or model_type == "LinearRegression":
        model = LinearRegression()
        model.fit(X_train_s, y_train)
        best_params = {}
        log("Trained OLS (no hyperparameters)")

    elif model_type == "Ridge":
        gs = GridSearchCV(
            Ridge(random_state=RANDOM_STATE),
            {"alpha": [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]},
            cv=5, scoring="r2", n_jobs=-1,
        )
        gs.fit(X_train_s, y_train)
        model = gs.best_estimator_
        best_params = gs.best_params_
        log(f"Ridge best alpha: {best_params['alpha']}  (CV R²={gs.best_score_:.6f})")

    elif model_type == "Lasso":
        gs = GridSearchCV(
            Lasso(random_state=RANDOM_STATE, max_iter=10000),
            {"alpha": [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]},
            cv=5, scoring="r2", n_jobs=-1,
        )
        gs.fit(X_train_s, y_train)
        model = gs.best_estimator_
        best_params = gs.best_params_
        log(f"Lasso best alpha: {best_params['alpha']}  (CV R²={gs.best_score_:.6f})")

    elif model_type == "ElasticNet":
        gs = GridSearchCV(
            ElasticNet(random_state=RANDOM_STATE, max_iter=10000),
            {
                "alpha":    [0.001, 0.01, 0.1, 1.0],
                "l1_ratio": [0.1, 0.3, 0.5, 0.7, 0.9],
            },
            cv=5, scoring="r2", n_jobs=-1,
        )
        gs.fit(X_train_s, y_train)
        model = gs.best_estimator_
        best_params = gs.best_params_
        log(f"ElasticNet best: {best_params}  (CV R²={gs.best_score_:.6f})")

    else:
        # Default to OLS for unknown type
        log(f"[WARN] Unknown model type '{model_type}' — defaulting to OLS")
        model = LinearRegression()
        model.fit(X_train_s, y_train)
        best_params = {}

    return model, scaler, X_test_s, y_test, best_params, len(X_train), len(X_test)


# ─── Step 4 & 5: Evaluate + Performance Gate ─────────────────────────────────

def evaluate_and_gate(
    model,
    X_test_s,
    y_test,
    current_metadata: dict,
) -> tuple[dict, bool, list[str]]:
    print("\n[Step 4] Evaluating new model on test set...")
    metrics = compute_metrics(model, X_test_s, y_test)
    log(f"  R²   : {metrics['r2']:.6f}")
    log(f"  RMSE : ${metrics['rmse']:.4f}")
    log(f"  MAE  : ${metrics['mae']:.4f}")
    log(f"  MAPE : {metrics['mape']:.4f}%")

    print("\n[Step 5] Performance gate...")
    passed = True
    failures = []

    for metric, threshold in THRESHOLDS.items():
        val = metrics[metric]
        ok = (val >= threshold) if metric == "r2" else (val <= threshold)
        status = "OK" if ok else "FAIL FAIL"
        direction = ">=" if metric == "r2" else "<="
        log(f"  {metric.upper():6s}: {val:.4f}  (threshold: {direction}{threshold})  {status}")
        if not ok:
            passed = False
            failures.append(
                f"{metric.upper()} = {val:.4f} failed threshold ({direction}{threshold})"
            )

    # Degradation check vs current model
    current_r2 = current_metadata.get("test_r2", 0)
    if metrics["r2"] < current_r2 - 0.01:
        warn = (
            f"[WARN] New R² ({metrics['r2']:.6f}) is significantly lower than current "
            f"({current_r2:.6f}) — degradation detected"
        )
        log(warn)
        failures.append(warn)

    return metrics, passed, failures


# ─── Step 6: Save Artifacts ───────────────────────────────────────────────────

def save_artifacts(
    model,
    scaler: StandardScaler,
    metrics: dict,
    best_params: dict,
    model_type: str,
    train_size: int,
    test_size: int,
    data_path: Path,
    output_dir: Path,
) -> None:
    print("\n[Step 6] Saving new artifacts...")

    # Archive previous artifacts
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    archive_dir = output_dir / "archive" / timestamp
    archive_dir.mkdir(parents=True, exist_ok=True)

    for artifact in ["model.pkl", "scaler.pkl", "metadata.json"]:
        src = output_dir / artifact
        if src.exists():
            shutil.copy2(src, archive_dir / artifact)

    log(f"Archived previous artifacts -> models/archive/{timestamp}/")

    # Save new artifacts
    joblib.dump(model, output_dir / "model.pkl")
    log("Saved models/model.pkl")

    joblib.dump(scaler, output_dir / "scaler.pkl")
    log("Saved models/scaler.pkl")

    metadata = {
        "model_type":     model_type,
        "model_version":  "1.0.0",
        "best_params":    best_params,
        "train_date":     datetime.now().strftime("%Y-%m-%d"),
        "train_size":     train_size,
        "test_size":      test_size,
        "random_state":   RANDOM_STATE,
        "test_r2":        metrics["r2"],
        "test_rmse":      metrics["rmse"],
        "test_mae":       metrics["mae"],
        "test_mape":      metrics["mape"],
        "feature_names":  [c.lower().replace(" ", "_").replace(".", "") for c in FEATURE_COLS],
        "feature_names_raw": FEATURE_COLS,
        "retrain_source": str(data_path),
        "retrain_timestamp": timestamp,
    }

    (output_dir / "metadata.json").write_text(
        json.dumps(metadata, indent=2), encoding="utf-8"
    )
    log("Saved models/metadata.json")


# ─── Step 7: Generate Report ──────────────────────────────────────────────────

def generate_report(
    data_path: Path,
    row_count: int,
    model_type: str,
    old_metadata: dict,
    new_metrics: dict,
    status: str,
    failures: list[str],
) -> None:
    print("\n[Step 7] Generating retraining report...")

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    old_r2   = old_metadata.get("test_r2", 0)
    old_rmse = old_metadata.get("test_rmse", 0)

    reason_block = ""
    if failures:
        reason_block = "\n**Failures:**\n" + "\n".join(f"- {f}" for f in failures)

    report = f"""## Retraining Report — {timestamp}

**Data:** {data_path.name}, {row_count} rows
**Model Type:** {model_type}

**Previous Performance:**
- R² = {old_r2:.6f}
- RMSE = ${old_rmse:.4f}

**New Performance:**
- R² = {new_metrics['r2']:.6f}
- RMSE = ${new_metrics['rmse']:.4f}
- MAE = ${new_metrics['mae']:.4f}
- MAPE = {new_metrics['mape']:.4f}%

**Status:** {status}
{reason_block}
"""

    # Save to reports/
    ts_file = datetime.now().strftime("%Y%m%d_%H%M%S")
    report_path = REPORTS_DIR / f"retrain_{ts_file}.md"
    report_path.write_text(report, encoding="utf-8")

    print(report)
    log(f"Report saved -> reports/retrain_{ts_file}.md")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Retrain the E-Commerce spending prediction model on new data."
    )
    parser.add_argument(
        "--data", required=True, type=Path,
        help="Path to new customer data CSV"
    )
    parser.add_argument(
        "--output", default=str(MODELS_DIR), type=Path,
        help="Directory to save model artifacts (default: models/)"
    )
    args = parser.parse_args()

    output_dir: Path = args.output
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("  DataLife ML — Retraining Pipeline  v1.0.0")
    print("  E-Commerce Customer Spending Prediction")
    print("=" * 60)

    # Step 1: Load & validate new data
    df = load_and_validate(args.data)

    # Step 2: Load current metadata to get model type + baseline metrics
    current_metadata = load_current_metadata()
    model_type = current_metadata.get("model_type", "OLS")

    # Step 3: Train matching model type on new data
    model, scaler, X_test_s, y_test, best_params, train_size, test_size = train_new_model(
        df, model_type
    )

    # Steps 4 & 5: Evaluate + gate
    new_metrics, passed, failures = evaluate_and_gate(model, X_test_s, y_test, current_metadata)

    if not passed:
        print("\n[REJECTED] New model did not meet performance thresholds. Old model retained.")
        generate_report(
            args.data, len(df), model_type, current_metadata,
            new_metrics, "REJECTED", failures
        )
        sys.exit(2)

    # Step 6: Save new artifacts
    save_artifacts(
        model, scaler, new_metrics, best_params,
        model_type, train_size, test_size, args.data, output_dir
    )

    # Step 7: Generate report
    generate_report(
        args.data, len(df), model_type, current_metadata,
        new_metrics, "DEPLOYED", failures
    )

    print("\n" + "=" * 60)
    print(f"  Retraining complete — {model_type} deployed")
    print(f"  R²={new_metrics['r2']:.4f}  RMSE=${new_metrics['rmse']:.2f}  MAE=${new_metrics['mae']:.2f}")
    print("=" * 60 + "\n")

    sys.exit(0)


if __name__ == "__main__":
    main()
