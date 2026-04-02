import { useState } from 'react';
import { GOES_LAYERS } from './GOESLayer';
import { GREY_BG, GREY_DARK, TEXT_BLACK, BLUE_PRIMARY, BEVEL_RAISED, BEVEL_BLUE_RAISED } from '../../theme';

export default function LayerControls({ activeGOESLayer, onGOESLayerChange, radarVisible, onRadarVisibleChange, heatmapEnabled, onHeatmapEnabledChange }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="absolute top-2 left-2 z-[1000]"
      style={{
        background: GREY_BG,
        boxShadow: BEVEL_RAISED,
        fontSize: '11px',
        maxWidth: '180px',
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="px-2 py-1 font-bold w-full text-left"
        style={{
          background: BLUE_PRIMARY,
          color: '#fff',
          fontSize: '11px',
          border: 'none',
          boxShadow: BEVEL_BLUE_RAISED,
        }}
      >
        Layers {expanded ? '[-]' : '[+]'}
      </button>

      {expanded && (
        <div className="p-2 space-y-2">
          <div>
            <div className="font-bold" style={{ color: TEXT_BLACK, borderBottom: `2px solid ${GREY_DARK}`, paddingBottom: '2px', marginBottom: '2px' }}>
              Radar
            </div>
            <label className="flex items-center gap-1 cursor-pointer" style={{ color: TEXT_BLACK }}>
              <input type="checkbox" checked={radarVisible} onChange={(e) => onRadarVisibleChange(e.target.checked)} />
              <span>NEXRAD Reflectivity</span>
            </label>
          </div>

          <div>
            <div className="font-bold" style={{ color: TEXT_BLACK, borderBottom: `2px solid ${GREY_DARK}`, paddingBottom: '2px', marginBottom: '2px' }}>
              Temperature
            </div>
            <label className="flex items-center gap-1 cursor-pointer" style={{ color: TEXT_BLACK }}>
              <input type="checkbox" checked={heatmapEnabled} onChange={(e) => onHeatmapEnabledChange(e.target.checked)} />
              <span>Heat Map</span>
            </label>
          </div>

          <div>
            <div className="font-bold" style={{ color: TEXT_BLACK, borderBottom: `2px solid ${GREY_DARK}`, paddingBottom: '2px', marginBottom: '2px' }}>
              GOES Satellite
            </div>
            <label className="flex items-center gap-1 cursor-pointer" style={{ color: TEXT_BLACK }}>
              <input type="radio" name="goes" value=""
                checked={!activeGOESLayer} onChange={() => onGOESLayerChange(null)} />
              <span>Off</span>
            </label>
            {Object.entries(GOES_LAYERS).map(([key, config]) => (
              <label key={key} className="flex items-center gap-1 cursor-pointer" style={{ color: TEXT_BLACK }}>
                <input type="radio" name="goes" value={key}
                  checked={activeGOESLayer === key}
                  onChange={() => onGOESLayerChange(key)} />
                <span>{config.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
