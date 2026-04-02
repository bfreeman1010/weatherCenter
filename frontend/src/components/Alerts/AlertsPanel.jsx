import React from 'react';
import AlertCard from './AlertCard';
import { GREY_BG, TEXT_BLACK, TEXT_DARK, SEVERITY, BEVEL_SUNKEN } from '../../theme';

export default function AlertsPanel({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div className="p-4 text-center text-sm" style={{ color: TEXT_BLACK }}>
        <div className="mx-4 mt-2 p-4" style={{ background: GREY_BG, boxShadow: BEVEL_SUNKEN }}>
          <p className="font-bold">No active weather alerts</p>
          <p className="text-xs mt-1" style={{ color: TEXT_DARK }}>
            Alerts are fetched from the National Weather Service
          </p>
        </div>
      </div>
    );
  }

  const extreme = alerts.filter((a) => a.severity === 'Extreme');
  const severe = alerts.filter((a) => a.severity === 'Severe');
  const moderate = alerts.filter((a) => a.severity === 'Moderate');
  const minor = alerts.filter((a) => a.severity === 'Minor');
  const other = alerts.filter(
    (a) => !['Extreme', 'Severe', 'Moderate', 'Minor'].includes(a.severity)
  );

  return (
    <div className="p-2 space-y-2 overflow-y-auto h-full" style={{ background: GREY_BG }}>
      <div className="text-xs px-1" style={{ color: TEXT_DARK }}>
        {alerts.length} active alert{alerts.length !== 1 ? 's' : ''}
      </div>

      {extreme.length > 0 && (
        <AlertSection label="EXTREME" alerts={extreme} color={SEVERITY.Extreme} />
      )}
      {severe.length > 0 && (
        <AlertSection label="SEVERE" alerts={severe} color={SEVERITY.Severe} />
      )}
      {moderate.length > 0 && (
        <AlertSection label="MODERATE" alerts={moderate} color={SEVERITY.Moderate} />
      )}
      {minor.length > 0 && (
        <AlertSection label="MINOR" alerts={minor} color={SEVERITY.Minor} />
      )}
      {other.length > 0 && (
        <AlertSection label="OTHER" alerts={other} color="#666" />
      )}
    </div>
  );
}

function AlertSection({ label, alerts, color }) {
  return (
    <div>
      <div
        className="text-xs font-bold mb-1 px-1"
        style={{ color }}
      >
        {label} ({alerts.length})
      </div>
      <div className="space-y-1">
        {alerts.map((alert, idx) => (
          <AlertCard key={alert.id || idx} alert={alert} />
        ))}
      </div>
    </div>
  );
}
