import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const FEATURES = [
  { title: 'Live Radar', desc: 'Animated NEXRAD reflectivity across the US.' },
  { title: 'NWS Alerts', desc: 'Active watches, warnings, and advisories.' },
  { title: 'Conditions', desc: 'Current weather for any location worldwide.' },
  { title: 'Education', desc: 'Severe weather types and storm science.' },
  { title: 'Historical Storms', desc: 'Notable hurricanes, tornadoes, and more.' },
  { title: 'Preparedness', desc: 'Safety plans and emergency guides.' },
  { title: 'Live Resources', desc: 'Links to NWS, SPC, FEMA, and more.' },
];

const bevelRaised = {
  border: 'none',
  boxShadow: 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf',
};

const PX = 6;

function StormCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // keep canvas the same size as the viewport, not the scroll area
    let w, h, pw, ph;
    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.ceil(w / PX); // small canvas = chunky pixel art look
      canvas.height = Math.ceil(h / PX);
      pw = canvas.width;
      ph = canvas.height;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    }
    resize();

    // --- LIGHTNING ---
    let lightning = null;
    let flashOpacity = 0;

    function spawnLightning() {
      const startX = Math.floor(Math.random() * pw);
      const segments = [];
      let bx = startX;
      let by = 0;

      while (by < ph) {
        const nx = bx + Math.floor(Math.random() * 7) - 3;
        const stepDown = 2 + Math.floor(Math.random() * 4);
        const ny = Math.min(by + stepDown, ph);
        segments.push({ x1: bx, y1: by, x2: nx, y2: ny });

        if (Math.random() < 0.25) {
          const branchLen = 4 + Math.floor(Math.random() * 8);
          segments.push({
            x1: nx, y1: ny,
            x2: nx + (Math.random() < 0.5 ? 1 : -1) * (3 + Math.floor(Math.random() * 6)),
            y2: ny + branchLen,
            branch: true,
          });
        }
        bx = nx;
        by = ny;
      }

      lightning = { segments, life: 14 };
      flashOpacity = 0.12;
    }

    let nextLightning = 300 + Math.floor(Math.random() * 500);
    let frameTick = 0;

    // --- DRAW LOOP ---
    let animId;
    function draw() {
      ctx.clearRect(0, 0, pw, ph);

      // Flash
      if (flashOpacity > 0) {
        ctx.fillStyle = `rgba(200, 210, 255, ${flashOpacity})`;
        ctx.fillRect(0, 0, pw, ph);
        flashOpacity -= 0.006;
        if (flashOpacity < 0) flashOpacity = 0;
      }

      // Lightning
      if (lightning) {
        for (const seg of lightning.segments) {
          const dx = seg.x2 - seg.x1;
          const dy = seg.y2 - seg.y1;
          const steps = Math.max(Math.abs(dx), Math.abs(dy));
          ctx.fillStyle = seg.branch ? '#aabbdd' : '#ffffff';
          for (let s = 0; s <= steps; s++) {
            const lx = Math.round(seg.x1 + (dx * s) / steps);
            const ly = Math.round(seg.y1 + (dy * s) / steps);
            if (lx >= 0 && lx < pw && ly >= 0 && ly < ph) {
              ctx.fillRect(lx, ly, 1, 1);
            }
          }
          // draw a faint glow around the main bolt
          if (!seg.branch) {
            ctx.fillStyle = 'rgba(180, 200, 255, 0.3)';
            for (let s = 0; s <= steps; s++) {
              const lx = Math.round(seg.x1 + (dx * s) / steps);
              const ly = Math.round(seg.y1 + (dy * s) / steps);
              if (lx > 0 && lx < pw - 1 && ly >= 0 && ly < ph) {
                ctx.fillRect(lx - 1, ly, 1, 1);
                ctx.fillRect(lx + 1, ly, 1, 1);
              }
            }
          }
        }
        lightning.life--;
        if (lightning.life <= 0) lightning = null;
      }

      frameTick++;
      if (frameTick >= nextLightning) {
        spawnLightning();
        frameTick = 0;
        nextLightning = 300 + Math.floor(Math.random() * 500);
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
        imageRendering: 'pixelated',
      }}
    />
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      data-landing-scroll
      style={{
        flex: 1,
        overflow: 'auto',
        background: '#0d3d6e',
        color: '#fff',
        fontFamily: '"Courier New", Courier, monospace',
        position: 'relative',
      }}
    >
      <StormCanvas />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 1 }}>
        {/* logo + title block */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <img
            src="/Logo.png"
            alt="weatherCenter"
            style={{ height: '120px', margin: '0 auto 16px' }}
          />
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px', margin: 0 }}>
            weatherCenter
          </h1>
          <div className="bevel-pulse" style={{
            marginTop: '8px',
            border: 'none',
            background: '#0a2a4a',
            display: 'inline-block',
            padding: '4px 0',
            overflow: 'hidden',
            width: '340px',
          }}>
            <p className="marquee-text" style={{
              color: '#ffffff',
              fontSize: '13px',
              fontStyle: 'italic',
              whiteSpace: 'nowrap',
              margin: 0,
              display: 'inline-block',
              paddingLeft: '100%',
            }}>
              Made Using National Weather Service Data.
            </p>
          </div>
          <style>{`
            @keyframes bevel-toggle {
              0%, 45% {
                box-shadow: inset -1px -1px #7abcf0, inset 1px 1px #051a30, inset -2px -2px #4a8abf, inset 2px 2px #0a2a4a;
              }
              50%, 95% {
                box-shadow: inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf;
              }
              100% {
                box-shadow: inset -1px -1px #7abcf0, inset 1px 1px #051a30, inset -2px -2px #4a8abf, inset 2px 2px #0a2a4a;
              }
            }
            .bevel-pulse {
              animation: bevel-toggle 2s ease-in-out infinite;
            }
            @keyframes marquee-slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            .marquee-text {
              animation: marquee-slide 8s linear infinite;
            }
          `}</style>
        </div>

        {/* big "CONTINUE" button */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/radar')}
            style={{
              ...bevelRaised,
              background: '#135997',
              color: '#fff',
              padding: '12px 40px',
              cursor: 'pointer',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '1px',
            }}
          >
            CONTINUE
          </button>
        </div>

        {/* feature cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                ...bevelRaised,
                background: '#135997',
                padding: '14px 16px',
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '6px' }}>
                {f.title}
              </div>
              <div style={{ color: '#a0c4e8', fontSize: '12px', lineHeight: '1.5' }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
