# FastAPI Application Specification

## Overview
The Backend Agent builds a REST API that serves the trained model for real-time predictions. The API loads the model and scaler from `models/` at startup and exposes 4 endpoints.

---

## Tech Stack
- **Framework:** FastAPI
- **Validation:** Pydantic v2
- **Model Loading:** joblib
- **Server:** Uvicorn
- **Containerization:** Docker (optional Dockerfile provided)

---

## Endpoints

### 1. POST /predict

**Purpose:** Predict yearly spending for a single customer.

**Request Schema (Pydantic):**
```python
class PredictRequest(BaseModel):
    avg_session_length: float = Field(..., ge=25.0, le=45.0, description="Average session duration in minutes")
    time_on_app: float = Field(..., ge=5.0, le=20.0, description="Average daily minutes on mobile app")
    time_on_website: float = Field(..., ge=25.0, le=50.0, description="Average daily minutes on website")
    length_of_membership: float = Field(..., ge=0.0, le=15.0, description="Years as a member")
```

**Response Schema:**
```python
class PredictResponse(BaseModel):
    predicted_yearly_spend: float       # Rounded to 2 decimals
    confidence_interval: dict           # {"lower": float, "upper": float}
    spending_segment: str               # "Very Low" | "Low" | "Medium" | "High" | "Very High"
    model_version: str                  # "1.0.0"
```

**Confidence Interval Calculation:**
Use the training RMSE as a proxy for prediction uncertainty:
```python
lower = prediction - 1.96 * training_rmse
upper = prediction + 1.96 * training_rmse
```

**Spending Segment Logic:**
```python
if prediction < 350: segment = "Very Low"
elif prediction < 450: segment = "Low"
elif prediction < 550: segment = "Medium"
elif prediction < 650: segment = "High"
else: segment = "Very High"
```

---

### 2. POST /predict/batch

**Purpose:** Predict for multiple customers at once.

**Request Schema:**
```python
class BatchPredictRequest(BaseModel):
    customers: list[PredictRequest]     # Max 100 items
```

**Response Schema:**
```python
class BatchPredictResponse(BaseModel):
    predictions: list[PredictResponse]
    count: int
```

**Validation:** Reject if `len(customers) > 100` with 422 error.

---

### 3. GET /model/info

**Purpose:** Return model metadata.

**Response:**
```json
{
    "model_type": "LinearRegression",
    "model_version": "1.0.0",
    "features": ["avg_session_length", "time_on_app", "time_on_website", "length_of_membership"],
    "training_date": "2026-03-18",
    "training_samples": 400,
    "test_r2": 0.984,
    "test_rmse": 9.92,
    "coefficients": {
        "avg_session_length": 25.73,
        "time_on_app": 38.71,
        "time_on_website": 0.44,
        "length_of_membership": 61.58
    }
}
```

---

### 4. GET /health

**Purpose:** Health check.

**Response:**
```json
{
    "status": "healthy",
    "model_loaded": true
}
```

---

## Error Responses

| Status | When | Response Body |
|--------|------|--------------|
| 422 | Validation error (missing field, out of range, wrong type) | Pydantic default error detail |
| 500 | Model not loaded or prediction failure | `{"error": "Internal server error", "detail": "Model failed to generate prediction"}` |

---

## CORS Configuration

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Startup Logic

```python
@app.on_event("startup")
def load_model():
    global model, scaler, metadata
    model = joblib.load("models/model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    metadata = json.load(open("models/metadata.json"))
```

Model must be loaded once at startup, not per-request.

---

## API Test Cases

The QA Agent must verify these:

| # | Test | Expected |
|---|------|----------|
| T1 | POST /predict with valid input | 200, response matches schema |
| T2 | POST /predict with missing field | 422 |
| T3 | POST /predict with avg_session_length = 50 (out of range) | 422 |
| T4 | POST /predict with negative length_of_membership | 422 |
| T5 | POST /predict with string instead of float | 422 |
| T6 | POST /predict/batch with 3 valid customers | 200, count = 3 |
| T7 | POST /predict/batch with 101 customers | 422 |
| T8 | POST /predict/batch with empty array | 422 |
| T9 | GET /model/info | 200, contains model_type, features, test_r2 |
| T10 | GET /health | 200, status = "healthy" |
| T11 | Prediction for known input matches expected range | prediction within ±$20 of expected |
| T12 | Confidence interval wraps prediction | lower < prediction < upper |
| T13 | Spending segment matches prediction value | e.g., $500 → "Medium" |

---

## Dockerfile

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Example curl Commands (for API docs)

**Single prediction:**
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"avg_session_length": 34.5, "time_on_app": 12.7, "time_on_website": 39.6, "length_of_membership": 4.1}'
```

**Batch prediction:**
```bash
curl -X POST http://localhost:8000/predict/batch \
  -H "Content-Type: application/json" \
  -d '{"customers": [{"avg_session_length": 33.0, "time_on_app": 12.0, "time_on_website": 37.0, "length_of_membership": 3.5}, {"avg_session_length": 34.5, "time_on_app": 13.5, "time_on_website": 38.0, "length_of_membership": 5.0}]}'
```

**Model info:**
```bash
curl http://localhost:8000/model/info
```

**Health check:**
```bash
curl http://localhost:8000/health
```
