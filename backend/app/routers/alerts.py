"""NWS alerts endpoints."""

from fastapi import APIRouter, HTTPException, Query
from ..services.nws_service import NWSService

router = APIRouter(prefix="/alerts", tags=["alerts"])
nws = NWSService()


@router.get("/active")
async def get_active_alerts(
    lat: float = Query(None, ge=-90, le=90),
    lon: float = Query(None, ge=-180, le=180),
    state: str = Query(None, min_length=2, max_length=2),
):
    """Get active NWS weather alerts."""
    try:
        raw_alerts = await nws.get_active_alerts(lat=lat, lon=lon, state=state)
        parsed = [nws.parse_alert(a) for a in raw_alerts]

        # worst stuff first
        severity_order = {"Extreme": 0, "Severe": 1, "Moderate": 2, "Minor": 3}
        parsed.sort(key=lambda a: severity_order.get(a["severity"], 99))

        return {
            "alerts": parsed,
            "count": len(parsed),
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"NWS API error: {str(e)}")
