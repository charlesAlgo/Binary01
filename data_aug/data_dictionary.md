# Fashion Boutique Dataset — Data Dictionary

## Source
- **File:** `fashion_boutique_dataset.csv` (also available as `.xlsx`, `.json`, `.db`)
- **Records:** 2,176 product transactions
- **Date Range:** August 6, 2024 – August 6, 2025
- **Domain:** Mid-market fashion retail (8 brands, 6 categories)

---

## Original Columns

| Column | Type | Nullable | Description | Sample Values |
|--------|------|----------|-------------|---------------|
| `product_id` | String | No | Unique product identifier | FB000001, FB000002 |
| `category` | String | No | Product category | Accessories, Bottoms, Dresses, Outerwear, Shoes, Tops |
| `brand` | String | No | Brand name | Zara, Banana Republic, Mango, H&M, Uniqlo, Ann Taylor, Forever21, Gap |
| `season` | String | No | Season collection | Spring, Summer, Fall, Winter |
| `size` | String | **Yes (491)** | Product size. Null for most Accessories (402) + 89 data entry gaps | XS, S, M, L, XL, XXL |
| `color` | String | No | Product color | Black, White, Red, Blue, Green, Pink, Navy, Gray, Purple, Brown, Beige |
| `original_price` | Float | No | Original retail price | Range: $15.14 – $249.98, Mean: $97.20 |
| `markdown_percentage` | Float | No | Discount percentage applied (0 = no discount) | Range: 0 – 59.9%, Mean: 12.1% |
| `current_price` | Float | No | Price after markdown applied | Range: $6.17 – $249.98, Mean: $85.50 |
| `purchase_date` | Date | No | Transaction date | 2024-08-06 to 2025-08-06 |
| `stock_quantity` | Integer | No | Remaining stock at time of transaction | Range: 0 – 50, Mean: 24.9 |
| `customer_rating` | Float | **Yes (362)** | Customer satisfaction rating | Range: 1.0 – 5.0, Mean: 2.99 |
| `is_returned` | Boolean | No | Whether item was returned | True (320 items, 14.7%), False |
| `return_reason` | String | **Yes (1856)** | Reason for return (null when not returned) | Changed Mind, Size Issue, Quality Issue, Wrong Item, Color Mismatch, Damaged |

---

## Recommended Derived Columns (ETL Pipeline)

| Column | Type | Derivation | Purpose |
|--------|------|------------|---------|
| `revenue_lost` | Float | `original_price - current_price` | Quantify markdown impact |
| `is_marked_down` | Boolean | `markdown_percentage > 0` | Easy filtering |
| `month` | String | `purchase_date.dt.to_period('M')` | Monthly aggregation |
| `quarter` | String | `purchase_date.dt.quarter` | Quarterly aggregation |
| `year_month` | String | `purchase_date.strftime('%Y-%m')` | Sortable month label |
| `rating_band` | String | 1.0-2.0="Poor", 2.1-3.0="Fair", 3.1-4.0="Good", 4.1-5.0="Excellent" | Segment by satisfaction |
| `price_band` | String | <$50="Budget", $50-100="Mid", $100-150="Premium", >$150="Luxury" | Price tier analysis |
| `has_rating` | Boolean | `customer_rating.notna()` | Filter rated vs. unrated |
| `size_available` | Boolean | `size.notna()` | Track data completeness |

---

## Data Quality Notes

1. **Date skew:** 75.7% of records (1,647) are dated August 2025. Remaining months average ~42 records. This skew affects monthly trend analysis — agents should note this caveat in reports.
2. **Null sizes:** 402 of 491 null sizes are Accessories (legitimate — accessories often don't have sizes). The remaining 89 across other categories are data entry gaps.
3. **Null ratings:** 362 records (16.6%) have no rating. Strategy options: exclude from rating analysis, impute with category median, or flag as separate segment.
4. **Out of stock:** 43 items have `stock_quantity = 0`. Distribution: Bottoms (10), Shoes (10), Dresses (8), Accessories (8), Tops (4), Outerwear (3).
5. **Dead inventory signal:** 118 items have markdown > 30% AND rating < 2.5 — likely candidates for discontinuation.

---

## Key Metrics Summary

| Metric | Value |
|--------|-------|
| Total Revenue | $186,047.12 |
| Total Revenue Lost to Markdowns | $25,460.82 |
| Overall Return Rate | 14.7% |
| Average Customer Rating | 2.99 / 5.0 |
| Items with Markdown Applied | 878 (40.3%) |
| Average Markdown (when applied) | 30.1% |
| Out of Stock Items | 43 |
| Top Revenue Category | Outerwear ($48,672.81) |
| Highest Return Rate Brand | Ann Taylor (19.8%) |
| Lowest Return Rate Brand | Mango (11.3%) |
