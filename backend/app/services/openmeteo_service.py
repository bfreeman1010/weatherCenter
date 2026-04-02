"""Open-Meteo API client for weather data and pressure-level soundings."""

import logging
import math
import numpy as np
import httpx
from ..config import (
    OPENMETEO_BASE_URL,
    OPENMETEO_GFS_URL,
    CURRENT_PARAMS,
    HOURLY_PARAMS,
    DAILY_PARAMS,
    PRESSURE_LEVELS,
    PRESSURE_LEVEL_VARS,
)


class OpenMeteoService:
    def __init__(self):
        self.client = httpx.AsyncClient(timeout=30.0)

    async def get_current_and_forecast(self, lat: float, lon: float) -> dict:
        """Get current conditions + hourly + daily forecast."""
        params = {
            "latitude": lat,
            "longitude": lon,
            "current": ",".join(CURRENT_PARAMS),
            "hourly": ",".join(HOURLY_PARAMS),
            "daily": ",".join(DAILY_PARAMS),
            "timezone": "auto",
            "forecast_days": 7,
            "wind_speed_unit": "ms",
        }
        resp = await self.client.get(OPENMETEO_BASE_URL, params=params)
        resp.raise_for_status()
        return resp.json()

    async def get_pressure_level_data(self, lat: float, lon: float) -> dict:
        """Get pressure-level sounding data from GFS model."""
        level_params = []
        for level in PRESSURE_LEVELS:
            for var in PRESSURE_LEVEL_VARS:
                level_params.append(f"{var}_{level}hPa")

        params = {
            "latitude": lat,
            "longitude": lon,
            "hourly": ",".join(level_params),
            "timezone": "auto",
            "wind_speed_unit": "ms",
        }
        resp = await self.client.get(OPENMETEO_GFS_URL, params=params)
        resp.raise_for_status()
        return resp.json()

    def build_sounding_profile(self, pressure_data: dict, hour_index: int) -> dict:
        """Extract a single vertical profile (pseudo-sounding) for a given hour."""
        profile = {
            "pressure": [],
            "temperature": [],
            "dewpoint": [],
            "wind_speed": [],
            "wind_direction": [],
            "height": [],
            "relative_humidity": [],
        }
        hourly = pressure_data.get("hourly", {})

        def at_index(arr):
            return arr[hour_index] if arr and hour_index < len(arr) else None

        for level in PRESSURE_LEVELS:
            t_val = at_index(hourly.get(f"temperature_{level}hPa"))
            td_val = at_index(hourly.get(f"dew_point_{level}hPa"))
            ws_val = at_index(hourly.get(f"wind_speed_{level}hPa"))
            wd_val = at_index(hourly.get(f"wind_direction_{level}hPa"))
            rh_val = at_index(hourly.get(f"relative_humidity_{level}hPa"))
            z_val = at_index(hourly.get(f"geopotential_height_{level}hPa"))

            # skip levels where the temp came back null
            if t_val is not None:
                profile["pressure"].append(level)
                profile["temperature"].append(t_val)
                profile["dewpoint"].append(td_val)
                profile["wind_speed"].append(ws_val)
                profile["wind_direction"].append(wd_val)
                profile["height"].append(z_val)
                profile["relative_humidity"].append(rh_val)

        return profile

    def compute_parcel_profile(self, profile: dict) -> dict:
        """Compute parcel trace, CAPE, CIN, LCL, LFC, EL using MetPy."""
        try:
            import metpy.calc as mpcalc
            from metpy.units import units

            pressures = profile["pressure"]
            temps = profile["temperature"]
            dewpoints = profile["dewpoint"]

            # toss out any levels with gaps — MetPy won't be happy with nulls
            valid = [
                i for i in range(len(pressures))
                if temps[i] is not None and dewpoints[i] is not None
            ]
            if len(valid) < 3:
                return {}

            p = np.array([pressures[i] for i in valid], dtype=float) * units.hPa
            t = np.array([temps[i] for i in valid], dtype=float) * units.degC
            td = np.array([dewpoints[i] for i in valid], dtype=float) * units.degC

            # MetPy wants pressure descending (surface at the top)
            if p[0] < p[-1]:
                p = p[::-1]
                t = t[::-1]
                td = td[::-1]

            # lift a parcel from the surface
            parcel_prof = mpcalc.parcel_profile(p, t[0], td[0]).to(units.degC)

            # CAPE and CIN
            try:
                cape, cin = mpcalc.cape_cin(p, t, td, parcel_prof)
                cape_val = float(cape.magnitude)
                cin_val = float(cin.magnitude)
            except Exception:
                cape_val = None
                cin_val = None

            # LCL
            try:
                lcl_p, lcl_t = mpcalc.lcl(p[0], t[0], td[0])
                lcl_p_val = float(lcl_p.magnitude)
                lcl_t_val = float(lcl_t.magnitude)
            except Exception:
                lcl_p_val = None
                lcl_t_val = None

            # LFC
            try:
                lfc_p, _ = mpcalc.lfc(p, t, td)
                lfc_p_val = float(lfc_p.magnitude)
            except Exception:
                lfc_p_val = None

            # EL
            try:
                el_p, _ = mpcalc.el(p, t, td)
                el_p_val = float(el_p.magnitude)
            except Exception:
                el_p_val = None

            def safe_float(val):
                """Convert to float, replacing NaN/Inf with None."""
                if val is None:
                    return None
                f = float(val)
                return round(f, 1) if math.isfinite(f) else None

            # map parcel temps back onto the original pressure levels
            parcel_temps = [None] * len(pressures)
            parcel_list = parcel_prof.magnitude.tolist()
            for idx, orig_idx in enumerate(valid):
                # account for the flip we may have done above
                src = (len(valid) - 1 - idx) if profile["pressure"][0] < profile["pressure"][-1] else idx
                if src < len(parcel_list):
                    parcel_temps[orig_idx] = round(parcel_list[src], 2)

            return {
                "parcel_temperature": parcel_temps,
                "cape": safe_float(cape_val),
                "cin": safe_float(cin_val),
                "lcl_pressure": safe_float(lcl_p_val),
                "lcl_temperature": safe_float(lcl_t_val),
                "el_pressure": safe_float(el_p_val),
                "lfc_pressure": safe_float(lfc_p_val),
            }
        except Exception as e:
            logging.warning(f"Parcel profile computation failed: {e}")
            return {}

    def get_current_hour_index(self, data: dict) -> int:
        """Find the index of the current hour in the hourly arrays."""
        current_time = data.get("current", {}).get("time", "")
        times = data.get("hourly", {}).get("time", [])
        for i, t in enumerate(times):
            if t == current_time:
                return i
        return 0

    def parse_current(self, data: dict) -> dict:
        """Parse current weather from Open-Meteo response."""
        current = data.get("current", {})
        hourly = data.get("hourly", {})
        idx = self.get_current_hour_index(data)

        dewpoint = None
        if hourly.get("dew_point_2m") and idx < len(hourly["dew_point_2m"]):
            dewpoint = hourly["dew_point_2m"][idx]

        visibility = None
        if hourly.get("visibility") and idx < len(hourly["visibility"]):
            visibility = hourly["visibility"][idx]

        return {
            "temperature": current.get("temperature_2m"),
            "feels_like": current.get("apparent_temperature"),
            "humidity": current.get("relative_humidity_2m"),
            "dewpoint": dewpoint,
            "pressure": current.get("pressure_msl"),
            "wind_speed": current.get("wind_speed_10m"),
            "wind_direction": current.get("wind_direction_10m"),
            "wind_gust": current.get("wind_gusts_10m"),
            "visibility": visibility,
            "cloud_cover": current.get("cloud_cover"),
            "weather_code": current.get("weather_code"),
            "precipitation": current.get("precipitation"),
        }

    def parse_hourly(self, data: dict) -> dict:
        """Parse hourly forecast from Open-Meteo response."""
        h = data.get("hourly", {})
        return {
            "time": h.get("time", []),
            "temperature": h.get("temperature_2m", []),
            "humidity": h.get("relative_humidity_2m", []),
            "dewpoint": h.get("dew_point_2m", []),
            "precipitation": h.get("precipitation", []),
            "weather_code": h.get("weather_code", []),
            "wind_speed": h.get("wind_speed_10m", []),
            "wind_direction": h.get("wind_direction_10m", []),
            "wind_gust": h.get("wind_gusts_10m", []),
            "pressure": h.get("pressure_msl", []),
            "cloud_cover": h.get("cloud_cover", []),
            "visibility": h.get("visibility", []),
            "cape": h.get("cape", []),
            "lifted_index": h.get("lifted_index", []),
            "cin": h.get("convective_inhibition", []),
            "freezing_level": h.get("freezing_level_height", []),
        }

    def parse_daily(self, data: dict) -> dict:
        """Parse daily forecast from Open-Meteo response."""
        d = data.get("daily", {})
        return {
            "time": d.get("time", []),
            "temp_max": d.get("temperature_2m_max", []),
            "temp_min": d.get("temperature_2m_min", []),
            "precipitation_sum": d.get("precipitation_sum", []),
            "weather_code": d.get("weather_code", []),
            "wind_speed_max": d.get("wind_speed_10m_max", []),
            "wind_gust_max": d.get("wind_gusts_10m_max", []),
        }

    async def get_wind_grid(self, lat_min: float, lat_max: float,
                            lon_min: float, lon_max: float, step: float = 3.0) -> dict:
        """Fetch wind data for a grid of points and return u/v components."""
        lats = []
        lons = []
        lat = lat_min
        while lat <= lat_max:
            lon = lon_min
            while lon <= lon_max:
                lats.append(round(lat, 2))
                lons.append(round(lon, 2))
                lon += step
            lat += step

        # batch request — Open-Meteo takes comma-separated lat/lon lists
        params = {
            "latitude": ",".join(str(l) for l in lats),
            "longitude": ",".join(str(l) for l in lons),
            "current": "wind_speed_10m,wind_direction_10m",
            "wind_speed_unit": "ms",
            "timezone": "auto",
        }
        resp = await self.client.get(OPENMETEO_BASE_URL, params=params)
        resp.raise_for_status()
        data = resp.json()

        # index the results by their lat/lon so we can build the grid
        results = data if isinstance(data, list) else [data]
        point_map = {}
        for i, result in enumerate(results):
            current = result.get("current", {})
            speed = current.get("wind_speed_10m")
            direction = current.get("wind_direction_10m")
            req_lat = lats[i] if i < len(lats) else None
            req_lon = lons[i] if i < len(lons) else None
            if speed is not None and direction is not None and req_lat is not None:
                rad = math.radians(direction)
                u = -speed * math.sin(rad)
                v = -speed * math.cos(rad)
                point_map[(req_lat, req_lon)] = {
                    "u": round(u, 2),
                    "v": round(v, 2),
                    "speed": round(speed, 1),
                }

        # lay out the grid top-to-bottom, left-to-right (row-major)
        unique_lats = sorted(set(lats), reverse=True)
        unique_lons = sorted(set(lons))
        grid_points = []
        for lat_val in unique_lats:
            for lon_val in unique_lons:
                pt = point_map.get((lat_val, lon_val))
                if pt:
                    grid_points.append({"lat": lat_val, "lon": lon_val, **pt})
                else:
                    grid_points.append({"lat": lat_val, "lon": lon_val, "u": 0, "v": 0, "speed": 0})

        # figure out how many cells we ended up with
        nx = int((lon_max - lon_min) / step) + 1
        ny = int((lat_max - lat_min) / step) + 1

        return {
            "points": grid_points,
            "nx": nx,
            "ny": ny,
            "lat_min": lat_min,
            "lat_max": lat_max,
            "lon_min": lon_min,
            "lon_max": lon_max,
            "step": step,
        }

    async def get_temperature_grid(self, lat_min: float, lat_max: float,
                                   lon_min: float, lon_max: float, step: float = 2.0) -> dict:
        """Fetch current temperature for a grid of points covering the area."""
        lats = []
        lons = []
        lat = lat_min
        while lat <= lat_max:
            lon = lon_min
            while lon <= lon_max:
                lats.append(round(lat, 2))
                lons.append(round(lon, 2))
                lon += step
            lat += step

        params = {
            "latitude": ",".join(str(l) for l in lats),
            "longitude": ",".join(str(l) for l in lons),
            "current": "temperature_2m",
            "temperature_unit": "fahrenheit",
            "timezone": "auto",
        }
        resp = await self.client.get(OPENMETEO_BASE_URL, params=params)
        resp.raise_for_status()
        data = resp.json()

        results = data if isinstance(data, list) else [data]
        point_map = {}
        for i, result in enumerate(results):
            current = result.get("current", {})
            temp = current.get("temperature_2m")
            req_lat = lats[i] if i < len(lats) else None
            req_lon = lons[i] if i < len(lons) else None
            if temp is not None and req_lat is not None:
                point_map[(req_lat, req_lon)] = round(temp, 1)

        # same grid layout as the wind data — top to bottom, left to right
        unique_lats = sorted(set(lats), reverse=True)
        unique_lons = sorted(set(lons))
        grid_temps = []
        for lat_val in unique_lats:
            for lon_val in unique_lons:
                grid_temps.append(point_map.get((lat_val, lon_val)))

        nx = int((lon_max - lon_min) / step) + 1
        ny = int((lat_max - lat_min) / step) + 1

        return {
            "temps": grid_temps,
            "nx": nx,
            "ny": ny,
            "lat_min": lat_min,
            "lat_max": lat_max,
            "lon_min": lon_min,
            "lon_max": lon_max,
            "step": step,
        }

    async def close(self):
        await self.client.aclose()
