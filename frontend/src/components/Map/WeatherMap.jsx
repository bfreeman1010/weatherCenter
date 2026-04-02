import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import RadarLayer from './RadarLayer';
import AlertsLayer from './AlertsLayer';
import MapClickHandler from './MapClickHandler';
import GOESLayer from './GOESLayer';
import HeatmapLayer from './HeatmapLayer';

export default function WeatherMap({
  onLocationSelect,
  flyTo,
  radarFrameIndex,
  alerts,
  activeGOESLayer,
  radarVisible = true,
  tempGridData,
  heatmapEnabled = false,
}) {
  return (
    <MapContainer
      center={[39, -95]}
      zoom={4}
      zoomControl={false}
      minZoom={3}
      maxBounds={[[15, -140], [60, -50]]}
      maxBoundsViscosity={1.0}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <ZoomControl position="topright" />

      {/* base map tiles — OSM, same look as weather.gov */}
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={19}
        noWrap={true}
      />

      {/* temp heatmap sits underneath satellite and radar */}
      <HeatmapLayer gridData={tempGridData} enabled={heatmapEnabled} />

      {/* GOES satellite layer, renders below radar */}
      <GOESLayer activeLayer={activeGOESLayer} />

      {/* NEXRAD radar overlay */}
      {radarVisible && <RadarLayer currentFrameIndex={radarFrameIndex} />}

      {/* handles map clicks and search fly-to */}
      <MapClickHandler onLocationSelect={onLocationSelect} flyTo={flyTo} />

      {/* NWS alert polygons */}
      <AlertsLayer alerts={alerts} />

    </MapContainer>
  );
}
