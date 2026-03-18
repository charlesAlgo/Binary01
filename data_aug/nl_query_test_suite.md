# NL Query Test Suite — 25 Queries with Ground Truth

Use this file to validate the NL query engine. Each query has an expected answer derived from direct analysis of the raw dataset. The QA agent should run each query through the engine and compare the output against the expected answer.

**Pass criteria:** 80%+ accuracy (20 of 25 correct). An answer is "correct" if the key metric matches within ±1% for percentages and ±$5 for dollar amounts.

---

## Revenue & Sales Queries

### Q1: "What is the total revenue?"
**Expected:** $186,047.12
**Type:** Single number

### Q2: "What is the top-selling category by revenue?"
**Expected:** Outerwear ($48,672.81)
**Type:** Single answer

### Q3: "Rank all categories by revenue from highest to lowest"
**Expected:** Outerwear ($48,672.81) > Shoes ($41,152.78) > Dresses ($31,028.35) > Bottoms ($24,079.39) > Tops ($23,719.91) > Accessories ($17,393.88)
**Type:** Ranked list

### Q4: "Which brand generates the most revenue?"
**Expected:** Zara (313 items, calculate revenue from data)
**Type:** Single answer with context

### Q5: "What is the average transaction value across all products?"
**Expected:** $85.50 (mean of current_price)
**Type:** Single number

---

## Markdown & Pricing Queries

### Q6: "How much revenue did we lose to markdowns?"
**Expected:** $25,460.82
**Type:** Single number

### Q7: "What percentage of items were marked down?"
**Expected:** 40.3% (878 out of 2,176)
**Type:** Percentage

### Q8: "What is the average markdown percentage when a discount is applied?"
**Expected:** 30.1%
**Type:** Single number

### Q9: "Which category loses the most revenue to markdowns?"
**Expected:** Shoes ($6,208.51)
**Type:** Single answer

### Q10: "How many items have both high markdowns and low ratings?"
**Expected:** 118 items (markdown > 30% AND rating < 2.5)
**Type:** Single number with criteria

---

## Returns Queries

### Q11: "What is the overall return rate?"
**Expected:** 14.7% (320 out of 2,176)
**Type:** Percentage

### Q12: "Which brand has the highest return rate?"
**Expected:** Ann Taylor (19.8%)
**Type:** Single answer

### Q13: "Which brand has the lowest return rate?"
**Expected:** Mango (11.3%)
**Type:** Single answer

### Q14: "What are the top return reasons?"
**Expected:** Changed Mind (68), Size Issue (60), Quality Issue (55), Wrong Item (47), Color Mismatch (46), Damaged (44)
**Type:** Ranked list with counts

### Q15: "How many Outerwear items were returned?"
**Expected:** 54 (0.1617 × 334 ≈ 54)
**Type:** Single number

---

## Inventory Queries

### Q16: "How many items are out of stock?"
**Expected:** 43
**Type:** Single number

### Q17: "Which categories have the most out-of-stock items?"
**Expected:** Bottoms (10), Shoes (10), Dresses (8), Accessories (8), Tops (4), Outerwear (3)
**Type:** Ranked list

### Q18: "What is the average stock level across all products?"
**Expected:** 24.9 units
**Type:** Single number

---

## Customer Satisfaction Queries

### Q19: "What is the average customer rating?"
**Expected:** 2.99/5.0 (based on 1,814 rated items)
**Type:** Single number with sample size caveat

### Q20: "Which brand has the highest average rating?"
**Expected:** Uniqlo (3.11)
**Type:** Single answer

### Q21: "Which brand has the lowest average rating?"
**Expected:** Mango (2.78)
**Type:** Single answer

### Q22: "How many products have no customer rating?"
**Expected:** 362 (16.6%)
**Type:** Single number with percentage

---

## Cross-Dimensional Queries

### Q23: "Compare summer vs winter revenue"
**Expected:** Summer: $48,579.81 (575 items) vs Winter: $44,179.23 (522 items)
**Type:** Comparison

### Q24: "What is the return rate for Zara specifically?"
**Expected:** 15.3%
**Type:** Percentage

### Q25: "Show me the most expensive product categories on average"
**Expected:** By original_price mean — Outerwear highest (~$145), Accessories lowest (~$43)
**Type:** Ranked list

---

## Scoring Template

| Query | Expected Key Metric | Actual Output | Match? | Notes |
|-------|-------------------|---------------|--------|-------|
| Q1 | $186,047.12 | | | |
| Q2 | Outerwear | | | |
| Q3 | 6 categories ranked | | | |
| Q4 | (verify from data) | | | |
| Q5 | $85.50 | | | |
| Q6 | $25,460.82 | | | |
| Q7 | 40.3% | | | |
| Q8 | 30.1% | | | |
| Q9 | Shoes | | | |
| Q10 | 118 | | | |
| Q11 | 14.7% | | | |
| Q12 | Ann Taylor | | | |
| Q13 | Mango | | | |
| Q14 | Changed Mind (top) | | | |
| Q15 | ~54 | | | |
| Q16 | 43 | | | |
| Q17 | Bottoms/Shoes (tied) | | | |
| Q18 | 24.9 | | | |
| Q19 | 2.99 | | | |
| Q20 | Uniqlo | | | |
| Q21 | Mango | | | |
| Q22 | 362 | | | |
| Q23 | Summer > Winter | | | |
| Q24 | 15.3% | | | |
| Q25 | Outerwear (highest) | | | |

**Total Correct: __ / 25 | Accuracy: __% | Pass: ≥ 80%**
