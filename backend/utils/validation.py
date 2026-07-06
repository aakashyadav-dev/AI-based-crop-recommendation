"""
backend/utils/validation.py
Small, dependency-free request validation. The original app.py trusted
request.get_json() blindly (`float(data['N'])`) which throws an
unhandled KeyError/ValueError -> ugly 500s on any malformed input.
"""

FEATURE_ORDER = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]


class ValidationError(Exception):
    pass


def _to_float(value, field):
    try:
        return float(value)
    except (TypeError, ValueError):
        raise ValidationError(f"Field '{field}' must be a number, got {value!r}")


def validate_predict_payload(payload: dict, bounds: dict) -> list:
    missing = [f for f in FEATURE_ORDER if f not in payload]
    if missing:
        raise ValidationError(f"Missing required fields: {', '.join(missing)}")

    features = []
    for field in FEATURE_ORDER:
        value = _to_float(payload[field], field)
        lo, hi = bounds[field]
        if not (lo <= value <= hi):
            raise ValidationError(
                f"Field '{field}' out of expected range [{lo}, {hi}], got {value}"
            )
        features.append(value)
    return features


def validate_soil_payload(payload: dict):
    N = _to_float(payload.get("N", 0), "N")
    P = _to_float(payload.get("P", 0), "P")
    K = _to_float(payload.get("K", 0), "K")
    ph = _to_float(payload.get("ph", 7), "ph")

    for name, value, hi in (("N", N, 200), ("P", P, 200), ("K", K, 250)):
        if not (0 <= value <= hi):
            raise ValidationError(f"Field '{name}' out of expected range [0, {hi}]")
    if not (0 <= ph <= 14):
        raise ValidationError("Field 'ph' out of expected range [0, 14]")

    return N, P, K, ph
