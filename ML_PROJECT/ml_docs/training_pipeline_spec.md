# Training Pipeline Specification

## Overview
This document specifies the exact training pipeline for `src/train.py`. The pipeline trains 4 regression models, tunes hyperparameters, evaluates all models, and saves the best one.

---

## Step-by-Step Pipeline

### Step 1: Load Data
```python
df = pd.read_csv("data/raw/Ecommerce_Customers")
assert df.shape == (500, 8), "Schema mismatch"
assert df.isnull().sum().sum() == 0, "Unexpected nulls"
```

### Step 2: Feature Selection
```python
FEATURE_COLS = ["Avg. Session Length", "Time on App", "Time on Website", "Length of Membership"]
TARGET_COL = "Yearly Amount Spent"

X = df[FEATURE_COLS]
y = df[TARGET_COL]
```
Drop: Email, Address, Avatar (identifiers, not features).

### Step 3: Train/Test Split
```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```
- Train: 400 rows
- Test: 100 rows
- `random_state=42` for reproducibility (mandatory — all agents must use this seed)

### Step 4: Feature Scaling
```python
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```
- Fit ONLY on training data
- Transform both train and test
- Save scaler to `models/scaler.pkl`

### Step 5: Train 4 Models

| Model | Import | Hyperparameters |
|-------|--------|----------------|
| Linear Regression | `LinearRegression()` | None |
| Ridge | `Ridge()` | alpha via GridSearchCV |
| Lasso | `Lasso()` | alpha via GridSearchCV |
| ElasticNet | `ElasticNet()` | alpha + l1_ratio via GridSearchCV |

### Step 6: Hyperparameter Tuning

**Ridge:**
```python
GridSearchCV(Ridge(), {"alpha": [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]}, cv=5, scoring="r2")
```

**Lasso:**
```python
GridSearchCV(Lasso(), {"alpha": [0.001, 0.01, 0.1, 1.0, 10.0, 100.0]}, cv=5, scoring="r2")
```

**ElasticNet:**
```python
GridSearchCV(ElasticNet(), {
    "alpha": [0.001, 0.01, 0.1, 1.0],
    "l1_ratio": [0.1, 0.3, 0.5, 0.7, 0.9]
}, cv=5, scoring="r2")
```

- All use 5-fold cross-validation
- Scoring metric: R²
- Log best parameters for each model

### Step 7: Evaluate All Models on Test Set

For each model, compute on the test set:

| Metric | Formula |
|--------|---------|
| R² | `r2_score(y_test, y_pred)` |
| RMSE | `np.sqrt(mean_squared_error(y_test, y_pred))` |
| MAE | `mean_absolute_error(y_test, y_pred)` |
| MAPE | `np.mean(np.abs((y_test - y_pred) / y_test)) * 100` |

Store results in a DataFrame:

```python
results = pd.DataFrame({
    "Model": ["OLS", "Ridge", "Lasso", "ElasticNet"],
    "R2": [...],
    "RMSE": [...],
    "MAE": [...],
    "MAPE": [...]
})
```

### Step 8: Select Best Model
- Primary criterion: highest R² on test set
- Tiebreaker: lowest RMSE
- If all models perform within 0.001 R² of each other, select OLS for simplicity and interpretability

### Step 9: Save Artifacts
```python
joblib.dump(best_model, "models/model.pkl")
joblib.dump(scaler, "models/scaler.pkl")
```

Also save a metadata JSON:
```python
{
    "model_type": "LinearRegression",  # or Ridge/Lasso/ElasticNet
    "best_params": {},  # hyperparameters if applicable
    "train_date": "2026-03-18",
    "train_size": 400,
    "test_size": 100,
    "test_r2": 0.984,
    "test_rmse": 9.92,
    "test_mae": ...,
    "test_mape": ...,
    "feature_names": ["avg_session_length", "time_on_app", "time_on_website", "length_of_membership"],
    "model_version": "1.0.0"
}
```

---

## Performance Thresholds

| Metric | Must Meet | Expected |
|--------|-----------|----------|
| R² | > 0.95 | ~0.984 |
| RMSE | < $15.00 | ~$9.92 |
| MAE | < $12.00 | ~$8.00 |
| MAPE | < 3% | ~1.8% |

If the best model fails any threshold, halt and report. Do not deploy a substandard model.

---

## Reproducibility Requirements

- `random_state=42` on train_test_split
- `random_state=42` on all models that accept it (Ridge, Lasso, ElasticNet)
- Fixed `cv=5` for GridSearchCV
- All random seeds logged in metadata
- Running `train.py` twice must produce identical model artifacts
