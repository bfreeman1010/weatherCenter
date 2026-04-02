import { useToast } from './ToastContext';

const SEVERITY_STYLES = {
  error: { borderLeft: '4px solid #cc0000', background: '#fff' },
  warning: { borderLeft: '4px solid #cc9900', background: '#fff' },
  info: { borderLeft: '4px solid #135997', background: '#fff' },
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 52,
        right: 12,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        maxWidth: 360,
      }}
    >
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            ...SEVERITY_STYLES[toast.severity] || SEVERITY_STYLES.error,
            border: '1px solid #ccc',
            padding: '8px 12px',
            fontSize: 12,
            color: '#333',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            boxShadow: '1px 1px 4px rgba(0,0,0,0.15)',
          }}
        >
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#999',
              fontSize: 14,
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
