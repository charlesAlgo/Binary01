"""
Unit Tests — Fashion Boutique ETL Pipeline
==========================================
Tests T1–T10 per the ETL specification.
Pass criteria: all 10 tests pass on the raw dataset.

Run:
    pytest etl/tests/test_pipeline.py -v
    pytest etl/tests/test_pipeline.py -v --tb=short
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd
import pytest

# ── Import pipeline under test ────────────────────────────────────────────────
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))  # Data & Aug/

from etl.pipeline import (
    ROOT,
    EXPECTED_ROWS,
    REQUIRED_NON_NULL,
    ALLOWED_CATEGORIES,
    PRICE_TOLERANCE,
    load_and_cast,
    handle_nulls,
    validate,
    add_derived_columns,
    run_pipeline,
    _rating_band,
    _price_band,
)

RAW_PATH = ROOT / "data" / "raw" / "fashion_boutique_dataset.csv"


# ── Shared fixture ────────────────────────────────────────────────────────────

@pytest.fixture(scope="module")
def cleaned_df() -> pd.DataFrame:
    """Run the full pipeline once and share the result across all tests."""
    return run_pipeline(RAW_PATH)


# ── T1 · Row count preserved ──────────────────────────────────────────────────

class TestT1RowCount:
    """T1: Output has same row count as input (2,176)."""

    def test_row_count(self, cleaned_df: pd.DataFrame) -> None:
        assert len(cleaned_df) == EXPECTED_ROWS, (
            f"Expected {EXPECTED_ROWS} rows, got {len(cleaned_df)}"
        )

    def test_no_rows_dropped_vs_raw(self, cleaned_df: pd.DataFrame) -> None:
        raw = pd.read_csv(RAW_PATH)
        assert len(cleaned_df) == len(raw), (
            f"Row count changed during cleaning: raw={len(raw)}, cleaned={len(cleaned_df)}"
        )


# ── T2 · No nulls in required columns ────────────────────────────────────────

class TestT2NoNullsInRequired:
    """T2: All required columns have zero nulls after cleaning."""

    @pytest.mark.parametrize("col", REQUIRED_NON_NULL)
    def test_column_has_no_nulls(self, cleaned_df: pd.DataFrame, col: str) -> None:
        null_count = cleaned_df[col].isna().sum()
        assert null_count == 0, (
            f"Column '{col}' has {null_count} null values after cleaning"
        )


# ── T3 · Size null handling ───────────────────────────────────────────────────

class TestT3SizeNullHandling:
    """T3: Accessories → 'One Size'; other nulls → 'Unknown'."""

    def test_no_nulls_in_size(self, cleaned_df: pd.DataFrame) -> None:
        assert cleaned_df["size"].isna().sum() == 0, \
            "size column still contains nulls after cleaning"

    def test_accessories_have_one_size(self, cleaned_df: pd.DataFrame) -> None:
        raw = pd.read_csv(RAW_PATH)
        # Find products that were Accessories AND had null size in raw data
        accessory_null_ids = raw[
            (raw["category"] == "Accessories") & (raw["size"].isna())
        ]["product_id"].tolist()
        if not accessory_null_ids:
            pytest.skip("No null-size Accessories in raw data")
        filled = cleaned_df[cleaned_df["product_id"].isin(accessory_null_ids)]["size"]
        assert (filled == "One Size").all(), \
            f"Some null-size Accessories were not filled with 'One Size': {filled.value_counts().to_dict()}"

    def test_non_accessories_unknown(self, cleaned_df: pd.DataFrame) -> None:
        raw = pd.read_csv(RAW_PATH)
        non_acc_null_ids = raw[
            (raw["category"] != "Accessories") & (raw["size"].isna())
        ]["product_id"].tolist()
        if not non_acc_null_ids:
            pytest.skip("No null-size non-Accessories in raw data")
        filled = cleaned_df[cleaned_df["product_id"].isin(non_acc_null_ids)]["size"]
        assert (filled == "Unknown").all(), \
            f"Some non-Accessory null sizes were not filled with 'Unknown': {filled.value_counts().to_dict()}"

    def test_no_original_size_values_overwritten(self, cleaned_df: pd.DataFrame) -> None:
        """Rows that had a real size should keep their original size."""
        raw = pd.read_csv(RAW_PATH)
        had_size = raw[raw["size"].notna()]["product_id"].tolist()
        original_sizes = raw.set_index("product_id").loc[had_size, "size"]
        cleaned_sizes  = cleaned_df.set_index("product_id").loc[had_size, "size"].astype(str)
        mismatches = (original_sizes.values != cleaned_sizes.values).sum()
        assert mismatches == 0, f"{mismatches} originally-filled sizes were overwritten"


# ── T4 · All derived columns present ─────────────────────────────────────────

class TestT4DerivedColumnsExist:
    """T4: All 10 derived columns are present in the cleaned DataFrame."""

    DERIVED_COLS = [
        "revenue_lost", "is_marked_down", "month", "quarter",
        "year_quarter", "has_rating", "rating_band", "price_band",
        "is_out_of_stock", "is_dead_inventory",
    ]

    @pytest.mark.parametrize("col", DERIVED_COLS)
    def test_derived_column_exists(self, cleaned_df: pd.DataFrame, col: str) -> None:
        assert col in cleaned_df.columns, f"Derived column '{col}' is missing"


# ── T5 · Price consistency ────────────────────────────────────────────────────

class TestT5PriceConsistency:
    """T5: current_price ≤ original_price for all rows."""

    def test_current_le_original(self, cleaned_df: pd.DataFrame) -> None:
        bad = (cleaned_df["current_price"] > cleaned_df["original_price"]).sum()
        assert bad == 0, (
            f"{bad} rows have current_price > original_price"
        )

    def test_revenue_lost_non_negative(self, cleaned_df: pd.DataFrame) -> None:
        bad = (cleaned_df["revenue_lost"] < 0).sum()
        assert bad == 0, f"{bad} rows have negative revenue_lost"

    def test_revenue_lost_formula(self, cleaned_df: pd.DataFrame) -> None:
        computed = (cleaned_df["original_price"] - cleaned_df["current_price"]).round(2)
        diff = (cleaned_df["revenue_lost"] - computed).abs()
        assert (diff <= 0.01).all(), \
            f"revenue_lost formula mismatch; max deviation = {diff.max():.4f}"

    def test_markdown_formula_tolerance(self, cleaned_df: pd.DataFrame) -> None:
        """current_price ≈ original_price * (1 − markdown_pct / 100) within ±$0.05."""
        computed = (
            cleaned_df["original_price"] * (1 - cleaned_df["markdown_percentage"] / 100)
        ).round(2)
        diff = (cleaned_df["current_price"] - computed).abs()
        bad = (diff > PRICE_TOLERANCE).sum()
        assert bad == 0, (
            f"{bad} rows exceed ±${PRICE_TOLERANCE} markdown formula tolerance. "
            f"Max deviation = ${diff.max():.4f}"
        )


# ── T6 · Rating band mapping ──────────────────────────────────────────────────

class TestT6RatingBandMapping:
    """T6: Rating bands map correctly. Spot-checks and boundary cases."""

    @pytest.mark.parametrize("rating,expected", [
        (1.0,  "Poor"),       # lower bound
        (2.0,  "Poor"),       # upper bound of Poor (closed)
        (2.01, "Fair"),       # just above Poor boundary
        (2.5,  "Fair"),
        (3.0,  "Fair"),       # upper bound of Fair
        (3.01, "Good"),
        (3.5,  "Good"),
        (4.0,  "Good"),       # upper bound of Good
        (4.01, "Excellent"),
        (5.0,  "Excellent"),  # upper bound
        (None, None),         # null → None
        (np.nan, None),       # nan → None
    ])
    def test_band_boundaries(self, rating, expected) -> None:
        result = _rating_band(rating)
        assert result == expected, f"_rating_band({rating}) = {result!r}, expected {expected!r}"

    def test_no_rated_items_have_null_band(self, cleaned_df: pd.DataFrame) -> None:
        rated = cleaned_df[cleaned_df["has_rating"]]
        nulls = rated["rating_band"].isna().sum()
        assert nulls == 0, f"{nulls} rated items have null rating_band"

    def test_unrated_items_have_null_band(self, cleaned_df: pd.DataFrame) -> None:
        unrated = cleaned_df[~cleaned_df["has_rating"]]
        non_nulls = unrated["rating_band"].notna().sum()
        assert non_nulls == 0, f"{non_nulls} unrated items have a non-null rating_band"

    def test_only_valid_band_values(self, cleaned_df: pd.DataFrame) -> None:
        valid = {"Poor", "Fair", "Good", "Excellent"}
        actual = set(cleaned_df["rating_band"].dropna().unique())
        unexpected = actual - valid
        assert not unexpected, f"Unexpected rating_band values: {unexpected}"


# ── T7 · Price band mapping ───────────────────────────────────────────────────

class TestT7PriceBandMapping:
    """T7: Price bands map correctly at boundaries."""

    @pytest.mark.parametrize("price,expected", [
        (15.00,  "Budget"),      # minimum in dataset
        (49.99,  "Budget"),      # just under $50
        (50.00,  "Mid-Range"),   # boundary: $50 = Mid-Range
        (99.99,  "Mid-Range"),
        (100.00, "Mid-Range"),   # $100 still Mid-Range (closed interval [50,100])
        (100.01, "Premium"),     # just above Mid-Range boundary
        (150.00, "Premium"),     # upper bound of Premium
        (150.01, "Luxury"),      # just into Luxury
        (249.98, "Luxury"),      # maximum in dataset
    ])
    def test_price_band_boundaries(self, price, expected) -> None:
        result = _price_band(price)
        assert result == expected, f"_price_band({price}) = {result!r}, expected {expected!r}"

    def test_only_valid_band_values(self, cleaned_df: pd.DataFrame) -> None:
        valid = {"Budget", "Mid-Range", "Premium", "Luxury"}
        actual = set(cleaned_df["price_band"].unique())
        unexpected = actual - valid
        assert not unexpected, f"Unexpected price_band values: {unexpected}"

    def test_no_nulls_in_price_band(self, cleaned_df: pd.DataFrame) -> None:
        assert cleaned_df["price_band"].isna().sum() == 0, \
            "price_band has null values"


# ── T8 · Date parsing ─────────────────────────────────────────────────────────

class TestT8DateParsing:
    """T8: purchase_date is datetime64 type with no parse failures."""

    def test_dtype_is_datetime(self, cleaned_df: pd.DataFrame) -> None:
        assert pd.api.types.is_datetime64_any_dtype(cleaned_df["purchase_date"]), \
            f"purchase_date dtype is {cleaned_df['purchase_date'].dtype}, expected datetime64"

    def test_no_null_dates(self, cleaned_df: pd.DataFrame) -> None:
        nulls = cleaned_df["purchase_date"].isna().sum()
        assert nulls == 0, f"{nulls} null values in purchase_date"

    def test_date_range(self, cleaned_df: pd.DataFrame) -> None:
        min_date = cleaned_df["purchase_date"].min()
        max_date = cleaned_df["purchase_date"].max()
        assert min_date >= pd.Timestamp("2024-08-06"), \
            f"Earliest date {min_date} is before 2024-08-06"
        assert max_date <= pd.Timestamp("2025-08-06"), \
            f"Latest date {max_date} is after 2025-08-06"

    def test_month_format(self, cleaned_df: pd.DataFrame) -> None:
        sample = cleaned_df["month"].dropna().head(20)
        for val in sample:
            assert len(val) == 7 and val[4] == "-", \
                f"month value {val!r} does not match 'YYYY-MM' format"

    def test_year_quarter_format(self, cleaned_df: pd.DataFrame) -> None:
        sample = cleaned_df["year_quarter"].dropna().head(20)
        for val in sample:
            parts = val.split("-")
            assert len(parts) == 2, f"year_quarter {val!r} missing '-' separator"
            assert parts[1].startswith("Q"), f"year_quarter {val!r} missing Q prefix"


# ── T9 · Dead inventory flag ──────────────────────────────────────────────────

class TestT9DeadInventoryFlag:
    """T9: is_dead_inventory is True only when markdown > 30% AND rating < 2.5."""

    def test_true_only_when_conditions_met(self, cleaned_df: pd.DataFrame) -> None:
        dead = cleaned_df[cleaned_df["is_dead_inventory"]]
        assert (dead["markdown_percentage"] > 30).all(), \
            "Some dead_inventory items have markdown ≤ 30%"
        assert (dead["customer_rating"] < 2.5).all(), \
            "Some dead_inventory items have rating ≥ 2.5"

    def test_false_when_no_rating(self, cleaned_df: pd.DataFrame) -> None:
        unrated_dead = cleaned_df[
            (~cleaned_df["has_rating"]) & (cleaned_df["is_dead_inventory"])
        ]
        assert len(unrated_dead) == 0, \
            f"{len(unrated_dead)} unrated items are flagged as dead inventory (should be False)"

    def test_false_when_markdown_le_30(self, cleaned_df: pd.DataFrame) -> None:
        low_md_dead = cleaned_df[
            (cleaned_df["markdown_percentage"] <= 30) & (cleaned_df["is_dead_inventory"])
        ]
        assert len(low_md_dead) == 0, \
            f"{len(low_md_dead)} items with markdown ≤ 30% are flagged as dead inventory"

    def test_expected_count(self, cleaned_df: pd.DataFrame) -> None:
        """The data dictionary documents 118 dead inventory items."""
        count = cleaned_df["is_dead_inventory"].sum()
        # Allow ±5 for any minor data version differences
        assert abs(count - 118) <= 5, \
            f"Expected ~118 dead inventory items, got {count}"


# ── T10 · Return reason consistency ──────────────────────────────────────────

class TestT10ReturnReasonConsistency:
    """T10: Returned items have reasons; non-returned items have null reasons."""

    def test_returned_have_reason(self, cleaned_df: pd.DataFrame) -> None:
        returned = cleaned_df[cleaned_df["is_returned"]]
        missing = returned["return_reason"].isna().sum()
        assert missing == 0, \
            f"{missing} returned items are missing a return_reason"

    def test_not_returned_have_no_reason(self, cleaned_df: pd.DataFrame) -> None:
        not_returned = cleaned_df[~cleaned_df["is_returned"]]
        has_reason = not_returned["return_reason"].notna().sum()
        assert has_reason == 0, \
            f"{has_reason} non-returned items have a return_reason (should be null)"

    def test_return_count_matches_flag(self, cleaned_df: pd.DataFrame) -> None:
        returned_by_flag   = cleaned_df["is_returned"].sum()
        returned_by_reason = cleaned_df["return_reason"].notna().sum()
        assert returned_by_flag == returned_by_reason, (
            f"is_returned count ({returned_by_flag}) ≠ non-null return_reason count ({returned_by_reason})"
        )

    def test_expected_return_count(self, cleaned_df: pd.DataFrame) -> None:
        """Data dictionary documents 320 returned items (14.7%)."""
        count = cleaned_df["is_returned"].sum()
        assert abs(count - 320) <= 3, \
            f"Expected ~320 returned items, got {count}"

    def test_return_rate(self, cleaned_df: pd.DataFrame) -> None:
        rate = cleaned_df["is_returned"].mean() * 100
        assert abs(rate - 14.7) <= 0.5, \
            f"Expected return rate ~14.7%, got {rate:.2f}%"
