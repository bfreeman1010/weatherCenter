"""Weather data endpoints - current conditions, forecast, sounding."""

import asyncio
import time
from fastapi import APIRouter, HTTPException, Query
from ..services.openmeteo_service import OpenMeteoService
from ..models.schemas import WeatherResponse, CurrentWeather, SoundingProfile, SoundingLevel, ParcelData

router = APIRouter(prefix="/weather", tags=["weather"])
openmeteo = OpenMeteoService()

# simple in-memory caches so we're not hammering Open-Meteo on every request
_city_temp_cache = {"data": None, "expires": 0}
_wind_grid_cache = {"data": None, "expires": 0}
_temp_grid_cache = {"data": None, "expires": 0}

MAJOR_CITIES = [
    {"name": "New York", "lat": 40.71, "lon": -74.01},
    {"name": "Los Angeles", "lat": 34.05, "lon": -118.24},
    {"name": "Chicago", "lat": 41.88, "lon": -87.63},
    {"name": "Houston", "lat": 29.76, "lon": -95.37},
    {"name": "Phoenix", "lat": 33.45, "lon": -112.07},
    {"name": "Philadelphia", "lat": 39.95, "lon": -75.17},
    {"name": "San Antonio", "lat": 29.42, "lon": -98.49},
    {"name": "San Diego", "lat": 32.72, "lon": -117.16},
    {"name": "Dallas", "lat": 32.78, "lon": -96.80},
    {"name": "Denver", "lat": 39.74, "lon": -104.99},
    {"name": "Seattle", "lat": 47.61, "lon": -122.33},
    {"name": "Miami", "lat": 25.76, "lon": -80.19},
    {"name": "Atlanta", "lat": 33.75, "lon": -84.39},
    {"name": "Minneapolis", "lat": 44.98, "lon": -93.27},
    {"name": "Detroit", "lat": 42.33, "lon": -83.05},
    {"name": "Boston", "lat": 42.36, "lon": -71.06},
    {"name": "Nashville", "lat": 36.16, "lon": -86.78},
    {"name": "Kansas City", "lat": 39.10, "lon": -94.58},
    {"name": "Salt Lake City", "lat": 40.76, "lon": -111.89},
    {"name": "Portland", "lat": 45.52, "lon": -122.68},
]


@router.get("/current", response_model=WeatherResponse)
async def get_current_weather(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
):
    """Get current weather conditions + hourly and daily forecast."""
    try:
        data = await openmeteo.get_current_and_forecast(lat, lon)

        current_data = openmeteo.parse_current(data)
        hourly_data = openmeteo.parse_hourly(data)
        daily_data = openmeteo.parse_daily(data)
        timezone = data.get("timezone", "UTC")

        return WeatherResponse(
            current=CurrentWeather(
                latitude=lat,
                longitude=lon,
                **current_data,
            ),
            hourly=hourly_data,
            daily=daily_data,
            timezone=timezone,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Weather API error: {str(e)}")


@router.get("/sounding", response_model=SoundingProfile)
async def get_sounding_data(
    lat: float = Query(..., ge=-90, le=90),
    lon: float = Query(..., ge=-180, le=180),
):
    """Get pressure-level sounding profile from GFS model."""
    try:
        pressure_data = await openmeteo.get_pressure_level_data(lat, lon)

        # grab a timestamp that actually has data
        times = pressure_data.get("hourly", {}).get("time", [])
        if not times:
            raise HTTPException(status_code=404, detail="No sounding data available")

        # pick ~6 hours into the forecast for a decent representative profile
        hour_index = min(6, len(times) - 1)
        profile = openmeteo.build_sounding_profile(pressure_data, hour_index)

        levels = []
        for i in range(len(profile["pressure"])):
            levels.append(SoundingLevel(
                pressure=profile["pressure"][i],
                temperature=profile["temperature"][i],
                dewpoint=profile["dewpoint"][i],
                wind_speed=profile["wind_speed"][i],
                wind_direction=profile["wind_direction"][i],
                height=profile["height"][i],
                relative_humidity=profile["relative_humidity"][i],
            ))

        # try to get parcel/CAPE data from MetPy (not the end of the world if it fails)
        parcel_data = None
        try:
            parcel_dict = openmeteo.compute_parcel_profile(profile)
            if parcel_dict:
                parcel_data = ParcelData(**parcel_dict)
        except Exception:
            pass  # Graceful degradation - return data without parcel info

        return SoundingProfile(
            levels=levels,
            valid_time=times[hour_index] if hour_index < len(times) else "",
            parcel=parcel_data,
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Sounding data error: {str(e)}")


@router.get("/temperature-grid")
async def get_temperature_grid():
    """Get gridded temperature data covering CONUS. Cached for 10 minutes."""
    now = time.time()
    if _temp_grid_cache["data"] and now < _temp_grid_cache["expires"]:
        return _temp_grid_cache["data"]

    try:
        grid = await openmeteo.get_temperature_grid(
            lat_min=15, lat_max=60,
            lon_min=-140, lon_max=-50,
            step=3.0,
        )
        _temp_grid_cache["data"] = grid
        _temp_grid_cache["expires"] = now + 30
        return grid
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Temperature grid error: {str(e)}")


@router.get("/wind-grid")
async def get_wind_grid():
    """Get gridded wind data (u/v components) covering CONUS. Cached for 10 minutes."""
    now = time.time()
    if _wind_grid_cache["data"] and now < _wind_grid_cache["expires"]:
        return _wind_grid_cache["data"]

    try:
        grid = await openmeteo.get_wind_grid(
            lat_min=24, lat_max=50,
            lon_min=-125, lon_max=-66,
            step=3.0,
        )
        _wind_grid_cache["data"] = grid
        _wind_grid_cache["expires"] = now + 600
        return grid
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Wind grid error: {str(e)}")


@router.get("/city-temperatures")
async def get_city_temperatures():
    """Get current temperatures for major US cities. Cached for 10 minutes."""
    now = time.time()
    if _city_temp_cache["data"] and now < _city_temp_cache["expires"]:
        return _city_temp_cache["data"]

    async def fetch_city(city):
        try:
            data = await openmeteo.get_current_and_forecast(city["lat"], city["lon"])
            current = openmeteo.parse_current(data)
            temp_c = current.get("temperature")
            temp_f = round(temp_c * 9 / 5 + 32, 1) if temp_c is not None else None
            return {
                "name": city["name"],
                "lat": city["lat"],
                "lon": city["lon"],
                "temp_f": temp_f,
                "temp_c": temp_c,
                "weather_code": current.get("weather_code", 0),
            }
        except Exception:
            return None

    results = await asyncio.gather(*[fetch_city(c) for c in MAJOR_CITIES])
    cities = [r for r in results if r is not None]

    _city_temp_cache["data"] = cities
    _city_temp_cache["expires"] = now + 600  # 10 minutes

    return cities
