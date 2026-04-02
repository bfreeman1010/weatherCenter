"""Geocoding endpoints using OpenStreetMap Nominatim (free, no API key)."""

from fastapi import APIRouter, Query
import httpx

router = APIRouter(prefix="/geocode", tags=["geocode"])

NOMINATIM_URL = "https://nominatim.openstreetmap.org"
HEADERS = {"User-Agent": "weatherCenter/1.0 (https://github.com/bfreeman1010/weatherCenter)"}


@router.get("/search")
async def search_location(q: str = Query(..., min_length=2)):
    """Forward geocode: place name → coordinates."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{NOMINATIM_URL}/search",
            params={"q": q, "format": "json", "limit": 5, "addressdetails": 1},
            headers=HEADERS,
            timeout=10,
        )
        resp.raise_for_status()
        results = resp.json()

    return [
        {
            "name": r.get("display_name", ""),
            "lat": float(r["lat"]),
            "lon": float(r["lon"]),
            "country": r.get("address", {}).get("country", ""),
            "country_code": r.get("address", {}).get("country_code", ""),
            "state": r.get("address", {}).get("state", ""),
        }
        for r in results
    ]


@router.get("/reverse")
async def reverse_geocode(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
):
    """Reverse geocode: coordinates → place name."""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{NOMINATIM_URL}/reverse",
            params={"lat": lat, "lon": lon, "format": "json", "addressdetails": 1},
            headers=HEADERS,
            timeout=10,
        )
        resp.raise_for_status()
        data = resp.json()

    address = data.get("address", {})
    city = address.get("city") or address.get("town") or address.get("village") or address.get("county") or ""
    state = address.get("state", "")
    country = address.get("country", "")
    country_code = address.get("country_code", "")

    name_parts = [p for p in [city, state, country] if p]
    return {
        "name": ", ".join(name_parts) if name_parts else data.get("display_name", f"{lat}, {lon}"),
        "city": city,
        "state": state,
        "country": country,
        "country_code": country_code,
        "lat": lat,
        "lon": lon,
    }
