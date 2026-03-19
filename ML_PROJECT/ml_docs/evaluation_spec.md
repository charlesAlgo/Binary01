# Evaluation & Residual Diagnostics Specification

## Overview
This document specifies what the evaluation report must contain. The ML Agent builds `src/evaluate.py` and the Docs Agent uses the output to write `reports/evaluation_report.md`.

---

## 1. Model Comparison Table

The report MUST include a table comparing all 4 models:

| Model | Best Params | R² | RMSE | MAE | MAPE | Notes |
|-------|------------|-----|------|-----|------|-------|
| OLS | — | | | | | Baseline, no regularization |
| Ridge | alpha=? | | | | | L2 regularization |
| Lasso | alpha=? | | | | | L1 — check if it zeros out Time on Website |
| ElasticNet | alpha=?, l1_ratio=? | | | | | Combined regularization |

**Highlight the winning model in bold.**

---

## 2. Feature Importance Analysis

### 2a. Standardized Coefficients
Train the best model on StandardScaler-transformed features. Report coefficients:

| Feature | Standardized Coefficient | Rank |
|---------|------------------------|------|
| Length of Membership | ~64.0 | 1 |
| Time on App | ~38.0 | 2 |
| Avg. Session Length | ~25.5 | 3 |
| Time on Website | ~0.4 | 4 |

### 2b. Raw Coefficients with Business Interpretation
Train OLS on unscaled features. Report:

| Feature | Coefficient | Meaning |
|---------|------------|---------|
| Avg. Session Length | ~25.73 | Each additional minute of average session → +$25.73/year |
| Time on App | ~38.71 | Each additional minute/day on app → +$38.71/year |
| Time on Website | ~0.44 | Each additional minute/day on website → +$0.44/year (negligible) |
| Length of Membership | ~61.58 | Each additional year as member → +$61.58/year |

### 2c. Permutation Importance
Run `sklearn.inspection.permutation_importance` on the test set (n_repeats=30, random_state=42). Report mean importance ± std for each feature.

### 2d. Feature Importance Bar Chart
Horizontal bar chart, sorted by absolute importance (largest at top). Use DataLife accent blue. Save to `reports/figures/feature_importance.png`.

---

## 3. Residual Diagnostics (5 Required Plots)

All plots must be saved to `reports/figures/` as PNG files.

### Plot 1: Residuals vs. Predicted Values
- **X-axis:** Predicted values (ŷ)
- **Y-axis:** Residuals (y - ŷ)
- **Add:** Horizontal line at y=0 (red, dashed)
- **Check for:** Random scatter with no patterns. Funnel shape = heteroscedasticity. Curve = non-linearity.
- **File:** `residuals_vs_predicted.png`

### Plot 2: Q-Q Plot
- **Use:** `scipy.stats.probplot(residuals, dist="norm", plot=plt)`
- **Check for:** Points following the diagonal line. Heavy tails = outliers. S-curve = skewness.
- **File:** `qq_plot.png`

### Plot 3: Histogram of Residuals
- **Bins:** 30
- **Overlay:** Normal distribution curve (fitted to residual mean & std)
- **Check for:** Approximate bell shape. Skewness or multimodality indicates problems.
- **File:** `residual_histogram.png`

### Plot 4: Residuals vs. Each Feature (2x2 subplot grid)
- **4 subplots:** Residuals vs. each of the 4 features
- **Add:** Horizontal line at y=0
- **Check for:** Random scatter per feature. Patterns suggest non-linear relationship.
- **File:** `residuals_vs_features.png`

### Plot 5: Scale-Location Plot
- **X-axis:** Predicted values (ŷ)
- **Y-axis:** √|Standardized Residuals|
- **Add:** LOWESS smoothing line
- **Check for:** Flat line = good (homoscedasticity). Rising line = heteroscedasticity.
- **File:** `scale_location.png`

---

## 4. Prediction Error Analysis

### 4a. Worst Predictions
List the 10 customers with the largest absolute prediction error:

| Customer Index | Actual | Predicted | Error | % Error |
|---------------|--------|-----------|-------|---------|
| ... | ... | ... | ... | ... |

### 4b. Error Distribution by Spending Segment
| Segment | Count | Avg Error | Max Error |
|---------|-------|-----------|-----------|
| Very Low (<$350) | | | |
| Low ($350-450) | | | |
| Medium ($450-550) | | | |
| High ($550-650) | | | |
| Very High (>$650) | | | |

Check: Is the model worse for extreme spenders (very low or very high)?

---

## 5. Lasso Feature Selection Check

If Lasso is one of the trained models, explicitly report:
- Which features have non-zero coefficients?
- Did Lasso zero out "Time on Website"? (Expected: yes, or coefficient near zero)
- This confirms the pre-analysis finding that website time is not predictive.

---

## 6. Cross-Validation Stability

Report 5-fold cross-validation scores for the best model:

| Fold | R² |
|------|----|
| 1 | |
| 2 | |
| 3 | |
| 4 | |
| 5 | |
| **Mean ± Std** | |

The std should be < 0.02. Higher variance suggests overfitting or data sensitivity.

---

## 7. Business Insights Summary

The evaluation report must end with a "Business Insights" section that translates the model findings into plain language. Include at minimum:

1. **App vs. Website:** "The mobile app drives $38.71 in yearly spending per daily minute, while the website contributes only $0.44. NovaBuy should prioritize mobile app development over website improvements."

2. **Membership Value:** "Each year of membership is worth $61.58 in annual spending. A customer retention program that extends average membership by 1 year would increase revenue by $61.58 per customer, or $30,790 across the current 500-customer base."

3. **Prediction Confidence:** "The model predicts within $10 of actual spending for the average customer (RMSE ≈ $9.92), making it reliable for marketing budget allocation and customer segmentation."

4. **Actionable Segments:** "The 14 'Very Low' spenders (<$350) have an average membership of only 1.46 years. Targeted retention offers for these customers could prevent churn before they reach their spending potential."
