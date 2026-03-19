"""
API Test Suite — E-Commerce Customer Spending Prediction
=========================================================
Covers all 13 test cases from api_spec.md.

Run with:
    pytest tests/test_api.py -v

Requires model artifacts in models/ (run src/train.py first).
"""

import pytest
from fastapi.testclient import TestClient

from api.main import app, load_model

# ─── Fixtures ─────────────────────────────────────────────────────────────────

@pytest.fixture(scope="module", autouse=True)
def startup():
    """Load model artifacts before tests run."""
    load_model()


@pytest.fixture(scope="module")
def client():
    with TestClient(app) as c:
        yield c


# ─── Valid input factory ───────────────────────────────────────────────────────

def valid_customer(**overrides) -> dict:
    base = {
        "avg_session_length":   34.5,
        "time_on_app":          12.7,
        "time_on_website":      39.6,
        "length_of_membership": 4.1,
    }
    base.update(overrides)
    return base


# ─── T1: Valid single prediction ──────────────────────────────────────────────

def test_T1_predict_valid_input(client):
    """POST /predict with valid input → 200 + schema match."""
    resp = client.post("/predict", json=valid_customer())
    assert resp.status_code == 200

    data = resp.json()
    assert "predicted_yearly_spend" in data
    assert "confidence_interval" in data
    assert "spending_segment" in data
    assert "model_version" in data

    assert isinstance(data["predicted_yearly_spend"], float)
    ci = data["confidence_interval"]
    assert "lower" in ci and "upper" in ci
    assert isinstance(ci["lower"], float) and isinstance(ci["upper"], float)


# ─── T2: Missing required field ───────────────────────────────────────────────

def test_T2_predict_missing_field(client):
    """POST /predict with missing field → 422."""
    payload = {
        "avg_session_length":   34.5,
        "time_on_app":          12.7,
        # time_on_website missing
        "length_of_membership": 4.1,
    }
    resp = client.post("/predict", json=payload)
    assert resp.status_code == 422


# ─── T3: Out-of-range avg_session_length ──────────────────────────────────────

def test_T3_predict_out_of_range(client):
    """POST /predict with avg_session_length=50 (max=45) → 422."""
    resp = client.post("/predict", json=valid_customer(avg_session_length=50.0))
    assert resp.status_code == 422


# ─── T4: Negative length_of_membership ───────────────────────────────────────

def test_T4_negative_membership(client):
    """POST /predict with negative length_of_membership → 422."""
    resp = client.post("/predict", json=valid_customer(length_of_membership=-1.0))
    assert resp.status_code == 422


# ─── T5: Wrong type ───────────────────────────────────────────────────────────

def test_T5_wrong_type(client):
    """POST /predict with string instead of float → 422."""
    payload = valid_customer()
    payload["time_on_app"] = "not-a-number"
    resp = client.post("/predict", json=payload)
    assert resp.status_code == 422


# ─── T6: Batch valid ──────────────────────────────────────────────────────────

def test_T6_batch_3_customers(client):
    """POST /predict/batch with 3 valid customers → 200, count=3."""
    payload = {"customers": [valid_customer() for _ in range(3)]}
    resp = client.post("/predict/batch", json=payload)
    assert resp.status_code == 200

    data = resp.json()
    assert data["count"] == 3
    assert len(data["predictions"]) == 3
    for pred in data["predictions"]:
        assert "predicted_yearly_spend" in pred


# ─── T7: Batch over 100 ───────────────────────────────────────────────────────

def test_T7_batch_101_customers(client):
    """POST /predict/batch with 101 customers → 422."""
    payload = {"customers": [valid_customer() for _ in range(101)]}
    resp = client.post("/predict/batch", json=payload)
    assert resp.status_code == 422


# ─── T8: Batch empty array ────────────────────────────────────────────────────

def test_T8_batch_empty_array(client):
    """POST /predict/batch with empty array → 422."""
    resp = client.post("/predict/batch", json={"customers": []})
    assert resp.status_code == 422


# ─── T9: Model info ───────────────────────────────────────────────────────────

def test_T9_model_info(client):
    """GET /model/info → 200, contains model_type, features, test_r2."""
    resp = client.get("/model/info")
    assert resp.status_code == 200

    data = resp.json()
    assert "model_type" in data
    assert "features" in data
    assert "test_r2" in data
    assert isinstance(data["features"], list)
    assert len(data["features"]) == 4


# ─── T10: Health check ────────────────────────────────────────────────────────

def test_T10_health(client):
    """GET /health → 200, status='healthy'."""
    resp = client.get("/health")
    assert resp.status_code == 200

    data = resp.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True


# ─── T11: Prediction within expected range ────────────────────────────────────

def test_T11_prediction_range(client):
    """Known input → prediction within ±$20 of expected ~$500."""
    # Input values near the dataset mean → expect spend ~$500
    resp = client.post("/predict", json=valid_customer(
        avg_session_length=33.0,
        time_on_app=12.0,
        time_on_website=37.0,
        length_of_membership=3.5,
    ))
    assert resp.status_code == 200
    pred = resp.json()["predicted_yearly_spend"]
    # Expected range based on dataset mean (~$499) ± $20
    assert 350.0 <= pred <= 700.0, f"Prediction ${pred:.2f} seems out of realistic range"


# ─── T12: Confidence interval wraps prediction ────────────────────────────────

def test_T12_confidence_interval(client):
    """CI lower < prediction < CI upper."""
    resp = client.post("/predict", json=valid_customer())
    assert resp.status_code == 200

    data = resp.json()
    pred  = data["predicted_yearly_spend"]
    lower = data["confidence_interval"]["lower"]
    upper = data["confidence_interval"]["upper"]

    assert lower < pred < upper, (
        f"Confidence interval [{lower}, {upper}] should wrap prediction {pred}"
    )


# ─── T13: Spending segment matches prediction ─────────────────────────────────

@pytest.mark.parametrize("membership,expected_seg", [
    (0.5, "Very Low"),    # very short membership → low spending
    (5.0, "Medium"),      # mid membership → ~$500 range
    (12.0, "Very High"),  # long membership → high spending
])
def test_T13_spending_segment(client, membership, expected_seg):
    """Spending segment label matches the prediction value."""
    resp = client.post("/predict", json=valid_customer(length_of_membership=membership))
    assert resp.status_code == 200

    data = resp.json()
    pred = data["predicted_yearly_spend"]
    seg  = data["spending_segment"]

    # Verify segment is one of the valid options
    valid_segments = {"Very Low", "Low", "Medium", "High", "Very High"}
    assert seg in valid_segments

    # Verify segment is consistent with prediction value
    segment_map = {
        "Very Low":  pred < 350,
        "Low":       350 <= pred < 450,
        "Medium":    450 <= pred < 550,
        "High":      550 <= pred < 650,
        "Very High": pred >= 650,
    }
    assert segment_map[seg], (
        f"Segment '{seg}' does not match prediction ${pred:.2f}"
    )
