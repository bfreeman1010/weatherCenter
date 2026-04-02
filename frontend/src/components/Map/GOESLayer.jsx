import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export const GOES_LAYERS = {
  'goes-east-visible': {
    url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi',
    layers: 'conus_ch02',
    label: 'GOES-East Visible (daytime only)',
  },
  'goes-east-ir': {
    url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_east.cgi',
    layers: 'conus_ch13',
    label: 'GOES-East Infrared',
  },
  'goes-west-visible': {
    url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_west.cgi',
    layers: 'conus_ch02',
    label: 'GOES-West Visible (daytime only)',
  },
  'goes-west-ir': {
    url: 'https://mesonet.agron.iastate.edu/cgi-bin/wms/goes_west.cgi',
    layers: 'conus_ch13',
    label: 'GOES-West Infrared',
  },
};

const REFRESH_INTERVAL = 2 * 60 * 1000; // grab fresh tiles every 2 min

export default function GOESLayer({ activeLayer }) {
  const map = useMap();
  const layerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    // tear down whatever layer was showing before
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
      layerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (!activeLayer || !GOES_LAYERS[activeLayer]) return;

    const config = GOES_LAYERS[activeLayer];

    function createLayer() {
      return L.tileLayer.wms(config.url, {
        layers: config.layers,
        format: 'image/png',
        transparent: true,
        opacity: 0.7,
        zIndex: 50,
        noWrap: true,
        bounds: [[20, -130], [55, -60]],
        // timestamp to bust the tile cache
        _ts: Date.now(),
      });
    }

    const wmsLayer = createLayer();
    wmsLayer.addTo(map);
    layerRef.current = wmsLayer;

    // swap in a fresh layer periodically so the imagery stays current
    intervalRef.current = setInterval(() => {
      const fresh = createLayer();
      fresh.addTo(map);
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
      layerRef.current = fresh;
    }, REFRESH_INTERVAL);

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
        layerRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [map, activeLayer]);

  return null;
}
