import { useState, useEffect, useRef } from 'react';
import { weatherApi } from '../../services/api';
import {
  getWeatherDescription,
  formatTemp,
  formatWindDirection,
} from '../../utils/formatters';

const CUPERTINO = { lat: 37.323, lon: -122.032, name: 'Cupertino, CA' };

export default function WeatherTicker() {
  const [segments, setSegments] = useState([]);
  const textRef = useRef(null);
  const [animDuration, setAnimDuration] = useState(20);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather(lat, lon, name) {
      try {
        const data = await weatherApi.getCurrentWeather(lat, lon);
        if (cancelled) return;
        const c = data.current;
        const cond = getWeatherDescription(c.weather_code);
        const wind = c.wind_speed != null ? `${Math.round(c.wind_speed)} mph ${formatWindDirection(c.wind_direction)}` : '--';
        const gust = c.wind_gust != null ? ` (gusts ${Math.round(c.wind_gust)} mph)` : '';
        const hum = c.humidity != null ? `${Math.round(c.humidity)}%` : '--';
        const pres = c.pressure != null ? `${c.pressure.toFixed(1)} mb` : '--';
        const vis = c.visibility != null ? `${(c.visibility / 1609.34).toFixed(1)} mi` : '--';
        const precip = c.precipitation != null ? `${c.precipitation.toFixed(2)} in` : '0.00 in';

        const d = data.daily;
        const hi = formatTemp(d.temp_max?.[0]);
        const lo = formatTemp(d.temp_min?.[0]);

        setSegments([
          name,
          `NOW: ${formatTemp(c.temperature)} - ${cond}`,
          `Feels like ${formatTemp(c.feels_like)}`,
          `Hi ${hi} / Lo ${lo}`,
          `Wind: ${wind}${gust}`,
          `Humidity: ${hum}`,
          `Pressure: ${pres}`,
          `Visibility: ${vis}`,
          `Precip: ${precip}`,
        ]);
      } catch {
        setSegments([name, 'Weather data unavailable']);
      }
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          if (cancelled) return;
          const { latitude, longitude } = pos.coords;
          let name = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
          try {
            const geo = await weatherApi.reverseGeocode(latitude, longitude);
            name = geo.name || name;
          } catch {}
          fetchWeather(latitude, longitude, name);
        },
        () => {
          if (cancelled) return;
          fetchWeather(CUPERTINO.lat, CUPERTINO.lon, CUPERTINO.name);
        },
        { timeout: 8000 }
      );
    } else {
      fetchWeather(CUPERTINO.lat, CUPERTINO.lon, CUPERTINO.name);
    }

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (textRef.current) {
      const w = textRef.current.scrollWidth;
      setAnimDuration(Math.max(15, w / 60));
    }
  }, [segments]);

  return (
    <div
      className="shrink-0"
      style={{
        background: '#0d3d6e',
        border: 'none',
        boxShadow: 'inset -1px -1px #7abcf0, inset 1px 1px #051a30, inset -2px -2px #4a8abf, inset 2px 2px #0a2a4a',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        fontFamily: '"Courier New", Courier, monospace',
        overflow: 'hidden',
      }}
    >
      {/* Label */}
      <div
        style={{
          background: '#135997',
          color: '#fff',
          padding: '0 6px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '10px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          flexShrink: 0,
          borderRight: 'none',
          boxShadow: 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf',
        }}
      >
        LOCAL WX
      </div>

      {/* scrolling ticker text */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
        {segments.length > 0 ? (
          <div
            ref={textRef}
            style={{
              display: 'inline-flex',
              alignItems: 'stretch',
              whiteSpace: 'nowrap',
              height: '100%',
              animation: `ticker-scroll ${animDuration}s linear infinite`,
              paddingLeft: '100%',
            }}
          >
            {segments.map((seg, i) => (
              <span
                key={i}
                style={{
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  background: '#135997',
                  padding: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                  border: 'none',
                  boxShadow: 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf',
                }}
              >
                {seg}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ color: '#a0c4e8', fontSize: '12px', paddingLeft: '12px' }}>
            Loading local weather...
          </span>
        )}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
