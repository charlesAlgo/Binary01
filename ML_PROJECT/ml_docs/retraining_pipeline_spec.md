# Retraining Pipeline Specification

## Overview
The retraining pipeline (`src/retrain.py`) accepts new customer data, retrains the model, evaluates it against performance thresholds, and only saves new artifacts if the model meets quality standards.

---

## Usage
```bash
python src/retrain.py --data path/to/new_data.csv --output models/
```

---

## Pipeline Steps

### Step 1: Load & Validate New Data
```python
required_columns = ["Avg. Session Length", "Time on App", "Time on Website", "Length of Membership", "Yearly Amount Spent"]
```
- Verify all 5 columns exist (feature + target, no identifiers needed)
- Verify no nulls in any column
- Verify all values are numeric
- Verify reasonable ranges (same bounds as API input validation, plus target between $0–$2000)
- Minimum 100 rows required for retraining
- If validation fails: print error, exit with code 1

### Step 2: Load Current Model Metadata
- Read `models/metadata.json` to get current model type and performance
- Log: "Current model: {type}, R² = {r2}, RMSE = {rmse}"

### Step 3: Train New Model
- Use the same model type as the current best model (from metadata)
- Same train/test split ratio (80/20) with `random_state=42`
- Same StandardScaler pipeline
- Same hyperparameter grid if Ridge/Lasso/ElasticNet
- Log all training parameters

### Step 4: Evaluate New Model
Compute on test set: R², RMSE, MAE, MAPE

### Step 5: Performance Gate
```python
THRESHOLDS = {
    "r2": 0.95,
    "rmse": 15.00,
    "mae": 12.00,
    "mape": 3.0
}
```

- If ALL thresholds met: proceed to save
- If ANY threshold fails: print warning, do NOT save, exit with code 2
- Also compare against current model: if new R² < current R² - 0.01, warn about degradation

### Step 6: Save New Artifacts (only if gate passes)
- Save `models/model.pkl` (overwrite)
- Save `models/scaler.pkl` (overwrite)
- Update `models/metadata.json` with new metrics and timestamp
- Back up previous artifacts to `models/archive/{timestamp}/`

### Step 7: Generate Retraining Report
Output to console and save to `reports/retrain_{timestamp}.md`:
```
## Retraining Report — {timestamp}

**Data:** {filename}, {row_count} rows
**Model Type:** {model_type}
**Previous Performance:** R² = {old_r2}, RMSE = ${old_rmse}
**New Performance:** R² = {new_r2}, RMSE = ${new_rmse}
**Status:** DEPLOYED / REJECTED
**Reason:** {if rejected, explain which threshold failed}
```

---

## Exit Codes
| Code | Meaning |
|------|---------|
| 0 | Success — new model deployed |
| 1 | Data validation failed |
| 2 | Performance thresholds not met — old model retained |

---

## Test Cases

| # | Test | Input | Expected |
|---|------|-------|----------|
| RT1 | Retrain on original data | Ecommerce_Customers.csv | Exit 0, R² ≈ 0.984 |
| RT2 | Missing column | CSV without "Time on App" | Exit 1, error message |
| RT3 | Too few rows | CSV with 50 rows | Exit 1, "minimum 100 rows" |
| RT4 | Null values | CSV with nulls | Exit 1, error message |
| RT5 | Degraded model | Randomly shuffled target | Exit 2, "thresholds not met" |
| RT6 | Archive created | Valid retrain | Previous model.pkl exists in archive/ |
