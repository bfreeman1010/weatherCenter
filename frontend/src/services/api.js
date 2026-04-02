const API_BASE = '/api';

export const weatherApi = {
  getCurrentWeather: (lat, lon) =>
    fetch(`${API_BASE}/weather/current?lat=${lat}&lon=${lon}`).then(r => {
      if (!r.ok) throw new Error(`Weather API error: ${r.status}`);
      return r.json();
    }),

  getActiveAlerts: (lat, lon, state) => {
    const params = new URLSearchParams();
    if (lat != null) params.set('lat', lat);
    if (lon != null) params.set('lon', lon);
    if (state) params.set('state', state);
    return fetch(`${API_BASE}/alerts/active?${params}`).then(r => {
      if (!r.ok) throw new Error(`Alerts API error: ${r.status}`);
      return r.json();
    });
  },

  getRadarSources: () =>
    fetch(`${API_BASE}/radar/sources`).then(r => {
      if (!r.ok) throw new Error(`Radar API error: ${r.status}`);
      return r.json();
    }),

  getRadarFrames: () =>
    fetch(`${API_BASE}/radar/frames`).then(r => {
      if (!r.ok) throw new Error(`Radar frames API error: ${r.status}`);
      return r.json();
    }),

  geocodeSearch: (query) =>
    fetch(`${API_BASE}/geocode/search?q=${encodeURIComponent(query)}`).then(r => {
      if (!r.ok) throw new Error(`Geocode error: ${r.status}`);
      return r.json();
    }),

  reverseGeocode: (lat, lon) =>
    fetch(`${API_BASE}/geocode/reverse?lat=${lat}&lon=${lon}`).then(r => {
      if (!r.ok) throw new Error(`Reverse geocode error: ${r.status}`);
      return r.json();
    }),

  getTemperatureGrid: () =>
    fetch(`${API_BASE}/weather/temperature-grid`).then(r => {
      if (!r.ok) throw new Error(`Temperature grid API error: ${r.status}`);
      return r.json();
    }),
};

export function createWeatherSocket(lat, lon) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const ws = new WebSocket(`${protocol}//${window.location.host}/ws/weather/${lat}/${lon}`);
  return ws;
}
