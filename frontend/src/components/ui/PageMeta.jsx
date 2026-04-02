import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const PAGE_META = {
  '/': {
    title: 'weatherCenter',
    description: 'NWS style weather radar and severe weather intelligence.',
  },
  '/radar': {
    title: 'Live Radar | weatherCenter',
    description: 'Real time NEXRAD weather radar with NWS alerts, severe weather analysis, and interactive map.',
  },
  '/education': {
    title: 'Weather Education | weatherCenter',
    description: 'Learn about severe weather types, storm structure, atmospheric dynamics, and meteorological concepts.',
  },
  '/historical': {
    title: 'Historical Storms | weatherCenter',
    description: 'Explore notable historical storms including hurricanes, tornadoes, and other extreme weather events.',
  },
  '/preparedness': {
    title: 'Emergency Preparedness | weatherCenter',
    description: 'Emergency preparedness guides, safety plans, and survival kits for severe weather events.',
  },
  '/resources': {
    title: 'Live Resources | weatherCenter',
    description: 'Links to NWS, SPC, FEMA, and other live weather monitoring and emergency resources.',
  },
};

export default function PageMeta() {
  const { pathname } = useLocation();
  const meta = PAGE_META[pathname] || PAGE_META['/'];

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
    </Helmet>
  );
}
