"""
backend/app.py
Crop Recommendation API — cleaned up production version.

Key fixes vs. the original:
  - No hardcoded API keys / secrets (Config pulls from env, fails fast if missing)
  - crop_info.json is keyed by crop name with real per-crop stats derived from
    the training dataset (the old soil_health_data.json only had a
    "soil_types" key, so every single recommendation silently fell back to
    fake default values — this was a functional bug, not just a style issue)
  - Input validation (types, required fields, sane ranges) before touching the model
  - Weather responses cached in-memory for WEATHER_CACHE_TTL_SECONDS to cut
    latency and stay under the OpenWeatherMap free-tier rate limit
  - Basic rate limiting on the API as a whole
  - Structured logging instead of print()
  - Model/scaler/labels loaded once at import time behind a small guard,
    with a clear 503 (not 500) when the model isn't ready
"""
import logging
import os
import pickle
import time
from datetime import datetime, timezone

import numpy as np
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from config import Config
from utils.crop_repository import CropRepository
from utils.validation import ValidationError, validate_predict_payload, validate_soil_payload

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger("crop-api")

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False

CORS(app, origins=Config.CORS_ORIGINS)

limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=[Config.RATELIMIT_DEFAULT],
    storage_uri=Config.RATELIMIT_STORAGE_URI,
)

# ---------------------------------------------------------------------------
# Model loading (once, at startup)
# ---------------------------------------------------------------------------
model = None
scaler = None
crop_labels: list[str] = []
crop_repo: CropRepository | None = None


def load_model() -> bool:
    global model, scaler, crop_labels, crop_repo
    try:
        required = [Config.MODEL_PATH, Config.SCALER_PATH, Config.LABELS_PATH]
        if not all(os.path.exists(p) for p in required):
            logger.error("Model artifacts missing. Run `python train_model.py` first.")
            return False

        with open(Config.MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        with open(Config.SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)
        with open(Config.LABELS_PATH, "rb") as f:
            crop_labels = pickle.load(f)

        crop_repo = CropRepository(Config.CROP_INFO_PATH)

        logger.info("Model loaded: %d crop classes", len(crop_labels))
        return True
    except Exception:
        logger.exception("Failed to load model artifacts")
        return False


MODEL_READY = load_model()

# ---------------------------------------------------------------------------
# Tiny in-memory TTL cache for weather (avoids hammering the upstream API)
# ---------------------------------------------------------------------------
_weather_cache: dict[str, tuple[float, dict]] = {}


def cache_get(city: str):
    entry = _weather_cache.get(city.lower())
    if not entry:
        return None
    expires_at, payload = entry
    if time.time() > expires_at:
        _weather_cache.pop(city.lower(), None)
        return None
    return payload


def cache_set(city: str, payload: dict):
    _weather_cache[city.lower()] = (time.time() + Config.WEATHER_CACHE_TTL_SECONDS, payload)


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------
@app.errorhandler(ValidationError)
def handle_validation_error(err: ValidationError):
    return jsonify({"success": False, "error": str(err)}), 400


@app.errorhandler(404)
def handle_not_found(_err):
    return jsonify({"success": False, "error": "Not found"}), 404


@app.errorhandler(429)
def handle_rate_limit(_err):
    return jsonify({"success": False, "error": "Too many requests, slow down."}), 429


@app.errorhandler(Exception)
def handle_unexpected(err):
    logger.exception("Unhandled error")
    return jsonify({"success": False, "error": "Internal server error"}), 500


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy" if MODEL_READY else "degraded",
        "model_loaded": model is not None,
        "available_crops": len(crop_labels),
        "crops": crop_labels,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }), (200 if MODEL_READY else 503)


@app.route("/api/crops", methods=["GET"])
def get_crops():
    return jsonify({"crops": crop_labels, "count": len(crop_labels)})


@app.route("/api/crop-info/<crop_name>", methods=["GET"])
def get_crop_info(crop_name):
    info = crop_repo.lookup(crop_name)
    if info:
        return jsonify(info)
    return jsonify(crop_repo.generic(crop_name)), 404


@app.route("/api/predict", methods=["POST"])
@limiter.limit("20 per minute")
def predict():
    if not MODEL_READY:
        return jsonify({"success": False, "error": "Model not loaded"}), 503

    payload = request.get_json(silent=True) or {}
    features = validate_predict_payload(payload, Config.FEATURE_BOUNDS)

    features_array = np.array([features]).reshape(1, -1)
    features_scaled = scaler.transform(features_array)

    probabilities = model.predict_proba(features_scaled)[0]
    top_indices = np.argsort(probabilities)[-5:][::-1]

    recommendations = []
    for idx in top_indices:
        crop_name = crop_labels[idx]
        info = crop_repo.lookup(crop_name) or crop_repo.generic(crop_name)
        recommendations.append({
            "crop": crop_name,
            "confidence": round(float(probabilities[idx]) * 100, 2),
            **{k: v for k, v in info.items() if k != "name"},
        })

    return jsonify({
        "success": True,
        "prediction": recommendations[0]["crop"],
        "confidence": recommendations[0]["confidence"],
        "recommendations": recommendations[:3],
        "all_recommendations": recommendations,
    })


