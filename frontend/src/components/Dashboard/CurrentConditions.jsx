import React from 'react';
import {
  formatTemp,
  formatWindSpeed,
  formatWindDirection,
  formatPressure,
  formatVisibility,
  formatPercent,
  getWeatherDescription,
  getWeatherIcon,
} from '../../utils/formatters';
import {
  GREY_BG, GREY_ALT, TEXT_BLACK, TEXT_DARK, BLUE_PRIMARY,
  BEVEL_RAISED, BEVEL_SUNKEN, BEVEL_BLUE_RAISED,
} from '../../theme';

export default function CurrentConditions({ data }) {
  if (!data) return null;

  const current = data.current;

  return (
    <div style={{ background: GREY_BG, boxShadow: BEVEL_RAISED }}>
      <div
        className="px-3 py-1.5 text-xs font-bold text-white"
        style={{ background: BLUE_PRIMARY, boxShadow: BEVEL_BLUE_RAISED }}
      >
        Current Conditions
      </div>

      <div className="p-3">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{getWeatherIcon(current.weather_code)}</span>
          <div>
            <div className="text-2xl font-bold" style={{ color: TEXT_BLACK }}>
              {formatTemp(current.temperature)}
            </div>
            <div className="text-xs" style={{ color: TEXT_DARK }}>
              {getWeatherDescription(current.weather_code)}
            </div>
          </div>
        </div>

        <div className="text-xs mb-3" style={{ color: TEXT_DARK }}>
          Feels like {formatTemp(current.feels_like)}
        </div>

        <div style={{ boxShadow: BEVEL_SUNKEN, background: GREY_BG, padding: '2px' }}>
          <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
            <tbody>
              <Row label="Wind" value={`${formatWindDirection(current.wind_direction)} ${formatWindSpeed(current.wind_speed)}${current.wind_gust != null ? `, gusts ${formatWindSpeed(current.wind_gust)}` : ''}`} />
              <Row label="Humidity" value={formatPercent(current.humidity)} even />
              <Row label="Dewpoint" value={current.dewpoint != null ? formatTemp(current.dewpoint) : '--'} />
              <Row label="Pressure" value={formatPressure(current.pressure)} even />
              <Row label="Visibility" value={formatVisibility(current.visibility)} />
              <Row label="Cloud Cover" value={formatPercent(current.cloud_cover)} even />
              <Row label="Precipitation" value={current.precipitation != null ? `${current.precipitation} mm` : '--'} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, even }) {
  return (
    <tr style={{ background: even ? GREY_ALT : GREY_BG }}>
      <td className="py-1 px-2 font-bold" style={{ color: TEXT_BLACK, width: '40%' }}>{label}</td>
      <td className="py-1 px-2" style={{ color: TEXT_BLACK }}>{value}</td>
    </tr>
  );
}
