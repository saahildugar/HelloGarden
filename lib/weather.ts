import { ENV } from './env';

export interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  isRaining: boolean;
  isFreezing: boolean;
  humidity: number;
  windSpeed: number;
}

/** Map OpenWeather icon codes to Ionicons names */
const WEATHER_ICONS: Record<string, string> = {
  '01d': 'sunny',
  '01n': 'moon',
  '02d': 'partly-sunny',
  '02n': 'cloudy-night',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'rainy',
  '09n': 'rainy',
  '10d': 'rainy',
  '10n': 'rainy',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'water',
  '50n': 'water',
};

export function getWeatherIcon(iconCode: string): string {
  return WEATHER_ICONS[iconCode] ?? 'cloud';
}

export async function fetchWeather(zip: string): Promise<WeatherData | null> {
  if (!zip || !ENV.openWeatherApiKey) return null;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${ENV.openWeatherApiKey}&units=imperial`;
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;

    const data = await response.json();
    const weatherId = data.weather?.[0]?.id ?? 0;

    return {
      temp: Math.round(data.main?.temp ?? 0),
      feelsLike: Math.round(data.main?.feels_like ?? 0),
      description: data.weather?.[0]?.description ?? '',
      icon: data.weather?.[0]?.icon ?? '03d',
      isRaining: weatherId >= 200 && weatherId <= 531,
      isFreezing: (data.main?.temp ?? 50) <= 32,
      humidity: data.main?.humidity ?? 0,
      windSpeed: Math.round(data.wind?.speed ?? 0),
    };
  } catch {
    return null;
  }
}

export function getWeatherMessage(weather: WeatherData): string | null {
  if (weather.isRaining) return 'Rain expected — skip watering';
  if (weather.isFreezing) return 'Frost warning — protect outdoor plants';
  return null;
}
