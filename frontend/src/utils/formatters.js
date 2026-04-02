/**
 * Weather code to description mapping (WMO codes used by Open-Meteo).
 */
const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snowfall',
  73: 'Moderate snowfall',
  75: 'Heavy snowfall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export function getWeatherDescription(code) {
  return WEATHER_CODES[code] || 'Unknown';
}

export function getWeatherIcon(code) {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if (code >= 51 && code <= 57) return '🌦️';
  if (code >= 61 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌧️';
  if (code >= 85 && code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}

export function formatTemp(celsius) {
  if (celsius == null) return '--';
  const f = (celsius * 9) / 5 + 32;
  return `${f.toFixed(0)}°F`;
}

export function formatTempC(celsius) {
  if (celsius == null) return '--';
  return `${celsius.toFixed(1)}°C`;
}

export function formatWindSpeed(ms) {
  if (ms == null) return '--';
  const mph = ms * 2.237;
  return `${mph.toFixed(0)} mph`;
}

export function formatWindDirection(deg) {
  if (deg == null) return '--';
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const idx = Math.round(deg / 22.5) % 16;
  return dirs[idx];
}

export function formatPressure(hpa) {
  if (hpa == null) return '--';
  const inhg = hpa * 0.02953;
  return `${inhg.toFixed(2)} inHg`;
}

export function formatVisibility(meters) {
  if (meters == null) return '--';
  const miles = meters / 1609.34;
  return `${miles.toFixed(1)} mi`;
}

export function formatPercent(value) {
  if (value == null) return '--';
  return `${value.toFixed(0)}%`;
}

export function formatTime(isoString) {
  if (!isoString) return '--';
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(isoString) {
  if (!isoString) return '--';
  const d = new Date(isoString);
  return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

export function formatUnixTime(unix) {
  if (!unix) return '--';
  const d = new Date(unix * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
