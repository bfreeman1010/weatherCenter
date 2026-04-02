import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const WMS_URL = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi';

// these are the Iowa Mesonet NEXRAD layers, oldest to newest
export const NEXRAD_FRAMES = [
  { layer: 'nexrad-n0q-900913-m30m', label: '-30 min' },
  { layer: 'nexrad-n0q-900913-m25m', label: '-25 min' },
  { layer: 'nexrad-n0q-900913-m20m', label: '-20 min' },
  { layer: 'nexrad-n0q-900913-m15m', label: '-15 min' },
  { layer: 'nexrad-n0q-900913-m10m', label: '-10 min' },
  { layer: 'nexrad-n0q-900913-m05m', label: '-5 min' },
  { layer: 'nexrad-n0q-900913', label: 'Current' },
];

export default function RadarLayer({ currentFrameIndex }) {
  const map = useMap();
  const layersRef = useRef([]);
  const activeIndexRef = useRef(null);

  // add all the radar frame layers to the map on first render (all invisible)
  useEffect(() => {
    const layers = NEXRAD_FRAMES.map(({ layer }) => {
      const wmsLayer = L.tileLayer.wms(WMS_URL, {
        layers: layer,
        format: 'image/png',
        transparent: true,
        opacity: 0,
        zIndex: 100,
        noWrap: true,
        bounds: [[20, -130], [55, -60]],
      });
      wmsLayer.addTo(map);
      return wmsLayer;
    });
    layersRef.current = layers;

    return () => {
      layers.forEach((l) => map.removeLayer(l));
      layersRef.current = [];
      activeIndexRef.current = null;
    };
  }, [map]);

  // hide the old frame, show the new one
  useEffect(() => {
    if (currentFrameIndex == null || layersRef.current.length === 0) return;

    if (activeIndexRef.current != null && activeIndexRef.current !== currentFrameIndex) {
      layersRef.current[activeIndexRef.current].setOpacity(0);
    }

    layersRef.current[currentFrameIndex].setOpacity(0.6);
    activeIndexRef.current = currentFrameIndex;
  }, [currentFrameIndex]);

  return null;
}
