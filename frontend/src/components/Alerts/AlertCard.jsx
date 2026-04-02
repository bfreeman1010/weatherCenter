import React, { useState } from 'react';
import { SEVERITY, TEXT_BLACK, TEXT_DARK, GREY_DARK, BEVEL_RAISED, BEVEL_SUNKEN } from '../../theme';

export default function AlertCard({ alert }) {
  const [expanded, setExpanded] = useState(false);

  const color = SEVERITY[alert.severity] || '#666';

  return (
    <div
      className="cursor-pointer p-2"
      style={{
        background: '#e8e8e8',
        boxShadow: BEVEL_RAISED,
        borderLeft: `4px solid ${color}`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-bold text-xs" style={{ color }}>
            {alert.event}
          </div>
          <div className="text-xs mt-0.5" style={{ color: TEXT_BLACK }}>
            {alert.severity} | {alert.urgency} | {alert.certainty}
          </div>
        </div>
        <span className="text-xs ml-2" style={{ color: TEXT_BLACK }}>
          {expanded ? '[-]' : '[+]'}
        </span>
      </div>

      <div className="text-xs mt-1" style={{ color: TEXT_BLACK }}>
        {alert.headline}
      </div>

      {alert.area_desc && (
        <div className="text-xs mt-1" style={{ color: TEXT_DARK }}>
          {alert.area_desc}
        </div>
      )}

      {expanded && (
        <div className="mt-2 pt-2" style={{ borderTop: `2px solid ${GREY_DARK}` }}>
          <div
            className="text-xs leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto"
            style={{ color: TEXT_BLACK, boxShadow: BEVEL_SUNKEN, padding: '4px' }}
          >
            {alert.description}
          </div>
          {alert.instruction && (
            <div
              className="mt-2 p-2 text-xs"
              style={{ boxShadow: BEVEL_SUNKEN, color: TEXT_BLACK }}
            >
              <strong>Instructions:</strong> {alert.instruction}
            </div>
          )}
          {alert.onset && (
            <div className="text-xs mt-2" style={{ color: TEXT_BLACK }}>
              Onset: {new Date(alert.onset).toLocaleString()}
            </div>
          )}
          {alert.expires && (
            <div className="text-xs" style={{ color: TEXT_BLACK }}>
              Expires: {new Date(alert.expires).toLocaleString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
