"""
Training Pipeline — E-Commerce Customer Spending Prediction
============================================================
Trains 4 regression models (OLS, Ridge, Lasso, ElasticNet),
tunes hyperparameters via GridSearchCV, evaluates all on test set,
selects the best, and saves artifacts to models/.

Usage:
    python src/train.py

Outputs:
    models/model.pkl       — Best model (joblib)
    models/scaler.pkl      — Fitted StandardScaler (joblib)
    models/metadata.json   — Training metadata + metrics
"""

from __future__ import annotations

import json
import sys
from datetime import date
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
DATA_PATH  = ROOT / "data" / "raw" / "Ecommerce_Customers.csv"
MODELS_DIR = ROOT / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)

# ─── Constants ─────────────────────────────────────────────────────────────────
FEATURE_COLS = [
    "Avg. Session Length",
    "Time on App",
    "Time on Website",
    "Length of Membership",
]
TARGET_COL   = "Yearly Amount Spent"
RANDOM_STATE = 42
TEST_SIZE    = 0.2

THRESHOLDS = {"r2": 0.95, "rmse": 15.00, "mae": 12.00, "mape": 3.0}


# ─── Helpers ───────────────────────────────────────────────────────────────────

def mape(y_true: np.ndarray, y_pred: np.ndarray) -> float:
    return float(np.mean(np.abs((y_true - y_pred) / y_true)) * 100)


def evaluate(model, X: np.ndarray, y: pd.Series) -> dict:
    y_pred = model.predict(X)
    return {
        "r2":   round(float(r2_score(y, y_pred)), 6),
        "rmse": round(float(np.sqrt(mean_squared_error(y, y_pred))), 4),
        "mae":  round(float(mean_absolute_error(y, y_pred)), 4),
        "mape": round(mape(np.array(y), y_pred), 4),
    }


def log(msg: str) -> None:
    print(f"  {msg}")


# ─── Step 1: Load data ─────────────────────────────────────────────────────────

def load_data() -> pd.DataFrame:
    print("\n[Step 1] Loading data...")
    df = pd.read_csv(DATA_PATH)
    assert df.shape == (500, 8), f"Schema mismatch: expected (500, 8), got {df.shape}"
    assert df.isnull().sum().sum() == 0, "Unexpected nulls found in dataset"
    log(f"Loaded {len(df)} rows, {df.shape[1]} columns — OK")
    return df


# ─── Step 2: Feature selection ────────────────────────────────────────────────

