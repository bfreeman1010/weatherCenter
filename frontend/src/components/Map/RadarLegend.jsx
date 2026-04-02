import React from 'react';
import { GREY_BG, TEXT_BLACK, TEXT_DARK, BLUE_PRIMARY, BEVEL_RAISED, BEVEL_SUNKEN, BEVEL_BLUE_RAISED, GREY_DARK } from '../../theme';

const LEGEND_ITEMS = [
  { dbz: '75', color: '#fdfdfd', desc: 'Giant hail, violent tornado possible' },
  { dbz: '70', color: '#9854c6', desc: 'Large hail likely (>2 in)' },
  { dbz: '65', color: '#f800fd', desc: 'Hail likely, severe thunderstorm' },
  { dbz: '60', color: '#bc0000', desc: 'Hail possible, damaging winds' },
  { dbz: '55', color: '#d40000', desc: 'Very heavy rain (~2+ in/hr)' },
  { dbz: '50', color: '#fd0000', desc: 'Heavy rain, flooding risk' },
  { dbz: '45', color: '#fd9500', desc: 'Heavy rain (~1 in/hr)' },
  { dbz: '40', color: '#e5bc00', desc: 'Moderate rain (~0.5 in/hr)' },
  { dbz: '35', color: '#fdf802', desc: 'Moderate rain (~0.25 in/hr)' },
  { dbz: '30', color: '#008e00', desc: 'Light rain (~0.1 in/hr)' },
  { dbz: '25', color: '#01c501', desc: 'Light rain or drizzle' },
  { dbz: '20', color: '#02fd02', desc: 'Drizzle or light snow' },
  { dbz: '15', color: '#0300f4', desc: 'Mist, light virga' },
  { dbz: '10', color: '#019ff4', desc: 'Barely detectable precip' },
  { dbz: '5',  color: '#04e9e7', desc: 'Trace / clouds only' },
];

export default function RadarLegend() {
  return (
    <div
      className="absolute bottom-12 left-2 z-[1000]"
      style={{
        background: GREY_BG,
        boxShadow: BEVEL_RAISED,
        fontSize: '11px',
        fontFamily: '"Courier New", Courier, monospace',
        width: '260px',
      }}
    >
      <div
        style={{
          background: BLUE_PRIMARY,
          color: '#fff',
          fontWeight: 'bold',
          padding: '4px 6px',
          fontSize: '11px',
          textAlign: 'center',
          boxShadow: BEVEL_BLUE_RAISED,
        }}
      >
        NEXRAD Base Reflectivity (dBZ)
      </div>
      <div style={{ padding: '4px 6px', boxShadow: BEVEL_SUNKEN, margin: '3px' }}>
        {LEGEND_ITEMS.map((item) => (
          <div
            key={item.dbz}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              lineHeight: '15px',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '11px',
                background: item.color,
                boxShadow: BEVEL_SUNKEN,
                flexShrink: 0,
              }}
            />
            <span style={{ color: TEXT_BLACK, width: '22px', textAlign: 'right', fontWeight: 'bold', flexShrink: 0 }}>
              {item.dbz}
            </span>
            <span style={{ color: TEXT_BLACK, fontSize: '10px' }}>{item.desc}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: '3px 6px',
          fontSize: '9px',
          color: TEXT_DARK,
          borderTop: `2px solid ${GREY_DARK}`,
        }}
      >
        dBZ = decibels of reflectivity. Higher values = stronger precipitation or hail.
      </div>
    </div>
  );
}
