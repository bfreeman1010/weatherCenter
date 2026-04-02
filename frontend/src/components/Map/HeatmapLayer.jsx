import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { CONUS_BORDER } from '../../data/usBorder';

// color stops: maps temperature (F) to a color from purple (cold) to magenta (hot)
const COLOR_STOPS = [
  { temp: -20, r: 120, g: 0, b: 180 },   // deep purple
  { temp: 0, r: 80, g: 40, b: 200 },      // purple-blue
  { temp: 10, r: 40, g: 80, b: 220 },     // blue
  { temp: 20, r: 30, g: 140, b: 230 },    // light blue
  { temp: 32, r: 50, g: 200, b: 220 },    // cyan (freezing)
  { temp: 40, r: 60, g: 200, b: 140 },    // teal
  { temp: 50, r: 80, g: 200, b: 80 },     // green
  { temp: 60, r: 160, g: 210, b: 50 },    // yellow-green
  { temp: 70, r: 240, g: 220, b: 40 },    // yellow
  { temp: 80, r: 255, g: 165, b: 20 },    // orange
  { temp: 90, r: 240, g: 80, b: 20 },     // red-orange
  { temp: 100, r: 220, g: 30, b: 30 },    // red
  { temp: 110, r: 180, g: 20, b: 100 },   // magenta
  { temp: 120, r: 150, g: 10, b: 130 },   // deep magenta
];

function tempToColor(tempF) {
  if (tempF == null) return null;

  // if it's off the ends of our scale, just use the extreme color
  if (tempF <= COLOR_STOPS[0].temp) {
    const s = COLOR_STOPS[0];
    return { r: s.r, g: s.g, b: s.b };
  }
  if (tempF >= COLOR_STOPS[COLOR_STOPS.length - 1].temp) {
    const s = COLOR_STOPS[COLOR_STOPS.length - 1];
    return { r: s.r, g: s.g, b: s.b };
  }

  // blend between the two nearest color stops
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const lo = COLOR_STOPS[i];
    const hi = COLOR_STOPS[i + 1];
    if (tempF >= lo.temp && tempF <= hi.temp) {
      const t = (tempF - lo.temp) / (hi.temp - lo.temp);
      return {
        r: Math.round(lo.r + t * (hi.r - lo.r)),
        g: Math.round(lo.g + t * (hi.g - lo.g)),
        b: Math.round(lo.b + t * (hi.b - lo.b)),
      };
    }
  }
  return { r: 128, g: 128, b: 128 };
}

function bilinearInterpolate(gridData, lat, lon) {
  const { lat_min, lat_max, lon_min, lon_max, nx, ny, temps } = gridData;

  const gi = ((lon - lon_min) / (lon_max - lon_min)) * (nx - 1);
  const gj = ((lat_max - lat) / (lat_max - lat_min)) * (ny - 1);

  if (gi < 0 || gi >= nx - 1 || gj < 0 || gj >= ny - 1) return null;

  const i0 = Math.floor(gi);
  const j0 = Math.floor(gj);
  const fx = gi - i0;
  const fy = gj - j0;

  const t00 = temps[j0 * nx + i0];
  const t10 = temps[j0 * nx + (i0 + 1)];
  const t01 = temps[(j0 + 1) * nx + i0];
  const t11 = temps[(j0 + 1) * nx + (i0 + 1)];

  if (t00 == null || t10 == null || t01 == null || t11 == null) return null;

  return (1 - fx) * (1 - fy) * t00 + fx * (1 - fy) * t10 +
         (1 - fx) * fy * t01 + fx * fy * t11;
}

function renderHeatmap(map, gridData, canvas) {
  const size = map.getSize();
  canvas.width = size.x;
  canvas.height = size.y;
  const ctx = canvas.getContext('2d');

  // render at half-res then scale up — way faster than per-pixel at full size
  const step = 2;
  const smallW = Math.ceil(size.x / step);
  const smallH = Math.ceil(size.y / step);
  const smallCanvas = document.createElement('canvas');
  smallCanvas.width = smallW;
  smallCanvas.height = smallH;
  const smallCtx = smallCanvas.getContext('2d');
  const smallData = smallCtx.createImageData(smallW, smallH);
  const sd = smallData.data;

  for (let sy = 0; sy < smallH; sy++) {
    for (let sx = 0; sx < smallW; sx++) {
      const px = sx * step;
      const py = sy * step;
      const latlng = map.containerPointToLatLng([px, py]);
      const temp = bilinearInterpolate(gridData, latlng.lat, latlng.lng);

      const idx = (sy * smallW + sx) * 4;
      if (temp != null) {
        const c = tempToColor(temp);
        sd[idx] = c.r;
        sd[idx + 1] = c.g;
        sd[idx + 2] = c.b;
        sd[idx + 3] = 160;
      } else {
        sd[idx + 3] = 0;
      }
    }
  }

  smallCtx.putImageData(smallData, 0, 0);

  // clip to the CONUS outline so we don't paint over the ocean
  ctx.save();
  ctx.beginPath();
  for (let i = 0; i < CONUS_BORDER.length; i++) {
    const pt = map.latLngToContainerPoint(CONUS_BORDER[i]);
    if (i === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  }
  ctx.closePath();
  ctx.clip();

  // stretch the small canvas up to fill the clipped area
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(smallCanvas, 0, 0, smallW, smallH, 0, 0, size.x, size.y);

  ctx.restore();
}

export default function HeatmapLayer({ gridData, enabled = true }) {
  const map = useMap();
  const layerRef = useRef(null);

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }

    if (!enabled || !gridData) return;

    const CanvasOverlay = L.Layer.extend({
      onAdd(m) {
        this._map = m;
        this._canvas = document.createElement('canvas');
        this._canvas.style.position = 'absolute';
        this._canvas.style.pointerEvents = 'none';
        m.getPane('overlayPane').appendChild(this._canvas);
        this._render();
        m.on('moveend zoomend resize', this._render, this);
      },

      onRemove(m) {
        m.off('moveend zoomend resize', this._render, this);
        if (this._canvas && this._canvas.parentNode) {
          this._canvas.parentNode.removeChild(this._canvas);
        }
      },

      _render() {
        const m = this._map;
        if (!m || !this._canvas) return;

        const topLeft = m.containerPointToLayerPoint([0, 0]);
        this._canvas.style.transform = `translate(${topLeft.x}px, ${topLeft.y}px)`;

        renderHeatmap(m, gridData, this._canvas);
      },
    });

    const overlay = new CanvasOverlay();
    overlay.addTo(map);
    layerRef.current = overlay;

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
    };
  }, [map, gridData, enabled]);

  return null;
}

// Export for legend
export { COLOR_STOPS, tempToColor };
