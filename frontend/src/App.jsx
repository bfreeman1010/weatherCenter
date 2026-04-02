import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import SearchBox from './components/SearchBox';
import { useWeatherData } from './hooks/useWeatherData';
import { useAlerts } from './hooks/useAlerts';
import { useRadar } from './hooks/useRadar';
import RadarLayout from './components/layouts/RadarLayout';
import FullPageLayout from './components/layouts/FullPageLayout';
import EducationPanel from './components/Education/EducationPanel';
import HistoricalStorms from './components/HistoricalStorms/HistoricalStorms';
import EmergencyPreparedness from './components/Preparedness/EmergencyPreparedness';
import LiveResources from './components/LiveResources/LiveResources';
import { weatherApi } from './services/api';
import { useToast } from './components/ui/ToastContext';
import PageMeta from './components/ui/PageMeta';
import MobileNav from './components/ui/MobileNav';
import { useIsMobile } from './hooks/useMediaQuery';
import WeatherTicker from './components/ui/WeatherTicker';
import LandingPage from './components/LandingPage';
import {
  BLUE_PRIMARY, BLUE_DARK, BLUE_ACTIVE,
  BEVEL_BLUE_RAISED, BEVEL_BLUE_SUNKEN,
} from './theme';

const BEVEL_RAISED = { border: 'none', boxShadow: BEVEL_BLUE_RAISED };
const BEVEL_SUNKEN = { border: 'none', boxShadow: BEVEL_BLUE_SUNKEN };

const ICON_MUTED = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const ICON_UNMUTED = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

// quick and dirty check — just a lat/lon box around the lower 48
function isInUS(lat, lon) {
  return lat >= 24 && lat <= 50 && lon >= -125 && lon <= -66;
}

const NAV_ITEMS = [
  { path: '/radar', label: 'Radar' },
  { path: '/education', label: 'Education' },
  { path: '/historical', label: 'Historical Storms' },
  { path: '/preparedness', label: 'Preparedness' },
  { path: '/resources', label: 'Live Resources' },
];


export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const isMobile = useIsMobile();

  const [weatherLocation, setWeatherLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [isUS, setIsUS] = useState(false);
  const [flyTo, setFlyTo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const ytPlayerRef = useRef(null);

  // background music via a hidden YouTube embed
  useEffect(() => {
    // load the YT player script if it isn't already on the page
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
    const initPlayer = () => {
      ytPlayerRef.current = new window.YT.Player('yt-bg-player', {
        videoId: 'j-prqnvaDgA',
        events: {
          onReady: (e) => {
            e.target.setVolume(50);
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            // loop it when the track ends
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.playVideo();
            }
          },
        },
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: 'j-prqnvaDgA',
        },
      });
    };
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const player = ytPlayerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  }, [isMuted]);
  const { currentWeather } = useWeatherData(
    weatherLocation?.lat,
    weatherLocation?.lon
  );
  const { alerts, connected } = useAlerts(
    weatherLocation?.lat,
    weatherLocation?.lon,
    null,
    isUS
  );
  const radar = useRadar();

  const handleMapClick = useCallback(async (lat, lon) => {
    setWeatherLocation({ lat, lon });
    setIsUS(isInUS(lat, lon));
    setLocationName(`${lat.toFixed(2)}, ${lon.toFixed(2)}`);
    try {
      const geo = await weatherApi.reverseGeocode(lat, lon);
      setLocationName(geo.name);
      setIsUS(geo.country_code === 'us');
    } catch {
      addToast('Could not determine location name.', 'info', 3000);
    }
  }, [addToast]);

  const handleSearchSelect = useCallback((lat, lon, name) => {
    setWeatherLocation({ lat, lon });
    setLocationName(name);
    setFlyTo({ lat, lon, zoom: 8 });
    setIsUS(isInUS(lat, lon));
  }, []);

  const isRadarPage = location.pathname === '/radar';
  const isLandingPage = location.pathname === '/';

  return (
    <div className="h-screen flex flex-col" style={{ background: '#f0f0f0' }}>
      <PageMeta />
      {/* offscreen YT player — just for the background music */}
      <div id="yt-bg-player" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }} />
      {/* top nav bar */}
      <header
        className="shrink-0 flex items-stretch z-20"
        style={{ background: BLUE_PRIMARY, borderBottom: `2px solid ${BLUE_DARK}`, height: '32px', overflow: 'hidden' }}
      >
        {isMobile ? (
          /* mobile: just logo + hamburger menu */
          <div className="flex items-center justify-between w-full px-3">
            {!isLandingPage && (
              <img
                src="/Logo.png"
                alt="Home"
                style={{ height: '28px', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
                style={{
                  background: BLUE_DARK,
                  ...BEVEL_RAISED,
                  color: '#fff',
                  padding: '3px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {isMuted ? ICON_MUTED : ICON_UNMUTED}
              </button>
              <MobileNav />
            </div>
          </div>
        ) : (
          <>
            {/* left side: logo + search box */}
            <div
              className="flex items-center gap-3 px-4"
              style={{ width: '380px', flexShrink: 0, whiteSpace: 'nowrap', overflow: 'hidden' }}
            >
              {!isLandingPage && (
                <img
                  src="/Logo.png"
                  alt="Home"
                  style={{ height: '32px', flexShrink: 0, cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                />
              )}
              {isRadarPage && <SearchBox onSelect={handleSearchSelect} />}
            </div>

            {/* nav buttons — stays centered between the two spacers */}
            <div className="flex-1 flex items-stretch justify-center" style={{ whiteSpace: 'nowrap' }}>
              {NAV_ITEMS.map((tab) => (
                <button
                  key={tab.path}
                  className="px-2 text-xs font-bold flex items-center"
                  style={{
                    background: location.pathname === tab.path ? BLUE_ACTIVE : BLUE_DARK,
                    color: '#fff',
                    ...(location.pathname === tab.path ? BEVEL_SUNKEN : BEVEL_RAISED),
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => navigate(tab.path)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* right spacer + mute btn (same width as left to keep nav centered) */}
            <div className="flex items-stretch justify-end" style={{ width: '380px', flexShrink: 0 }}>
              <button
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
                style={{
                  background: BLUE_DARK,
                  ...BEVEL_RAISED,
                  color: '#fff',
                  padding: '0 10px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {isMuted ? ICON_MUTED : ICON_UNMUTED}
                {isMuted ? 'Muted' : 'Playing'}
              </button>
            </div>
          </>
        )}
      </header>

      {/* page routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/radar"
          element={
            <RadarLayout
              location={weatherLocation}
              locationName={locationName}
              isUS={isUS}
              flyTo={flyTo}
              currentWeather={currentWeather}
              alerts={alerts}
              radar={radar}
              onMapClick={handleMapClick}
              onSearchSelect={handleSearchSelect}
              isMobile={isMobile}
            />
          }
        />
        <Route path="/education" element={<FullPageLayout><EducationPanel /></FullPageLayout>} />
        <Route path="/historical" element={<FullPageLayout><HistoricalStorms /></FullPageLayout>} />
        <Route path="/preparedness" element={<FullPageLayout><EmergencyPreparedness /></FullPageLayout>} />
        <Route path="/resources" element={<FullPageLayout><LiveResources /></FullPageLayout>} />
        <Route path="*" element={<Navigate to="/radar" replace />} />
      </Routes>
      <WeatherTicker />
    </div>
  );
}