@app.route("/api/soil-health", methods=["POST"])
def analyze_soil():
    payload = request.get_json(silent=True) or {}
    N, P, K, ph = validate_soil_payload(payload)

    n_score = min(100, (N / 140) * 100)
    p_score = min(100, (P / 145) * 100)
    k_score = min(100, (K / 205) * 100)

    if 5.5 <= ph <= 7.5:
        ph_score = 100
    elif ph < 5.5:
        ph_score = max(0, 100 - (5.5 - ph) * 20)
    else:
        ph_score = max(0, 100 - (ph - 7.5) * 20)

    overall = (n_score + p_score + k_score + ph_score) / 4

    if overall >= 80:
        category, color = "Excellent - Your soil is very healthy!", "#4caf50"
        recommendation = "Your soil is in excellent condition. It can support most crops."
    elif overall >= 60:
        category, color = "Good - Your soil is healthy", "#8bc34a"
        recommendation = "Your soil is good. Add organic manure to improve further."
    elif overall >= 40:
        category, color = "Average - Needs improvement", "#ffc107"
        recommendation = "Consider adding compost and following crop rotation."
    else:
        category, color = "Poor - Needs significant improvement", "#f44336"
        recommendation = "Add organic matter, green manure, and consider soil testing."

    return jsonify({
        "success": True,
        "overall": round(overall, 1),
        "category": category,
        "color": color,
        "recommendation": recommendation,
        "parameters": {
            "nitrogen": round(n_score, 1),
            "phosphorus": round(p_score, 1),
            "potassium": round(k_score, 1),
            "ph": round(ph_score, 1),
        },
        "interpretation": {
            "nitrogen": {"value": N, "advice": _nitrogen_advice(N)},
            "phosphorus": {"value": P, "advice": _phosphorus_advice(P)},
            "potassium": {"value": K, "advice": _potassium_advice(K)},
            "ph": {"value": round(ph, 1), "advice": _ph_advice(ph)},
        },
    })


def _nitrogen_advice(n):
    if n < 50:
        return "Low nitrogen. Add urea, DAP, or organic manure. Good for pulses."
    if n < 100:
        return "Adequate nitrogen. Maintain with compost."
    return "High nitrogen. Good for leafy vegetables like cabbage, spinach."


def _phosphorus_advice(p):
    if p < 30:
        return "Low phosphorus. Add superphosphate or bone meal for root development."
    if p < 60:
        return "Adequate phosphorus. Good for root crops like carrots, potatoes."
    return "High phosphorus. Good for flowering and fruiting crops."


def _potassium_advice(k):
    if k < 50:
        return "Low potassium. Add potash or wood ash for disease resistance."
    if k < 100:
        return "Adequate potassium. Maintain with organic matter."
    return "High potassium. Good for all crops, especially fruiting vegetables."


def _ph_advice(ph):
    if ph < 5.5:
        return "Too acidic. Add lime to raise pH."
    if ph < 6.5:
        return "Slightly acidic. Good for potatoes, berries."
    if ph < 7.5:
        return "Neutral. Ideal for most crops."
    if ph < 8.5:
        return "Slightly alkaline. Good for spinach, cabbage."
    return "Too alkaline. Add sulfur or organic matter."


@app.route("/api/weather/<city>", methods=["GET"])
@limiter.limit("30 per minute")
def get_weather(city):
    cached = cache_get(city)
    if cached:
        return jsonify({"success": True, "weather": cached, "cached": True})

    if not Config.WEATHER_API_KEY:
        return jsonify({"success": False, "error": "Weather API not configured on server"}), 503

    try:
        resp = requests.get(
            Config.WEATHER_API_URL,
            params={"q": city, "appid": Config.WEATHER_API_KEY, "units": "metric", "lang": "en"},
            timeout=5,
        )
    except requests.RequestException:
        logger.exception("Weather upstream request failed")
        return jsonify({"success": False, "error": "Weather service unavailable"}), 502

    if resp.status_code == 404:
        return jsonify({"success": False, "error": f'City "{city}" not found.'}), 404
    if resp.status_code == 401:
        logger.error("Weather API key rejected upstream")
        return jsonify({"success": False, "error": "Weather service misconfigured"}), 502
    if resp.status_code != 200:
        return jsonify({"success": False, "error": "Weather service error"}), 502

    data = resp.json()
    rain_1h = data.get("rain", {}).get("1h", 0)
    weather_data = {
        "city": data["name"],
        "country": data["sys"]["country"],
        "temperature": round(data["main"]["temp"], 1),
        "feels_like": round(data["main"]["feels_like"], 1),
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "precipitation": rain_1h,
        "condition": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"],
        "wind_speed": data["wind"]["speed"],
        "wind_direction": data["wind"].get("deg", 0),
        "clouds": data["clouds"]["all"],
        "advice": get_weather_advice(data["main"]["temp"], data["main"]["humidity"], rain_1h),
    }
    cache_set(city, weather_data)
    return jsonify({"success": True, "weather": weather_data, "cached": False})


def get_weather_advice(temp, humidity, rainfall):
    advice = []
    if rainfall > 10:
        advice.append("Rain expected. Delay irrigation and cover harvested crops.")
    elif rainfall > 0:
        advice.append("Light rain possible. Good for sowing if soil is prepared.")
    else:
        advice.append("No rain expected. Plan irrigation accordingly.")

    if temp > 35:
        advice.append("Very hot. Provide shade to seedlings and water in the evening.")
    elif temp < 15:
        advice.append("Cool weather. Protect young plants from cold.")
    else:
        advice.append("Temperature is favorable for most crops.")

    if humidity > 80:
        advice.append("High humidity. Watch for fungal diseases.")
    elif humidity < 40:
        advice.append("Low humidity. Increase irrigation frequency.")

    return " ".join(advice)


@app.route("/api/crop-analysis", methods=["GET"])
def get_crop_analysis():
    return jsonify({"success": True, "crops": crop_repo.all()})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    logger.info("Starting Crop Recommendation API on port %d (model_ready=%s)", port, MODEL_READY)
    app.run(debug=Config.DEBUG, host="0.0.0.0", port=port)
