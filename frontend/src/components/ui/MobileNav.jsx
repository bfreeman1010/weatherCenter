import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/radar', label: 'Radar' },
  { path: '/education', label: 'Education' },
  { path: '/historical', label: 'Historical Storms' },
  { path: '/preparedness', label: 'Preparedness' },
  { path: '/resources', label: 'Live Resources' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ position: 'relative' }}>
      {/* the hamburger (or X when open) */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 20,
          cursor: 'pointer',
          padding: '4px 8px',
          lineHeight: 1,
        }}
      >
        {open ? 'X' : '\u2630'}
      </button>

      {/* full-width dropdown when open */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 44,
            left: 0,
            right: 0,
            background: '#0d3d6e',
            borderBottom: '2px solid #0a2a4a',
            zIndex: 1200,
          }}
        >
          {NAV_ITEMS.map(tab => (
            <button
              key={tab.path}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px 16px',
                textAlign: 'left',
                background: location.pathname === tab.path ? '#0a2a4a' : '#0d3d6e',
                color: '#fff',
                border: 'none',
                boxShadow: location.pathname === tab.path
                  ? 'inset -1px -1px #7abcf0, inset 1px 1px #051a30, inset -2px -2px #4a8abf, inset 2px 2px #0a2a4a'
                  : 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf',
                fontSize: 14,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(tab.path);
                setOpen(false);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
