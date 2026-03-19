"""
FastAPI — E-Commerce Customer Spending Prediction
==================================================
Serves the trained model via 4 REST endpoints:
  POST /predict          — single customer prediction
  POST /predict/batch    — up to 100 customers at once
  GET  /model/info       — model metadata
  GET  /health           — health check

Usage:
    uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Optional

import joblib
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

# ─── Paths ─────────────────────────────────────────────────────────────────────
ROOT       = Path(__file__).resolve().parent.parent
MODELS_DIR = ROOT / "models"

# ─── Global model state ────────────────────────────────────────────────────────
model    = None
scaler   = None
metadata: dict = {}

# ─── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="DataLife — E-Commerce Spending Predictor",
    description="Predicts yearly customer spending from behavioural features.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Startup ───────────────────────────────────────────────────────────────────

@app.on_event("startup")
def load_model() -> None:
    global model, scaler, metadata
    model    = joblib.load(MODELS_DIR / "model.pkl")
    scaler   = joblib.load(MODELS_DIR / "scaler.pkl")
    with open(MODELS_DIR / "metadata.json", encoding="utf-8") as f:
        metadata = json.load(f)


# ─── Schemas ───────────────────────────────────────────────────────────────────

class PredictRequest(BaseModel):
    avg_session_length:    float = Field(..., ge=25.0, le=45.0,
                                         description="Average session duration in minutes")
    time_on_app:           float = Field(..., ge=5.0,  le=20.0,
                                         description="Average daily minutes on mobile app")
    time_on_website:       float = Field(..., ge=25.0, le=50.0,
                                         description="Average daily minutes on website")
    length_of_membership:  float = Field(..., ge=0.0,  le=15.0,
                                         description="Years as a member")


class PredictResponse(BaseModel):
    predicted_yearly_spend: float
    confidence_interval:    dict          # {"lower": float, "upper": float}
    spending_segment:       str           # Very Low | Low | Medium | High | Very High
    model_version:          str


class BatchPredictRequest(BaseModel):
    customers: list[PredictRequest]

    @field_validator("customers")
    @classmethod
    def check_size(cls, v: list) -> list:
        if len(v) == 0:
            raise ValueError("customers list must not be empty")
        if len(v) > 100:
            raise ValueError("customers list must contain at most 100 items")
        return v


class BatchPredictResponse(BaseModel):
    predictions: list[PredictResponse]
    count:       int


# ─── Helpers ───────────────────────────────────────────────────────────────────

def _segment(prediction: float) -> str:
    if prediction < 350:
        return "Very Low"
    elif prediction < 450:
        return "Low"
    elif prediction < 550:
        return "Medium"
    elif prediction < 650:
        return "High"
    else:
        return "Very High"


def _predict_one(req: PredictRequest) -> PredictResponse:
    """Run inference for a single customer and build full response."""
    if model is None or scaler is None:
        raise HTTPException(
            status_code=500,
            detail={"error": "Internal server error", "detail": "Model not loaded"},
        )

    X_raw = np.array([[
        req.avg_session_length,
        req.time_on_app,
        req.time_on_website,
        req.length_of_membership,
    ]])

    try:
        X_scaled   = scaler.transform(X_raw)
        prediction = float(model.predict(X_scaled)[0])
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={"error": "Internal server error",
                    "detail": "Model failed to generate prediction"},
        ) from exc

    training_rmse = metadata.get("test_rmse", 10.0)
    lower = round(prediction - 1.96 * training_rmse, 2)
    upper = round(prediction + 1.96 * training_rmse, 2)
    pred  = round(prediction, 2)

    return PredictResponse(
        predicted_yearly_spend=pred,
        confidence_interval={"lower": lower, "upper": upper},
        spending_segment=_segment(prediction),
        model_version=metadata.get("model_version", "1.0.0"),
    )


# ─── Endpoints ─────────────────────────────────────────────────────────────────

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest) -> PredictResponse:
    """Predict yearly spending for a single customer."""
    return _predict_one(req)


@app.post("/predict/batch", response_model=BatchPredictResponse)
def predict_batch(req: BatchPredictRequest) -> BatchPredictResponse:
    """Predict yearly spending for up to 100 customers at once."""
    predictions = [_predict_one(c) for c in req.customers]
    return BatchPredictResponse(predictions=predictions, count=len(predictions))


@app.get("/model/info")
def model_info() -> dict:
    """Return model metadata and feature coefficients."""
    if not metadata:
        raise HTTPException(status_code=500, detail="Model metadata not loaded")

    # Extract coefficients if model exposes them
    coefficients: dict = {}
    if hasattr(model, "coef_"):
        feature_keys = [
            "avg_session_length", "time_on_app",
            "time_on_website", "length_of_membership",
        ]
        coefficients = dict(zip(feature_keys, [round(float(c), 4) for c in model.coef_]))

    return {
        "model_type":       metadata.get("model_type", "Unknown"),
        "model_version":    metadata.get("model_version", "1.0.0"),
        "features":         metadata.get("feature_names", []),
        "training_date":    metadata.get("train_date", ""),
        "training_samples": metadata.get("train_size", 0),
        "test_r2":          metadata.get("test_r2", 0),
        "test_rmse":        metadata.get("test_rmse", 0),
        "coefficients":     coefficients,
    }


@app.get("/health")
def health() -> dict:
    """Health check endpoint."""
    return {
        "status":       "healthy",
        "model_loaded": model is not None,
    }
