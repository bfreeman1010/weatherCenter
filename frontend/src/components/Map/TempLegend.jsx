import { COLOR_STOPS } from './HeatmapLayer';
import { GREY_BG, TEXT_BLACK, BLUE_PRIMARY, BEVEL_RAISED, BEVEL_SUNKEN, BEVEL_BLUE_RAISED } from '../../theme';

export default function TempLegend({ visible }) {
  if (!visible) return null;

  return (
    <div
      className="absolute bottom-14 right-2 z-[1000]"
      style={{
        background: GREY_BG,
        boxShadow: BEVEL_RAISED,
        fontSize: '10px',
      }}
    >
      <div
        className="font-bold"
        style={{
          background: BLUE_PRIMARY,
          color: '#fff',
          padding: '3px 6px',
          fontSize: '10px',
          boxShadow: BEVEL_BLUE_RAISED,
        }}
      >
        Temperature (°F)
      </div>
      <div style={{ padding: '4px 6px', boxShadow: BEVEL_SUNKEN, margin: '3px' }}>
        {COLOR_STOPS.filter((_, i) => i % 2 === 0).reverse().map((stop) => (
          <div key={stop.temp} className="flex items-center gap-1">
            <div
              style={{
                width: '16px',
                height: '10px',
                background: `rgb(${stop.r},${stop.g},${stop.b})`,
                boxShadow: BEVEL_SUNKEN,
              }}
            />
            <span style={{ color: TEXT_BLACK }}>{stop.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
