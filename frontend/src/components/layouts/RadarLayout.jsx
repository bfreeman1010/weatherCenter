import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '../../services/api';
import WeatherMap from '../Map/WeatherMap';
import WeatherDashboard from '../Dashboard/WeatherDashboard';
import AlertsPanel from '../Alerts/AlertsPanel';
import RadarLegend from '../Map/RadarLegend';
import WeatherSkeleton from '../ui/WeatherSkeleton';
import MobileDrawer from '../ui/MobileDrawer';
import LayerControls from '../Map/LayerControls';
import TempLegend from '../Map/TempLegend';
import {
  GREY_BG, GREY_DARK, TEXT_BLACK, TEXT_DARK, TEXT_RED, BLUE_PRIMARY,
  BEVEL_RAISED, BEVEL_SUNKEN, BEVEL_BLUE_RAISED, SEVERITY,
} from '../../theme';

function SidebarContent({ location, locationName, isUS, currentWeather, alerts, sidebarTab, setSidebarTab }) {
  return (
    <>
      {/* weather / alerts tab toggle */}
      <div className="flex" style={{ borderBottom: `2px solid ${GREY_DARK}` }}>
        <button
          className="flex-1 py-2 text-xs font-bold text-center"
          style={{
            background: sidebarTab === 'dashboard' ? BLUE_PRIMARY : GREY_BG,
            color: sidebarTab === 'dashboard' ? '#fff' : TEXT_BLACK,
            border: 'none',
            boxShadow: sidebarTab === 'dashboard' ? BEVEL_BLUE_RAISED : BEVEL_RAISED,
          }}
          onClick={() => setSidebarTab('dashboard')}
        >
          Weather
        </button>
        <button
          className="flex-1 py-2 text-xs font-bold text-center"
          style={{
            background: sidebarTab === 'alerts' ? BLUE_PRIMARY : GREY_BG,
            color: sidebarTab === 'alerts' ? '#fff' : TEXT_BLACK,
            border: 'none',
            boxShadow: sidebarTab === 'alerts' ? BEVEL_BLUE_RAISED : BEVEL_RAISED,
          }}
          onClick={() => setSidebarTab('alerts')}
        >
          Alerts {alerts.length > 0 && `(${alerts.length})`}
        </button>
      </div>

      {/* scrolling alert ticker — only shows on weather tab for US locations */}
      {sidebarTab === 'dashboard' && isUS && alerts.length > 0 && (
        <div
          className="cursor-pointer"
          style={{
            background: GREY_BG,
            boxShadow: BEVEL_SUNKEN,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            height: '26px',
            lineHeight: '26px',
            fontSize: '12px',
            color: TEXT_BLACK,
            flexShrink: 0,
            margin: '2px 4px',
          }}
          onClick={() => setSidebarTab('alerts')}
        >
          <div className="alert-ticker">
            <span className="alert-ticker-content">
              {alerts.map((a, i) => (
                <span key={i}>
                  <strong style={{
                    color: (a.severity === 'Extreme' || a.severity === 'Severe') ? SEVERITY.Extreme : SEVERITY.Moderate,
                  }}>
                    {a.event}
                  </strong>
                  {a.areaDesc ? ` — ${a.areaDesc}` : ''}
                  {i < alerts.length - 1 && (
                    <span style={{ margin: '0 20px', color: '#999' }}>|||</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" style={{ background: GREY_BG }}>
        {sidebarTab === 'dashboard' && (
          !location ? (
            <div className="p-6 text-center" style={{ color: TEXT_BLACK }}>
              <div className="mx-4 mt-2 p-4" style={{ background: GREY_BG, boxShadow: BEVEL_SUNKEN }}>
                <p className="font-bold text-sm">
                  Select a Location
                </p>
                <p className="text-xs mt-1" style={{ color: TEXT_DARK }}>
                  Click anywhere on the map or use the search box to view weather data.
                </p>
              </div>
            </div>
          ) : currentWeather.isLoading ? (
            <WeatherSkeleton />
          ) : currentWeather.isError ? (
            <div className="p-6 text-center" style={{ color: TEXT_BLACK }}>
              <div className="mx-4 mt-2 p-4" style={{ background: GREY_BG, boxShadow: BEVEL_SUNKEN }}>
                <p className="font-bold text-sm" style={{ color: TEXT_RED }}>
                  Failed to Load Weather
                </p>
                <p className="text-xs mt-1" style={{ color: TEXT_DARK }}>
                  Could not fetch weather data. Check your connection and try again.
                </p>
                <button
                  className="mt-3 px-3 py-1 text-xs font-bold"
                  style={{ border: 'none', boxShadow: BEVEL_RAISED, background: GREY_BG, color: TEXT_BLACK }}
                  onClick={() => currentWeather.refetch()}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <WeatherDashboard
              weatherData={currentWeather.data}
              locationName={locationName}
            />
          )
        )}
        {sidebarTab === 'alerts' && (
          isUS ? (
            <AlertsPanel alerts={alerts} />
          ) : (
            <div className="p-6 text-center" style={{ color: TEXT_BLACK }}>
              <div className="mx-4 mt-2 p-4" style={{ background: GREY_BG, boxShadow: BEVEL_SUNKEN }}>
                <p className="font-bold text-sm">
                  Alerts Unavailable
                </p>
                <p className="text-xs mt-1" style={{ color: TEXT_DARK }}>
                  NWS weather alerts are only available for US locations.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default function RadarLayout({
  location,
  locationName,
  isUS,
  flyTo,
  currentWeather,
  alerts,
  radar,
  onMapClick,
  isMobile,
}) {
  const [sidebarTab, setSidebarTab] = useState('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeGOESLayer, setActiveGOESLayer] = useState(null);
  const [radarVisible, setRadarVisible] = useState(true);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);

  const { data: tempGridData } = useQuery({
    queryKey: ['temperature-grid'],
    queryFn: () => weatherApi.getTemperatureGrid(),
    staleTime: 20 * 1000,
    refetchInterval: heatmapEnabled ? 30 * 1000 : false,
    enabled: heatmapEnabled,
  });

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* the map takes up all remaining space */}
      <main className="flex-1 relative" style={isMobile ? {} : { borderRight: `2px solid ${GREY_DARK}` }}>
        <WeatherMap
          center={[39, -95]}
          zoom={4}
          onLocationSelect={onMapClick}
          flyTo={flyTo}
          radarFrameIndex={radar.currentFrameIndex}
          alerts={alerts}
          activeGOESLayer={activeGOESLayer}
          radarVisible={radarVisible}
          tempGridData={tempGridData}
          heatmapEnabled={heatmapEnabled}
        />

        <LayerControls
          activeGOESLayer={activeGOESLayer}
          onGOESLayerChange={setActiveGOESLayer}
          radarVisible={radarVisible}
          onRadarVisibleChange={setRadarVisible}
          heatmapEnabled={heatmapEnabled}
          onHeatmapEnabledChange={setHeatmapEnabled}
        />

        <RadarLegend />
        <TempLegend visible={heatmapEnabled} />

        {/* play/pause, prev/next, speed — sits at bottom center of map */}
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-[1000] flex items-center gap-2 px-3 py-1.5"
          style={{ background: GREY_BG, border: 'none', boxShadow: BEVEL_RAISED, fontSize: '12px' }}
        >
          <button
            className="px-2 py-0.5"
            style={{ border: 'none', boxShadow: BEVEL_RAISED, background: GREY_BG }}
            onClick={radar.prevFrame}
          >
            &laquo; Prev
          </button>
          <button
            className="px-2 py-0.5 font-bold"
            style={{
              border: 'none',
              boxShadow: BEVEL_BLUE_RAISED,
              background: radar.isPlaying ? TEXT_RED : '#006600',
              color: '#fff',
            }}
            onClick={() => radar.setIsPlaying(!radar.isPlaying)}
          >
            {radar.isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            className="px-2 py-0.5"
            style={{ border: 'none', boxShadow: BEVEL_RAISED, background: GREY_BG }}
            onClick={radar.nextFrame}
          >
            Next &raquo;
          </button>

          <select
            className="px-1 py-0.5"
            style={{ border: 'none', boxShadow: BEVEL_SUNKEN, background: '#fff', fontSize: '11px' }}
            value={radar.animationSpeed}
            onChange={(e) => radar.setAnimationSpeed(Number(e.target.value))}
          >
            <option value={1000}>0.5x</option>
            <option value={500}>1x</option>
            <option value={250}>2x</option>
            <option value={100}>5x</option>
          </select>

          <span style={{ color: '#555', fontWeight: radar.currentLabel === 'Current' ? 'bold' : 'normal' }}>
            {radar.currentLabel}
          </span>
          <span style={{ color: '#999' }}>
            {radar.currentFrameIndex + 1}/{radar.frameCount}
          </span>
        </div>

        {/* mobile: tap this to slide up the weather panel */}
        {isMobile && (
          <button
            className="absolute top-2 right-2 z-[1000] px-3 py-1.5 text-xs font-bold"
            style={{
              background: BLUE_PRIMARY,
              color: '#fff',
              border: 'none',
              boxShadow: BEVEL_BLUE_RAISED,
            }}
            onClick={() => setDrawerOpen(true)}
          >
            Weather Data
          </button>
        )}
      </main>

      {/* sidebar — desktop only */}
      {!isMobile && (
        <aside className="w-96 shrink-0 flex flex-col overflow-hidden" style={{ background: GREY_BG }}>
          <SidebarContent
            location={location}
            locationName={locationName}
            isUS={isUS}
            currentWeather={currentWeather}
            alerts={alerts}
            sidebarTab={sidebarTab}
            setSidebarTab={setSidebarTab}
          />
        </aside>
      )}

      {/* bottom drawer — mobile only */}
      {isMobile && (
        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <SidebarContent
            location={location}
            locationName={locationName}
            isUS={isUS}
            currentWeather={currentWeather}
            alerts={alerts}
            sidebarTab={sidebarTab}
            setSidebarTab={setSidebarTab}
          />
        </MobileDrawer>
      )}
    </div>
  );
}
