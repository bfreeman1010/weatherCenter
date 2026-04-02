"""weatherCenter API - FastAPI application."""

import asyncio
import json
import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from .routers import weather, radar, alerts, geocode
from .services.nws_service import NWSService
from .services.openmeteo_service import OpenMeteoService


# keep track of who's connected via websocket
_ws_clients: dict[str, list[WebSocket]] = {}
_nws = NWSService()
_openmeteo = OpenMeteoService()


async def background_polling():
    """Background task that polls for alerts and pushes updates to WebSocket clients."""
    while True:
        try:
            raw_alerts = await _nws.get_active_alerts()
            parsed_alerts = [_nws.parse_alert(a) for a in raw_alerts]

            for key, clients in list(_ws_clients.items()):
                if not clients:
                    continue

                message = json.dumps({
                    "type": "update",
                    "alerts": parsed_alerts[:20],
                })

                dead = []
                for ws in clients:
                    try:
                        await ws.send_text(message)
                    except Exception:
                        dead.append(ws)
                for ws in dead:
                    clients.remove(ws)

        except Exception:
            pass

        await asyncio.sleep(60)


@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(background_polling())
    yield
    task.cancel()
    await _nws.close()
    await _openmeteo.close()


app = FastAPI(
    title="weatherCenter API",
    description="NWS-style weather radar and alerts",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router, prefix="/api")
app.include_router(radar.router, prefix="/api")
app.include_router(alerts.router, prefix="/api")
app.include_router(geocode.router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "weatherCenter API"}


# Serve frontend static files in production
DIST_DIR = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"

if DIST_DIR.is_dir():
    # Serve static assets (JS, CSS, images)
    app.mount("/assets", StaticFiles(directory=str(DIST_DIR / "assets")), name="static-assets")

    # Serve files from dist root (Logo.png, etc.)
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Try to serve the exact file first
        file_path = DIST_DIR / full_path
        if full_path and file_path.is_file():
            return FileResponse(file_path)
        # Fall back to index.html for SPA routing
        return FileResponse(DIST_DIR / "index.html")


@app.websocket("/ws/weather/{lat}/{lon}")
async def weather_websocket(websocket: WebSocket, lat: float, lon: float):
    """Real-time weather updates via WebSocket."""
    await websocket.accept()
    key = f"{lat},{lon}"

    if key not in _ws_clients:
        _ws_clients[key] = []
    _ws_clients[key].append(websocket)

    try:
        # say hello
        await websocket.send_text(json.dumps({
            "type": "connected",
            "message": f"Monitoring weather for {lat}, {lon}",
        }))

        # just sit here and wait for pings to keep things alive
        while True:
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text(json.dumps({"type": "pong"}))
    except WebSocketDisconnect:
        pass
    finally:
        if key in _ws_clients and websocket in _ws_clients[key]:
            _ws_clients[key].remove(websocket)
