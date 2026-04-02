import { useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useRef } from 'react';

// click anywhere on the map to select a location, or fly to a search result
export default function MapClickHandler({ onLocationSelect, flyTo }) {
  const map = useMap();
  const flyToRef = useRef(flyTo);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });

  // pan the map over when a search result comes in
  useEffect(() => {
    if (flyTo && (flyTo.lat !== flyToRef.current?.lat || flyTo.lon !== flyToRef.current?.lon)) {
      map.flyTo([flyTo.lat, flyTo.lon], flyTo.zoom, { duration: 1.5 });
    }
    flyToRef.current = flyTo;
  }, [map, flyTo]);

  return null;
}
