"""
backend/config.py
Centralized configuration. All secrets come from environment variables —
nothing sensitive is hardcoded or committed to the repo.
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    # --- Core ---
    SECRET_KEY = os.environ["SECRET_KEY"]  # fail fast if not set
    ENV = os.environ.get("FLASK_ENV", "production")
    DEBUG = ENV == "development"

    # --- CORS ---
    # Comma-separated list in .env, e.g. CORS_ORIGINS=https://myapp.com,http://localhost:3000
    CORS_ORIGINS = [o.strip() for o in os.environ.get(
        "CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",") if o.strip()]

    # --- Weather (OpenWeatherMap) ---
    WEATHER_API_KEY = os.environ.get("WEATHER_API_KEY", "")
    WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
    WEATHER_CACHE_TTL_SECONDS = int(os.environ.get("WEATHER_CACHE_TTL_SECONDS", "600"))

    # --- Rate limiting ---
    RATELIMIT_DEFAULT = os.environ.get("RATELIMIT_DEFAULT", "60 per minute")
    RATELIMIT_STORAGE_URI = os.environ.get("RATELIMIT_STORAGE_URI", "memory://")

    # --- Paths (absolute, so the app works regardless of CWD) ---
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(BASE_DIR, "models", "crop_model.pkl")
    SCALER_PATH = os.path.join(BASE_DIR, "models", "scaler.pkl")
    LABELS_PATH = os.path.join(BASE_DIR, "models", "crop_labels.pkl")
    CROP_INFO_PATH = os.path.join(BASE_DIR, "data", "crop_info.json")
    DATA_PATH = os.path.join(BASE_DIR, "data", "crop_data.csv")

    # --- Model input validation bounds (derived from Kaggle crop_recommendation dataset) ---
    FEATURE_BOUNDS = {
        "N": (0, 140),
        "P": (5, 145),
        "K": (5, 205),
        "temperature": (-10, 55),
        "humidity": (0, 100),
        "ph": (0, 14),
        "rainfall": (0, 500),
    }
