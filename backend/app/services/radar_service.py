"""Radar data service - provides tile URLs and RainViewer animation frames."""

import httpx
from ..config import (
    RAINVIEWER_API_URL,
    IEM_TMS_REFLECTIVITY,
    IEM_NEXRAD_WMS,
    IEM_ECHO_TOPS_WMS,
    IEM_WARNINGS_WMS,
    GOES_EAST_WMS,
    GOES_WEST_WMS,
)


class RadarService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=15.0)

    async def get_rainviewer_frames(self) -> dict:
        """Get available radar animation frames from RainViewer."""
        resp = await self.client.get(RAINVIEWER_API_URL)
        resp.raise_for_status()
        data = resp.json()

        host = data.get("host", "https://tilecache.rainviewer.com")
        frames = []

        for frame in data.get("radar", {}).get("past", []):
            frames.append({
                "time": frame["time"],
                "tile_url": f"{host}{frame['path']}/256/{{z}}/{{x}}/{{y}}/2/1_1.png",
                "nowcast": False,
            })

        for frame in data.get("radar", {}).get("nowcast", []):
            frames.append({
                "time": frame["time"],
                "tile_url": f"{host}{frame['path']}/256/{{z}}/{{x}}/{{y}}/2/1_1.png",
                "nowcast": True,
            })

        return {
            "frames": frames,
            "generated": data.get("generated"),
        }

    def get_tile_sources(self) -> dict:
        """Return all available tile layer configurations for the frontend."""
        return {
            "nexrad_reflectivity_tms": IEM_TMS_REFLECTIVITY,
            "nexrad_reflectivity_wms": IEM_NEXRAD_WMS,
            "nexrad_echo_tops_wms": IEM_ECHO_TOPS_WMS,
            "nws_warnings_wms": IEM_WARNINGS_WMS,
            "goes_east_wms": GOES_EAST_WMS,
            "goes_west_wms": GOES_WEST_WMS,
        }

    async def close(self):
        await self.client.aclose()
