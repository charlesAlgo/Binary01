# ETL Pipeline Specification

## Input
- `data/raw/fashion_boutique_dataset.csv` (2,176 rows, 14 columns)

## Output
- `data/cleaned/fashion_boutique_cleaned.csv`
- `data/cleaned/fashion_boutique_cleaned.parquet`

---

## Step 1: Load & Type Casting

| Column | Raw Type | Target Type | Casting Rule |
|--------|----------|-------------|-------------|
| `product_id` | str | str | No change |
| `category` | str | category | Cast to pandas Categorical |
| `brand` | str | category | Cast to pandas Categorical |
| `season` | str | category | Ordered: Spring, Summer, Fall, Winter |
| `size` | str | category | Ordered: XS, S, M, L, XL, XXL |
| `color` | str | category | Cast to pandas Categorical |
| `original_price` | float64 | float64 | Round to 2 decimal places |
| `markdown_percentage` | float64 | float64 | Round to 1 decimal place |
| `current_price` | float64 | float64 | Round to 2 decimal places |
| `purchase_date` | str | datetime64 | `pd.to_datetime()` |
| `stock_quantity` | int64 | int64 | No change |
| `customer_rating` | float64 | float64 (nullable) | Keep as float, nulls remain null |
| `is_returned` | bool | bool | No change |
| `return_reason` | str | category (nullable) | Cast to Categorical, nulls remain null |

---

## Step 2: Null Handling Rules

| Column | Null Count | Rule | Justification |
|--------|-----------|------|---------------|
| `size` | 491 | If `category == "Accessories"`: fill with `"One Size"`. All other nulls: fill with `"Unknown"`. | Accessories legitimately have no size. Other nulls are data entry gaps — flagging them as "Unknown" preserves the row for non-size analysis. |
| `customer_rating` | 362 | **Do NOT impute.** Leave as `NaN`. Add derived column `has_rating = True/False`. | Imputing ratings introduces bias. Analyses involving ratings should filter to `has_rating == True` and note the sample size. |
| `return_reason` | 1856 | Leave as `NaN`. These are non-returned items — null is correct. | Only returned items (`is_returned == True`) have a return reason. |

---

## Step 3: Validation Rules

Run these checks after cleaning. If any fail, raise an error and halt.

| # | Check | Expected |
|---|-------|----------|
| V1 | Row count matches raw | 2,176 rows |
| V2 | No nulls in: product_id, category, brand, season, color, original_price, markdown_percentage, current_price, purchase_date, stock_quantity, is_returned | 0 nulls |
| V3 | `current_price <= original_price` for all rows | True |
| V4 | `current_price == original_price * (1 - markdown_percentage / 100)` within ±$0.02 | True |
| V5 | All `is_returned == False` rows have null `return_reason` | True |
| V6 | All `is_returned == True` rows have non-null `return_reason` | True |
| V7 | `purchase_date` range is 2024-08-06 to 2025-08-06 | True |
| V8 | `stock_quantity` is non-negative for all rows | True |
| V9 | `customer_rating` between 1.0 and 5.0 where not null | True |
| V10 | All categories are in allowed set: {Accessories, Bottoms, Dresses, Outerwear, Shoes, Tops} | True |

---

## Step 4: Derived Columns

Add these columns to the cleaned dataset:

| Column | Type | Formula | Example |
|--------|------|---------|---------|
| `revenue_lost` | float64 | `original_price - current_price` | 196.01 - 196.01 = 0.00 |
| `is_marked_down` | bool | `markdown_percentage > 0` | False |
| `month` | str | `purchase_date.dt.strftime('%Y-%m')` | "2025-03" |
| `quarter` | str | `'Q' + purchase_date.dt.quarter.astype(str)` | "Q1" |
| `year_quarter` | str | `purchase_date.dt.year.astype(str) + '-' + quarter` | "2025-Q1" |
| `rating_band` | str (nullable) | 1.0–2.0 = "Poor", 2.1–3.0 = "Fair", 3.1–4.0 = "Good", 4.1–5.0 = "Excellent". Null if no rating. | "Good" |
| `price_band` | str | <$50 = "Budget", $50–100 = "Mid-Range", $100–150 = "Premium", >$150 = "Luxury" | "Mid-Range" |
| `has_rating` | bool | `customer_rating.notna()` | True |
| `is_out_of_stock` | bool | `stock_quantity == 0` | False |
| `is_dead_inventory` | bool | `markdown_percentage > 30 AND customer_rating < 2.5` (False if no rating) | True |

---

## Step 5: Output

1. Save cleaned DataFrame to CSV (UTF-8, index=False)
2. Save cleaned DataFrame to Parquet (snappy compression)
3. Print summary: row count, column count, null counts, derived column counts
4. Log any anomalies found during validation to console

---

## Unit Tests Required (test_pipeline.py)

| # | Test | What It Validates |
|---|------|-------------------|
| T1 | `test_row_count_preserved` | Output has same row count as input (2,176) |
| T2 | `test_no_nulls_in_required_columns` | All required columns have zero nulls after cleaning |
| T3 | `test_size_null_handling` | Accessories have "One Size", other nulls have "Unknown" |
| T4 | `test_derived_columns_exist` | All 10 derived columns are present |
| T5 | `test_price_consistency` | `current_price <= original_price` for all rows |
| T6 | `test_rating_band_mapping` | Rating bands map correctly (spot check 5 values) |
| T7 | `test_price_band_mapping` | Price bands map correctly at boundaries ($49.99 = Budget, $50.00 = Mid-Range) |
| T8 | `test_date_parsing` | purchase_date is datetime64 type, no parse failures |
| T9 | `test_dead_inventory_flag` | is_dead_inventory only True when markdown > 30% AND rating < 2.5 |
| T10 | `test_return_reason_consistency` | Returned items have reasons, non-returned items have null |
