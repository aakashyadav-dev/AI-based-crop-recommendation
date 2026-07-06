"""
backend/utils/crop_repository.py
Loads data/crop_info.json (a dict keyed by lowercase crop name) and provides
safe, consistent lookups. Replaces the old ad-hoc crop_analysis.get(...)
calls scattered through app.py, which were silently broken because the old
soil_health_data.json didn't actually contain per-crop entries.
"""
import json
from typing import Optional


class CropRepository:
    def __init__(self, path: str):
        with open(path, "r") as f:
            self._data: dict = json.load(f)

    def lookup(self, crop_name: str) -> Optional[dict]:
        key = crop_name.lower().strip()
        if key in self._data:
            return self._data[key]
        # fuzzy fallback: substring match against known keys
        for k in self._data:
            if k in key or key in k:
                return self._data[k]
        return None

    def generic(self, crop_name: str) -> dict:
        return {
            "name": crop_name.title(),
            "avg_temperature": 25.0,
            "avg_humidity": 70.0,
            "avg_ph": 6.5,
            "avg_rainfall": 150.0,
            "soil_types": ["Loamy Soil"],
            "growing_season": "Variable",
            "water_requirement": "Medium",
            "duration": "90-120 days",
            "states": ["Various states"],
            "icon": "fa-seedling",
        }

    def all(self) -> dict:
        return self._data
