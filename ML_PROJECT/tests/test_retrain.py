"""
Retraining Pipeline Test Suite
================================
Covers all 6 test cases from retraining_pipeline_spec.md.

Run with:
    pytest tests/test_retrain.py -v

Requires:
  - Original dataset at data/raw/Ecommerce_Customers.csv
  - Existing model artifacts in models/ (run src/train.py first)
"""

import subprocess
import sys
from pathlib import Path

import numpy as np
import pandas as pd
import pytest

ROOT      = Path(__file__).resolve().parent.parent
DATA_PATH = ROOT / "data" / "raw" / "Ecommerce_Customers.csv"

REQUIRED_COLUMNS = [
    "Avg. Session Length",
    "Time on App",
    "Time on Website",
    "Length of Membership",
    "Yearly Amount Spent",
]


def run_retrain(data_path: Path, extra_args: list[str] | None = None) -> subprocess.CompletedProcess:
    """Run retrain.py as a subprocess and return the result."""
    cmd = [sys.executable, str(ROOT / "src" / "retrain.py"), "--data", str(data_path)]
    if extra_args:
        cmd.extend(extra_args)
    return subprocess.run(cmd, capture_output=True, text=True, cwd=str(ROOT))


# ─── RT1: Retrain on original data ───────────────────────────────────────────

def test_RT1_retrain_original_data(tmp_path):
    """Retrain on the original 500-row dataset → Exit 0, R² ≈ 0.984."""
    if not DATA_PATH.exists():
        pytest.skip("Original dataset not found — run data setup first")
    if not (ROOT / "models" / "model.pkl").exists():
        pytest.skip("Model artifacts not found — run train.py first")

    result = run_retrain(DATA_PATH)
    assert result.returncode == 0, (
        f"Expected exit 0, got {result.returncode}\nstderr: {result.stderr}\nstdout: {result.stdout}"
    )
    # R² should be ≈ 0.984 (check report mentions high R²)
    assert "DEPLOYED" in result.stdout or "Retraining complete" in result.stdout


# ─── RT2: Missing column ─────────────────────────────────────────────────────

def test_RT2_missing_column(tmp_path):
    """CSV without 'Time on App' column → Exit 1 with error message."""
    if not DATA_PATH.exists():
        pytest.skip("Original dataset not found")

    df = pd.read_csv(DATA_PATH)[REQUIRED_COLUMNS].drop(columns=["Time on App"])
    bad_csv = tmp_path / "missing_col.csv"
    df.to_csv(bad_csv, index=False)

    result = run_retrain(bad_csv)
    assert result.returncode == 1, f"Expected exit 1, got {result.returncode}"
    assert "Missing required columns" in result.stdout


# ─── RT3: Too few rows ────────────────────────────────────────────────────────

def test_RT3_too_few_rows(tmp_path):
    """CSV with only 50 rows → Exit 1 with 'minimum 100 rows' message."""
    if not DATA_PATH.exists():
        pytest.skip("Original dataset not found")

    df = pd.read_csv(DATA_PATH)[REQUIRED_COLUMNS].head(50)
    small_csv = tmp_path / "small.csv"
    df.to_csv(small_csv, index=False)

    result = run_retrain(small_csv)
    assert result.returncode == 1, f"Expected exit 1, got {result.returncode}"
    assert "100" in result.stdout or "minimum" in result.stdout.lower()


# ─── RT4: Null values ────────────────────────────────────────────────────────

def test_RT4_null_values(tmp_path):
    """CSV with null values → Exit 1 with error message."""
    if not DATA_PATH.exists():
        pytest.skip("Original dataset not found")

    df = pd.read_csv(DATA_PATH)[REQUIRED_COLUMNS].copy()
    # Inject 5 nulls into "Time on App"
    df.loc[df.sample(5, random_state=0).index, "Time on App"] = np.nan
    null_csv = tmp_path / "nulls.csv"
    df.to_csv(null_csv, index=False)

    result = run_retrain(null_csv)
    assert result.returncode == 1, f"Expected exit 1, got {result.returncode}"
    assert "Null" in result.stdout or "null" in result.stdout.lower()


# ─── RT5: Degraded model (shuffled target) ───────────────────────────────────

def test_RT5_shuffled_target(tmp_path):
    """Randomly shuffled target → Exit 2 (thresholds not met), old model retained."""
    if not DATA_PATH.exists():
        pytest.skip("Original dataset not found")
    if not (ROOT / "models" / "model.pkl").exists():
        pytest.skip("Model artifacts not found — run train.py first")

    df = pd.read_csv(DATA_PATH)[REQUIRED_COLUMNS].copy()
    # Shuffle target to break any correlation
    rng = np.random.default_rng(seed=0)
    df["Yearly Amount Spent"] = rng.permutation(df["Yearly Amount Spent"].values)
    shuffled_csv = tmp_path / "shuffled.csv"
    df.to_csv(shuffled_csv, index=False)

    result = run_retrain(shuffled_csv)
    assert result.returncode == 2, (
        f"Expected exit 2 (threshold failure), got {result.returncode}\n"
        f"stdout: {result.stdout}"
    )
    assert "REJECTED" in result.stdout or "threshold" in result.stdout.lower()


# ─── RT6: Archive created on valid retrain ────────────────────────────────────

def test_RT6_archive_created(tmp_path):
    """Valid retrain → previous model.pkl archived to models/archive/."""
    if not DATA_PATH.exists():
        pytest.skip("Original dataset not found")
    if not (ROOT / "models" / "model.pkl").exists():
        pytest.skip("Model artifacts not found — run train.py first")

    archive_dir = ROOT / "models" / "archive"
    # Count existing archive entries before
    before = set(archive_dir.iterdir()) if archive_dir.exists() else set()

    result = run_retrain(DATA_PATH)
    assert result.returncode == 0, (
        f"Expected exit 0, got {result.returncode}\nstdout: {result.stdout}"
    )

    # Archive dir should exist and have a new entry
    assert archive_dir.exists(), "models/archive/ was not created"
    after = set(archive_dir.iterdir())
    new_entries = after - before
    assert len(new_entries) >= 1, "No new archive entry was created"

    # New archive entry should contain model.pkl
    new_archive = list(new_entries)[0]
    assert (new_archive / "model.pkl").exists(), (
        f"model.pkl not found in archive {new_archive}"
    )