def select_features(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
    print("\n[Step 2] Selecting features...")
    X = df[FEATURE_COLS].copy()
    y = df[TARGET_COL].copy()
    log(f"Features : {FEATURE_COLS}")
    log(f"Target   : {TARGET_COL}  (range: ${y.min():.2f} – ${y.max():.2f}, mean: ${y.mean():.2f})")
    log("Dropped  : Email, Address, Avatar (identifiers)")
    return X, y


# ─── Step 3: Train/test split ─────────────────────────────────────────────────

def split(X: pd.DataFrame, y: pd.Series):
    print("\n[Step 3] Splitting train/test...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE
    )
    log(f"Train: {len(X_train)} rows  |  Test: {len(X_test)} rows  |  random_state={RANDOM_STATE}")
    return X_train, X_test, y_train, y_test


# ─── Step 4: Feature scaling ──────────────────────────────────────────────────

def scale(X_train: pd.DataFrame, X_test: pd.DataFrame):
    print("\n[Step 4] Scaling features (StandardScaler)...")
    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s  = scaler.transform(X_test)
    log("Fitted on train only — no data leakage")
    log(f"Means  : {np.round(scaler.mean_, 3)}")
    log(f"Scales : {np.round(scaler.scale_, 3)}")
    return X_train_s, X_test_s, scaler


# ─── Step 5 + 6: Train 4 models with tuning ──────────────────────────────────

def train_models(X_train_s, y_train) -> dict:
    print("\n[Step 5 & 6] Training models with GridSearchCV...")

    # OLS — no hyperparameters
    log("Training OLS...")
    ols = LinearRegression()
    ols.fit(X_train_s, y_train)

    # Ridge — L2 regularization
    log("Training Ridge (GridSearchCV)...")
    ridge_gs = GridSearchCV(
        Ridge(random_state=RANDOM_STATE),
        {"alpha": [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]},
        cv=5, scoring="r2", n_jobs=-1,
    )
    ridge_gs.fit(X_train_s, y_train)
    log(f"  Ridge best alpha: {ridge_gs.best_params_['alpha']}  (CV R²={ridge_gs.best_score_:.6f})")

    # Lasso — L1 regularization (may zero out weak features)
    log("Training Lasso (GridSearchCV)...")
    lasso_gs = GridSearchCV(
        Lasso(random_state=RANDOM_STATE, max_iter=10000),
        {"alpha": [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]},
        cv=5, scoring="r2", n_jobs=-1,
    )
    lasso_gs.fit(X_train_s, y_train)
    log(f"  Lasso best alpha: {lasso_gs.best_params_['alpha']}  (CV R²={lasso_gs.best_score_:.6f})")

    # ElasticNet — combined L1+L2
    log("Training ElasticNet (GridSearchCV)...")
    en_gs = GridSearchCV(
        ElasticNet(random_state=RANDOM_STATE, max_iter=10000),
        {
            "alpha":    [0.001, 0.01, 0.1, 1.0],
            "l1_ratio": [0.1, 0.3, 0.5, 0.7, 0.9],
        },
        cv=5, scoring="r2", n_jobs=-1,
    )
    en_gs.fit(X_train_s, y_train)
    log(f"  ElasticNet best: {en_gs.best_params_}  (CV R²={en_gs.best_score_:.6f})")

    return {
        "OLS":        {"model": ols,              "params": {}},
        "Ridge":      {"model": ridge_gs.best_estimator_, "params": ridge_gs.best_params_},
        "Lasso":      {"model": lasso_gs.best_estimator_, "params": lasso_gs.best_params_},
        "ElasticNet": {"model": en_gs.best_estimator_,   "params": en_gs.best_params_},
    }


# ─── Step 7: Evaluate all models ─────────────────────────────────────────────

def evaluate_all(models: dict, X_test_s, y_test) -> pd.DataFrame:
    print("\n[Step 7] Evaluating all models on test set...")
    rows = []
    for name, info in models.items():
        m = evaluate(info["model"], X_test_s, y_test)
        rows.append({"Model": name, "R2": m["r2"], "RMSE": m["rmse"], "MAE": m["mae"], "MAPE": m["mape"]})
        log(f"{name:12s} | R2={m['r2']:.6f}  RMSE=${m['rmse']:.2f}  MAE=${m['mae']:.2f}  MAPE={m['mape']:.2f}%")

    results = pd.DataFrame(rows)
    return results


# ─── Step 8: Select best model ───────────────────────────────────────────────

def select_best(models: dict, results: pd.DataFrame) -> tuple[str, any, dict]:
    print("\n[Step 8] Selecting best model...")
    top    = results.sort_values(["R2", "RMSE"], ascending=[False, True])
    best_name = top.iloc[0]["Model"]
    best_r2   = top.iloc[0]["R2"]

    # If all models within 0.001 R², pick OLS for interpretability
    r2_spread = results["R2"].max() - results["R2"].min()
    if r2_spread < 0.001:
        best_name = "OLS"
        log(f"All models within {r2_spread:.6f} R² — selecting OLS for interpretability")
    else:
        log(f"Winner: {best_name}  (R²={best_r2:.6f})")

    best_model  = models[best_name]["model"]
    best_params = models[best_name]["params"]
    best_metrics = results[results["Model"] == best_name].iloc[0].to_dict()

    # Threshold gate
    print("\n[Threshold Check]")
    passed = True
    for metric, threshold in THRESHOLDS.items():
        val = best_metrics[metric.upper()] if metric.upper() in best_metrics else best_metrics.get(metric, None)
        # normalize key lookup
        val = best_metrics.get("R2" if metric == "r2" else metric.upper(), None)
        if val is None:
            val = best_metrics.get(metric, None)
        ok = (val >= threshold) if metric == "r2" else (val <= threshold)
        status = "PASS" if ok else "FAIL"
        direction = ">=" if metric == "r2" else "<="
        log(f"  {metric.upper():6s}: {val:.4f}  (threshold: {direction}{threshold})  {status}")
        if not ok:
            passed = False

    if not passed:
        print("\n[ERROR] Best model failed performance thresholds. Halting.")
        sys.exit(1)

    log(f"\nBest model: {best_name}")
    return best_name, best_model, best_metrics


# ─── Step 9: Save artifacts ──────────────────────────────────────────────────

def save_artifacts(
    best_name: str,
    best_model,
    scaler: StandardScaler,
    best_metrics: dict,
    best_params: dict,
    models: dict,
) -> None:
    print("\n[Step 9] Saving artifacts...")

    joblib.dump(best_model, MODELS_DIR / "model.pkl")
    log(f"Saved models/model.pkl  ({best_name})")

    joblib.dump(scaler, MODELS_DIR / "scaler.pkl")
    log("Saved models/scaler.pkl")

    # Lasso coefficient check
    lasso_model = models["Lasso"]["model"]
    lasso_coefs = dict(zip(FEATURE_COLS, lasso_model.coef_.tolist()))

    metadata = {
        "model_type":     best_name,
        "model_version":  "1.0.0",
        "best_params":    best_params,
        "train_date":     str(date.today()),
        "train_size":     400,
        "test_size":      100,
        "random_state":   RANDOM_STATE,
        "test_r2":        round(best_metrics.get("R2", 0), 6),
        "test_rmse":      round(best_metrics.get("RMSE", 0), 4),
        "test_mae":       round(best_metrics.get("MAE", 0), 4),
        "test_mape":      round(best_metrics.get("MAPE", 0), 4),
        "feature_names":  [c.lower().replace(" ", "_").replace(".", "") for c in FEATURE_COLS],
        "feature_names_raw": FEATURE_COLS,
        "lasso_coefs":    lasso_coefs,
        "all_model_results": {},
    }

    (MODELS_DIR / "metadata.json").write_text(
        json.dumps(metadata, indent=2), encoding="utf-8"
    )
    log("Saved models/metadata.json")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    print("=" * 60)
    print("  DataLife ML — Training Pipeline  v1.0.0")
    print("  E-Commerce Customer Spending Prediction")
    print("=" * 60)

    df                          = load_data()
    X, y                        = select_features(df)
    X_train, X_test, y_train, y_test = split(X, y)
    X_train_s, X_test_s, scaler = scale(X_train, X_test)
    models                      = train_models(X_train_s, y_train)
    results                     = evaluate_all(models, X_test_s, y_test)
    best_name, best_model, best_metrics = select_best(models, results)
    save_artifacts(best_name, best_model, scaler, best_metrics,
                   models[best_name]["params"], models)

    print("\n" + "=" * 60)
    print(f"  Training complete — best model: {best_name}")
    print(f"  R²={best_metrics.get('R2', 0):.4f}  RMSE=${best_metrics.get('RMSE', 0):.2f}  MAE=${best_metrics.get('MAE', 0):.2f}")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
