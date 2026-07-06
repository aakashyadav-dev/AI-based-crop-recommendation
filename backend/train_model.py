"""
backend/train_model.py
Trains the Random Forest crop-recommendation model.

Fixes vs. the original two duplicate scripts (backend/train_model.py and
backend/models/train_model.py, which were identical except for
hyperparameters — one of them was silently dead code):
  - No hardcoded absolute path (was "/Users/aakashyadav/Documents/AI CROP/...",
    which only worked on the original author's laptop)
  - Single script, single source of truth
  - Adds k-fold cross-validation so the reported accuracy isn't just one
    lucky train/test split
  - Saves a metadata.json with training date, accuracy, sklearn version,
    and dataset hash so you can tell which model is deployed
"""
import argparse
import hashlib
import json
import os
import pickle
from datetime import datetime, timezone

import numpy as np
import pandas as pd
import sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.preprocessing import StandardScaler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_CSV = os.path.join(BASE_DIR, "data", "crop_data.csv")
MODELS_DIR = os.path.join(BASE_DIR, "models")


def file_hash(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        h.update(f.read())
    return h.hexdigest()[:16]


def main(csv_path: str):
    print("=" * 60)
    print("CROP RECOMMENDATION MODEL TRAINING")
    print("=" * 60)

    if not os.path.exists(csv_path):
        raise SystemExit(f"Dataset not found at {csv_path}. Pass --csv <path>.")

    df = pd.read_csv(csv_path)
    print(f"Loaded {len(df)} samples, columns: {list(df.columns)}")

    X = df[["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]]
    y = df["label"]
    crops = sorted(y.unique().tolist())
    print(f"Found {len(crops)} crop types")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=12,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced",
    )

    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5)
    print(f"5-fold CV accuracy: {cv_scores.mean():.2%} (+/- {cv_scores.std():.2%})")

    model.fit(X_train_scaled, y_train)
    test_accuracy = model.score(X_test_scaled, y_test)
    print(f"Held-out test accuracy: {test_accuracy:.2%}")

    importances = sorted(
        zip(X.columns, model.feature_importances_), key=lambda x: x[1], reverse=True
    )
    print("\nFeature importance:")
    for feat, imp in importances:
        print(f"  {feat}: {imp:.3f}")

    os.makedirs(MODELS_DIR, exist_ok=True)
    with open(os.path.join(MODELS_DIR, "crop_model.pkl"), "wb") as f:
        pickle.dump(model, f)
    with open(os.path.join(MODELS_DIR, "scaler.pkl"), "wb") as f:
        pickle.dump(scaler, f)
    with open(os.path.join(MODELS_DIR, "crop_labels.pkl"), "wb") as f:
        pickle.dump(crops, f)

    metadata = {
        "trained_at": datetime.now(timezone.utc).isoformat(),
        "sklearn_version": sklearn.__version__,
        "dataset_hash": file_hash(csv_path),
        "dataset_rows": len(df),
        "cv_accuracy_mean": round(float(cv_scores.mean()), 4),
        "cv_accuracy_std": round(float(cv_scores.std()), 4),
        "test_accuracy": round(float(test_accuracy), 4),
        "n_classes": len(crops),
        "feature_order": list(X.columns),
    }
    with open(os.path.join(MODELS_DIR, "metadata.json"), "w") as f:
        json.dump(metadata, f, indent=2)

    print("\nSaved model, scaler, labels, and metadata.json to", MODELS_DIR)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--csv", default=DEFAULT_CSV, help="Path to crop_data.csv")
    args = parser.parse_args()
    main(args.csv)
