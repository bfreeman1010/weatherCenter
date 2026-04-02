import React from 'react';

// one row in the resource table
function ResourceLink({ name, url, desc }) {
  return (
    <tr>
      <td>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#135997', fontWeight: 'bold', textDecoration: 'underline' }}
        >
          {name}
        </a>
      </td>
      <td style={{ fontSize: '11px' }}>{desc}</td>
    </tr>
  );
}

export default function LiveResources() {
  return (
    <div
      className="education-content"
      style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '13px', color: '#000', maxWidth: '900px', margin: '0 auto', background: '#e8e8e8', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf' }}
    >
      <div
        style={{
          background: '#135997',
          color: '#fff',
          padding: '4px 8px',
          fontWeight: 'bold',
          fontSize: '13px',
          textAlign: 'left',
          boxShadow: 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf',
        }}
      >
        Live Resources & Links
      </div>

      <div style={{ padding: '8px 16px', background: '#e8e8e8', borderBottom: '2px solid #808080', fontSize: '12px', color: '#000', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf' }}>
        Official sources for real time weather data, forecasts, and warnings. All links open in a new tab.
      </div>

      <div style={{ padding: '12px 16px', lineHeight: '1.6', background: '#fff', margin: '4px 8px', boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080' }}>

        {/* warnings & alerts */}
        <h4>Warnings & Active Alerts</h4>
        <table>
          <thead>
            <tr><th>Resource</th><th>Description</th></tr>
          </thead>
          <tbody>
            <ResourceLink
              name="NWS Active Alerts"
              url="https://www.weather.gov/alerts"
              desc="All active NWS watches, warnings, and advisories nationwide. Filterable by state and alert type."
            />
            <ResourceLink
              name="SPC Convective Outlooks"
              url="https://www.spc.noaa.gov/products/outlook/"
              desc="Day 1 8 severe weather outlooks. Shows risk areas for tornadoes, damaging winds, and large hail."
            />
            <ResourceLink
              name="SPC Mesoscale Discussions"
              url="https://www.spc.noaa.gov/products/md/"
              desc="Real time analysis of developing severe weather situations. Published when watches are being considered."
            />
            <ResourceLink
              name="SPC Watches"
              url="https://www.spc.noaa.gov/products/watch/"
              desc="Active tornado and severe thunderstorm watches with detailed threat parameters."
            />
            <ResourceLink
              name="SPC Storm Reports"
              url="https://www.spc.noaa.gov/climo/reports/today.html"
              desc="Today's confirmed reports of tornadoes, hail (1&quot;+), and damaging winds (58+ mph)."
            />
          </tbody>
        </table>

        {/* radar & satellite */}
        <h4>Radar & Satellite Imagery</h4>
        <table>
          <thead>
            <tr><th>Resource</th><th>Description</th></tr>
          </thead>
          <tbody>
            <ResourceLink
              name="NWS Enhanced Radar (RIDGE)"
              url="https://radar.weather.gov/"
              desc="Official NWS radar viewer with dual pol products, storm tracks, and warnings overlay."
            />
            <ResourceLink
              name="College of DuPage NEXLAB"
              url="https://weather.cod.edu/satrad/"
              desc="High-resolution radar, satellite, and composite imagery. Used by many meteorologists."
            />
            <ResourceLink
              name="Iowa Environmental Mesonet"
              url="https://mesonet.agron.iastate.edu/GIS/ridge.phtml"
              desc="NEXRAD radar archive and real time imagery. Source for this app's radar overlay."
            />
            <ResourceLink
              name="GOES-East Satellite"
              url="https://www.star.nesdis.noaa.gov/goes/conus.php?sat=G16"
              desc="Real time GOES-16 satellite imagery. Visible, infrared, and water vapor channels."
            />
            <ResourceLink
              name="GOES-West Satellite"
              url="https://www.star.nesdis.noaa.gov/goes/conus.php?sat=G18"
              desc="Real time GOES-18 satellite imagery for the western US and Pacific."
            />
          </tbody>
        </table>

        {/* tropical */}
        <h4>Tropical Weather</h4>
        <table>
          <thead>
            <tr><th>Resource</th><th>Description</th></tr>
          </thead>
          <tbody>
            <ResourceLink
              name="National Hurricane Center"
              url="https://www.nhc.noaa.gov/"
              desc="Official hurricane/tropical storm forecasts, track maps, intensity projections, and surge forecasts."
            />
            <ResourceLink
              name="NHC Tropical Outlook"
              url="https://www.nhc.noaa.gov/gtwo.php?basin=atlc"
              desc="5 day tropical weather outlook for the Atlantic basin. Updated every 6 hours."
            />
            <ResourceLink
              name="NHC Pacific Outlook"
              url="https://www.nhc.noaa.gov/gtwo.php?basin=epac"
              desc="5 day tropical weather outlook for the Eastern Pacific basin."
            />
            <ResourceLink
              name="Tropical Tidbits"
              url="https://www.tropicaltidbits.com/"
              desc="Model data, satellite imagery, and analysis for tropical systems. Excellent for track models."
            />
          </tbody>
        </table>

        {/* forecasts & models */}
        <h4>Forecasts & Models</h4>
        <table>
          <thead>
            <tr><th>Resource</th><th>Description</th></tr>
          </thead>
          <tbody>
            <ResourceLink
              name="NWS Forecast (by location)"
              url="https://forecast.weather.gov/"
              desc="Official 7 day point forecast for any US location. Click the map or enter coordinates."
            />
            <ResourceLink
              name="Weather Prediction Center"
              url="https://www.wpc.ncep.noaa.gov/"
              desc="Surface analysis, QPF (precipitation forecasts), winter storm outlooks, and excessive rainfall."
            />
            <ResourceLink
              name="SPC Mesoanalysis"
              url="https://www.spc.noaa.gov/exper/mesoanalysis/"
              desc="Real time mesoanalysis graphics: CAPE, shear, storm relative helicity, significant tornado parameter."
            />
            <ResourceLink
              name="Pivotal Weather"
              url="https://www.pivotalweather.com/"
              desc="Free model viewer for GFS, NAM, HRRR, and ECMWF. Used widely in weather community."
            />
            <ResourceLink
              name="College of DuPage Models"
              url="https://weather.cod.edu/forecast/"
              desc="Model forecast maps including HRRR (hourly resolution), NAM, GFS, and RAP."
            />
          </tbody>
        </table>

        {/* upper air & soundings */}
        <h4>Upper Air & Soundings</h4>
        <table>
          <thead>
            <tr><th>Resource</th><th>Description</th></tr>
          </thead>
          <tbody>
            <ResourceLink
              name="SPC Observed Soundings"
              url="https://www.spc.noaa.gov/exper/soundings/"
              desc="Latest upper air soundings (Skew T Log P diagrams) from rawinsonde stations. Shows CAPE, shear, LCL, etc."
            />
            <ResourceLink
              name="RAOB Soundings (U of Wyoming)"
              url="https://weather.uwyo.edu/upperair/sounding.html"
              desc="Raw sounding data and Skew T diagrams from the University of Wyoming. Archive available."
            />
            <ResourceLink
              name="SHARPpy"
              url="https://sharppy.github.io/SHARPpy/"
              desc="Open-source sounding analysis tool used by NWS forecasters and researchers."
            />
          </tbody>
        </table>

        {/* climate & records */}
        <h4>Climate Data & Records</h4>
        <table>
          <thead>
            <tr><th>Resource</th><th>Description</th></tr>
          </thead>
          <tbody>
            <ResourceLink
              name="NOAA Climate.gov"
              url="https://www.climate.gov"
              desc="Climate data, maps, and educational content. Climate monitoring and historical analysis."
            />
            <ResourceLink
              name="NOAA Storm Events Database"
              url="https://www.ncdc.noaa.gov/stormevents/"
              desc="Searchable database of all recorded severe weather events in the US since 1950."
            />
            <ResourceLink
              name="Historical Hurricane Tracks"
              url="https://coast.noaa.gov/hurricanes/"
              desc="Interactive map of all Atlantic and Pacific hurricane tracks since 1842."
            />
            <ResourceLink
              name="US Tornado Climatology"
              url="https://www.spc.noaa.gov/wcm/"
              desc="Tornado statistics by state, month, and year. Tornado Alley maps and trends."
            />
          </tbody>
        </table>

        {/* emergency info */}
        <h4>Emergency Information</h4>
        <table>
          <thead>
            <tr><th>Resource</th><th>Description</th></tr>
          </thead>
          <tbody>
            <ResourceLink
              name="Ready.gov"
              url="https://www.ready.gov/"
              desc="FEMA's emergency preparedness site. Checklists, plans, and guides for all hazard types."
            />
            <ResourceLink
              name="Red Cross Shelters"
              url="https://www.redcross.org/get-help/disaster-relief-and-recovery-services/find-an-open-shelter.html"
              desc="Find open emergency shelters near you during active disasters."
            />
            <ResourceLink
              name="NOAA Weather Radio"
              url="https://www.weather.gov/nwr/"
              desc="NOAA Weather Radio station locator and programming instructions."
            />
            <ResourceLink
              name="FEMA App"
              url="https://www.fema.gov/mobile-app"
              desc="Free app with alerts, safety tips, shelter locator, and disaster resource finder."
            />
          </tbody>
        </table>

        {/* find your local NWS office */}
        <h4>Find Your Local NWS Office</h4>
        <div style={{ background: '#e8e8e8', border: 'none', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf', padding: '8px 12px', margin: '8px 0' }}>
          <p>
            Each NWS Weather Forecast Office (WFO) covers a specific area and provides
            the most detailed local forecasts, warnings, and briefings. Find yours at:
          </p>
          <p style={{ marginTop: '6px' }}>
            <a
              href="https://www.weather.gov/srh/nwsoffices"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#135997', fontWeight: 'bold', fontSize: '14px' }}
            >
              weather.gov/srh/nwsoffices
            </a>
          </p>
          <p style={{ fontSize: '11px', marginTop: '4px', color: '#555' }}>
            Follow your local office on social media for the fastest updates during
            severe weather events. Local meteorologists often provide critical context
            that national products cannot.
          </p>
        </div>

      </div>

      <div style={{ padding: '8px 16px', fontSize: '10px', color: '#000', borderTop: 'none', margin: '4px 8px', background: '#fff', boxShadow: 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080' }}>
        <div style={{ fontWeight: 'bold', color: '#135997', marginBottom: '4px', fontSize: '11px' }}>
          Note
        </div>
        <p>
          All links point to official government resources or well-established community tools.
          This page is not affiliated with any of the linked services. Links verified as of 2024.
        </p>
      </div>
    </div>
  );
}
