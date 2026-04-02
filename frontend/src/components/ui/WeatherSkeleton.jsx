import { GREY_BG, GREY_SKELETON, BEVEL_RAISED, BEVEL_SUNKEN } from '../../theme';

export default function WeatherSkeleton() {
  const block = (h, w = '100%', mb = 8) => (
    <div
      className="skeleton-pulse"
      style={{
        height: h,
        width: w,
        background: GREY_SKELETON,
        marginBottom: mb,
      }}
    />
  );

  return (
    <div style={{ padding: 16, background: GREY_BG }}>
      {block(18, '60%', 12)}

      <div style={{ boxShadow: BEVEL_RAISED, padding: 12, marginBottom: 12, background: GREY_BG }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
          {block(48, 48, 0)}
          <div style={{ flex: 1 }}>
            {block(24, '40%', 6)}
            {block(14, '60%', 0)}
          </div>
        </div>
        {block(12, '80%', 6)}
        {block(12, '70%', 6)}
        {block(12, '50%', 0)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ boxShadow: BEVEL_SUNKEN, padding: 8, background: GREY_BG }}>
            {block(10, '50%', 4)}
            {block(16, '70%', 0)}
          </div>
        ))}
      </div>

      {[1, 2, 3].map(i => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {block(14, '25%', 0)}
          {block(14, '15%', 0)}
          {block(14, '40%', 0)}
        </div>
      ))}
    </div>
  );
}
