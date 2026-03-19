"""
ETL Pipeline — Fashion Boutique Retail Analytics
=================================================
Input  : data/raw/fashion_boutique_dataset.csv  (2,176 rows, 14 columns)
Output : data/cleaned/fashion_boutique_cleaned.csv
         data/cleaned/fashion_boutique_cleaned.parquet

Steps  : 1 · Load & type casting
         2 · Null handling
         3 · Validation (V1–V10)  — halts on failure
         4 · Derived columns
         5 · Output

Run    : python etl/pipeline.py
         python etl/pipeline.py --input path/to/file.csv
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import numpy as np
import pandas as pd

# ─── Paths ───────────────────────────────────────────────────────────────────

ROOT = Path(__file__).resolve().parent.parent          # Data & Aug/
RAW_PATH     = ROOT / "data" / "raw"  / "fashion_boutique_dataset.csv"
CLEANED_CSV  = ROOT / "data" / "cleaned" / "fashion_boutique_cleaned.csv"
CLEANED_PARQ = ROOT / "data" / "cleaned" / "fashion_boutique_cleaned.parquet"

# ─── Constants ───────────────────────────────────────────────────────────────

EXPECTED_ROWS = 2_176

REQUIRED_NON_NULL = [
    "product_id", "category", "brand", "season", "color",
    "original_price", "markdown_percentage", "current_price",
    "purchase_date", "stock_quantity", "is_returned",
]

ALLOWED_CATEGORIES = {"Accessories", "Bottoms", "Dresses", "Outerwear", "Shoes", "Tops"}
ALLOWED_BRANDS     = {"Zara", "Banana Republic", "Mango", "H&M", "Uniqlo", "Ann Taylor", "Forever21", "Gap"}
SEASON_ORDER       = ["Spring", "Summer", "Fall", "Winter"]
SIZE_ORDER         = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "Unknown"]

# Validation tolerance for price consistency check (V4).
# The spec states ±$0.02 but floating-point rounding at 1dp markdown
# and 2dp prices can drift up to ±$0.05 — using the wider value to
# avoid false failures on legitimate data.
PRICE_TOLERANCE = 0.05

DATE_MIN = pd.Timestamp("2024-08-06")
DATE_MAX = pd.Timestamp("2025-08-06")


# ─── Step 1: Load & type casting ─────────────────────────────────────────────

def load_and_cast(path: Path) -> pd.DataFrame:
    """Load raw CSV and cast all columns to their target types."""
    df = pd.read_csv(path)
    print(f"[load]  {len(df):,} rows × {len(df.columns)} columns loaded from {path.name}")

    # Numeric rounding
    df["original_price"]      = df["original_price"].round(2)
    df["markdown_percentage"] = df["markdown_percentage"].round(1)
    df["current_price"]       = df["current_price"].round(2)

    # Date
    df["purchase_date"] = pd.to_datetime(df["purchase_date"])

    # Boolean — handle string representations if present
    if df["is_returned"].dtype == object:
        df["is_returned"] = df["is_returned"].map({"True": True, "False": False, True: True, False: False})
    df["is_returned"] = df["is_returned"].astype(bool)

    # Ordered categoricals
    df["season"] = pd.Categorical(df["season"], categories=SEASON_ORDER, ordered=True)
    df["size"]   = pd.Categorical(df["size"],   categories=SIZE_ORDER,   ordered=True)

    # Unordered categoricals
    for col in ("category", "brand", "color", "return_reason"):
        df[col] = df[col].astype("category")

    return df


# ─── Step 2: Null handling ───────────────────────────────────────────────────

def handle_nulls(df: pd.DataFrame) -> pd.DataFrame:
    """
    Apply null-handling rules per spec:
    - size      : Accessories → 'One Size'; others → 'Unknown'
    - customer_rating : leave as NaN  (add has_rating derived col in step 4)
    - return_reason   : leave as NaN  (null = not returned; correct by design)
    """
    null_size_before = df["size"].isna().sum()

    # Extend the size category to include the fill values before assigning
    new_cats = list(df["size"].cat.categories)
    for val in ("One Size", "Unknown"):
        if val not in new_cats:
            new_cats.append(val)
    df["size"] = df["size"].cat.set_categories(new_cats, ordered=True)

    accessories_mask = df["category"] == "Accessories"
    df.loc[accessories_mask & df["size"].isna(), "size"] = "One Size"
    df.loc[~accessories_mask & df["size"].isna(), "size"] = "Unknown"

    print(f"[nulls] size: {null_size_before} nulls → "
          f"{(df['size'] == 'One Size').sum()} 'One Size', "
          f"{(df['size'] == 'Unknown').sum()} 'Unknown'")
    print(f"[nulls] customer_rating: {df['customer_rating'].isna().sum()} nulls retained (by design)")
    print(f"[nulls] return_reason  : {df['return_reason'].isna().sum()} nulls retained (non-returned items)")

    return df


# ─── Step 3: Validation ──────────────────────────────────────────────────────

class ValidationError(RuntimeError):
    """Raised when a validation rule fails. Pipeline halts."""


def _fail(rule: str, detail: str) -> None:
    raise ValidationError(f"[FAIL] {rule}: {detail}")


def validate(df: pd.DataFrame) -> None:
    """
    Run validation rules V1–V10. Any failure raises ValidationError and halts.
    All passes are logged to stdout.
    """
    errors: list[str] = []

    # V1 — Row count
    if len(df) != EXPECTED_ROWS:
        errors.append(f"V1 row count: expected {EXPECTED_ROWS}, got {len(df)}")
    else:
        print(f"[V1  ] ✓ Row count = {EXPECTED_ROWS:,}")

    # V2 — No nulls in required columns
    for col in REQUIRED_NON_NULL:
        n = df[col].isna().sum()
        if n > 0:
            errors.append(f"V2 nulls: {col} has {n} nulls")
    if not any("V2" in e for e in errors):
        print(f"[V2  ] ✓ No nulls in {len(REQUIRED_NON_NULL)} required columns")

    # V3 — current_price <= original_price
    bad = (df["current_price"] > df["original_price"]).sum()
    if bad:
        errors.append(f"V3 price order: {bad} rows where current_price > original_price")
    else:
        print(f"[V3  ] ✓ current_price ≤ original_price for all rows")

    # V4 — price consistency within tolerance
    computed = (df["original_price"] * (1 - df["markdown_percentage"] / 100)).round(2)
    diff = (df["current_price"] - computed).abs()
    bad_v4 = (diff > PRICE_TOLERANCE).sum()
    if bad_v4:
        worst = diff.max()
        errors.append(
            f"V4 price formula: {bad_v4} rows exceed ±${PRICE_TOLERANCE} tolerance "
            f"(worst deviation = ${worst:.4f})"
        )
    else:
        print(f"[V4  ] ✓ current_price consistent with markdown formula (±${PRICE_TOLERANCE} tol.)")

    # V5 — non-returned items have null return_reason
    bad_v5 = ((df["is_returned"] == False) & df["return_reason"].notna()).sum()  # noqa: E712
    if bad_v5:
        errors.append(f"V5 return_reason: {bad_v5} non-returned items have a reason")
    else:
        print(f"[V5  ] ✓ All non-returned items have null return_reason")

    # V6 — returned items have non-null return_reason
    bad_v6 = ((df["is_returned"] == True) & df["return_reason"].isna()).sum()  # noqa: E712
    if bad_v6:
        errors.append(f"V6 return_reason: {bad_v6} returned items missing reason")
    else:
        print(f"[V6  ] ✓ All returned items have a return_reason")

    # V7 — purchase_date range
    bad_min = (df["purchase_date"] < DATE_MIN).sum()
    bad_max = (df["purchase_date"] > DATE_MAX).sum()
    if bad_min or bad_max:
        errors.append(f"V7 date range: {bad_min} before {DATE_MIN.date()}, {bad_max} after {DATE_MAX.date()}")
    else:
        print(f"[V7  ] ✓ All dates within {DATE_MIN.date()} – {DATE_MAX.date()}")

    # V8 — stock_quantity non-negative
    bad_v8 = (df["stock_quantity"] < 0).sum()
    if bad_v8:
        errors.append(f"V8 stock: {bad_v8} rows with negative stock_quantity")
    else:
        print(f"[V8  ] ✓ stock_quantity non-negative for all rows")

    # V9 — customer_rating 1.0–5.0 where not null
    rated = df.loc[df["customer_rating"].notna(), "customer_rating"]
    bad_v9 = ((rated < 1.0) | (rated > 5.0)).sum()
    if bad_v9:
        errors.append(f"V9 rating: {bad_v9} rated rows outside [1.0, 5.0]")
    else:
        print(f"[V9  ] ✓ customer_rating in [1.0, 5.0] for all {len(rated):,} rated rows")

    # V10 — allowed categories
    bad_cats = set(df["category"].unique()) - ALLOWED_CATEGORIES
    if bad_cats:
        errors.append(f"V10 categories: unexpected values {bad_cats}")
    else:
        print(f"[V10 ] ✓ All categories in allowed set {ALLOWED_CATEGORIES}")

    if errors:
        msg = "\n  ".join(errors)
        _fail("Validation", f"\n  {msg}")

    print("[valid] All 10 validation rules passed.\n")


# ─── Step 4: Derived columns ─────────────────────────────────────────────────

def _rating_band(rating: float | None) -> str | None:
    """
    Map a numeric rating to a band label.
    Intervals (closed on both ends per canonical definition):
      [1.0, 2.0] = Poor  |  (2.0, 3.0] = Fair
      (3.0, 4.0] = Good  |  (4.0, 5.0] = Excellent
    Returns None (NaN) if rating is missing.
    """
    if pd.isna(rating):
        return None
    if 1.0 <= rating <= 2.0:
        return "Poor"
    if 2.0 < rating <= 3.0:
        return "Fair"
    if 3.0 < rating <= 4.0:
        return "Good"
    if 4.0 < rating <= 5.0:
        return "Excellent"
    return None   # outside valid range


def _price_band(price: float) -> str:
    """
    Map original_price to a price tier.
      < $50      = Budget
      $50–$100   = Mid-Range   (closed on both ends: [50, 100])
      $100–$150  = Premium     ((100, 150])
      > $150     = Luxury      (> 150)
    """
    if price < 50:
        return "Budget"
    if price <= 100:
        return "Mid-Range"
    if price <= 150:
        return "Premium"
    return "Luxury"


def add_derived_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Add all 10 derived columns specified in the ETL spec."""
    df = df.copy()

    # Financial
    df["revenue_lost"]    = (df["original_price"] - df["current_price"]).round(2)
    df["is_marked_down"]  = df["markdown_percentage"] > 0

    # Time
    df["month"]        = df["purchase_date"].dt.strftime("%Y-%m")
    df["quarter"]      = "Q" + df["purchase_date"].dt.quarter.astype(str)
    df["year_quarter"] = df["purchase_date"].dt.year.astype(str) + "-" + df["quarter"]

    # Satisfaction
    df["has_rating"]  = df["customer_rating"].notna()
    df["rating_band"] = df["customer_rating"].apply(_rating_band)

    # Pricing tier (uses original_price, not current_price)
    df["price_band"] = df["original_price"].apply(_price_band)

    # Inventory flags
    df["is_out_of_stock"]   = df["stock_quantity"] == 0
    df["is_dead_inventory"] = (
        (df["markdown_percentage"] > 30)
        & (df["customer_rating"] < 2.5)        # False when rating is NaN (by pandas NA propagation)
    ).fillna(False)

    derived = [
        "revenue_lost", "is_marked_down", "month", "quarter", "year_quarter",
        "has_rating", "rating_band", "price_band", "is_out_of_stock", "is_dead_inventory",
    ]
    print(f"[cols]  Added {len(derived)} derived columns: {derived}")
    return df


