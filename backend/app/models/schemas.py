"""Pydantic models for the Weather Radar API."""

from pydantic import BaseModel
from typing import Optional


class CurrentWeather(BaseModel):
    latitude: float
    longitude: float
    temperature: Optional[float] = None
    feels_like: Optional[float] = None
    humidity: Optional[float] = None
    dewpoint: Optional[float] = None
    pressure: Optional[float] = None
    wind_speed: Optional[float] = None
    wind_direction: Optional[float] = None
    wind_gust: Optional[float] = None
    visibility: Optional[float] = None
    cloud_cover: Optional[float] = None
    weather_code: Optional[int] = None
    precipitation: Optional[float] = None


class HourlyForecast(BaseModel):
    time: list[str] = []
    temperature: list[Optional[float]] = []
    humidity: list[Optional[float]] = []
    dewpoint: list[Optional[float]] = []
    precipitation: list[Optional[float]] = []
    weather_code: list[Optional[int]] = []
    wind_speed: list[Optional[float]] = []
    wind_direction: list[Optional[float]] = []
    wind_gust: list[Optional[float]] = []
    pressure: list[Optional[float]] = []
    cloud_cover: list[Optional[float]] = []
    visibility: list[Optional[float]] = []
    cape: list[Optional[float]] = []
    lifted_index: list[Optional[float]] = []
    cin: list[Optional[float]] = []
    freezing_level: list[Optional[float]] = []


class DailyForecast(BaseModel):
    time: list[str] = []
    temp_max: list[Optional[float]] = []
    temp_min: list[Optional[float]] = []
    precipitation_sum: list[Optional[float]] = []
    weather_code: list[Optional[int]] = []
    wind_speed_max: list[Optional[float]] = []
    wind_gust_max: list[Optional[float]] = []


class WeatherResponse(BaseModel):
    current: CurrentWeather
    hourly: HourlyForecast
    daily: DailyForecast
    timezone: str = "UTC"


class SoundingLevel(BaseModel):
    pressure: float
    temperature: Optional[float] = None
    dewpoint: Optional[float] = None
    wind_speed: Optional[float] = None
    wind_direction: Optional[float] = None
    height: Optional[float] = None
    relative_humidity: Optional[float] = None


class ParcelData(BaseModel):
    parcel_temperature: list[Optional[float]] = []
    cape: Optional[float] = None
    cin: Optional[float] = None
    lcl_pressure: Optional[float] = None
    lcl_temperature: Optional[float] = None
    el_pressure: Optional[float] = None
    lfc_pressure: Optional[float] = None


class SoundingProfile(BaseModel):
    levels: list[SoundingLevel] = []
    valid_time: str = ""
    parcel: Optional[ParcelData] = None


class AlertFeature(BaseModel):
    id: str
    event: str
    severity: str
    certainty: str
    urgency: str
    headline: str
    description: str
    instruction: Optional[str] = None
    onset: Optional[str] = None
    expires: Optional[str] = None
    sender_name: str = ""
    area_desc: str = ""
    polygon: Optional[list] = None
    color: str = "#ffcc00"


class RadarFrame(BaseModel):
    time: int
    tile_url: str
    nowcast: bool = False


