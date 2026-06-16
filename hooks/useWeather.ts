import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchWeather, WeatherData } from '@/lib/weather';
import { useAuthStore } from '@/stores/authStore';

const STALE_MS = 30 * 60 * 1000; // 30 minutes

interface UseWeatherResult {
  weather: WeatherData | null;
  isLoading: boolean;
  error: boolean;
  refresh: () => Promise<void>;
}

export function useWeather(): UseWeatherResult {
  const profile = useAuthStore((s) => s.profile);
  const zip = profile?.zip_code ?? null;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const lastFetchRef = useRef<number>(0);

  const load = useCallback(async (force = false) => {
    if (!zip) {
      setIsLoading(false);
      return;
    }

    // Skip if data is fresh
    if (!force && weather && Date.now() - lastFetchRef.current < STALE_MS) {
      return;
    }

    setIsLoading(true);
    setError(false);

    const data = await fetchWeather(zip);
    if (data) {
      setWeather(data);
      lastFetchRef.current = Date.now();
    } else {
      setError(true);
    }
    setIsLoading(false);
  }, [zip, weather]);

  useEffect(() => {
    load();
  }, [zip]);

  const refresh = useCallback(() => load(true), [load]);

  return { weather, isLoading, error, refresh };
}
