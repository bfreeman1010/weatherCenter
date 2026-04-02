import React from 'react';
import CurrentConditions from './CurrentConditions';
import AtmosphericData from './AtmosphericData';
import ForecastPanel from './ForecastPanel';
import { GREY_BG, BLUE_PRIMARY, BEVEL_BLUE_RAISED } from '../../theme';

export default function WeatherDashboard({ weatherData, locationName }) {
  return (
    <div className="p-2 space-y-2 overflow-y-auto h-full" style={{ background: GREY_BG }}>
      {locationName && (
        <div
          className="px-3 py-2 font-bold text-sm"
          style={{ background: BLUE_PRIMARY, color: '#fff', boxShadow: BEVEL_BLUE_RAISED }}
        >
          {locationName}
        </div>
      )}
      <CurrentConditions data={weatherData} />
      <AtmosphericData hourly={weatherData?.hourly} />
      <ForecastPanel data={weatherData} />
    </div>
  );
}
