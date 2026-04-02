"""Radar data endpoints - tile sources and RainViewer animation frames."""

from fastapi import APIRouter, HTTPException
from ..services.radar_service import RadarService

router = APIRouter(prefix="/radar", tags=["radar"])
radar_service = RadarService()


@router.get("/sources")
async def get_radar_tile_sources():
    """Return available radar tile layer configurations for Leaflet."""
    return radar_service.get_tile_sources()


@router.get("/frames")
async def get_radar_animation_frames():
    """Return RainViewer radar animation frames with timestamps and tile URLs."""
    try:
        return await radar_service.get_rainviewer_frames()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"RainViewer API error: {str(e)}")
