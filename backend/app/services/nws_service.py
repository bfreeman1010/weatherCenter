"""National Weather Service API client."""

import httpx
from ..config import NWS_BASE_URL, NWS_HEADERS


class NWSService:
    def __init__(self):
        self.client = httpx.AsyncClient(
            base_url=NWS_BASE_URL,
            headers=NWS_HEADERS,
            timeout=30.0,
        )
        self._point_cache: dict[str, dict] = {}

    async def resolve_point(self, lat: float, lon: float) -> dict:
        """Resolve lat/lon to NWS grid coordinates, WFO office, and zone IDs."""
        key = f"{lat:.4f},{lon:.4f}"
        if key not in self._point_cache:
            resp = await self.client.get(f"/points/{lat},{lon}")
            resp.raise_for_status()
            self._point_cache[key] = resp.json()["properties"]
        return self._point_cache[key]

    async def get_gridpoint_data(self, lat: float, lon: float) -> dict:
        """Get raw quantitative grid forecast data."""
        point = await self.resolve_point(lat, lon)
        wfo = point["gridId"]
        gx, gy = point["gridX"], point["gridY"]
        resp = await self.client.get(f"/gridpoints/{wfo}/{gx},{gy}")
        resp.raise_for_status()
        return resp.json()["properties"]

    async def get_active_alerts(
        self,
        lat: float | None = None,
        lon: float | None = None,
        state: str | None = None,
    ) -> list[dict]:
        """Get active NWS alerts as GeoJSON features."""
        if lat is not None and lon is not None:
            params = {"point": f"{lat},{lon}"}
            resp = await self.client.get("/alerts/active", params=params)
        elif state:
            resp = await self.client.get(f"/alerts/active/area/{state}")
        else:
            resp = await self.client.get("/alerts/active", params={"limit": 50})

        resp.raise_for_status()
        features = resp.json().get("features", [])
        return features

    async def get_active_alerts_for_area(self, state: str) -> list[dict]:
        """Get all active alerts for a US state."""
        resp = await self.client.get(f"/alerts/active/area/{state}")
        resp.raise_for_status()
        return resp.json().get("features", [])

    def parse_alert(self, feature: dict) -> dict:
        """Parse a GeoJSON alert feature into a clean dict."""
        props = feature.get("properties", {})
        geometry = feature.get("geometry")

        polygon = None
        if geometry and geometry.get("type") == "Polygon":
            polygon = geometry["coordinates"]

        severity = props.get("severity", "Unknown")
        color_map = {
            "Extreme": "#ff0000",
            "Severe": "#ff4500",
            "Moderate": "#ff8c00",
            "Minor": "#ffd700",
            "Unknown": "#808080",
        }

        return {
            "id": props.get("id", ""),
            "event": props.get("event", "Unknown"),
            "severity": severity,
            "certainty": props.get("certainty", "Unknown"),
            "urgency": props.get("urgency", "Unknown"),
            "headline": props.get("headline", ""),
            "description": props.get("description", ""),
            "instruction": props.get("instruction"),
            "onset": props.get("onset"),
            "expires": props.get("expires"),
            "sender_name": props.get("senderName", ""),
            "area_desc": props.get("areaDesc", ""),
            "polygon": polygon,
            "color": color_map.get(severity, "#808080"),
        }

    async def close(self):
        await self.client.aclose()
