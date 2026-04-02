"""Configuration constants for the weatherCenter API."""

# NWS API
NWS_BASE_URL = "https://api.weather.gov"
NWS_USER_AGENT = "(ExtremeWeatherApp, extreme-weather-app@example.com)"
NWS_HEADERS = {
    "User-Agent": NWS_USER_AGENT,
    "Accept": "application/geo+json",
}

# Open-Meteo API
OPENMETEO_BASE_URL = "https://api.open-meteo.com/v1/forecast"
OPENMETEO_GFS_URL = "https://api.open-meteo.com/v1/gfs"

# RainViewer API
RAINVIEWER_API_URL = "https://api.rainviewer.com/public/weather-maps.json"

# Iowa State Mesonet NEXRAD
IEM_TMS_REFLECTIVITY = (
    "https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/"
    "nexrad-n0q-900913/{z}/{x}/{y}.png"
)
IEM_NEXRAD_WMS = (
    "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi"
)
IEM_ECHO_TOPS_WMS = (
    "https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/eet.cgi"
)
IEM_WARNINGS_WMS = (
    "https://mesonet.agron.iastate.edu/cgi-bin/wms/us/wwa.cgi"
)

# GOES Satellite Imagery (Iowa Environmental Mesonet WMS)
GOES_EAST_WMS = "https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi"
GOES_WEST_WMS = "https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_west.cgi"

# how often we poll each service (seconds)
ALERTS_POLL_INTERVAL = 60
WEATHER_POLL_INTERVAL = 300
RADAR_POLL_INTERVAL = 120

# what we ask Open-Meteo for in each request
CURRENT_PARAMS = [
    "temperature_2m", "relative_humidity_2m", "apparent_temperature",
    "precipitation", "rain", "showers", "snowfall", "weather_code",
    "cloud_cover", "pressure_msl", "surface_pressure",
    "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m",
]

# hourly forecast fields
HOURLY_PARAMS = [
    "temperature_2m", "relative_humidity_2m", "dew_point_2m",
    "apparent_temperature", "precipitation", "rain", "weather_code",
    "cloud_cover", "pressure_msl", "surface_pressure", "visibility",
    "wind_speed_10m", "wind_speed_80m", "wind_direction_10m",
    "wind_direction_80m", "wind_gusts_10m", "cape",
    "lifted_index", "convective_inhibition", "freezing_level_height",
]

# daily summary fields
DAILY_PARAMS = [
    "temperature_2m_max", "temperature_2m_min", "precipitation_sum",
    "weather_code", "wind_speed_10m_max", "wind_gusts_10m_max",
]

# the pressure levels we pull for building soundings (hPa)
PRESSURE_LEVELS = [
    1000, 975, 950, 925, 900, 850, 800, 750, 700,
    650, 600, 550, 500, 450, 400, 350, 300, 250, 200,
]

# what we need at each pressure level
PRESSURE_LEVEL_VARS = [
    "temperature", "dew_point", "wind_speed",
    "wind_direction", "relative_humidity", "geopotential_height",
]
