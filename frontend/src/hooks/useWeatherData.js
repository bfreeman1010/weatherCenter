import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { weatherApi } from '../services/api';
import { useToast } from '../components/ui/ToastContext';

export function useWeatherData(lat, lon) {
  const { addToast } = useToast();
  const hasToastedRef = useRef(false);

  const currentWeather = useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => weatherApi.getCurrentWeather(lat, lon),
    refetchInterval: 5 * 60 * 1000,
    enabled: lat != null && lon != null,
  });

  useEffect(() => {
    if (currentWeather.isError && !hasToastedRef.current) {
      addToast('Failed to fetch weather data. Will retry automatically.', 'error');
      hasToastedRef.current = true;
    }
    if (!currentWeather.isError) {
      hasToastedRef.current = false;
    }
  }, [currentWeather.isError, addToast]);

  return { currentWeather };
}