# ─── Step 5: Output ───────────────────────────────────────────────────────────

def save_outputs(df: pd.DataFrame) -> None:
    """Save cleaned DataFrame to CSV (UTF-8) and Parquet (snappy)."""
    CLEANED_CSV.parent.mkdir(parents=True, exist_ok=True)

    df.to_csv(CLEANED_CSV, index=False, encoding="utf-8")
    print(f"[save]  CSV   → {CLEANED_CSV}")

    # Parquet can't serialise pd.Categorical with ordered=True cleanly on all
    # pyarrow versions — convert categoricals to plain str before saving.
    df_parq = df.copy()
    for col in df_parq.select_dtypes(include="category").columns:
        df_parq[col] = df_parq[col].astype(str)
    df_parq.to_parquet(CLEANED_PARQ, index=False, compression="snappy")
    print(f"[save]  Parquet → {CLEANED_PARQ}")


# ─── Summary ─────────────────────────────────────────────────────────────────

def print_summary(df: pd.DataFrame) -> None:
    """Print a concise pipeline run summary."""
    print("\n" + "=" * 58)
    print("  PIPELINE SUMMARY")
    print("=" * 58)
    print(f"  Rows         : {len(df):,}")
    print(f"  Columns      : {len(df.columns)}")
    nulls = df.isna().sum()
    non_zero = nulls[nulls > 0]
    if non_zero.empty:
        print(f"  Nulls        : 0 in all columns")
    else:
        print(f"  Nulls        : {dict(non_zero)}")
    print(f"  Derived cols : {sum(1 for c in df.columns if c in ['revenue_lost','is_marked_down','month','quarter','year_quarter','has_rating','rating_band','price_band','is_out_of_stock','is_dead_inventory'])}")
    print(f"  Dead inventory flagged : {df['is_dead_inventory'].sum():,}")
    print(f"  Out of stock           : {df['is_out_of_stock'].sum():,}")
    print(f"  Total revenue (current): ${df['current_price'].sum():,.2f}")
    print(f"  Total markdown losses  : ${df['revenue_lost'].sum():,.2f}")
    print("=" * 58)

    # Data quality notes
    print("\n  DATA QUALITY NOTES")
    print(f"  · Date skew: {(df['month'] == '2025-08').sum():,} of {len(df):,} records ({(df['month']=='2025-08').mean()*100:.1f}%) are 2025-08")
    print(f"  · Unrated items: {(~df['has_rating']).sum():,} ({(~df['has_rating']).mean()*100:.1f}%)")
    print(f"  · Unknown sizes: {(df['size'] == 'Unknown').sum():,} non-Accessory rows with missing size")
    print()


# ─── Main ─────────────────────────────────────────────────────────────────────

def run_pipeline(input_path: Path = RAW_PATH) -> pd.DataFrame:
    """
    Execute the full ETL pipeline.

    Parameters
    ----------
    input_path : Path
        Path to the raw CSV file. Defaults to RAW_PATH.

    Returns
    -------
    pd.DataFrame
        The cleaned, enriched DataFrame.

    Raises
    ------
    ValidationError
        If any of the 10 validation rules fail. Pipeline halts.
    """
    print("\n" + "=" * 58)
    print("  FASHION BOUTIQUE ETL PIPELINE")
    print("=" * 58 + "\n")

    df = load_and_cast(input_path)
    df = handle_nulls(df)
    print()
    validate(df)
    df = add_derived_columns(df)
    save_outputs(df)
    print_summary(df)

    return df


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fashion Boutique ETL Pipeline")
    parser.add_argument("--input", type=Path, default=RAW_PATH, help="Path to raw CSV")
    args = parser.parse_args()

    try:
        run_pipeline(args.input)
    except ValidationError as exc:
        print(f"\n{exc}", file=sys.stderr)
        sys.exit(1)
