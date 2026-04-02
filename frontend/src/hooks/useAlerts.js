import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { weatherApi, createWeatherSocket } from '../services/api';
import { useToast } from '../components/ui/ToastContext';

export function useAlerts(lat, lon, stateAbbr, isUS = false) {
  const [wsAlerts, setWsAlerts] = useState(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);
  const reconnectTimeout = useRef(null);
  const { addToast } = useToast();
  const hasDisconnectToast = useRef(false);

  // poll alerts via REST as a fallback (websocket is the primary source)
  const alertsQuery = useQuery({
    queryKey: ['alerts', stateAbbr || `${lat},${lon}`],
    queryFn: () => {
      if (stateAbbr) {
        return weatherApi.getActiveAlerts(null, null, stateAbbr);
      }
      return weatherApi.getActiveAlerts(lat, lon);
    },
    refetchInterval: 60 * 1000,
    enabled: isUS && ((stateAbbr != null) || (lat != null && lon != null)),
  });

  useEffect(() => {
    if (alertsQuery.isError) {
      addToast('Failed to fetch weather alerts.', 'warning');
    }
  }, [alertsQuery.isError, addToast]);

  const connect = useCallback(() => {
    if (lat == null || lon == null) return;

    try {
      const ws = createWeatherSocket(lat, lon);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnected(true);
        hasDisconnectToast.current = false;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'update') {
            if (data.alerts) setWsAlerts(data.alerts);
          }
        } catch {
          // Ignore parse errors
        }
      };

      ws.onclose = () => {
        setConnected(false);
        reconnectTimeout.current = setTimeout(connect, 5000);
      };

      ws.onerror = () => {
        ws.close();
      };
    } catch {
      reconnectTimeout.current = setTimeout(connect, 5000);
    }
  }, [lat, lon, addToast]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [connect]);

  // ping every 30s so the server doesn't drop us
  useEffect(() => {
    const interval = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send('ping');
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    alerts: wsAlerts || alertsQuery.data?.alerts || [],
    connected,
    isLoading: alertsQuery.isLoading,
  };
}
