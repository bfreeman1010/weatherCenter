import React from 'react';
import { Polygon, Popup } from 'react-leaflet';

export default function AlertsLayer({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <>
      {alerts.map((alert, idx) => {
        if (!alert.polygon || alert.polygon.length === 0) return null;

        // GeoJSON is [lon, lat] but Leaflet wants [lat, lon], so flip em
        const positions = alert.polygon[0].map(coord => [coord[1], coord[0]]);

        const color = alert.color || '#808080';

        return (
          <Polygon
            key={alert.id || idx}
            positions={positions}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.15,
              weight: 2,
              dashArray: alert.severity === 'Extreme' ? null : '5,5',
            }}
          >
            <Popup>
              <div className="text-sm max-w-xs" style={{ color: '#000' }}>
                <div className="font-bold text-base" style={{ color }}>
                  {alert.event}
                </div>
                <div className="mt-1 text-xs" style={{ color: '#444' }}>
                  {alert.severity} | {alert.urgency} | {alert.certainty}
                </div>
                <div className="mt-2 text-xs leading-relaxed" style={{ color: '#000' }}>
                  {alert.headline}
                </div>
                {alert.instruction && (
                  <div className="mt-2 text-xs font-medium" style={{ color: '#000', borderTop: '2px solid #808080', paddingTop: '4px' }}>
                    {alert.instruction.slice(0, 200)}
                    {alert.instruction.length > 200 ? '...' : ''}
                  </div>
                )}
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}
