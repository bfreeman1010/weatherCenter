/**
 * Bottom-sheet drawer for mobile. Slides up from the bottom,
 * max 70vh height, with a backdrop overlay.
 */
export default function MobileDrawer({ open, onClose, children }) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 1100,
        }}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: '70vh',
          background: '#fff',
          borderTop: '2px solid #ccc',
          zIndex: 1101,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Handle bar + close */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 12px',
            borderBottom: '1px solid #ccc',
            background: '#f4f4f4',
            flexShrink: 0,
          }}
        >
          <div style={{ width: 40, height: 4, background: '#ccc', borderRadius: 2 }} />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 16,
              color: '#666',
              cursor: 'pointer',
              padding: '0 4px',
            }}
          >
            X
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </>
  );
}
