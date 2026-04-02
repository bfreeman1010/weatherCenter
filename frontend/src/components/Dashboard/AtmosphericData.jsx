import React from 'react';
import {
  formatTemp,
  formatWindSpeed,
  formatTime,
  formatPercent,
} from '../../utils/formatters';
import {
  GREY_BG, GREY_ALT, GREY_DARK, TEXT_BLACK, TEXT_DARK, BLUE_PRIMARY, BLUE_NAVY,
  BEVEL_RAISED, BEVEL_SUNKEN, BEVEL_BLUE_RAISED,
} from '../../theme';

export default function AtmosphericData({ hourly }) {
  if (!hourly) return null;

  return (
    <div style={{ background: GREY_BG, boxShadow: BEVEL_RAISED }}>
      <div
        className="px-3 py-1.5 text-xs font-bold text-white"
        style={{ background: BLUE_PRIMARY, boxShadow: BEVEL_BLUE_RAISED }}
      >
        Hourly Forecast
      </div>

      <div style={{ boxShadow: BEVEL_SUNKEN, margin: '4px', background: GREY_BG }}>
        <div className="flex gap-0 overflow-x-auto">
          {hourly.time.slice(0, 24).map((t, idx) => (
            <div
              key={t}
              className="flex-shrink-0 w-16 p-1.5 text-center text-xs"
              style={{
                borderRight: `1px solid ${GREY_DARK}`,
                background: idx % 2 === 0 ? GREY_BG : GREY_ALT,
              }}
            >
              <div style={{ color: TEXT_DARK, fontSize: '10px' }}>{formatTime(t)}</div>
              <div className="font-bold" style={{ color: TEXT_BLACK }}>{formatTemp(hourly.temperature?.[idx])}</div>
              <div style={{ color: BLUE_NAVY, fontSize: '10px' }}>
                {formatWindSpeed(hourly.wind_speed?.[idx])}
              </div>
              <div style={{ color: TEXT_DARK, fontSize: '10px' }}>
                {formatPercent(hourly.humidity?.[idx])}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
