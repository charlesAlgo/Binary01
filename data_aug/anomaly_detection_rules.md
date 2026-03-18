# Anomaly Detection Rules — Specification

## Overview
The anomaly detector runs against the cleaned dataset and flags items that meet specific threshold conditions. Each rule produces a structured alert with: rule ID, severity, description, affected items, and recommended action.

---

## Detection Rules

### RULE 1: High Return Rate by Brand
- **Condition:** Brand return rate > 1.3x the overall return rate (14.7%)
- **Threshold:** Return rate > 19.1%
- **Currently Triggered By:** Ann Taylor (19.8%)
- **Severity:** HIGH
- **Alert Template:** "⚠️ {brand} return rate is {rate}%, which is {multiplier}x the store average of 14.7%. Top return reasons: {reasons}. Consider reviewing product quality and sizing."

### RULE 2: High Return Rate by Category
- **Condition:** Category return rate > 1.2x the overall return rate
- **Threshold:** Return rate > 17.6%
- **Currently Triggered By:** None (Outerwear is highest at 16.2%, just under threshold)
- **Severity:** MEDIUM
- **Alert Template:** "📊 {category} return rate is {rate}%, approaching the warning threshold. Monitor for the next reporting period."

### RULE 3: Low Customer Rating by Brand
- **Condition:** Brand average rating < 2.8 (below "Fair" midpoint)
- **Currently Triggered By:** Mango (2.78)
- **Severity:** MEDIUM
- **Alert Template:** "⭐ {brand} average rating is {rating}/5.0, below the 2.8 threshold. Lowest-rated categories: {categories}. {count} rated products sampled."

### RULE 4: Dead Inventory (High Markdown + Low Rating)
- **Condition:** markdown_percentage > 30% AND customer_rating < 2.5
- **Count:** 118 items currently flagged
- **Severity:** HIGH
- **Alert Template:** "🔴 {count} items identified as potential dead inventory (markdown > 30% + rating < 2.5). Top categories: {categories}. Estimated revenue tied up: ${revenue}. Consider discontinuing or liquidating."

### RULE 5: Overstock with High Markdown
- **Condition:** stock_quantity > 35 AND markdown_percentage > 25%
- **Severity:** MEDIUM
- **Alert Template:** "📦 {count} items have high stock (>{threshold}) despite heavy discounting (>{markdown_threshold}%). These items may need aggressive clearance or removal from inventory."

### RULE 6: Out of Stock Items
- **Condition:** stock_quantity == 0
- **Count:** 43 items
- **Severity:** LOW (informational)
- **Alert Template:** "🔄 {count} items are currently out of stock. By category: {breakdown}. Review reorder priority for top-performing products."

### RULE 7: Revenue Drop by Month
- **Condition:** Monthly revenue drops > 20% compared to previous month
- **Note:** Due to the date skew (75.7% of records in August 2025), this rule should ONLY be applied to months with > 30 records. Flag months with < 30 records as "insufficient data."
- **Severity:** HIGH (when triggered on valid data)
- **Alert Template:** "📉 Revenue in {month} dropped {pct}% vs. {prev_month} ({current_rev} vs. {prev_rev}). Note: months with fewer than 30 transactions are excluded from this analysis."

### RULE 8: Markdown Concentration
- **Condition:** A single category accounts for > 30% of total markdown losses
- **Threshold:** Category markdown loss > $7,638.25 (30% of $25,460.82)
- **Currently Triggered By:** None (Shoes is highest at $6,208.51 = 24.4%)
- **Severity:** LOW
- **Alert Template:** "💰 {category} accounts for {pct}% of all markdown losses (${amount}). Review pricing strategy for this category."

### RULE 9: Size-Related Returns Concentration
- **Condition:** "Size Issue" returns for a category exceed 25% of that category's total returns
- **Severity:** MEDIUM
- **Alert Template:** "📏 {pct}% of returns in {category} are due to sizing issues ({count} items). Consider adding detailed size guides or reviewing fit consistency across brands."

### RULE 10: Rating vs Price Anomaly
- **Condition:** Products in "Luxury" price band (>$150) with rating < 2.0
- **Severity:** HIGH
- **Alert Template:** "🏷️ {count} luxury-priced items (>${threshold}) have ratings below 2.0. These represent a brand perception risk. Products: {products}."

---

## Output Format

The anomaly detector should produce a JSON array:

```json
[
  {
    "rule_id": "RULE_1",
    "severity": "HIGH",
    "title": "High Return Rate: Ann Taylor",
    "description": "Ann Taylor return rate is 19.8%, which is 1.35x the store average of 14.7%.",
    "affected_count": 51,
    "data": {
      "brand": "Ann Taylor",
      "return_rate": 19.8,
      "store_average": 14.7,
      "top_reasons": ["Changed Mind", "Size Issue"]
    },
    "recommendation": "Review Ann Taylor product quality, sizing consistency, and consider requesting better product descriptions from the supplier."
  }
]
```

And a human-readable summary in Markdown for the insight report.

---

## Testing

Validate each rule against the current dataset. Expected results:

| Rule | Expected Trigger | Items |
|------|-----------------|-------|
| RULE 1 | Ann Taylor | 1 brand |
| RULE 2 | None (monitor Outerwear) | 0 |
| RULE 3 | Mango | 1 brand |
| RULE 4 | Yes | 118 items |
| RULE 5 | Check at runtime | TBD |
| RULE 6 | Yes | 43 items |
| RULE 7 | Exclude low-sample months | TBD |
| RULE 8 | None | 0 |
| RULE 9 | Check at runtime | TBD |
| RULE 10 | Check at runtime | TBD |
