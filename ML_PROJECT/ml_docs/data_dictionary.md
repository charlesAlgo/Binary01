# E-Commerce Customers Dataset — Data Dictionary

## Source
- **File:** `Ecommerce_Customers` (CSV, no extension)
- **Records:** 500 customers
- **Nulls:** 0 (fully clean)
- **Domain:** E-commerce / online retail

---

## Columns

| Column | Type | Role | Nullable | Description | Range |
|--------|------|------|----------|-------------|-------|
| `Email` | String | Identifier — DROP | No | Customer email. 500 unique. | — |
| `Address` | String | Identifier — DROP | No | Multi-line mailing address. 500 unique. | — |
| `Avatar` | String | Identifier — DROP | No | Avatar color name. 138 unique. Not predictive. | — |
| `Avg. Session Length` | Float | Feature | No | Average session duration (minutes) | 29.53 – 36.14, μ=33.05, σ=0.99 |
| `Time on App` | Float | Feature | No | Average daily minutes on mobile app | 8.51 – 15.13, μ=12.05, σ=0.99 |
| `Time on Website` | Float | Feature | No | Average daily minutes on website | 33.91 – 40.01, μ=37.06, σ=1.01 |
| `Length of Membership` | Float | Feature | No | Years as a member | 0.27 – 6.92, μ=3.53, σ=1.00 |
| `Yearly Amount Spent` | Float | **Target** | No | Total yearly spend in USD | $256.67 – $765.52, μ=$499.31, σ=$79.31 |

---

## Feature-Target Correlations

| Feature | Pearson r | Strength | Business Meaning |
|---------|-----------|----------|-----------------|
| Length of Membership | 0.809 | Very Strong | Each year adds ~$61.58 in yearly spending |
| Time on App | 0.499 | Strong | Each extra minute/day on app adds ~$38.71/year |
| Avg. Session Length | 0.355 | Moderate | Longer sessions → higher spending |
| Time on Website | -0.003 | **None** | Website time does NOT predict spending |

---

## Feature-Feature Correlations

All below 0.07. **No multicollinearity.** All features are independent of each other.

---

## Key Statistics

| Metric | Value |
|--------|-------|
| Mean Yearly Spend | $499.31 |
| Median Yearly Spend | $498.89 |
| Std Dev | $79.31 |
| Skewness | 0.035 (symmetric / normal) |
| Kurtosis | 0.464 (slightly heavy-tailed) |
| OLS R² (all 4 features) | 0.984 |
| OLS RMSE | $9.92 |

---

## Spending Segments

| Segment | Range | Count | % |
|---------|-------|-------|---|
| Very Low | < $350 | 14 | 2.8% |
| Low | $350 – $450 | 121 | 24.2% |
| Medium | $450 – $550 | 242 | 48.4% |
| High | $550 – $650 | 107 | 21.4% |
| Very High | > $650 | 16 | 3.2% |

---

## Outliers (IQR Method)

| Feature | Count | Action |
|---------|-------|--------|
| Avg. Session Length | 3 | Keep |
| Time on App | 4 | Keep |
| Time on Website | 2 | Keep |
| Length of Membership | 12 | Keep (new members are legitimate) |
| Yearly Amount Spent | 9 | Keep (high spenders are real) |

**Decision:** No outlier removal. All within reasonable business bounds.

---

## OLS Coefficients (Pre-computed Reference)

| Feature | Coefficient | Interpretation |
|---------|------------|----------------|
| Intercept | -1051.59 | Baseline (not independently meaningful) |
| Avg. Session Length | 25.73 | +$25.73 per additional minute of avg session |
| Time on App | 38.71 | +$38.71 per additional minute/day on app |
| Time on Website | 0.44 | +$0.44 per additional minute/day on website (negligible) |
| Length of Membership | 61.58 | +$61.58 per additional year of membership |
