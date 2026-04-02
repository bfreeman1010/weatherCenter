import React from 'react';
import {
  formatTemp,
  formatWindSpeed,
  formatDate,
  getWeatherIcon,
  getWeatherDescription,
} from '../../utils/formatters';
import {
  GREY_BG, GREY_ALT, GREY_DARK, GREY_HEADER, TEXT_BLACK, TEXT_DARK, TEXT_RED, BLUE_PRIMARY, BLUE_NAVY,
  BEVEL_RAISED, BEVEL_SUNKEN, BEVEL_BLUE_RAISED,
} from '../../theme';

export default function ForecastPanel({ data }) {
  if (!data?.daily) return null;

  const daily = data.daily;
  const days = daily.time.slice(0, 7);

  return (
    <div style={{ background: GREY_BG, boxShadow: BEVEL_RAISED }}>
      <div
        className="px-3 py-1.5 text-xs font-bold text-white"
        style={{ background: BLUE_PRIMARY, boxShadow: BEVEL_BLUE_RAISED }}
      >
        7 Day Forecast
      </div>

      <div style={{ boxShadow: BEVEL_SUNKEN, margin: '4px', background: GREY_BG }}>
        <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: GREY_HEADER, borderBottom: `2px solid ${GREY_DARK}` }}>
              <th className="py-1 px-2 text-left font-bold" style={{ color: TEXT_BLACK }}>Day</th>
              <th className="py-1 px-1 text-left font-bold" style={{ color: TEXT_BLACK }}></th>
              <th className="py-1 px-2 text-left font-bold" style={{ color: TEXT_BLACK }}>Forecast</th>
              <th className="py-1 px-2 text-right font-bold" style={{ color: TEXT_BLACK }}>Hi/Lo</th>
              <th className="py-1 px-2 text-right font-bold" style={{ color: TEXT_BLACK }}>Wind</th>
            </tr>
          </thead>
          <tbody>
            {days.map((time, idx) => (
              <tr
                key={time}
                style={{
                  background: idx % 2 === 0 ? GREY_BG : GREY_ALT,
                  borderBottom: `1px solid ${GREY_DARK}`,
                }}
              >
                <td className="py-1.5 px-2" style={{ color: TEXT_BLACK }}>
                  {idx === 0 ? 'Today' : formatDate(time)}
                </td>
                <td className="py-1.5 px-1 text-base">
                  {getWeatherIcon(daily.weather_code?.[idx])}
                </td>
                <td className="py-1.5 px-2" style={{ color: TEXT_BLACK }}>
                  {getWeatherDescription(daily.weather_code?.[idx])}
                </td>
                <td className="py-1.5 px-2 text-right">
                  <span className="font-bold" style={{ color: TEXT_RED }}>
                    {formatTemp(daily.temp_max?.[idx])}
                  </span>
                  <span style={{ color: TEXT_DARK }}> / </span>
                  <span style={{ color: BLUE_NAVY }}>
                    {formatTemp(daily.temp_min?.[idx])}
                  </span>
                </td>
                <td className="py-1.5 px-2 text-right" style={{ color: TEXT_BLACK }}>
                  {formatWindSpeed(daily.wind_speed_max?.[idx])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
